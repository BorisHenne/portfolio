#!/bin/bash
# =====================================================
# 🚀 PORTFOLIO BORIS HENNÉ - Script Unifié UGOS
# =====================================================
# Script tout-en-un pour gérer le portfolio depuis le NAS
# Compatible UGOS (Ugreen DXP4800 Plus)
#
# Usage: ./portfolio.sh
# =====================================================

set -e

# =====================================================
# CONFIGURATION
# =====================================================
CONTAINER_NAME="portfolio-boris"
IMAGE_NAME="ghcr.io/borishenne/portfolio:latest"
LOCAL_IMAGE_NAME="portfolio-boris:latest"
PORT="3000"
DATA_DIR="$HOME/portfolio-data"
PROJECT_DIR="$HOME/portfolio-boris"
REPO_URL="https://github.com/BorisHenne/portfolio.git"
FTP_HOST="91.216.107.79"
FTP_USER="boris1274039"

# =====================================================
# COULEURS & STYLES
# =====================================================
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
CYAN='\033[0;36m'
WHITE='\033[1;37m'
GRAY='\033[0;90m'
NC='\033[0m'
BOLD='\033[1m'

# =====================================================
# FONCTIONS UTILITAIRES
# =====================================================

clear_screen() {
    clear
}

show_header() {
    echo -e "${GREEN}"
    cat << "EOF"
    ╔═══════════════════════════════════════════════════════════════╗
    ║  ____             _       _   _                  __           ║
    ║ | __ )  ___  _ __(_)___  | | | | ___ _ __  _ __  /_/ ___      ║
    ║ |  _ \ / _ \| '__| / __| | |_| |/ _ \ '_ \| '_ \ / _ \        ║
    ║ | |_) | (_) | |  | \__ \ |  _  |  __/ | | | | | |  __/        ║
    ║ |____/ \___/|_|  |_|___/ |_| |_|\___|_| |_|_| |_|\___|        ║
    ║                                                               ║
    ║              🚀 Portfolio Manager - UGOS Edition              ║
    ╚═══════════════════════════════════════════════════════════════╝
EOF
    echo -e "${NC}"
}

separator() {
    echo -e "${GRAY}───────────────────────────────────────────────────────────────────${NC}"
}

log_info() {
    echo -e "${BLUE}ℹ️  ${NC}$1"
}

log_success() {
    echo -e "${GREEN}✅ ${NC}$1"
}

log_warning() {
    echo -e "${YELLOW}⚠️  ${NC}$1"
}

log_error() {
    echo -e "${RED}❌ ${NC}$1"
}

log_step() {
    echo -e "${PURPLE}▶ ${NC}$1"
}

press_enter() {
    echo ""
    read -p "Appuyez sur Entrée pour continuer..."
}

# =====================================================
# MENU PRINCIPAL
# =====================================================

