<script setup>
import { computed, ref } from 'vue'
import { useWatchlistStore } from '@/stores/watchlist'
import { useToast } from '@/composables/useToast'
import RatingStars from '@/components/RatingStars.vue'

const props = defineProps({
  filmId: { type: String, required: true }
})

const emit = defineEmits(['enregistre'])

const store = useWatchlistStore()
const { showToast } = useToast()

const avisExistant = store.getAvis(props.filmId)
const note = ref(avisExistant?.rating ?? 0)
const commentaire = ref(avisExistant?.comment ?? '')

const dejaNote = computed(() => !!store.getAvis(props.filmId)?.rating)

const erreurNote = computed(() => (note.value < 1 ? 'La note est obligatoire' : ''))
const erreurCommentaire = computed(() => {
  const taille = commentaire.value.trim().length
  if (taille > 0 && taille < 10) return 'Minimum 10 caractères'
  if (taille > 500) return 'Maximum 500 caractères'
  return ''
})
const valide = computed(() => !erreurNote.value && !erreurCommentaire.value && note.value > 0)

function enregistrer() {
  if (!valide.value) return
  const ok = store.enregistrerAvis(props.filmId, {
    rating: note.value,
    comment: commentaire.value.trim()
  })
  if (!ok) { showToast('Film introuvable dans la watchlist', 'error'); return }
  showToast(dejaNote.value ? 'Avis mis à jour !' : 'Avis enregistré !')
  emit('enregistre')
}
</script>

<template>
  <form class="panel review-form" @submit.prevent="enregistrer">
    <h3 class="review-title">{{ dejaNote ? 'Modifier ton avis' : 'Laisser un avis' }}</h3>

    <div class="field">
      <label class="label">Note</label>
      <RatingStars v-model="note" />
      <p v-if="erreurNote && note === 0" class="msg msg-error">{{ erreurNote }}</p>
    </div>

    <div class="field">
      <label class="label" for="review-comment">Commentaire <span class="optionnel">(optionnel)</span></label>
      <textarea
        id="review-comment"
        v-model="commentaire"
        class="textarea"
        placeholder="Partage ton ressenti sur le film..."
      />
      <p v-if="erreurCommentaire" class="msg msg-error">{{ erreurCommentaire }}</p>
    </div>

    <button type="submit" class="btn btn-primary" :disabled="!valide">
      {{ dejaNote ? 'Mettre à jour' : 'Enregistrer' }}
    </button>
  </form>
</template>

<style scoped>
.review-form {
  padding: 18px;
  display: grid;
  gap: 14px;
}

.review-title {
  margin: 0;
  font-family: 'Fraunces', serif;
  font-size: 1.1rem;
}

.field {
  display: grid;
  gap: 6px;
}

.label {
  color: var(--text-700);
  font-weight: 600;
  font-size: 0.88rem;
}

.optionnel {
  font-weight: 400;
  color: var(--text-700);
}

.msg {
  margin: 0;
  font-size: 0.85rem;
}

.msg-error { color: var(--danger); }
</style>
