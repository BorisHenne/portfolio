# =====================================================
# 🚀 PORTFOLIO BORIS HENNÉ - Installation Wizard (Windows)
# =====================================================
# Script PowerShell interactif pour configurer et déployer
# Usage: .\install.ps1
# =====================================================

$ErrorActionPreference = "Stop"

# =====================================================
# FONCTIONS UTILITAIRES
# =====================================================

function Write-ColorOutput($ForegroundColor) {
    $fc = $host.UI.RawUI.ForegroundColor
    $host.UI.RawUI.ForegroundColor = $ForegroundColor
    if ($args) {
        Write-Output $args
    }
    $host.UI.RawUI.ForegroundColor = $fc
}

function Show-Logo {
    Write-Host ""
    Write-Host "    ╔═══════════════════════════════════════════════════════════════╗" -ForegroundColor Green
    Write-Host "    ║                                                               ║" -ForegroundColor Green
    Write-Host "    ║     ██████╗  ██████╗ ██████╗ ██╗███████╗    ██╗  ██╗         ║" -ForegroundColor Green
    Write-Host "    ║     ██╔══██╗██╔═══██╗██╔══██╗██║██╔════╝    ██║  ██║         ║" -ForegroundColor Green
    Write-Host "    ║     ██████╔╝██║   ██║██████╔╝██║███████╗    ███████║         ║" -ForegroundColor Green
    Write-Host "    ║     ██╔══██╗██║   ██║██╔══██╗██║╚════██║    ██╔══██║         ║" -ForegroundColor Green
    Write-Host "    ║     ██████╔╝╚██████╔╝██║  ██║██║███████║    ██║  ██║         ║" -ForegroundColor Green
    Write-Host "    ║     ╚═════╝  ╚═════╝ ╚═╝  ╚═╝╚═╝╚══════╝    ╚═╝  ╚═╝         ║" -ForegroundColor Green
    Write-Host "    ║                                                               ║" -ForegroundColor Green
    Write-Host "    ║              🚀 Portfolio Installation Wizard                 ║" -ForegroundColor Green
    Write-Host "    ║                                                               ║" -ForegroundColor Green
    Write-Host "    ╚═══════════════════════════════════════════════════════════════╝" -ForegroundColor Green
    Write-Host ""
}

function Show-Section($title) {
    Write-Host ""
    Write-Host "╭─────────────────────────────────────────────────────────────────╮" -ForegroundColor Cyan
    Write-Host "│  $title" -ForegroundColor Cyan
    Write-Host "╰─────────────────────────────────────────────────────────────────╯" -ForegroundColor Cyan
    Write-Host ""
}

function Log-Info($message) {
    Write-Host "ℹ️  $message" -ForegroundColor Blue
}

function Log-Success($message) {
    Write-Host "✅ $message" -ForegroundColor Green
}

function Log-Warning($message) {
    Write-Host "⚠️  $message" -ForegroundColor Yellow
}

function Log-Error($message) {
    Write-Host "❌ $message" -ForegroundColor Red
}

function Log-Step($message) {
    Write-Host "▶ $message" -ForegroundColor Magenta
}

function Get-SecureInput($prompt) {
    $secure = Read-Host -Prompt $prompt -AsSecureString
    $BSTR = [System.Runtime.InteropServices.Marshal]::SecureStringToBSTR($secure)
    return [System.Runtime.InteropServices.Marshal]::PtrToStringAuto($BSTR)
}

# =====================================================
# CONFIGURATION
# =====================================================

Clear-Host
Show-Logo

Write-Host "Bienvenue dans l'assistant d'installation du portfolio !" -ForegroundColor White
Write-Host ""

# --- ÉTAPE 1: GitHub ---
Show-Section "🐙 ÉTAPE 1/5 - Configuration GitHub"

$GITHUB_USERNAME = Read-Host -Prompt "Nom d'utilisateur GitHub [BorisHenne]"
if ([string]::IsNullOrEmpty($GITHUB_USERNAME)) { $GITHUB_USERNAME = "BorisHenne" }

Write-Host ""
Log-Info "Pour créer un token GitHub :"
Write-Host "   1. Aller sur https://github.com/settings/tokens" -ForegroundColor Gray
Write-Host "   2. Generate new token (classic)" -ForegroundColor Gray
Write-Host "   3. Cocher: repo, workflow, write:packages" -ForegroundColor Gray
Write-Host ""

$GITHUB_TOKEN = Get-SecureInput "🔑 Token GitHub (masqué)"
Log-Success "Token GitHub configuré"

Read-Host "Appuyez sur Entrée pour continuer..."

# --- ÉTAPE 2: FTP ---
Clear-Host
Show-Logo
Show-Section "🌐 ÉTAPE 2/5 - Configuration FTP (LWS)"

$FTP_HOST = Read-Host -Prompt "Adresse IP/Host FTP [91.216.107.79]"
if ([string]::IsNullOrEmpty($FTP_HOST)) { $FTP_HOST = "91.216.107.79" }

$FTP_USER = Read-Host -Prompt "Utilisateur FTP [boris1274039]"
if ([string]::IsNullOrEmpty($FTP_USER)) { $FTP_USER = "boris1274039" }

Write-Host ""
Log-Warning "⚡ NOUVEAU MOT DE PASSE REQUIS"
Log-Info "Entrez votre NOUVEAU mot de passe FTP"
Write-Host ""

