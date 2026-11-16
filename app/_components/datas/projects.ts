export type Project = {
    pName: string;
    pImage: string;
    pShortDesc?: string; // one or two lines shown on the card (falls back to pDesc)
    pDesc: string; // full description
    pLanguage: string[];
    pGithub?: string;
    pLink?: string;
    pOverview?: string; // longer text for the popup (falls back to pDesc)
    pRole?: string;
    pTimeline?: string;
    pStatus?: string;
    pFeatures?: string[];
    pChallenges?: { challenge: string; solution: string }[];
    pLearned?: string[];
};

export const Projects: Project[] = [
    {
        pName: "Gerarsyken Volunteering Form",
        pImage: "/screenshots/gerarsyken.webp",
        pShortDesc: "A volunteer registration platform for Roxas Province with automated application processing and email notifications.",
        pDesc: "An official volunteer registration and management platform for Roxas Province, featuring automated application processing, email notifications, and an administrative dashboard.",
        pLanguage: [
            "HTML",
            "CSS",
            "JavaScript",
            "Tailwind CSS",
            "n8n",
            "Google Sheets",
            "SMTP",
        ],
        pGithub: "https://github.com/realSentic/volunteering-form",
        pLink: "https://realsentic.github.io/volunteering-form",

        pOverview: "Developed as a second-year college final project, Gerarsyken is a volunteer registration and management platform designed to streamline the application process for individuals interested in volunteering in Roxas Province. The system allows applicants to submit their information through an online form, while administrators can review applications, manage applicant statuses, and monitor volunteer statistics through a dedicated dashboard. Using n8n, the platform automates application processing, Google Sheets data management, and email notifications, reducing the need for manual handling of registrations.",

        pRole: "Project Lead & Backend Developer",
        pTimeline: "3 weeks",
        pStatus: "Completed",

        pFeatures: [
            "Online Volunteer Registration: Allows individuals to submit their personal information, preferred volunteer categories, and other application details.",
            "Administrative Dashboard: Provides administrators with an overview of submitted applications, applicant details, and registration statistics.",
            "Application Management: Enables administrators to review, accept, or reject volunteer applications.",
            "Volunteer Categorization: Allows administrators to filter and monitor the number of applicants across different volunteer categories.",
            "Automated Email Notifications: Sends acceptance and rejection emails through SMTP based on application decisions.",
            "Workflow Automation: Uses n8n to process submissions, manage Google Sheets records, and coordinate automated email notifications.",
        ],

        pChallenges: [
            {
                challenge: "Limited executions in the hosted n8n environment.",
                solution: "Installed and configured n8n locally on my computer to work around the execution limitations of the hosted environment and accommodate the project's workflow requirements.",
            },
            {
                challenge: "Integrating n8n workflows with the frontend while dealing with unreliable JavaScript nodes and limited documentation.",
                solution: "Troubleshot workflow configurations, tested different node setups, and worked through the n8n documentation to establish communication between the frontend and backend automation workflows.",
            },
            {
                challenge: "Unreliable data synchronization between form submissions and Google Sheets.",
                solution: "Investigated workflow execution and data-handling issues, particularly cases where submissions were incorrectly placed in spreadsheet columns or failed to appear despite successful workflow executions.",
            },
            {
                challenge: "Coordinating a four-member team while handling complex backend development tasks.",
                solution: "Delegated frontend responsibilities to teammates, established the project's design direction, and stepped in to assist with frontend implementation whenever technical difficulties arose.",
            },
        ],

        pLearned: [
            "Developed a practical understanding of workflow automation using n8n and how it can handle backend processes without a conventional backend framework.",
            "Gained experience integrating multiple services, including frontend applications, Google Sheets, and SMTP, through automated workflows.",
            "Improved debugging and troubleshooting skills by resolving workflow execution, integration, and data synchronization issues.",
            "Developed leadership and team coordination skills by directing a four-member development team and managing task distribution.",
            "Learned to work with unfamiliar technologies, navigate technical documentation, and find solutions to implementation challenges.",
        ],
    },

    
    {
        pName: "Sky Catcher",
        pImage: "/screenshots/skycatcher.webp",
        pDesc: "A 2D arcade-style collection game where players gather clouds to earn coins and reach 100,000 coins to purchase their way out of heaven and return to Earth.",
        pLanguage: [
            "Godot 4.6",
            "GDScript",
        ],
        pGithub: "https://github.com/realSentic/cloudgame",
        pLink: "https://novamorava213.itch.io/sky-catcher",

        pOverview: "Developed for the April 2026 Portfolio Builders Jam, Sky Catcher is a 2D arcade-style game built around a unique coin-collecting objective. Players lower a bucket from heaven to collect different types of clouds, each offering varying coin rewards. The ultimate goal is to accumulate 100,000 coins to purchase a way out of heaven and return to Earth. Working in a four-member team, I handled all gameplay programming, UI design, and the integration of artwork, music, and sound effects provided by my teammates. The game was completed and submitted within the three-day game jam.",

        pRole: "Main Programmer & UI Designer",
        pTimeline: "3 days",
        pStatus: "Completed",

        pFeatures: [
            "Bucket Collection Mechanics: Allows players to control a bucket to collect clouds and earn coins.",
            "Cloud Variety: Features different cloud types with varying coin values.",
            "Currency System: Tracks collected coins and player earnings throughout the game.",
            "Progression System: Establishes a 100,000-coin objective that players must reach to return to Earth.",
            "Shop and Upgrade System: Allows players to spend their accumulated coins on upgrades.",
            "Game State Management: Implements the main menu, gameplay, pause screen, game-over screen, and victory screen.",
            "Audio Integration: Incorporates background music and sound effects into gameplay.",
            "Custom UI Design: Designed and implemented the game's user interface and gameplay screens.",
        ],

        pChallenges: [
            {
                challenge: "Implementing a large number of requested features within a strict three-day game jam deadline.",
                solution: "Managed the implementation of the requested gameplay systems and prioritized development tasks to ensure the game was completed and submitted within the allotted timeframe.",
            },
            {
                challenge: "Debugging inconsistent tweening behavior affecting bucket animations and transitions.",
                solution: "Spent additional development time troubleshooting and testing tween animations until the bucket movements and transitions behaved as intended.",
            },
            {
                challenge: "Integrating assets with incompatible file formats or oversized dimensions.",
                solution: "Coordinated with the team's artist and audio designers to resolve asset compatibility issues, while also handling necessary asset adjustments and integration independently.",
            },
        ],

        pLearned: [
            "Gained experience developing and completing a playable game under a strict three-day development deadline.",
            "Improved debugging skills by troubleshooting tween animations and unexpected gameplay behavior.",
            "Learned to integrate and manage assets produced by multiple contributors, including artwork, music, and sound effects.",
            "Developed better judgment in managing feature scope and prioritizing implementation tasks under time constraints.",
            "Strengthened collaboration skills by working alongside artists and audio designers in a multidisciplinary game development team.",
        ],
    },

    {
        pName: "String Theory",
        pImage: "/screenshots/stringtheory.webp",
        pDesc: "A full-stack electric guitar inventory management system built to manage, organize, and track guitar stock.",
        pLanguage: [
            "HTML",
            "CSS",
            "JavaScript",
            "Tailwind CSS",
            "Node.js",
            "Express.js",
            "PostgreSQL",
            "JWT"
        ],
        pGithub: "https://github.com/realSentic/guitar-inventory-frontend/blob/main/index.html",
        pLink: "https://guitar-inventory-frontend.vercel.app/",
        pOverview: "String Theory is a personal full-stack inventory management project focused on managing electric guitar stock. It provides an interface for administrators to organize guitar records, manage inventory, and monitor stock availability. The system includes admin and demo accounts, allowing visitors to explore its functionality using preset demo credentials.",
        pRole: "Full-Stack Developer",
        pTimeline: "1–2 Days",
        pStatus: "Completed",
        pFeatures: [
            "Guitar inventory management with add, edit, and delete operations.",
            "Search functionality for finding specific guitar records.",
            "Filtering functionality for narrowing down inventory results.",
            "Stock availability indicators showing whether guitars are in stock or out of stock.",
            "Guitar records containing name, brand, model, price, quantity, and category.",
            "JWT-based authentication for account access.",
            "Admin and demo accounts with preset demo credentials.",
            "PostgreSQL database integration through an Express.js API."
        ],
        pChallenges: [
            {
            challenge: "Implementing JWT-based authentication and understanding how token-based authentication works.",
            solution: "Worked through the authentication flow and integrated JWT into the backend to handle authenticated access."
            },
            {
            challenge: "Implementing the inventory filtering functionality.",
            solution: "Developed filtering logic to narrow down guitar records based on selected criteria."
            },
            {
            challenge: "Connecting PostgreSQL to the Express.js API.",
            solution: "Configured the database connection and integrated PostgreSQL operations into the backend API."
            }
        ],
        pLearned: [
            "Improved backend development skills using Node.js and Express.js.",
            "Strengthened PostgreSQL and database integration skills.",
            "Gained practical experience implementing JWT authentication.",
            "Improved understanding of API development and CRUD operations."
        ]

    },


    {
        pName: "Drunk Game: THE GAME",
        pImage: "/screenshots/drunkgame.webp",
        pDesc: "A chaotic top-down 2D game set in a Victorian-era ballroom, where players wreak havoc by throwing beer bottles, vomiting on nobles, and destroying furniture.",
        pLanguage: [
            "Godot",
            "GDScript"
        ],
        pGithub: "https://github.com/ViK0s/BadJam2",
        pLink: "https://vik0s.itch.io/drunk-game-the-game",
        pOverview: "Drunk Game: THE GAME is a comedic top-down 2D game developed for Badjam 2. Set during a lavish Victorian-era ball, players cause chaos by attacking noble guests with beer bottles and vomit while destroying furniture throughout the ballroom. The game was developed collaboratively by a five-person team within a 72-hour game jam.",
        pRole: "Programmer & UI Designer",
        pTimeline: "72 Hours (April 2026)",
        pStatus: "Completed",
        pFeatures: [
            "Top-down 2D gameplay set in a Victorian-era ballroom.",
            "Beer bottle shooting mechanics for attacking noble guests.",
            "NPC behavior with state-based reactions to player attacks.",
            "Destructible furniture and environmental interactions.",
            "Vomiting mechanic triggered by drinking beer.",
            "User interface design and implementation."
        ],
        pChallenges: [
            {
            challenge: "Learning how to implement NPC behavior using state machines, including making nobles flee when attacked by beer bottles or vomit and return to an idle state after a few seconds.",
            solution: "Learned and implemented state machine logic to manage NPC behavior and transitions between different states."
            },
            {
            challenge: "Encountering Git merge conflicts while collaborating with the main programmer.",
            solution: "Worked through version control issues while integrating changes and coordinating development through Git and GitHub."
            },
            {
            challenge: "Completing the game within a strict 72-hour deadline.",
            solution: "Worked under time pressure with the team to finish and submit the game just one minute before the deadline."
            }
        ],
        pLearned: [
            "Developed foundational AI logic for NPC behavior using state machines.",
            "Improved collaboration skills using Git and GitHub.",
            "Learned to manage development time under strict deadlines.",
            "Gained experience following technical direction and contributing under another programmer's leadership."
        ]
    }




];