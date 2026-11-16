"use client";

import { useState, type ReactNode } from "react";
import { motion } from "motion/react";
import Image from "next/image";
import { FaGithub } from "react-icons/fa";
import { skillGroups } from "../datas/skills";
import Calendar from "../comp/github-calendar";
import { Suspense } from "react";

const USERNAME = "realSentic";
const PROFILE_URL = `https://github.com/${USERNAME}`;

export default function SkillsBox({ stats }: { stats: ReactNode }) {
    const [visible, setVisible] = useState(false);

    return (
        <motion.div
            id="skills"
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
            className="relative z-10 mx-auto w-full max-w-7xl px-4 pt-8 pb-8 sm:px-6 sm:pt-10 sm:pb-10 lg:px-10"
        >
            <p className="font-archivoblack text-3xl text-white [text-shadow:3px_3px_0_#120f17] sm:text-4xl md:text-5xl">
                MY <span className="text-[#3dff7a]">SKILLS</span>
            </p>

            <div className="mt-6 flex flex-col gap-6 border-2 border-[#2a2a2a] bg-[#121212] p-3 font-kumbh text-white shadow-[5px_5px_0_0_#3dff7a] sm:gap-8 sm:p-6 sm:shadow-[8px_8px_0_0_#3dff7a] lg:flex-row lg:gap-10 lg:shadow-[10px_10px_0_0_#3dff7a]">
                <div className="flex min-w-0 flex-1 basis-0 flex-col gap-6 p-1 sm:p-4">
                    {skillGroups.map((group) => (
                        <div key={group.title}>
                            <p className="pb-3 text-lg font-black">{group.title}</p>
                            <ul className="grid grid-cols-2 gap-2 sm:grid-cols-[repeat(auto-fill,minmax(7.5rem,1fr))]">
                                {group.items.map((skill) => (
                                    <li key={skill.name} className="flex min-h-10 items-center justify-between gap-2 border-2 border-[#2a2a2a] bg-[#2a2a2a] px-3 py-2 text-xs text-[#aaaaaa] transition hover:border-[#3dff7a] hover:text-white">
                                        <span className="min-w-0 truncate">{skill.name}</span>
                                        {skill.icon ? (
                                            <skill.icon color={skill.color} className="shrink-0" style={skill.scale ? { transform: `scale(${skill.scale})` } : undefined} />
                                        ) : (
                                            skill.image && (
                                                <Image src={skill.image} alt={skill.name} width={20} height={20} className="h-[1em] w-[1em] shrink-0" />
                                            )
                                        )}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                <div className="flex min-w-0 flex-1 basis-0 flex-col gap-5 border-t-2 border-[#2a2a2a] pt-6 lg:border-t-0 lg:border-l-2 lg:pt-2 lg:pl-10">
                    <div className="pt-2">
                        <p className="text-lg font-black">GITHUB ACTIVITY</p>
                        <p className="text-xs text-[#8a8a8a]">Contributions over the last 6 months</p>
                    </div>

                    <div className="min-w-0 p-1 sm:p-4">
                        <div className="overflow-x-auto">
                            <div className="w-full">
                                <Suspense fallback={<div className="h-32 animate-pulse" />}>
                                    <Calendar username={USERNAME} />
                                </Suspense>
                            </div>
                        </div>

                        <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t-2 border-[#1a1a1a] pt-4">
                            <div className="flex items-center gap-2 text-sm text-[#aaaaaa]">
                                <FaGithub className="text-lg text-white" />
                                <span>@{USERNAME}</span>
                            </div>

                            <a href={PROFILE_URL} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center font-archivoblack text-xs tracking-wide text-[#3dff7a] transition hover:text-white">
                                VIEW PROFILE →
                            </a>
                        </div>
                    </div>

                    {stats}
                </div>
            </div>
        </motion.div>
    );
}