export type Service = {
  id: string;
  slug: string;
  title: string;
  icon: string;
  shortDescription: string;
  longDescription: string;
  expertise: string[];
  metaTitle: string;
  metaDescription: string;
};

export const servizi: Service[] = [
  {
    id: 'consulenza-legale',
    slug: 'consulenza-legale',
    title: 'Consulenza Legale',
    icon: 'Scale',
    shortDescription:
      'Forniamo consulenza legale completa per privati e aziende, analizzando ogni situazione con attenzione per individuare la strategia più efficace.',
    longDescription: `Lo Studio Legale Zanchi offre consulenza legale professionale a privati, professionisti e aziende a Milano e in tutta la Lombardia. Ogni situazione giuridica è unica: per questo ascoltiamo con attenzione il cliente prima di proporre qualsiasi soluzione.

Il nostro approccio si articola in tre fasi: analisi approfondita del problema, valutazione delle opzioni disponibili e definizione della strategia più efficace per tutelare i vostri interessi. Che si tratti di una controversia contrattuale, un problema condominiale o una questione ereditaria, forniamo pareri legali scritti chiari e comprensibili.

Lavoriamo sia in fase stragiudiziale — cercando soluzioni rapide e meno costose — sia, quando necessario, portando la causa davanti al giudice competente. La trasparenza è un nostro valore fondamentale: il cliente è sempre informato sullo stato del suo caso e sui costi previsti.`,
    expertise: [
      'Analisi preventiva dei rischi legali',
      'Pareri legali scritti',
      'Consulenza contrattuale',
      'Assistenza stragiudiziale',
      'Mediazione e negoziazione',
    ],
    metaTitle: 'Consulenza Legale Milano | Studio Legale Zanchi',
    metaDescription:
      'Consulenza legale professionale a Milano per privati e aziende. Analisi dei rischi, pareri scritti e assistenza contrattuale. Studio Legale Zanchi — fondato nel 2020.',
  },
  {
    id: 'assistenza-in-giudizio',
    slug: 'assistenza-in-giudizio',
    title: 'Assistenza in Giudizio',
    icon: 'Gavel',
    shortDescription:
      'Rappresentiamo i nostri clienti in tutte le fasi del processo, garantendo una difesa efficace e professionale in ogni grado di giudizio.',
    longDescription: `Quando la via stragiudiziale non è sufficiente, lo Studio Legale Zanchi rappresenta i propri clienti davanti a tutti i tribunali competenti, dal Giudice di Pace alla Corte d'Appello, in ogni grado di giudizio.

La preparazione di ogni causa è meticolosa: studiamo la giurisprudenza più recente, raccogliamo le prove necessarie e costruiamo una strategia processuale solida. Il cliente è accompagnato in ogni fase — dall'atto introduttivo all'udienza, dalla trattativa pre-dibattimentale alla sentenza definitiva.

Operiamo principalmente in ambito civile, ma affianchiamo i clienti anche in procedimenti penali e amministrativi quando gli interessi da tutelare lo richiedono. La nostra priorità è sempre ottenere il miglior risultato possibile nel minor tempo e con il minor costo per il cliente.`,
    expertise: [
      'Procedimenti civili',
      'Procedimenti penali',
      'Procedimenti amministrativi',
      'Ricorsi e impugnazioni',
      'Esecuzioni forzate',
    ],
    metaTitle: 'Assistenza in Giudizio Milano | Studio Legale Zanchi',
    metaDescription:
      'Rappresentanza legale in giudizio a Milano per cause civili, penali e amministrative. Difesa professionale in ogni grado di giudizio. Studio Legale Zanchi.',
  },
  {
    id: 'diritto-di-famiglia',
    slug: 'diritto-di-famiglia',
    title: 'Diritto di Famiglia',
    icon: 'Users',
    shortDescription:
      'Assistiamo i nostri clienti nelle questioni familiari con sensibilità e professionalità, tutelando sempre gli interessi di tutte le parti coinvolte.',
    longDescription: `Le questioni familiari richiedono un approccio che vada oltre la semplice competenza giuridica: servono ascolto, empatia e la capacità di gestire situazioni emotivamente complesse con equilibrio e rispetto per tutte le parti coinvolte.

Lo Studio Legale Zanchi assiste privati e famiglie in tutte le fasi delle controversie familiari: dalla separazione consensuale al divorzio contenzioso, dalle questioni sull'affidamento dei figli alla tutela degli anziani. Lavoriamo per trovare soluzioni che minimizzino il conflitto e proteggano soprattutto i soggetti più vulnerabili, in particolare i minori.

In materia successoria, assistiamo i clienti nella pianificazione ereditaria, nella redazione di testamenti e nella gestione delle controversie tra eredi. Il nostro obiettivo è sempre preservare le relazioni familiari ove possibile, ricorrendo al contenzioso solo quando strettamente necessario.`,
    expertise: [
      'Separazioni e divorzi',
      'Affidamento minori',
      'Successioni e testamenti',
      'Tutela e curatela',
      'Assegno di mantenimento',
    ],
    metaTitle: 'Avvocato Diritto di Famiglia Milano | Studio Legale Zanchi',
    metaDescription:
      'Assistenza legale per separazioni, divorzi, affidamento minori e successioni a Milano. Approccio empatico e professionale. Studio Legale Zanchi.',
  },
  {
    id: 'diritto-del-lavoro',
    slug: 'diritto-del-lavoro',
    title: 'Diritto del Lavoro',
    icon: 'Briefcase',
    shortDescription:
      'Offriamo assistenza completa in materia di diritto del lavoro, sia per i lavoratori che per le aziende, in ogni fase del rapporto lavorativo.',
    longDescription: `Il diritto del lavoro è uno degli ambiti più dinamici e in continua evoluzione del sistema giuridico italiano. Lo Studio Legale Zanchi assiste sia lavoratori dipendenti che aziende e datori di lavoro, garantendo competenza aggiornata e strategie efficaci per ogni tipo di controversia lavorativa.

Per i lavoratori: tuteliamo i diritti in caso di licenziamento illegittimo, mancato pagamento di stipendi o TFR, mobbing, discriminazione e infortuni sul lavoro. Affianchiamo il lavoratore dalla fase stragiudiziale fino all'eventuale ricorso al Tribunale del Lavoro.

Per le aziende: assistiamo nella redazione di contratti di lavoro conformi alla normativa vigente, nella gestione di procedimenti disciplinari, nelle ristrutturazioni aziendali e nei rapporti con le rappresentanze sindacali. Prevenire le controversie è sempre più conveniente che gestirle: per questo offriamo anche consulenza preventiva in ambito HR e contrattuale.`,
    expertise: [
      'Controversie lavorative',
      'Contratti di lavoro',
      'Licenziamenti e dimissioni',
      'Mobbing e discriminazione',
      'Consulenza HR per aziende',
    ],
    metaTitle: 'Avvocato Diritto del Lavoro Milano | Studio Legale Zanchi',
    metaDescription:
      'Assistenza legale per lavoratori e aziende a Milano. Licenziamenti, contratti, controversie lavorative e consulenza HR. Studio Legale Zanchi.',
  },
  {
    id: 'diritto-immobiliare',
    slug: 'diritto-immobiliare',
    title: 'Diritto Immobiliare',
    icon: 'Building2',
    shortDescription:
      'Assistiamo i nostri clienti in tutte le questioni relative agli immobili, dalla compravendita alle controversie condominiali.',
    longDescription: `Il mercato immobiliare milanese è tra i più complessi e competitivi d'Italia. Lo Studio Legale Zanchi affianca privati, investitori e aziende in tutte le operazioni immobiliari, garantendo sicurezza giuridica in ogni fase della transazione o della controversia.

In materia di compravendita, verifichiamo la conformità urbanistica e catastale dell'immobile, analizziamo i contratti preliminari, assistiamo nelle trattative e nel rogito notarile. Il nostro obiettivo è proteggere il cliente da vizi occulti, ipoteche nascoste o irregolarità che potrebbero compromettere l'investimento.

Per le locazioni, redattiamo e revisioniamo contratti di affitto sia a uso abitativo che commerciale, gestiamo le procedure di sfratto per morosità o per finita locazione e assistiamo in caso di controversie tra locatore e conduttore. In ambito condominiale, rappresentiamo sia i condomini che i condomini amministratori nelle dispute su delibere assembleari, ripartizione delle spese e lavori straordinari.`,
    expertise: [
      'Compravendite immobiliari',
      'Locazioni abitative e commerciali',
      'Controversie condominiali',
      'Due diligence immobiliare',
      'Sfratti e rilascio immobili',
    ],
    metaTitle: 'Avvocato Diritto Immobiliare Milano | Studio Legale Zanchi',
    metaDescription:
      'Assistenza legale per compravendite, locazioni e controversie condominiali a Milano. Due diligence e tutela immobiliare. Studio Legale Zanchi.',
  },
  {
    id: 'recupero-crediti',
    slug: 'recupero-crediti',
    title: 'Recupero Crediti',
    icon: 'ShieldCheck',
    shortDescription:
      'Offriamo un servizio completo di recupero crediti, dalla fase stragiudiziale a quella giudiziale, con un approccio efficace e tempestivo.',
    longDescription: `I crediti insoluti rappresentano un problema serio per imprese, professionisti e privati. Lo Studio Legale Zanchi offre un servizio strutturato e rapido per il recupero di crediti commerciali e civili, con un approccio che privilegia la soluzione stragiudiziale quando possibile, senza rinunciare all'azione giudiziaria quando necessario.

La fase stragiudiziale inizia con una diffida formale al debitore: nella maggior parte dei casi questo passaggio è sufficiente per ottenere il pagamento senza ricorrere al tribunale. Quando il debitore non risponde o non paga, procediamo con il ricorso per decreto ingiuntivo — uno strumento rapido ed efficace per ottenere un titolo esecutivo.

In caso di mancato pagamento anche dopo il decreto, avviamo le procedure esecutive: pignoramento di beni mobili, immobili o crediti (stipendio, conto corrente). Assistiamo anche nella gestione dei crediti in procedure concorsuali (fallimenti, concordati) e nella tutela dei creditori in sede di ristrutturazione del debito.`,
    expertise: [
      'Diffide di pagamento',
      'Decreti ingiuntivi',
      'Procedure esecutive',
      'Pignoramenti',
      'Crediti in procedure concorsuali',
    ],
    metaTitle: 'Recupero Crediti Milano | Studio Legale Zanchi',
    metaDescription:
      'Recupero crediti professionale a Milano per imprese e privati. Diffide, decreti ingiuntivi e procedure esecutive rapide ed efficaci. Studio Legale Zanchi.',
  },
];
