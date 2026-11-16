"use client";

import { useEffect, useState } from "react";
import {
    AnimatePresence,
    animate,
    motion,
    useMotionValue,
    useTransform,
} from "motion/react";
import { cn } from "@/lib/utils";

type Phase = "loading" | "welcome" | "reveal" | "done";

const LOADING_MS = 1000; // progress bar
const WELCOME_MS = 1000; // "Welcome to my Portfolio!"
const REVEAL_MS = 1100; // curtain opening

const CURTAIN_EASE = [0.76, 0, 0.24, 1] as const;

const dotPattern = {
    backgroundImage: "radial-gradient(rgba(255,255,255,0.07) 1px, transparent 1px)",
    backgroundSize: "22px 22px",
};

export default function IntroScreen() {
    const [phase, setPhase] = useState<Phase>("loading");
    const finished = phase === "done";

    const progress = useMotionValue(0);
    const percent = useTransform(progress, (v) => Math.round(v));
    const scaleX = useTransform(progress, [0, 100], [0, 1]);

    // Timeline
    useEffect(() => {
        progress.set(0);
        const controls = animate(progress, 100, {
            duration: LOADING_MS / 1000,
            ease: "easeInOut",
        });

        const t1 = window.setTimeout(() => setPhase("welcome"), LOADING_MS);
        const t2 = window.setTimeout(() => setPhase("reveal"), LOADING_MS + WELCOME_MS);
        const t3 = window.setTimeout(
            () => setPhase("done"),
            LOADING_MS + WELCOME_MS + REVEAL_MS
        );

        return () => {
            controls.stop();
            window.clearTimeout(t1);
            window.clearTimeout(t2);
            window.clearTimeout(t3);
        };
    }, [progress]);

    // Lock page scroll until the intro is completely gone
    useEffect(() => {
        if (finished) return;

        const html = document.documentElement;
        const prevOverflow = html.style.overflow;
        const prevGutter = html.style.scrollbarGutter;

        html.style.overflow = "hidden";
        html.style.scrollbarGutter = "stable";

        return () => {
            html.style.overflow = prevOverflow;
            html.style.scrollbarGutter = prevGutter;
        };
    }, [finished]);

    if (finished) return null;

    const revealing = phase === "reveal";

    return (
        <div
            role="status"
            aria-label="Loading portfolio"
            className={cn(
                "fixed inset-x-0 top-0 z-5500 h-lvh overflow-hidden",
                revealing && "pointer-events-none"
            )}
        >
            {/* Curtain: top half */}
            <motion.div
                aria-hidden
                initial={false}
                animate={{ y: revealing ? "-100%" : "0%" }}
                transition={{ duration: 0.7, delay: revealing ? 0.3 : 0, ease: CURTAIN_EASE }}
                className="absolute inset-x-0 top-0 h-1/2 bg-[#171717]"
                style={dotPattern}
            />

            {/* Curtain: bottom half */}
            <motion.div
                aria-hidden
                initial={false}
                animate={{ y: revealing ? "100%" : "0%" }}
                transition={{ duration: 0.7, delay: revealing ? 0.3 : 0, ease: CURTAIN_EASE }}
                className="absolute inset-x-0 bottom-0 h-1/2 bg-[#171717]"
                style={dotPattern}
            />

            {/* Neon seam: draws across, then fades as the curtain splits */}
            <motion.div
                aria-hidden
                initial={false}
                animate={
                    revealing
                        ? { scaleX: [0, 1, 1], opacity: [1, 1, 0] }
                        : { scaleX: 0, opacity: 1 }
                }
                transition={
                    revealing
                        ? { duration: 1, times: [0, 0.3, 1], ease: "easeInOut" }
                        : { duration: 0 }
                }
                className="absolute inset-x-0 top-[calc(50%-2px)] h-1 origin-center bg-[#3dff7a] shadow-[0_0_20px_#3dff7a]"
            />

            {/* Content */}
            <div className="relative z-10 flex h-full items-center justify-center px-4">
                <AnimatePresence mode="wait">
                    {phase === "loading" && (
                        <motion.div
                            key="loading"
                            exit={{ opacity: 0, y: -16, transition: { duration: 0.15 } }}
                            className="flex w-full max-w-md flex-col items-center gap-5 sm:gap-6"
                        >
                            <p className="font-kumbh text-lg font-black uppercase tracking-[0.3em] text-[#3dff7a] sm:text-xl">
                                Loading...
                            </p>

                            <div className="flex items-start font-archivoblack leading-none text-white [text-shadow:4px_4px_0_#3dff7a]">
                                <motion.span className="text-7xl tabular-nums sm:text-9xl">
                                    {percent}
                                </motion.span>
                                <span className="mt-1 text-3xl sm:mt-2 sm:text-5xl">%</span>
                            </div>

                            <div className="h-6 w-full border-2 border-[#3dff7a] bg-[#120f17] p-0.5 shadow-[5px_5px_0_0_#3dff7a]">
                                <motion.div
                                    style={{ scaleX }}
                                    className="h-full origin-left bg-[#3dff7a]"
                                />
                            </div>
                        </motion.div>
                    )}

                    {phase === "welcome" && (
                        <motion.div
                            key="welcome"
                            exit={{ opacity: 0, transition: { duration: 0.15 } }}
                            className="flex flex-col items-center gap-1 text-center sm:gap-2"
                        >
                            <span className="block overflow-hidden pb-1">
                                <motion.span
                                    initial={{ y: "110%" }}
                                    animate={{ y: 0 }}
                                    transition={{ duration: 0.4, ease: "easeOut" }}
                                    className="block font-kumbh text-2xl font-black text-[#3dff7a] sm:text-4xl"
                                >
                                    Welcome to my
                                </motion.span>
                            </span>

                            <span className="block overflow-hidden px-2 pb-2">
                                <motion.span
                                    initial={{ y: "110%" }}
                                    animate={{ y: 0 }}
                                    transition={{ duration: 0.45, delay: 0.1, ease: "easeOut" }}
                                    className="block font-archivoblack text-4xl uppercase leading-none tracking-tighter text-white [text-shadow:4px_4px_0_#3dff7a] min-[400px]:text-5xl sm:text-7xl md:text-8xl"
                                >
                                    Portfolio!
                                </motion.span>
                            </span>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}