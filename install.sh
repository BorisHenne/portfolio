#!/bin/bash
# =====================================================
# 🚀 PORTFOLIO BORIS HENNÉ - Installation Wizard
# =====================================================
# Script interactif pour configurer et déployer le portfolio
# Tous les credentials sont demandés de manière sécurisée
# 
# Usage: ./install.sh
# =====================================================

set -e

# =====================================================
# CONFIGURATION & VARIABLES
# =====================================================
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_NAME="portfolio-boris"
REPO_NAME="portfolio"
GITHUB_USERNAME=""
GITHUB_TOKEN=""
FTP_HOST=""
FTP_USER=""
FTP_PASSWORD=""
GOOGLE_CLIENT_ID=""
ADMIN_EMAIL=""
NAS_HOST=""
NAS_USER=""
NAS_PASSWORD=""

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
NC='\033[0m' # No Color
BOLD='\033[1m'
DIM='\033[2m'

# =====================================================
# FONCTIONS UTILITAIRES
# =====================================================

# Effacer l'écran et afficher le header
clear_screen() {
    clear
    echo ""
}

# Afficher le logo ASCII
show_logo() {
    echo -e "${GREEN}"
    cat << "EOF"
    ╔═══════════════════════════════════════════════════════════════╗
    ║                                                               ║
    ║     ██████╗  ██████╗ ██████╗ ██╗███████╗    ██╗  ██╗         ║
    ║     ██╔══██╗██╔═══██╗██╔══██╗██║██╔════╝    ██║  ██║         ║
    ║     ██████╔╝██║   ██║██████╔╝██║███████╗    ███████║         ║
    ║     ██╔══██╗██║   ██║██╔══██╗██║╚════██║    ██╔══██║         ║
    ║     ██████╔╝╚██████╔╝██║  ██║██║███████║    ██║  ██║         ║
    ║     ╚═════╝  ╚═════╝ ╚═╝  ╚═╝╚═╝╚══════╝    ╚═╝  ╚═╝         ║
    ║                                                               ║
    ║              🚀 Portfolio Installation Wizard                 ║
    ║                                                               ║
    ╚═══════════════════════════════════════════════════════════════╝
EOF
    echo -e "${NC}"
}

# Afficher une ligne de séparation
separator() {
    echo -e "${GRAY}───────────────────────────────────────────────────────────────────${NC}"
}

# Afficher un titre de section
section_title() {
    echo ""
    echo -e "${CYAN}${BOLD}╭─────────────────────────────────────────────────────────────────╮${NC}"
    echo -e "${CYAN}${BOLD}│  $1${NC}"
    echo -e "${CYAN}${BOLD}╰─────────────────────────────────────────────────────────────────╯${NC}"
    echo ""
}

# Afficher un message d'info
log_info() {
    echo -e "${BLUE}ℹ️  ${NC}$1"
}

# Afficher un message de succès
log_success() {
    echo -e "${GREEN}✅ ${NC}$1"
}

# Afficher un avertissement
log_warning() {
    echo -e "${YELLOW}⚠️  ${NC}$1"
}

# Afficher une erreur
log_error() {
    echo -e "${RED}❌ ${NC}$1"
}

# Afficher une étape
log_step() {
    echo -e "${PURPLE}▶ ${NC}$1"
}

# Demander une entrée utilisateur
prompt_input() {
    local prompt_text="$1"
    local default_value="$2"
    local result=""
    
    if [ -n "$default_value" ]; then
        echo -ne "${WHITE}${prompt_text} ${GRAY}[$default_value]${NC}: "
        read -r result
        result="${result:-$default_value}"
    else
        echo -ne "${WHITE}${prompt_text}${NC}: "
        read -r result
    fi
    
    echo "$result"
}

# Demander un mot de passe (masqué)
prompt_password() {
    local prompt_text="$1"
    local result=""
    
    echo -ne "${WHITE}${prompt_text}${NC}: "
    read -rs result
    echo ""
    
    echo "$result"
}

# Demander confirmation (oui/non)
confirm() {
    local prompt_text="$1"
    local default="${2:-n}"
    local result=""
    
    if [ "$default" = "y" ]; then
        echo -ne "${WHITE}${prompt_text} ${GRAY}[O/n]${NC}: "
    else
        echo -ne "${WHITE}${prompt_text} ${GRAY}[o/N]${NC}: "
    fi
    
    read -r result
    result="${result:-$default}"
    
    case "$result" in
        [oOyY]) return 0 ;;
        *) return 1 ;;
    esac
}

