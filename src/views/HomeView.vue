<template>
  <section class="page home-view">
    <article class="panel hero">
      <p class="eyebrow">Catalogue cinema</p>
      <h1 class="section-title title">Bienvenue sur CineTrack</h1>
      <p class="text-muted subtitle">
        Explore des films, cree ta watchlist et garde une trace de tes avis en quelques clics.
      </p>

      <div class="hero-actions">
        <RouterLink to="/search" class="btn btn-primary">Commencer une recherche</RouterLink>
        <RouterLink to="/watchlist" class="btn btn-secondary">Voir ma watchlist</RouterLink>
      </div>
    </article>

    <section class="quick-grid">
      <RouterLink to="/genre/action" class="panel quick-card">
        <h2>Genres</h2>
        <p class="text-muted">Parcours les films par univers et ambiance.</p>
      </RouterLink>

      <RouterLink to="/profile" class="panel quick-card">
        <h2>Profil</h2>
        <p class="text-muted">Consulte tes statistiques personnelles.</p>
      </RouterLink>
    </section>
  </section>
</template>

<style scoped>
.home-view {
  display: grid;
  gap: 18px;
}

.hero {
  padding: clamp(18px, 3vw, 28px);
  display: grid;
  gap: 12px;
}

.eyebrow {
  margin: 0;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--text-700);
  font-size: 0.78rem;
  font-weight: 700;
}

.title {
  margin: 0;
  font-size: clamp(1.7rem, 3vw, 2.5rem);
}

.subtitle {
  margin: 0;
  max-width: 65ch;
  line-height: 1.65;
}

.hero-actions {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.quick-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 12px;
}

.quick-card {
  text-decoration: none;
  padding: 16px;
  transition: transform 180ms ease;
}

.quick-card:hover {
  transform: translateY(-3px);
}

.quick-card h2 {
  margin: 0 0 8px;
  font-family: 'Fraunces', serif;
}

.quick-card p {
  margin: 0;
}

@media (max-width: 760px) {
  .quick-grid {
    grid-template-columns: 1fr;
  }
}
</style>
