export type ContactInfoBlock = {
  title: string;
  description: string;
  actionLabel: string;
  actionHref: string;
};

export type OfficeHour = {
  label: string;
  value: string;
};

export type ContactContent = {
  metaTitle: string;
  metaDescription: string;
  introTitle: string;
  introDescription: string;
  formTitle: string;
  formDescription: string;
  formSubmitLabel: string;
  formPrivacyNote: string;
  formSuccessMessage: string;
  serviceHelperText: string;
  cards: {
    phone: ContactInfoBlock;
    email: ContactInfoBlock;
    address: ContactInfoBlock;
  };
  map: {
    title: string;
    embedUrl: string;
    mapsUrl: string;
    fallbackTitle: string;
    fallbackDescription: string[];
    openMapsLabel: string;
    manageCookiesLabel: string;
  };
  officeHours: {
    title: string;
    description: string;
    hours: OfficeHour[];
  };
};

export const contactContent: ContactContent = {
  metaTitle: 'Contatti',
  metaDescription:
    'Contatti dello Studio Legale Zanchi a Milano. Telefono, email, sede, orari e modulo per inviare una richiesta strutturata.',
  introTitle: 'Contatti',
  introDescription:
    'Se desidera richiedere una consulenza, fissare un appuntamento o ricevere un primo orientamento, può contattare lo studio direttamente oppure inviare una richiesta tramite il modulo dedicato.',
  formTitle: 'Invii la sua richiesta',
  formDescription:
    'Se preferisce, può compilare il modulo qui sotto. Una richiesta chiara ci aiuta a inquadrare meglio la situazione e a orientare il primo contatto in modo più utile.',
  formSubmitLabel: 'Invia richiesta',
  formPrivacyNote:
    'I dati inviati saranno utilizzati esclusivamente per ricontattarla in merito alla sua richiesta.',
  formSuccessMessage:
    'La richiesta è stata inviata correttamente. Lo studio la ricontatterà appena possibile.',
  serviceHelperText:
    "Se conosce già l'ambito del problema, selezionarlo ci aiuta a indirizzare meglio la richiesta.",
  cards: {
    phone: {
      title: 'Telefono',
      description:
        'Per un contatto rapido o per informazioni immediate sugli appuntamenti.',
      actionLabel: '+39 02 36504555',
      actionHref: 'tel:+390236504555',
    },
    email: {
      title: 'Email',
      description:
        'Per richieste scritte, invio documenti o prime informazioni sul caso.',
      actionLabel: 'info@studiolegalezanchi.com',
      actionHref: 'mailto:info@studiolegalezanchi.com',
    },
    address: {
      title: 'Sede',
      description:
        "Per raggiungere lo studio o aprire l'indirizzo nel navigatore.",
      actionLabel: 'Via Giuseppe Ripamonti 114, 20141 Milano',
      actionHref:
        'https://maps.google.com/?q=Via+Giuseppe+Ripamonti+114+Milano+20141',
    },
  },
  map: {
    title: 'Dove siamo',
    embedUrl:
      'https://www.google.com/maps?q=Via+Giuseppe+Ripamonti+114,+20141+Milano&z=15&output=embed',
    mapsUrl:
      'https://maps.google.com/?q=Via+Giuseppe+Ripamonti+114+Milano+20141',
    fallbackTitle: 'Mappa non disponibile',
    fallbackDescription: [
      'La mappa non è visibile perché non sono stati accettati i cookie di terze parti necessari per il contenuto incorporato.',
      "Può attivarli in Gestisci Cookie oppure aprire direttamente l'indirizzo su Google Maps.",
    ],
    openMapsLabel: "Apri l'indirizzo su Google Maps",
    manageCookiesLabel: 'Gestisci Cookie',
  },
  officeHours: {
    title: 'Orari di contatto',
    description:
      'Per richieste via email o modulo può contattarci in qualsiasi momento. Le richieste saranno evase negli orari di studio.',
    hours: [
      { label: 'Lunedi - Venerdi', value: '09:00 - 13:00' },
      { label: 'Lunedi - Venerdi', value: '15:00 - 19:30' },
    ],
  },
};
