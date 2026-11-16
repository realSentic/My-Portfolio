"use client";
import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import type { ReactNode } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import {
  motion,
  AnimatePresence,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHouse,
  faUser,
  faCode,
  faFolderOpen,
  faEnvelope,
} from "@fortawesome/free-solid-svg-icons";
import { cn } from "@/lib/utils";

type NavItem = {
  name: string;
  link: string;
  icon?: ReactNode;
  external?: boolean;
  cta?: boolean;
};

const SPY_LINE = 160;
const SETTLE_MS = 150;
const TAIL_MS = 300;
const DOCK_AFTER = 80;
const UNDOCK_BELOW = 40;
const PILL_RADIUS = 28;

const easeInOutCubic = (t: number) =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

function ProgressLine({ docked }: { docked: boolean }) {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });
  const opacity = useTransform(scrollYProgress, [0, 0.01], [0, 1]);

  return (
    <span
      aria-hidden
      className={cn(
        "pointer-events-none absolute bottom-0",
        docked ? "inset-x-0" : "inset-x-5"
      )}
    >
      <motion.span
        style={{ scaleX, opacity }}
        className="block h-0.5 origin-left rounded-full bg-[#3dff7a] shadow-[0_0_10px_#3dff7a]"
      />
    </span>
  );
}

export const FloatingNav = ({
  navItems,
  className,
}: {
  navItems: NavItem[];
  className?: string;
}) => {
  const [active, setActive] = useState<string>("/");
  const [open, setOpen] = useState(false);
  const [docked, setDocked] = useState(false);
  const [pill, setPill] = useState<{ left: number; width: number } | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);
  const ulRef = useRef<HTMLUListElement>(null);
  const itemRefs = useRef<Record<string, HTMLLIElement | null>>({});

  const locked = useRef(false);
  const animating = useRef(false);
  const rafId = useRef(0);
  const settleTimer = useRef<number | undefined>(undefined);

  const release = useCallback(() => {
    cancelAnimationFrame(rafId.current);
    window.clearTimeout(settleTimer.current);
    animating.current = false;
    locked.current = false;
  }, []);

  const armSettle = useCallback(() => {
    window.clearTimeout(settleTimer.current);
    settleTimer.current = window.setTimeout(release, SETTLE_MS);
  }, [release]);

  const scrollToLink = useCallback(
    (link: string) => {
      cancelAnimationFrame(rafId.current);
      window.clearTimeout(settleTimer.current);

      setActive(link);
      locked.current = true;
      animating.current = true;

      const getTarget = () => {
        if (link === "/") return 0;
        const el = document.getElementById(link.slice(1));
        if (!el) return window.scrollY;
        const margin = parseFloat(getComputedStyle(el).scrollMarginTop) || 0;
        const maxY = document.documentElement.scrollHeight - window.innerHeight;
        const y = el.getBoundingClientRect().top + window.scrollY - margin;
        return Math.min(Math.max(y, 0), Math.max(maxY, 0));
      };

      const startY = window.scrollY;
      const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
      const distance = Math.abs(getTarget() - startY);
      const duration = reduceMotion ? 0 : Math.min(900, Math.max(350, distance * 0.4));
      const startTime = performance.now();

      const step = (now: number) => {
        const elapsed = now - startTime;
        const t = duration === 0 ? 1 : Math.min(elapsed / duration, 1);
        const target = getTarget();

        if (t < 1) {
          const y = startY + (target - startY) * easeInOutCubic(t);
          window.scrollTo({ top: y, behavior: "instant" });
          rafId.current = requestAnimationFrame(step);
          return;
        }

        if (Math.abs(target - window.scrollY) > 0.5) {
          window.scrollTo({ top: target, behavior: "instant" });
        }
        if (elapsed < duration + TAIL_MS) {
          rafId.current = requestAnimationFrame(step);
        } else {
          animating.current = false;
          armSettle();
        }
      };

      rafId.current = requestAnimationFrame(step);
    },
    [armSettle]
  );

  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );

  // Scroll spy + dock state
  useEffect(() => {
    const hashItems = navItems.filter((item) => item.link.startsWith("#"));

    const updateDock = (y: number) => {
      setDocked((prev) => (y > DOCK_AFTER ? true : y < UNDOCK_BELOW ? false : prev));
    };

    const pickActive = (y: number, atBottom: boolean) => {
      if (y < 10) return "/";
      let current: string | null = null;
      let currentTop = -Infinity;
      let lowest: string | null = null;
      let lowestTop = -Infinity;

      for (const item of hashItems) {
        const el = document.getElementById(item.link.slice(1));
        if (!el) continue;
        const top = el.getBoundingClientRect().top;
        if (top > lowestTop) {
          lowestTop = top;
          lowest = item.link;
        }
        if (top <= SPY_LINE && top > currentTop) {
          currentTop = top;
          current = item.link;
        }
      }
      if (atBottom && lowest) return lowest;
      return current ?? "/";
    };

    const onScroll = (e: Event) => {
      const t = e.target as EventTarget;
      const isDoc =
        t === document || t === document.documentElement || t === document.body;

      if (!isDoc) {
        const el = t as HTMLElement;

        // Ignore scrolling inside popups/modals
        if (el.closest?.('[role="dialog"], [aria-modal="true"]')) return;

        if (el.clientHeight < window.innerHeight * 0.5) return;
      }

      const el = t as HTMLElement;
      const y = isDoc ? window.scrollY : el.scrollTop;
      const atBottom = isDoc
        ? window.innerHeight + window.scrollY >=
          document.documentElement.scrollHeight - 2
        : el.scrollTop + el.clientHeight >= el.scrollHeight - 2;

      updateDock(y);

      if (locked.current) {
        if (!animating.current) armSettle();
        return;
      }

      setActive(pickActive(y, atBottom));
    };

    const onUserInput = () => release();

    document.addEventListener("scroll", onScroll, { capture: true, passive: true });
    window.addEventListener("wheel", onUserInput, { passive: true });
    window.addEventListener("touchmove", onUserInput, { passive: true });
    window.addEventListener("keydown", onUserInput);

    const raf = requestAnimationFrame(() => {
      updateDock(window.scrollY);
      setActive(
        pickActive(
          window.scrollY,
          window.innerHeight + window.scrollY >=
            document.documentElement.scrollHeight - 2
        )
      );
    });

    return () => {
      cancelAnimationFrame(raf);
      release();
      document.removeEventListener("scroll", onScroll, { capture: true });
      window.removeEventListener("wheel", onUserInput);
      window.removeEventListener("touchmove", onUserInput);
      window.removeEventListener("keydown", onUserInput);
    };
  }, [navItems, armSettle, release]);

  // Close mobile menu on outside tap / Escape
  useEffect(() => {
    if (!open) return;
    const onPointerDown = (e: PointerEvent) => {
      if (!containerRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  // Desktop pill measurement
  const measure = useCallback(() => {
    const el = itemRefs.current[active];
    setPill(el ? { left: el.offsetLeft, width: el.offsetWidth } : null);
  }, [active]);

  useEffect(measure, [measure, mounted]);

  useEffect(() => {
    const ul = ulRef.current;
    if (!ul) return;
    const ro = new ResizeObserver(measure);
    ro.observe(ul);
    return () => ro.disconnect();
  }, [measure, mounted]);

  const handleNavClick = (e: React.MouseEvent, item: NavItem) => {
    setOpen(false);
    if (item.external) return;

    if (item.link.startsWith("#")) {
      e.preventDefault();
      scrollToLink(item.link);
      history.replaceState(null, "", item.link);
    } else if (item.link === "/" && window.location.pathname === "/") {
      e.preventDefault();
      scrollToLink("/");
      history.replaceState(null, "", "/");
    }
  };

  if (!mounted) return null;

  const activeItem = navItems.find((item) => item.link === active) ?? navItems[0];

  return createPortal(
    <div
      ref={containerRef}
      className={cn(
        "pointer-events-none fixed inset-x-0 top-0 z-5000 flex justify-center",
        docked ? "pt-0" : "pt-4 sm:pt-6",
        className
      )}
    >
      <motion.div
        layout
        initial={{ opacity: 0, y: -100, borderRadius: PILL_RADIUS }}
        animate={{
          opacity: 1,
          y: 0,
          borderRadius: docked ? 0 : PILL_RADIUS,
        }}
        transition={{
          layout: { type: "spring", bounce: 0.1, duration: 0.55 },
          default: { duration: 0.25, ease: "easeOut" },
        }}
        className={cn(
          "pointer-events-auto relative flex items-center justify-between backdrop-blur-xl backdrop-saturate-150",
          docked
            ? "w-full border-b border-white/15 bg-[#120f17]/75 px-4 py-2 shadow-[0_8px_32px_rgba(0,0,0,0.35)] sm:px-8"
            : "w-[min(20rem,calc(100vw-2rem))] border border-white/15 bg-white/8 p-1.5 pl-4 shadow-[0_8px_32px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.3)] sm:w-fit sm:pl-1.5"
        )}
      >
        {/* Brand (docked, desktop only) */}
        {docked && (
          <motion.span
            layout="position"
            className="font-archivoblack hidden text-lg uppercase tracking-tight text-white sm:block"
          >
            Syiam <span className="text-[#3dff7a]">Fortunado</span>
          </motion.span>
        )}

        {/* Desktop links */}
        <motion.ul
          layout="position"
          ref={ulRef}
          className="relative hidden items-center gap-1 sm:flex"
        >
          {pill && (
            <motion.span
              aria-hidden
              initial={false}
              animate={{ left: pill.left, width: pill.width }}
              transition={{ type: "spring", bounce: 0.15, duration: 0.45 }}
              className="absolute inset-y-0 rounded-full bg-white/20 shadow-[inset_0_1px_0_rgba(255,255,255,0.25)]"
            />
          )}

          {navItems.map((item) => {
            const isActive = active === item.link;

            return (
              <li
                key={item.name}
                ref={(el) => {
                  itemRefs.current[item.link] = el;
                }}
              >
                <Link
                  href={item.link}
                  target={item.external ? "_blank" : undefined}
                  rel={item.external ? "noopener noreferrer" : undefined}
                  aria-current={isActive ? "page" : undefined}
                  onClick={(e) => handleNavClick(e, item)}
                  className={cn(
                    "font-archivo relative z-10 flex items-center rounded-full px-4 py-2 text-sm font-bold transition-colors",
                    item.cta
                      ? "ml-1 bg-white text-neutral-900 hover:bg-white/85"
                      : isActive
                      ? "text-white"
                      : "text-white/65 hover:bg-white/10 hover:text-white"
                  )}
                >
                  {item.name}
                </Link>
              </li>
            );
          })}
        </motion.ul>

        {/* Mobile: current section + hamburger */}
        <motion.div
          layout="position"
          className="font-archivo flex min-w-0 items-center gap-2 text-sm font-bold text-white sm:hidden"
        >
          <span className="h-2 w-2 shrink-0 rounded-full bg-[#3dff7a] shadow-[0_0_8px_#3dff7a]" />
          <span className="truncate">{activeItem?.name}</span>
        </motion.div>

        <motion.button
          layout="position"
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-menu"
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 sm:hidden"
        >
          <span className="flex flex-col gap-1">
            <motion.span
              animate={open ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
              className="block h-0.5 w-5 rounded-full bg-current"
            />
            <motion.span
              animate={open ? { opacity: 0 } : { opacity: 1 }}
              className="block h-0.5 w-5 rounded-full bg-current"
            />
            <motion.span
              animate={open ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
              className="block h-0.5 w-5 rounded-full bg-current"
            />
          </span>
        </motion.button>

        <ProgressLine docked={docked} />
      </motion.div>

      {/* Mobile dropdown */}
      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, y: -8, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.97 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className={cn(
              "pointer-events-auto absolute inset-x-0 top-full mt-2 w-[min(20rem,calc(100vw-2rem))] origin-top rounded-3xl border border-white/15 bg-[#120f17]/85 p-2 backdrop-blur-xl backdrop-saturate-150 shadow-[0_20px_60px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.15)] sm:hidden",
              docked ? "ml-auto mr-4" : "mx-auto"
            )}
          >
            <ul className="flex flex-col gap-1">
              {navItems.map((item) => {
                const isActive = active === item.link;

                return (
                  <li key={item.name}>
                    <Link
                      href={item.link}
                      target={item.external ? "_blank" : undefined}
                      rel={item.external ? "noopener noreferrer" : undefined}
                      aria-current={isActive ? "page" : undefined}
                      onClick={(e) => handleNavClick(e, item)}
                      className={cn(
                        "font-archivo flex items-center gap-3 rounded-2xl px-3 py-3 text-sm font-bold transition-colors",
                        item.cta
                          ? "mt-1 justify-center bg-white text-neutral-900 hover:bg-white/85"
                          : isActive
                          ? "bg-white/10 text-[#3dff7a]"
                          : "text-white/75 hover:bg-white/10 hover:text-white"
                      )}
                    >
                      {item.icon && (
                        <span
                          className={cn(
                            "flex h-8 w-8 shrink-0 items-center justify-center rounded-xl text-base",
                            item.cta
                              ? "bg-neutral-900/10"
                              : isActive
                              ? "bg-[#3dff7a]/15"
                              : "bg-white/10"
                          )}
                        >
                          {item.icon}
                        </span>
                      )}
                      <span>{item.name}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>,
    document.body
  );
};

export function FloatingNavDemo() {
  const navItems: NavItem[] = [
    { name: "Home", link: "/", icon: <FontAwesomeIcon icon={faHouse} /> },
    { name: "About", link: "#about", icon: <FontAwesomeIcon icon={faUser} /> },
    { name: "Skills", link: "#skills", icon: <FontAwesomeIcon icon={faCode} /> },
    { name: "Projects", link: "#projects", icon: <FontAwesomeIcon icon={faFolderOpen} /> },
    { name: "Contact", link: "#contact", icon: <FontAwesomeIcon icon={faEnvelope} />, cta: true },
  ];

  return <FloatingNav navItems={navItems} />;
}