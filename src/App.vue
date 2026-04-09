<template>
  <div class="app-shell">
    <div class="app-glow app-glow-left" />
    <div class="app-glow app-glow-right" />
    <AppNavbar />

    <main class="app-main">
      <RouterView />
    </main>

    <ToastNotification />
  </div>
</template>

<script setup>
import AppNavbar from '@/components/AppNavbar.vue'
import ToastNotification from '@/components/ToastNotification.vue'
</script>

<style scoped>
.app-shell {
  position: relative;
  min-height: 100vh;
  padding: 16px 0 36px;
  overflow: hidden;
}

.app-main {
  position: relative;
  z-index: 2;
  padding-top: 16px;
}

.app-glow {
  position: absolute;
  z-index: 1;
  width: 360px;
  height: 360px;
  filter: blur(50px);
  pointer-events: none;
}

.app-glow-left {
  top: -180px;
  left: -120px;
  background: rgba(255, 122, 69, 0.24);
}

.app-glow-right {
  top: -140px;
  right: -120px;
  background: rgba(75, 163, 209, 0.28);
}
</style>
