#!/bin/bash
# ============================================================
# PORTFOLIO BORIS HENNÉ - SCRIPT DE DÉPLOIEMENT
# ============================================================
# Usage: curl -fsSL https://raw.githubusercontent.com/BorisHenne/portfolio/claude/cleanup-old-sources-01CA6edyAFw3ELST9QQPKAyp/deploy.sh | bash
# ============================================================

set -e

# Couleurs
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
CYAN='\033[0;36m'
NC='\033[0m'

print_step() { echo -e "${CYAN}[STEP]${NC} $1"; }
print_success() { echo -e "${GREEN}[OK]${NC} $1"; }
print_warning() { echo -e "${YELLOW}[WARN]${NC} $1"; }
print_error() { echo -e "${RED}[ERROR]${NC} $1"; }

# Configuration
INSTALL_DIR="/volume1/docker/site-perso"
REPO_URL="https://github.com/BorisHenne/portfolio/archive/c3da0b9.tar.gz"
GOOGLE_CLIENT_ID="${VITE_GOOGLE_CLIENT_ID:-}"  # Set via environment variable

echo ""
echo -e "${GREEN}╔════════════════════════════════════════════════════════╗${NC}"
echo -e "${GREEN}║     PORTFOLIO BORIS HENNÉ - DÉPLOIEMENT                ║${NC}"
echo -e "${GREEN}╚════════════════════════════════════════════════════════╝${NC}"
echo ""

# Vérifier si on est root ou sudo disponible
if [ "$EUID" -ne 0 ]; then
    if ! command -v sudo &> /dev/null; then
        print_error "Ce script doit être exécuté en root ou avec sudo"
        exit 1
    fi
    SUDO="sudo"
else
    SUDO=""
fi

# 1. Arrêter le container existant
print_step "Arrêt du container existant..."
cd "$INSTALL_DIR" 2>/dev/null || mkdir -p "$INSTALL_DIR"
$SUDO docker stop site-perso 2>/dev/null || true
$SUDO docker rm site-perso 2>/dev/null || true
$SUDO docker compose down 2>/dev/null || true
print_success "Container arrêté"

# 2. Sauvegarder les données
print_step "Sauvegarde des données locales..."
if [ -d "$INSTALL_DIR/data" ]; then
    cp -r "$INSTALL_DIR/data" /tmp/portfolio-data-backup 2>/dev/null || true
    print_success "Données sauvegardées dans /tmp/portfolio-data-backup"
fi

# 3. Télécharger le nouveau code
print_step "Téléchargement du code source..."
cd "$INSTALL_DIR"
curl -fsSL "$REPO_URL" | tar -xz --strip-components=1
print_success "Code téléchargé"

# 4. Restaurer les données
print_step "Restauration des données..."
mkdir -p data/videos data/cv data/logos uploads logs

if [ -d "/tmp/portfolio-data-backup" ]; then
    cp -r /tmp/portfolio-data-backup/* data/ 2>/dev/null || true
    rm -rf /tmp/portfolio-data-backup
    print_success "Données restaurées"
fi

# 5. Créer le fichier .env
print_step "Configuration de l'environnement..."
if [ -z "$GOOGLE_CLIENT_ID" ]; then
    print_warning "VITE_GOOGLE_CLIENT_ID non défini - OAuth admin désactivé"
    print_warning "Pour activer: export VITE_GOOGLE_CLIENT_ID='votre-client-id'"
fi
cat > .env << EOF
VITE_GOOGLE_CLIENT_ID=$GOOGLE_CLIENT_ID
VITE_ADMIN_EMAIL=boris.henne@gmail.com
VITE_APP_URL=https://boris-henne.fr
EOF
print_success "Fichier .env créé"

# 6. Construire et démarrer
print_step "Construction et démarrage du container..."
$SUDO docker compose up -d --build --force-recreate
print_success "Container démarré"

# 7. Vérifier le status
print_step "Vérification du status..."
sleep 3
if $SUDO docker ps | grep -q site-perso; then
    print_success "Container en cours d'exécution"
else
    print_error "Le container ne semble pas fonctionner"
    $SUDO docker compose logs --tail=20
    exit 1
fi

# 8. Afficher les infos
echo ""
echo -e "${GREEN}╔════════════════════════════════════════════════════════╗${NC}"
echo -e "${GREEN}║     DÉPLOIEMENT TERMINÉ AVEC SUCCÈS !                  ║${NC}"
echo -e "${GREEN}╚════════════════════════════════════════════════════════╝${NC}"
echo ""
echo -e "  ${CYAN}URL locale:${NC}     http://192.168.1.29:8888"
echo -e "  ${CYAN}URL publique:${NC}   https://boris-henne.fr"
echo ""
echo -e "  ${YELLOW}N'oublie pas de:${NC}"
echo -e "  - Copier tes vidéos dans ${CYAN}$INSTALL_DIR/data/videos/${NC}"
echo -e "  - Copier ton CV dans ${CYAN}$INSTALL_DIR/data/cv/${NC}"
echo ""
echo -e "  ${CYAN}Commandes utiles:${NC}"
echo -e "    Logs:     sudo docker compose logs -f site-perso"
echo -e "    Restart:  sudo docker compose restart"
echo -e "    Stop:     sudo docker compose down"
echo ""
