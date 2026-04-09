<script setup>
import { ref } from 'vue'

const note = defineModel({ type: Number, default: 0 })
const props = defineProps({
  readonly: { type: Boolean, default: false }
})

const survol = ref(0)

function setNote(i) {
  if (props.readonly) return
  note.value = i
}

function setSurvol(i) {
  if (props.readonly) return
  survol.value = i
}

function resetSurvol() {
  survol.value = 0
}
</script>

<template>
  <div class="rating-stars" role="radiogroup" aria-label="Notation sur 5">
    <button
      v-for="i in 5"
      :key="i"
      type="button"
      class="star-btn"
      :class="{ active: i <= (survol || note), readonly: props.readonly }"
      :aria-label="`Donner ${i} sur 5`"
      :aria-checked="i === note"
      @click="setNote(i)"
      @mouseenter="setSurvol(i)"
      @mouseleave="resetSurvol"
    >
      <span class="star-icon" />
    </button>
  </div>
</template>

<style scoped>
.rating-stars {
  display: flex;
  gap: 6px;
  align-items: center;
}

.star-btn {
  background: transparent;
  border: none;
  padding: 0;
  cursor: pointer;
  line-height: 1;
}

.star-btn.readonly {
  cursor: default;
}

.star-icon::before {
  content: '\2605';
  font-size: 28px;
  color: #cbd5e1;
}

.star-btn.active .star-icon::before {
  color: #f59e0b;
}
</style>
