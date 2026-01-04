export const translations = {
  en: {
    // Navigation
    nav: {
      home: 'Home',
      section1: 'Section 1',
      section2: 'Section 2',
      section3: 'Section 3',
      section4: 'Section 4',
      section5: 'Section 5',
      contact: 'Contact',
    },
    // Home page
    home: {
      title: 'Doeltreffend',
      subtitle: 'KU Leuven Bachelor Ontwerp - Architecture Portfolio',
      exploreButton: 'Explore Sections',
      projectSectionsTitle: 'Project Sections',
      projectSectionsDescription: 'Navigate through our comprehensive architecture portfolio, organized into five distinct sections',
      aboutTitle: 'About This Project',
      aboutDescription1: 'This portfolio showcases our architectural journey through the KU Leuven Bachelor Ontwerp program. Each section represents a crucial phase in our design process, from initial concepts to final presentations.',
      aboutDescription2: 'Materials for each section are organized in the respective folders and will be displayed as you add content.',
      footer: '© 2026 Doeltreffend - KU Leuven Architecture Portfolio',
    },
    // Contact page
    contact: {
      title: 'Contact Us',
      subtitle: 'Get in touch with our team',
      ourTeam: 'Our Team',
      teamDescription: 'Meet the students who made this project possible',
      sendMessage: 'Send Us a Message',
      formDescription: 'Have a question or want to work together?',
      name: 'Name',
      email: 'Email',
      subject: 'Subject',
      message: 'Message',
      namePlaceholder: 'Your name',
      emailPlaceholder: 'your.email@example.com',
      subjectPlaceholder: 'What is this about?',
      messagePlaceholder: 'Tell us more...',
      sendButton: 'Send Message',
      sending: 'Sending...',
      successMessage: "Message sent successfully! We'll get back to you soon.",
      errorMessage: 'Failed to send message. Please try again.',
      genericError: 'An error occurred. Please try again later.',
    },
    // Section pages
    sections: {
      overview: 'Section Overview',
      backToHome: '← Back to Home',
      loading: 'Loading images...',
      noContent: 'No Content Yet',
      noContentDescription: 'Images will appear here once uploaded to S3.',
      viewFullSize: 'View Full Size →',
      errorLoading: 'Failed to load images. Please try again later.',
    },
    // Student roles
    roles: {
      projectLead: 'Project Lead',
      developer: 'Developer',
      designer: 'Designer',
      contentWriter: 'Content Writer',
      researcher: 'Researcher',
    },
  },
  nl: {
    // Navigatie
    nav: {
      home: 'Home',
      section1: 'Sectie 1',
      section2: 'Sectie 2',
      section3: 'Sectie 3',
      section4: 'Sectie 4',
      section5: 'Sectie 5',
      contact: 'Contact',
    },
    // Home pagina
    home: {
      title: 'Doeltreffend',
      subtitle: 'KU Leuven Bachelor Ontwerp - Architectuur Portfolio',
      exploreButton: 'Secties Verkennen',
      projectSectionsTitle: 'Project Secties',
      projectSectionsDescription: 'Navigeer door ons uitgebreid architectuurportfolio, georganiseerd in vijf verschillende secties',
      aboutTitle: 'Over Dit Project',
      aboutDescription1: 'Dit portfolio toont onze architecturale reis door het KU Leuven Bachelor Ontwerp programma. Elke sectie vertegenwoordigt een cruciale fase in ons ontwerpproces, van initiële concepten tot eindpresentaties.',
      aboutDescription2: 'Materialen voor elke sectie zijn georganiseerd in de respectievelijke mappen en worden weergegeven wanneer u inhoud toevoegt.',
      footer: '© 2026 Doeltreffend - KU Leuven Architectuur Portfolio',
    },
    // Contact pagina
    contact: {
      title: 'Contacteer Ons',
      subtitle: 'Neem contact op met ons team',
      ourTeam: 'Ons Team',
      teamDescription: 'Maak kennis met de studenten die dit project mogelijk maakten',
      sendMessage: 'Stuur Ons een Bericht',
      formDescription: 'Heeft u een vraag of wilt u samenwerken?',
      name: 'Naam',
      email: 'E-mail',
      subject: 'Onderwerp',
      message: 'Bericht',
      namePlaceholder: 'Uw naam',
      emailPlaceholder: 'uw.email@voorbeeld.be',
      subjectPlaceholder: 'Waarover gaat dit?',
      messagePlaceholder: 'Vertel ons meer...',
      sendButton: 'Bericht Versturen',
      sending: 'Verzenden...',
      successMessage: 'Bericht succesvol verzonden! We nemen binnenkort contact met u op.',
      errorMessage: 'Bericht verzenden mislukt. Probeer het opnieuw.',
      genericError: 'Er is een fout opgetreden. Probeer het later opnieuw.',
    },
    // Sectie pagina's
    sections: {
      overview: 'Sectie Overzicht',
      backToHome: '← Terug naar Home',
      loading: 'Afbeeldingen laden...',
      noContent: 'Nog Geen Inhoud',
      noContentDescription: 'Afbeeldingen verschijnen hier zodra ze naar S3 zijn geüpload.',
      viewFullSize: 'Volledige Grootte Bekijken →',
      errorLoading: 'Kan afbeeldingen niet laden. Probeer het later opnieuw.',
    },
    // Student rollen
    roles: {
      projectLead: 'Projectleider',
      developer: 'Ontwikkelaar',
      designer: 'Ontwerper',
      contentWriter: 'Contentontwikkelaar',
      researcher: 'Onderzoeker',
    },
  },
};

export type Language = 'en' | 'nl';
export type TranslationKeys = typeof translations.en;
