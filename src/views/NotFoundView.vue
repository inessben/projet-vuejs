<template>
  <section class="page not-found">
    <article class="panel card">
      <p class="code">404</p>
      <h1 class="section-title">Page introuvable</h1>
      <p class="text-muted">Le lien que tu as ouvert n'existe pas ou a ete deplace.</p>
      <RouterLink to="/" class="btn btn-primary">Revenir a l'accueil</RouterLink>
    </article>
  </section>
</template>

<style scoped>
.not-found {
  min-height: 60vh;
  display: grid;
  place-items: center;
}

.card {
  width: min(560px, 100%);
  padding: 24px;
  display: grid;
  gap: 10px;
}

.code {
  margin: 0;
  font-size: 0.85rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--text-700);
}

.card p {
  margin: 0;
}
</style>