$FTP_PASSWORD = Get-SecureInput "🔑 Mot de passe FTP (masqué)"
$FTP_PASSWORD_CONFIRM = Get-SecureInput "🔑 Confirmez le mot de passe"

if ($FTP_PASSWORD -ne $FTP_PASSWORD_CONFIRM) {
    Log-Error "Les mots de passe ne correspondent pas !"
    exit 1
}

Log-Success "Configuration FTP enregistrée"
Read-Host "Appuyez sur Entrée pour continuer..."

# --- ÉTAPE 3: Google OAuth ---
Clear-Host
Show-Logo
Show-Section "🔐 ÉTAPE 3/5 - Configuration Google OAuth"

$GOOGLE_CLIENT_ID = Read-Host -Prompt "Google Client ID"
$ADMIN_EMAIL = Read-Host -Prompt "Email admin autorisé [boris.henne@gmail.com]"
if ([string]::IsNullOrEmpty($ADMIN_EMAIL)) { $ADMIN_EMAIL = "boris.henne@gmail.com" }

Log-Success "Configuration Google OAuth enregistrée"
Read-Host "Appuyez sur Entrée pour continuer..."

# --- ÉTAPE 4: NAS ---
Clear-Host
Show-Logo
Show-Section "🖥️ ÉTAPE 4/5 - Configuration NAS (Optionnel)"

$configureNAS = Read-Host -Prompt "Configurer le déploiement NAS ? (o/N)"
if ($configureNAS -eq "o" -or $configureNAS -eq "O") {
    $NAS_HOST = Read-Host -Prompt "Adresse IP du NAS [192.168.1.29]"
    if ([string]::IsNullOrEmpty($NAS_HOST)) { $NAS_HOST = "192.168.1.29" }
    
    $NAS_USER = Read-Host -Prompt "Utilisateur SSH [Risbo]"
    if ([string]::IsNullOrEmpty($NAS_USER)) { $NAS_USER = "Risbo" }
    
    Log-Success "Configuration NAS enregistrée"
} else {
    $NAS_HOST = ""
    Log-Info "Configuration NAS ignorée"
}

Read-Host "Appuyez sur Entrée pour continuer..."

# --- ÉTAPE 5: Installation ---
Clear-Host
Show-Logo
Show-Section "🚀 ÉTAPE 5/5 - Installation"

# Créer .env
Log-Step "Création du fichier .env..."
@"
VITE_APP_URL=https://boris-henne.fr
VITE_ADMIN_EMAIL=$ADMIN_EMAIL
VITE_GOOGLE_CLIENT_ID=$GOOGLE_CLIENT_ID
"@ | Out-File -FilePath ".env" -Encoding UTF8
Log-Success "Fichier .env créé"

# npm install
Log-Step "Installation des dépendances..."
npm ci --silent
Log-Success "Dépendances installées"

# Build
Log-Step "Build de production..."
npm run build
Log-Success "Build terminé"

# Git
Log-Step "Initialisation Git..."
if (-not (Test-Path ".git")) {
    git init --quiet
    git add .
    git commit -m "🚀 Initial commit" --quiet
}
git remote remove origin 2>$null
git remote add origin "https://github.com/$GITHUB_USERNAME/portfolio.git"
Log-Success "Repository Git configuré"

# GitHub Secrets (via gh CLI si disponible)
Log-Step "Configuration des GitHub Secrets..."
$ghInstalled = Get-Command gh -ErrorAction SilentlyContinue
if ($ghInstalled -and $GITHUB_TOKEN) {
    $env:GH_TOKEN = $GITHUB_TOKEN
    gh secret set FTP_HOST -b $FTP_HOST -R "$GITHUB_USERNAME/portfolio" 2>$null
    gh secret set FTP_USER -b $FTP_USER -R "$GITHUB_USERNAME/portfolio" 2>$null
    gh secret set FTP_PASSWORD -b $FTP_PASSWORD -R "$GITHUB_USERNAME/portfolio" 2>$null
    gh secret set VITE_GOOGLE_CLIENT_ID -b $GOOGLE_CLIENT_ID -R "$GITHUB_USERNAME/portfolio" 2>$null
    gh secret set VITE_ADMIN_EMAIL -b $ADMIN_EMAIL -R "$GITHUB_USERNAME/portfolio" 2>$null
    Log-Success "GitHub Secrets configurés"
} else {
    Log-Warning "GitHub CLI non disponible - configurez les secrets manuellement"
    Log-Info "Guide: https://github.com/$GITHUB_USERNAME/portfolio/settings/secrets/actions"
}

# Push
Log-Step "Push vers GitHub..."
git branch -M main 2>$null
git push -u origin main 2>$null
if ($LASTEXITCODE -eq 0) {
    Log-Success "Code poussé vers GitHub"
} else {
    Log-Warning "Push échoué - créez d'abord le repo sur GitHub"
}

# Fin
Write-Host ""
Write-Host "═══════════════════════════════════════════════════════════════════" -ForegroundColor Green
Write-Host ""
Write-Host "   🎉 INSTALLATION TERMINÉE !" -ForegroundColor Green
Write-Host ""
Write-Host "═══════════════════════════════════════════════════════════════════" -ForegroundColor Green
Write-Host ""
Write-Host "📍 Prochaines étapes :" -ForegroundColor White
Write-Host "   1. Vérifiez le pipeline: https://github.com/$GITHUB_USERNAME/portfolio/actions" -ForegroundColor Gray
Write-Host "   2. Votre site: https://boris-henne.fr" -ForegroundColor Green
Write-Host ""
