import { memo, useState, useCallback, useRef, lazy, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Shield, LogOut, Upload, AlertCircle, Check, FileText } from 'lucide-react';

import { useAuthStore } from '../../stores/useStore';
import { cn } from '../../utils';

// Email autorisé pour l'admin
const ADMIN_EMAIL = import.meta.env.VITE_ADMIN_EMAIL || 'boris.henne@gmail.com';
const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID || '';

// Lazy load du bouton Google OAuth (uniquement si configuré)
const GoogleLoginButtonLazy = GOOGLE_CLIENT_ID
  ? lazy(() => import('./GoogleLoginButton'))
  : null;

// Message quand OAuth n'est pas configuré
function OAuthNotConfigured() {
  return (
    <div className="p-4 rounded-xl bg-yellow-500/10 border border-yellow-500/30 text-yellow-400 text-sm text-center">
      <AlertCircle size={20} className="mx-auto mb-2" />
      <p className="font-medium">Configuration OAuth manquante</p>
      <p className="text-xs mt-1 text-yellow-500/70">
        Définissez VITE_GOOGLE_CLIENT_ID dans .env
      </p>
    </div>
  );
}

function AdminModalComponent() {
  const { isAuthenticated, user, setAuthenticated, logout } = useAuthStore();
  const [isOpen, setIsOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [uploadedFileName, setUploadedFileName] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleLoginSuccess = async (accessToken: string) => {
    setIsLoading(true);
    setError(null);

    try {
      // Fetch user info from Google
      const res = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      const userData = await res.json();

      // Verify email
      if (userData.email === ADMIN_EMAIL) {
        setAuthenticated(true, {
          email: userData.email,
          name: userData.name,
          picture: userData.picture,
        });
      } else {
        setError(`Accès refusé. Seul ${ADMIN_EMAIL} peut se connecter.`);
      }
    } catch {
      setError('Erreur lors de la connexion');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLoginError = () => {
    setError('Erreur Google OAuth');
    setIsLoading(false);
  };

  const handleLogout = useCallback(() => {
    logout();
    setIsOpen(false);
    setUploadSuccess(false);
    setUploadedFileName(null);
  }, [logout]);

  const toggleModal = useCallback(() => {
    setIsOpen((prev) => !prev);
    setError(null);
    setUploadSuccess(false);
  }, []);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Vérifier que c'est un PDF
      if (file.type !== 'application/pdf') {
        setError('Veuillez sélectionner un fichier PDF');
        return;
      }

      // Simuler l'upload (en production, envoyer au backend)
      setUploadedFileName(file.name);
      setUploadSuccess(true);
      setError(null);

      // TODO: Implémenter l'upload réel vers le serveur
      console.log('Fichier à uploader:', file.name, file.size);
    }
  };

  const triggerFileUpload = () => {
    fileInputRef.current?.click();
  };

  // Admin trigger button - discret en bas à gauche, plus visible sur mobile
  const AdminTrigger = (
    <button
      onClick={toggleModal}
      className={cn(
        'fixed bottom-4 left-4 sm:bottom-6 sm:left-6 z-40 p-3 sm:p-2 rounded-xl sm:rounded-lg transition-all touch-manipulation',
        isAuthenticated
          ? 'bg-primary-500/20 text-primary-400 border border-primary-500/30'
          : 'bg-dark-800/70 text-gray-500 hover:text-gray-400 border border-gray-700/50'
      )}
      aria-label="Administration"
    >
      <Shield size={22} className="sm:w-5 sm:h-5" />
    </button>
  );

  return (
    <>
      {AdminTrigger}

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={toggleModal}
              className="fixed inset-0 z-50 bg-dark-950/90 backdrop-blur-md"
            />

            {/* Modal - optimisé mobile */}
            <motion.div
              initial={{ opacity: 0, y: 50, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 50, scale: 0.95 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="fixed inset-x-4 bottom-4 sm:inset-auto sm:top-1/2 sm:left-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2 z-50 sm:w-full sm:max-w-md"
            >
              <div className="glass-card rounded-2xl p-5 sm:p-6 border-primary-500/20">
                {/* Header */}
                <div className="flex items-center justify-between mb-5 sm:mb-6">
                  <h2 className="font-display text-lg sm:text-xl font-semibold text-white flex items-center gap-2">
                    <Shield className="text-primary-500" size={22} />
                    Administration
                  </h2>
                  <button
                    onClick={toggleModal}
                    className="p-2.5 sm:p-2 rounded-xl sm:rounded-lg text-gray-400 hover:text-white hover:bg-white/10 active:bg-white/20 transition-all touch-manipulation"
                  >
                    <X size={22} className="sm:w-5 sm:h-5" />
                  </button>
                </div>

                {/* Content */}
                {isAuthenticated && user ? (
                  <div className="space-y-5 sm:space-y-6">
                    {/* User info */}
                    <div className="flex items-center gap-3 sm:gap-4 p-4 rounded-xl bg-primary-500/10 border border-primary-500/20">
                      {user.picture && (
                        <img
                          src={user.picture}
                          alt={user.name}
                          className="w-14 h-14 sm:w-12 sm:h-12 rounded-full border-2 border-primary-500/30"
                        />
                      )}
                      <div className="min-w-0 flex-1">
                        <p className="font-medium text-white text-base sm:text-sm truncate">{user.name}</p>
                        <p className="text-sm sm:text-xs text-gray-400 truncate">{user.email}</p>
                      </div>
                      <Check className="text-primary-500 flex-shrink-0" size={20} />
                    </div>

                    {/* CV Upload */}
                    <div className="space-y-3">
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept=".pdf"
                        onChange={handleFileUpload}
                        className="hidden"
                      />

                      <button
                        onClick={triggerFileUpload}
                        className={cn(
                          'w-full flex items-center justify-center gap-3 px-6 py-4 rounded-xl font-semibold text-base transition-all touch-manipulation',
                          uploadSuccess
                            ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                            : 'btn-secondary'
                        )}
                      >
                        {uploadSuccess ? (
                          <>
                            <Check size={20} />
                            CV mis à jour
                          </>
                        ) : (
                          <>
                            <Upload size={20} />
                            Mettre à jour le CV
                          </>
                        )}
                      </button>

                      {uploadedFileName && (
                        <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-dark-800/50 text-gray-400 text-sm">
                          <FileText size={16} className="flex-shrink-0" />
                          <span className="truncate">{uploadedFileName}</span>
                        </div>
                      )}
                    </div>

                    {/* Error message */}
                    {error && (
                      <div className="p-3 rounded-xl bg-red-500/20 border border-red-500/30 flex items-start gap-2 text-red-400 text-sm">
                        <AlertCircle size={18} className="mt-0.5 flex-shrink-0" />
                        <span>{error}</span>
                      </div>
                    )}

                    {/* Logout */}
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center justify-center gap-2 px-4 py-4 sm:py-3 rounded-xl text-red-400 hover:bg-red-500/10 active:bg-red-500/20 transition-colors touch-manipulation"
                    >
                      <LogOut size={20} />
                      <span className="font-medium">Déconnexion</span>
                    </button>
                  </div>
                ) : (
                  <div className="space-y-5 sm:space-y-6">
                    <p className="text-gray-400 text-center text-base sm:text-sm">
                      Connectez-vous pour accéder aux fonctionnalités d'administration.
                    </p>

                    {/* Error message */}
                    {error && (
                      <div className="p-3 rounded-xl bg-red-500/20 border border-red-500/30 flex items-start gap-2 text-red-400 text-sm">
                        <AlertCircle size={18} className="mt-0.5 flex-shrink-0" />
                        <span>{error}</span>
                      </div>
                    )}

                    {/* Google login button - conditionnel */}
                    {GoogleLoginButtonLazy ? (
                      <Suspense
                        fallback={
                          <div className="btn-primary w-full flex items-center justify-center py-4">
                            <div className="w-5 h-5 border-2 border-dark-950/30 border-t-dark-950 rounded-full animate-spin" />
                          </div>
                        }
                      >
                        <GoogleLoginButtonLazy
                          onSuccess={handleLoginSuccess}
                          onError={handleLoginError}
                          isLoading={isLoading}
                        />
                      </Suspense>
                    ) : (
                      <OAuthNotConfigured />
                    )}

                    <p className="text-gray-600 text-xs text-center">
                      Seul <span className="text-primary-400 font-mono">{ADMIN_EMAIL}</span> peut se connecter.
                    </p>
                  </div>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

export default memo(AdminModalComponent);
