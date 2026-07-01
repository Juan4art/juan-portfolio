# Presentazione Progetto: Portfolio Creativo Interattivo

**Studente:** Juan Merla
**Progetto:** Portfolio Personale Interattivo
**Dominio Live:** juanmerla.com

## 1. Concept e Direzione Artistica
Il progetto nasce con l'obiettivo di superare il concetto tradizionale di "sito vetrina" statico, trasformandolo in un'esperienza digitale immersiva. Il design si ispira all'estetica **brutalista e dark-mode**, sfruttando forti contrasti cromatici, tipografia d'impatto (font monospazio e sans-serif moderni) e micro-interazioni per catturare l'attenzione dell'utente. Ogni elemento è pensato per valorizzare i contenuti visivi (fotografia, 3D, graphic design) senza distrazioni.

## 2. Stack Tecnologico
Per garantire performance elevate e uno sviluppo modulare, l'infrastruttura è stata costruita con tecnologie moderne e standard industriali:
- **Framework Core:** Vue.js 3 (Composition API), scelto per la sua reattività istantanea e la gestione ottimale dello stato globale.
- **Build Tool:** Vite, per una compilazione fulminea e un ambiente di sviluppo ottimizzato.
- **Styling:** Tailwind CSS, che ha permesso di creare un design system su misura, fluido e responsive su ogni dispositivo mobile e desktop, senza scrivere CSS "monolitico".

## 3. Funzionalità Tecniche di Spicco
- **Media Player Globale:** Un lettore musicale integrato e persistente durante la navigazione tra le pagine, progettato per aggiungere un livello uditivo ed emotivo all'esperienza utente.
- **Sistema Multilingua Reattivo (i18n):** Il sito supporta Inglese e Italiano. Il cambio lingua avviene istantaneamente (client-side) senza alcun ricaricamento della pagina, grazie al motore reattivo di Vue.
- **Ottimizzazione Asset (WebP & Preloading):** Essendo un portfolio ad alto impatto visivo, tutte le immagini (incluse quelle 3D ad altissima risoluzione) sono state convertite nel formato next-gen WebP. È stato inoltre ingegnerizzato un sistema di "pre-loader" visivo che carica le risorse pesanti in background prima di sbloccare la navigazione, garantendo transizioni fluide (zero scatti).
- **Interazioni Fisiche e Animazioni:** Implementazione di un cursore magnetico (Physics Cursor) e animazioni a cascata sui testi (staggering) per restituire un "feeling" premium e organico.

## 4. Infrastruttura e Deploy (CI/CD)
Il flusso di lavoro segue le migliori pratiche del settore (DevOps base):
1. **Version Control:** Il codice sorgente è tracciato e salvato su un repository **GitHub**.
2. **Automazione (CI/CD):** Il repository è agganciato a **Vercel**. Ad ogni nuovo aggiornamento del codice su GitHub, Vercel compila e pubblica il sito online in modo del tutto automatico.
3. **DNS e Sicurezza:** Il dominio personalizzato è gestito tramite **Cloudflare**, garantendo sicurezza, certificati SSL (HTTPS) automatici e propagazione veloce a livello globale. Mappe XML (Sitemap) e file Robots.txt sono stati configurati per l'indicizzazione su Google.
