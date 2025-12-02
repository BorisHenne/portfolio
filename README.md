# Portfolio Boris Henné

Portfolio personnel - Consultant SAP ABAP/Fiori & Full-Stack Developer.

**Live:** [boris-henne.fr](https://boris-henne.fr)

## Stack

| Category | Tech |
|----------|------|
| Frontend | React 18, TypeScript, Vite 6 |
| Styling | Tailwind CSS 3.4, Framer Motion |
| State | Zustand |
| i18n | react-i18next (FR/EN) |
| Auth | Google OAuth 2.0 |
| Infra | Docker, Nginx Alpine, Cloudflare Tunnel |

## Quick Start

```bash
git clone https://github.com/BorisHenne/portfolio.git
cd portfolio
npm install
npm run dev
```

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Dev server (localhost:5173) |
| `npm run build` | Production build |
| `npm run preview` | Preview build |
| `npm run lint` | ESLint check |

## Docker Deployment

```bash
# With OAuth
export VITE_GOOGLE_CLIENT_ID='your-client-id'
curl -fsSL https://raw.githubusercontent.com/BorisHenne/portfolio/main/deploy.sh | sudo bash

# Without OAuth
curl -fsSL https://raw.githubusercontent.com/BorisHenne/portfolio/main/deploy.sh | sudo bash
```

## Configuration

Create `.env`:

```env
VITE_GOOGLE_CLIENT_ID=xxx    # Google OAuth (optional)
VITE_ADMIN_EMAIL=xxx         # Authorized admin email
VITE_APP_URL=https://xxx     # Public URL
```

## Project Structure

```
├── src/
│   ├── components/      # React components
│   │   ├── admin/       # Admin panel (OAuth)
│   │   ├── layout/      # Navbar, Footer
│   │   ├── sections/    # Hero, About, Career...
│   │   └── ui/          # Reusable UI
│   ├── i18n/locales/    # Translations
│   ├── stores/          # Zustand stores
│   └── utils/           # Utilities
├── public/              # Static assets
├── docker/              # Nginx config
├── data/                # Runtime data (mounted)
│   ├── videos/          # SAP TechEd videos
│   ├── cv/              # CV PDF
│   └── logos/           # Custom logos
├── Dockerfile           # Multi-stage build
└── docker-compose.yml   # Container orchestration
```

## Features

- Responsive mobile-first design
- Dark theme with glassmorphism
- Lazy loading & code splitting
- Video autoplay on scroll
- Admin dashboard (Google OAuth)
- CV upload functionality

## License

MIT © Boris Henné
