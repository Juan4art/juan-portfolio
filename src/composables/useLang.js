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
        title: 'Freestyle',
        description: 'Guiding the creative vision — from concept to final delivery across all touchpoints.',
        items: [
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
        title: 'Fotografia',
        description: 'Capturing moments and moods — editorial, architectural, and portrait photography.',
        items: [
          { title: 'Live Music Portraits', tag: 'Concert', desc: 'Live concert photography and musical portraits capturing raw energy.', gallery: ['/images/Concert2.webp', '/images/Concert3.webp', '/images/Concert4.webp'] },
          { title: 'Studio Sessions',   tag: 'Studio',  desc: 'Professional studio photography sessions with controlled lighting.', gallery: ['/images/Snickers19.webp', '/images/Snickers3.webp', '/images/Snickers20.webp', '/images/Snickers21.webp', '/images/Snickers26.webp', '/images/Snickers25.webp', '/images/Snickers18.webp', '/images/Snickers24.webp', '/images/Snickers17.webp', '/images/Snickers22.webp', '/images/Snickers7.webp'] },
          { title: 'Personal Portraits', tag: 'Portrait', desc: 'Personal portrait sessions and close-ups.', gallery: ['/images/Portrait1.webp', '/images/Portrait2.webp'] },
          { title: 'Motorcycle Series',       tag: 'Action',     desc: 'Dynamic action shots of motorcycles in motion.', gallery: ['/images/Moto1.webp', '/images/Moto2.webp', '/images/Moto3.webp', '/images/Moto4.webp', '/images/Moto5.webp', '/images/Raticosa1.webp'] },
          { title: 'Disco Ranch', tag: 'Event', desc: 'Event photography for Disco Ranch.', gallery: ['/images/DiscoRanch_2.webp', '/images/DiscoRanch_4.webp', '/images/DiscoRanch_New.webp', '/images/DiscoRanch_5.webp', '/images/DiscoRanch_8.webp', '/images/DiscoRanch_9.webp', '/images/DiscoRanch_13.webp', '/images/DiscoRanch_15.webp'] },
        ],
      },
      'branding': {
        title: 'Art direction',
        description: 'Building memorable brand identities <br> — strategy, visual systems, and guidelines.',
        items: [
          { title: 'Adunata degli Alpini', tag: 'Identity', tagline: 'Visual identity for Adunata Nazionale Alpini 2027.', desc: '2nd place proposal for the logo design and visual identity of the Adunata Nazionale Alpini 2027 in Brescia. In collaboration with Fidani Elham and Bertani Annabella.', cover: '/images/Alpini_Brescia_4.webp', mobileVertical: true, gallery: ['/images/Alpini_Brescia_1.webp', '/images/Alpini_Brescia_2.webp', '/images/Alpini_Brescia_3.webp', '/images/Alpini_Brescia_4.webp', '/images/Alpini_Brescia_5.webp', '/images/Alpini_Brescia_6.webp', '/images/Alpini_Brescia_7.webp', '/images/Alpini_Brescia_8.webp', '/images/Alpini_Brescia_9.webp', '/images/Alpini_Brescia_10.webp', '/images/Alpini_Brescia_11.webp', '/images/Alpini_Brescia_12.webp', '/images/Alpini_Brescia_13.webp', '/images/Alpini_Brescia_14.webp', '/images/Alpini_Brescia_15.webp', '/images/Alpini_Brescia_16.webp', '/images/Alpini_Brescia_17.webp', '/images/Alpini_Brescia_18.webp', '/images/Alpini_Brescia_19.webp', '/images/Alpini_Brescia_20.webp', '/images/Alpini_Brescia_21.webp', '/images/Alpini_Brescia_22.webp', '/images/Alpini_Brescia_23.webp', '/images/Alpini_Brescia_24.webp', '/images/Alpini_Brescia_25.webp', '/images/Alpini_Brescia_26.webp', '/images/Alpini_Brescia_27.webp', '/images/Alpini_Brescia_28.webp', '/images/Alpini_Brescia_29.webp', '/images/Alpini_Brescia_30.webp', '/images/Alpini_Brescia_31.webp', '/images/Alpini_Brescia_32.webp', '/images/Alpini_Brescia_33.webp', '/images/Alpini_Brescia_34.webp', '/images/Alpini_Brescia_35.webp', '/images/Alpini_Brescia_36.webp', '/images/Alpini_Brescia_37.webp', '/images/Alpini_Brescia_38.webp', '/images/Alpini_Brescia_39.webp', '/images/Alpini_Brescia_40.webp', '/images/Alpini_Brescia_41.webp', '/images/Alpini_Brescia_42.webp', '/images/Alpini_Brescia_43.webp', '/images/Alpini_Brescia_44.webp', '/images/Alpini_Brescia_45.webp', '/images/Alpini_Brescia_46.webp', '/images/Alpini_Brescia_47.webp'] },
          { title: 'Borgo Castello', tag: 'Urban Communication', tagline: 'Urban regeneration for Borgo Castello.', desc: '2nd place in a national urban regeneration competition, with a collaborative proposal focused on the integration of environmental graphics, signage, and the enhancement of the Ligurian territory.', cover: '/images/BorgoCastello_Render_4.webp', mobileVertical: true, gallery: ['/images/BorgoCastello_Slide_1.webp', '/images/BorgoCastello_Slide_2.webp', '/images/BorgoCastello_Slide_3.webp', '/images/BorgoCastello_Slide_4.webp', '/images/BorgoCastello_Slide_5.webp', '/images/BorgoCastello_Slide_6.webp', '/images/BorgoCastello_Slide_7.webp', '/images/BorgoCastello_Render_4.webp', '/images/BorgoCastello_Render_Chiesa.webp', '/images/BorgoCastello_Mockup_1.webp', '/images/BorgoCastello_MOckup_2.webp', '/images/BorgoCastello_Render_3.webp', '/images/BorgoCastello_Render_5.webp', '/images/BorgoCastello_render_2.webp', '/images/BorgoCastello_Render_Tote_Bag.webp', '/images/BorgoCastello_Render_Felpa.webp', '/images/BorgoCastello_Render_Bottiglia.webp', '/images/BorgoCastello_Render_Gancio.webp'] },
          { title: 'Snickers — Luxury Rebrand', tag: 'Rebranding', tagline: 'Luxury rebrand concept for Snickers.', desc: 'Luxury rebrand concept for Snickers. Stationery, packaging, and editorial layout.', cover: '/images/Snickers7.webp', gallery: ['/images/Snickers20.webp', '/images/Snickers21.webp', '/images/Snickers26.webp', '/images/Snickers25.webp', '/images/Snickers18.webp', '/images/Snickers24.webp', '/images/Snickers17.webp', '/images/Snickers22.webp', '/images/Snickers19.webp', '/images/Snickers7.webp'] },
          { title: 'Piccola Orchestra Materana',       tag: 'Packaging', tagline: 'Art direction and packaging for the CD.', desc: 'Art direction and packaging for the CD. Custom freehand lettering.', gallery: ['/images/Matera1.webp', '/images/Matera2.webp', '/images/Matera3.webp', '/images/Matera5.webp'] },
          { title: 'HATE-IT, forget-it!', tag: 'Art Direction', tagline: 'An anti post-it against the modern world.', desc: 'We live in a society where everything must be filtered and moderated. We are taught to hide our anger and annoyance, but where does what we hold back go? HATE-IT is born as a gesture of liberation. It\'s an invitation to express what you hate, without fear or judgment: an \'anti post-it\' on which to deposit your thoughts. You can stick it, let it go, fix it outside yourself. A simple and cathartic act to move hatred from the body to the space.', cover: '/images/Preview_Hate_it.webp', gallery: ['/images/HateIt_img_20.webp', '/images/HateIt_img_21.webp', '/images/HateIt_img_22.webp', '/images/HateIt_img_23.webp', '/images/HateIt_img_24.webp', '/images/HateIt_img_25.webp', '/images/HateIt_img_26.webp', '/images/HateIt_img_27.webp', '/images/HateIt_img_28.webp', '/images/HateIt_img_29.webp', '/images/HateIt_img_30.webp'] },
          { title: 'Nevia a Giorni Scalzi',        tag: 'Music', tagline: 'Cover, CD and vinyl design for Nevia.', desc: 'Cover, CD and vinyl for the album \'Giorni Scalzi\' by Nevia.', gallery: ['/images/GiorniScalzi1.webp', '/images/GiorniScalzi2.webp', '/images/GiorniScalzi3.webp', '/images/NeviaVIP.png'] },
        ],
      },
      'publishings': {
        title: 'Editoria',
        description: 'Curated editorial projects — books, zines, and digital publications.',
        items: [
          {
            title: 'The Biome',
            tag: 'Magazine',
            desc: 'A university Graphic Design III project exploring environmentalism and our planet.',
            cover: '/images/eco/page-01.jpg',
            gallery: [
              '/images/eco/page-01.jpg', '/images/eco/page-02.jpg', '/images/eco/page-03.jpg', '/images/eco/page-04.jpg', '/images/eco/page-05.jpg', '/images/eco/page-06.jpg', '/images/eco/page-07.jpg', '/images/eco/page-08.jpg', '/images/eco/page-09.jpg', '/images/eco/page-10.jpg', '/images/eco/page-11.jpg', '/images/eco/page-12.jpg', '/images/eco/page-13.jpg', '/images/eco/page-14.jpg', '/images/eco/page-15.jpg', '/images/eco/page-16.jpg', '/images/eco/page-17.jpg', '/images/eco/page-18.jpg', '/images/eco/page-19.jpg', '/images/eco/page-20.jpg', '/images/eco/page-21.jpg', '/images/eco/page-22.jpg', '/images/eco/page-23.jpg', '/images/eco/page-24.jpg', '/images/eco/page-25.jpg', '/images/eco/page-26.jpg', '/images/eco/page-27.jpg', '/images/eco/page-28.jpg', '/images/eco/page-29.jpg', '/images/eco/page-30.jpg', '/images/eco/page-31.jpg', '/images/eco/page-32.jpg', '/images/eco/page-33.jpg', '/images/eco/page-34.jpg', '/images/eco/page-35.jpg', '/images/eco/page-36.jpg', '/images/eco/page-37.jpg', '/images/eco/page-38.jpg', '/images/eco/page-39.jpg', '/images/eco/page-40.jpg', '/images/eco/page-41.jpg', '/images/eco/page-42.jpg', '/images/eco/page-43.jpg', '/images/eco/page-44.jpg', '/images/eco/page-45.jpg', '/images/eco/page-46.jpg', '/images/eco/page-47.jpg', '/images/eco/page-48.jpg', '/images/eco/page-49.jpg', '/images/eco/page-50.jpg', '/images/eco/page-51.jpg', '/images/eco/page-52.jpg', '/images/eco/page-53.jpg', '/images/eco/page-54.jpg', '/images/eco/page-55.jpg', '/images/eco/page-56.jpg', '/images/eco/page-57.jpg', '/images/eco/page-58.jpg', '/images/eco/page-59.jpg', '/images/eco/page-60.jpg', '/images/eco/page-61.jpg', '/images/eco/page-62.jpg', '/images/eco/page-63.jpg', '/images/eco/page-64.jpg', '/images/eco/page-65.jpg', '/images/eco/page-66.jpg', '/images/eco/page-67.jpg', '/images/eco/page-68.jpg', '/images/eco/page-69.jpg', '/images/eco/page-70.jpg', '/images/eco/page-71.jpg', '/images/eco/page-72.jpg', '/images/eco/page-73.jpg', '/images/eco/page-74.jpg', '/images/eco/page-75.jpg', '/images/eco/page-76.jpg'
            ]
          },
          {
            title: 'The Walls Project',
            tag: 'Narrative Universe',
            desc: 'An overarching project exploring social isolation and inner resistance through multiple visual mediums: books and a newspaper.',
            cover: '/images/WallsFront.webp',
            isMacroProject: true,
            subProjects: [
              { 
                title: 'Walls — Selene Vexley', 
                tag: 'Book', 
                desc: 'A standalone dystopian novel exploring social isolation, inner resistance, and mental health under a totalitarian regime.', 
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
              }
            ]
          },
          {
            title: 'MITA - Fragments d\'un Tapis Amoureux',
            tag: 'Textile Design',
            desc: 'Textile design project selected among the best for the institutional exhibition/collaboration \'MITA FRAGMENTS D\'UN TAPIS AMOUREUX\', reinterpreting textile tradition in a contemporary key.',
            cover: '/images/MITA_carpet_cover.webp',
            gallery: ['/images/MITA_cover.webp', '/images/eco/page-62.jpg', '/images/eco/page-63.jpg', '/images/eco/page-64.jpg', '/images/eco/page-65.jpg', '/images/eco/page-66.jpg', '/images/eco/page-67.jpg', '/images/eco/page-68.jpg', '/images/eco/page-69.jpg']
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
      { id: 5, title: 'HATE-IT, forget-it!', category: 'Branding', description: 'An invite to express your hatred without fear or judgment. Write it on a HATE-IT — an anti post-it to physically detach from negative thoughts. A simple but cathartic act.', tags: ['Art Direction', 'Concept', 'Copywriting'] },
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
      langB2: 'B2',
      contactTitle: 'Contact',
      contactPhone: 'Phone: 3270746059',
      contactEmail: 'Email: juan.merla23@gmail.com',
      contactCity: 'Location: Brescia, Italy'
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
        title: 'Freestyle',
        description: 'Guidare la visione creativa — dal concept alla consegna finale su tutti i touchpoint.',
        items: [
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
          { title: 'Ritratti Live Music',   tag: 'Concerto', desc: 'Foto di concerti e ritratti musicali dal vivo catturando l\'energia cruda.', gallery: ['/images/Concert2.webp', '/images/Concert3.webp', '/images/Concert4.webp'] },
          { title: 'Sessioni in Studio',   tag: 'Studio', desc: 'Sessioni fotografiche professionali in studio con illuminazione controllata.', gallery: ['/images/Snickers19.webp', '/images/Snickers3.webp', '/images/Snickers20.webp', '/images/Snickers21.webp', '/images/Snickers26.webp', '/images/Snickers25.webp', '/images/Snickers18.webp', '/images/Snickers24.webp', '/images/Snickers17.webp', '/images/Snickers22.webp', '/images/Snickers7.webp'] },
          { title: 'Ritratti Personali',     tag: 'Ritratto', desc: 'Sessioni di ritratto personale e primi piani.', gallery: ['/images/Portrait1.webp', '/images/Portrait2.webp'] },
          { title: 'Serie Motociclette',           tag: 'Action',     desc: 'Scatti dinamici d\'azione di motociclette in movimento.', gallery: ['/images/Moto1.webp', '/images/Moto2.webp', '/images/Moto3.webp', '/images/Moto4.webp', '/images/Moto5.webp', '/images/Raticosa1.webp'] },
          { title: 'Disco Ranch',     tag: 'Evento', desc: 'Fotografia dell\'evento Disco Ranch.', gallery: ['/images/DiscoRanch_2.webp', '/images/DiscoRanch_4.webp', '/images/DiscoRanch_New.webp', '/images/DiscoRanch_5.webp', '/images/DiscoRanch_8.webp', '/images/DiscoRanch_9.webp', '/images/DiscoRanch_13.webp', '/images/DiscoRanch_15.webp'] },
        ],
      },
      'branding': {
        title: 'Art direction',
        description: 'Costruire identità di marca memorabili <br> — strategia, sistemi visivi e linee guida.',
        items: [
          { title: 'Adunata degli Alpini', tag: 'Identità', tagline: 'Identità visiva per Adunata Nazionale Alpini 2027.', desc: 'Proposta classificata al 2° posto per il logo e l\'identità visiva dell\'Adunata Nazionale Alpini 2027 a Brescia. In collaborazione con Fidani Elham e Bertani Annabella.', cover: '/images/Alpini_Brescia_4.webp', mobileVertical: true, gallery: ['/images/Alpini_Brescia_1.webp', '/images/Alpini_Brescia_2.webp', '/images/Alpini_Brescia_3.webp', '/images/Alpini_Brescia_4.webp', '/images/Alpini_Brescia_5.webp', '/images/Alpini_Brescia_6.webp', '/images/Alpini_Brescia_7.webp', '/images/Alpini_Brescia_8.webp', '/images/Alpini_Brescia_9.webp', '/images/Alpini_Brescia_10.webp', '/images/Alpini_Brescia_11.webp', '/images/Alpini_Brescia_12.webp', '/images/Alpini_Brescia_13.webp', '/images/Alpini_Brescia_14.webp', '/images/Alpini_Brescia_15.webp', '/images/Alpini_Brescia_16.webp', '/images/Alpini_Brescia_17.webp', '/images/Alpini_Brescia_18.webp', '/images/Alpini_Brescia_19.webp', '/images/Alpini_Brescia_20.webp', '/images/Alpini_Brescia_21.webp', '/images/Alpini_Brescia_22.webp', '/images/Alpini_Brescia_23.webp', '/images/Alpini_Brescia_24.webp', '/images/Alpini_Brescia_25.webp', '/images/Alpini_Brescia_26.webp', '/images/Alpini_Brescia_27.webp', '/images/Alpini_Brescia_28.webp', '/images/Alpini_Brescia_29.webp', '/images/Alpini_Brescia_30.webp', '/images/Alpini_Brescia_31.webp', '/images/Alpini_Brescia_32.webp', '/images/Alpini_Brescia_33.webp', '/images/Alpini_Brescia_34.webp', '/images/Alpini_Brescia_35.webp', '/images/Alpini_Brescia_36.webp', '/images/Alpini_Brescia_37.webp', '/images/Alpini_Brescia_38.webp', '/images/Alpini_Brescia_39.webp', '/images/Alpini_Brescia_40.webp', '/images/Alpini_Brescia_41.webp', '/images/Alpini_Brescia_42.webp', '/images/Alpini_Brescia_43.webp', '/images/Alpini_Brescia_44.webp', '/images/Alpini_Brescia_45.webp', '/images/Alpini_Brescia_46.webp', '/images/Alpini_Brescia_47.webp'] },
          { title: 'Borgo Castello', tag: 'Comunicazione Urbana', tagline: 'Rigenerazione urbana per Borgo Castello.', desc: '2° posto a un concorso nazionale di rigenerazione urbana, con una proposta collaborativa focalizzata sull\'integrazione tra grafica ambientale, segnaletica e valorizzazione del territorio ligure.', cover: '/images/BorgoCastello_Render_4.webp', mobileVertical: true, gallery: ['/images/BorgoCastello_Slide_1.webp', '/images/BorgoCastello_Slide_2.webp', '/images/BorgoCastello_Slide_3.webp', '/images/BorgoCastello_Slide_4.webp', '/images/BorgoCastello_Slide_5.webp', '/images/BorgoCastello_Slide_6.webp', '/images/BorgoCastello_Slide_7.webp', '/images/BorgoCastello_Render_4.webp', '/images/BorgoCastello_Render_Chiesa.webp', '/images/BorgoCastello_Mockup_1.webp', '/images/BorgoCastello_MOckup_2.webp', '/images/BorgoCastello_Render_3.webp', '/images/BorgoCastello_Render_5.webp', '/images/BorgoCastello_render_2.webp', '/images/BorgoCastello_Render_Tote_Bag.webp', '/images/BorgoCastello_Render_Felpa.webp', '/images/BorgoCastello_Render_Bottiglia.webp', '/images/BorgoCastello_Render_Gancio.webp'] },
          { title: 'Snickers — Luxury Rebrand', tag: 'Rebranding', tagline: 'Concept di rebranding di lusso per Snickers.', desc: 'Concept per il rebrand di lusso di Snickers. Immagine coordinata, packaging e layout editoriale.', cover: '/images/Snickers7.webp', gallery: ['/images/Snickers20.webp', '/images/Snickers21.webp', '/images/Snickers26.webp', '/images/Snickers25.webp', '/images/Snickers18.webp', '/images/Snickers24.webp', '/images/Snickers17.webp', '/images/Snickers22.webp', '/images/Snickers19.webp', '/images/Snickers7.webp'] },
          { title: 'Piccola Orchestra Materana', tag: 'Packaging', tagline: 'Art direction e packaging per il CD.', desc: 'Art direction e packaging per il CD della Piccola Orchestra. Lettering custom a mano libera.', gallery: ['/images/Matera1.webp', '/images/Matera2.webp', '/images/Matera3.webp', '/images/Matera5.webp'] },
          { title: 'HATE-IT, forget-it!', tag: 'Art Direction', tagline: 'Un anti post-it contro il mondo moderno.', desc: 'Viviamo in una società in cui tutto deve essere filtrato e moderato. Ci insegnano a nascondere rabbia e fastidio, ma dove finisce ciò che tratteniamo? HATE-IT nasce come gesto di liberazione. È un invito a dire ciò che odi, senza paura né giudizio: un \'anti post-it\' su cui depositare il tuo pensiero. Puoi attaccarlo, lasciarlo andare, fissarlo fuori da te. Un atto semplice e catartico per spostare l\'odio dal corpo allo spazio.', cover: '/images/Preview_Hate_it.webp', gallery: ['/images/HateIt_img_20.webp', '/images/HateIt_img_21.webp', '/images/HateIt_img_22.webp', '/images/HateIt_img_23.webp', '/images/HateIt_img_24.webp', '/images/HateIt_img_25.webp', '/images/HateIt_img_26.webp', '/images/HateIt_img_27.webp', '/images/HateIt_img_28.webp', '/images/HateIt_img_29.webp', '/images/HateIt_img_30.webp'] },
          { title: 'Nevia a Giorni Scalzi', tag: 'Musica', tagline: 'Copertina, CD e vinile per l\'album di Nevia.', desc: 'Copertina, CD e vinile per l\'album \'Giorni Scalzi\' di Nevia.', gallery: ['/images/GiorniScalzi1.webp', '/images/GiorniScalzi2.webp', '/images/GiorniScalzi3.webp', '/images/NeviaVIP.png'] },
        ],
      },
      'publishings': {
        title: 'Editoria',
        description: 'Progetti editoriali curati — libri, zine e pubblicazioni digitali.',
        items: [
          {
            title: 'The Biome',
            tag: 'Magazine',
            desc: 'Un progetto universitario di Graphic Design III incentrato sull\'ambientalismo e il nostro pianeta.',
            cover: '/images/eco/page-01.jpg',
            gallery: [
              '/images/eco/page-01.jpg', '/images/eco/page-02.jpg', '/images/eco/page-03.jpg', '/images/eco/page-04.jpg', '/images/eco/page-05.jpg', '/images/eco/page-06.jpg', '/images/eco/page-07.jpg', '/images/eco/page-08.jpg', '/images/eco/page-09.jpg', '/images/eco/page-10.jpg', '/images/eco/page-11.jpg', '/images/eco/page-12.jpg', '/images/eco/page-13.jpg', '/images/eco/page-14.jpg', '/images/eco/page-15.jpg', '/images/eco/page-16.jpg', '/images/eco/page-17.jpg', '/images/eco/page-18.jpg', '/images/eco/page-19.jpg', '/images/eco/page-20.jpg', '/images/eco/page-21.jpg', '/images/eco/page-22.jpg', '/images/eco/page-23.jpg', '/images/eco/page-24.jpg', '/images/eco/page-25.jpg', '/images/eco/page-26.jpg', '/images/eco/page-27.jpg', '/images/eco/page-28.jpg', '/images/eco/page-29.jpg', '/images/eco/page-30.jpg', '/images/eco/page-31.jpg', '/images/eco/page-32.jpg', '/images/eco/page-33.jpg', '/images/eco/page-34.jpg', '/images/eco/page-35.jpg', '/images/eco/page-36.jpg', '/images/eco/page-37.jpg', '/images/eco/page-38.jpg', '/images/eco/page-39.jpg', '/images/eco/page-40.jpg', '/images/eco/page-41.jpg', '/images/eco/page-42.jpg', '/images/eco/page-43.jpg', '/images/eco/page-44.jpg', '/images/eco/page-45.jpg', '/images/eco/page-46.jpg', '/images/eco/page-47.jpg', '/images/eco/page-48.jpg', '/images/eco/page-49.jpg', '/images/eco/page-50.jpg', '/images/eco/page-51.jpg', '/images/eco/page-52.jpg', '/images/eco/page-53.jpg', '/images/eco/page-54.jpg', '/images/eco/page-55.jpg', '/images/eco/page-56.jpg', '/images/eco/page-57.jpg', '/images/eco/page-58.jpg', '/images/eco/page-59.jpg', '/images/eco/page-60.jpg', '/images/eco/page-61.jpg', '/images/eco/page-62.jpg', '/images/eco/page-63.jpg', '/images/eco/page-64.jpg', '/images/eco/page-65.jpg', '/images/eco/page-66.jpg', '/images/eco/page-67.jpg', '/images/eco/page-68.jpg', '/images/eco/page-69.jpg', '/images/eco/page-70.jpg', '/images/eco/page-71.jpg', '/images/eco/page-72.jpg', '/images/eco/page-73.jpg', '/images/eco/page-74.jpg', '/images/eco/page-75.jpg', '/images/eco/page-76.jpg'
            ]
          },
          {
            title: 'Progetto Walls',
            tag: 'Universo Narrativo',
            desc: 'Un progetto narrativo che esplora l\'isolamento sociale e la resistenza interiore attraverso molteplici forme visive: libri e giornali.',
            cover: '/images/WallsFront.webp',
            isMacroProject: true,
            subProjects: [
              { 
                title: 'Walls — Selene Vexley', 
                tag: 'Libro', 
                desc: 'Un romanzo distopico che esplora temi di isolamento sociale, resistenza interiore e salute mentale sotto un regime totalitario.', 
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
              }
            ]
          },
          {
            title: 'MITA - Fragments d\'un Tapis Amoureux',
            tag: 'Textile Design',
            desc: 'Progetto di textile design selezionato tra i migliori per l\'esposizione/collaborazione istituzionale \'MITA FRAGMENTS D\'UN TAPIS AMOUREUX\', reinterpretando la tradizione tessile in chiave contemporanea.',
            cover: '/images/MITA_carpet_cover.webp',
            gallery: ['/images/MITA_cover.webp', '/images/eco/page-62.jpg', '/images/eco/page-63.jpg', '/images/eco/page-64.jpg', '/images/eco/page-65.jpg', '/images/eco/page-66.jpg', '/images/eco/page-67.jpg', '/images/eco/page-68.jpg', '/images/eco/page-69.jpg']
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
      { id: 5, title: 'HATE-IT, forget-it!', category: 'Branding', description: 'Un invito a dire ciò che odi, senza paura né giudizio. Scrivilo su un HATE-IT — un anti post-it per distaccarsi fisicamente dai pensieri negativi. Un atto semplice ma catartico.', tags: ['Art Direction', 'Concept', 'Copywriting'] },
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
      langB2: 'B2',
      contactTitle: 'Contatti',
      contactPhone: 'Telefono: 3270746059',
      contactEmail: 'Email: juan.merla23@gmail.com',
      contactCity: 'Città: Brescia, Italia'
    }
  },
}

export function useLang() {
  const t = computed(() => translations[lang.value])
  const toggleLang = () => { lang.value = lang.value === 'en' ? 'it' : 'en' }
  return { lang, t, toggleLang }
}
