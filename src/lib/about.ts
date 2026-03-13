import type { IconName } from '@/lib/icon-map';

export type AboutFeature = {
  title: string;
  description: string;
  icon: IconName;
};

export type AboutSection = {
  title: string;
  paragraphs: string[];
};

export type AboutHero = {
  eyebrow: string;
  title: string;
  subtitle: string;
  description: string;
};

export type AboutCta = {
  title: string;
  description: string;
  primaryLabel: string;
  primaryHref: string;
  primaryIcon: IconName;
  secondaryLabel: string;
  secondaryHref: string;
  secondaryIcon: IconName;
};

export type AboutContent = {
  metaTitle: string;
  metaDescription: string;
  homeTeaser: {
    title: string;
    paragraphs: string[];
    ctaLabel: string;
    ctaHref: string;
    features: AboutFeature[];
  };
  page: {
    hero: AboutHero;
    sections: {
      studio: AboutSection;
      method: AboutSection;
      clientExpectations: {
        title: string;
        items: AboutFeature[];
      };
      caseBasedSupport: AboutSection;
    };
    cta: AboutCta;
  };
};

export const aboutContent: AboutContent = {
  metaTitle: 'Chi Siamo',
  metaDescription:
    "Scopri l'approccio dello Studio Legale Zanchi: rigore, chiarezza e attenzione al caso concreto per privati, professionisti e imprese a Milano.",
  homeTeaser: {
    title: 'Chi siamo',
    paragraphs: [
      'Studio Legale Zanchi assiste privati, professionisti e imprese con un approccio fondato su ascolto, chiarezza e preparazione accurata. Ogni questione viene affrontata partendo dai fatti, dai documenti e dagli obiettivi concreti del cliente, per individuare la strategia piu adatta e sostenibile.',
      "Crediamo che un'assistenza legale efficace non dipenda solo dalla competenza tecnica, ma anche dalla capacita di spiegare bene opzioni, tempi e implicazioni pratiche. Per questo lavoriamo con attenzione alla qualita del rapporto professionale, oltre che alla qualita del caso.",
    ],
    ctaLabel: 'Scopri di piu sullo studio',
    ctaHref: '/chi-siamo',
    features: [
      {
        title: 'Analisi chiara',
        description:
          'Ogni incarico parte da una lettura attenta del problema, dei documenti e dei margini reali di tutela.',
        icon: 'Scale',
      },
      {
        title: 'Strategia proporzionata',
        description:
          'Privilegiamo soluzioni ben impostate e sostenibili, in sede stragiudiziale o giudiziale secondo il caso concreto.',
        icon: 'ClipboardCheck',
      },
      {
        title: 'Rapporto trasparente',
        description:
          'Il cliente viene accompagnato con comunicazione chiara, aggiornamenti sul lavoro svolto e attenzione agli aspetti pratici della scelta legale.',
        icon: 'MessageSquareText',
      },
    ],
  },
  page: {
    hero: {
      eyebrow: 'Studio Legale Zanchi',
      title: 'Chi siamo',
      subtitle: 'Esperienza e competenza al tuo servizio',
      description:
        'Studio Legale Zanchi offre assistenza legale a Milano con un approccio fondato su rigore, chiarezza e attenzione al caso concreto. Assistiamo privati, professionisti e imprese costruendo ogni strategia a partire dai fatti, dai documenti e dagli obiettivi reali del cliente.',
    },
    sections: {
      studio: {
        title: 'Lo studio',
        paragraphs: [
          "Studio Legale Zanchi nasce con l'obiettivo di offrire un'assistenza legale seria, accessibile e costruita sulle reali esigenze del cliente. Lavoriamo con attenzione alla qualita tecnica della questione, ma anche alla chiarezza del rapporto professionale, perche comprendere bene un problema giuridico e gia parte della tutela.",
          "Lo studio assiste privati, professionisti e imprese in diversi ambiti del diritto civile, affiancando il cliente sia nella consulenza e nella fase stragiudiziale, sia nell'assistenza in giudizio quando il contenzioso diventa necessario. L'obiettivo non e complicare il problema, ma affrontarlo con metodo, precisione e senso pratico.",
        ],
      },
      method: {
        title: 'Come lavoriamo',
        paragraphs: [
          'Ogni incarico parte da un principio semplice: prima capire bene, poi scegliere come agire. Analizziamo i fatti, leggiamo i documenti, valutiamo i rischi e individuiamo il percorso piu adatto, privilegiando quando possibile soluzioni chiare, sostenibili e ben impostate anche fuori dal giudizio.',
          "Quando il contenzioso e necessario, lo affrontiamo con la stessa logica: preparazione accurata, obiettivi realistici e aggiornamento costante del cliente. Crediamo che la qualita dell'assistenza non dipenda solo dalla competenza tecnica, ma anche dalla capacita di spiegare bene opzioni, tempi e implicazioni concrete.",
        ],
      },
      clientExpectations: {
        title: 'Cosa puo aspettarsi chi si rivolge allo studio',
        items: [
          {
            title: 'Ascolto e analisi accurata',
            description:
              'Ogni caso viene esaminato con attenzione ai fatti, ai documenti e agli obiettivi concreti del cliente, evitando letture superficiali o strategie standardizzate.',
            icon: 'Scale',
          },
          {
            title: 'Comunicazione chiara',
            description:
              'Riteniamo essenziale spiegare in modo comprensibile le opzioni disponibili, i possibili rischi, i tempi prevedibili e il significato pratico delle scelte da compiere.',
            icon: 'MessageSquareText',
          },
          {
            title: 'Strategie proporzionate',
            description:
              'Non ogni questione richiede la stessa risposta. Per questo costruiamo il percorso piu adatto alla situazione concreta, valutando con serieta quando trattare, quando diffidare e quando agire in giudizio.',
            icon: 'ClipboardCheck',
          },
          {
            title: 'Rapporto professionale trasparente',
            description:
              'Il cliente viene accompagnato nel lavoro con ordine, aggiornamenti e attenzione agli aspetti pratici del caso, cosi da poter prendere decisioni piu consapevoli.',
            icon: 'ShieldCheck',
          },
        ],
      },
      caseBasedSupport: {
        title: "Un'assistenza costruita sul caso concreto",
        paragraphs: [
          "Lo studio opera in diversi ambiti del diritto civile, dalla consulenza legale all'assistenza stragiudiziale, fino alla difesa in giudizio quando necessaria. Ogni area di intervento viene affrontata con lo stesso metodo: analisi accurata, chiarezza nel rapporto con il cliente e ricerca della soluzione piu efficace in relazione al caso specifico.",
          'Per una panoramica completa dei servizi e delle relative aree di intervento, e possibile consultare la sezione dedicata.',
        ],
      },
    },
    cta: {
      title: 'Vuole conoscere meglio come possiamo aiutarla?',
      description:
        'Se desidera approfondire i servizi offerti dallo studio o richiedere un primo contatto, puo consultare la sezione dedicata oppure contattarci direttamente.',
      primaryLabel: 'Scopri i servizi',
      primaryHref: '/servizi',
      primaryIcon: 'Briefcase',
      secondaryLabel: 'Contatta lo studio',
      secondaryHref: '/contatti',
      secondaryIcon: 'Send',
    },
  },
};
