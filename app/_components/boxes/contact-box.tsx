"use client";

import { useEffect, useState, type FormEvent } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "motion/react";
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaGithub, FaLinkedinIn, FaArrowRight, FaCheck, FaTimes } from "react-icons/fa";

const FORM_ID = process.env.NEXT_PUBLIC_FORMSPREE_ID;
const GITHUB_URL = "https://github.com/realSentic";
const LINKEDIN_URL = "https://www.linkedin.com/in/syiamfortunado";

const contacts = [
    { label: "Email", value: "syiamfortunado@email.com", href: "mailto:your@email.com", icon: FaEnvelope },
    { label: "Phone", value: "+63 938 041 1260", href: "tel:+639380411260", icon: FaPhone },
    { label: "Location", value: "Roxas City, Philippines", href: "https://www.google.com/maps/search/?api=1&query=Roxas+City,+Philippines", icon: FaMapMarkerAlt },
];

const socials = [
    { label: "LinkedIn", href: LINKEDIN_URL, icon: FaLinkedinIn },
    { label: "GitHub", href: GITHUB_URL, icon: FaGithub },
];

const fields = [
    { name: "name", label: "Name", type: "text", placeholder: "Jane Doe", required: true },
    { name: "email", label: "Email", type: "email", placeholder: "jane@example.com", required: true },
    { name: "subject", label: "Subject", type: "text", placeholder: "Optional", required: false },
];

const labelClass = "mb-1.5 block text-sm text-[#aaaaaa]";
const inputClass = "w-full border-2 border-[#2a2a2a] bg-[#2a2a2a] px-4 py-3 text-base text-white placeholder:text-[#666666] outline-none transition focus:border-[#3dff7a] sm:text-sm";

type Popup = "sent" | "error" | null;

