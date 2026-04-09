<template>
  <section class="page search-view">
    <header class="panel header">
      <h1 class="section-title">Recherche</h1>
      <p class="text-muted">
        La recherche complete sera branchee avec les composants dedies. Cette interface est prete
        pour l'integration.
      </p>
    </header>

    <article class="panel mock-search">
      <label class="label" for="search-input">Titre du film</label>
      <div class="row">
        <input id="search-input" class="input" placeholder="Ex: Interstellar" disabled />
        <button class="btn btn-primary" disabled>Lancer</button>
      </div>
      <p class="text-muted small">En attente de l'assemblage SearchBar + FilterPanel + MovieGrid.</p>
    </article>
  </section>
</template>

<style scoped>
.search-view {
  display: grid;
  gap: 16px;
}

.header {
  padding: 18px;
}

.header p {
  margin: 0;
  line-height: 1.6;
}

.mock-search {
  padding: 18px;
  display: grid;
  gap: 10px;
}

.label {
  color: var(--text-700);
  font-weight: 600;
}

.row {
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 10px;
}

.small {
  margin: 0;
  font-size: 0.92rem;
}

@media (max-width: 760px) {
  .row {
    grid-template-columns: 1fr;
  }
}
</style>
