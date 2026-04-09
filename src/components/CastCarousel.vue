<script setup>
import { computed } from 'vue'

const props = defineProps({
  acteurs: { type: String, default: '' }
})

const listeActeurs = computed(() =>
  props.acteurs
    ? props.acteurs
        .split(',')
        .map((a) => a.trim())
        .filter(Boolean)
    : []
)
</script>

<template>
  <section class="cast">
    <h2>Casting</h2>

    <div v-if="listeActeurs.length" class="cast-list">
      <div v-for="acteur in listeActeurs" :key="acteur" class="cast-item">
        <slot name="actor" :actor="acteur">
          {{ acteur }}
        </slot>
      </div>
    </div>

    <p v-else>Aucun acteur disponible.</p>
  </section>
</template>

<style scoped>
.cast {
  margin-top: 20px;
}

.cast-list {
  display: flex;
  gap: 10px;
  overflow-x: auto;
}

.cast-item {
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 999px;
  white-space: nowrap;
}
</style>
