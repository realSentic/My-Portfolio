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
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

type NavItem = {
  name: string;
  link: string;
  icon?: ReactNode;
  external?: boolean;
  cta?: boolean;
};

const HIDE_AFTER = 60;
const SHOW_AFTER = 15;
const SPY_LINE = 160;
const SETTLE_MS = 150;
const TAIL_MS = 300;

const easeInOutCubic = (t: number) =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

export const FloatingNav = ({
  navItems,
  className,
}: {
  navItems: NavItem[];
  className?: string;
}) => {
  const [visible, setVisible] = useState(true);
  const [active, setActive] = useState<string>("/");
  const [pill, setPill] = useState<{ left: number; width: number } | null>(null);

  const last = useRef(new WeakMap<EventTarget, number>());
  const accumulated = useRef(0);
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
      accumulated.current = 0;
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

  useEffect(() => {
    const hashItems = navItems.filter((item) => item.link.startsWith("#"));

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
        if (el.clientHeight < window.innerHeight * 0.5) return;
      }

      const el = t as HTMLElement;
      const y = isDoc ? window.scrollY : el.scrollTop;
      const atBottom = isDoc
        ? window.innerHeight + window.scrollY >=
          document.documentElement.scrollHeight - 2
        : el.scrollTop + el.clientHeight >= el.scrollHeight - 2;

      const prev = last.current.get(t) ?? y;
      last.current.set(t, y);
      const delta = y - prev;

      if (locked.current) {
        accumulated.current = 0;
        if (!animating.current) armSettle();
        return;
      }

      setActive(pickActive(y, atBottom));

      if (y < 10) {
        accumulated.current = 0;
        setVisible(true);
        return;
      }

      if (delta * accumulated.current < 0) accumulated.current = 0;
      accumulated.current += delta;

      if (accumulated.current > HIDE_AFTER) setVisible(false);
      else if (accumulated.current < -SHOW_AFTER) setVisible(true);
    };

    const onUserInput = () => release();

    document.addEventListener("scroll", onScroll, { capture: true, passive: true });
    window.addEventListener("wheel", onUserInput, { passive: true });
    window.addEventListener("touchmove", onUserInput, { passive: true });
    window.addEventListener("keydown", onUserInput);

    const raf = requestAnimationFrame(() => {
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

  if (!mounted) return null;

  return createPortal(
    <motion.div
      initial={{ opacity: 0, y: -100 }}
      animate={{ y: visible ? 0 : -100, opacity: visible ? 1 : 0 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      style={{ pointerEvents: visible ? "auto" : "none" }}
      aria-hidden={!visible}
      onFocusCapture={() => setVisible(true)}
      className={cn(
        "fixed top-4 inset-x-0 mx-auto z-5000 flex max-w-fit items-center justify-center sm:top-6",
        className
      )}
    >
      <ul
        ref={ulRef}
        className="relative flex items-center gap-1 rounded-none border border-white/15 bg-white/8 p-1.5 backdrop-blur-xl backdrop-saturate-150 shadow-[0_8px_32px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.3)]"
      >
        {pill && (
          <motion.span
            aria-hidden
            initial={false}
            animate={{ left: pill.left, width: pill.width }}
            transition={{ type: "spring", bounce: 0.15, duration: 0.45 }}
            className="absolute bottom-1.5 top-1.5 rounded-none bg-white/20 shadow-[inset_0_1px_0_rgba(255,255,255,0.25)]"
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
                onClick={(e) => {
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
                }}
                className={cn(
                  "font-archivo relative z-10 flex items-center gap-1 rounded-none px-3 py-2 text-sm font-bold transition-colors sm:px-4",
                  item.cta
                    ? "ml-1 bg-white text-neutral-900 hover:bg-white/85"
                    : isActive
                    ? "text-white"
                    : "text-white/65 hover:bg-white/10 hover:text-white"
                )}
              >
                <span className="block sm:hidden">{item.icon}</span>
                <span className="hidden sm:block">{item.name}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </motion.div>,
    document.body
  );
};