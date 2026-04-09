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
      <h1>{{ personne.Title || 'Détail personne' }}</h1>
      <p><strong>Type:</strong> {{ personne.Type }}</p>
      <p><strong>Année:</strong> {{ personne.Year }}</p>
      <p><strong>IMDb ID:</strong> {{ personne.imdbID }}</p>
    </div>
  </section>
</template>

<style scoped></style>
