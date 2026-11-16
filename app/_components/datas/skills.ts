import type { IconType } from "react-icons"

import {
    SiReact, SiNextdotjs, SiTailwindcss, SiNodedotjs, SiExpress, SiPostgresql, SiMongodb, SiMysql, SiPython, SiPostman, SiTypescript, SiJavascript, SiDocker, SiGit, SiGithub, SiFigma, SiHtml5, SiCss, SiFastapi, SiDjango, SiSocketdotio, SiGodotengine, SiUnity, SiGamemaker
} from "react-icons/si";

import { DiJava } from "react-icons/di";

type Skill = { name: string; icon?: IconType; image?: string; color?: string; scale?: number };
type SkillGroup = { title: string; items: Skill[]}

export const skillGroups: SkillGroup[] = [
        {
        title: "FRONTEND",
        items: [
            {name: "HTML", icon: SiHtml5, color: "#E34F26"},
            {name: "CSS", icon: SiCss, color: "#1572B6"},
            {name: "React", icon: SiReact, color: "#61DAFB"},
            {name: "NextJS", icon: SiNextdotjs, color: "#FFFFFF"},
            {name: "Tailwind", icon: SiTailwindcss, color: "#06B6D4"},
        ]
    },
    {
        title: "BACKEND",
        items: [
            {name: "NodeJS", icon: SiNodedotjs, color: "#5FA04E"},
            {name: "Express", icon: SiExpress, color: "#FFFFFF"},
            {name: "FastAPI", icon: SiFastapi, color: "#009688"},
            {name: "Django", icon: SiDjango, color: "#44B78B"},
            {name: "Socket.io", icon: SiSocketdotio, color: "#FFFFFF"},
        ]
    },
    {
        title: "DATABASE",
        items: [
            {name: "MySQL", icon: SiMysql, color: "#4479A1"},
            {name: "PostgreSQL", icon: SiPostgresql, color: "#4169E1"},
            {name: "MongoDB", icon: SiMongodb, color: "#47A248"},
        ]
    },
    {
        title: "LANGUAGE",
        items: [
            {name: "Python", icon: SiPython, color: "#FFD43B"},
            {name: "Javascript", icon: SiJavascript, color: "#F7DF1E"},
            {name: "Typescript", icon: SiTypescript, color: "#3178C6"},
            {name: "Java", icon: DiJava, color: "#F89820", scale: 1.5}
        ]
    },
    {
        title: "DEVOPS",
        items: [
            {name: "Github", icon: SiGithub, color: "#FFFFFF"},
            {name: "Git", icon: SiGit, color: "#F05032"},
            {name: "Docker", icon: SiDocker, color: "#2496ED"},
        ]
    },
    {
        title: "GAME ENGINE",
        items: [
            {name: "Godot", icon: SiGodotengine, color: "#478CBF"},
            {name: "Unity", icon: SiUnity, color: "#FFFFFF"},
            {name: "GameMaker", icon: SiGamemaker, color: "#FFFFFF"},
        ]
    },
    {
        title: "OTHER",
        items: [
            {name: "Figma", icon: SiFigma, color: "#F24E1E"},
            {name: "Postman", icon: SiPostman, color: "#FF6C37"},
            {name: "Adobe AE", image: "/svg/aftereffects.svg"},
        ]
    },


];