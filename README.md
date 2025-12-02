# 🚀 Portfolio Boris Henné

[![CI/CD Pipeline](https://github.com/BorisHenne/portfolio/actions/workflows/ci-cd.yml/badge.svg)](https://github.com/BorisHenne/portfolio/actions/workflows/ci-cd.yml)
[![Website](https://img.shields.io/website?url=https%3A%2F%2Fboris-henne.fr)](https://boris-henne.fr)

Portfolio personnel de **Boris Henné** - Consultant Technique Senior SAP ABAP/Fiori & Full-Stack Developer.

🌐 **Live:** [boris-henne.fr](https://boris-henne.fr)

---

## 📋 Table des matières

- [Stack technique](#-stack-technique)
- [Architecture](#-architecture)
- [Installation locale](#-installation-locale)
- [Configuration](#-configuration)
- [Déploiement](#-déploiement)
- [CI/CD Pipeline](#-cicd-pipeline)
- [Structure du projet](#-structure-du-projet)

---

## 🛠 Stack technique

| Catégorie | Technologies |
|-----------|--------------|
| **Frontend** | React 18, TypeScript, Vite 6 |
| **Styling** | Tailwind CSS 3.4, Framer Motion 11 |
| **State** | Zustand 5, React Context |
| **i18n** | i18next, react-i18next |
| **Auth** | Google OAuth 2.0 |
| **Build** | Vite, ESBuild, SWC |
| **Container** | Docker, Nginx Alpine |
| **CI/CD** | GitHub Actions |
| **Hosting** | LWS (FTP) / NAS Ugreen (Docker) |

---

## 🏗 Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                        GitHub Repository                         │
│                              │                                   │
│                    ┌─────────▼─────────┐                        │
│                    │  GitHub Actions   │                        │
│                    │   CI/CD Pipeline  │                        │
│                    └─────────┬─────────┘                        │
│                              │                                   │
│              ┌───────────────┴───────────────┐                  │
│              │                               │                  │
│      ┌───────▼───────┐               ┌───────▼───────┐          │
│      │  FTP Deploy   │               │ Docker Build  │          │
│      │    (LWS)      │               │ Push to GHCR  │          │
│      └───────┬───────┘               └───────┬───────┘          │
│              │                               │                  │
│      ┌───────▼───────┐               ┌───────▼───────┐          │
│      │   LWS Server  │               │  NAS Ugreen   │          │
│      │ boris-henne.fr│               │  (Watchtower) │          │
│      └───────────────┘               └───────────────┘          │
└─────────────────────────────────────────────────────────────────┘
```

---

## 💻 Installation locale

### Prérequis

- Node.js >= 20.0.0
- npm >= 10.0.0
- Git

### Étapes

```bash
# 1. Cloner le repository
git clone https://github.com/BorisHenne/portfolio.git
cd portfolio

# 2. Installer les dépendances
npm install

# 3. Copier et configurer les variables d'environnement
cp .env.example .env
# Éditer .env avec vos valeurs

# 4. Lancer le serveur de développement
npm run dev

# 5. Ouvrir http://localhost:5173
```

### Scripts disponibles

| Commande | Description |
|----------|-------------|
| `npm run dev` | Serveur de développement |
| `npm run build` | Build de production |
| `npm run preview` | Preview du build |
| `npm run lint` | Lint ESLint |
| `npm run type-check` | Vérification TypeScript |
| `npm run test` | Tests unitaires |
| `npm run analyze` | Analyse du bundle |

---

## ⚙️ Configuration

### Variables d'environnement

Créer un fichier `.env` à la racine :

```env
# Application
VITE_APP_URL=https://boris-henne.fr
VITE_ADMIN_EMAIL=boris.henne@gmail.com

# Google OAuth (https://console.cloud.google.com)
VITE_GOOGLE_CLIENT_ID=your_client_id.apps.googleusercontent.com
```

### GitHub Secrets (pour CI/CD)

Configurer dans **Settings > Secrets and variables > Actions** :

| Secret | Description |
|--------|-------------|
| `FTP_HOST` | Adresse du serveur FTP |
| `FTP_USER` | Utilisateur FTP |
| `FTP_PASSWORD` | Mot de passe FTP |
| `VITE_GOOGLE_CLIENT_ID` | Client ID Google OAuth |
| `VITE_ADMIN_EMAIL` | Email admin autorisé |

---

## 🚀 Déploiement

### Option 1: FTP (LWS) - Automatique

Le déploiement se fait automatiquement via GitHub Actions sur chaque push sur `main`.

```bash
# Déclencher manuellement
gh workflow run ci-cd.yml
```

### Option 2: Docker (NAS Ugreen)

#### Installation initiale sur le NAS

```bash
# 1. Copier le script sur le NAS
scp scripts/deploy-nas.sh Risbo@192.168.1.29:~/

# 2. Se connecter au NAS
ssh Risbo@192.168.1.29

# 3. Rendre le script exécutable
chmod +x deploy-nas.sh

# 4. Installer
./deploy-nas.sh install
```

#### Commandes disponibles

```bash
./deploy-nas.sh install   # Première installation
./deploy-nas.sh update    # Mise à jour
./deploy-nas.sh status    # État du conteneur
./deploy-nas.sh logs      # Voir les logs
./deploy-nas.sh restart   # Redémarrer
```

#### Avec Docker Compose

```bash
# Sur le NAS
docker-compose up -d

# Mise à jour
docker-compose pull && docker-compose up -d
```

---

## 🔄 CI/CD Pipeline

Le pipeline GitHub Actions exécute :

1. **Quality** - Lint, Type-check, Tests
2. **Build** - Build de production optimisé
3. **Deploy FTP** - Déploiement vers LWS (main branch)
4. **Deploy Docker** - Build multi-arch et push vers GHCR

### Déclencheurs

- Push sur `main` ou `develop`
- Pull requests vers `main`
- Déclenchement manuel (workflow_dispatch)

### Workflow manuel

```bash
# Via GitHub CLI
gh workflow run ci-cd.yml -f deploy_target=both
```

---

## 📁 Structure du projet

```
portfolio/
├── .github/
│   └── workflows/
│       └── ci-cd.yml          # Pipeline CI/CD
├── docker/
│   ├── nginx.conf             # Config Nginx principale
│   └── default.conf           # Config serveur Nginx
├── public/
│   ├── favicon.svg
│   ├── profile.jpg
│   └── cv-boris-henne.pdf
├── scripts/
│   └── deploy-nas.sh          # Script déploiement NAS
├── src/
│   ├── components/
│   │   ├── admin/             # Composants admin
│   │   ├── layout/            # Navbar, Footer
│   │   ├── sections/          # Hero, About, Skills...
│   │   └── ui/                # Composants réutilisables
│   ├── hooks/                 # Custom hooks
│   ├── i18n/
│   │   └── locales/           # Traductions FR/EN
│   ├── stores/                # Zustand stores
│   ├── types/                 # Types TypeScript
│   ├── utils/                 # Fonctions utilitaires
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── .env.example
├── .gitignore
├── docker-compose.yml
├── Dockerfile
├── index.html
├── package.json
├── tailwind.config.ts
├── tsconfig.json
└── vite.config.ts
```

---

## 📊 Performance

### Optimisations incluses

- ⚡ **Code splitting** intelligent par route
- 🗜️ **Compression** Gzip + Brotli
- 📦 **Tree shaking** automatique
- 🖼️ **Lazy loading** des images et composants
- 💾 **Cache** agressif pour assets statiques
- 🎨 **CSS** purifié et minifié
- 📱 **PWA** ready avec service worker

### Scores Lighthouse attendus

| Métrique | Score |
|----------|-------|
| Performance | 95+ |
| Accessibility | 100 |
| Best Practices | 100 |
| SEO | 100 |

---

## 🔐 Sécurité

- ✅ Headers de sécurité (CSP, X-Frame-Options, etc.)
- ✅ HTTPS forcé
- ✅ Auth Google OAuth 2.0 pour admin
- ✅ Variables sensibles via GitHub Secrets
- ✅ Pas de credentials en clair dans le code

---

## 📄 Licence

MIT © Boris Henné

---

## 📬 Contact

- 🌐 [boris-henne.fr](https://boris-henne.fr)
- 💼 [LinkedIn](https://www.linkedin.com/in/borishenne/)
- 🐙 [GitHub](https://github.com/BorisHenne)
# portfolio
# portfolio
