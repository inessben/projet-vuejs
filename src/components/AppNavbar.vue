<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useToast } from '@/composables/useToast'
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()
const router = useRouter()
const { showToast } = useToast()

const userName = computed(() => authStore.user?.name || 'Mon compte')

const handleLogout = async () => {
  authStore.clearUser()
  showToast('Déconnexion réussie.', 'success')
  await router.push('/login')
}
</script>

<template>
  <header class="page">
    <nav class="panel navbar">
      <RouterLink to="/" class="brand">
        <span class="brand-mark" />
        <span>CineTrack</span>
      </RouterLink>

      <ul class="nav-links">
        <li><RouterLink to="/" class="nav-link">Accueil</RouterLink></li>
        <li><RouterLink to="/search" class="nav-link">Recherche</RouterLink></li>
        <li v-if="authStore.isAuthenticated">
          <RouterLink to="/watchlist" class="nav-link">Watchlist</RouterLink>
        </li>
        <li v-if="authStore.isAuthenticated">
          <RouterLink to="/profile" class="nav-link">{{ userName }}</RouterLink>
        </li>
        <li v-if="!authStore.isAuthenticated">
          <RouterLink to="/login" class="nav-link">Connexion</RouterLink>
        </li>
        <li v-if="!authStore.isAuthenticated">
          <RouterLink to="/register" class="nav-link">Inscription</RouterLink>
        </li>
        <li v-if="authStore.isAuthenticated">
          <button type="button" class="nav-button" @click="handleLogout">Déconnexion</button>
        </li>
      </ul>
    </nav>
  </header>
</template>

<style scoped>
.navbar {
  position: relative;
  z-index: 3;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 18px;
  padding: 12px 16px;
}

.brand {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  text-decoration: none;
  font-family: 'Fraunces', serif;
  font-size: 1.2rem;
  font-weight: 700;
  color: var(--text-900);
}

.brand-mark {
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: linear-gradient(135deg, #ff7a45 0%, #ef5f27 100%);
  box-shadow: 0 0 0 5px rgba(255, 122, 69, 0.2);
}

.nav-links {
  list-style: none;
  display: flex;
  align-items: center;
  gap: 10px;
  margin: 0;
  padding: 0;
}

.nav-link,
.nav-button {
  text-decoration: none;
  padding: 9px 13px;
  border-radius: 999px;
  color: var(--text-700);
  font-weight: 500;
  transition: color 170ms ease, background-color 170ms ease;
}

.nav-link:hover,
.nav-button:hover {
  color: var(--text-900);
  background: rgba(255, 255, 255, 0.7);
}

.nav-link.router-link-active {
  color: #fff;
  background: linear-gradient(135deg, var(--accent) 0%, var(--accent-strong) 100%);
}

.nav-button {
  border: none;
  background: transparent;
  font: inherit;
  cursor: pointer;
}

@media (max-width: 760px) {
  .navbar {
    flex-direction: column;
    align-items: stretch;
    padding: 14px;
  }

  .nav-links {
    justify-content: space-between;
    flex-wrap: wrap;
  }

  .nav-link,
  .nav-button {
    padding: 8px 11px;
    font-size: 0.95rem;
  }
}
</style>
