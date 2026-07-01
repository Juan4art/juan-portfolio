import { ref, computed } from 'vue'

const lang = ref('it')

const translations = {
  en: {
    // ── App header ──
    headerSubtitle: 'Creative Developer & Designer',

    // ── Nav ──
    navHome:  'Home',
    navWork:  'Work',
    navAbout: 'About',
    navExplore: 'Explore',

    // ── Home hero ──
    taglineTitle: 'Crafting digital experiences',
    taglineSub:   'Merging code and design to build things that wow.',
    heroCollection: 'Collection of Visual Works',
    heroBlustoodio: 'Blustoodio // 2026',
    heroScroll: 'Scroll to Explore',
    heroHover: 'Hover to Explore',
    heroPlaying: 'PLAYING',
    panelAbout: 'About Me',
    panelMusic: 'My Playlist',
    unknown: 'Unknown',
    noTrack: 'No Track',

    // ── Back link ──
    backHome: 'Back to Home',
    viewProject: 'View Project',

    // ── Categories ──
    poemTitle: 'The Matrix Poem',
    poemQuote: '"A poignant text exploring social isolation, inner resistance, and the repression of human fragilities. This poem acts as the generative source for all subsequent visual derivations."',
    viewGallery: 'View Gallery',
    exploreProject: 'Explore Project',
    categories: {
      'creative-direction': {
        title: 'freestyle',
        description: 'Guiding the creative vision — from concept to final delivery across all touchpoints.',
        items: [
          { title: 'JAZZ — Poster Series',     tag: 'Poster', desc: 'Illustrated poster for a Parisian jazz event. Neon typography and nocturnal composition.', gallery: ['/images/Jazz3.webp', '/images/Jazz2.webp', '/images/Jazz1.webp'] },
          { title: 'Solene — Film Poster',      tag: 'Film',    desc: 'Photo shooting and post-production for the horror movie poster campaign \'Solene\'.', gallery: ['/images/Solene1.webp', '/images/Solene2.webp', '/images/Solene3.webp', '/images/Solene4.webp'] },
          { title: 'Poster Brutalista — Series',     tag: 'Editorial',    desc: 'Brutalist poster series on philosophical and cultural themes.', gallery: ['/images/GD_brutalista1.webp', '/images/GD_brutalista2.webp', '/images/GD_brutalista3.webp', '/images/GD_brutalista4.webp', '/images/GD_brutalista5.webp'] },
          { title: 'Fragments d\'un Tapis Amoureux', tag: 'Exhibition', desc: 'Illustrated posters and visual research for the LABA & MITA exhibition. Imaginary maps on the Silk Road.', gallery: ['/images/Tapis1.webp', '/images/Tapis4.webp', '/images/Tapis3.webp'] },
          { title: 'Playing Cards', tag: 'Illustration', desc: 'Custom illustrated playing cards design.', gallery: ['/images/Carte_1.webp', '/images/Carte_2.webp'] },
          { title: '3D Art & Characters', tag: '3D Design', desc: 'A collection of 3D characters, environments and experimental renders.', gallery: ['/images/3D_1.webp', '/images/3D_2.webp', '/images/3D_3.webp', '/images/3D_4.webp', '/images/3D_5.webp', '/images/3D_6.webp', '/images/3D_7.webp', '/images/3D_8.webp', '/images/3D_9.webp', '/images/3D_10.webp', '/images/3D_11.webp', '/images/3D_12.webp', '/images/3D_13.webp', '/images/3D_14.webp', '/images/3D_15.webp', '/images/3D_16.webp'] },
          { title: 'MF DOOM Restyling', tag: 'Mockup', desc: 'Vinyl record packaging restyling concept for MF DOOM.', gallery: ['/images/Doom_1.webp'] },
          { title: 'Funny Tofu', tag: 'Animation', desc: '3D character animation render.', gallery: ['/images/FunnyTofu.mp4'] },
          { title: 'Funny Typo', tag: 'Motion', desc: 'Experimental typography motion design.', gallery: ['/images/FunnyTypo.mp4'] },
          { title: 'Self Portrait Poster', tag: 'Poster', desc: 'Graphic design self portrait poster.', gallery: ['/images/Poster_1.webp'] },
        ],
      },
      'photography': {
        title: 'Photography',
        description: 'Capturing moments and moods — editorial, architectural, and portrait photography.',
        items: [
          { title: 'Live Music Portraits', tag: 'Portrait', desc: 'Concert and live music portrait photography capturing the raw energy.', gallery: ['/images/Concert4.webp', '/images/Concert3.webp', '/images/Concert2.webp'] },
          { title: 'Motorcycle Series',       tag: 'Action',     desc: 'Dynamic action shots of motorcycles in motion.', gallery: ['/images/Moto1.webp', '/images/Moto2.webp', '/images/Moto3.webp', '/images/Moto4.webp', '/images/Moto5.webp', '/images/Raticosa1.webp'] },
          { title: 'Studio Sessions',   tag: 'Studio',  desc: 'Professional studio photography sessions with controlled lighting.', gallery: ['/images/Snickers19.webp', '/images/Snickers3.webp'] },
          { title: 'Personal Portraits', tag: 'Portrait', desc: 'Personal portrait sessions and close-ups.', gallery: ['/images/Portrait1.webp', '/images/Portrait2.webp'] },
        ],
      },
      'branding': {
        title: 'Brand design',
        description: 'Building memorable brand identities <br> — strategy, visual systems, and guidelines.',
        items: [
          { title: 'Snickers — Luxury Rebrand', tag: 'Rebranding', desc: 'Luxury rebrand concept for Snickers. Stationery, packaging, and editorial layout.', cover: '/images/Snickers7.webp', gallery: ['/images/Snickers20.webp', '/images/Snickers21.webp', '/images/Snickers26.webp', '/images/Snickers25.webp', '/images/Snickers18.webp', '/images/Snickers24.webp', '/images/Snickers17.webp', '/images/Snickers22.webp', '/images/Snickers19.webp', '/images/Snickers7.webp', '/images/Snickers1.webp', '/images/Snickers23.webp'] },
          { title: 'Piccola Orchestra Materana',       tag: 'Packaging', desc: 'Art direction and packaging for the CD. Custom freehand lettering.', gallery: ['/images/Matera1.webp', '/images/Matera2.webp', '/images/Matera3.webp', '/images/Matera4.webp', '/images/Matera5.webp'] },
          { title: 'Nevia a Giorni Scalzi',        tag: 'Music',  desc: 'Cover, CD and vinyl for the album \'Giorni Scalzi\' by Nevia.', gallery: ['/images/GiorniScalzi1.webp', '/images/GiorniScalzi2.webp', '/images/GiorniScalzi3.webp', '/images/NeviaVIP.png'] },
        ],
      },
      'publishings': {
        title: 'publishing',
        description: 'Curated editorial projects — books, zines, and digital publications.',
        items: [
          { 
            title: 'Testo & Specchio - Matrix Project', 
            tag: 'Multi-disciplinary', 
            desc: 'An overarching project derived from a poignant poem exploring mental suffering, expressed through multiple visual mediums.', 
            cover: '/images/Faro4.webp', 
            subProjects: [
              { 
                title: 'Walls — Selene Vexley', 
                tag: 'Book', 
                desc: 'A standalone dystopian novel exploring social isolation, inner resistance, and mental health under a totalitarian regime, expanding directly on the themes of suppressed human emotions.', 
                extendedDesc: 'Walls follows the story of Raven Kael, a twenty-year-old trapped in a dystopian regime ruled by artificial intelligence and a \'Ministry of Wellness\'. In this world, psychological distress is \'cured\' through brutal isolation programs designed to suppress any rebellion. Confined to a sterile room with nothing but a bed, a desk, and a razor blade, Raven undergoes a treatment aimed at stripping away her humanity.\n\nHowever, upon discovering a secret resistance network, Raven embarks on a dual struggle: one against the regime\'s oppression and a much harder one against her own inner demons and depression. The story culminates in an ambiguous ending where Raven escapes government control, but her healing remains partial, leaving a fundamental question open: can one truly be free when still a prisoner of one\'s own mind? Walls is a profound reflection on social control and inner resistance.',
                cover: '/images/WallsFront.webp', 
                gallery: ['/images/Walls1.webp'] 
              },
              { 
                title: 'Il Faro del Popolo', 
                tag: 'Newspaper', 
                desc: 'The fictional newspaper layout design originating from the matrix poem.', 
                extendedDesc: 'The project is born from the idea of representing a totalitarian dystopian regime, inspired by models like George Orwell\'s 1984. A central power rigidly controls the population through pervasive surveillance, propaganda, and censorship, suffocating any form of dissent and watching over any rebel cell. The State machine appears omnipresent: newspapers, radio, cinema, and even the daily life of citizens are permeated by a celebratory language that constantly praises the imposed order and discipline. Within this context, "Il Faro" is born, the official newspaper of the regime. The one I created, however, is a faithful copy of it, complete with propaganda articles, economic news, and civic life announcements. In reality, behind the lines and in the folds of the texts hides a coded language, made of metaphors, acrostics, keywords, and symbols that only the Resistance can decipher. The newspaper thus has a dual function: for the regime it is yet another tool of self-promotion and information control, but for the rebels it becomes a clandestine means to coordinate, spread instructions, and feed the hope of a free future. Every article, seemingly innocuous, hides practical indications, signals, or messages that help the rebel cells communicate with each other without arousing suspicion. The concept is therefore based on this contrast: an official and celebratory medium, transformed into a silent weapon against the power that created it. A newspaper that, like a paper palimpsest, shows the surface of propaganda, but guards in its folds the true lifeblood of freedom.',
                cover: '/images/Faro1.webp', 
                previewBg: 'bg-[#f4f4f0]',
                gallery: ['/images/Faro1.webp', '/images/Faro2.webp', '/images/Faro3.webp', '/images/Faro4.webp'] 
              },
              { 
                title: 'Nevia a Giorni Scalzi', 
                tag: 'Vinyl', 
                desc: 'Cover, CD and vinyl for the album "Giorni Scalzi" by Nevia, serving as the musical embodiment of the project.', 
                extendedDesc: 'Nevia is a new voice in the Italian indie scene, capable of transforming the fragilities and anger of new generations into music that heals and ignites. In her lyrics, everyday poetry and social critique coexist to give a voice to those who have none; dreams and sunsets mix with the fear and reality of not making ends meet, the fear of leaving the house, the fear of war, and the general indifference of society.\n\nNevia\'s weapon is her pen: direct, strong yet delicate. Nevia doesn\'t just want to speak for herself, nor shine for others if that light doesn\'t truly warm: her music is an act of resistance, an attempt at collective rebirth. Her style evokes intimate and sincere indie pop, presenting herself as a sharp yet reassuring voice—a hug for the soul but a scream for the body.\n\nThe name Nevia holds a dual meaning for the artist: the most common etymology is Niveus, a Latin word meaning \'of snow\', \'shining like snow\', but there is also a second etymology from Nevus, meaning stain or mark. Nevia thus perfectly represents the dualism of her songs and her purpose: critique but also rebirth.',
                cover: '/images/GiorniScalzi1.webp', 
                gallery: ['/images/GiorniScalzi1.webp', '/images/GiorniScalzi2.webp', '/images/GiorniScalzi3.webp', '/images/NeviaVIP.png'] 
              }
            ]
          }
        ],
      },
    },

    // ── Work page ──
    workTitle:    'Work',
    workSubtitle: 'A selection of projects I\'m proud of.',
    projects: [
      { id: 0, title: 'Snickers — Luxury Rebrand',  category: 'Branding',  description: 'Luxury rebrand concept for Snickers. Stationery, packaging, and editorial layout.', tags: ['Rebranding', 'Packaging', 'Concept'] },
      { id: 1, title: 'Piccola Orchestra Materana',  category: 'Music',  description: 'Art direction and packaging for the CD. Custom freehand lettering.', tags: ['Graphic Design', 'Packaging', 'Lettering'] },
      { id: 2, title: 'JAZZ — Poster Series',    category: 'Editorial',     description: 'Illustrated poster for a Parisian jazz event. Neon typography and nocturnal composition.', tags: ['Poster', 'Typography', 'Illustration'] },
      { id: 3, title: 'Nevia a Giorni Scalzi',  category: 'Music',      description: 'Cover, CD and vinyl for the album \'Giorni Scalzi\' by Nevia.', tags: ['Cover Art', 'Vinyl', 'CD'] },
      { id: 4, title: 'Solene — Film Poster', category: 'Film',   description: 'Photo shooting and post-production for the horror movie poster campaign \'Solene\'.', tags: ['Photography', 'Post-production', 'Poster'] },

    ],

    // ── About page ──
    aboutTitle:   'Hello, I\'m Juan',
    aboutBio:     'I\'m a passionate developer and designer focused on building interactive and visually stunning web applications. I bridge the gap between aesthetics and performance — every pixel and every millisecond matters.',
    aboutToolkit: 'Toolkit',
    aboutConnect: 'Let\'s connect',
    aboutText: {
      expTitle: 'Experience',
      expRole: 'Freelancer Graphic Designer',
      expDate: 'Since 2022',
      eduTitle: 'Education',
      eduDegree: 'Degree in Graphic Design and Communication at LABA',
      eduSchool: 'Libera Accademia di Belle Arti, Brescia',
      eduDate: '2022-2026',
      progTitle: 'Programs',
      progExpert: 'Expert',
      progProficient: 'Proficient',
      progIntermediate: 'Intermediate',
      langTitle: 'Languages',
      langItalian: 'Italian',
      langNative: 'Native',
      langEnglish: 'English',
      langC1: 'C1',
      langSpanish: 'Spanish',
      langB2: 'B2'
    }
  },

  it: {
    // ── App header ──
    headerSubtitle: 'Sviluppatore Creativo & Designer',

    // ── Nav ──
    navHome:  'Home',
    navWork:  'Lavori',
    navAbout: 'Chi Sono',
    navExplore: 'Esplora',

    // ── Home hero ──
    taglineTitle: 'Creo esperienze digitali',
    taglineSub:   'Unendo codice e design per creare cose che stupiscono.',
    heroCollection: 'Collezione di Opere Visive',
    heroBlustoodio: 'Blustoodio // 2026',
    heroScroll: 'Scorri per Esplorare',
    heroHover: 'Tocca per Esplorare',
    heroPlaying: 'IN RIPRODUZIONE',
    panelAbout: 'Chi Sono',
    panelMusic: 'La Mia Playlist',
    unknown: 'Sconosciuto',
    noTrack: 'Nessuna Traccia',

    // ── Back link ──
    backHome: 'Torna alla Home',
    viewProject: 'Vedi Progetto',

    // ── Categories ──
    poemTitle: 'La Poesia Matrice',
    poemQuote: `"Un testo struggente che esplora l'isolamento sociale, la resistenza interiore e la repressione delle fragilità umane. Questa poesia funge da sorgente generativa per tutte le seguenti declinazioni visive."`,
    viewGallery: 'Vedi Galleria',
    exploreProject: 'Esplora Progetto',
    categories: {
      'creative-direction': {
        title: 'freestyle',
        description: 'Guidare la visione creativa — dal concept alla consegna finale su tutti i touchpoint.',
        items: [
          { title: 'JAZZ — Poster Series',          tag: 'Poster',  desc: 'Poster illustrato per un evento jazz parigino. Tipografia a insegna luminosa e composizione notturna con musicisti sui balconi.', gallery: ['/images/Jazz3.webp', '/images/Jazz2.webp', '/images/Jazz1.webp'] },
          { title: 'Solene — Film Poster',       tag: 'Film',    desc: 'Shooting fotografico e post-produzione per la campagna poster del film horror \'Solene\'.', gallery: ['/images/Solene1.webp', '/images/Solene2.webp', '/images/Solene3.webp', '/images/Solene4.webp'] },
          { title: 'Poster Brutalista — Series',         tag: 'Editorial',     desc: 'Serie di poster in stile brutalista su temi filosofici e culturali.', gallery: ['/images/GD_brutalista1.webp', '/images/GD_brutalista2.webp', '/images/GD_brutalista3.webp', '/images/GD_brutalista4.webp', '/images/GD_brutalista5.webp'] },
          { title: 'Fragments d\'un Tapis Amoureux', tag: 'Exhibition', desc: 'Poster illustrati e ricerca visiva per la mostra LABA & MITA. Mappe immaginarie sulla via della seta.', gallery: ['/images/Tapis1.webp', '/images/Tapis4.webp', '/images/Tapis3.webp'] },
          { title: 'Carte da Gioco', tag: 'Illustration', desc: 'Illustrazioni custom per carte da gioco.', gallery: ['/images/Carte_1.webp', '/images/Carte_2.webp'] },
          { title: '3D Art & Personaggi', tag: '3D Design', desc: 'Una collezione di personaggi 3D, ambientazioni e render sperimentali.', gallery: ['/images/3D_1.webp', '/images/3D_2.webp', '/images/3D_3.webp', '/images/3D_4.webp', '/images/3D_5.webp', '/images/3D_6.webp', '/images/3D_7.webp', '/images/3D_8.webp', '/images/3D_9.webp', '/images/3D_10.webp', '/images/3D_11.webp', '/images/3D_12.webp', '/images/3D_13.webp', '/images/3D_14.webp', '/images/3D_15.webp', '/images/3D_16.webp'] },
          { title: 'MF DOOM Restyling', tag: 'Mockup', desc: 'Concept di restyling per il vinile di MF DOOM.', gallery: ['/images/Doom_1.webp'] },
          { title: 'Funny Tofu', tag: 'Animation', desc: 'Animazione 3D character design.', gallery: ['/images/FunnyTofu.mp4'] },
          { title: 'Funny Typo', tag: 'Motion', desc: 'Motion design sperimentale tipografico.', gallery: ['/images/FunnyTypo.mp4'] },
          { title: 'Self Portrait Poster', tag: 'Poster', desc: 'Poster grafico autoritratto.', gallery: ['/images/Poster_1.webp'] },
        ],
      },
      'photography': {
        title: 'Fotografia',
        description: 'Catturare momenti e atmosfere — fotografia editoriale, architettonica e di ritratto.',
        items: [
          { title: 'Ritratti Live Music',    tag: 'Ritratto', desc: 'Fotografia di concerti e ritratti musicali dal vivo catturando l\'energia cruda.', gallery: ['/images/Concert4.webp', '/images/Concert3.webp', '/images/Concert2.webp'] },
          { title: 'Serie Motociclette',           tag: 'Action',     desc: 'Scatti dinamici d\'azione di motociclette in movimento.', gallery: ['/images/Moto1.webp', '/images/Moto2.webp', '/images/Moto3.webp', '/images/Moto4.webp', '/images/Moto5.webp', '/images/Raticosa1.webp'] },
          { title: 'Sessioni in Studio',   tag: 'Studio', desc: 'Sessioni fotografiche professionali in studio con illuminazione controllata.', gallery: ['/images/Snickers19.webp', '/images/Snickers3.webp'] },
          { title: 'Ritratti Personali',     tag: 'Ritratto', desc: 'Sessioni di ritratto personale e primi piani.', gallery: ['/images/Portrait1.webp', '/images/Portrait2.webp'] },
        ],
      },
      'branding': {
        title: 'Brand design',
        description: 'Costruire identità di marca memorabili <br> — strategia, sistemi visivi e linee guida.',
        items: [
          { title: 'Snickers — Luxury Rebrand', tag: 'Rebranding', desc: 'Concept per il rebrand di lusso di Snickers. Immagine coordinata, packaging e layout editoriale.', cover: '/images/Snickers7.webp', gallery: ['/images/Snickers20.webp', '/images/Snickers21.webp', '/images/Snickers26.webp', '/images/Snickers25.webp', '/images/Snickers18.webp', '/images/Snickers24.webp', '/images/Snickers17.webp', '/images/Snickers22.webp', '/images/Snickers19.webp', '/images/Snickers7.webp', '/images/Snickers1.webp', '/images/Snickers23.webp'] },
          { title: 'Piccola Orchestra Materana',          tag: 'Packaging', desc: 'Art direction e packaging per il CD della Piccola Orchestra. Lettering custom a mano libera.', gallery: ['/images/Matera1.webp', '/images/Matera2.webp', '/images/Matera3.webp', '/images/Matera4.webp', '/images/Matera5.webp'] },
          { title: 'Nevia a Giorni Scalzi',            tag: 'Musica',   desc: 'Copertina, CD e vinile per l\'album \'Giorni Scalzi\' di Nevia.', gallery: ['/images/GiorniScalzi1.webp', '/images/GiorniScalzi2.webp', '/images/GiorniScalzi3.webp', '/images/NeviaVIP.png'] },
        ],
      },
      'publishings': {
        title: 'Editoria',
        description: 'Progetti editoriali curati — libri, zine e pubblicazioni digitali.',
        items: [
          { 
            title: 'Testo & Specchio - Progetto Matrice', 
            tag: 'Multidisciplinare', 
            desc: 'Un macro-progetto derivato da una poesia sulla sofferenza mentale, esplorato attraverso molteplici forme visive e mediatiche.', 
            cover: '/images/Faro4.webp', 
            subProjects: [
              { 
                title: 'Walls — Selene Vexley', 
                tag: 'Libro', 
                desc: 'Un romanzo distopico che esplora temi di isolamento sociale, resistenza interiore e salute mentale sotto un regime totalitario, espandendo direttamente i concetti di repressione della poesia originale.', 
                extendedDesc: 'Walls segue la storia di Raven Kael, una ventenne intrappolata in un regime distopico governato da un\'intelligenza artificiale e dal \'Ministero del Benessere\'. In questo mondo, il disagio psicologico viene \'curato\' attraverso brutali programmi di isolamento per sopprimere ogni ribellione. Confinata in una stanza sterile con nient\'altro che un letto, una scrivania e una lametta, Raven è sottoposta a un trattamento che mira a svuotarla della sua umanità.\n\nTuttavia, scoprendo una rete di resistenza segreta, Raven intraprende una duplice lotta: una contro l\'oppressione del regime e una, ben più ardua, contro i propri demoni interiori e la depressione. La storia culmina in un finale ambiguo in cui Raven sfugge al controllo governativo, ma la sua guarigione resta parziale, lasciando aperta una domanda fondamentale: si può essere davvero liberi se si resta prigionieri della propria mente? Walls è una profonda riflessione sul controllo sociale e sulla resistenza interiore.',
                cover: '/images/WallsFront.webp', 
                gallery: ['/images/Walls1.webp'] 
              },
              { 
                title: 'Il Faro del Popolo', 
                tag: 'Giornale', 
                desc: 'Impaginazione e design del quotidiano fittizio originato dalla poesia matrice.', 
                extendedDesc: 'Il progetto nasce dall\'idea di rappresentare un regime distopico totalitario, ispirato a modelli come quello descritto da George Orwell in 1984. Un potere centrale controlla rigidamente la popolazione attraverso sorveglianza capillare, propaganda e censura, soffocando ogni forma di dissenso e vigilando su qualsiasi cellula ribelle. La macchina dello Stato appare come onnipresente: giornali, radio, cinema e perfino la vita quotidiana dei cittadini sono permeati da un linguaggio celebrativo che elogia costantemente l\'ordine e la disciplina imposta. All\'interno di questo contesto nasce "Il Faro", giornale ufficiale del regime. Quella da me realizzata però è una copia fedele di esso, completa di articoli di propaganda, notizie economiche e annunci di vita civile. In realtà, dietro le righe e nelle pieghe dei testi si nasconde un linguaggio in codice, fatto di metafore, acrostici, parole chiave e simboli che solo la Resistenza è in grado di decifrare. Il giornale ha dunque una doppia funzione: per il regime è l\'ennesimo strumento di auto-promozione e di controllo dell\'informazione, ma per i ribelli diventa un mezzo clandestino per coordinarsi, diffondere istruzioni e alimentare la speranza di un futuro libero. Ogni articolo, apparentemente innocuo, cela indicazioni pratiche, segnali o messaggi che aiutano le cellule ribelli a comunicare tra loro senza destare sospetti. Il concept si fonda quindi su questo contrasto: un mezzo ufficiale e celebrativo, trasformato in arma silenziosa contro il potere che lo ha creato. Un giornale che, come un palinsesto di carta, mostra la superficie della propaganda, ma custodisce nelle sue pieghe la vera linfa della libertà.',
                cover: '/images/Faro1.webp', 
                previewBg: 'bg-[#f4f4f0]',
                gallery: ['/images/Faro1.webp', '/images/Faro2.webp', '/images/Faro3.webp', '/images/Faro4.webp'] 
              },
              { 
                title: 'Nevia a Giorni Scalzi', 
                tag: 'Vinile', 
                desc: 'Copertina, CD e vinile per l\'album "Giorni Scalzi" di Nevia, che funge da incarnazione musicale e uditiva dell\'intero progetto.', 
                extendedDesc: 'Nevia è una nuova voce della scena indie italiana, capace di trasformare le fragilità e la rabbia delle nuove generazioni in musica che cura e accende. Nei suoi testi la poesia quotidiana e la denuncia sociale convivono per dare voce a chi non ne ha, sogni e tramonti si mischiano alla paura e realtà di non riuscire ad arrivare a fine mese, alla paura di uscire di casa, la paura della guerra e dell\'indifferenza generale della società.\n\nL\'arma di Nevia è la sua penna, diretta, forte ma delicata. Nevia non vuole solo parlare per sè, non vuole brillare per gli altri se quella luce non scalda davvero: la sua musica è atto di resistenza, tentativo di rinascita collettiva. Il suo stile richiama il pop indie intimo e sincero, per proporsi come voce tagliente ma allo stesso tempo rassicurante, un abbraccio per l\'anima ma un grido per il corpo.\n\nIl nome Nevia ha un doppio valore per l\'artista: l\'etimologia più comune è Niveus, parola latina che significa \'di neve\', \'splendente come la neve\', è però esistente anche una seconda etimologia, ovvero da Nevus, il cui significato è quello di macchia, segno. Nevia rappresenta perfettamente quindi il dualismo delle sue canzoni, del suo scopo, denuncia ma anche rinascita.',
                cover: '/images/GiorniScalzi1.webp', 
                gallery: ['/images/GiorniScalzi1.webp', '/images/GiorniScalzi2.webp', '/images/GiorniScalzi3.webp', '/images/NeviaVIP.png'] 
              }
            ]
          }
        ],
      },
    },

    // ── Work page ──
    workTitle:    'Lavori',
    workSubtitle: 'Una selezione di progetti di cui vado fiero.',
    projects: [
      { id: 0, title: 'Snickers — Luxury Rebrand',  category: 'Branding',  description: 'Concept per il rebrand di lusso di Snickers. Immagine coordinata, packaging e layout editoriale.', tags: ['Rebranding', 'Packaging', 'Concept'] },
      { id: 1, title: 'Piccola Orchestra Materana',  category: 'Musica',  description: 'Art direction e packaging per il CD. Lettering custom a mano libera.', tags: ['Graphic Design', 'Packaging', 'Lettering'] },
      { id: 2, title: 'JAZZ — Poster Series',    category: 'Editoria',     description: 'Poster illustrato per un evento jazz parigino. Tipografia a insegna luminosa.', tags: ['Poster', 'Typography', 'Illustration'] },
      { id: 3, title: 'Nevia a Giorni Scalzi',  category: 'Musica',      description: 'Copertina, CD e vinile per l\'album \'Giorni Scalzi\' di Nevia.', tags: ['Cover Art', 'Vinyl', 'CD'] },
      { id: 4, title: 'Solene — Film Poster', category: 'Film',   description: 'Shooting fotografico e post-produzione per la campagna poster del film horror \'Solene\'.', tags: ['Photography', 'Post-production', 'Poster'] },

    ],

    // ── About page ──
    aboutTitle:   'Ciao, sono Juan',
    aboutBio:     'Sono uno sviluppatore e designer appassionato, concentrato sulla creazione di applicazioni web interattive e visivamente straordinarie. Unisco estetica e performance — ogni pixel e ogni millisecondo contano.',
    aboutToolkit: 'Strumenti',
    aboutConnect: 'Restiamo in contatto',
    aboutText: {
      expTitle: 'Esperienza',
      expRole: 'Graphic Designer Freelance',
      expDate: 'Dal 2022',
      eduTitle: 'Istruzione',
      eduDegree: 'Laurea in Graphic Design e Comunicazione presso LABA',
      eduSchool: 'Libera Accademia di Belle Arti, Brescia',
      eduDate: '2022-2026',
      progTitle: 'Programmi',
      progExpert: 'Esperto',
      progProficient: 'Competente',
      progIntermediate: 'Intermedio',
      langTitle: 'Lingue',
      langItalian: 'Italiano',
      langNative: 'Madrelingua',
      langEnglish: 'Inglese',
      langC1: 'C1',
      langSpanish: 'Spagnolo',
      langB2: 'B2'
    }
  },
}

export function useLang() {
  const t = computed(() => translations[lang.value])
  const toggleLang = () => { lang.value = lang.value === 'en' ? 'it' : 'en' }
  return { lang, t, toggleLang }
}
