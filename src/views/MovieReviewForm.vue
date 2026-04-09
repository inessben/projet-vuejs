<script setup>
import { ref, computed } from 'vue'
import { useWatchlistStore } from '@/stores/watchlist'
import RatingStars from './RatingStars.vue'
const props = defineProps({ filmId: String })
const store = useWatchlistStore()
const note = ref(null)
const commentaire = ref('')
const erreurNote = computed(() => (!note.value ? 'La note est obligatoire' : ''))
const erreurCommentaire = computed(() => {
  if (commentaire.value.length < 20) return 'Minimum 20 caractères'
  if (commentaire.value.length > 500) return 'Maximum 500 caractères'
  return ''
})
const valide = computed(() => !erreurNote.value && !erreurCommentaire.value)
function enregistrer() {
  if (!valide.value) return
  store.enregistrerAvis(props.filmId, { rating: note.value, comment: commentaire.value })
}
</script>
<template>
  <form @submit.prevent="enregistrer">
    <RatingStars v-model="note" />
    <p v-if="erreurNote">{{ erreurNote }}</p>
    <textarea v-model="commentaire" />
    <p v-if="erreurCommentaire">{{ erreurCommentaire }}</p>
    <button type="submit" :disabled="!valide">Enregistrer</button>
  </form>
</template>
// Dans la vue parente — charger le formulaire seulement quand l'utilisateur clique import {
defineAsyncComponent, ref } from 'vue' const MovieReviewForm = defineAsyncComponent(() =>
import('@/components/MovieReviewForm.vue')) const showForm = ref(false)
<button @click="showForm = true">Laisser un avis</button>
<MovieReviewForm v-if="showForm" :film-id="film.imdbID" />
