import type { Metadata } from "next";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

import FooterBox from "../_components/boxes/footer-box";
import ProjectsGrid from "../_components/comp/projects-grid";

export const metadata: Metadata = {
    title: "Projects | Syiam Fortunado",
    description: "A collection of the projects I've built.",
};

export default function ProjectsPage() {
    return (
        <div>
            <div className="fixed inset-0 z-0 bg-[#171717]" />
                

            <main className="relative z-10 min-h-screen text-white">
                <div className="mx-auto w-full max-w-7xl px-6 py-10 lg:px-10">
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 border-2 border-[#505050] px-4 py-2 font-archivoblack text-xs tracking-wide text-[#aaaaaa] shadow-[3px_3px_0_0_#505050] transition-all hover:border-[#3dff7a] hover:text-[#3dff7a] hover:shadow-[3px_3px_0_0_#3dff7a] active:translate-x-0.75 active:translate-y-0.75 active:shadow-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                    >
                        <FontAwesomeIcon icon={faArrowLeft} className="text-sm" />
                        <span>BACK HOME</span>
                    </Link>

                    <h1 className="mt-10 font-archivoblack text-5xl uppercase leading-none tracking-tighter sm:text-6xl md:text-7xl [text-shadow:3px_3px_0_#120f17]">
                        ALL <span className="text-[#3dff7a]">PROJECTS</span>
                    </h1>

                    <p className="mt-6 max-w-2xl font-kumbh text-lg text-[#797979]">
                        Everything I&apos;ve built so far. Filter by technology to find what you&apos;re looking for.
                    </p>

                    <ProjectsGrid />
                </div>

                <div className="mt-12">
                    <FooterBox />
                </div>
            </main>
        </div>
    );
}