show_menu() {
    clear_screen
    show_header
    
    # Status rapide
    echo -e "${WHITE}${BOLD}📊 Status actuel :${NC}"
    separator
    
    # Docker status
    if docker ps --format '{{.Names}}' 2>/dev/null | grep -q "^${CONTAINER_NAME}$"; then
        local status=$(docker inspect --format='{{.State.Health.Status}}' "$CONTAINER_NAME" 2>/dev/null || echo "running")
        echo -e "   🐳 Docker   : ${GREEN}● En ligne${NC} (${status})"
        local ip=$(hostname -I 2>/dev/null | awk '{print $1}' || echo "localhost")
        echo -e "   🌐 URL      : ${CYAN}http://${ip}:${PORT}${NC}"
    else
        echo -e "   🐳 Docker   : ${RED}○ Arrêté${NC}"
    fi
    
    # Git status
    if [ -d "$PROJECT_DIR/.git" ]; then
        local branch=$(cd "$PROJECT_DIR" && git branch --show-current 2>/dev/null || echo "?")
        echo -e "   📂 Projet   : ${GREEN}● Cloné${NC} (branche: $branch)"
    else
        echo -e "   📂 Projet   : ${GRAY}○ Non cloné${NC}"
    fi
    
    separator
    echo ""
    
    echo -e "${WHITE}${BOLD}🎯 Que voulez-vous faire ?${NC}"
    echo ""
    echo -e "   ${CYAN}─── DOCKER ────────────────────────────────${NC}"
    echo -e "   ${WHITE}1)${NC} 🚀 Démarrer le portfolio"
    echo -e "   ${WHITE}2)${NC} 🛑 Arrêter le portfolio"
    echo -e "   ${WHITE}3)${NC} 🔄 Redémarrer"
    echo -e "   ${WHITE}4)${NC} 📥 Mettre à jour (pull + restart)"
    echo -e "   ${WHITE}5)${NC} 📋 Voir les logs"
    echo -e "   ${WHITE}6)${NC} 📊 Status détaillé"
    echo ""
    echo -e "   ${CYAN}─── DÉVELOPPEMENT ─────────────────────────${NC}"
    echo -e "   ${WHITE}7)${NC} 📂 Cloner/Mettre à jour le code source"
    echo -e "   ${WHITE}8)${NC} 🔨 Build local (sans registry)"
    echo -e "   ${WHITE}9)${NC} 🧪 Mode développement (npm run dev)"
    echo ""
    echo -e "   ${CYAN}─── DÉPLOIEMENT ───────────────────────────${NC}"
    echo -e "   ${WHITE}10)${NC} 📤 Déployer sur FTP (LWS)"
    echo -e "   ${WHITE}11)${NC} 🐙 Push vers GitHub"
    echo ""
    echo -e "   ${CYAN}─── CONFIGURATION ─────────────────────────${NC}"
    echo -e "   ${WHITE}12)${NC} ⚙️  Configuration initiale"
    echo -e "   ${WHITE}13)${NC} 🔐 Configurer les secrets GitHub"
    echo -e "   ${WHITE}14)${NC} 🆕 Créer le repo GitHub"
    echo ""
    echo -e "   ${WHITE}0)${NC} 🚪 Quitter"
    echo ""
    separator
    echo -ne "${WHITE}Choix [0-14]: ${NC}"
}

# =====================================================
# FONCTIONS DOCKER
# =====================================================

docker_start() {
    clear_screen
    show_header
    echo -e "${CYAN}${BOLD}🚀 Démarrage du portfolio...${NC}"
    separator
    echo ""
    
    # Créer les dossiers si nécessaire
    mkdir -p "$DATA_DIR/cv" "$DATA_DIR/videos"
    
    # Vérifier si déjà en cours
    if docker ps --format '{{.Names}}' | grep -q "^${CONTAINER_NAME}$"; then
        log_warning "Le container est déjà en cours d'exécution"
        press_enter
        return
    fi
    
    # Supprimer l'ancien container s'il existe
    docker rm -f "$CONTAINER_NAME" 2>/dev/null || true
    
    # Déterminer quelle image utiliser
    local image_to_use=""
    if docker images --format '{{.Repository}}:{{.Tag}}' | grep -q "^${LOCAL_IMAGE_NAME}$"; then
        image_to_use="$LOCAL_IMAGE_NAME"
        log_info "Utilisation de l'image locale: $LOCAL_IMAGE_NAME"
    else
        image_to_use="$IMAGE_NAME"
        log_info "Utilisation de l'image registry: $IMAGE_NAME"
        log_step "Pull de l'image..."
        docker pull "$IMAGE_NAME"
    fi
    
    # Démarrer le container
    log_step "Démarrage du container..."
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
        "$image_to_use"
    
    sleep 2
    
    local ip=$(hostname -I 2>/dev/null | awk '{print $1}' || echo "localhost")
    echo ""
    log_success "Portfolio démarré !"
    echo ""
    echo -e "   🌐 URL locale : ${GREEN}http://localhost:${PORT}${NC}"
    echo -e "   🌐 URL réseau : ${GREEN}http://${ip}:${PORT}${NC}"
    
    press_enter
}

