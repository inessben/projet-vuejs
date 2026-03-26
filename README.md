# CineTrack 🎬

Projet Vue.js — App de watchlist de films — on cherche des films, on les ajoute à sa liste, on note ceux qu'on a vus. Les données viennent de l'API OMDb (gratuite).

Groupe : Iness · Mariam · Théa · Ethan

---

## C'est quoi ?

Un Letterboxd simplifié. T'ajoutes des films à ta liste, tu marques ceux que t'as vus, tu laisses une note et un commentaire. La watchlist est sauvegardée dans le localStorage donc elle disparaît pas si tu fermes le navigateur.

On a aussi une page de recherche avec des filtres, une fiche détaillée par film, et une page profil avec quelques stats (films vus, note moyenne, genre préféré).

---

## Stack

Vue 3 + Composition API, Vue Router 4, Pinia (avec persistance localStorage), Vite, ESLint + Prettier.

---

## Lancer le projet

### 1. Récupérer une clé API OMDb

C'est gratuit et ça prend 2 minutes.

1. Va sur [omdbapi.com/apikey.aspx](https://www.omdbapi.com/apikey.aspx)
2. Choisis le plan **FREE** (1000 requêtes/jour, c'est largement suffisant)
3. Entre ton adresse mail et valide
4. Tu reçois un mail de `omdbapi.com` avec le sujet **"API Key"** — vérifie les spams si tu vois rien
5. Dans le mail, clique sur le **lien d'activation** (sans ça la clé marchera pas)
6. Ta clé ressemble à ça : `1f4f4f3b` (8 caractères)

### 2. Cloner et installer

````bash

```bash
git clone https://github.com/inessben/projet-vuejs.git
cd projet-vue
npm install
#ou
npm install -D vite @vitejs/plugin-vue eslint eslint-plugin-vue


npm run dev

npm run lint      # corrige les erreurs ESLint
npm run format    # formate tout le code avec Prettier
````

```

### 3. Créer ton fichier .env

Crée un fichier `.env` à la racine du projet (là où y'a le `package.json`) et colle ça dedans :

```

VITE_OMDB_API_KEY=ta_clé_ici

````


> ⚠️ Le `.env` est dans le `.gitignore` — chacun crée le sien avec sa propre clé. On le commit jamais, on l'envoie pas sur Discord non plus.

### 4. Lancer

```bash
npm run dev
# → http://localhost:5173
````

Pour vérifier que ta clé est bien chargée, ouvre la console du navigateur (`F12`) et tape :

```js
import.meta.env.VITE_OMDB_API_KEY;
```

Si ça retourne ta clé c'est bon. Si ça retourne `undefined`, redémarre le serveur avec `Ctrl+C` puis `npm run dev`.

### Autres commandes

```bash
npm run build     # prod
npm run preview   # tester le build
```

---

## Structure

```
src/
├── components/    → les composants réutilisables
├── views/         → une view par page/route
├── stores/        → les 3 stores Pinia (movies, watchlist, user)
├── composables/   → useDebounce, useToast, useMovieFetch, useInfiniteScroll
├── directives/    → v-lazy-image
├── services/      → tmdb.js, tous les appels API au même endroit
└── router/        → index.js
```

---

## Qui fait quoi

On a réparti pour que chacun touche à toutes les notions Vue du cours. Personne fait que du CSS pendant qu'un autre fait toute la logique.

---

**Iness — Recherche & Home**

`SearchBar.vue`, `FilterPanel.vue`, `GenreBadge.vue`, `HomeView.vue` et `SearchView.vue`.

Côté notions Vue : `defineModel()` sur la SearchBar, watcher deep sur les filtres (pour relancer la recherche automatiquement quand un filtre change), le composable `useDebounce` pour pas flood l'API à chaque lettre, et les appels API search.

---

**Mariam — Fiche film & Casting**

`MovieCard.vue`, `HeroSection.vue`, `CastCarousel.vue`, `MovieDetailView.vue` et `PersonDetailView.vue`.

Côté notions Vue : slots nommés sur HeroSection (`#title`, `#actions`, `#meta`), scoped slot sur CastCarousel, le composable `useMovieFetch` qui watch `route.params.id` pour recharger quand on navigue entre deux films, et les appels API détails film.

---

**Théa — Watchlist & Formulaires**

`WatchlistButton.vue`, `MovieReviewForm.vue`, `RatingStars.vue`, `WatchlistView.vue` et le store watchlist.

Côté notions Vue : `defineModel()` sur RatingStars, formulaire avec validation complète (note obligatoire, commentaire 20-500 chars, messages d'erreur inline), computed `filteredAndSortedWatchlist` qui combine filtre + tri + recherche, store Pinia persisté, et lazy loading du formulaire d'avis.

---

**Ethan — Architecture, Router & Profil**

`AppNavbar.vue`, `MovieGrid.vue`, `ToastNotification.vue`, toute la config du router, `ProfileView.vue`, les stores movies et user, et la directive `v-lazy-image`.

Côté notions Vue : lazy loading des routes, computed `watchlistStats` dans ProfileView, composable `useToast` global, directive custom avec IntersectionObserver, et les deux stores Pinia movies/user.

---

## Routes

```
/             → Home
/search       → Recherche + filtres
/movie/:id    → Fiche film  (dynamique)
/person/:id   → Fiche acteur  (dynamique)
/watchlist    → Ta liste
/genre/:id    → Films par genre  (dynamique)
/profile      → Tes stats
/*            → 404
```

## Planning

Sprint 1 (25-29 mars) — setup, home avec vrais films, watchlist de base
Sprint 2 (30 mars - 6 avril) — toutes les pages, tous les critères du sujet
Sprint 3 (7-12 avril) — polish, build, zip MyGES

**Deadline : 13 avril 2026**

---

## Ce qu'on a pas fait

- Auth (pas de vrai compte utilisateur)
- Tests unitaires
- PWA / mode offline

---
