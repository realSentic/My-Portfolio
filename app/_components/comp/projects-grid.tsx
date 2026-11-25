"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, type Variants } from "motion/react";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { config } from "@fortawesome/fontawesome-svg-core";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { faArrowUpRightFromSquare, faXmark } from "@fortawesome/free-solid-svg-icons";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { Projects, type Project } from "../datas/projects";

config.autoAddCss = false;

const TOAST_DURATION = 5000;

function ModalSection({ title, children }: { title: string; children: React.ReactNode }) {
    return (
        <section className="mt-8">
            <h4 className="border-b-2 border-[#2a2a2a] pb-2 font-archivoblack text-xs tracking-wide text-[#3dff7a]">
                {title}
            </h4>
            <div className="mt-4 font-kumbh text-base leading-relaxed text-[#aaaaaa]">{children}</div>
        </section>
    );
}

function BulletList({ items }: { items: string[] }) {
    return (
        <ul className="flex flex-col gap-2">
            {items.map((item) => (
                <li key={item} className="flex gap-3">
                    <span className="mt-2.5 h-1.5 w-1.5 shrink-0 bg-[#3dff7a]" aria-hidden="true" />
                    <span>{item}</span>
                </li>
            ))}
        </ul>
    );
}

// GitHub button only renders if the project has a repo. The LINK button always renders:
// it opens the live site if there is one, otherwise it triggers the "not deployed" toast.
function ProjectLinks({
    name,
    github,
    link,
    onLinkUnavailable,
    className = "",
    padding = "py-2",
}: {
    name: string;
    github?: string;
    link?: string;
    onLinkUnavailable: () => void;
    className?: string;
    padding?: string;
}) {
    const linkClasses = `flex flex-1 cursor-pointer items-center justify-center gap-2 border-2 border-[#3dff7a] bg-[#3dff7a] px-3 ${padding} text-[#120f17] shadow-[3px_3px_0_0_#120f17] transition-all hover:bg-[#120f17] hover:text-[#3dff7a] active:translate-x-0.75 active:translate-y-0.75 active:shadow-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white`;

    return (
        <div className={`flex gap-3 font-archivoblack text-xs tracking-wide ${className}`}>
            {github && (
                <a
                    href={github}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${name} on GitHub`}
                    className={`flex flex-1 cursor-pointer items-center justify-center gap-2 border-2 border-[#505050] px-3 ${padding} text-[#aaaaaa] shadow-[3px_3px_0_0_#505050] transition-all hover:border-[#3dff7a] hover:text-[#3dff7a] hover:shadow-[3px_3px_0_0_#3dff7a] active:translate-x-0.75 active:translate-y-0.75 active:shadow-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white`}
                >
                    <FontAwesomeIcon icon={faGithub} className="text-sm" />
                    <span>GITHUB</span>
                </a>
            )}

            {link ? (
                <a
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Open ${name} live site`}
                    className={linkClasses}
                >
                    <span>LINK</span>
                    <FontAwesomeIcon icon={faArrowUpRightFromSquare} className="text-sm" />
                </a>
            ) : (
                <button
                    type="button"
                    onClick={onLinkUnavailable}
                    aria-label={`${name} live site (not deployed yet)`}
                    className={linkClasses}
                >
                    <span>LINK</span>
                    <FontAwesomeIcon icon={faArrowUpRightFromSquare} className="text-sm" />
                </button>
            )}
        </div>
    );
}

const containerVariants: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.06 } },
};

const itemVariants: Variants = {
    hidden: { opacity: 0, y: 40 },
    show: { opacity: 1, y: 0, transition: { duration: 0.3, ease: "easeOut" } },
};

const cardVariants: Variants = {
    rest: { y: 0, boxShadow: "5px 5px 0 0 #3dff7a" },
    hover: { y: -8, boxShadow: "10px 10px 0 0 #3dff7a" },
    tap: { y: 2, boxShadow: "2px 2px 0 0 #3dff7a" },
};

export default function ProjectsGrid() {
    const [selected, setSelected] = useState<Project | null>(null);
    // A new object is created on every click, so clicking again restarts the 5s timer.
    const [toast, setToast] = useState<{ message: string } | null>(null);
    const closeButtonRef = useRef<HTMLButtonElement>(null);

    const showNotDeployedToast = () => {
        setToast({ message: "Website for this project hasn't been deployed yet." });
    };

    // Close on Escape, lock page scroll, and focus the close button while the popup is open.
    useEffect(() => {
        if (!selected) return;

        const onKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") setSelected(null);
        };

        const previousOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        document.addEventListener("keydown", onKeyDown);
        closeButtonRef.current?.focus();

        return () => {
            document.body.style.overflow = previousOverflow;
            document.removeEventListener("keydown", onKeyDown);
        };
    }, [selected]);

    // Auto-dismiss the toast after 5 seconds.
    useEffect(() => {
        if (!toast) return;

        const timer = setTimeout(() => setToast(null), TOAST_DURATION);
        return () => clearTimeout(timer);
    }, [toast]);

    return (
        <div className="mt-12">
            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="show"
                className="grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3"
            >
                {Projects.map((proj) => (
                    <motion.div key={proj.pName} variants={itemVariants} className="h-full">
                        <motion.div
                            variants={cardVariants}
                            initial="rest"
                            animate="rest"
                            whileHover="hover"
                            whileTap="tap"
                            transition={{ type: "spring", stiffness: 400, damping: 28 }}
                            className="group flex h-full min-h-120 w-full flex-col bg-[#121212]"
                        >
                            <div className="relative h-48 w-full shrink-0 overflow-hidden border-b-2 border-[#505050] transition-colors duration-300 group-hover:border-[#3dff7a]">
                                <Image
                                    src={proj.pImage}
                                    alt={`A picture of ${proj.pName}`}
                                    fill
                                    className="object-cover object-top grayscale-60 brightness-75 transition duration-300 group-hover:scale-105 group-hover:grayscale-0 group-hover:brightness-100 pointer-coarse:grayscale-0 pointer-coarse:brightness-100"
                                />

                                <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/70 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 pointer-coarse:opacity-100" />

                                <button
                                    type="button"
                                    onClick={() => setSelected(proj)}
                                    className="absolute right-3 bottom-3 translate-y-2 cursor-pointer border-2 border-[#120f17] bg-[#3dff7a] px-4 py-2 font-archivoblack text-xs tracking-wide text-[#120f17] opacity-0 shadow-[3px_3px_0_0_#120f17] transition duration-300 hover:border-[#3dff7a] hover:bg-[#120f17] hover:text-[#3dff7a] hover:shadow-[3px_3px_0_0_#3dff7a] group-hover:translate-y-0 group-hover:opacity-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white pointer-coarse:translate-y-0 pointer-coarse:opacity-100"
                                >
                                    SHOW DETAILS
                                </button>
                            </div>

                            <div className="p-5 font-kumbh text-xl font-bold">
                                <span>{proj.pName}</span>
                            </div>

                            <div className="px-5 font-kumbh text-base text-[#797979]">
                                <p className="line-clamp-4">{proj.pShortDesc ?? proj.pDesc}</p>
                            </div>

                            <div className="mt-auto px-5 pt-5 pb-4 font-kumbh">
                                <ul className="flex flex-wrap gap-2">
                                    {proj.pLanguage.map((tech) => (
                                        <li
                                            key={tech}
                                            className="border-2 border-[#505050] px-3 py-1 font-mono text-xs text-[#aaaaaa] transition-colors hover:border-[#3dff7a] hover:text-white"
                                        >
                                            {tech}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <ProjectLinks
                                name={proj.pName}
                                github={proj.pGithub}
                                link={proj.pLink}
                                onLinkUnavailable={showNotDeployedToast}
                                className="shrink-0 px-5 pb-5"
                            />
                        </motion.div>
                    </motion.div>
                ))}
            </motion.div>

            <AnimatePresence>
                {selected && (
                    <motion.div
                        key="project-modal-backdrop"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        onClick={() => setSelected(null)}
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm sm:p-6"
                    >
                        <motion.div
                            role="dialog"
                            aria-modal="true"
                            aria-labelledby="project-modal-title"
                            initial={{ opacity: 0, y: 30, scale: 0.97 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 30, scale: 0.97 }}
                            transition={{ type: "spring", stiffness: 400, damping: 32 }}
                            onClick={(e) => e.stopPropagation()}
                            className="relative max-h-[92vh] w-full max-w-4xl overflow-y-auto [scrollbar-color:#3a3a3a_#121212] scrollbar-thin [&::-webkit-scrollbar]:w-2.5 [&::-webkit-scrollbar-thumb]:bg-[#3a3a3a] [&::-webkit-scrollbar-thumb:hover]:bg-white [&::-webkit-scrollbar-track]:bg-[#121212] [&::-webkit-scrollbar-track]:border-l-2 [&::-webkit-scrollbar-track]:border-[#2a2a2a] border-2 border-[#3dff7a] bg-[#121212] shadow-[8px_8px_0_0_#3dff7a]"
                        >
                            <button
                                ref={closeButtonRef}
                                type="button"
                                onClick={() => setSelected(null)}
                                aria-label="Close project details"
                                className="absolute top-3 right-3 z-10 flex h-9 w-9 cursor-pointer items-center justify-center border-2 border-[#505050] bg-[#121212] text-[#aaaaaa] shadow-[3px_3px_0_0_#505050] transition-all hover:border-[#3dff7a] hover:text-[#3dff7a] hover:shadow-[3px_3px_0_0_#3dff7a] active:translate-x-0.75 active:translate-y-0.75 active:shadow-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                            >
                                <FontAwesomeIcon icon={faXmark} className="text-sm" />
                            </button>

                            <div className="relative h-56 w-full border-b-2 border-[#3dff7a] sm:h-80 lg:h-96">
                                <Image
                                    src={selected.pImage}
                                    alt={`A picture of ${selected.pName}`}
                                    fill
                                    className="object-cover object-top"
                                />
                            </div>

                            <div className="p-6 sm:p-8">
                                <h3
                                    id="project-modal-title"
                                    className="font-archivoblack text-2xl uppercase leading-tight tracking-tight sm:text-3xl"
                                >
                                    {selected.pName}
                                </h3>

                                {(selected.pRole || selected.pTimeline || selected.pStatus) && (
                                    <dl className="mt-6 grid grid-cols-2 gap-4 border-2 border-[#2a2a2a] p-4 sm:grid-cols-3">
                                        {selected.pRole && (
                                            <div>
                                                <dt className="font-archivoblack text-[10px] tracking-wide text-[#797979]">ROLE</dt>
                                                <dd className="mt-1 font-kumbh text-sm text-white">{selected.pRole}</dd>
                                            </div>
                                        )}
                                        {selected.pTimeline && (
                                            <div>
                                                <dt className="font-archivoblack text-[10px] tracking-wide text-[#797979]">TIMELINE</dt>
                                                <dd className="mt-1 font-kumbh text-sm text-white">{selected.pTimeline}</dd>
                                            </div>
                                        )}
                                        {selected.pStatus && (
                                            <div>
                                                <dt className="font-archivoblack text-[10px] tracking-wide text-[#797979]">STATUS</dt>
                                                <dd className="mt-1 font-kumbh text-sm text-white">{selected.pStatus}</dd>
                                            </div>
                                        )}
                                    </dl>
                                )}

                                <ModalSection title="OVERVIEW">
                                    <p>{selected.pOverview ?? selected.pDesc}</p>
                                </ModalSection>

                                {selected.pFeatures && selected.pFeatures.length > 0 && (
                                    <ModalSection title="KEY FEATURES">
                                        <BulletList items={selected.pFeatures} />
                                    </ModalSection>
                                )}

                                {selected.pChallenges && selected.pChallenges.length > 0 && (
                                    <ModalSection title="CHALLENGES">
                                        <ul className="flex flex-col gap-5">
                                            {selected.pChallenges.map((c) => (
                                                <li key={c.challenge}>
                                                    <p className="font-bold text-white">{c.challenge}</p>
                                                    <p className="mt-1">{c.solution}</p>
                                                </li>
                                            ))}
                                        </ul>
                                    </ModalSection>
                                )}

                                {selected.pLearned && selected.pLearned.length > 0 && (
                                    <ModalSection title="WHAT I LEARNED">
                                        <BulletList items={selected.pLearned} />
                                    </ModalSection>
                                )}

                                <ModalSection title="BUILT WITH">
                                    <ul className="flex flex-wrap gap-2">
                                        {selected.pLanguage.map((tech) => (
                                            <li
                                                key={tech}
                                                className="border-2 border-[#505050] px-3 py-1 font-mono text-xs text-[#aaaaaa]"
                                            >
                                                {tech}
                                            </li>
                                        ))}
                                    </ul>
                                </ModalSection>

                                <ProjectLinks
                                    name={selected.pName}
                                    github={selected.pGithub}
                                    link={selected.pLink}
                                    onLinkUnavailable={showNotDeployedToast}
                                    className="mt-8"
                                    padding="py-3"
                                />
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Toast: sits above the modal (z-60 vs the modal's z-50) */}
            <div className="pointer-events-none fixed inset-x-0 top-4 z-60 flex justify-center px-4 sm:top-6">
                <AnimatePresence>
                    {toast && (
                        <motion.div
                            key="project-toast"
                            role="status"
                            aria-live="polite"
                            initial={{ opacity: 0, y: -24 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -24 }}
                            transition={{ duration: 0.3, ease: "easeOut" }}
                            className="pointer-events-auto max-w-md border-2 border-[#3dff7a] bg-[#121212] px-4 py-3 font-kumbh text-sm text-white shadow-[4px_4px_0_0_#3dff7a] sm:text-base"
                        >
                            {toast.message}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}
