# CineTrack 🎬

Projet Vue.js --> App de watchlist de films — on cherche des films, on les ajoute à sa liste, on note ceux qu'on a vus. Les données viennent de l'API TMDB (gratuite).

Groupe : Iness · Mariam · Théa · Ethan

---

## C'est quoi ?

Un Letterboxd simplifié. T'ajoutes des films à ta liste, tu marques ceux que t'as vus, tu laisses une note et un commentaire. La watchlist est sauvegardée dans le localStorage donc elle disparaît pas si tu fermes le navigateur.

On a aussi une page de recherche avec des filtres, une fiche détaillée par film avec le casting et la bande-annonce, et une page profil avec quelques stats (films vus, note moyenne, genre préféré).

---

## Stack

Vue 3 + Composition API, Vue Router 4, Pinia (avec persistance localStorage), Vite, ESLint + Prettier.

---

## Lancer le projet

Il te faut Node.js v18+ et une clé API TMDB.

**Récupérer une clé TMDB :**
Crée un compte sur [themoviedb.org](https://www.themoviedb.org), va dans Paramètres → API, et copie le token d'accès en lecture (le long, pas la clé v3).

```bash
git clone https://github.com/VOTRE_USERNAME/cinetrack.git
cd cinetrack
npm install
#ou
npm install -D vite @vitejs/plugin-vue eslint eslint-plugin-vue


npm run dev

npm run lint      # corrige les erreurs ESLint
npm run format    # formate tout le code avec Prettier
```

Crée un fichier `.env` à la racine :

```
VITE_TMDB_API_KEY=ton_token_ici
```

> Le `.env` est gitignore — chacun crée le sien avec sa propre clé, on le commit jamais.

```bash
npm run dev
# http://localhost:5173
```

Autres commandes : `npm run build` / `npm run preview` / `npm run lint` / `npm run format`

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

Côté notions Vue : `defineModel()` sur la SearchBar, watcher deep sur les filtres (pour relancer la recherche automatiquement quand un filtre change), le composable `useDebounce` pour pas flood l'API à chaque lettre, et les appels API trending/genres/search.

---

**Mariam — Fiche film & Casting**

`MovieCard.vue`, `HeroSection.vue`, `CastCarousel.vue`, `MovieDetailView.vue` et `PersonDetailView.vue`.

Côté notions Vue : slots nommés sur HeroSection (`#title`, `#actions`, `#meta`), scoped slot sur CastCarousel, le composable `useMovieFetch` qui watch `route.params.id` pour recharger quand on navigue entre deux films, et les appels API détails/crédits/vidéos/similaires/personne.

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

---

## Planning

Sprint 1 (25-29 mars) — setup, home avec vrais films, watchlist de base  
Sprint 2 (30 mars - 6 avril) — toutes les pages, tous les critères du sujet  
Sprint 3 (7-12 avril) — polish, build, zip MyGES

**Deadline : 13 avril 2026**

---

## Ce qu'on a pas fait

- Auth TMDB (pas de vrai compte utilisateur)
- Tests unitaires
- PWA / mode offline

---
