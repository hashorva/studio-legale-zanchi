import type { IconName } from "@/lib/icon-map";
export type FAQ = {
  question: string;
  answer: string;
};

export type Expertise = {
  title: string;
  slug: string;
  description: string;
  faq?: FAQ[];
  icon?: IconName;
};

export type Service = {
  id: string;
  slug: string;
  title: string;
  icon: IconName;
  shortDescription: string;
  longDescription: string;
  expertise: Expertise[];
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
      {
        title: 'Analisi preventiva dei rischi legali',
        slug: 'analisi-preventiva-dei-rischi-legali',
        icon: 'SearchCheck',
        description: `L'analisi preventiva dei rischi legali serve a evitare decisioni costose prese con informazioni incomplete. Assistiamo privati, professionisti e imprese di Milano e della Lombardia nella verifica anticipata di contratti, operazioni immobiliari, rapporti commerciali, assetti patrimoniali e iniziative che potrebbero generare responsabilità, sanzioni o contenziosi.

Il lavoro non consiste nel formulare allarmi generici, ma nell'individuare i rischi che contano davvero, stimarne l'impatto e indicare le correzioni utili prima che il problema diventi una lite. È un supporto particolarmente utile quando si sta per firmare, investire, inviare una diffida, chiudere un accordo o gestire un passaggio delicato con soci, fornitori o vicini di casa.`,
        faq: [
          {
            question: "Quando conviene fare un'analisi preventiva dei rischi legali?",
            answer: `Conviene prima di assumere impegni che possono produrre effetti economici o responsabilità rilevanti, ad esempio contratti, investimenti, acquisti immobiliari o accordi commerciali. Un esame preventivo consente di capire dove si concentra il rischio reale e se sia possibile ridurlo con modifiche mirate, prima che la situazione si irrigidisca.`,
          },
          {
            question: "Un avvocato può aiutarmi a capire se sto correndo un rischio legale concreto?",
            answer: `Sì. La consulenza preventiva serve proprio a distinguere i timori generici dai profili di rischio effettivi, leggendo documenti, comunicazioni e contesto del caso. Se ci portate il materiale disponibile, possiamo dirvi quali punti richiedono interventi immediati e quali, invece, si possono gestire con cautele proporzionate.`,
          },
        ],
      },
      {
        title: 'Pareri legali scritti',
        slug: 'pareri-legali-scritti',
        icon: 'FileText',
        description: `Quando serve una posizione chiara, ragionata e documentata, il parere legale scritto è spesso lo strumento più utile. Redigiamo pareri in materia civile, contrattuale, familiare, lavoristica e immobiliare con un linguaggio comprensibile ma tecnicamente solido, così che il cliente possa usare il documento per decidere, negoziare o preparare una tutela successiva.

Per chi opera a Milano e in Lombardia, il parere scritto è spesso il modo più efficace per mettere ordine prima di muoversi: chiarisce i fatti giuridicamente rilevanti, le norme applicabili, gli scenari possibili e i costi-benefici delle diverse strade. È utile sia a chi vuole evitare il contenzioso, sia a chi ha bisogno di una base seria per affrontarlo.`,
        faq: [
          {
            question: "Quanto tempo serve per avere un parere legale scritto?",
            answer: `Dipende dalla complessità della questione e dalla quantità di documenti da esaminare. Nei casi lineari i tempi possono essere contenuti; nelle situazioni più articolate serve un approfondimento maggiore. Prima dell'incarico definiamo sempre perimetro e tempi, così il cliente sa subito cosa aspettarsi e con quale livello di analisi.`,
          },
          {
            question: "Un parere legale scritto può essermi utile anche se non voglio fare causa?",
            answer: `Assolutamente sì. Molti clienti lo richiedono proprio per evitare una causa e capire se convenga trattare, diffidare la controparte o rinviare una decisione. Un parere ben impostato aiuta a negoziare con più lucidità e a non muoversi sulla base di impressioni o informazioni parziali.`,
          },
        ],
      },
      {
        title: 'Consulenza contrattuale',
        slug: 'consulenza-contrattuale',
        icon: 'FilePen',
        description: `Firmare un contratto senza una verifica legale espone spesso a obblighi, penali e responsabilità sottovalutati. In un contesto come Milano, dove rapporti commerciali, professionali e immobiliari si chiudono in tempi rapidi, una clausola poco chiara può tradursi in costi molto concreti quando il rapporto si incrina.

Assistiamo nella revisione, negoziazione e redazione di contratti di appalto, fornitura, consulenza, locazione, cessione, incarico professionale e accordi tra privati. L'obiettivo non è soltanto rendere il testo formalmente corretto, ma costruire un contratto che regga nel caso concreto, distribuisca bene il rischio e riduca il margine per contestazioni future.`,
        faq: [
          {
            question: "È utile far controllare un contratto prima di firmarlo?",
            answer: `Sì, soprattutto se il contratto prevede importi rilevanti, durata lunga, penali, esclusiva, recesso o responsabilità particolari. Una verifica preventiva consente di individuare subito le clausole sbilanciate e di capire quali modifiche chiedere prima che il testo diventi vincolante.`,
          },
          {
            question: "Un avvocato può modificare un contratto già preparato dall'altra parte?",
            answer: `Sì. Molto spesso il lavoro consiste proprio nel revisionare una bozza ricevuta e proporre integrazioni o correzioni che riequilibrino il rapporto. Anche pochi interventi mirati possono incidere in modo decisivo in caso di inadempimento, contestazione o interruzione anticipata del contratto.`,
          },
        ],
      },
      {
        title: 'Assistenza stragiudiziale',
        slug: 'assistenza-stragiudiziale',
        icon: 'MessageSquareText',
        description: `Molte controversie si risolvono meglio prima del tribunale, ma solo se vengono impostate con metodo. L'assistenza stragiudiziale serve a gestire il conflitto in modo rapido, documentato e strategico attraverso diffide, lettere formali, incontri, negoziazioni e proposte transattive che tutelino davvero la posizione del cliente.

Seguiamo la fase stragiudiziale in materia contrattuale, immobiliare, familiare, lavoristica e di recupero crediti. Un intervento ben costruito può sbloccare pagamenti, correggere comportamenti illegittimi o chiudere la vicenda con un accordo sostenibile, senza precludere l'azione giudiziale se la controparte continua a non collaborare.`,
        faq: [
          {
            question: "Cosa significa assistenza stragiudiziale?",
            answer: `Significa ricevere tutela legale fuori dal processo: analisi del caso, impostazione della posizione, invio di diffide, trattative e definizione di accordi. È spesso la strada più efficiente quando serve far valere un diritto senza esporsi subito ai tempi e ai costi di una causa.`,
          },
          {
            question: "Vale la pena mandare una diffida tramite avvocato?",
            answer: `Sì, perché una diffida ben scritta chiarisce il fondamento della richiesta, fissa un termine e segnala alla controparte che la questione è stata inquadrata seriamente. In molti casi basta questo passaggio per sbloccare pagamenti o risposte; negli altri, consente di arrivare alla fase successiva con una posizione già ordinata e più forte.`,
          },
        ],
      },
      {
        title: 'Mediazione e negoziazione',
        slug: 'mediazione-e-negoziazione',
        icon: 'Handshake',
        description: `Quando esiste uno spazio reale per un accordo, mediazione e negoziazione possono ridurre tempi, costi e conflittualità senza sacrificare la tutela. In molte materie civili la mediazione merita una valutazione attenta, anche perché può offrire una gestione più rapida della lite e, nei casi previsti, beneficiare degli incentivi fiscali della disciplina vigente.

Assistiamo i clienti di Milano e della Lombardia nella preparazione della strategia negoziale, nella selezione dei documenti decisivi e nella partecipazione agli incontri presso organismi competenti o in sede di negoziazione assistita. Un accordo utile non nasce da formule generiche, ma da una preparazione rigorosa dei fatti, dei numeri e dei margini reali di trattativa.`,
        faq: [
          {
            question: "Quando conviene tentare una mediazione invece di fare subito causa?",
            answer: `Conviene quando c'è una possibilità concreta di accordo, quando le parti vogliono contenere tempi e costi o quando il rapporto deve proseguire anche dopo la lite. Una valutazione iniziale serve a capire se la mediazione è davvero uno strumento utile nel caso specifico oppure se rischia di essere solo un passaggio formale.`,
          },
          {
            question: "Che differenza c'è tra mediazione e negoziazione assistita?",
            answer: `La mediazione si svolge davanti a un organismo terzo, mentre la negoziazione assistita si sviluppa direttamente tra le parti con l'assistenza dei rispettivi avvocati. La scelta dipende dal tipo di controversia, dal livello di conflitto e dal risultato concreto che si vuole ottenere; per questo è utile impostarla su basi strategiche e non solo procedurali.`,
          },
        ],
      },
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
    longDescription: `Quando la via stragiudiziale non è sufficiente, rappresentiamo i nostri clienti davanti a tutti i tribunali competenti, dal Giudice di Pace alla Corte d'Appello, in ogni grado di giudizio.

La preparazione di ogni causa è meticolosa: studiamo la giurisprudenza più recente, raccogliamo le prove necessarie e costruiamo una strategia processuale solida. Il cliente è accompagnato in ogni fase — dall'atto introduttivo all'udienza, dalla trattativa pre-dibattimentale alla sentenza definitiva.

Operiamo principalmente in ambito civile, ma affianchiamo i clienti anche in procedimenti penali e amministrativi quando gli interessi da tutelare lo richiedono. La nostra priorità è sempre ottenere il miglior risultato possibile nel minor tempo e con il minor costo per il cliente.`,
    expertise: [
      {
        title: 'Procedimenti civili',
        slug: 'procedimenti-civili',
        icon: 'Scale',
        description: `Una causa civile efficace comincia molto prima della prima udienza. Impostiamo ogni giudizio partendo da un'analisi rigorosa di documenti, prove, costi e probabilità di risultato, per evitare azioni impulsive, domande mal calibrate o difese fragili che espongano il cliente a tempi lunghi senza una strategia chiara.

Nel contenzioso civile è decisivo costruire bene il caso sin dall'inizio: ricostruzione dei fatti, individuazione delle domande da proporre, eccezioni da sollevare e documentazione da depositare. Accompagniamo il cliente con aggiornamenti trasparenti sulle fasi del procedimento, sui tempi ragionevolmente prevedibili e sulle possibili soluzioni, inclusa un'eventuale definizione transattiva durante la causa.`,
        faq: [
          {
            question: "Quando conviene iniziare una causa civile a Milano?",
            answer: `Conviene quando i tentativi stragiudiziali non hanno funzionato e quando esistono fatti, documenti o prove sufficienti a sostenere seriamente la domanda. Prima di agire è utile valutare non solo se si ha ragione, ma anche se la causa abbia un'utilità economica e strategica proporzionata rispetto a tempi e costi.`,
          },
          {
            question: "Quanto dura una causa civile?",
            answer: `Non esiste una durata identica per tutti i procedimenti: incidono il tipo di rito, la complessità della prova e il carico dell'ufficio giudiziario competente. Una valutazione iniziale realistica serve proprio a capire se procedere, cercare un accordo o attendere elementi ulteriori prima di investire in un contenzioso.`,
          },
        ],
      },
      {
        title: 'Procedimenti penali',
        slug: 'procedimenti-penali',
        icon: 'ShieldAlert',
        description: `Nel penale, i primi passaggi pesano spesso più del resto del procedimento. Assistiamo persone indagate, imputate e persone offese dal reato nella lettura degli atti ricevuti, nella gestione delle dichiarazioni, nella raccolta della documentazione utile e nella definizione di una linea difensiva coerente con la fase in corso e con i rischi concreti del caso.

Per chi riceve a Milano un avviso di garanzia, una convocazione o un decreto, la priorità è fare chiarezza immediata: capire cosa viene contestato, quali termini scadono, cosa è opportuno fare e cosa, invece, è meglio non fare. Anche la persona offesa ha bisogno di assistenza tecnica tempestiva per querela, costituzione di parte civile e richiesta di risarcimento.`,
        faq: [
          {
            question: "Ho ricevuto un avviso di garanzia: cosa devo fare?",
            answer: `La prima cosa è non sottovalutare l'atto e farlo esaminare subito da un avvocato. Bisogna capire il fatto contestato, la fase del procedimento e le scadenze utili, così da impostare la difesa in modo corretto fin dall'inizio ed evitare mosse impulsive che possano peggiorare la posizione. Un inquadramento rapido, in questi casi, serve soprattutto a non compromettere opzioni difensive che esistono solo nelle prime fasi.`,
          },
          {
            question: "Posso essere assistito se sono parte offesa in un procedimento penale?",
            answer: `Sì. La persona offesa può essere assistita nella presentazione della querela, nel monitoraggio del procedimento e, quando opportuno, nella richiesta di risarcimento del danno. Muoversi tempestivamente è importante perché alcune iniziative hanno senso solo se vengono impostate bene nelle prime fasi.`,
          },
        ],
      },
      {
        title: 'Procedimenti amministrativi',
        slug: 'procedimenti-amministrativi',
        icon: 'Landmark',
        description: `Un atto della pubblica amministrazione non va soltanto subìto: va letto, verificato e, se necessario, contestato con il percorso giusto. Assistiamo professionisti, imprese, proprietari immobiliari e privati nella valutazione di provvedimenti, dinieghi, sanzioni, silenzi e altri atti amministrativi che incidono in modo concreto sull'attività o sulla sfera personale del cliente.

Nel contesto lombardo, spesso il punto decisivo non è partire subito con un ricorso, ma ricostruire correttamente il procedimento, accedere agli atti, capire se esistono vizi utili e scegliere se presentare osservazioni, istanze, diffide o impugnazioni. Una strategia amministrativa efficace richiede precisione tecnica e senso della convenienza pratica.`,
        faq: [
          {
            question: "Cosa posso fare se ricevo un provvedimento amministrativo che ritengo ingiusto?",
            answer: `È importante farlo esaminare rapidamente, perché i termini di reazione possono essere brevi e gli errori iniziali pesano molto. A seconda del caso, si può valutare se presentare osservazioni, chiedere un riesame, accedere agli atti o proporre ricorso davanti al giudice competente.`,
          },
          {
            question: "Un avvocato può aiutarmi anche prima del ricorso al TAR?",
            answer: `Sì. In molti casi il lavoro più utile inizia prima del contenzioso: accesso agli atti, analisi del procedimento, interlocuzione con l'ente e verifica delle alternative. Questo consente di capire se il ricorso abbia basi solide oppure se esista una strada più rapida ed efficiente.`,
          },
        ],
      },
      {
        title: 'Ricorsi e impugnazioni',
        slug: 'ricorsi-e-impugnazioni',
        icon: 'RotateCcw',
        description: `Non ogni decisione sfavorevole deve essere accettata, ma non ogni impugnazione conviene davvero. Assistiamo nella valutazione di appelli, opposizioni, reclami e altri mezzi di impugnazione partendo da un criterio semplice: occorre verificare se esistano motivi giuridicamente seri, utili e sostenibili, non soltanto un generico disaccordo con l'esito.

La fase di impugnazione richiede un'analisi tecnica molto accurata degli atti già depositati, delle motivazioni del giudice e degli errori eventualmente censurabili. Per il cliente questo significa ricevere un parere franco sulla convenienza dell'iniziativa, sui costi prevedibili e sulle probabilità concrete di modificare l'esito della decisione.`,
        faq: [
          {
            question: "Si può fare appello contro una sentenza civile sfavorevole?",
            answer: `Spesso sì, ma non automaticamente. Bisogna verificare i motivi di impugnazione, i termini da rispettare e l'utilità concreta dell'appello rispetto a costi e tempi. Una lettura tecnica della sentenza e degli atti di causa serve proprio a capire se abbia senso investire in un nuovo grado di giudizio, invece di impugnare soltanto perché l'esito è stato sfavorevole.`,
          },
          {
            question: "Quanto tempo ho per impugnare una decisione?",
            answer: `I termini cambiano in base al tipo di provvedimento e alla modalità con cui è stato comunicato o notificato. Per questo è importante attivarsi subito appena si riceve la decisione: una verifica tempestiva consente di non perdere scadenze e di scegliere la strategia con il margine necessario. Quando i termini iniziano a correre, anche pochi giorni possono fare la differenza tra una scelta ancora aperta e un'opzione ormai persa.`,
          },
        ],
      },
      {
        title: 'Esecuzioni forzate',
        slug: 'esecuzioni-forzate',
        icon: 'CircleDollarSign',
        description: `Avere ragione su carta non basta se il debitore continua a non pagare. Assistiamo creditori e debitori nelle procedure di esecuzione forzata a Milano e in Lombardia, valutando il titolo disponibile, la convenienza dell'azione e i beni o crediti effettivamente aggredibili, così da evitare iniziative costose ma improduttive.

L'esecuzione non è un automatismo: bisogna scegliere lo strumento corretto, coordinare notifiche, atti e adempimenti e verificare che l'iniziativa abbia un'utilità concreta. Anche il debitore ha bisogno di tutela, ad esempio per controllare la regolarità degli atti, la proporzione dell'azione e le possibili difese o soluzioni transattive.`,
        faq: [
          {
            question: "Cosa succede se il debitore non paga nemmeno dopo la sentenza?",
            answer: `Se esiste un titolo esecutivo, si può valutare l'avvio dell'esecuzione forzata scegliendo lo strumento più adatto al caso concreto. Prima di procedere è però essenziale capire se il debitore abbia beni, conti o crediti realmente aggredibili, così da evitare un'azione solo teorica.`,
          },
          {
            question: "Posso difendermi da un'esecuzione forzata già iniziata?",
            answer: `Sì, in molti casi è possibile verificare la correttezza degli atti e valutare opposizioni o altre iniziative difensive. La reazione deve essere tempestiva, perché nella fase esecutiva i tempi sono stretti e le possibilità di intervento dipendono molto da quando si agisce.`,
          },
        ],
      },
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

Assistiamo privati e famiglie in tutte le fasi delle controversie familiari: dalla separazione consensuale al divorzio contenzioso, dalle questioni sull'affidamento dei figli alla tutela degli anziani. Lavoriamo per trovare soluzioni che minimizzino il conflitto e proteggano soprattutto i soggetti più vulnerabili, in particolare i minori.

In materia successoria, assistiamo i clienti nella pianificazione ereditaria, nella redazione di testamenti e nella gestione delle controversie tra eredi. Il nostro obiettivo è sempre preservare le relazioni familiari ove possibile, ricorrendo al contenzioso solo quando strettamente necessario.`,
    expertise: [
      {
        title: 'Separazioni e divorzi',
        slug: 'separazioni-e-divorzi',
        icon: 'HeartCrack',
        description: `Una separazione ben impostata tutela non solo i diritti immediati, ma anche gli equilibri futuri della famiglia. A Milano, la materia fa capo alla Sezione IX civile del Tribunale, mentre in presenza dei presupposti di legge alcuni accordi possono essere gestiti anche tramite negoziazione assistita o davanti all'Ufficiale di Stato civile. Scegliere il percorso corretto sin dall'inizio aiuta a evitare ritardi, costi inutili e conflitti irrigiditi.

La crisi coniugale non riguarda soltanto la fine del rapporto, ma anche casa familiare, mantenimento, figli, trasferimenti patrimoniali e tempi della procedura. Assistiamo il cliente nella costruzione di una strategia chiara e sostenibile, con attenzione a riservatezza, ordine documentale e riduzione del conflitto quando ciò è davvero possibile.`,
        faq: [
          {
            question: "Quanto costa una separazione consensuale a Milano?",
            answer: `Il costo dipende dal livello di accordo già raggiunto, dalla presenza di figli, dal patrimonio da regolare e dagli adempimenti necessari. Una valutazione iniziale serve a capire se il caso possa seguire un percorso più snello oppure se richieda un'attività più articolata, con conseguente diversa impostazione di tempi e costi. Chiarirlo subito evita di partire con aspettative sbagliate su budget, documenti e percorso da seguire.`,
          },
          {
            question: "Si può fare il divorzio senza andare in tribunale a Milano?",
            answer: `In alcuni casi sì, ma solo se sussistono i presupposti previsti dalla legge. A seconda della situazione, si può valutare la negoziazione assistita oppure la procedura davanti all'Ufficiale di Stato civile. Verificare subito quale strada sia praticabile evita di impostare il caso sul canale sbagliato e di perdere tempo su un percorso che poi non potrà essere utilizzato.`,
          },
        ],
      },
      {
        title: 'Affidamento minori',
        slug: 'affidamento-minori',
        icon: 'Baby',
        description: `Quando ci sono figli, ogni decisione deve essere costruita attorno alla loro stabilità concreta. Assistiamo genitori sposati e non sposati nelle questioni relative ad affidamento, collocamento, frequentazione, responsabilità genitoriale e decisioni di maggiore interesse per i minori, con attenzione prioritaria all'equilibrio del bambino e alla sostenibilità reale delle soluzioni proposte.

Nel contesto milanese, fatto di ritmi di lavoro intensi, spostamenti e organizzazioni familiari complesse, è essenziale definire accordi realistici e attuabili. Aiutiamo a costruire calendari, criteri di comunicazione, gestione delle spese straordinarie e assetti che riducano il rischio di nuovi conflitti dopo la decisione o l'accordo.`,
        faq: [
          {
            question: "Come viene deciso l'affidamento dei figli in caso di separazione?",
            answer: `La decisione viene presa tenendo conto dell'interesse del minore e della situazione concreta della famiglia. Non esiste una formula automatica uguale per tutti: contano l'organizzazione quotidiana, il rapporto con ciascun genitore e la capacità di garantire stabilità. Per questo è importante presentare una proposta credibile, documentata e davvero praticabile.`,
          },
          {
            question: "Posso chiedere di modificare gli accordi sui figli dopo la separazione?",
            answer: `Sì, quando cambiano in modo rilevante le condizioni di vita, di lavoro o le esigenze dei minori. In questi casi è essenziale formulare una richiesta ben motivata e supportata da elementi concreti, evitando iniziative unilaterali che rischiano di peggiorare il conflitto e indebolire la propria posizione.`,
          },
        ],
      },
      {
        title: 'Successioni e testamenti',
        slug: 'successioni-e-testamenti',
        icon: 'ScrollText',
        description: `Nelle successioni, i conflitti nascono spesso da questioni lasciate irrisolte troppo a lungo. A Milano, dove il patrimonio familiare può comprendere immobili, partecipazioni, conti e rapporti complessi, è fondamentale prevenire contestazioni su quote, validità delle disposizioni, divisione dei beni e gestione dei rapporti tra coeredi.

Assistiamo sia nella pianificazione sia nella fase successiva all'apertura della successione, aiutando gli eredi a orientarsi tra documenti, rapporti patrimoniali e adempimenti pratici. Tra questi rientra anche la dichiarazione di successione, che va presentata entro 12 mesi dall'apertura della successione; muoversi con ordine sin dall'inizio evita ritardi, errori e conflitti inutilmente aggravati.`,
        faq: [
          {
            question: "Entro quando va fatta la dichiarazione di successione?",
            answer: `La dichiarazione di successione va normalmente presentata entro 12 mesi dalla data di apertura della successione. È utile verificare fin da subito documenti, beni e posizione degli eredi, così da non arrivare in ritardo o con una pratica incompleta che complichi ulteriormente la gestione patrimoniale.`,
          },
          {
            question: "Quando conviene fare testamento con l'assistenza di un avvocato?",
            answer: `Conviene soprattutto quando il patrimonio è articolato, quando vi sono più eredi, seconde famiglie, immobili o possibili motivi di contestazione futura. Un'impostazione corretta riduce il rischio di impugnazioni e aiuta a tradurre la volontà del disponente in disposizioni più chiare, coerenti e difendibili.`,
          },
        ],
      },
      {
        title: 'Tutela e curatela',
        slug: 'tutela-e-curatela',
        icon: 'ShieldUser',
        description: `Quando una persona fragile non riesce più a gestire adeguatamente i propri interessi, serve una protezione giuridica proporzionata e concreta. Assistiamo famiglie e caregiver nella scelta dello strumento più adatto, nella raccolta della documentazione e nel deposito delle istanze presso gli uffici di volontaria giurisdizione competenti a Milano, con l'obiettivo di costruire una tutela utile e non inutilmente gravosa.

Queste procedure richiedono precisione, sensibilità e chiarezza sui poteri da chiedere, sugli atti da autorizzare e sulle responsabilità di chi viene nominato. Una domanda ben impostata tutela meglio la persona vulnerabile e aiuta la famiglia a muoversi con maggiore sicurezza nelle decisioni quotidiane e patrimoniali.`,
        faq: [
          {
            question: "Quando serve l'amministrazione di sostegno per un genitore anziano?",
            answer: `Serve quando la persona, anche solo in parte o temporaneamente, non riesce più a gestire in autonomia interessi personali o patrimoniali. La valutazione deve essere concreta: capire quali atti devono essere compiuti e quale misura sia davvero proporzionata evita richieste eccessive o, al contrario, insufficienti.`,
          },
          {
            question: "Qual è la differenza tra tutela, curatela e amministrazione di sostegno?",
            answer: `Sono strumenti diversi per intensità e finalità, e la scelta dipende dal grado di autonomia residua della persona e dal tipo di protezione necessaria. Un inquadramento iniziale corretto aiuta la famiglia a seguire il percorso più adatto senza perdere tempo su richieste sbagliate o troppo ampie.`,
          },
        ],
      },
      {
        title: 'Assegno di mantenimento',
        slug: 'assegno-di-mantenimento',
        icon: 'Wallet',
        description: `L'assegno di mantenimento va costruito su dati reali, non su automatismi o percezioni. Assistiamo nella determinazione, revisione e contestazione dell'assegno partendo da un'analisi concreta di redditi, spese, patrimonio, tenore di vita pregresso e bisogni effettivi dei minori o del coniuge avente diritto.

Nel territorio di Milano e della Lombardia, dove il costo della vita incide in modo rilevante, è essenziale formulare richieste sostenibili e ben documentate. Seguiamo sia la fase di accordo sia il contenzioso, aiutando il cliente a raccogliere gli elementi utili e a rappresentare con credibilità la propria situazione economica attuale.`,
        faq: [
          {
            question: "Come si calcola l'assegno di mantenimento a Milano?",
            answer: `Non esiste un importo fisso valido per tutti. Il calcolo dipende dalla situazione reddituale e patrimoniale delle parti, dalle esigenze dei figli e dall'organizzazione familiare concreta. Per questo è fondamentale lavorare su documenti, spese e dati reali, evitando richieste poco sostenibili o difese troppo deboli.`,
          },
          {
            question: "Posso chiedere la riduzione dell'assegno di mantenimento?",
            answer: `Sì, se sono intervenuti cambiamenti rilevanti e documentabili, ad esempio perdita del lavoro, riduzione del reddito o mutamento delle esigenze dei figli. La richiesta deve essere costruita in modo serio e motivato, perché la sola percezione di difficoltà non basta a ottenere una revisione utile.`,
          },
        ],
      },
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
    longDescription: `Il diritto del lavoro è uno degli ambiti più dinamici e in continua evoluzione del sistema giuridico italiano. Assistiamo sia lavoratori dipendenti che aziende e datori di lavoro, garantendo competenza aggiornata e strategie efficaci per ogni tipo di controversia lavorativa.

Per i lavoratori: tuteliamo i diritti in caso di licenziamento illegittimo, mancato pagamento di stipendi o TFR, mobbing, discriminazione e infortuni sul lavoro. Affianchiamo il lavoratore dalla fase stragiudiziale fino all'eventuale ricorso al Tribunale del Lavoro.

Per le aziende: assistiamo nella redazione di contratti di lavoro conformi alla normativa vigente, nella gestione di procedimenti disciplinari, nelle ristrutturazioni aziendali e nei rapporti con le rappresentanze sindacali. Prevenire le controversie è sempre più conveniente che gestirle: per questo offriamo anche consulenza preventiva in ambito HR e contrattuale.`,
    expertise: [
      {
        title: 'Controversie lavorative',
        slug: 'controversie-lavorative',
        icon: 'Swords',
        description: `Nel lavoro, anche una violazione apparentemente piccola può avere conseguenze economiche rilevanti. Assistiamo lavoratori e aziende di Milano e della Lombardia con un approccio concreto, orientato a capire rapidamente se esistano prove utili, margini di conciliazione e reale convenienza dell'azione, evitando contenziosi improvvisati o aspettative irrealistiche.

Nel diritto del lavoro il fattore tempo conta molto: email, buste paga, lettere, badge, turni e messaggi possono diventare decisivi. Aiutiamo a ordinare la documentazione, impostare la contestazione e scegliere se procedere con diffida, tentativo conciliativo o ricorso al giudice del lavoro in base alla forza effettiva del caso.`,
        faq: [
          {
            question: "Quando conviene fare causa al datore di lavoro?",
            answer: `Conviene quando esiste una violazione concreta dei diritti del lavoratore e quando la documentazione disponibile consente di sostenerla seriamente. Prima di agire è utile verificare se la questione possa essere risolta in via stragiudiziale oppure se il ricorso sia davvero la strada più efficace rispetto a tempi, costi e risultato atteso.`,
          },
          {
            question: "Che documenti servono per una controversia di lavoro?",
            answer: `Di solito servono contratto, buste paga, lettere aziendali, eventuali contestazioni disciplinari, turni, email e ogni elemento utile a ricostruire i fatti. Anche messaggi, rilevazioni di presenza e testimoni possono diventare rilevanti; una verifica iniziale serve proprio a capire cosa è già sufficiente e cosa, invece, conviene ancora raccogliere.`,
          },
        ],
      },
      {
        title: 'Contratti di lavoro',
        slug: 'contratti-di-lavoro',
        icon: 'FileSignature',
        description: `Un contratto di lavoro scritto bene previene molte contestazioni future. Assistiamo nella redazione, revisione e verifica di contratti subordinati, lettere di assunzione, patti accessori, clausole di prova, accordi di riservatezza e altri documenti che incidono in modo diretto sul rapporto di lavoro e sulla tenuta della relazione professionale.

Per le aziende milanesi, una consulenza contrattuale ben impostata riduce il rischio di contenziosi e rende più coerente la gestione interna. Per i lavoratori, invece, serve a capire cosa si sta firmando davvero, quali obblighi si assumono e quali tutele spettano in concreto, prima che il testo produca effetti difficili da correggere.`,
        faq: [
          {
            question: "È utile far controllare il contratto di lavoro prima di firmarlo?",
            answer: `Sì, soprattutto se contiene clausole su prova, orario, trasferte, riservatezza, non concorrenza o retribuzione variabile. Un controllo preventivo consente di capire subito quali punti meritano chiarimenti o modifiche, prima che il lavoratore assuma obblighi poco chiari o l'azienda adotti un testo fragile.`,
          },
          {
            question: "Un'azienda può farsi aiutare da un avvocato per preparare lettere di assunzione e clausole?",
            answer: `Sì. È una scelta utile per rendere i documenti più coerenti con l'organizzazione aziendale e più robusti in caso di contestazioni. Anche un intervento mirato su pochi punti critici può ridurre errori, ambiguità e costi successivi nella gestione del personale.`,
          },
        ],
      },
      {
        title: 'Licenziamenti e dimissioni',
        slug: 'licenziamenti-e-dimissioni',
        icon: 'DoorOpen',
        description: `Licenziamenti e dimissioni vanno gestiti con lucidità, perché errori e ritardi possono costare molto. Assistiamo i lavoratori che vogliono contestare un licenziamento o valutare dimissioni per giusta causa, e supportiamo le aziende nella gestione corretta del recesso. Le dimissioni volontarie, salvo eccezioni, seguono oggi una procedura telematica e il lavoratore può revocarle entro sette giorni dalla comunicazione.

Accanto alla cessazione del rapporto, aiutiamo a verificare spettanze finali, preavviso, TFR, ferie residue e altri crediti. In caso di insolvenza del datore può rilevare anche il Fondo di Garanzia INPS per TFR e crediti di lavoro, ma è fondamentale impostare bene la documentazione fin dall'inizio per non disperdere tutele utili.`,
        faq: [
          {
            question: "Come si impugna un licenziamento?",
            answer: `Dipende dal tipo di rapporto e dalla situazione concreta, ma è essenziale muoversi rapidamente e far valutare subito la documentazione ricevuta. Nei licenziamenti, il fattore tempo incide moltissimo: una verifica tempestiva consente di non perdere passaggi utili e di capire se esistano margini reali di contestazione. Un controllo immediato della lettera e del contesto aiuta anche a evitare reazioni istintive che poi indeboliscono la tutela.`,
          },
          {
            question: "Come funzionano le dimissioni telematiche?",
            answer: `Le dimissioni volontarie si presentano normalmente online tramite la procedura dedicata, direttamente o tramite soggetti abilitati, e possono essere revocate entro sette giorni dalla comunicazione. Proprio perché la cessazione produce effetti importanti, è opportuno valutare prima se vi siano alternative, criticità o una possibile giusta causa. Chiarire questi aspetti prima dell'invio evita di compiere un passo formalmente corretto ma economicamente sfavorevole.`,
          },
        ],
      },
      {
        title: 'Mobbing e discriminazione',
        slug: 'mobbing-e-discriminazione',
        icon: 'Ban',
        description: `Quando il clima in ufficio degenera, servono prove serie e una lettura giuridica rigorosa dei fatti. Assistiamo lavoratori che subiscono comportamenti vessatori, isolamento professionale, esclusioni sistematiche, sanzioni ritorsive o trattamenti differenziati illegittimi, ma supportiamo anche le aziende che vogliono gestire segnalazioni interne in modo corretto e preventivo.

In questi casi non basta affermare che l'ambiente di lavoro è diventato difficile: bisogna raccogliere cronologie, messaggi, provvedimenti, certificazioni e testimonianze utili. Il nostro lavoro consiste anche nel distinguere il disagio organizzativo dalle condotte giuridicamente rilevanti, così da orientare il cliente verso la tutela più seria e sostenibile.`,
        faq: [
          {
            question: "Come posso dimostrare il mobbing sul lavoro?",
            answer: `Serve una ricostruzione precisa e documentata dei comportamenti subiti nel tempo. Email, chat, contestazioni, cambi mansione, esclusioni da riunioni, certificazioni mediche e testimoni possono essere importanti, ma vanno letti insieme e non isolatamente. L'analisi iniziale serve proprio a capire se il quadro probatorio sia davvero coerente.`,
          },
          {
            question: "Che differenza c'è tra mobbing e semplice conflitto in ufficio?",
            answer: `Non ogni ambiente difficile integra mobbing. Occorre valutare continuità, gravità, effetti e in alcuni casi anche la finalità dei comportamenti. Distinguere bene i piani è importante per scegliere una tutela credibile e non investire tempo ed energie su un inquadramento giuridico debole.`,
          },
        ],
      },
      {
        title: 'Consulenza HR per aziende',
        slug: 'consulenza-hr-per-aziende',
        icon: 'Building',
        description: `Una buona consulenza HR legale serve prima di tutto a evitare problemi, non soltanto a difendersi quando esplodono. Supportiamo imprese e datori di lavoro di Milano e della Lombardia nella predisposizione di procedure disciplinari, lettere, policy, contestazioni, accordi individuali e gestione delle criticità nel rapporto di lavoro, con un approccio orientato alla prevenzione e alla tenuta organizzativa.

L'obiettivo è costruire un presidio giuridico che renda le decisioni aziendali più solide, chiare e difendibili nel tempo. Questo è particolarmente utile nelle fasi di crescita, riorganizzazione, uscita di figure chiave o introduzione di nuove regole interne, quando gli errori di impostazione possono moltiplicare il rischio di contenzioso.`,
        faq: [
          {
            question: "Perché un'azienda dovrebbe avere un supporto legale HR continuativo?",
            answer: `Perché molte controversie nascono da documenti scritti male, procedure incomplete o decisioni non coerenti con il quadro normativo. Un affiancamento continuativo consente di prevenire errori, standardizzare meglio i passaggi delicati e intervenire prima che il problema diventi una causa vera e propria.`,
          },
          {
            question: "Un avvocato può aiutare nella gestione di contestazioni disciplinari?",
            answer: `Sì. La correttezza formale e sostanziale della procedura disciplinare è molto importante e incide direttamente sulla tenuta del provvedimento. Un supporto legale aiuta a calibrare contestazioni, difese e decisioni in modo più proporzionato, riducendo il rischio di impugnazioni fondate.`,
          },
        ],
      },
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
    longDescription: `Il mercato immobiliare milanese è tra i più complessi e competitivi d'Italia. Affianchiamo privati, investitori e aziende in tutte le operazioni immobiliari, garantendo sicurezza giuridica in ogni fase della transazione o della controversia.

In materia di compravendita, verifichiamo la conformità urbanistica e catastale dell'immobile, analizziamo i contratti preliminari, assistiamo nelle trattative e nel rogito notarile. Il nostro obiettivo è proteggere il cliente da vizi occulti, ipoteche nascoste o irregolarità che potrebbero compromettere l'investimento.

Per le locazioni, redattiamo e revisioniamo contratti di affitto sia a uso abitativo che commerciale, gestiamo le procedure di sfratto per morosità o per finita locazione e assistiamo in caso di controversie tra locatore e conduttore. In ambito condominiale, rappresentiamo sia i condomini che gli amministratori nelle dispute su delibere assembleari, ripartizione delle spese e lavori straordinari.`,
    expertise: [
      {
        title: 'Compravendite immobiliari',
        slug: 'compravendite-immobiliari',
        icon: 'KeyRound',
        description: `Comprare o vendere casa a Milano richiede verifiche legali almeno quanto finanziarie. Assistiamo privati, investitori e società nella lettura del preliminare, nella verifica dei documenti, nella gestione delle clausole sospensive e nella prevenzione di contestazioni su conformità, ipoteche, inadempimenti o vizi dell'immobile.

La consulenza è particolarmente utile quando l'operazione riguarda immobili con storia complessa, ristrutturazioni, eredità, vendite tra privati o tempistiche strette. Un controllo preventivo ben condotto aiuta a capire quali criticità esistano sul bene, quali garanzie chiedere alla controparte e se il prezzo rifletta davvero il rischio giuridico dell'operazione.`,
        faq: [
          {
            question: "Quando conviene far controllare il compromesso da un avvocato?",
            answer: `Conviene prima della firma, soprattutto se ci sono caparre importanti, clausole sospensive, immobili da regolarizzare o documentazione incompleta. Intervenire in questa fase consente di correggere criticità e riequilibrare il testo prima che il cliente si assuma obblighi difficili da gestire. È il momento in cui esiste ancora un vero margine per negoziare clausole e garanzie.`,
          },
          {
            question: "Un avvocato può aiutarmi anche se c'è già il notaio?",
            answer: `Sì. Il notaio ha un ruolo centrale nel rogito, ma l'avvocato può affiancare il cliente nella fase precedente, nelle trattative e nella valutazione del rischio contrattuale. I due ruoli si completano, soprattutto quando la complessità dell'operazione emerge prima dell'atto finale.`,
          },
        ],
      },
      {
        title: 'Locazioni abitative e commerciali',
        slug: 'locazioni-abitative-e-commerciali',
        icon: 'Home',
        description: `Un contratto di locazione scritto male può generare problemi per anni. A Milano, dove il mercato è rapido e il valore economico dei rapporti è spesso elevato, una bozza standard o poco calibrata può creare criticità su canone, durata, cauzione, recesso, manutenzione, rinnovo e restituzione dell'immobile.

Assistiamo sia nella fase iniziale sia nella gestione del rapporto nel tempo. Tra gli aspetti pratici più rilevanti c'è anche la registrazione del contratto, che deve avvenire entro 30 giorni dalla stipula o dalla decorrenza se anteriore. Un'impostazione corretta fin dall'inizio riduce errori documentali e rende più ordinata la gestione di eventuali tensioni future tra locatore e conduttore.`,
        faq: [
          {
            question: "Entro quanto va registrato un contratto di affitto?",
            answer: `La registrazione deve avvenire normalmente entro 30 giorni dalla stipula o dalla decorrenza, se anteriore. Verificare subito gli adempimenti contrattuali e fiscali aiuta a evitare irregolarità che possono complicare il rapporto e indebolire la gestione di contestazioni successive.`,
          },
          {
            question: "È diverso gestire una locazione commerciale rispetto a una abitativa?",
            answer: `Sì, perché cambiano disciplina, interessi economici in gioco e clausole da presidiare con maggiore attenzione. Adattare il contratto al tipo di immobile e all'effettivo utilizzo è essenziale per evitare di usare modelli standard inadeguati a una realtà commerciale più esposta al rischio.`,
          },
        ],
      },
      {
        title: 'Controversie condominiali',
        slug: 'controversie-condominiali',
        icon: 'Building2',
        description: `Nel contenzioso condominiale, il punto non è solo avere ragione, ma poterlo dimostrare con i documenti giusti e nei tempi corretti. Assistiamo condomini, amministratori e proprietari nella valutazione tecnica e strategica della lite, cercando quando possibile una soluzione rapida prima del giudizio e impostando il caso in modo credibile se il conflitto non si risolve.

Il nodo centrale è capire se il problema nasce da una delibera viziata, da un uso scorretto delle parti comuni, da un inadempimento o da una documentazione incompleta. Aiutiamo a leggere verbali, regolamenti, tabelle millesimali, preventivi e comunicazioni, così da trasformare il disagio in una contestazione fondata e non solo emotiva.`,
        faq: [
          {
            question: "Posso impugnare una delibera condominiale?",
            answer: `In molti casi sì, ma occorre verificare se esistano vizi reali e rispettare i termini previsti. Una lettura tempestiva di verbale, convocazione e documenti collegati serve proprio a capire se ci siano i presupposti per contestare la delibera con utilità concreta.`,
          },
          {
            question: "Chi paga i danni da infiltrazione in condominio?",
            answer: `Dipende dall'origine del danno e dalla parte dell'edificio coinvolta. Prima di discutere sulle responsabilità è fondamentale accertare bene i fatti, raccogliere elementi tecnici e leggere la documentazione condominiale pertinente, così da evitare richieste deboli o contestazioni generiche.`,
          },
        ],
      },
      {
        title: 'Due diligence immobiliare',
        slug: 'due-diligence-immobiliare',
        icon: 'ClipboardCheck',
        description: `Prima di investire in un immobile, è essenziale capire quali rischi giuridici si stanno davvero acquistando. Assistiamo privati e investitori nella lettura coordinata di provenienza, documenti catastali, ispezioni ipotecarie, contratti esistenti, vincoli e criticità che potrebbero incidere sul valore, sulla commerciabilità o sull'uso dell'immobile.

In un mercato come quello di Milano, dove le operazioni si chiudono spesso in tempi rapidi, saltare questi controlli può costare molto. Una due diligence ben impostata consente di capire se il bene presenti profili da regolarizzare, quali garanzie chiedere alla controparte e se il prezzo sia coerente con il rischio giuridico dell'operazione.`,
        faq: [
          {
            question: "Che cosa controlla un avvocato in una due diligence immobiliare?",
            answer: `Controlla la documentazione legale rilevante dell'immobile e dell'operazione: provenienza, formalità, contratti, eventuali vincoli e criticità che possono incidere sulla sicurezza dell'acquisto o della locazione. Lo scopo è individuare i rischi prima di firmare, quando è ancora possibile correggere il perimetro dell'operazione.`,
          },
          {
            question: "La visura catastale basta per comprare casa in sicurezza?",
            answer: `No, da sola non basta. È uno strumento utile, ma va letta insieme ad altri documenti e verifiche. Una valutazione completa serve proprio a evitare che il cliente si affidi a un solo elemento e sottovaluti problemi più ampi che possono emergere dopo la firma.`,
          },
        ],
      },
      {
        title: 'Sfratti e rilascio immobili',
        slug: 'sfratti-e-rilascio-immobili',
        icon: 'DoorClosed',
        description: `Quando l'inquilino non paga o non rilascia l'immobile, servono rapidità, precisione e una strategia sostenibile. Assistiamo nei procedimenti di sfratto per morosità, licenza o finita locazione e nelle azioni per il rilascio degli immobili, con attenzione agli atti preliminari, alla documentazione necessaria e alla concreta eseguibilità del risultato.

A Milano la gestione dello sfratto richiede rigore fin dall'inizio: contratto, registrazione, intimazioni, conteggi e prova della morosità devono essere impostati senza errori. Anche l'inquilino, in alcuni casi, può avere bisogno di difesa o di valutare come gestire la fase esecutiva in modo ordinato e senza aggravare inutilmente la propria posizione.`,
        faq: [
          {
            question: "Quanto tempo serve per uno sfratto per morosità a Milano?",
            answer: `Non esiste una tempistica identica per tutti i casi, perché incidono documentazione, opposizioni, udienze e fase esecutiva. Una pratica impostata bene fin dall'inizio riduce però il rischio di rallentamenti evitabili e consente di definire un percorso più realistico per il cliente. Nei procedimenti di sfratto, la qualità dell'impostazione iniziale incide spesso più della sola rapidità con cui si parte.`,
          },
          {
            question: "Posso sfrattare un inquilino che non paga senza contratto registrato?",
            answer: `La situazione va analizzata con molta attenzione, perché l'assenza o l'irregolarità della registrazione può creare criticità importanti. Prima di agire è essenziale verificare documenti e quadro complessivo, così da scegliere una strada utile e non peggiorare ulteriormente la posizione del locatore. In questi casi, un errore iniziale può indebolire l'intera iniziativa successiva.`,
          },
        ],
      },
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
    longDescription: `I crediti insoluti rappresentano un problema serio per imprese, professionisti e privati. Offriamo un servizio strutturato e rapido per il recupero di crediti commerciali e civili, con un approccio che privilegia la soluzione stragiudiziale quando possibile, senza rinunciare all'azione giudiziaria quando necessario.

La fase stragiudiziale inizia con una diffida formale al debitore: nella maggior parte dei casi questo passaggio è sufficiente per ottenere il pagamento senza ricorrere al tribunale. Quando il debitore non risponde o non paga, procediamo con il ricorso per decreto ingiuntivo — uno strumento rapido ed efficace per ottenere un titolo esecutivo.

In caso di mancato pagamento anche dopo il decreto, avviamo le procedure esecutive: pignoramento di beni mobili, immobili o crediti (stipendio, conto corrente). Assistiamo anche nella gestione dei crediti in procedure concorsuali (fallimenti, concordati) e nella tutela dei creditori in sede di ristrutturazione del debito.`,
    expertise: [
      {
        title: 'Diffide di pagamento',
        slug: 'diffide-di-pagamento',
        icon: 'MailWarning',
        description: `Una diffida di pagamento ben scritta può sbloccare il credito già prima della causa. Non si tratta di una semplice email di sollecito, ma di un atto strutturato che ricostruisce il rapporto, quantifica il dovuto, assegna un termine e mette la controparte davanti a una scelta chiara, su basi giuridicamente ordinate.

Assistiamo imprese, professionisti e privati di Milano e della Lombardia nella predisposizione di diffide calibrate sul tipo di debitore e sulla documentazione disponibile. Una diffida ben impostata non serve solo a chiedere il pagamento, ma anche a preparare con metodo la fase successiva se il debitore continua a non adempiere.`,
        faq: [
          {
            question: "La diffida di pagamento serve davvero?",
            answer: `Sì, in molti casi è il passaggio che sblocca la situazione perché formalizza la richiesta in modo chiaro e credibile. Inoltre consente di mettere ordine nella documentazione e di preparare un eventuale seguito giudiziale con una posizione già definita e più forte.`,
          },
          {
            question: "Dopo quanti giorni dalla diffida posso agire legalmente?",
            answer: `Dipende dal rapporto sottostante e dal termine assegnato nella diffida. Proprio per questo è importante impostarla correttamente: un termine ben calibrato evita sia di perdere tempo inutilmente sia di muoversi in modo prematuro, senza aver costruito bene il passaggio precedente.`,
          },
        ],
      },
      {
        title: 'Decreti ingiuntivi',
        slug: 'decreti-ingiuntivi',
        icon: 'Stamp',
        description: `Se il credito è ben documentato, il decreto ingiuntivo può accelerare in modo concreto il recupero. Assistiamo clienti milanesi e lombardi nella verifica dei presupposti, nella raccolta della prova scritta e nella predisposizione del ricorso, con attenzione alla solidità documentale della pretesa e alla convenienza effettiva dello strumento.

Il decreto ingiuntivo è particolarmente utile per fatture non pagate, compensi professionali, canoni, somme dovute in forza di contratti o riconoscimenti di debito. Prima di procedere è però essenziale capire se il credito sia davvero liquido, esigibile e dimostrabile, così da evitare rigetti, opposizioni prevedibili o iniziative poco produttive.`,
        faq: [
          {
            question: "Quali documenti servono per chiedere un decreto ingiuntivo?",
            answer: `Servono documenti idonei a dimostrare seriamente il credito, come contratti, fatture, estratti, ordini, riconoscimenti di debito o altra prova scritta rilevante. Una verifica preliminare della documentazione serve proprio a capire se il ricorso sia sostenibile e con quale livello di rischio di opposizione. Capirlo prima evita di investire tempo e costi in un ricorso che potrebbe nascere già debole.`,
          },
          {
            question: "Quanto tempo ci vuole per un decreto ingiuntivo?",
            answer: `I tempi possono variare in base all'ufficio competente, al tipo di credito e alla completezza della documentazione. Una pratica ben preparata riduce però ritardi ed eccezioni evitabili e consente al cliente di farsi un'idea più realistica del percorso successivo, anche in caso di opposizione. Nei crediti documentati bene, la velocità dipende spesso più dalla qualità dell'impostazione iniziale che dal solo rito utilizzato.`,
          },
        ],
      },
      {
        title: 'Procedure esecutive',
        slug: 'procedure-esecutive',
        icon: 'Gavel',
        description: `Il vero recupero del credito inizia quando si valuta come trasformare il titolo in pagamento effettivo. Assistiamo nella fase esecutiva scegliendo la strategia più adatta in base al profilo del debitore, al valore del credito e alla concreta possibilità di recupero. Per imprese e professionisti di Milano questa fase è decisiva, perché agire senza una verifica preventiva può significare spendere tempo e costi su un debitore incapiente o difficilmente aggredibile.

La procedura esecutiva richiede coordinamento tra titolo, precetto, notifiche e scelta dei beni o crediti da colpire. Valutiamo anche soluzioni parallele, come accordi di rientro o transazioni, quando l'esecuzione integrale rischia di essere lunga, costosa o poco produttiva rispetto all'obiettivo economico del cliente.`,
        faq: [
          {
            question: "Quando si può iniziare una procedura esecutiva?",
            answer: `Si può valutare quando esiste un titolo esecutivo e il debitore non adempie spontaneamente. Prima di partire è però essenziale verificare se vi siano beni o crediti aggredibili, così da non trasformare il diritto riconosciuto in un'azione costosa ma solo teorica.`,
          },
          {
            question: "Conviene sempre fare esecuzione dopo il decreto ingiuntivo?",
            answer: `Non sempre. Dipende dalla situazione patrimoniale del debitore e dalla probabilità concreta di recupero. Una strategia efficace parte dalla convenienza reale e non dall'automatismo: in alcuni casi è preferibile negoziare, in altri procedere subito con gli strumenti esecutivi più mirati.`,
          },
        ],
      },
      {
        title: 'Pignoramenti',
        slug: 'pignoramenti',
        icon: 'Lock',
        description: `Il pignoramento è efficace solo se colpisce il bene o il credito giusto. Assistiamo i creditori nella scelta del pignoramento più utile e i debitori nella verifica della regolarità degli atti e delle possibili difese, con un approccio orientato al risultato concreto e non a iniziative standard replicate senza analisi.

La scelta non dovrebbe mai essere generica. A Milano, dove le posizioni debitorie possono essere articolate e multilivello, è importante capire dove concentrare l'azione, quali costi aspettarsi e quali margini esistano per accordi, opposizioni o ridimensionamento dell'iniziativa esecutiva.`,
        faq: [
          {
            question: "Si può pignorare il conto corrente o lo stipendio?",
            answer: `In molti casi sì, ma la strategia dipende dal titolo disponibile, dal tipo di debitore e dai limiti applicabili. Prima di procedere è utile capire quale forma di pignoramento abbia maggiori probabilità di produrre un recupero effettivo e proporzionato ai costi dell'azione.`,
          },
          {
            question: "Come posso difendermi da un pignoramento?",
            answer: `Occorre esaminare subito gli atti ricevuti e verificare se vi siano irregolarità, somme contestabili o margini per un accordo. Nella fase esecutiva il fattore tempo è decisivo: una reazione rapida consente di valutare con lucidità se opporsi, trattare o contenere gli effetti dell'iniziativa.`,
          },
        ],
      },
      {
        title: 'Crediti in procedure concorsuali',
        slug: 'crediti-in-procedure-concorsuali',
        icon: 'FolderSearch',
        description: `Quando il debitore entra in crisi, il recupero del credito cambia regole e richiede mosse tempestive. Assistiamo creditori e professionisti nella verifica del titolo, nella predisposizione delle domande e nella tutela della propria posizione all'interno della procedura, con attenzione a termini, documenti e grado di soddisfazione realisticamente atteso.

In questi scenari è fondamentale agire con metodo: capire la fase della procedura, la natura del credito e gli adempimenti richiesti evita errori formali e perdite di priorità. Per un creditore di Milano, questo significa trasformare una situazione apparentemente bloccata in una strategia ordinata e più consapevole.`,
        faq: [
          {
            question: "Cosa devo fare se il mio debitore è in fallimento o in procedura concorsuale?",
            answer: `La prima cosa è verificare subito la procedura in corso e la documentazione del credito. In questi casi non si può improvvisare: termini, forme e corretto inquadramento della pretesa incidono direttamente sulla possibilità di essere ammessi e tutelati in modo efficace.`,
          },
          {
            question: "Posso recuperare qualcosa anche se l'azienda debitrice è insolvente?",
            answer: `Dipende dal tipo di procedura, dalla natura del credito e dall'attivo disponibile. Non sempre il recupero è pieno, ma una gestione corretta della domanda è essenziale per non perdere opportunità o priorità e per capire in modo realistico quale soddisfazione si possa attendere.`,
          },
        ],
      },
    ],
    metaTitle: 'Recupero Crediti Milano | Studio Legale Zanchi',
    metaDescription:
      'Recupero crediti professionale a Milano per imprese e privati. Diffide, decreti ingiuntivi e procedure esecutive rapide ed efficaci. Studio Legale Zanchi.',
  }

];