docker_stop() {
    clear_screen
    show_header
    echo -e "${CYAN}${BOLD}🛑 Arrêt du portfolio...${NC}"
    separator
    echo ""
    
    if ! docker ps --format '{{.Names}}' | grep -q "^${CONTAINER_NAME}$"; then
        log_warning "Le container n'est pas en cours d'exécution"
        press_enter
        return
    fi
    
    log_step "Arrêt du container..."
    docker stop "$CONTAINER_NAME"
    
    log_success "Portfolio arrêté"
    press_enter
}

docker_restart() {
    clear_screen
    show_header
    echo -e "${CYAN}${BOLD}🔄 Redémarrage du portfolio...${NC}"
    separator
    echo ""
    
    if docker ps -a --format '{{.Names}}' | grep -q "^${CONTAINER_NAME}$"; then
        log_step "Redémarrage..."
        docker restart "$CONTAINER_NAME"
        log_success "Portfolio redémarré"
    else
        log_warning "Container non trouvé, démarrage..."
        docker_start
        return
    fi
    
    press_enter
}

docker_update() {
    clear_screen
    show_header
    echo -e "${CYAN}${BOLD}📥 Mise à jour du portfolio...${NC}"
    separator
    echo ""
    
    log_step "Téléchargement de la dernière version..."
    docker pull "$IMAGE_NAME"
    
    log_step "Arrêt de l'ancien container..."
    docker stop "$CONTAINER_NAME" 2>/dev/null || true
    docker rm "$CONTAINER_NAME" 2>/dev/null || true
    
    log_step "Démarrage avec la nouvelle version..."
    docker run -d \
        --name "$CONTAINER_NAME" \
        --restart unless-stopped \
        -p "$PORT:80" \
        -v "$DATA_DIR/cv:/usr/share/nginx/html/cv:ro" \
        -v "$DATA_DIR/videos:/usr/share/nginx/html/videos:ro" \
        -e TZ=Europe/Paris \
        --memory="256m" \
        --cpus="0.5" \
        "$IMAGE_NAME"
    
    log_step "Nettoyage des anciennes images..."
    docker image prune -f
    
    echo ""
    log_success "Mise à jour terminée !"
    
    press_enter
}

docker_logs() {
    clear_screen
    show_header
    echo -e "${CYAN}${BOLD}📋 Logs du portfolio${NC}"
    separator
    echo -e "${GRAY}(Ctrl+C pour quitter)${NC}"
    echo ""
    
    docker logs -f --tail 50 "$CONTAINER_NAME" 2>/dev/null || log_error "Container non trouvé"
}

docker_status() {
    clear_screen
    show_header
    echo -e "${CYAN}${BOLD}📊 Status détaillé${NC}"
    separator
    echo ""
    
    if docker ps -a --format '{{.Names}}' | grep -q "^${CONTAINER_NAME}$"; then
        echo -e "${WHITE}Container:${NC}"
        docker ps -a --filter "name=$CONTAINER_NAME" --format "table {{.Names}}\t{{.Status}}\t{{.Ports}}"
        echo ""
        
        echo -e "${WHITE}Santé:${NC}"
        local health=$(docker inspect --format='{{.State.Health.Status}}' "$CONTAINER_NAME" 2>/dev/null || echo "N/A")
        echo "   Status: $health"
        echo ""
        
        echo -e "${WHITE}Ressources:${NC}"
        docker stats --no-stream "$CONTAINER_NAME" --format "   CPU: {{.CPUPerc}}  |  RAM: {{.MemUsage}}  |  Net: {{.NetIO}}"
        echo ""
        
        echo -e "${WHITE}Image:${NC}"
        docker inspect --format='   {{.Config.Image}}' "$CONTAINER_NAME"
        echo ""
        
        echo -e "${WHITE}Volumes:${NC}"
        docker inspect --format='{{range .Mounts}}   {{.Source}} -> {{.Destination}}{{"\n"}}{{end}}' "$CONTAINER_NAME"
    else
        log_warning "Container non trouvé"
    fi
    
    press_enter
}

