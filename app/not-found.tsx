import type { Metadata } from "next";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import "@fortawesome/fontawesome-svg-core/styles.css";

import FooterBox from "./_components/boxes/footer-box";

export const metadata: Metadata = {
    title: "Page Not Found | Syiam Fortunado",
    description: "The page you are looking for does not exist.",
};

export default function NotFound() {
    return (
        <div>
            <div className="fixed inset-0 z-0 bg-[#171717]" />

            <main className="relative z-10 flex min-h-screen flex-col text-white">
                <div className="mx-auto w-full max-w-7xl flex-1 px-6 py-10 lg:px-10">
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 border-2 border-[#505050] px-4 py-2 font-archivoblack text-xs tracking-wide text-[#aaaaaa] shadow-[3px_3px_0_0_#505050] transition-all hover:border-[#3dff7a] hover:text-[#3dff7a] hover:shadow-[3px_3px_0_0_#3dff7a] active:translate-x-0.75 active:translate-y-0.75 active:shadow-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                    >
                        <FontAwesomeIcon icon={faArrowLeft} className="text-sm" />
                        <span>BACK HOME</span>
                    </Link>

                    <h1 className="mt-10 font-archivoblack text-5xl uppercase leading-none tracking-tighter sm:text-6xl md:text-7xl [text-shadow:3px_3px_0_#120f17]">
                        PAGE <span className="text-[#3dff7a]">NOT FOUND</span>
                    </h1>

                    <article className="mt-10 border-2 border-[#505050] bg-[#121212] shadow-[6px_6px_0_0_#3dff7a]">
                        <header className="border-b-2 border-[#2a2a2a] px-6 py-5 sm:px-10">
                            <p className="font-kumbh text-sm text-[#797979]">Error 404</p>
                        </header>

                        <div className="grid gap-3 px-6 py-8 sm:px-10 md:grid-cols-[240px_1fr] md:gap-10">
                            <div className="font-archivoblack text-7xl leading-none tracking-tighter text-[#3dff7a] [text-shadow:3px_3px_0_#120f17] sm:text-8xl">
                                404
                            </div>

                            <div className="max-w-3xl font-kumbh text-[15px] leading-relaxed text-[#aaaaaa]">
                                <p>
                                    The page you are looking for doesn&apos;t exist, was moved, or the link
                                    is broken.
                                </p>
                                <p className="mt-3">
                                    Double-check the URL, or head back to the homepage to keep exploring.
                                </p>

                                <Link
                                    href="/"
                                    className="group mt-6 inline-flex min-h-11 items-center justify-center gap-2 border-2 border-[#3dff7a] bg-[#3dff7a] px-5 py-2 font-kumbh text-[#120f17] shadow-[3px_3px_0_0_#120f17] transition-all duration-150 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:bg-[#120f17] hover:text-[#3dff7a] hover:shadow-[5px_5px_0_0_#3dff7a] active:translate-x-0.75 active:translate-y-0.75 active:shadow-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                                >
                                    <span>Take me home</span>
                                </Link>
                            </div>
                        </div>
                    </article>
                </div>

                <div className="mt-12">
                    <FooterBox />
                </div>
            </main>
        </div>
    );
}