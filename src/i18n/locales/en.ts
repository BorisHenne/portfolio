export default {
  // Navigation
  nav: {
    home: 'Home',
    about: 'About',
    experience: 'Experience',
    skills: 'Skills',
    projects: 'Projects',
    contact: 'Contact',
  },

  // Hero Section
  hero: {
    greeting: 'Hello, I\'m',
    name: 'Boris HENNÉ',
    title: 'Senior SAP ABAP/Fiori Technical Consultant',
    subtitle: 'Full-Stack Developer & Automation Enthusiast',
    location: 'Thionville, Grand Est, France',
    cta: 'Contact me',
    cv: 'Download CV',
  },

  // About Section
  about: {
    title: 'About',
    intro: 'SAP Consultant with over 12 years of experience, combining technical ABAP expertise with modern Full-Stack development.',
    description: 'Passionate about technology, I develop innovative solutions combining SAP, React, and automation. My expertise covers ABAP-OO, Fiori UI5, CDS, OData, as well as modern web technologies.',
    interests: 'Passions',
    interestsList: {
      music: 'Music',
      domotics: 'Home Automation (Home Assistant)',
      ai: 'Artificial Intelligence',
      automation: 'Automation (Make.com, MCP)',
      dev: 'Development',
    },
    years: 'Years of experience',
    projects: 'Projects completed',
    certifications: 'Technologies mastered',
  },

  // Experience Section
  experience: {
    title: 'Experience',
    present: 'Present',
    showMore: 'Show more',
    showLess: 'Show less',
    positions: {
      ebmc: {
        title: 'SAP Technical Consultant',
        company: 'E.B.M. Consulting',
        period: 'Apr. 2023 - Present',
        location: 'Luxembourg',
        description: 'Advanced SAP development for VINCI Construction: Adobe LiveCycle, User Exits, Enhancement Points, ABAP-OO, BAPI, CDS, OData, IDoc.',
      },
      ekenz1: {
        title: 'SAP ABAP Consultant',
        company: 'e-Kenz',
        period: 'Mar. 2020 - Mar. 2023',
        location: 'Luxembourg',
        description: 'Design Patterns, SAP Fiori, WordPress, Frontend Best Practices, UI5, ABAP-OO, OOP, SAP ERP.',
      },
      chambreCommerce: {
        title: 'SAP Technical Consultant',
        company: 'Chamber of Commerce Luxembourg',
        period: 'Nov. 2022 - Mar. 2023',
        location: 'Luxembourg',
        description: 'Invoice digitization to state servers. JSON extraction from SD tables, FTP sending. Babelway integration.',
      },
      tresorerie: {
        title: 'SAP Technical Consultant',
        company: 'Luxembourg State Treasury',
        period: 'Jan. 2022 - Sep. 2022',
        location: 'Luxembourg',
        description: 'Management of dormant accounts and insurance. FI tables analysis, bug fixes. ABAP-OO development.',
      },
      cfl: {
        title: 'SAP Functional Consultant',
        company: 'CFL (Railways)',
        period: 'Jul. 2020 - Dec. 2020',
        location: 'Luxembourg',
        description: 'SAP authorizations and roles management. Role standardization project. CUA administration.',
      },
      reprise: {
        title: 'Web Developer',
        company: '1reprise.fr',
        period: 'Oct. 2019 - Nov. 2019',
        location: 'Nancy, France',
        description: 'Web development with Bootstrap.',
      },
      censio: {
        title: 'IT/UX Consultant',
        company: 'Censio',
        period: 'Apr. 2019 - May 2019',
        location: 'Paris, France',
        description: 'Smartforms development, Enhancement Points, ABAP inbound and outbound interfaces.',
      },
      etam: {
        title: 'SAP ABAP Consultant',
        company: 'Etam',
        period: 'Feb. 2018 - Mar. 2019',
        location: 'Paris, France',
        description: 'SAP ERP development.',
      },
      freelance: {
        title: 'Freelance Web Developer',
        company: 'Independent',
        period: 'Jul. 2017 - Jan. 2018',
        location: 'Paris, France',
        description: 'Web/Mobile development (Meteor, Angular 2, Ionic 2, ReactJS). SAP development (FI CO MM SD) with 2 years experience.',
      },
      danone: {
        title: 'Intern',
        company: 'Danone',
        period: 'Nov. 2016 - May 2017',
        location: 'Paris, France',
        description: 'SAP ERP development. Digital team Workplace (Facebook pro). European hackathon organization. SAP HANA webservices (XSJS).',
      },
    },
  },

  // Education Section
  education: {
    title: 'Education',
    school42Mindset: {
      title: 'The 42 Mindset',
      description: 'School 42 is a revolutionary training without teachers or traditional courses. Learning is project-based (peer-to-peer), where students learn by solving real problems and helping each other.',
      values: {
        autonomy: 'Complete autonomy',
        peerLearning: 'Peer-to-peer learning',
        problemSolving: 'Problem solving',
        noLimits: 'No limits',
      },
    },
    schools: {
      school42: {
        name: 'School 42',
        degree: 'Developer training',
        period: '2014 - 2017',
        description: 'Intensive training without teachers based on peer-learning and projects. Mindset: autonomy, resourcefulness, and ability to learn anything.',
      },
      iutMetz: {
        name: 'IUT de Metz',
        degree: 'HND & Bachelor\'s degree',
        period: '2011 - 2013',
      },
      iutEpinal: {
        name: 'IUT Hubert Curien - Épinal',
        degree: 'HND',
        period: '2008 - 2009',
      },
      ufaNancy: {
        name: 'UFA Loritz Nancy',
        degree: 'HNC',
        period: '2006 - 2008',
      },
    },
  },

  // Skills Section
  skills: {
    title: 'Skills',
    categories: {
      sap: 'SAP & ABAP',
      ai: 'AI & LLM',
      frontend: 'Frontend',
      backend: 'Backend',
      automation: 'Automation',
      tools: 'Tools & DevOps',
    },
  },

  // Projects Section
  projects: {
    title: 'Projects',
    viewSite: 'View site',
    viewCode: 'View code',
    categories: {
      all: 'All',
      web: 'Web',
      '42': 'School 42',
      personal: 'Personal',
    },
    list: {
      ebmc: {
        title: 'EBMC Group',
        description: 'Corporate website for the IT consulting group specialized in SAP. Modern React application with Vite and Tailwind CSS.',
      },
      amap: {
        title: 'Les Paniers de Léopold',
        description: 'Website for a local CSA (Community Supported Agriculture). React, Tailwind CSS, hosted on Synology NAS with Cloudflare.',
      },
      homeassistant: {
        title: 'Home Assistant Server',
        description: 'Personal home automation server managing complete house automation.',
      },
      suno: {
        title: 'Suno AI Music',
        description: 'AI-assisted music creation. A creative hobby exploring prompt engineering applied to music generation.',
      },
      portfolio: {
        title: 'Personal Portfolio',
        description: 'This website! React, Tailwind CSS, Framer Motion, hosted on UGreen NAS.',
      },
      raytracing: {
        title: 'RT - Raytracing Engine',
        description: 'A 3D rendering engine in C developed as a team of 4 at School 42. Raytracing simulates real light behavior.',
      },
      libasm: {
        title: 'Lib_ASM - Assembly Library',
        description: 'Low-level function library written in x86-64 assembly. Reimplementation of standard functions.',
      },
    },
  },

  // Contact Section
  contact: {
    title: 'Contact',
    subtitle: 'Let\'s talk about your project',
    email: 'Email',
    phone: 'Phone',
    linkedin: 'LinkedIn',
    location: 'Location',
    form: {
      name: 'Name',
      email: 'Email',
      message: 'Message',
      send: 'Send',
      sending: 'Sending...',
      success: 'Message sent!',
      error: 'Error sending message',
    },
  },

  // Volunteer Section
  volunteer: {
    title: 'Volunteering',
    builder: {
      title: 'Volunteer Builder',
      org: 'City of Blainville sur l\'eau',
      period: 'July 2005',
      description: 'Construction of a training center for doctors in Diofior, Senegal. Humanitarian mission.',
    },
  },

  // Recommendation Section
  recommendation: {
    title: 'Recommendations',
    quote: 'Boris developed a technical specification on SAP to meet the constraints of the Spanish tax agency regarding SII.',
    author: 'Mathis Potier',
  },

  // Footer
  footer: {
    rights: 'All rights reserved',
    madeWith: 'Made with',
    and: 'and',
  },

  // Admin
  admin: {
    login: 'Administration',
    logout: 'Logout',
    welcome: 'Welcome',
    updateCV: 'Update CV',
    upload: 'Upload',
  },

  // Languages
  languages: {
    fr: 'Français',
    en: 'English',
  },
} as const;
