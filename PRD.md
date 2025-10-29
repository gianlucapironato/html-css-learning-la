# Planning Guide

Un'applicazione interattiva per insegnare i fondamenti di HTML e CSS attraverso esercizi pratici con feedback visivo immediato.

**Experience Qualities**:
1. **Educational** - L'interfaccia guida gli utenti attraverso concetti fondamentali in modo chiaro e progressivo
2. **Interactive** - Ogni modifica al codice mostra risultati immediati per apprendimento hands-on
3. **Encouraging** - Design pulito e feedback positivo che motivano l'apprendimento

**Complexity Level**: Light Application (multiple features with basic state)
- L'app presenta esercizi HTML/CSS con un editor live e anteprima in tempo reale, con gestione dello stato per tracciare il progresso

## Essential Features

### Live Code Editor
- **Functionality**: Editor di testo dove gli utenti possono scrivere HTML e CSS
- **Purpose**: Permettere l'apprendimento pratico attraverso la sperimentazione diretta
- **Trigger**: L'utente clicca nell'area di testo
- **Progression**: Utente digita codice → cambiamenti vengono renderizzati → anteprima si aggiorna in tempo reale
- **Success criteria**: Il codice viene visualizzato correttamente e l'anteprima si aggiorna istantaneamente

### Preview Panel
- **Functionality**: Mostra il rendering live del codice HTML/CSS scritto
- **Purpose**: Fornire feedback visivo immediato delle modifiche
- **Trigger**: Automatico quando il codice cambia
- **Progression**: Codice modificato → parsing → rendering nel pannello anteprima
- **Success criteria**: L'anteprima riflette accuratamente il codice scritto

### Exercise Challenges
- **Functionality**: Lista di sfide con obiettivi specifici da completare
- **Purpose**: Guidare l'apprendimento con obiettivi chiari
- **Trigger**: L'utente seleziona un esercizio
- **Progression**: Utente legge la sfida → scrive codice → completa l'obiettivo
- **Success criteria**: Gli utenti possono navigare tra diversi esercizi

### Reset Functionality
- **Functionality**: Bottone per resettare il codice allo stato iniziale
- **Purpose**: Permettere agli utenti di ricominciare se commettono errori
- **Trigger**: Click sul bottone reset
- **Progression**: Click → conferma → codice ritorna allo stato iniziale
- **Success criteria**: Il codice viene ripristinato correttamente

## Edge Case Handling

- **Codice non valido**: L'anteprima gestisce HTML/CSS malformato senza crash
- **Contenuto vuoto**: Mostra messaggio placeholder quando non c'è codice
- **Overflow del codice**: Lo scroll gestisce codice lungo sia nell'editor che nell'anteprima
- **Persistenza**: Il codice viene salvato automaticamente per non perdere il lavoro

## Design Direction

Il design deve evocare un ambiente di apprendimento moderno e professionale, simile a un IDE ma più accessibile e friendly. Deve sentirsi come uno spazio di lavoro pulito e organizzato che incoraggia la sperimentazione senza intimidire. Minimal interface che mantiene il focus sul codice e sui risultati.

## Color Selection

Complementary (opposite colors) - Usando una palette che ricorda gli editor di codice professionali ma con un tocco più caldo e accogliente per l'educazione.

- **Primary Color**: Deep Blue (oklch(0.35 0.15 250)) - Evoca professionalità e fiducia, usato per elementi principali
- **Secondary Colors**: Soft Slate (oklch(0.45 0.02 250)) per elementi di supporto e bordi
- **Accent Color**: Vibrant Teal (oklch(0.65 0.15 180)) per bottoni CTA e highlights, cattura l'attenzione su elementi interattivi
- **Foreground/Background Pairings**:
  - Background (White oklch(0.98 0 0)): Dark text (oklch(0.20 0.02 250)) - Ratio 12.8:1 ✓
  - Card (Light Gray oklch(0.96 0 0)): Dark text (oklch(0.20 0.02 250)) - Ratio 11.5:1 ✓
  - Primary (Deep Blue oklch(0.35 0.15 250)): White text (oklch(0.98 0 0)) - Ratio 9.2:1 ✓
  - Accent (Vibrant Teal oklch(0.65 0.15 180)): White text (oklch(0.98 0 0)) - Ratio 4.6:1 ✓
  - Muted (Light Slate oklch(0.92 0.01 250)): Muted text (oklch(0.50 0.02 250)) - Ratio 5.8:1 ✓

## Font Selection

Typefaces devono bilanciare leggibilità per il testo educativo e chiarezza monospazio per il codice.

- **Typographic Hierarchy**:
  - H1 (App Title): Inter Bold/32px/tight letter spacing
  - H2 (Exercise Title): Inter SemiBold/24px/normal spacing
  - H3 (Section Headers): Inter Medium/18px/normal spacing
  - Body (Instructions): Inter Regular/16px/relaxed line height (1.6)
  - Code Editor: Fira Code Regular/14px/monospace with ligatures
  - Labels: Inter Medium/14px/uppercase with wide tracking

## Animations

Le animazioni devono essere subtle e funzionali, guidando l'attenzione senza distrarre dal processo di apprendimento. Il focus è su transizioni fluide che comunicano lo stato del sistema.

- **Purposeful Meaning**: Transizioni smooth tra esercizi e feedback visivo quando il codice viene aggiornato comunicano responsività
- **Hierarchy of Movement**: Focus principale sull'aggiornamento dell'anteprima (200ms fade) e cambio esercizi (300ms slide), con micro-interactions sui bottoni (100ms)

## Component Selection

- **Components**: 
  - Card per contenere editor e preview con bordi subtle
  - Textarea per l'editor di codice con syntax highlighting simulato
  - Button per azioni (reset, change exercise) con stati hover/active chiari
  - Tabs per navigare tra HTML e CSS se necessario
  - Badge per mostrare tag e concetti chiave
  - Separator per dividere sezioni visualmente
  - ScrollArea per contenuto lungo nell'editor e preview
  
- **Customizations**: 
  - Editor component personalizzato che wrappa Textarea con numbering delle linee
  - Preview frame component con sandbox isolato
  
- **States**: 
  - Buttons: hover con lift subtle e accent color, active con press down, disabled con opacità ridotta
  - Textarea: focus ring in accent color, error state con border rosso se necessario
  
- **Icon Selection**: 
  - Play icon per "Run Code"
  - ArrowCounterClockwise per reset
  - Code icon per editor
  - Eye per preview
  - CheckCircle per esercizi completati
  
- **Spacing**: 
  - Base unit: 16px (1rem)
  - Card padding: 24px (1.5rem)
  - Gap between sections: 32px (2rem)
  - Button padding: 12px 24px
  - Consistent 16px gap in flex/grid layouts
  
- **Mobile**: 
  - Stack editor e preview verticalmente su mobile
  - Full width components con padding ridotto (16px)
  - Collapsible exercise instructions
  - Sticky header con title e reset button
  - Touch-friendly button sizes (minimum 44px height)
