// Protection anti-scraping pour les informations de contact
// Les données sont encodées et décodées côté client uniquement

const decode = (str: string): string => {
  try {
    return atob(str).split('').reverse().join('');
  } catch {
    return '';
  }
};

// Données encodées (inversées puis base64)
const PROTECTED_DATA = {
  email: 'bW9jLmxpYW1nQGVubmVoLnNpcm9i',
  emailPro: 'dWUuY21iZUBibmVoLmI=',
  phone: 'ODIgMzUgMDcgNjAgNiAzMys=',
};

export interface ContactInfo {
  email: string;
  emailPro: string;
  phone: string;
}

export const getContactInfo = (): ContactInfo => {
  return {
    email: decode(PROTECTED_DATA.email),
    emailPro: decode(PROTECTED_DATA.emailPro),
    phone: decode(PROTECTED_DATA.phone),
  };
};

// Génère un mailto: protégé
export const getMailtoLink = (type: 'personal' | 'pro' = 'personal'): string => {
  const email = type === 'pro'
    ? decode(PROTECTED_DATA.emailPro)
    : decode(PROTECTED_DATA.email);
  return `mailto:${email}`;
};

// Génère un tel: protégé
export const getTelLink = (): string => {
  const phone = decode(PROTECTED_DATA.phone);
  return `tel:${phone.replace(/\s/g, '')}`;
};

// Affiche le numéro de façon fragmentée pour éviter le scraping simple
export const getObfuscatedPhone = (): string => {
  return decode(PROTECTED_DATA.phone);
};

export const getObfuscatedEmail = (type: 'personal' | 'pro' = 'personal'): string => {
  const email = type === 'pro'
    ? decode(PROTECTED_DATA.emailPro)
    : decode(PROTECTED_DATA.email);
  return email;
};
