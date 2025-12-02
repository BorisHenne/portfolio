#!/bin/bash
# =====================================================
# PORTFOLIO BORIS HENNÉ - Script de déploiement NAS
# =====================================================
# À exécuter sur le NAS Ugreen DXP4800 Plus
# 
# Usage:
#   ./deploy-nas.sh install    # Première installation
#   ./deploy-nas.sh update     # Mise à jour
#   ./deploy-nas.sh logs       # Voir les logs
#   ./deploy-nas.sh status     # État du conteneur

set -e

# Configuration
CONTAINER_NAME="portfolio-boris"
IMAGE_NAME="ghcr.io/borishenne/portfolio:latest"
PORT="3000"
DATA_DIR="$HOME/portfolio-data"

# Couleurs
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Fonctions utilitaires
log_info() {
    echo -e "${BLUE}ℹ️  $1${NC}"
}

log_success() {
    echo -e "${GREEN}✅ $1${NC}"
}

log_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

log_error() {
    echo -e "${RED}❌ $1${NC}"
}

# Vérifier que Docker est installé
check_docker() {
    if ! command -v docker &> /dev/null; then
        log_error "Docker n'est pas installé !"
        exit 1
    fi
    log_success "Docker détecté"
}

# Créer les répertoires de données
create_directories() {
    log_info "Création des répertoires..."
    mkdir -p "$DATA_DIR/cv"
    mkdir -p "$DATA_DIR/videos"
    log_success "Répertoires créés: $DATA_DIR"
}

# Pull de l'image
pull_image() {
    log_info "Téléchargement de l'image Docker..."
    docker pull "$IMAGE_NAME"
    log_success "Image téléchargée"
}

# Arrêter et supprimer l'ancien conteneur
stop_container() {
    if docker ps -a --format '{{.Names}}' | grep -q "^${CONTAINER_NAME}$"; then
        log_info "Arrêt du conteneur existant..."
        docker stop "$CONTAINER_NAME" 2>/dev/null || true
        docker rm "$CONTAINER_NAME" 2>/dev/null || true
        log_success "Ancien conteneur supprimé"
    fi
}

# Démarrer le conteneur
start_container() {
    log_info "Démarrage du conteneur..."
    
    docker run -d \
        --name "$CONTAINER_NAME" \
        --restart unless-stopped \
        -p "$PORT:80" \
        -v "$DATA_DIR/cv:/usr/share/nginx/html/cv:ro" \
        -v "$DATA_DIR/videos:/usr/share/nginx/html/videos:ro" \
        -e TZ=Europe/Paris \
        --memory="256m" \
        --cpus="0.5" \
        --health-cmd="curl -f http://localhost/ || exit 1" \
        --health-interval=30s \
        --health-timeout=10s \
        --health-retries=3 \
        "$IMAGE_NAME"
    
    log_success "Conteneur démarré sur le port $PORT"
}

# Installer Watchtower pour auto-update
install_watchtower() {
    log_info "Installation de Watchtower pour les mises à jour automatiques..."
    
    if docker ps -a --format '{{.Names}}' | grep -q "^watchtower$"; then
        log_warning "Watchtower est déjà installé"
        return
    fi
    
    docker run -d \
        --name watchtower \
        --restart unless-stopped \
        -v /var/run/docker.sock:/var/run/docker.sock \
        -e WATCHTOWER_CLEANUP=true \
        -e WATCHTOWER_POLL_INTERVAL=300 \
        -e TZ=Europe/Paris \
        containrrr/watchtower \
        "$CONTAINER_NAME"
    
    log_success "Watchtower installé - Mises à jour automatiques activées"
}

# Voir les logs
show_logs() {
    log_info "Logs du conteneur $CONTAINER_NAME:"
    docker logs -f "$CONTAINER_NAME"
}

# État du conteneur
show_status() {
    echo ""
    echo "═══════════════════════════════════════════════════"
    echo "   📊 ÉTAT DU PORTFOLIO"
    echo "═══════════════════════════════════════════════════"
    echo ""
    
    if docker ps --format '{{.Names}}' | grep -q "^${CONTAINER_NAME}$"; then
        log_success "Conteneur: EN COURS D'EXÉCUTION"
        echo ""
        docker ps --filter "name=$CONTAINER_NAME" --format "table {{.Names}}\t{{.Status}}\t{{.Ports}}"
        echo ""
        
        # Vérifier la santé
        HEALTH=$(docker inspect --format='{{.State.Health.Status}}' "$CONTAINER_NAME" 2>/dev/null || echo "unknown")
        echo "   Santé: $HEALTH"
        
        # Utilisation des ressources
        echo ""
        echo "   📈 Ressources:"
        docker stats --no-stream "$CONTAINER_NAME" --format "   CPU: {{.CPUPerc}}  |  RAM: {{.MemUsage}}"
        
    else
        log_error "Conteneur: ARRÊTÉ"
    fi
    
    echo ""
    echo "   🌐 URL: http://$(hostname -I | awk '{print $1}'):$PORT"
    echo ""
    echo "═══════════════════════════════════════════════════"
}

# Nettoyage
cleanup() {
    log_info "Nettoyage des images inutilisées..."
    docker image prune -f
    log_success "Nettoyage terminé"
}

# Menu principal
case "$1" in
    install)
        echo ""
        echo "═══════════════════════════════════════════════════"
        echo "   🚀 INSTALLATION DU PORTFOLIO"
        echo "═══════════════════════════════════════════════════"
        echo ""
        
        check_docker
        create_directories
        pull_image
        stop_container
        start_container
        install_watchtower
        cleanup
        
        echo ""
        log_success "Installation terminée !"
        show_status
        ;;
    
    update)
        echo ""
        echo "═══════════════════════════════════════════════════"
        echo "   🔄 MISE À JOUR DU PORTFOLIO"
        echo "═══════════════════════════════════════════════════"
        echo ""
        
        check_docker
        pull_image
        stop_container
        start_container
        cleanup
        
        echo ""
        log_success "Mise à jour terminée !"
        show_status
        ;;
    
    logs)
        show_logs
        ;;
    
    status)
        show_status
        ;;
    
    stop)
        log_info "Arrêt du conteneur..."
        docker stop "$CONTAINER_NAME"
        log_success "Conteneur arrêté"
        ;;
    
    start)
        log_info "Démarrage du conteneur..."
        docker start "$CONTAINER_NAME"
        log_success "Conteneur démarré"
        show_status
        ;;
    
    restart)
        log_info "Redémarrage du conteneur..."
        docker restart "$CONTAINER_NAME"
        log_success "Conteneur redémarré"
        show_status
        ;;
    
    *)
        echo ""
        echo "Usage: $0 {install|update|logs|status|stop|start|restart}"
        echo ""
        echo "Commandes:"
        echo "  install  - Première installation complète"
        echo "  update   - Mettre à jour vers la dernière version"
        echo "  logs     - Afficher les logs en temps réel"
        echo "  status   - Afficher l'état du conteneur"
        echo "  stop     - Arrêter le conteneur"
        echo "  start    - Démarrer le conteneur"
        echo "  restart  - Redémarrer le conteneur"
        echo ""
        exit 1
        ;;
esac

exit 0
