<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { getPersonById } from '@/services/omdb'
import { useMovieFetch } from '@/composables/useMovieFetch'

const route = useRoute()
const personId = computed(() => route.params.id)
const { film: personne, chargement, erreur } = useMovieFetch(personId, getPersonById)
</script>

<template>
  <section>
    <p v-if="chargement">Chargement...</p>
    <p v-else-if="erreur">Erreur : {{ erreur }}</p>

    <div v-else-if="personne">
      <h1>{{ personne.Title || 'Detail personne' }}</h1>
      <img
        v-if="personne.Poster && personne.Poster !== 'N/A'"
        :src="personne.Poster"
        :alt="personne.Title"
        style="max-width: 240px"
      />
      <p><strong>Type:</strong> {{ personne.Type }}</p>
      <p><strong>Annee:</strong> {{ personne.Year }}</p>
      <p><strong>Acteurs:</strong> {{ personne.Actors }}</p>
      <p><strong>Genre:</strong> {{ personne.Genre }}</p>
      <p><strong>IMDb ID:</strong> {{ personne.imdbID }}</p>
    </div>
  </section>
</template>
