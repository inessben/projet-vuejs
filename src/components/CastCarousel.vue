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
  <section class="panel cast">
    <h2 class="section-title">Casting</h2>

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
  padding: 18px;
}

.cast-list {
  display: flex;
  gap: 10px;
  overflow-x: auto;
  padding-bottom: 4px;
}

.cast-item {
  padding: 8px 13px;
  border: 1px solid rgba(22, 32, 45, 0.16);
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.9);
  color: var(--text-900);
  font-weight: 500;
  white-space: nowrap;
}

.cast p {
  margin: 0;
  color: var(--text-700);
}
</style>
