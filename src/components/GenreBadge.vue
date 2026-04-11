<script setup>
defineProps({ genre: String })

const couleurs = {
  Action: '#e74c3c',
  Comedy: '#f39c12',
  Drama: '#3498db',
  Horror: '#8e44ad',
  Romance: '#e91e63',
  'Sci-Fi': '#1abc9c',
}
</script>

<template>
  <span
    :style="{
      background: couleurs[genre] ?? '#95a5a6',
      color: 'white',
      padding: '2px 8px',
      borderRadius: '4px',
      fontSize: '12px',
      fontWeight: '600',
      whiteSpace: 'nowrap',
    }"
  >
    {{ genre }}
  </span>
</template>
