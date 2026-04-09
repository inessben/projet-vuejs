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
    showToast('Film introuvable dans la watchlist', 'error')
    return
  }

  messageSucces.value = 'Avis enregistre'
  showToast('Avis enregistre')
}
</script>

<template>
  <form class="panel review-form" @submit.prevent="enregistrer">
    <h3 class="section-title review-title">Votre avis</h3>

    <label class="label">Note</label>
    <RatingStars v-model="note" />
    <p v-if="erreurNote" class="msg msg-error">{{ erreurNote }}</p>

    <label class="label" for="review-comment">Commentaire</label>
    <textarea
      id="review-comment"
      v-model="commentaire"
      class="textarea"
      placeholder="Partage ton ressenti sur le film..."
    />
    <p v-if="erreurCommentaire" class="msg msg-error">{{ erreurCommentaire }}</p>

    <button type="submit" class="btn btn-primary" :disabled="!valide">Enregistrer</button>
    <p v-if="messageSucces" class="msg msg-success">{{ messageSucces }}</p>
  </form>
</template>

<style scoped>
.review-form {
  margin-top: 16px;
  padding: 18px;
  display: grid;
  gap: 8px;
}

.review-title {
  margin-bottom: 4px;
  font-size: 1.3rem;
}

.label {
  color: var(--text-700);
  font-weight: 600;
  font-size: 0.92rem;
}

.msg {
  margin: 0;
  font-size: 0.9rem;
}

.msg-error {
  color: var(--danger);
}

.msg-success {
  color: var(--success);
  font-weight: 600;
}
</style>