# Afficher une barre de progression
progress_bar() {
    local current=$1
    local total=$2
    local width=50
    local percentage=$((current * 100 / total))
    local filled=$((width * current / total))
    local empty=$((width - filled))
    
    printf "\r${CYAN}["
    printf "%${filled}s" | tr ' ' '█'
    printf "%${empty}s" | tr ' ' '░'
    printf "] ${percentage}%%${NC}"
}

# Spinner d'attente
spinner() {
    local pid=$1
    local message="$2"
    local spin='⠋⠙⠹⠸⠼⠴⠦⠧⠇⠏'
    local i=0
    
    while kill -0 $pid 2>/dev/null; do
        i=$(( (i + 1) % 10 ))
        printf "\r${CYAN}${spin:$i:1}${NC} $message"
        sleep 0.1
    done
    printf "\r"
}

# Vérifier si une commande existe
check_command() {
    command -v "$1" &> /dev/null
}

# =====================================================
# ÉTAPES D'INSTALLATION
# =====================================================

# Étape 0: Vérification des prérequis
check_prerequisites() {
    section_title "📋 ÉTAPE 0/6 - Vérification des prérequis"
    
    local missing=()
    
    log_step "Vérification des outils requis..."
    echo ""
    
    # Node.js
    if check_command node; then
        local node_version=$(node -v)
        log_success "Node.js $node_version"
    else
        log_error "Node.js non trouvé"
        missing+=("nodejs")
    fi
    
    # npm
    if check_command npm; then
        local npm_version=$(npm -v)
        log_success "npm v$npm_version"
    else
        log_error "npm non trouvé"
        missing+=("npm")
    fi
    
    # Git
    if check_command git; then
        local git_version=$(git --version | cut -d' ' -f3)
        log_success "Git v$git_version"
    else
        log_error "Git non trouvé"
        missing+=("git")
    fi
    
    # GitHub CLI (optionnel mais recommandé)
    if check_command gh; then
        local gh_version=$(gh --version | head -1 | cut -d' ' -f3)
        log_success "GitHub CLI v$gh_version"
    else
        log_warning "GitHub CLI non trouvé (optionnel, configuration manuelle des secrets)"
    fi
    
    # Docker (optionnel)
    if check_command docker; then
        local docker_version=$(docker --version | cut -d' ' -f3 | tr -d ',')
        log_success "Docker v$docker_version"
    else
        log_warning "Docker non trouvé (optionnel, pour déploiement NAS)"
    fi
    
    echo ""
    
    if [ ${#missing[@]} -gt 0 ]; then
        log_error "Outils manquants: ${missing[*]}"
        echo ""
        log_info "Installez les outils manquants puis relancez le script."
        exit 1
    fi
    
    log_success "Tous les prérequis sont satisfaits !"
    echo ""
    
    read -p "Appuyez sur Entrée pour continuer..."
}

# Étape 1: Configuration GitHub
configure_github() {
    clear_screen
    show_logo
    section_title "🐙 ÉTAPE 1/6 - Configuration GitHub"
    
    log_info "Nous allons configurer l'accès à GitHub pour le déploiement."
    echo ""
    separator
    echo ""
    
    # Username GitHub
    GITHUB_USERNAME=$(prompt_input "Nom d'utilisateur GitHub" "BorisHenne")
    
    echo ""
    log_info "Pour créer un token GitHub :"
    echo -e "   ${GRAY}1. Aller sur https://github.com/settings/tokens${NC}"
    echo -e "   ${GRAY}2. Generate new token (classic)${NC}"
    echo -e "   ${GRAY}3. Cocher: repo, workflow, write:packages${NC}"
    echo ""
    
    GITHUB_TOKEN=$(prompt_password "🔑 Token GitHub (Personal Access Token)")
    
    # Validation
    if [ -z "$GITHUB_TOKEN" ]; then
        log_warning "Token vide - la configuration automatique des secrets sera ignorée"
    else
        log_success "Token GitHub configuré"
    fi
    
    echo ""
    read -p "Appuyez sur Entrée pour continuer..."
}

# Étape 2: Configuration FTP (LWS)
configure_ftp() {
    clear_screen
    show_logo
    section_title "🌐 ÉTAPE 2/6 - Configuration FTP (Hébergeur LWS)"
    
    log_info "Configuration des accès FTP pour déployer sur boris-henne.fr"
    echo ""
    separator
    echo ""
    
    FTP_HOST=$(prompt_input "Adresse IP/Host FTP" "91.216.107.79")
    FTP_USER=$(prompt_input "Utilisateur FTP" "boris1274039")
    
    echo ""
    log_warning "⚡ NOUVEAU MOT DE PASSE REQUIS"
    log_info "Entrez votre NOUVEAU mot de passe FTP (après l'avoir changé sur LWS)"
    echo ""
    
    FTP_PASSWORD=$(prompt_password "🔑 Mot de passe FTP")
    
    # Confirmation
    echo ""
    FTP_PASSWORD_CONFIRM=$(prompt_password "🔑 Confirmez le mot de passe FTP")
    
    if [ "$FTP_PASSWORD" != "$FTP_PASSWORD_CONFIRM" ]; then
        log_error "Les mots de passe ne correspondent pas !"
        echo ""
        read -p "Appuyez sur Entrée pour réessayer..."
        configure_ftp
        return
    fi
    
    log_success "Configuration FTP enregistrée"
    echo ""
    read -p "Appuyez sur Entrée pour continuer..."
}

# Étape 3: Configuration Google OAuth
configure_google() {
    clear_screen
    show_logo
    section_title "🔐 ÉTAPE 3/6 - Configuration Google OAuth"
    
    log_info "Configuration de l'authentification Google pour l'admin"
    echo ""
    separator
    echo ""
    
    log_info "Pour obtenir un Client ID Google :"
    echo -e "   ${GRAY}1. Aller sur https://console.cloud.google.com/apis/credentials${NC}"
    echo -e "   ${GRAY}2. Create Credentials > OAuth 2.0 Client IDs${NC}"
    echo -e "   ${GRAY}3. Type: Web application${NC}"
    echo -e "   ${GRAY}4. Authorized origins: https://boris-henne.fr${NC}"
    echo ""
    
    GOOGLE_CLIENT_ID=$(prompt_input "Google Client ID" "81908393222-cd9mt7gh96fs6vh99ne16fbn7q7qqn1o.apps.googleusercontent.com")
    ADMIN_EMAIL=$(prompt_input "Email admin autorisé" "boris.henne@gmail.com")
    
    log_success "Configuration Google OAuth enregistrée"
    echo ""
    read -p "Appuyez sur Entrée pour continuer..."
}

# Étape 4: Configuration NAS (optionnel)
configure_nas() {
    clear_screen
    show_logo
    section_title "🖥️ ÉTAPE 4/6 - Configuration NAS Ugreen (Optionnel)"
    
    log_info "Configuration du déploiement Docker sur votre NAS"
    echo ""
    separator
    echo ""
    
    if ! confirm "Voulez-vous configurer le déploiement sur NAS ?"; then
        log_info "Configuration NAS ignorée"
        NAS_HOST=""
        echo ""
        read -p "Appuyez sur Entrée pour continuer..."
        return
    fi
    
    echo ""
    NAS_HOST=$(prompt_input "Adresse IP du NAS" "192.168.1.29")
    NAS_USER=$(prompt_input "Utilisateur SSH" "Risbo")
    
    echo ""
    log_info "Le mot de passe SSH sera demandé lors du déploiement"
    log_info "(il ne sera pas stocké dans les fichiers)"
    echo ""
    
    log_success "Configuration NAS enregistrée"
    echo ""
    read -p "Appuyez sur Entrée pour continuer..."
}

# Étape 5: Récapitulatif
show_summary() {
    clear_screen
    show_logo
    section_title "📋 ÉTAPE 5/6 - Récapitulatif de la configuration"
    
    echo -e "${WHITE}┌─────────────────────────────────────────────────────────────────┐${NC}"
    echo -e "${WHITE}│ ${BOLD}GITHUB${NC}                                                        ${WHITE}│${NC}"
    echo -e "${WHITE}│${NC}   Username    : ${GREEN}$GITHUB_USERNAME${NC}"
    echo -e "${WHITE}│${NC}   Token       : ${GREEN}$(echo "$GITHUB_TOKEN" | sed 's/./*/g' | head -c 20)...${NC}"
    echo -e "${WHITE}├─────────────────────────────────────────────────────────────────┤${NC}"
    echo -e "${WHITE}│ ${BOLD}FTP (LWS)${NC}                                                     ${WHITE}│${NC}"
    echo -e "${WHITE}│${NC}   Host        : ${GREEN}$FTP_HOST${NC}"
    echo -e "${WHITE}│${NC}   User        : ${GREEN}$FTP_USER${NC}"
    echo -e "${WHITE}│${NC}   Password    : ${GREEN}$(echo "$FTP_PASSWORD" | sed 's/./*/g')${NC}"
    echo -e "${WHITE}├─────────────────────────────────────────────────────────────────┤${NC}"
    echo -e "${WHITE}│ ${BOLD}GOOGLE OAUTH${NC}                                                  ${WHITE}│${NC}"
    echo -e "${WHITE}│${NC}   Client ID   : ${GREEN}${GOOGLE_CLIENT_ID:0:30}...${NC}"
    echo -e "${WHITE}│${NC}   Admin Email : ${GREEN}$ADMIN_EMAIL${NC}"
    echo -e "${WHITE}├─────────────────────────────────────────────────────────────────┤${NC}"
    echo -e "${WHITE}│ ${BOLD}NAS UGREEN${NC}                                                    ${WHITE}│${NC}"
    if [ -n "$NAS_HOST" ]; then
        echo -e "${WHITE}│${NC}   Host        : ${GREEN}$NAS_HOST${NC}"
        echo -e "${WHITE}│${NC}   User        : ${GREEN}$NAS_USER${NC}"
    else
        echo -e "${WHITE}│${NC}   ${GRAY}Non configuré${NC}"
    fi
    echo -e "${WHITE}└─────────────────────────────────────────────────────────────────┘${NC}"
    
    echo ""
    
    if ! confirm "Ces informations sont-elles correctes ?" "y"; then
        log_info "Retour au début de la configuration..."
        sleep 2
        main
        return
    fi
    
    echo ""
    read -p "Appuyez sur Entrée pour lancer l'installation..."
}

# Étape 6: Installation
run_installation() {
    clear_screen
    show_logo
    section_title "🚀 ÉTAPE 6/6 - Installation en cours..."
    
    local total_steps=8
    local current_step=0
    
    # Étape 1: Créer le fichier .env
    ((current_step++))
    log_step "[$current_step/$total_steps] Création du fichier .env..."
    
    cat > "$SCRIPT_DIR/.env" << EOF
# =====================================================
# PORTFOLIO BORIS HENNÉ - Variables d'environnement
# Généré automatiquement le $(date '+%Y-%m-%d %H:%M:%S')
# =====================================================

VITE_APP_URL=https://boris-henne.fr
VITE_ADMIN_EMAIL=$ADMIN_EMAIL
VITE_GOOGLE_CLIENT_ID=$GOOGLE_CLIENT_ID
EOF
    
    log_success "Fichier .env créé"
    sleep 0.5
    
    # Étape 2: Installation des dépendances
    ((current_step++))
    log_step "[$current_step/$total_steps] Installation des dépendances npm..."
    
    cd "$SCRIPT_DIR"
    npm ci --silent &
    spinner $! "Installation des packages..."
    log_success "Dépendances installées"
    
    # Étape 3: Build du projet
    ((current_step++))
    log_step "[$current_step/$total_steps] Build de production..."
    
    npm run build --silent &
    spinner $! "Compilation en cours..."
    log_success "Build terminé"
    
    # Étape 4: Initialisation Git
    ((current_step++))
    log_step "[$current_step/$total_steps] Initialisation du repository Git..."
    
    if [ ! -d ".git" ]; then
        git init --quiet
        git add .
        git commit -m "🚀 Initial commit - Portfolio optimisé" --quiet
        log_success "Repository Git initialisé"
    else
        log_info "Repository Git existant"
    fi
    
    # Étape 5: Configuration remote GitHub
    ((current_step++))
    log_step "[$current_step/$total_steps] Configuration GitHub remote..."
    
    git remote remove origin 2>/dev/null || true
    git remote add origin "https://github.com/$GITHUB_USERNAME/$REPO_NAME.git"
    log_success "Remote GitHub configuré"
    
    # Étape 6: Configuration des GitHub Secrets
    ((current_step++))
    log_step "[$current_step/$total_steps] Configuration des GitHub Secrets..."
    
    if [ -n "$GITHUB_TOKEN" ] && check_command gh; then
        echo "$GITHUB_TOKEN" | gh auth login --with-token 2>/dev/null || true
        
        gh secret set FTP_HOST -b "$FTP_HOST" -R "$GITHUB_USERNAME/$REPO_NAME" 2>/dev/null || log_warning "Impossible de définir FTP_HOST"
        gh secret set FTP_USER -b "$FTP_USER" -R "$GITHUB_USERNAME/$REPO_NAME" 2>/dev/null || log_warning "Impossible de définir FTP_USER"
        gh secret set FTP_PASSWORD -b "$FTP_PASSWORD" -R "$GITHUB_USERNAME/$REPO_NAME" 2>/dev/null || log_warning "Impossible de définir FTP_PASSWORD"
        gh secret set VITE_GOOGLE_CLIENT_ID -b "$GOOGLE_CLIENT_ID" -R "$GITHUB_USERNAME/$REPO_NAME" 2>/dev/null || log_warning "Impossible de définir VITE_GOOGLE_CLIENT_ID"
        gh secret set VITE_ADMIN_EMAIL -b "$ADMIN_EMAIL" -R "$GITHUB_USERNAME/$REPO_NAME" 2>/dev/null || log_warning "Impossible de définir VITE_ADMIN_EMAIL"
        
        log_success "GitHub Secrets configurés"
    else
        log_warning "Configuration manuelle des secrets requise"
        create_secrets_guide
    fi
    
    # Étape 7: Push vers GitHub
    ((current_step++))
    log_step "[$current_step/$total_steps] Push vers GitHub..."
    
    git branch -M main 2>/dev/null || true
    
    if git push -u origin main 2>/dev/null; then
        log_success "Code poussé vers GitHub"
    else
        log_warning "Impossible de push (vérifiez que le repo existe)"
        log_info "Créez le repo sur https://github.com/new puis relancez: git push -u origin main"
    fi
    
    # Étape 8: Déploiement NAS (si configuré)
    ((current_step++))
    if [ -n "$NAS_HOST" ]; then
        log_step "[$current_step/$total_steps] Préparation du déploiement NAS..."
        create_nas_deploy_script
        log_success "Script NAS créé: scripts/deploy-to-nas.sh"
    else
        log_step "[$current_step/$total_steps] Déploiement NAS ignoré (non configuré)"
    fi
    
    echo ""
    separator
    echo ""
    log_success "Installation terminée avec succès !"
    
    show_final_instructions
}

# Créer le guide pour configuration manuelle des secrets
create_secrets_guide() {
    cat > "$SCRIPT_DIR/GITHUB_SECRETS.md" << EOF
# 🔐 Configuration manuelle des GitHub Secrets

Allez sur: https://github.com/$GITHUB_USERNAME/$REPO_NAME/settings/secrets/actions

Ajoutez les secrets suivants:

| Secret | Valeur |
|--------|--------|
| \`FTP_HOST\` | \`$FTP_HOST\` |
| \`FTP_USER\` | \`$FTP_USER\` |
| \`FTP_PASSWORD\` | \`[Votre mot de passe FTP]\` |
| \`VITE_GOOGLE_CLIENT_ID\` | \`$GOOGLE_CLIENT_ID\` |
| \`VITE_ADMIN_EMAIL\` | \`$ADMIN_EMAIL\` |

> ⚠️ Ce fichier contient des informations sensibles. Supprimez-le après configuration !
EOF
    
    log_info "Guide créé: GITHUB_SECRETS.md"
}

# Créer le script de déploiement NAS personnalisé
create_nas_deploy_script() {
    cat > "$SCRIPT_DIR/scripts/deploy-to-nas.sh" << EOF
#!/bin/bash
# Script de déploiement vers NAS $NAS_HOST
# Usage: ./scripts/deploy-to-nas.sh

echo "🖥️ Déploiement vers NAS Ugreen..."
echo ""

# Demander le mot de passe SSH
echo -n "Mot de passe SSH pour $NAS_USER@$NAS_HOST: "
read -s NAS_PASSWORD
echo ""

# Copier le script sur le NAS
sshpass -p "\$NAS_PASSWORD" scp scripts/deploy-nas.sh $NAS_USER@$NAS_HOST:~/deploy-portfolio.sh

# Exécuter le script sur le NAS
sshpass -p "\$NAS_PASSWORD" ssh $NAS_USER@$NAS_HOST "chmod +x ~/deploy-portfolio.sh && ~/deploy-portfolio.sh install"

echo ""
echo "✅ Déploiement NAS terminé !"
echo "🌐 URL: http://$NAS_HOST:3000"
EOF
    
    chmod +x "$SCRIPT_DIR/scripts/deploy-to-nas.sh"
}

# Afficher les instructions finales
show_final_instructions() {
    echo ""
    echo -e "${GREEN}╔═══════════════════════════════════════════════════════════════════╗${NC}"
    echo -e "${GREEN}║                                                                   ║${NC}"
    echo -e "${GREEN}║   🎉 ${BOLD}INSTALLATION TERMINÉE !${NC}${GREEN}                                    ║${NC}"
    echo -e "${GREEN}║                                                                   ║${NC}"
    echo -e "${GREEN}╚═══════════════════════════════════════════════════════════════════╝${NC}"
    echo ""
    
    echo -e "${WHITE}${BOLD}📍 Prochaines étapes :${NC}"
    echo ""
    echo -e "   ${CYAN}1.${NC} Vérifiez le pipeline GitHub Actions :"
    echo -e "      ${GRAY}https://github.com/$GITHUB_USERNAME/$REPO_NAME/actions${NC}"
    echo ""
    echo -e "   ${CYAN}2.${NC} Votre site sera déployé sur :"
    echo -e "      ${GREEN}https://boris-henne.fr${NC}"
    echo ""
    
    if [ -n "$NAS_HOST" ]; then
        echo -e "   ${CYAN}3.${NC} Pour déployer sur le NAS :"
        echo -e "      ${GRAY}./scripts/deploy-to-nas.sh${NC}"
        echo ""
    fi
    
    echo -e "${WHITE}${BOLD}📁 Fichiers créés :${NC}"
    echo -e "   ${GRAY}• .env (variables d'environnement locales)${NC}"
    echo -e "   ${GRAY}• dist/ (build de production)${NC}"
    if [ -f "GITHUB_SECRETS.md" ]; then
        echo -e "   ${GRAY}• GITHUB_SECRETS.md (guide de configuration)${NC}"
    fi
    echo ""
    
    echo -e "${YELLOW}⚠️  Rappel sécurité :${NC}"
    echo -e "   ${GRAY}• Les mots de passe ne sont pas stockés dans les fichiers${NC}"
    echo -e "   ${GRAY}• Utilisez GitHub Secrets pour le CI/CD${NC}"
    echo -e "   ${GRAY}• Ne commitez jamais le fichier .env${NC}"
    echo ""
    
    separator
    echo ""
    echo -e "${GRAY}Script créé par Claude pour Boris Henné 🤖${NC}"
    echo ""
}

# =====================================================
# POINT D'ENTRÉE PRINCIPAL
# =====================================================
main() {
    clear_screen
    show_logo
    
    echo ""
    log_info "Bienvenue dans l'assistant d'installation du portfolio !"
    echo ""
    log_info "Ce script va vous guider pour :"
    echo -e "   ${GRAY}• Configurer les accès GitHub${NC}"
    echo -e "   ${GRAY}• Configurer le déploiement FTP (LWS)${NC}"
    echo -e "   ${GRAY}• Configurer Google OAuth${NC}"
    echo -e "   ${GRAY}• Optionnel: Configurer le NAS Ugreen${NC}"
    echo ""
    
    separator
    echo ""
    
    log_warning "Tous les mots de passe seront demandés de manière sécurisée"
    log_warning "et ne seront jamais stockés en clair dans les fichiers."
    echo ""
    
    if ! confirm "Prêt à commencer ?" "y"; then
        echo ""
        log_info "Installation annulée."
        exit 0
    fi
    
    # Exécuter toutes les étapes
    check_prerequisites
    configure_github
    configure_ftp
    configure_google
    configure_nas
    show_summary
    run_installation
}

# Lancer le script
main "$@"
