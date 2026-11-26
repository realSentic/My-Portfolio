"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { AnimatePresence, motion } from "motion/react";
import { createPortal } from "react-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload, faExpand, faXmark } from "@fortawesome/free-solid-svg-icons";

const RESUME_PATH = "/resume.pdf";
const DOWNLOAD_NAME = "Syiam_Fortunado_Resume.pdf";

export default function ResumeButton() {
    const [open, setOpen] = useState(false);
    const closeButtonRef = useRef<HTMLButtonElement>(null);

    const mounted = useSyncExternalStore(
        () => () => {},
        () => true,
        () => false
    );

    useEffect(() => {
        if (!open) return;

        const onKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") setOpen(false);
        };

        const previousOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        document.addEventListener("keydown", onKeyDown);
        closeButtonRef.current?.focus();

        return () => {
            document.body.style.overflow = previousOverflow;
            document.removeEventListener("keydown", onKeyDown);
        };
    }, [open]);

    return (
        <>
            <button
                type="button"
                onClick={() => setOpen(true)}
                aria-haspopup="dialog"
                className="group flex min-h-11 min-w-32 flex-1 cursor-pointer items-center justify-center gap-2 border-2 border-[#3dff7a] bg-[#3dff7a] px-3 py-2 text-[#120f17] shadow-[3px_3px_0_0_#120f17] transition-all duration-150 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:bg-[#120f17] hover:text-[#3dff7a] hover:shadow-[5px_5px_0_0_#3dff7a] active:translate-x-0.75 active:translate-y-0.75 active:shadow-none"
            >
                <span>Resume</span>
                <FontAwesomeIcon icon={faExpand} className="text-sm transition-transform duration-150 group-hover:scale-110" />
            </button>

            {mounted &&
                createPortal(
                    <AnimatePresence>
                        {open && (
                            <motion.div
                                key="resume-modal-backdrop"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.2 }}
                                onClick={() => setOpen(false)}
                                className="fixed inset-0 z-9999 flex items-center justify-center bg-black/80 p-3 text-white backdrop-blur-sm sm:p-6"
                            >
                                <motion.div
                                    role="dialog"
                                    aria-modal="true"
                                    aria-labelledby="resume-modal-title"
                                    initial={{ opacity: 0, y: 30, scale: 0.97 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    exit={{ opacity: 0, y: 30, scale: 0.97 }}
                                    transition={{ type: "spring", stiffness: 400, damping: 32 }}
                                    onClick={(e) => e.stopPropagation()}
                                    className="relative flex h-[92vh] w-full max-w-4xl flex-col overflow-hidden border-2 border-[#3dff7a] bg-[#121212] shadow-[5px_5px_0_0_#3dff7a] sm:shadow-[8px_8px_0_0_#3dff7a]"
                                >
                                    {/* Header: title on the left, Download + Close on the top right */}
                                    <div className="flex shrink-0 items-center justify-between gap-3 border-b-2 border-[#3dff7a] p-3 sm:px-5">
                                        <h3
                                            id="resume-modal-title"
                                            className="font-archivoblack text-base uppercase leading-tight tracking-tight sm:text-xl"
                                        >
                                            MY <span className="text-[#3dff7a]">RESUME</span>
                                        </h3>

                                        <div className="flex items-center gap-3 font-archivoblack text-xs tracking-wide">
                                            <a
                                                href={RESUME_PATH}
                                                download={DOWNLOAD_NAME}
                                                aria-label="Download resume"
                                                className="flex h-11 cursor-pointer items-center justify-center gap-2 border-2 border-[#3dff7a] bg-[#3dff7a] px-3 text-[#120f17] shadow-[3px_3px_0_0_#120f17] transition-all hover:bg-[#120f17] hover:text-[#3dff7a] hover:shadow-[3px_3px_0_0_#3dff7a] active:translate-x-0.75 active:translate-y-0.75 active:shadow-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:h-9"
                                            >
                                                <FontAwesomeIcon icon={faDownload} className="text-sm" />
                                                <span className="hidden min-[400px]:inline">DOWNLOAD</span>
                                            </a>

                                            <button
                                                ref={closeButtonRef}
                                                type="button"
                                                onClick={() => setOpen(false)}
                                                aria-label="Close resume"
                                                className="flex h-11 w-11 cursor-pointer items-center justify-center border-2 border-[#505050] bg-[#121212] text-[#aaaaaa] shadow-[3px_3px_0_0_#505050] transition-all hover:border-[#3dff7a] hover:text-[#3dff7a] hover:shadow-[3px_3px_0_0_#3dff7a] active:translate-x-0.75 active:translate-y-0.75 active:shadow-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:h-9 sm:w-9"
                                            >
                                                <FontAwesomeIcon icon={faXmark} className="text-sm" />
                                            </button>
                                        </div>
                                    </div>

                                    {/* Embedded PDF */}
                                    <iframe
                                        src={`${RESUME_PATH}#view=FitH`}
                                        title="Syiam Fortunado's resume"
                                        className="min-h-0 w-full flex-1 bg-white"
                                    />

                                    {/* Backup for phones/browsers that can't show PDFs inside an iframe */}
                                    <p className="shrink-0 border-t-2 border-[#2a2a2a] px-4 py-2 text-center font-kumbh text-xs text-[#797979]">
                                        Can&apos;t see the resume?{" "}
                                        <a
                                            href={RESUME_PATH}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-[#3dff7a] underline underline-offset-2 hover:text-white"
                                        >
                                            Open it in a new tab
                                        </a>
                                        .
                                    </p>
                                </motion.div>
                            </motion.div>
                        )}
                    </AnimatePresence>,
                    document.body
                )}
        </>
    );
}