export default function ContactBox() {
    const [visible, setVisible] = useState(false);
    const [sending, setSending] = useState(false);
    const [popup, setPopup] = useState<Popup>(null);

    useEffect(() => {
        if (!popup) return;
        const onKey = (event: KeyboardEvent) => {
            if (event.key === "Escape") setPopup(null);
        };
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [popup]);

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (sending) return;

        if (!FORM_ID) {
            console.error("Missing NEXT_PUBLIC_FORMSPREE_ID in .env.local");
            setPopup("error");
            return;
        }

        const form = event.currentTarget;
        setSending(true);

        try {
            const res = await fetch(`https://formspree.io/f/${FORM_ID}`, {
                method: "POST",
                headers: { Accept: "application/json" },
                body: new FormData(form),
            });

            if (res.ok) {
                form.reset();
                new Audio("/audio/success.wav").play()
                setPopup("sent");
            } else {
                setPopup("error");
            }
        } catch {
            setPopup("error");
        } finally {
            setSending(false);
        }
    };

    const isSent = popup === "sent";

    return (
        <>
            <motion.div
                id="contact"
                initial={{ opacity: 0, y: 100 }}
                animate={visible ? { opacity: 1, y: 0 } : { opacity: 0, y: 100 }}
                viewport={{ amount: 0.15 }}
                onViewportEnter={() => setVisible(true)}
                onViewportLeave={(entry) => {
                    if (entry && entry.boundingClientRect.top > 0) {
                        setVisible(false);
                    }
                }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="relative z-10 mx-auto w-full max-w-7xl px-4 pt-8 pb-14 sm:px-6 sm:pt-10 sm:pb-20 lg:px-10"
            >
                <p className="font-archivoblack text-3xl text-white [text-shadow:3px_3px_0_#120f17] sm:text-4xl md:text-5xl">
                    GET IN <span className="text-[#3dff7a]">TOUCH</span>
                </p>

                <div className="mt-6 grid border-2 border-[#2a2a2a] bg-[#121212] font-kumbh text-white shadow-[5px_5px_0_0_#3dff7a] sm:shadow-[8px_8px_0_0_#3dff7a] lg:grid-cols-5 lg:shadow-[10px_10px_0_0_#3dff7a]">
                    <div className="flex min-w-0 flex-col gap-6 border-b-2 border-[#2a2a2a] bg-[#171717] p-5 sm:gap-8 sm:p-8 lg:col-span-2 lg:border-r-2 lg:border-b-0 lg:p-10">
                        <div>
                            <h2 className="font-archivoblack text-lg uppercase leading-none tracking-tighter sm:text-2xl md:text-3xl lg:text-4xl pb-5">
                                SAY HI!
                            </h2>
                            <p className="mt-4 max-w-sm text-sm text-[#8a8a8a] pb-10">Got a project in mind, or just want to chat about games and code? Message me here.</p>
                        </div>

                        <div className="flex flex-col">
                            {contacts.map((item) => {
                                const content = (
                                    <>
                                        <item.icon className="shrink-0 text-lg text-[#3dff7a]" />
                                        <div className="min-w-0 flex-1">
                                            <p className="text-[10px] uppercase tracking-widest text-[#8a8a8a]">{item.label}</p>
                                            <p className="truncate text-sm text-white">{item.value}</p>
                                        </div>
                                        {item.href && <FaArrowRight className="shrink-0 text-sm text-[#3dff7a] opacity-0 transition group-hover:translate-x-1 group-hover:opacity-100" />}
                                    </>
                                );
                                const rowClass = "group flex min-h-14 items-center gap-4 border-t-2 border-[#2a2a2a] py-4 last:border-b-2";
                                return item.href ? (
                                    <a key={item.label} href={item.href} target={item.href.startsWith("http") ? "_blank" : undefined} rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined} className={rowClass}>
                                        {content}
                                    </a>
                                ) : (
                                    <div key={item.label} className={rowClass}>
                                        {content}
                                    </div>
                                );
                            })}
                        </div>

                        <div className="mt-auto flex items-center gap-3">
                            {socials.map((social) => (
                                <a key={social.label} href={social.href} target="_blank" rel="noopener noreferrer" aria-label={social.label} className="flex h-11 w-11 items-center justify-center border-2 border-[#2a2a2a] text-lg text-white transition hover:border-[#3dff7a] hover:bg-[#3dff7a] hover:text-black">
                                    <social.icon />
                                </a>
                            ))}
                        </div>
                    </div>

                    <form onSubmit={handleSubmit} className="flex min-w-0 flex-col gap-5 p-5 sm:p-8 lg:col-span-3 lg:p-10">
                        {fields.map((field) => (
                            <div key={field.name}>
                                <label htmlFor={field.name} className={labelClass}>
                                    {field.label}
                                </label>
                                <input id={field.name} type={field.type} name={field.name} placeholder={field.placeholder} required={field.required} className={inputClass} />
                            </div>
                        ))}

                        <div>
                            <label htmlFor="message" className={labelClass}>
                                Message
                            </label>
                            <textarea id="message" name="message" placeholder="What's on your mind?" rows={6} required className={`${inputClass} resize-none`} />
                        </div>

                        <input type="text" name="_gotcha" tabIndex={-1} autoComplete="off" className="hidden" />

                        <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4">
                            <button type="submit" disabled={sending} className="flex min-h-11 w-full cursor-pointer items-center justify-center gap-2 border-2 border-[#3dff7a] bg-[#3dff7a] px-3 py-2 text-[#120f17] shadow-[3px_3px_0_0_#120f17] transition-all hover:bg-[#120f17] hover:text-[#3dff7a] active:translate-x-0.75 active:translate-y-0.75 active:shadow-none sm:w-auto sm:min-w-50">
                                {sending ? "Sending..." : "Send message"}
                            </button>
                            <p className="text-xs text-[#8a8a8a]">I usually reply within a day or two.</p>
                        </div>
                    </form>
                </div>
            </motion.div>

            {typeof document !== "undefined" &&
                createPortal(
                    <AnimatePresence>
                        {popup && (
                            <motion.div
                                key="backdrop"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.2 }}
                                onClick={() => setPopup(null)}
                                className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4 sm:px-6"
                            >
                                <motion.div
                                    role="dialog"
                                    aria-modal="true"
                                    initial={{ opacity: 0, y: 40, scale: 0.95 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    exit={{ opacity: 0, y: 40, scale: 0.95 }}
                                    transition={{ duration: 0.25, ease: "easeOut" }}
                                    onClick={(event) => event.stopPropagation()}
                                    className="relative max-h-[92vh] w-full max-w-md overflow-y-auto border-2 border-[#2a2a2a] bg-[#121212] p-6 font-kumbh text-white shadow-[6px_6px_0_0_#3dff7a] sm:p-8 sm:shadow-[8px_8px_0_0_#3dff7a]"
                                >
                                    <button type="button" onClick={() => setPopup(null)} aria-label="Close" className="absolute top-2 right-2 flex h-11 w-11 items-center justify-center text-[#8a8a8a] transition hover:text-white sm:top-3 sm:right-3">
                                        <FaTimes />
                                    </button>

                                    <div className={`flex h-12 w-12 items-center justify-center text-xl text-black ${isSent ? "bg-[#3dff7a]" : "bg-red-400"}`}>
                                        {isSent ? <FaCheck /> : <FaTimes />}
                                    </div>

                                    <h3 className="mt-5 font-archivoblack text-xl uppercase tracking-tight sm:text-2xl">
                                        {isSent ? (
                                            <>
                                                MESSAGE <span className="text-[#3dff7a]">SENT</span>
                                            </>
                                        ) : (
                                            <>
                                                SOMETHING <span className="text-red-400">WENT WRONG</span>
                                            </>
                                        )}
                                    </h3>

                                    <p className="mt-3 text-sm text-[#aaaaaa]">
                                        {isSent ? "Thanks for reaching out. I'll get back to you as soon as I can." : "Your message didn't go through. Please try again, or email me directly."}
                                    </p>

                                    <button type="button" onClick={() => setPopup(null)} className="mt-6 min-h-11 w-full bg-[#3dff7a] px-6 py-3 font-archivo text-sm text-black transition hover:bg-white sm:w-auto">
                                        {isSent ? "Close" : "Try again"}
                                    </button>
                                </motion.div>
                            </motion.div>
                        )}
                    </AnimatePresence>,
                    document.body
                )}
        </>
    );
}