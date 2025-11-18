import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Language = 'en' | 'fr';

interface Translations {
  [key: string]: any;
}

const translations: Record<Language, Translations> = {
  en: {
    nav: {
      services: 'Services',
      benefits: 'Benefits',
      process: 'Process',
      contact: 'Contact',
      getStarted: 'Get Started'
    },
    hero: {
      title: 'Launch Your US LLC',
      subtitle: 'in 48 Hours',
      description: 'Fast, reliable, and hassle-free LLC formation for entrepreneurs worldwide. Start your American business today.',
      startButton: 'Start Your LLC',
      learnMore: 'Learn More',
      stats: {
        llcs: 'LLCs Formed',
        countries: 'Countries',
        time: 'Average Time',
        success: 'Success Rate'
      }
    },
    services: {
      title: 'Why Choose OGS Solution?',
      subtitle: 'We handle everything so you can focus on building your business',
      fast: {
        title: 'Lightning Fast',
        description: 'Complete LLC formation in just 48 hours with our streamlined process'
      },
      compliant: {
        title: '100% Compliant',
        description: 'Full legal compliance with US regulations and state requirements'
      },
      global: {
        title: 'Global Access',
        description: 'Serve clients from anywhere in the world with no US presence needed'
      },
      package: {
        title: 'Complete Package',
        description: 'EIN, bank account support, registered agent included'
      }
    },
    benefits: {
      title: 'Everything You Need to Succeed',
      description: 'Our comprehensive LLC package includes all essential services to launch and maintain your US business.',
      items: [
        'Complete LLC registration and filing',
        'Federal EIN (Tax ID) number',
        'Registered agent service (1 year included)',
        'Operating agreement template',
        'US business address',
        'Bank account setup assistance',
        'Ongoing compliance support',
        '24/7 customer support'
      ],
      price: '$499',
      priceSubtitle: 'One-time fee',
      features: [
        'No hidden fees',
        'Money-back guarantee',
        'Free 1-year registered agent'
      ],
      cta: 'Get Started Now'
    },
    process: {
      title: 'Simple 3-Step Process',
      subtitle: 'From application to approval in just 48 hours',
      steps: [
        {
          title: 'Fill Application',
          description: 'Complete our simple online form with your business details in just 10 minutes'
        },
        {
          title: 'We Process',
          description: 'Our experts handle all paperwork and filing with the state'
        },
        {
          title: 'You Launch',
          description: 'Receive your LLC documents and start doing business in the US'
        }
      ]
    },
    contact: {
      title: 'Ready to Start Your US Business?',
      subtitle: 'Fill out the form below and our team will contact you within 24 hours'
    },
    form: {
      backToHome: 'Back to Home',
      formTitle: 'LLC Formation Application',
      formSubtitle: 'Fill out the form below to start your LLC formation process',
      companyName: 'Company Name',
      companyNamePlaceholder: 'Your Company LLC',
      ownerName: 'Owner Full Name',
      ownerNamePlaceholder: 'John Doe',
      email: 'Email Address',
      emailPlaceholder: 'john@example.com',
      phone: 'Phone Number',
      phonePlaceholder: '+1 (555) 123-4567',
      address: 'Street Address',
      addressPlaceholder: '123 Main Street',
      city: 'City',
      cityPlaceholder: 'New York',
      state: 'State/Province',
      statePlaceholder: 'NY',
      zipCode: 'ZIP/Postal Code',
      zipCodePlaceholder: '10001',
      country: 'Country',
      countryPlaceholder: 'United States',
      businessType: 'Type of Business',
      selectOption: 'Select an option',
      ecommerce: 'E-commerce',
      consulting: 'Consulting',
      technology: 'Technology',
      realEstate: 'Real Estate',
      other: 'Other',
      members: 'Number of Members',
      ein: 'Need EIN (Tax ID)?',
      bankAccount: 'Need Bank Account Assistance?',
      yes: 'Yes',
      no: 'No',
      additionalInfo: 'Additional Information',
      additionalInfoPlaceholder: 'Tell us more about your business needs...',
      submit: 'Submit Application',
      submitting: 'Submitting...',
      successMessage: 'Thank you! Your application has been submitted successfully. We will contact you within 24 hours.',
      errorMessage: 'Sorry, there was an error submitting your application. Please try again.'
    },
    chat: {
      title: 'AI Assistant',
      placeholder: 'Ask me anything about LLC formation...',
      send: 'Send'
    }
  },
  fr: {
    nav: {
      services: 'Services',
      benefits: 'Avantages',
      process: 'Processus',
      contact: 'Contact',
      getStarted: 'Commencer'
    },
    hero: {
      title: 'Lancez votre LLC aux États-Unis',
      subtitle: 'en 48 heures',
      description: 'Formation de LLC rapide, fiable et sans tracas pour les entrepreneurs du monde entier. Démarrez votre entreprise américaine aujourd\'hui.',
      startButton: 'Démarrer votre LLC',
      learnMore: 'En savoir plus',
      stats: {
        llcs: 'LLC créées',
        countries: 'Pays',
        time: 'Temps moyen',
        success: 'Taux de réussite'
      }
    },
    services: {
      title: 'Pourquoi choisir OGS Solution?',
      subtitle: 'Nous gérons tout pour que vous puissiez vous concentrer sur votre entreprise',
      fast: {
        title: 'Ultra rapide',
        description: 'Formation complète de LLC en seulement 48 heures avec notre processus simplifié'
      },
      compliant: {
        title: '100% conforme',
        description: 'Conformité légale complète avec les réglementations américaines et étatiques'
      },
      global: {
        title: 'Accès mondial',
        description: 'Servez des clients partout dans le monde sans présence aux États-Unis'
      },
      package: {
        title: 'Package complet',
        description: 'EIN, assistance compte bancaire, agent enregistré inclus'
      }
    },
    benefits: {
      title: 'Tout ce dont vous avez besoin pour réussir',
      description: 'Notre package LLC complet inclut tous les services essentiels pour lancer et maintenir votre entreprise américaine.',
      items: [
        'Enregistrement et dépôt complets de LLC',
        'Numéro EIN fédéral (ID fiscal)',
        'Service d\'agent enregistré (1 an inclus)',
        'Modèle d\'accord d\'exploitation',
        'Adresse commerciale américaine',
        'Assistance pour l\'ouverture de compte bancaire',
        'Support de conformité continue',
        'Support client 24/7'
      ],
      price: '499$',
      priceSubtitle: 'Frais uniques',
      features: [
        'Pas de frais cachés',
        'Garantie de remboursement',
        'Agent enregistré gratuit pendant 1 an'
      ],
      cta: 'Commencer maintenant'
    },
    process: {
      title: 'Processus simple en 3 étapes',
      subtitle: 'De la candidature à l\'approbation en seulement 48 heures',
      steps: [
        {
          title: 'Remplir le formulaire',
          description: 'Complétez notre formulaire en ligne simple avec les détails de votre entreprise en seulement 10 minutes'
        },
        {
          title: 'Nous traitons',
          description: 'Nos experts gèrent tous les documents et le dépôt auprès de l\'État'
        },
        {
          title: 'Vous lancez',
          description: 'Recevez vos documents LLC et commencez à faire des affaires aux États-Unis'
        }
      ]
    },
    contact: {
      title: 'Prêt à démarrer votre entreprise américaine?',
      subtitle: 'Remplissez le formulaire ci-dessous et notre équipe vous contactera dans les 24 heures'
    },
    form: {
      backToHome: 'Retour à l\'accueil',
      formTitle: 'Demande de formation de LLC',
      formSubtitle: 'Remplissez le formulaire ci-dessous pour démarrer votre processus de formation de LLC',
      companyName: 'Nom de l\'entreprise',
      companyNamePlaceholder: 'Votre Entreprise LLC',
      ownerName: 'Nom complet du propriétaire',
      ownerNamePlaceholder: 'Jean Dupont',
      email: 'Adresse e-mail',
      emailPlaceholder: 'jean@exemple.com',
      phone: 'Numéro de téléphone',
      phonePlaceholder: '+33 1 23 45 67 89',
      address: 'Adresse',
      addressPlaceholder: '123 Rue Principale',
      city: 'Ville',
      cityPlaceholder: 'Paris',
      state: 'État/Province',
      statePlaceholder: 'Île-de-France',
      zipCode: 'Code postal',
      zipCodePlaceholder: '75001',
      country: 'Pays',
      countryPlaceholder: 'France',
      businessType: 'Type d\'entreprise',
      selectOption: 'Sélectionner une option',
      ecommerce: 'E-commerce',
      consulting: 'Conseil',
      technology: 'Technologie',
      realEstate: 'Immobilier',
      other: 'Autre',
      members: 'Nombre de membres',
      ein: 'Besoin d\'un EIN (ID fiscal)?',
      bankAccount: 'Besoin d\'aide pour un compte bancaire?',
      yes: 'Oui',
      no: 'Non',
      additionalInfo: 'Informations supplémentaires',
      additionalInfoPlaceholder: 'Parlez-nous de vos besoins commerciaux...',
      submit: 'Soumettre la demande',
      submitting: 'Envoi en cours...',
      successMessage: 'Merci! Votre demande a été soumise avec succès. Nous vous contacterons dans les 24 heures.',
      errorMessage: 'Désolé, une erreur s\'est produite lors de la soumission de votre demande. Veuillez réessayer.'
    },
    chat: {
      title: 'Assistant IA',
      placeholder: 'Posez-moi des questions sur la formation de LLC...',
      send: 'Envoyer'
    }
  }
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Translations;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('en');

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') as Language | null;
    if (savedLanguage) {
      setLanguage(savedLanguage);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t: translations[language] }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
