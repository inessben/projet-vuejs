<script setup>
import { useToast } from '@/composables/useToast'
const { toasts, supprimerToast } = useToast()
</script>

<template>
  <div
    style="
      position: fixed;
      bottom: 20px;
      right: 20px;
      display: flex;
      flex-direction: column;
      gap: 8px;
    "
  >
    <div v-for="toast in toasts" :key="toast.id" @click="supprimerToast(toast.id)">
      {{ toast.message }}
    </div>
  </div>
</template>

<style scoped></style>
