WorldNews

WorldNews è un’applicazione di news moderna, costruita con React, React Router, e Tailwind CSS, che consente agli utenti di leggere notizie, filtrare per categoria, cercare articoli e salvare i preferiti.

🔹 Tecnologie utilizzate

React 18 – libreria principale per il frontend.

React Router DOM – gestione delle rotte e navigazione tra pagine.

Tailwind CSS – styling rapido e responsive con utility classes.

Vite – tool moderno per build e dev server veloce.

Lucide React – libreria di icone SVG leggere e moderne.

GNews API – fonte ufficiale per le notizie.

LocalStorage – persistenza dei preferiti e della modalità Dark/Light.

🔹 Funzionalità
Navbar (sempre visibile)

Logo “WorldNews”.

Menu categorie con icone: 🌐 World | ⚽ Sport | 💻 Tech | 💼 Business | 🎨 Culture.

Search bar con input e icona.

Icona ⭐ Preferiti.

Toggle Dark/Light mode persistente.

Home (/)

Hero Breaking News con articolo principale in evidenza e immagine.

Grid notizie recenti (3 colonne desktop, 1 colonna mobile).

Bottone “Vedi tutte le notizie” → scroll verso la grid.

Categoria (/category/[slug])

Titolo categoria con icona.

Grid con articoli filtrati dalla API GNews.

Fallback se non ci sono articoli.

Supporto per tutte le categorie: World, Sport, Tech, Business, Culture.

Dettaglio articolo (/article/[id])

Immagine principale dell’articolo presa dalla API.

Titolo + fonte + data.

Estratto contenuto.

Bottone ⭐ “Aggiungi ai preferiti”.

Bottone “Leggi l’articolo completo” → link esterno.

Ricerca (/search)

Input persistente in alto.

Grid risultati con stile simile alla categoria.

Messaggio “Nessun risultato trovato” se vuoto.

Preferiti (/favorites)

Lista articoli salvati dall’utente.

Pulsante “Rimuovi dai preferiti”.

Salvataggio in LocalStorage se utente non loggato.

Footer

Link: About | Privacy | API Source

Credits © 2025 WorldNews

src/
│
├─ api/
│  └─ gnews.js               # Funzioni per chiamare la API GNews
│
├─ components/
│  ├─ Navbar.jsx
│  ├─ Footer.jsx
│  ├─ ArticleCard.jsx
│  ├─ SearchBar.jsx
│  └─ Header.jsx
│
├─ context/
│  └─ FavoritesContext.jsx   # Gestione preferiti e LocalStorage
│
├─ pages/
│  ├─ Home.jsx
│  ├─ Category.jsx
│  ├─ Article.jsx
│  ├─ Search.jsx
│  └─ Favorites.jsx
│
├─ utils/
│  └─ utils.js               # Array categories, helper formatDate, ecc.
│
├─ App.jsx
└─ main.jsx                  # Entry point React con React Router