# =====================================================
# FONCTIONS DÉVELOPPEMENT
# =====================================================

git_clone_update() {
    clear_screen
    show_header
    echo -e "${CYAN}${BOLD}📂 Gestion du code source${NC}"
    separator
    echo ""
    
    if [ -d "$PROJECT_DIR/.git" ]; then
        log_info "Projet existant détecté"
        echo ""
        echo -e "   ${WHITE}1)${NC} Pull (mettre à jour)"
        echo -e "   ${WHITE}2)${NC} Status"
        echo -e "   ${WHITE}3)${NC} Supprimer et re-cloner"
        echo -e "   ${WHITE}0)${NC} Retour"
        echo ""
        echo -ne "Choix: "
        read choice
        
        case $choice in
            1)
                log_step "Pull des dernières modifications..."
                cd "$PROJECT_DIR"
                git pull origin main
                log_success "Code mis à jour"
                ;;
            2)
                cd "$PROJECT_DIR"
                echo ""
                git status
                ;;
            3)
                log_warning "Suppression du dossier existant..."
                rm -rf "$PROJECT_DIR"
                git_clone_update
                return
                ;;
            *)
                return
                ;;
        esac
    else
        log_step "Clonage du repository..."
        git clone "$REPO_URL" "$PROJECT_DIR"
        log_success "Repository cloné dans $PROJECT_DIR"
    fi
    
    press_enter
}

build_local() {
    clear_screen
    show_header
    echo -e "${CYAN}${BOLD}🔨 Build local${NC}"
    separator
    echo ""
    
    if [ ! -d "$PROJECT_DIR" ]; then
        log_error "Projet non trouvé. Clonez d'abord le code (option 7)"
        press_enter
        return
    fi
    
    cd "$PROJECT_DIR"
    
    # Vérifier si Node.js est installé
    if ! command -v node &> /dev/null; then
        log_warning "Node.js non installé sur ce système"
        echo ""
        echo "Options:"
        echo -e "   ${WHITE}1)${NC} Build avec Docker (recommandé)"
        echo -e "   ${WHITE}0)${NC} Annuler"
        echo ""
        echo -ne "Choix: "
        read choice
        
        if [ "$choice" = "1" ]; then
            log_step "Build de l'image Docker..."
            docker build -t "$LOCAL_IMAGE_NAME" .
            log_success "Image Docker construite: $LOCAL_IMAGE_NAME"
        fi
    else
        log_step "Installation des dépendances..."
        npm ci
        
        log_step "Build de production..."
        npm run build
        
        log_success "Build terminé dans dist/"
        
        echo ""
        echo "Que faire maintenant ?"
        echo -e "   ${WHITE}1)${NC} Construire l'image Docker"
        echo -e "   ${WHITE}2)${NC} Déployer sur FTP"
        echo -e "   ${WHITE}0)${NC} Retour"
        echo ""
        echo -ne "Choix: "
        read choice
        
        case $choice in
            1)
                log_step "Build de l'image Docker..."
                docker build -t "$LOCAL_IMAGE_NAME" .
                log_success "Image Docker construite"
                ;;
            2)
                deploy_ftp
                return
                ;;
        esac
    fi
    
    press_enter
}

dev_mode() {
    clear_screen
    show_header
    echo -e "${CYAN}${BOLD}🧪 Mode développement${NC}"
    separator
    echo ""
    
    if [ ! -d "$PROJECT_DIR" ]; then
        log_error "Projet non trouvé. Clonez d'abord le code (option 7)"
        press_enter
        return
    fi
    
    if ! command -v node &> /dev/null; then
        log_error "Node.js non installé sur ce système"
        log_info "Installez Node.js ou utilisez Docker pour le développement"
        press_enter
        return
    fi
    
    cd "$PROJECT_DIR"
    
    log_info "Démarrage du serveur de développement..."
    log_info "Ctrl+C pour arrêter"
    echo ""
    
    npm run dev -- --host
}

