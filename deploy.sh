#!/bin/bash
# ============================================================
# SCRIPT DE DÉPLOIEMENT - Portfolio Boris Henné
# ============================================================
# Usage: ./deploy.sh
#
# Ce script:
# 1. Télécharge la dernière version du code depuis GitHub
# 2. Rebuild et redémarre les containers Docker
# ============================================================

set -e

# Couleurs
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

# Configuration
REPO_URL="https://github.com/BorisHenne/portfolio"
BRANCH="main"
DEPLOY_DIR="/volume1/docker/site-perso/repo"

# Fonctions
log_info() { echo -e "${GREEN}[INFO]${NC} $1"; }
log_warn() { echo -e "${YELLOW}[WARN]${NC} $1"; }
log_error() { echo -e "${RED}[ERROR]${NC} $1"; }

# Vérifier si on est dans le bon répertoire
if [ ! -f "docker-compose.yml" ]; then
    log_error "docker-compose.yml non trouvé. Exécutez ce script depuis la racine du projet."
    exit 1
fi

# Afficher le menu
echo ""
echo "========================================"
echo "  DÉPLOIEMENT PORTFOLIO BORIS HENNÉ"
echo "========================================"
echo ""
echo "1) Mettre à jour et déployer (pull + build)"
echo "2) Rebuild seulement (sans pull)"
echo "3) Redémarrer les containers"
echo "4) Voir les logs"
echo "5) Arrêter les containers"
echo "6) Status"
echo "0) Quitter"
echo ""
read -p "Choix: " choice

case $choice in
    1)
        log_info "Téléchargement de la dernière version..."

        # Backup des fichiers locaux importants
        if [ -f ".env" ]; then
            cp .env .env.backup
            log_info "Backup de .env créé"
        fi

        # Télécharger et extraire
        curl -L "${REPO_URL}/archive/refs/heads/${BRANCH}.tar.gz" | tar -xz --strip-components=1

        # Restaurer .env si existait
        if [ -f ".env.backup" ]; then
            mv .env.backup .env
            log_info "Fichier .env restauré"
        fi

        log_info "Code mis à jour. Rebuild en cours..."
        sudo docker compose up -d --build --force-recreate

        log_info "Déploiement terminé !"
        sudo docker compose ps
        ;;
    2)
        log_info "Rebuild des containers..."
        sudo docker compose up -d --build --force-recreate
        log_info "Rebuild terminé !"
        sudo docker compose ps
        ;;
    3)
        log_info "Redémarrage des containers..."
        sudo docker compose restart
        log_info "Containers redémarrés !"
        sudo docker compose ps
        ;;
    4)
        log_info "Affichage des logs (Ctrl+C pour quitter)..."
        sudo docker compose logs -f
        ;;
    5)
        log_warn "Arrêt des containers..."
        sudo docker compose down
        log_info "Containers arrêtés."
        ;;
    6)
        sudo docker compose ps
        echo ""
        log_info "Santé des containers:"
        sudo docker compose ps --format "table {{.Name}}\t{{.Status}}\t{{.Ports}}"
        ;;
    0)
        log_info "Au revoir !"
        exit 0
        ;;
    *)
        log_error "Choix invalide"
        exit 1
        ;;
esac
