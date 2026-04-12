# CineTrack

Application web cinéma (Nuxt 3 + Pinia) pour rechercher des films, créer une watchlist, noter les films vus et suivre ses stats de profil.

Projet réalisé par : Ines, Mariam, Thea, Ethan.

## Installation

### 1. Prérequis

- Node.js 18+ (recommandé : 20 LTS)
- npm

### 2. Installer le projet

```bash
git clone https://github.com/inessben/projet-vuejs.git
cd projet-vuejs
npm install
```

### 3. Récupérer une clé API OMDb

C'est gratuit et ça prend 2 minutes.

1. Va sur [omdbapi.com/apikey.aspx](https://www.omdbapi.com/apikey.aspx)
2. Choisis le plan **FREE** (1000 requêtes/jour, c'est largement suffisant)
3. Entre ton adresse mail et valide
4. Tu reçois un mail de `omdbapi.com` avec le sujet **"API Key"** (vérifie les spams si tu ne vois rien)
5. Dans le mail, clique sur le lien d'activation (sans ça la clé ne marche pas)
6. Ta clé ressemble à ça : `1f4f4f3b` (8 caractères)

### 4. Configurer le fichier .env

Copier le fichier d'exemple et ajouter ta clé :

```bash
cp .env.example .env
# ou en PowerShell :
Copy-Item .env.example .env
```

Contenu attendu dans `.env` :

```env
NUXT_PUBLIC_OMDB_API_KEY=VOTRE_CLE_OMDB
```

> Le `.env` est personnel (à ne pas partager publiquement).

### 5. Lancer en local

```bash
npm run dev
```

Application disponible sur : `http://localhost:3001` (ou le port affiché par Nuxt).

### 6. Vérifier que la clé est bien chargée

Ouvre la console navigateur (`F12`) et tape :

```js
window.__NUXT__?.config?.public?.omdbApiKey
```

- Si ça retourne ta clé, c'est bon.
- Si ça retourne `undefined`, redémarre le serveur avec `Ctrl + C` puis `npm run dev`.

## Explication du projet

CineTrack est une application de suivi de films.

Objectifs :
- trouver rapidement un film via OMDb,
- l'ajouter à une watchlist personnelle,
- marquer les films vus,
- laisser une note (étoiles) et un commentaire,
- visualiser des statistiques utilisateur sur la page profil.

Stack :
- Nuxt 3 (SPA),
- Pinia + persistance locale,
- API OMDb,
- Dark mode + interface responsive,
- Qualité de code avec **ESLint** et **Prettier**.

## Fonctionnalités

- Recherche de films en direct avec infinite scroll.
- Section "films populaires" sur l'accueil.
- Navigation par genres (`/genre/[id]`).
- Fiche film détaillée (`/movie/[id]`) avec casting.
- Ajout / retrait de la watchlist.
- Marquer "vu / non vu".
- Avis utilisateur : note + commentaire.
- Modification d'un avis déjà enregistré.
- Auth locale (inscription / connexion) avec session persistante.
- Profil utilisateur dynamique (films en liste, films vus, note moyenne, genre favori, progression).
- Dark mode natif + design responsive (desktop, tablette, mobile).

## Tests unitaires

Le projet inclut des tests unitaires avec **Vitest** et **@vue/test-utils**.

Composants testés :
- `AppNavbar` (rendu, session utilisateur, logout, thème),
- `SearchBar` (accessibilité, saisie, événements),
- `WatchlistButton` (ajout/retrait watchlist, gestion erreur API).

Lancer les tests :

```bash
npm run test
```

## Screens

### 1) Connexion
![Connexion](docs/screens/screen-01.png)

### 2) Inscription
![Inscription](docs/screens/screen-02.png)

### 3) Profil
![Profil](docs/screens/screen-03.png)

### 4) Watchlist
![Watchlist](docs/screens/screen-04.png)

### 5) Fiche film + avis
![Fiche film](docs/screens/screen-05.png)

### 6) Validation inscription (format username)
![Validation username](docs/screens/screen-06.png)

### 7) Validation inscription (email + mot de passe)
![Validation email mdp](docs/screens/screen-07.png)

### 8) Validation inscription (username déjà pris)
![Validation username pris](docs/screens/screen-08.png)

### 9) Accueil (version finale)
![Accueil final](docs/screens/screen-09.png)

### 10) Grille des films populaires
![Films populaires](docs/screens/screen-10.png)

### 11) Page genre (Horror)
![Genre Horror](docs/screens/screen-11.png)

## Limites / Améliorations possibles

### Limites actuelles

- Auth locale simplifiée (pas de backend auth complet type JWT/session robuste).
- Données utilisateurs stockées localement (pas de base distante).
- Dépendance au quota OMDb (plan gratuit limité).
- Couverture tests encore partielle.

### Améliorations possibles

- Ajouter plus de tests (autres composants/pages, e2e).
- Ajouter un vrai backend + base de données.
- Ajouter des filtres avancés (année, note IMDb, durée, etc.).
- Améliorer pagination/virtualisation pour gros volumes.
- Ajouter une section favoris séparée de la watchlist.
- Ajouter mode hors-ligne (PWA) + cache intelligent.
- Ajouter i18n (FR/EN) et options d'accessibilité avancées.