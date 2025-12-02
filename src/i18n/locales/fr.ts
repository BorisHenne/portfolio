export default {
  // Navigation
  nav: {
    home: 'Accueil',
    about: 'À propos',
    experience: 'Expérience',
    education: 'Formation',
    skills: 'Compétences',
    projects: 'Projets',
    contact: 'Contact',
  },

  // Hero Section
  hero: {
    greeting: 'Bonjour, je suis',
    name: 'Boris HENNÉ',
    title: 'Consultant Technique Senior SAP ABAP/Fiori',
    subtitle: 'Full-Stack Developer & Passionné d\'Automatisation',
    location: 'Thionville, Grand Est, France',
    cta: 'Me contacter',
    cv: 'Télécharger CV',
  },

  // About Section
  about: {
    title: 'À propos',
    intro: 'Consultant SAP avec plus de 12 ans d\'expérience, je combine expertise technique ABAP et développement Full-Stack moderne.',
    description: 'Passionné par les technologies, je développe des solutions innovantes en alliant SAP, React, et automatisation. Mon expertise couvre ABAP-OO, Fiori UI5, CDS, OData, ainsi que les technologies web modernes.',
    interests: 'Passions',
    interestsList: {
      music: 'Musique',
      domotics: 'Domotique (Home Assistant)',
      ai: 'Intelligence Artificielle',
      automation: 'Automatisation (Make.com, MCP)',
      dev: 'Développement',
    },
    years: 'Années d\'expérience',
    projects: 'Projets réalisés',
    certifications: 'Technologies maîtrisées',
  },

  // Experience Section
  experience: {
    title: 'Expérience',
    present: 'Présent',
    showMore: 'Voir plus',
    showLess: 'Voir moins',
    positions: {
      ebmc: {
        title: 'Consultant Technique SAP',
        company: 'E.B.M. Consulting',
        period: 'Avr. 2023 - Présent',
        location: 'Luxembourg',
        description: 'Développement SAP avancé pour VINCI Construction : Adobe LiveCycle, User Exits, Enhancement Points, ABAP-OO, BAPI, CDS, OData, IDoc.',
      },
      ekenz1: {
        title: 'Consultant SAP ABAP',
        company: 'e-Kenz',
        period: 'Mars 2020 - Mars 2023',
        location: 'Luxembourg',
        description: 'Design Patterns, SAP Fiori, WordPress, Frontend Best Practices, UI5, ABAP-OO, POO, SAP ERP.',
      },
      chambreCommerce: {
        title: 'Consultant Technique SAP',
        company: 'Chambre de Commerce Luxembourg',
        period: 'Nov. 2022 - Mars 2023',
        location: 'Luxembourg',
        description: 'Numérisation factures vers serveurs étatiques. Extraction JSON depuis tables SD, envoi FTP. Intégration Babelway.',
      },
      tresorerie: {
        title: 'Consultant Technique SAP',
        company: 'Trésorerie d\'État Luxembourg',
        period: 'Jan. 2022 - Sept. 2022',
        location: 'Luxembourg',
        description: 'Gestion comptes et assurances en déshérence. Analyse tables FI, corrections bugs. Développement ABAP-OO.',
      },
      cfl: {
        title: 'Consultant Fonctionnel SAP',
        company: 'CFL (Chemins de fer)',
        period: 'Juil. 2020 - Déc. 2020',
        location: 'Luxembourg',
        description: 'Gestion autorisations et rôles SAP. Projet uniformisation des rôles. Administration CUA.',
      },
      reprise: {
        title: 'Développeur Web',
        company: '1reprise.fr',
        period: 'Oct. 2019 - Nov. 2019',
        location: 'Nancy, France',
        description: 'Développement web avec Bootstrap.',
      },
      censio: {
        title: 'Consultant IT/UX',
        company: 'Censio',
        period: 'Avr. 2019 - Mai 2019',
        location: 'Paris, France',
        description: 'Développement Smartforms, Enhancement Points, Interfaces ABAP entrantes et sortantes.',
      },
      etam: {
        title: 'Consultant SAP ABAP',
        company: 'Etam',
        period: 'Fév. 2018 - Mars 2019',
        location: 'Paris, France',
        description: 'Développement SAP ERP.',
      },
      freelance: {
        title: 'Développeur Web Freelance',
        company: 'Indépendant',
        period: 'Juil. 2017 - Janv. 2018',
        location: 'Paris, France',
        description: 'Développement Web/Mobile (Meteor, Angular 2, Ionic 2, ReactJS). Développement SAP (FI CO MM SD) avec 2 ans d\'expérience.',
      },
      danone: {
        title: 'Stagiaire',
        company: 'Danone',
        period: 'Nov. 2016 - Mai 2017',
        location: 'Paris, France',
        description: 'Développement SAP ERP. Équipe digitale Workplace (Facebook pro). Organisation hackathon européen. Webservices SAP HANA (XSJS).',
      },
    },
  },

  // Education Section
  education: {
    title: 'Formation',
    school42Mindset: {
      title: 'Le Mindset 42',
      description: 'L\'École 42 est une formation révolutionnaire sans professeurs ni cours traditionnels. L\'apprentissage se fait par projets (peer-to-peer), où les étudiants apprennent en résolvant des problèmes concrets et en s\'entraidant.',
      values: {
        autonomy: 'Autonomie complète',
        peerLearning: 'Apprentissage pair-à-pair',
        problemSolving: 'Résolution de problèmes',
        noLimits: 'Pas de limites',
      },
    },
    schools: {
      school42: {
        name: 'École 42',
        degree: 'Formation développeur',
        period: '2014 - 2017',
        description: 'Formation intensive sans professeurs basée sur le peer-learning et les projets. Mindset : autonomie, débrouillardise, et capacité à tout apprendre.',
      },
      iutMetz: {
        name: 'IUT de Metz',
        degree: 'DUT & Licence',
        period: '2011 - 2013',
      },
      iutEpinal: {
        name: 'IUT Hubert Curien - Épinal',
        degree: 'DUT',
        period: '2008 - 2009',
      },
      ufaNancy: {
        name: 'UFA Loritz Nancy',
        degree: 'BTS',
        period: '2006 - 2008',
      },
    },
  },

  // Skills Section
  skills: {
    title: 'Compétences',
    categories: {
      sap: 'SAP & ABAP',
      ai: 'IA & LLM',
      frontend: 'Frontend',
      backend: 'Backend',
      automation: 'Automatisation',
      tools: 'Outils & DevOps',
    },
  },

  // Projects Section
  projects: {
    title: 'Projets',
    viewSite: 'Voir le site',
    viewCode: 'Voir le code',
    categories: {
      all: 'Tous',
      web: 'Web',
      '42': 'École 42',
      personal: 'Personnel',
    },
    list: {
      ebmc: {
        title: 'EBMC Group',
        description: 'Site corporate pour le groupe de consulting IT spécialisé SAP. Application React moderne avec Vite et Tailwind CSS.',
      },
      amap: {
        title: 'Les Paniers de Léopold',
        description: 'Site web pour une AMAP locale. React, Tailwind CSS, hébergé sur NAS Synology avec Cloudflare.',
      },
      homeassistant: {
        title: 'Home Assistant Server',
        description: 'Serveur domotique personnel gérant l\'automatisation complète de la maison.',
      },
      suno: {
        title: 'Suno AI Music',
        description: 'Création musicale assistée par IA. Un hobby créatif explorant le prompt engineering appliqué à la génération de musique.',
      },
      portfolio: {
        title: 'Portfolio Personnel',
        description: 'Ce site ! React, Tailwind CSS, Framer Motion, hébergé sur NAS UGreen.',
      },
      raytracing: {
        title: 'RT - Moteur Raytracing',
        description: 'Moteur de rendu 3D en C développé en équipe de 4 à l\'École 42. Le raytracing simule le comportement réel de la lumière.',
      },
      libasm: {
        title: 'Lib_ASM - Librairie Assembleur',
        description: 'Librairie de fonctions bas niveau écrites en assembleur x86-64. Réimplémentation de fonctions standards.',
      },
    },
  },

  // Contact Section
  contact: {
    title: 'Contact',
    subtitle: 'Parlons de votre projet',
    email: 'Email',
    phone: 'Téléphone',
    linkedin: 'LinkedIn',
    location: 'Localisation',
    form: {
      name: 'Nom',
      email: 'Email',
      message: 'Message',
      send: 'Envoyer',
      sending: 'Envoi...',
      success: 'Message envoyé !',
      error: 'Erreur lors de l\'envoi',
    },
  },

  // Volunteer Section
  volunteer: {
    title: 'Bénévolat',
    builder: {
      title: 'Constructeur bénévole',
      org: 'Ville de Blainville sur l\'eau',
      period: 'Juillet 2005',
      description: 'Construction d\'un centre de formation pour médecins à Diofior, Sénégal. Mission humanitaire.',
    },
  },

  // Recommendation Section
  recommendation: {
    title: 'Recommandations',
    quote: 'Boris a développé une spécification technique sur SAP afin de répondre aux contraintes de l\'agence fiscale espagnole concernant le SII.',
    author: 'Mathis Potier',
  },

  // Footer
  footer: {
    rights: 'Tous droits réservés',
    madeWith: 'Fait avec',
    and: 'et',
  },

  // Admin
  admin: {
    login: 'Administration',
    logout: 'Déconnexion',
    welcome: 'Bienvenue',
    updateCV: 'Mettre à jour le CV',
    upload: 'Téléverser',
  },

  // Languages
  languages: {
    fr: 'Français',
    en: 'English',
  },
} as const;
