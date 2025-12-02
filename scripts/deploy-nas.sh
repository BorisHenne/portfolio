#!/bin/bash
# =====================================================
# PORTFOLIO BORIS HENNE - Deploiement NAS UGreen
# =====================================================
# Compatible avec UGOS (UGreen DXP4800 Plus)
#
# Usage:
#   ./deploy-nas.sh install    # Premiere installation
#   ./deploy-nas.sh update     # Mise a jour manuelle
#   ./deploy-nas.sh logs       # Voir les logs
#   ./deploy-nas.sh status     # Etat des conteneurs
#   ./deploy-nas.sh stop       # Arreter les services
#   ./deploy-nas.sh start      # Demarrer les services
#
# =====================================================

set -e

# Configuration
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
# Chemin par defaut pour NAS UGreen UGOS
INSTALL_DIR="${PORTFOLIO_DIR:-/volume1/docker/site-perso}"
COMPOSE_FILE="docker-compose-nas.yml"
GITHUB_RAW="https://raw.githubusercontent.com/BorisHenne/portfolio/main"

# Couleurs
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
NC='\033[0m'

# Fonctions utilitaires
log_info()    { echo -e "${BLUE}[INFO]${NC} $1"; }
log_success() { echo -e "${GREEN}[OK]${NC} $1"; }
log_warning() { echo -e "${YELLOW}[WARN]${NC} $1"; }
log_error()   { echo -e "${RED}[ERROR]${NC} $1"; }
log_step()    { echo -e "${CYAN}>>>${NC} $1"; }

# Banner
show_banner() {
    echo ""
    echo -e "${CYAN}╔═══════════════════════════════════════════════════╗${NC}"
    echo -e "${CYAN}║${NC}     ${GREEN}PORTFOLIO BORIS HENNE${NC} - NAS UGreen           ${CYAN}║${NC}"
    echo -e "${CYAN}╚═══════════════════════════════════════════════════╝${NC}"
    echo ""
}

# Verifier Docker et Docker Compose
check_requirements() {
    log_step "Verification des prerequis..."

    if ! command -v docker &> /dev/null; then
        log_error "Docker n'est pas installe!"
        log_info "Sur UGOS, activer Docker dans les parametres systeme"
        exit 1
    fi
    log_success "Docker detecte: $(docker --version | cut -d' ' -f3 | tr -d ',')"

    # Verifier docker compose (v2) ou docker-compose (v1)
    if docker compose version &> /dev/null; then
        COMPOSE_CMD="docker compose"
        log_success "Docker Compose V2 detecte"
    elif command -v docker-compose &> /dev/null; then
        COMPOSE_CMD="docker-compose"
        log_success "Docker Compose V1 detecte"
    else
        log_error "Docker Compose n'est pas installe!"
        exit 1
    fi
}

# Creer la structure de dossiers
create_directories() {
    log_step "Creation de la structure de dossiers..."

    mkdir -p "$INSTALL_DIR"/{data/cv,data/videos,data/logos,logs}

    log_success "Dossiers crees dans: $INSTALL_DIR"
    log_info "  - data/cv/      : Place ton CV ici"
    log_info "  - data/videos/  : Videos optionnelles"
    log_info "  - data/logos/   : Logos personnalises"
    log_info "  - logs/         : Logs Nginx"
}

# Telecharger le docker-compose depuis GitHub
download_compose() {
    log_step "Telechargement de la configuration Docker..."

    cd "$INSTALL_DIR"

    if command -v curl &> /dev/null; then
        curl -fsSL "$GITHUB_RAW/$COMPOSE_FILE" -o "$COMPOSE_FILE"
    elif command -v wget &> /dev/null; then
        wget -q "$GITHUB_RAW/$COMPOSE_FILE" -O "$COMPOSE_FILE"
    else
        log_error "curl ou wget requis pour telecharger"
        exit 1
    fi

    log_success "Configuration telechargee: $COMPOSE_FILE"
}

# Pull les images Docker
pull_images() {
    log_step "Telechargement des images Docker..."

    cd "$INSTALL_DIR"
    $COMPOSE_CMD -f "$COMPOSE_FILE" pull

    log_success "Images Docker telechargees"
}

# Demarrer les services
start_services() {
    log_step "Demarrage des services..."

    cd "$INSTALL_DIR"
    $COMPOSE_CMD -f "$COMPOSE_FILE" up -d

    log_success "Services demarres"
}

# Arreter les services
stop_services() {
    log_step "Arret des services..."

    cd "$INSTALL_DIR"
    $COMPOSE_CMD -f "$COMPOSE_FILE" down

    log_success "Services arretes"
}

# Afficher les logs
show_logs() {
    cd "$INSTALL_DIR"
    $COMPOSE_CMD -f "$COMPOSE_FILE" logs -f --tail=100 portfolio
}

