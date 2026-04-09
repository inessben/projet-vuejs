<script setup></script>

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
        <li><RouterLink to="/watchlist" class="nav-link">Watchlist</RouterLink></li>
        <li><RouterLink to="/profile" class="nav-link">Profil</RouterLink></li>
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

.nav-link {
  text-decoration: none;
  padding: 9px 13px;
  border-radius: 999px;
  color: var(--text-700);
  font-weight: 500;
  transition: color 170ms ease, background-color 170ms ease;
}

.nav-link:hover {
  color: var(--text-900);
  background: rgba(255, 255, 255, 0.7);
}

.nav-link.router-link-active {
  color: #fff;
  background: linear-gradient(135deg, var(--accent) 0%, var(--accent-strong) 100%);
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

  .nav-link {
    padding: 8px 11px;
    font-size: 0.95rem;
  }
}
</style>
