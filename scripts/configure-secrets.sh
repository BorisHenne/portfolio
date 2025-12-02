#!/bin/bash
# =====================================================
# 🔐 Configuration rapide des GitHub Secrets
# =====================================================
# Usage: ./configure-secrets.sh
# =====================================================

set -e

# Couleurs
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
NC='\033[0m'

echo ""
echo -e "${CYAN}╔═══════════════════════════════════════════════════════════════╗${NC}"
echo -e "${CYAN}║        🔐 Configuration des GitHub Secrets                    ║${NC}"
echo -e "${CYAN}╚═══════════════════════════════════════════════════════════════╝${NC}"
echo ""

# Vérifier GitHub CLI
if ! command -v gh &> /dev/null; then
    echo -e "${YELLOW}⚠️  GitHub CLI (gh) non installé${NC}"
    echo ""
    echo "Installez-le avec:"
    echo "  macOS:   brew install gh"
    echo "  Linux:   sudo apt install gh"
    echo "  Windows: winget install GitHub.cli"
    echo ""
    echo "Puis authentifiez-vous: gh auth login"
    exit 1
fi

# Vérifier authentification
if ! gh auth status &> /dev/null; then
    echo -e "${YELLOW}⚠️  Non authentifié sur GitHub CLI${NC}"
    echo "Exécutez: gh auth login"
    exit 1
fi

echo -e "${GREEN}✅ GitHub CLI authentifié${NC}"
echo ""

# Demander le repo
echo -ne "${BLUE}Repository GitHub (ex: BorisHenne/portfolio):${NC} "
read REPO

if [ -z "$REPO" ]; then
    REPO="BorisHenne/portfolio"
fi

echo ""
echo -e "${CYAN}───────────────────────────────────────────────────────────────────${NC}"
echo -e "${CYAN} Configuration FTP (LWS)${NC}"
echo -e "${CYAN}───────────────────────────────────────────────────────────────────${NC}"
echo ""

echo -ne "FTP Host [91.216.107.79]: "
read FTP_HOST
FTP_HOST="${FTP_HOST:-91.216.107.79}"

echo -ne "FTP User [boris1274039]: "
read FTP_USER
FTP_USER="${FTP_USER:-boris1274039}"

echo -ne "🔑 FTP Password: "
read -s FTP_PASSWORD
echo ""

echo ""
echo -e "${CYAN}───────────────────────────────────────────────────────────────────${NC}"
echo -e "${CYAN} Configuration Google OAuth${NC}"
echo -e "${CYAN}───────────────────────────────────────────────────────────────────${NC}"
echo ""

echo -ne "Google Client ID: "
read GOOGLE_CLIENT_ID

echo -ne "Admin Email [boris.henne@gmail.com]: "
read ADMIN_EMAIL
ADMIN_EMAIL="${ADMIN_EMAIL:-boris.henne@gmail.com}"

echo ""
echo -e "${CYAN}───────────────────────────────────────────────────────────────────${NC}"
echo -e "${CYAN} Application des secrets...${NC}"
echo -e "${CYAN}───────────────────────────────────────────────────────────────────${NC}"
echo ""

# Appliquer les secrets
gh secret set FTP_HOST -b "$FTP_HOST" -R "$REPO" && echo -e "${GREEN}✅ FTP_HOST${NC}" || echo -e "${YELLOW}⚠️ FTP_HOST échoué${NC}"
gh secret set FTP_USER -b "$FTP_USER" -R "$REPO" && echo -e "${GREEN}✅ FTP_USER${NC}" || echo -e "${YELLOW}⚠️ FTP_USER échoué${NC}"
gh secret set FTP_PASSWORD -b "$FTP_PASSWORD" -R "$REPO" && echo -e "${GREEN}✅ FTP_PASSWORD${NC}" || echo -e "${YELLOW}⚠️ FTP_PASSWORD échoué${NC}"
gh secret set VITE_GOOGLE_CLIENT_ID -b "$GOOGLE_CLIENT_ID" -R "$REPO" && echo -e "${GREEN}✅ VITE_GOOGLE_CLIENT_ID${NC}" || echo -e "${YELLOW}⚠️ VITE_GOOGLE_CLIENT_ID échoué${NC}"
gh secret set VITE_ADMIN_EMAIL -b "$ADMIN_EMAIL" -R "$REPO" && echo -e "${GREEN}✅ VITE_ADMIN_EMAIL${NC}" || echo -e "${YELLOW}⚠️ VITE_ADMIN_EMAIL échoué${NC}"

echo ""
echo -e "${GREEN}═══════════════════════════════════════════════════════════════════${NC}"
echo -e "${GREEN} ✅ Configuration terminée !${NC}"
echo -e "${GREEN}═══════════════════════════════════════════════════════════════════${NC}"
echo ""
echo "Vérifiez sur: https://github.com/$REPO/settings/secrets/actions"
echo ""
