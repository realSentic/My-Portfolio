"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence } from "motion/react";
import LoadingScreen from "./loading-screen";

const MIN_VISIBLE_MS = 500;
const MAX_VISIBLE_MS = 8000;

export default function RouteLoader() {
    const pathname = usePathname();
    const [loading, setLoading] = useState(true);
    const [instant, setInstant] = useState(true);
    const startedAt = useRef(0);

    useEffect(() => {
        let timer: number | undefined;

        const hide = () => {
            const wait = Math.max(0, MIN_VISIBLE_MS - performance.now());
            timer = window.setTimeout(() => setLoading(false), wait);
        };

        if (document.readyState === "complete") hide();
        else window.addEventListener("load", hide, { once: true });

        return () => {
            window.clearTimeout(timer);
            window.removeEventListener("load", hide);
        };
    }, []);

    useEffect(() => {
        const onClick = (e: MouseEvent) => {
            if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;

            const anchor = (e.target as Element | null)?.closest("a");
            if (!anchor || anchor.target === "_blank" || anchor.hasAttribute("download")) return;

            const url = new URL(anchor.href, window.location.href);
            if (url.origin !== window.location.origin) return;
            if (url.pathname === window.location.pathname) return;

            startedAt.current = Date.now();
            setInstant(false);
            setLoading(true);
        };

        document.addEventListener("click", onClick);
        return () => document.removeEventListener("click", onClick);
    }, []);

    useEffect(() => {
        if (startedAt.current === 0) return;
        const wait = Math.max(0, MIN_VISIBLE_MS - (Date.now() - startedAt.current));
        const id = window.setTimeout(() => setLoading(false), wait);
        return () => window.clearTimeout(id);
    }, [pathname]);

    useEffect(() => {
        if (!loading) return;
        const id = window.setTimeout(() => setLoading(false), MAX_VISIBLE_MS);
        return () => window.clearTimeout(id);
    }, [loading]);

    return (
        <AnimatePresence>
            {loading && (
                <LoadingScreen key="route-loader" instant={instant} className="z-6000" />
            )}
        </AnimatePresence>
    );
}