# =====================================================
# FONCTIONS DÉPLOIEMENT
# =====================================================

deploy_ftp() {
    clear_screen
    show_header
    echo -e "${CYAN}${BOLD}📤 Déploiement FTP (LWS)${NC}"
    separator
    echo ""
    
    # Vérifier si lftp est installé
    if ! command -v lftp &> /dev/null; then
        log_warning "lftp non installé. Installation..."
        if command -v apt-get &> /dev/null; then
            sudo apt-get update && sudo apt-get install -y lftp
        elif command -v apk &> /dev/null; then
            sudo apk add lftp
        else
            log_error "Impossible d'installer lftp automatiquement"
            press_enter
            return
        fi
    fi
    
    # Vérifier le dossier dist
    if [ ! -d "$PROJECT_DIR/dist" ]; then
        log_error "Dossier dist/ non trouvé. Faites un build d'abord (option 8)"
        press_enter
        return
    fi
    
    echo -e "Host FTP: ${GREEN}$FTP_HOST${NC}"
    echo -e "User FTP: ${GREEN}$FTP_USER${NC}"
    echo ""
    
    echo -ne "🔑 Mot de passe FTP: "
    read -s FTP_PASSWORD
    echo ""
    echo ""
    
    log_step "Connexion et upload en cours..."
    
    lftp -u "$FTP_USER","$FTP_PASSWORD" "$FTP_HOST" << EOF
set ssl:verify-certificate no
cd /htdocs
mirror -R --verbose --exclude videos/ --exclude .git/ "$PROJECT_DIR/dist" .
bye
EOF
    
    if [ $? -eq 0 ]; then
        echo ""
        log_success "Déploiement FTP terminé !"
        echo -e "   🌐 Site: ${GREEN}https://boris-henne.fr${NC}"
    else
        log_error "Erreur lors du déploiement"
    fi
    
    press_enter
}

git_push() {
    clear_screen
    show_header
    echo -e "${CYAN}${BOLD}🐙 Push vers GitHub${NC}"
    separator
    echo ""
    
    if [ ! -d "$PROJECT_DIR/.git" ]; then
        log_error "Projet Git non trouvé. Clonez d'abord le code (option 7)"
        press_enter
        return
    fi
    
    cd "$PROJECT_DIR"
    
    echo -e "${WHITE}Status actuel:${NC}"
    git status --short
    echo ""
    
    echo -ne "Message de commit: "
    read commit_msg
    
    if [ -z "$commit_msg" ]; then
        commit_msg="🔄 Update $(date '+%Y-%m-%d %H:%M')"
    fi
    
    log_step "Add..."
    git add .
    
    log_step "Commit..."
    git commit -m "$commit_msg" || log_warning "Rien à commiter"
    
    log_step "Push..."
    git push origin main
    
    echo ""
    log_success "Push terminé !"
    log_info "Le pipeline GitHub Actions va se déclencher automatiquement"
    
    press_enter
}

# =====================================================
# FONCTIONS CONFIGURATION
# =====================================================

initial_setup() {
    clear_screen
    show_header
    echo -e "${CYAN}${BOLD}⚙️  Configuration initiale${NC}"
    separator
    echo ""
    
    log_step "Création des dossiers..."
    mkdir -p "$DATA_DIR/cv" "$DATA_DIR/videos" "$PROJECT_DIR"
    
    log_step "Vérification de Docker..."
    if command -v docker &> /dev/null; then
        log_success "Docker installé: $(docker --version)"
    else
        log_error "Docker non installé"
    fi
    
    log_step "Vérification de Git..."
    if command -v git &> /dev/null; then
        log_success "Git installé: $(git --version)"
    else
        log_error "Git non installé"
    fi
    
    echo ""
    echo -e "${WHITE}Dossiers créés:${NC}"
    echo "   📁 $DATA_DIR/cv     (pour le CV PDF)"
    echo "   📁 $DATA_DIR/videos (pour les vidéos)"
    echo "   📁 $PROJECT_DIR     (code source)"
    
    echo ""
    log_info "Placez vos fichiers dans ces dossiers:"
    echo "   • cv-boris-henne.pdf → $DATA_DIR/cv/"
    echo "   • vidéos .mp4        → $DATA_DIR/videos/"
    
    press_enter
}

