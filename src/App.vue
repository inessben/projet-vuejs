<template>
  <AppNavbar />
  
  <main>
    <RouterView />
  </main>

  <ToastNotification />
</template>

<script setup>
import AppNavbar from '@/components/AppNavbar.vue'
import ToastNotification from '@/components/ToastNotification.vue'
</script>
