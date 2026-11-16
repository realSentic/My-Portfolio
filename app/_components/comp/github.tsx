import { GoGitCommit, GoRocket, GoRepo } from "react-icons/go";

const USERNAME = "realSentic";
const PROJECT_SHIPPED = 3;

async function getData() {
    const [contribRes, userRes] = await Promise.all([
        fetch(`https://github-contributions-api.jogruber.de/v4/${USERNAME}?y=last`, { next: { revalidate: 3000 } }),
        fetch(`https://api.github.com/users/${USERNAME}`, { next: { revalidate: 3000 } }),
    ]);

    const contrib = contribRes.ok ? await contribRes.json() : null;
    const user = userRes.ok ? await userRes.json() : null;

    return {
        contributions: contrib?.total?.lastYear ?? 0,
        publicRepos: user?.public_repos ?? 0,
    };
}

export default async function GithubStats() {
    const { contributions, publicRepos } = await getData();

    const stats = [
        { label: "Contributions (Last year)", value: contributions, icon: GoGitCommit },
        { label: "Projects Shipped", value: PROJECT_SHIPPED, icon: GoRocket },
        { label: "Public Repos", value: publicRepos, icon: GoRepo },
    ];

    return (
        <div className="w-full">
            <div className="mt-6 grid w-full grid-cols-1 gap-5">
                {stats.map((stat) => (
                    <div
                        key={stat.label}
                        className="relative flex flex-col border-2 border-[#3a3a3a] bg-[#2a2a2a] px-4 py-4 transition hover:border-[#3dff7a]"
                    >
                        <stat.icon className="absolute top-4 right-4 text-2xl text-[#3dff7a]/30" />
                        <p className="pr-8 text-sm text-[#8a8a8a]">{stat.label}</p>
                        <p className="mt-auto pt-2 font-archivoblack text-4xl text-[#3dff7a]">{stat.value}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}