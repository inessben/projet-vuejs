<script setup>
import { useUserStore } from '~/stores/user'

const userStore = useUserStore()
const router = useRouter()

function seDeconnecter() {
  userStore.fermerSession()
  router.push('/login')
}
</script>

<template>
  <header class="page">
    <nav class="panel navbar">
      <NuxtLink to="/" class="brand">
        <img src="/logo.png" alt="CineTrack" class="brand-logo" />
        <span class="brand-name">CineTrack</span>
      </NuxtLink>

      <ul class="nav-links">
        <li><NuxtLink to="/" class="nav-link">Accueil</NuxtLink></li>
        <li><NuxtLink to="/genre/Action" class="nav-link">Genres</NuxtLink></li>
        <li v-if="userStore.estConnecte">
          <NuxtLink to="/watchlist" class="nav-link">Watchlist</NuxtLink>
        </li>
      </ul>

      <div v-if="userStore.estConnecte" class="user-zone">
        <NuxtLink to="/profile" class="user-pill">
          <span class="user-avatar">{{ userStore.initiales }}</span>
          <span class="user-nom">@{{ userStore.username }}</span>
        </NuxtLink>
        <button class="btn btn-secondary deco-btn" aria-label="Se déconnecter" @click="seDeconnecter">
          <i class="fas fa-sign-out-alt" />
        </button>
      </div>

      <NuxtLink v-else to="/login" class="btn btn-primary login-btn">
        Se connecter
      </NuxtLink>
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
  gap: 16px;
  padding: 10px 18px;
}

.brand {
  display: inline-flex;
  align-items: center;
  gap: 9px;
  text-decoration: none;
  flex-shrink: 0;
}

.brand-logo {
  width: 32px;
  height: 32px;
  object-fit: contain;
  border-radius: 8px;
}

.brand-name {
  font-family: 'Fraunces', serif;
  font-size: 1.15rem;
  font-weight: 700;
  color: var(--text-900);
  letter-spacing: -0.01em;
}

.nav-links {
  list-style: none;
  display: flex;
  align-items: center;
  gap: 4px;
  margin: 0;
  padding: 0;
  flex: 1;
}

.nav-link {
  text-decoration: none;
  padding: 7px 14px;
  border-radius: 999px;
  color: var(--text-700);
  font-size: 0.9rem;
  font-weight: 600;
  transition: color var(--transition), background-color var(--transition);
  display: block;
}

.nav-link:hover {
  color: var(--text-900);
  background: rgba(0, 0, 0, 0.05);
}

.nav-link.router-link-active {
  color: var(--accent-strong);
  background: var(--accent-soft);
}

.user-zone {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-shrink: 0;
}

.user-pill {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  text-decoration: none;
  padding: 5px 12px 5px 5px;
  border-radius: 999px;
  border: 1.5px solid var(--line);
  background: rgba(255, 255, 255, 0.85);
  transition: background-color var(--transition), border-color var(--transition), box-shadow var(--transition);
}

.user-pill:hover {
  background: #fff;
  border-color: rgba(22, 32, 45, 0.18);
  box-shadow: 0 4px 12px rgba(13, 23, 35, 0.08);
}

.user-avatar {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--accent) 0%, var(--accent-strong) 100%);
  color: #fff;
  font-size: 0.68rem;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Open Sans', sans-serif;
  flex-shrink: 0;
}

.user-nom {
  font-weight: 600;
  font-size: 0.875rem;
  color: var(--text-900);
  max-width: 110px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.deco-btn {
  padding: 7px 11px;
  font-size: 0.85rem;
  color: var(--text-700);
}

.deco-btn:hover {
  color: var(--danger);
  border-color: rgba(211, 72, 72, 0.3);
}

.login-btn {
  flex-shrink: 0;
  padding: 8px 18px;
  font-size: 0.875rem;
}

@media (max-width: 760px) {
  .navbar {
    flex-wrap: wrap;
    padding: 12px 14px;
    gap: 10px;
  }

  .brand-name {
    font-size: 1rem;
  }

  .nav-links {
    order: 3;
    width: 100%;
    gap: 2px;
  }

  .nav-link {
    padding: 7px 11px;
    font-size: 0.85rem;
  }

  .user-zone {
    margin-left: auto;
  }

  .login-btn {
    margin-left: auto;
  }
}
</style>