configure_secrets() {
    clear_screen
    show_header
    echo -e "${CYAN}${BOLD}🔐 Configuration des secrets GitHub${NC}"
    separator
    echo ""
    
    if ! command -v gh &> /dev/null; then
        log_warning "GitHub CLI (gh) non installé"
        echo ""
        log_info "Installez-le avec:"
        echo "   curl -fsSL https://cli.github.com/packages/githubcli-archive-keyring.gpg | sudo dd of=/usr/share/keyrings/githubcli-archive-keyring.gpg"
        echo "   sudo apt install gh"
        echo ""
        log_info "Ou configurez manuellement sur:"
        echo "   https://github.com/BorisHenne/portfolio/settings/secrets/actions"
        press_enter
        return
    fi
    
    # Vérifier auth
    if ! gh auth status &> /dev/null; then
        log_step "Authentification GitHub requise..."
        gh auth login
    fi
    
    local REPO="BorisHenne/portfolio"
    
    echo -e "Configuration des secrets pour: ${GREEN}$REPO${NC}"
    echo ""
    
    # FTP
    separator
    echo -e "${WHITE}FTP (LWS):${NC}"
    
    echo -ne "Host FTP [$FTP_HOST]: "
    read input
    FTP_HOST="${input:-$FTP_HOST}"
    
    echo -ne "User FTP [$FTP_USER]: "
    read input
    FTP_USER="${input:-$FTP_USER}"
    
    echo -ne "🔑 Mot de passe FTP: "
    read -s FTP_PWD
    echo ""
    
    # Google
    separator
    echo -e "${WHITE}Google OAuth:${NC}"
    
    echo -ne "Google Client ID: "
    read GOOGLE_ID
    
    echo -ne "Admin Email [boris.henne@gmail.com]: "
    read ADMIN_EMAIL
    ADMIN_EMAIL="${ADMIN_EMAIL:-boris.henne@gmail.com}"
    
    # Appliquer
    separator
    echo ""
    log_step "Application des secrets..."
    
    gh secret set FTP_HOST -b "$FTP_HOST" -R "$REPO" && log_success "FTP_HOST"
    gh secret set FTP_USER -b "$FTP_USER" -R "$REPO" && log_success "FTP_USER"
    gh secret set FTP_PASSWORD -b "$FTP_PWD" -R "$REPO" && log_success "FTP_PASSWORD"
    [ -n "$GOOGLE_ID" ] && gh secret set VITE_GOOGLE_CLIENT_ID -b "$GOOGLE_ID" -R "$REPO" && log_success "VITE_GOOGLE_CLIENT_ID"
    gh secret set VITE_ADMIN_EMAIL -b "$ADMIN_EMAIL" -R "$REPO" && log_success "VITE_ADMIN_EMAIL"
    
    echo ""
    log_success "Secrets configurés !"
    
    press_enter
}

