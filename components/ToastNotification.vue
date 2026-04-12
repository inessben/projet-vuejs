<script setup>
const { toasts, supprimerToast } = useToast()
</script>

<template>
  <TransitionGroup name="toast" tag="div" class="toast-stack">
    <button
      v-for="toast in toasts"
      :key="toast.id"
      class="toast-item"
      :class="`toast-${toast.type ?? 'success'}`"
      @click="supprimerToast(toast.id)"
    >
      {{ toast.message }}
    </button>
  </TransitionGroup>
</template>

<style scoped>
.toast-stack {
  position: fixed;
  right: 18px;
  bottom: 18px;
  z-index: 40;
  display: flex;
  flex-direction: column;
  gap: 10px;
  max-width: min(92vw, 340px);
}

.toast-item {
  border: 1px solid transparent;
  border-radius: 12px;
  padding: 12px 14px;
  text-align: left;
  font: inherit;
  font-weight: 500;
  color: #fff;
  box-shadow: var(--shadow-hard);
  cursor: pointer;
}

.toast-success {
  background: linear-gradient(135deg, #1d9b66 0%, #13764d 100%);
}

.toast-error {
  background: linear-gradient(135deg, #d34848 0%, #9b2f2f 100%);
}

.toast-enter-active,
.toast-leave-active {
  transition: all 220ms ease;
}

.toast-enter-from,
.toast-leave-to {
  opacity: 0;
  transform: translateY(10px);
}

@media (max-width: 760px) {
  .toast-stack {
    left: 12px;
    right: 12px;
    max-width: none;
  }
}
</style>
