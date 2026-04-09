<script setup>
import { ref } from 'vue'
const note = defineModel()
const props = defineProps({ readonly: Boolean })
const survol = ref(0)
</script>
<template>
  <div>
    <span
      v-for="i in 5"
      :key="i"
      @click="!props.readonly && (note = i)"
      @mouseenter="!props.readonly && (survol = i)"
      @mouseleave="survol = 0"
      >{{ i <= (survol || note) ? '★' : '■' }}</span
    >
  </div>
</template>
