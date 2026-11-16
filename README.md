# Syiam Fortunado | Portfolio

My personal portfolio website, built with a neo-brutalist look: dark background, neon green accents, hard offset shadows, and a halftone hero.

**Live site:** [LIVE_URL](LIVE_URL)

<!-- Add a screenshot: ![Portfolio preview](./public/preview.png) -->

## Features

- **Intro screen** with a loading counter, a welcome message, and a curtain-reveal animation
- **Always starts at the top** on refresh or a fresh visit (scroll restoration is disabled)
- **Floating navbar** with section links and a contact call-to-action
- **Animated hero** with a fuzzy text effect, looping text, and an interactive halftone graphic
- **Sections:** About, Skills (with live GitHub stats and contribution calendar), Projects, Contact, and Footer
- **Contact form** powered by Formspree
- **Route loading states** between pages
- **Privacy Policy page** and a custom **404 page** that match the site's style
- **Responsive** layout from mobile up to large desktop screens

## Tech Stack

- [Next.js](https://nextjs.org/) (App Router)
- [React](https://react.dev/) and TypeScript
- [Tailwind CSS](https://tailwindcss.com/)
- [Motion](https://motion.dev/) for animations
- [Font Awesome](https://fontawesome.com/) for icons
- [Formspree](https://formspree.io/) for the contact form
- Google Fonts: Archivo Black and Kumbh Sans
- Deployed on [Vercel](https://vercel.com/)

## Getting Started

### Prerequisites

- Node.js 20.9 or newer
- npm

### Installation

```bash
git clone https://github.com/GITHUB_USERNAME/REPO_NAME.git
cd REPO_NAME
npm install
```

### Environment variables

Create a `.env.local` file in the project root:

```env
# Formspree form ID (from your form's endpoint: https://formspree.io/f/<ID>)
NEXT_PUBLIC_FORMSPREE_ID=your_formspree_form_id

# GitHub API key used for the GitHub stats and contribution calendar
GITHUB_TOKEN=your_github_api_key
```

Never commit `.env.local` to the repository. When deploying, add the same variables in your Vercel project settings.

### Run the dev server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for production

```bash
npm run build
npm run start
```

## Project Structure

```text
app/
├── _components/
│   ├── boxes/              # Page sections
│   │   ├── about-box.tsx
│   │   ├── contact-box.tsx
│   │   ├── footer-box.tsx
│   │   ├── project-box.tsx
│   │   └── skills-box.tsx
│   ├── comp/               # Reusable components
│   │   ├── fuzzy.tsx
│   │   ├── github-calendar.tsx
│   │   ├── github.tsx
│   │   ├── halftone.tsx
│   │   ├── intro-screen.tsx
│   │   ├── loading-screen.tsx
│   │   ├── looptext.tsx
│   │   ├── navbar.tsx
│   │   ├── pattern.tsx
│   │   ├── projects-grid.tsx
│   │   ├── route-loader.tsx
│   │   └── scroll-to-top.tsx
│   └── datas/              # Content data
│       ├── projects.ts
│       └── skills.ts
├── (main)/
│   └── page.tsx            # Home page
├── privacy/
│   └── page.tsx            # Privacy Policy
├── projects/               # Projects route
├── globals.css
├── layout.tsx
├── loading.tsx
└── not-found.tsx           # Custom 404 page
components/                 # Shared components
lib/                        # Utilities
public/                     # Static assets (including resume.pdf)
```

## Customizing

- **Projects and skills:** edit `app/_components/datas/projects.ts` and `app/_components/datas/skills.ts`.
- **Page sections:** edit the components in `app/_components/boxes/`.
- **Navigation:** update the `navItems` array in the home page.
- **Resume:** replace `public/resume.pdf` with your own file.
- **Colors:** the main palette is `#171717` (background), `#120f17` (dark accent), and `#3dff7a` (neon green). Search for these values to change the theme.
- **Intro timing:** adjust `LOADING_MS`, `WELCOME_MS`, and `REVEAL_MS` in `intro-screen.tsx`.

## Deployment

The easiest way to deploy is with [Vercel](https://vercel.com/new). Import the repository, add your environment variables, and Vercel detects Next.js automatically. Every push to the main branch triggers a new deployment.

## Contact

- Email: [syiamfortunado@gmail.com](mailto:syiamfortunado@gmail.com)
- GitHub: [GITHUB_PROFILE_URL](GITHUB_PROFILE_URL)
- LinkedIn: [LINKEDIN_PROFILE_URL](LINKEDIN_PROFILE_URL)

## License

This project is licensed under the [MIT License](./LICENSE).
