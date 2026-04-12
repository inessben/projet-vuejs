<template>
  <div class="app-shell">
    <div class="app-glow app-glow-left" />
    <div class="app-glow app-glow-right" />
    <AppNavbar />
    <main class="app-main">
      <NuxtPage />
    </main>
    <ToastNotification />
  </div>
</template>

<style scoped>
.app-shell {
  position: relative;
  min-height: 100vh;
  padding: 16px 0 36px;
  overflow: hidden;
  transition: background-color var(--transition);
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
  background: var(--glow-left);
}

.app-glow-right {
  top: -140px;
  right: -120px;
  background: var(--glow-right);
}
</style>
