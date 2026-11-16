import type { Metadata } from "next";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import "@fortawesome/fontawesome-svg-core/styles.css";

import FooterBox from "../_components/boxes/footer-box";

export const metadata: Metadata = {
    title: "Privacy Policy | Syiam Fortunado",
    description: "How this portfolio website handles your information.",
};

const LAST_UPDATED = "November 15, 2026";
const CONTACT_EMAIL = "syiamfortunado@gmail.com";

type Section = {
    title: string;
    paragraphs?: string[];
    bullets?: string[];
};

const sections: Section[] = [
    {
        title: "Overview",
        paragraphs: [
            "This is a personal portfolio website. It collects as little information as possible. This policy explains what information may be collected when you visit this site or contact me, and how it is used.",
        ],
    },
    {
        title: "Information Collected",
        paragraphs: [
            "You do not need an account to use this site. The only information collected is:",
        ],
        bullets: [
            "Contact form submissions: the name, email address, and message you choose to send.",
            "Emails you send me directly through the email link on this site.",
            "Basic technical data automatically received by the hosting provider, such as IP address, browser type, device type, pages requested, and timestamps.",
        ],
    },
    {
        title: "How Information Is Used",
        paragraphs: ["Information is used only to:"],
        bullets: [
            "Read and respond to your messages, including internship and collaboration inquiries.",
            "Keep the website secure, working properly, and free from abuse.",
        ],
    },
    {
        title: "Analytics and Cookies",
        paragraphs: [
            "This site does not use analytics or advertising trackers, and it does not set cookies of its own. Third-party services described below may process technical data or set their own cookies as part of delivering their content. You can manage or delete cookies through your browser settings.",
        ],
    },
    {
        title: "Third-Party Services",
        paragraphs: [
            "This site relies on the following services, which may receive technical data such as your IP address when your browser loads their content. Each is governed by its own privacy policy.",
        ],
        bullets: [
            "Vercel: website hosting and delivery.",
            "Google Fonts: web fonts used for the site's typography.",
            "Font Awesome: icons loaded from its content delivery network.",
        ],
    },
    {
        title: "External Links",
        paragraphs: [
            "This site links to external websites, such as GitHub, LinkedIn, and project demos. I do not control these sites and am not responsible for their privacy practices.",
        ],
    },
    {
        title: "Data Sharing",
        paragraphs: [
            "Your personal information is never sold, rented, or traded. It is shared only with the service providers needed to operate this site, or where disclosure is required by law.",
        ],
    },
    {
        title: "Retention and Security",
        paragraphs: [
            "Messages are kept only as long as needed to respond and follow up. Server logs are retained according to the hosting provider's policies. Reasonable measures are taken to protect your information, but no method of transmission or storage over the internet is completely secure.",
        ],
    },
    {
        title: "Your Rights",
        paragraphs: [
            "Under the Philippine Data Privacy Act of 2012 (Republic Act No. 10173), you have the right to:",
        ],
        bullets: [
            "Be informed about how your personal data is processed.",
            "Access the personal data held about you.",
            "Correct inaccurate or outdated data.",
            "Request deletion or blocking of your data.",
            "Object to processing or withdraw your consent.",
        ],
    },
    {
        title: "Children's Privacy",
        paragraphs: [
            "This site is not directed at children, and personal information is not knowingly collected from anyone under 13. If you believe a child has submitted personal information, please contact me and it will be deleted.",
        ],
    },
    {
        title: "Changes to This Policy",
        paragraphs: [
            "This policy may be updated from time to time. Changes will be posted on this page with a new \"last updated\" date.",
        ],
    },
];

function SectionTitle({ number, title }: { number: number; title: string }) {
    return (
        <h2 className="flex items-start gap-4 font-archivoblack text-sm uppercase leading-snug tracking-wide text-white">
            <div className="w-7 shrink-0 text-[#3dff7a]">{String(number).padStart(2, "0")}</div>
            <div>{title}</div>
        </h2>
    );
}

export default function PrivacyPage() {
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
                        PRIVACY <span className="text-[#3dff7a]">POLICY</span>
                    </h1>

                    <article className="mt-10 border-2 border-[#505050] bg-[#121212] shadow-[6px_6px_0_0_#3dff7a]">
                        <header className="border-b-2 border-[#2a2a2a] px-6 py-5 sm:px-10">
                            <p className="font-kumbh text-sm text-[#797979]">
                                Last updated: {LAST_UPDATED}
                            </p>
                        </header>

                        <div className="divide-y-2 divide-[#2a2a2a]">
                            {sections.map((section, index) => (
                                <section
                                    key={section.title}
                                    className="grid gap-3 px-6 py-8 sm:px-10 md:grid-cols-[240px_1fr] md:gap-10"
                                >
                                    <SectionTitle number={index + 1} title={section.title} />

                                    <div className="max-w-3xl font-kumbh text-[15px] leading-relaxed text-[#aaaaaa]">
                                        {section.paragraphs?.map((text) => (
                                            <p key={text} className="not-first:mt-3">
                                                {text}
                                            </p>
                                        ))}

                                        {section.bullets && (
                                            <ul className="mt-3 flex flex-col gap-2">
                                                {section.bullets.map((item) => (
                                                    <li key={item} className="flex gap-3">
                                                        <span
                                                            className="mt-2 h-1.5 w-1.5 shrink-0 bg-[#3dff7a]"
                                                            aria-hidden="true"
                                                        />
                                                        <span>{item}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        )}
                                    </div>
                                </section>
                            ))}

                            <section className="grid gap-3 px-6 py-8 sm:px-10 md:grid-cols-[240px_1fr] md:gap-10">
                                <SectionTitle number={sections.length + 1} title="Contact" />
                                <p className="max-w-3xl font-kumbh text-[15px] leading-relaxed text-[#aaaaaa]">
                                    For questions about this policy or to exercise your rights, contact{" "}
                                    <a
                                        href={`mailto:${CONTACT_EMAIL}`}
                                        className="text-[#3dff7a] underline underline-offset-4 transition hover:text-white"
                                    >
                                        {CONTACT_EMAIL}
                                    </a>
                                    .
                                </p>
                            </section>
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