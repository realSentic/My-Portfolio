import { FloatingNav } from "../_components/comp/navbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFolderOpen } from "@fortawesome/free-solid-svg-icons";

import ResumeButton from "../_components/comp/resume-button";
import Pattern from "../_components/comp/pattern";
import Halftone from "../_components/comp/halftone";
import AboutBox from "../_components/boxes/about-box";
import ProjectBox from "../_components/boxes/project-box";
import SkillsBox from "../_components/boxes/skills-box";
import Fuzzy from "../_components/comp/fuzzy";
import GithubStats from "../_components/comp/github";
import ContactBox from "../_components/boxes/contact-box";
import FooterBox from "../_components/boxes/footer-box";
import IntroScreen from "../_components/comp/intro-screen";
import ScrollToTop from "../_components/comp/scroll-to-top";

const navItems = [
    { name: "Home", link: "/" },
    { name: "About", link: "#about" },
    { name: "Skills", link: "#skills" },
    { name: "Projects", link: "#projects" },
    { name: "Contact", link: "#contact", cta: true },
];

export default function Home() {
    return (
        <div className="overflow-x-clip">
            <ScrollToTop />
            <IntroScreen />

            <nav>
                <FloatingNav navItems={navItems} />
            </nav>

            <div className="fixed inset-x-0 top-0 z-0 h-lvh transform-gpu bg-[#171717]">
                <Pattern />
            </div>

            <section className="pointer-events-auto relative z-10 flex min-h-svh items-start text-white lg:items-center">
                <div className="mx-auto flex w-full max-w-7xl flex-col items-center justify-center gap-6 px-4 pb-12 pt-24 sm:gap-10 sm:px-6 sm:pb-16 sm:pt-28 lg:flex-row lg:justify-between lg:gap-6 lg:px-10 lg:py-24">
                    <div className="flex w-full min-w-0 max-w-2xl flex-col items-start gap-5 text-left sm:gap-6">
                        <p className="pl-2 font-kumbh text-2xl font-black text-[#3dff7a] sm:text-3xl">Hello! I&apos;m...</p>
                        <h1 className="font-archivoblack text-4xl uppercase leading-none tracking-tighter [text-shadow:3px_3px_0_#120f17] min-[400px]:text-5xl sm:text-6xl md:text-7xl lg:text-8xl">
                            SYIAM FORTUNADO
                        </h1>
                        <div className="h-16 w-full overflow-hidden sm:h-20">
                            <Fuzzy />
                        </div>

                        <div className="flex w-full max-w-md flex-wrap gap-3 pl-1 font-kumbh sm:gap-5">
                            <a href="/projects" className="group flex min-h-11 min-w-32 flex-1 cursor-pointer items-center justify-center gap-2 border-2 border-[#3dff7a] bg-[#3dff7a] px-3 py-2 text-[#120f17] shadow-[3px_3px_0_0_#120f17] transition-all duration-150 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:bg-[#120f17] hover:text-[#3dff7a] hover:shadow-[5px_5px_0_0_#3dff7a] active:translate-x-0.75 active:translate-y-0.75 active:shadow-none">
                                <span>Projects</span>
                                <FontAwesomeIcon icon={faFolderOpen} className="text-sm transition-transform duration-150 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                            </a>

                            <ResumeButton />
                        </div>
                    </div>

                    <div className="pointer-events-auto order-first h-56 w-56 shrink-0 sm:h-72 sm:w-72 md:h-96 md:w-96 lg:order-last lg:h-125 lg:w-[45%] lg:max-w-130 xl:h-150">
                        <Halftone />
                    </div>
                </div>
            </section>

            <div className="flex flex-col gap-8 sm:gap-12">
                <AboutBox />
                <SkillsBox stats={<GithubStats />} />
                <ProjectBox />
                <ContactBox />
                <FooterBox />
            </div>
        </div>
    );
}
