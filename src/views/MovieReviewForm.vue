<script setup>
import { computed, ref } from 'vue'
import { useWatchlistStore } from '@/stores/watchlist'
import { useToast } from '@/composables/useToast'
import RatingStars from './RatingStars.vue'

const props = defineProps({
  filmId: { type: String, required: true }
})

const store = useWatchlistStore()
const { showToast } = useToast()

const note = ref(0)
const commentaire = ref('')
const messageSucces = ref('')

const erreurNote = computed(() => (note.value < 1 ? 'La note est obligatoire' : ''))
const erreurCommentaire = computed(() => {
  const taille = commentaire.value.trim().length
  if (taille < 20) return 'Minimum 20 caracteres'
  if (taille > 500) return 'Maximum 500 caracteres'
  return ''
})
const valide = computed(() => !erreurNote.value && !erreurCommentaire.value)

function enregistrer() {
  if (!valide.value) return

  const ok = store.enregistrerAvis(props.filmId, {
    rating: note.value,
    comment: commentaire.value.trim()
  })

  if (!ok) {
    messageSucces.value = ''
    showToast('Film introuvable dans la watchlist')
    return
  }

  messageSucces.value = 'Avis enregistre'
  showToast('Avis enregistre')
}
</script>

<template>
  <form @submit.prevent="enregistrer">
    <RatingStars v-model="note" />
    <p v-if="erreurNote">{{ erreurNote }}</p>

    <textarea v-model="commentaire" />
    <p v-if="erreurCommentaire">{{ erreurCommentaire }}</p>

    <button type="submit" :disabled="!valide">Enregistrer</button>
    <p v-if="messageSucces">{{ messageSucces }}</p>
  </form>
</template>
