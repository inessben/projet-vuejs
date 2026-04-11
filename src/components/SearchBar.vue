<script setup>
import { useDebounce } from '@/composables/useDebounce'

const query = defineModel()
const emit = defineEmits(['search'])

const lancerRecherche = useDebounce((v) => emit('search', v), 300)
</script>

<template>
  <div class="search-bar" role="search">
    <input
      v-model="query"
      class="input search-input"
      placeholder="Chercher un film..."
      @input="lancerRecherche(query)"
    />
    <button v-if="query" class="clear-btn" aria-label="Effacer" @click="query = ''">×</button>
  </div>
</template>

<style scoped>
.search-bar {
  position: relative;
  display: flex;
  align-items: center;
}

.search-input {
  padding-right: 38px;
}

.clear-btn {
  position: absolute;
  right: 10px;
  background: none;
  border: none;
  font-size: 1.2rem;
  color: var(--text-700);
  cursor: pointer;
  line-height: 1;
  padding: 0;
}

.clear-btn:hover {
  color: var(--text-900);
}
</style>
