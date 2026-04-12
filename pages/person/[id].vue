<script setup>
import { computed } from 'vue'

const route = useRoute()
const { getPersonById } = useOmdb()
const personId = computed(() => route.params.id)
const { film: personne, chargement, erreur } = useMovieFetch(personId, getPersonById)
</script>

<template>
  <section class="page person-view">
    <p v-if="chargement" class="panel state-box">Chargement...</p>
    <p v-else-if="erreur" class="panel state-box state-error">Erreur : {{ erreur }}</p>

    <article v-else-if="personne" class="panel person-card">
      <img
        v-if="personne.Poster && personne.Poster !== 'N/A'"
        :src="personne.Poster"
        :alt="personne.Title"
        class="person-image"
      />

      <div class="person-content">
        <h1 class="section-title">{{ personne.Title || 'Detail personne' }}</h1>
        <dl class="person-list">
          <div><dt>Type</dt><dd>{{ personne.Type }}</dd></div>
          <div><dt>Annee</dt><dd>{{ personne.Year }}</dd></div>
          <div><dt>Acteurs</dt><dd>{{ personne.Actors }}</dd></div>
          <div><dt>Genre</dt><dd>{{ personne.Genre }}</dd></div>
          <div><dt>IMDb ID</dt><dd>{{ personne.imdbID }}</dd></div>
        </dl>
      </div>
    </article>
  </section>
</template>

<style scoped>
.person-view {
  display: grid;
}

.state-box {
  margin: 0;
  padding: 16px;
}

.state-error {
  color: var(--danger);
}

.person-card {
  padding: 18px;
  display: grid;
  grid-template-columns: 220px 1fr;
  gap: 18px;
}

.person-image {
  width: 100%;
  border-radius: var(--radius-md);
  object-fit: cover;
}

.person-content {
  display: grid;
  gap: 10px;
}

.person-list {
  margin: 0;
  display: grid;
  gap: 10px;
}

.person-list div {
  display: grid;
  gap: 4px;
}

.person-list dt {
  font-size: 0.8rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--text-700);
}

.person-list dd {
  margin: 0;
  color: var(--text-900);
}

@media (max-width: 760px) {
  .person-card {
    grid-template-columns: 1fr;
  }

  .person-image {
    max-width: 300px;
  }
}
</style>
