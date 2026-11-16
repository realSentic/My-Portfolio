"use client";

import { motion } from "motion/react";
import { cn } from "@/lib/utils";

export default function LoadingScreen({
    className,
    instant = false,
}: {
    className?: string;
    instant?: boolean;
}) {
    return (
        <motion.div
            role="status"
            aria-live="polite"
            initial={instant ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className={cn(
                "fixed inset-0 z-50 flex flex-col items-center justify-center gap-10 bg-[#171717] text-white",
                className
            )}
        >
            <div className="flex items-end gap-4">
                {[0, 150, 300].map((delay) => (
                    <span
                        key={delay}
                        style={{ animationDelay: `${delay}ms` }}
                        className="h-8 w-8 animate-bounce border-2 border-[#120f17] bg-[#3dff7a] shadow-[4px_4px_0_0_#120f17] motion-reduce:animate-none"
                    />
                ))}
            </div>

            <p className="font-archivoblack text-4xl uppercase tracking-tighter sm:text-5xl [text-shadow:3px_3px_0_#120f17]">
                LOAD<span className="text-[#3dff7a]">ING</span>
                <span className="animate-pulse text-[#3dff7a] motion-reduce:animate-none">...</span>
            </p>

            <div className="h-3 w-56 overflow-hidden border-2 border-[#3dff7a] bg-[#121212] shadow-[3px_3px_0_0_#3dff7a] sm:w-72">
                <div className="h-full w-1/3 animate-pulse bg-[#3dff7a] motion-reduce:animate-none" />
            </div>

            <span className="sr-only">Loading page</span>
        </motion.div>
    );
}