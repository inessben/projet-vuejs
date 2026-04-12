# CineTrack

Application web cine (Nuxt 3 + Pinia) pour rechercher des films, creer une watchlist, noter les films vus et suivre ses stats de profil.

Projet realise par : Ines, Mariam, Thea, Ethan.

## Installation

### 1. Prerequis

- Node.js 18+ (recommande : 20 LTS)
- npm

### 2. Installer le projet

```bash
git clone https://github.com/inessben/projet-vuejs.git
cd projet-vuejs
npm install
```

### 3. Configurer la cle OMDb

Copier le fichier d'exemple et ajouter votre cle :

```bash
cp .env.example .env
# ou en PowerShell :
Copy-Item .env.example .env
```

Contenu attendu dans `.env` :

```env
NUXT_PUBLIC_OMDB_API_KEY=VOTRE_CLE_OMDB
```
Récupérer une clé API OMDb

C'est gratuit et ça prend 2 minutes.
Va sur omdbapi.com/apikey.aspx
Choisis le plan FREE (1000 requêtes/jour, c'est largement suffisant)
Entre ton adresse mail et valide
Tu reçois un mail de omdbapi.com avec le sujet "API Key" — vérifie les spams si tu vois rien
Dans le mail, clique sur le lien d'activation (sans ça la clé marchera pas)
Ta clé ressemble à ça : 1f4f4f3b (8 caractères)

import.meta.env.VITE_OMDB_API_KEY;
Si ça retourne ta clé c'est bon. Si ça retourne undefin, redémarre le serveur avec Ctrl+C puis npm run dev.

### 4. Lancer en local

```bash
npm run dev
```

Application disponible sur : `http://localhost:3001` (ou le port affiche par Nuxt).

### 5. Commandes utiles

```bash
npm run build    # build production
npm run preview  # previsualiser le build
npm run generate # generation statique
```

## Explication Du Projet

CineTrack est une application de suivi de films.

Objectif :
- trouver rapidement un film via OMDb,
- l'ajouter a une watchlist personnelle,
- marquer les films vus,
- laisser une note (etoiles) et un commentaire,
- visualiser ses statistiques sur une page profil.

Le projet utilise :
- Nuxt 3 (SPA),
- Pinia + persistance locale,
- API OMDb pour les donnees films,
- un theme dark mode avec une interface responsive.

## Fonctionnalites

- Recherche de films en direct avec infinite scroll.
- Section "films populaires" sur l'accueil.
- Navigation par genres (`/genre/[id]`).
- Fiche film detaillee (`/movie/[id]`) avec casting.
- Ajout / retrait de la watchlist.
- Marquer "vu / non vu".
- Avis utilisateur : note + commentaire.
- Modification d'un avis deja enregistre.
- Auth locale (inscription / connexion) avec session persistante.
- Profil utilisateur (films en liste, films vus, note moyenne, genre favori, progression) dynamique.
- Dark mode natif + design responsive (desktop, tablette, mobile).
-tests unitaire pour AppNavBar.vue

### Tests unitaires

Le projet inclut des tests unitaires avec **Vitest** et **@vue/test-utils**.

Composants actuellement testés :
- `AppNavbar` (rendu, session utilisateur, logout, thème),
- `SearchBar` (accessibilité, saisie, événements),
- `WatchlistButton` (ajout/retrait watchlist, cas d’erreur API).

Lancer les tests :
```bash
npm run test
## Screens

### 1) Accueil
![Accueil](docs/screens/screen-09.png)

### 2) Catalogue / Films populaires
![Films populaires](docs/screens/screen-02.png)

### 3) Page Genre
![Genre](docs/screens/screen-03.png)

### 4) Connexion
![Connexion](docs/screens/screen-01.png)

### 5) Inscription
![Inscription](docs/screens/screen-02.png)
![Inscription](docs/screens/screen-07.png)
![Inscription](docs/screens/screen-08.png)

### 6) Profil
![Profil](docs/screens/screen-03.png)

### 7) Watchlist
![Watchlist](docs/screens/screen-04.png)

### 8) Fiche Film + Avis
![Fiche film](docs/screens/screen-05.png)

### 9) Accueil (version finale)
![Accueil final](docs/screens/screen-09.png)

### 10) Grille des films populaires
![Grille populaires](docs/screens/screen-10.png)

### 11) Genre Horror
![Genre horror](docs/screens/screen-11.png)

## Limites / Ameliorations Possibles

### Limites actuelles

- Auth locale simplifiee (pas d'auth serveur complete type JWT/session back robuste).
- Donnees utilisateurs stockees localement pour le projet (pas de base SQL/NoSQL distante).
- Dependance au quota OMDb (plan gratuit limite).


### Ameliorations possibles

- Ajouter plus de tests.
- Ajouter un vrai backend + base de donnees (API securisee).
- Ajouter des filtres avances (annee, note IMDb, duree, etc.).
- Ajouter pagination/virtualisation plus poussee pour gros volumes.
- Ajouter page "favoris" separee de la watchlist.
- Ajouter mode hors-ligne (PWA) et cache intelligent.
- Ajouter i18n (FR/EN) et options d'accessibilite avancees.
