"use client";

import { useState } from "react";
import { motion } from "motion/react";

import { GoTrophy, GoVerified, GoMortarBoard } from "react-icons/go";
import type { IconType } from "react-icons";

type Achievement = {
    title: string;
    issuer: string;
    year: string;
    icon: IconType;
};

export default function AboutBox() {
    const [visible, setVisible] = useState(false);

    const achievements: Achievement[] = [
        { title: "Game Jam First Runner-Up", issuer: "Badjam 2", year: "2026", icon: GoTrophy },
        { title: "Fullstack Developer Certificate", issuer: "FreeCodeCamp", year: "2025", icon: GoVerified },
        { title: "SM Foundation Scholar", issuer: "SM Foundation", year: "2024", icon: GoMortarBoard },
    ];

    return (
        <>
            <motion.div
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
            >
                <div id="about" className="relative z-10 text-white">
                    <div className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 sm:py-10 lg:px-10">
                        <p className="font-archivoblack text-3xl [text-shadow:3px_3px_0_#120f17] sm:text-4xl md:text-5xl">
                            ABOUT <span className="text-[#3dff7a]">ME</span>
                        </p>

                        <div className="mt-6 flex flex-col gap-6 border-2 border-[#2a2a2a] bg-[#121212] p-3 shadow-[5px_5px_0_0_#3dff7a] sm:p-6 sm:shadow-[8px_8px_0_0_#3dff7a] lg:flex-row lg:gap-10 lg:shadow-[10px_10px_0_0_#3dff7a] xl:gap-25">
                            <div className="min-w-0 p-2 text-left font-kumbh text-base text-[#aaaaaa] sm:p-5 sm:text-justify sm:text-lg lg:max-w-lg lg:text-xl">
                                <p>I&apos;m a Computer Science student with a strong interest in full-stack web development. I enjoy building applications, turning ideas into functional solutions, and creating digital experiences that are both intuitive and practical.</p>
                                <br />
                                <p>My interests span both frontend and backend development, where I enjoy exploring different technologies and applying them to personal and academic projects.</p>
                                <br />
                                <p>I&apos;m always interested in connecting with fellow developers and professionals, collaborating on meaningful projects, and exploring internship opportunities. I&apos;m also open to future career opportunities where I can contribute my skills, gain valuable experience, and continue growing as a software developer.</p>
                            </div>

                            <div className="flex min-w-0 flex-col lg:flex-1">
                                <div className="flex flex-col gap-1 p-2 text-left font-kumbh text-base sm:p-5 sm:text-lg lg:max-w-lg lg:text-xl">
                                    <p className="text-xl font-black sm:text-2xl">Education</p>
                                    <p className="font-semibold">Bachelor of Science in Computer Science</p>
                                    <p className="text-[#3dff7a]">2024 - Present</p>
                                    <p className="text-[#aaaaaa]">Filamer Christian University, Roxas City, Capiz, Philippines</p>
                                </div>

                                <div className="mt-6 pb-10 w-full min-w-0 px-2 font-kumbh sm:px-5 lg:max-w-lg">
                                    <p className="text-lg font-black">ACHIEVEMENTS</p>
                                    <p className="text-xs text-[#8a8a8a]">Awards and Certificates</p>
                                    <br />

                                    <ul className="flex flex-col gap-2">
                                        {achievements.map((item) => (
                                            <li key={item.title} className="group flex items-center gap-3 border-2 border-[#3a3a3a] bg-[#2a2a2a] px-3 py-3 transition hover:border-[#3dff7a]">
                                                <item.icon className="shrink-0 text-xl text-[#3dff7a]/60 transition group-hover:text-[#3dff7a]" />
                                                <div className="min-w-0 flex-1">
                                                    <p className="truncate text-sm font-black text-white">{item.title}</p>
                                                    <p className="truncate text-xs text-[#8a8a8a]">{item.issuer}</p>
                                                </div>
                                                <span className="shrink-0 font-archivoblack text-xs text-[#3dff7a]">{item.year}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <br />
            </motion.div>
        </>
    );
}