create_github_repo() {
    clear_screen
    show_header
    echo -e "${CYAN}${BOLD}🆕 Création du repository GitHub${NC}"
    separator
    echo ""
    
    # Vérifier GitHub CLI
    if ! command -v gh &> /dev/null; then
        log_error "GitHub CLI (gh) non installé"
        echo ""
        log_info "Option 1 - Installer GitHub CLI:"
        echo ""
        echo "   # Pour Debian/Ubuntu:"
        echo "   curl -fsSL https://cli.github.com/packages/githubcli-archive-keyring.gpg | sudo dd of=/usr/share/keyrings/githubcli-archive-keyring.gpg"
        echo "   echo \"deb [arch=\$(dpkg --print-architecture) signed-by=/usr/share/keyrings/githubcli-archive-keyring.gpg] https://cli.github.com/packages stable main\" | sudo tee /etc/apt/sources.list.d/github-cli.list > /dev/null"
        echo "   sudo apt update && sudo apt install gh"
        echo ""
        log_info "Option 2 - Créer manuellement:"
        echo "   1. Aller sur https://github.com/new"
        echo "   2. Nom: portfolio"
        echo "   3. Ne rien cocher (pas de README)"
        echo "   4. Créer"
        echo ""
        press_enter
        return
    fi
    
    # Vérifier authentification
    if ! gh auth status &> /dev/null; then
        log_step "Authentification GitHub requise..."
        echo ""
        gh auth login
        echo ""
    fi
    
    log_success "Connecté à GitHub"
    echo ""
    
    # Demander le nom du repo
    echo -ne "Nom du repository [portfolio]: "
    read repo_name
    repo_name="${repo_name:-portfolio}"
    
    echo ""
    echo "Visibilité:"
    echo -e "   ${WHITE}1)${NC} Public (recommandé pour portfolio)"
    echo -e "   ${WHITE}2)${NC} Private"
    echo ""
    echo -ne "Choix [1]: "
    read visibility_choice
    
    local visibility="public"
    if [ "$visibility_choice" = "2" ]; then
        visibility="private"
    fi
    
    echo ""
    log_step "Création du repository..."
    
    # Créer le repo
    if gh repo create "$repo_name" --"$visibility" --description "Portfolio personnel - Boris Henné" 2>/dev/null; then
        echo ""
        log_success "Repository créé !"
        
        # Récupérer l'URL
        local username=$(gh api user --jq '.login')
        local repo_url="https://github.com/$username/$repo_name"
        
        echo ""
        echo -e "   📦 Repository : ${GREEN}$repo_url${NC}"
        echo ""
        
        # Proposer de configurer le remote
        if [ -d "$PROJECT_DIR/.git" ]; then
            log_step "Configuration du remote origin..."
            cd "$PROJECT_DIR"
            git remote remove origin 2>/dev/null || true
            git remote add origin "$repo_url.git"
            log_success "Remote configuré"
            
            echo ""
            echo "Voulez-vous push le code maintenant ?"
            echo -ne "[O/n]: "
            read push_now
            
            if [ "$push_now" != "n" ] && [ "$push_now" != "N" ]; then
                log_step "Push initial..."
                git branch -M main
                git push -u origin main
                log_success "Code poussé !"
                echo ""
                log_info "Le pipeline CI/CD va se déclencher automatiquement"
            fi
        else
            echo ""
            log_info "Prochaine étape: cloner le code (option 7) puis push (option 11)"
        fi
    else
        log_error "Erreur lors de la création (le repo existe peut-être déjà)"
        echo ""
        log_info "Vérifiez sur: https://github.com/$(gh api user --jq '.login')?tab=repositories"
    fi
    
    press_enter
}

# =====================================================
# BOUCLE PRINCIPALE
# =====================================================

main() {
    # Vérifier si on est root (pas recommandé)
    if [ "$EUID" -eq 0 ]; then
        log_warning "Exécution en tant que root non recommandée"
    fi
    
    while true; do
        show_menu
        read choice
        
        case $choice in
            1)  docker_start ;;
            2)  docker_stop ;;
            3)  docker_restart ;;
            4)  docker_update ;;
            5)  docker_logs ;;
            6)  docker_status ;;
            7)  git_clone_update ;;
            8)  build_local ;;
            9)  dev_mode ;;
            10) deploy_ftp ;;
            11) git_push ;;
            12) initial_setup ;;
            13) configure_secrets ;;
            14) create_github_repo ;;
            0)
                clear_screen
                echo ""
                log_info "À bientôt ! 👋"
                echo ""
                exit 0
                ;;
            *)
                log_error "Choix invalide"
                sleep 1
                ;;
        esac
    done
}

# Lancer le script
main "$@"
