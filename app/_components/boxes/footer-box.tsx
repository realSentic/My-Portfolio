import Image from "next/image";

const resources = [
  { label: "Resume", href: "resume.pdf", target: "_blank", rel: "noopener, noreferrrer" },
  { label: "Projects", href: "/projects", target: "_blank", rel: "noopener, noreferrrer" },
];

const legal = [{ label: "Privacy Policy", href: "/privacy", target: "_target", rel: "noopener, noreferrrer" }];

function FooterLinks({ title, links }: { title: string; links: { label: string; href: string; target: string; rel: string }[] }) {
    return (
        <div>
            <p className="flex h-14 items-center font-archivoblack text-xl">{title}</p>
            <ul className="mt-3 flex flex-col gap-2">
                {links.map((link) => (
                    <li key={link.label}>
                        <a href={link.href} className="text-sm text-[#aaaaaa] transition hover:text-[#3dff7a]" target={link.target} rel={link.rel}>
                            {link.label}
                        </a>
                    </li>
                 ))}
            </ul>

        </div>
  );
}

export default function FooterBox() {
  return (
    <footer id="" className="relative z-10 w-full bg-[#121212] font-kumbh text-white">
      <div className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-10 px-6 py-12 md:grid-cols-[1.5fr_1fr_1fr] md:gap-16 lg:px-10">
        <div>
          <div className="flex items-center gap-5">
            <Image
              src="/favicon.ico"
              alt="Syiam Fortunado's logo"
              width={56}
              height={56}
              className="h-14 w-14 shrink-0 object-contain"
            />
            <p className="font-archivoblack text-2xl leading-tight">
              SYIAM
              <br />
              FORTUNADO
            </p>
          </div>

          <div className="mt-5 flex max-w-sm flex-col gap-2 text-sm text-[#aaaaaa]">
            <p>Fullstack and game developer.</p>
            <p>Computer Science student building clean, fast projects.</p>
            <p>Open to internships and collaborations.</p>
          </div>
        </div>

        <FooterLinks title="Resources" links={resources} />
        <FooterLinks title="Legal" links={legal} />
      </div>

      <div className="border-t-2 border-[#2a2a2a]">
        <div className="mx-auto w-full max-w-7xl px-6 py-5 text-xs text-[#8a8a8a] lg:px-10">
          © 2026 Syiam Fortunado. All rights reserved.
        </div>
      </div>
    </footer>
  );
}