# Afficher le statut
show_status() {
    echo ""
    echo -e "${CYAN}═══════════════════════════════════════════════════${NC}"
    echo -e "   ${GREEN}STATUT DU PORTFOLIO${NC}"
    echo -e "${CYAN}═══════════════════════════════════════════════════${NC}"
    echo ""

    cd "$INSTALL_DIR"

    # Statut des conteneurs
    echo -e "${BLUE}Conteneurs:${NC}"
    $COMPOSE_CMD -f "$COMPOSE_FILE" ps
    echo ""

    # Verifier la sante du portfolio
    if docker ps --format '{{.Names}}' | grep -q "portfolio-boris"; then
        HEALTH=$(docker inspect --format='{{.State.Health.Status}}' portfolio-boris 2>/dev/null || echo "unknown")

        if [ "$HEALTH" = "healthy" ]; then
            echo -e "${GREEN}Sante: $HEALTH${NC}"
        else
            echo -e "${YELLOW}Sante: $HEALTH${NC}"
        fi

        echo ""
        echo -e "${BLUE}Ressources:${NC}"
        docker stats --no-stream portfolio-boris --format "  CPU: {{.CPUPerc}}  |  RAM: {{.MemUsage}}" 2>/dev/null || true
    else
        echo -e "${RED}Le conteneur portfolio-boris n'est pas en cours d'execution${NC}"
    fi

    # Obtenir l'IP du NAS
    NAS_IP=$(hostname -I 2>/dev/null | awk '{print $1}' || echo "localhost")

    echo ""
    echo -e "${CYAN}═══════════════════════════════════════════════════${NC}"
    echo -e "   ${GREEN}ACCES${NC}"
    echo -e "${CYAN}═══════════════════════════════════════════════════${NC}"
    echo ""
    echo -e "   Local:  ${BLUE}http://$NAS_IP:3000${NC}"
    echo -e "   Public: ${BLUE}https://boris-henne.fr${NC} (via Cloudflare)"
    echo ""
}

# Nettoyage des images inutilisees
cleanup() {
    log_step "Nettoyage des images inutilisees..."
    docker image prune -f
    log_success "Nettoyage termine"
}

# Installation complete
do_install() {
    show_banner
    echo -e "${GREEN}Installation du portfolio sur le NAS${NC}"
    echo ""

    check_requirements
    create_directories
    download_compose
    pull_images
    start_services
    cleanup

    echo ""
    log_success "Installation terminee!"
    show_status

    echo ""
    echo -e "${CYAN}═══════════════════════════════════════════════════${NC}"
    echo -e "   ${GREEN}PROCHAINES ETAPES${NC}"
    echo -e "${CYAN}═══════════════════════════════════════════════════${NC}"
    echo ""
    echo "   1. Place ton CV dans: $INSTALL_DIR/data/cv/"
    echo "   2. (Optionnel) Configure Cloudflare Tunnel"
    echo "   3. Le site se met a jour automatiquement via Watchtower!"
    echo ""
}

# Mise a jour manuelle
do_update() {
    show_banner
    echo -e "${GREEN}Mise a jour du portfolio${NC}"
    echo ""

    check_requirements

    cd "$INSTALL_DIR"

    log_step "Telechargement de la derniere image..."
    $COMPOSE_CMD -f "$COMPOSE_FILE" pull portfolio

    log_step "Redemarrage du portfolio..."
    $COMPOSE_CMD -f "$COMPOSE_FILE" up -d portfolio

    cleanup

    echo ""
    log_success "Mise a jour terminee!"
    show_status
}

# Menu principal
case "${1:-}" in
    install)
        do_install
        ;;

    update)
        do_update
        ;;

    logs)
        show_logs
        ;;

    status)
        show_status
        ;;

    stop)
        show_banner
        check_requirements
        stop_services
        ;;

    start)
        show_banner
        check_requirements
        cd "$INSTALL_DIR"
        start_services
        show_status
        ;;

    restart)
        show_banner
        check_requirements
        cd "$INSTALL_DIR"
        $COMPOSE_CMD -f "$COMPOSE_FILE" restart
        log_success "Services redemarres"
        show_status
        ;;

    cleanup)
        show_banner
        cleanup
        ;;

    *)
        show_banner
        echo "Usage: $0 {install|update|logs|status|stop|start|restart|cleanup}"
        echo ""
        echo "Commandes:"
        echo "  install   - Premiere installation complete"
        echo "  update    - Mise a jour manuelle (Watchtower le fait auto)"
        echo "  logs      - Afficher les logs en temps reel"
        echo "  status    - Afficher l'etat des services"
        echo "  stop      - Arreter tous les services"
        echo "  start     - Demarrer les services"
        echo "  restart   - Redemarrer les services"
        echo "  cleanup   - Nettoyer les images inutilisees"
        echo ""
        echo "Dossier d'installation: $INSTALL_DIR"
        echo ""
        exit 1
        ;;
esac

exit 0
