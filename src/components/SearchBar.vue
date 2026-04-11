<script setup>
import { useDebounce } from '@/composables/useDebounce'

const query = defineModel()
const emit = defineEmits(['search'])

const lancerRecherche = useDebounce((v) => emit('search', v), 300)
</script>

<template>
  <div class="search-bar" role="search">
    <span class="search-icon">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="11" cy="11" r="8" />
        <line x1="21" y1="21" x2="16.65" y2="16.65" />
      </svg>
    </span>
    <input
      v-model="query"
      class="input search-input"
      placeholder="Chercher un film..."
      @input="lancerRecherche(query)"
    />
    <button v-if="query" class="clear-btn" aria-label="Effacer" @click="query = ''">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round">
        <line x1="18" y1="6" x2="6" y2="18" />
        <line x1="6" y1="6" x2="18" y2="18" />
      </svg>
    </button>
  </div>
</template>

<style scoped>
.search-bar {
  position: relative;
  display: flex;
  align-items: center;
}

.search-icon {
  position: absolute;
  left: 13px;
  color: #a0aec0;
  display: flex;
  align-items: center;
  pointer-events: none;
}

.search-input {
  padding-left: 40px;
  padding-right: 40px;
  font-size: 0.95rem;
  border-radius: 999px;
  border-width: 1.5px;
}

.search-input:focus {
  box-shadow: 0 0 0 3px var(--accent-soft);
}

.clear-btn {
  position: absolute;
  right: 12px;
  background: rgba(160, 174, 192, 0.18);
  border: none;
  border-radius: 50%;
  width: 22px;
  height: 22px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--text-700);
  cursor: pointer;
  transition: background-color var(--transition), color var(--transition);
  padding: 0;
  flex-shrink: 0;
}

.clear-btn:hover {
  background: rgba(211, 72, 72, 0.12);
  color: var(--danger);
}
</style>
