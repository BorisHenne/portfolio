import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { GoogleOAuthProvider } from '@react-oauth/google';

import App from './App';
import './i18n';
import './index.css';

// Google OAuth Client ID (optionnel)
const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID || '';

// Validation de l'élément root
const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error('Root element not found');
}

// React 18 Concurrent Mode
// GoogleOAuthProvider uniquement si le client ID est configuré
const AppWithProviders = GOOGLE_CLIENT_ID ? (
  <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
    <App />
  </GoogleOAuthProvider>
) : (
  <App />
);

createRoot(rootElement).render(
  <StrictMode>
    {AppWithProviders}
  </StrictMode>
);

// Register Service Worker pour PWA
if ('serviceWorker' in navigator && import.meta.env.PROD) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/sw.js')
      .then((registration) => {
        console.warn('SW registered:', registration.scope);
      })
      .catch((error) => {
        console.error('SW registration failed:', error);
      });
  });
}
