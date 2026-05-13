cineverse/
├── public/
│ └── posters/ # დიდი სურათები (TMDB-დან ან ადგილობრივი)
├── src/
│ ├── assets/
│ │ ├── icons/
│ │ ├── images/
│ │ └── styles/ # global css
│ │
│ ├── components/
│ │ ├── common/ # Button, Modal, Loader...
│ │ ├── layout/ # Header, Footer, Sidebar
│ │ ├── movie/ # MovieCard, PixelThumbnail, MovieGrid
│ │ ├── slider/ # HeroSlider, ThumbnailSlider
│ │ └── ui/ # Toggle, Badge, Rating...
│ │
│ ├── features/ # თუ გინდა feature-based სტრუქტურა (optional)
│ │ └── pixelEffect/
│ │
│ ├── pages/
│ │ ├── Home.jsx # Landing page
│ │ ├── Movies.jsx # ყველა ფილმი + ფილტრები
│ │ ├── MovieDetail.jsx # ცალკე ფილმის გვერდი
│ │ └── Watchlist.jsx
│ │
│ ├── hooks/
│ │ ├── usePixelEffect.js
│ │ └── useLocalStorage.js
│ │
│ ├── context/
│ │ └── SettingsContext.jsx # Pixel effect toggle + theme
│ │
│ ├── data/ # fake data ან API calls
│ ├── utils/
│ ├── App.jsx
│ ├── main.jsx
│ └── index.css
│
├── .env
├── vite.config.js
└── package.json
