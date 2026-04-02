<script setup></script>

<template>
  <nav>
    <ul>
      <li><RouterLink to="/">Accueil</RouterLink></li>
      <li><RouterLink to="/search">Recherche</RouterLink></li>
      <li><RouterLink to="/watchlist">Watchlist</RouterLink></li>
      <li><RouterLink to="/profile">Profile</RouterLink></li>
    </ul>
  </nav>
</template>

<style scoped>
ul {
  list-style: none;
  display: flex;
  justify-content: space-around;
}
</style>
