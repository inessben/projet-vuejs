<script setup>
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useToast } from '@/composables/useToast'
import { useAuthStore } from '@/stores/auth'

const email = ref('')
const password = ref('')
const isSubmitting = ref(false)

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000'
const { showToast } = useToast()
const authStore = useAuthStore()
const route = useRoute()
const router = useRouter()

const handleSubmit = async () => {
  isSubmitting.value = true

  try {
    const response = await fetch(`${apiBaseUrl}/api/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: email.value,
        password: password.value
      })
    })

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.message || 'Connexion impossible.')
    }

    authStore.setUser(data.user)
    showToast(`Bienvenue ${data.user?.name || ''}`.trim(), 'success')
    email.value = ''
    password.value = ''

    const redirectTarget =
      typeof route.query.redirect === 'string' && route.query.redirect.startsWith('/')
        ? route.query.redirect
        : '/profile'

    await router.push(redirectTarget)
  } catch (error) {
    showToast(error.message || 'Une erreur est survenue.', 'error')
  } finally {
    isSubmitting.value = false
  }
}
</script>

<template>
  <section class="login-card">
    <p class="login-subtitle">CONNEXION</p>
    <h1 class="login-title">Bienvenue</h1>
    <p class="login-text">Connecte-toi pour accéder à ta watchlist et à ton profil CineTrack.</p>

    <form @submit.prevent="handleSubmit" class="login-form">
      <div class="form-group">
        <label for="email">Adresse mail</label>
        <input id="email" v-model="email" type="email" placeholder="tonmail@exemple.com" required />
      </div>

      <div class="form-group">
        <label for="password">Mot de passe</label>
        <input id="password" v-model="password" type="password" placeholder="••••••••" required />
      </div>

      <div class="actions">
        <button type="submit" class="primary-btn" :disabled="isSubmitting">
          {{ isSubmitting ? 'Connexion...' : 'Se connecter' }}
        </button>
        <router-link to="/register" class="secondary-btn"> Créer un compte </router-link>
      </div>
    </form>
  </section>
</template>

<style scoped>
.login-card {
  max-width: 700px;
  margin: 24px auto;
  padding: 32px 24px;
  background: #f8f8f8;
  border-radius: 24px;
  box-shadow: 0 10px 30px rgba(120, 140, 160, 0.12);
  border: 1px solid rgba(80, 95, 120, 0.08);
}

.login-subtitle {
  margin: 0 0 12px;
  font-size: 0.95rem;
  font-weight: 800;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #3d4b63;
}

.login-title {
  margin: 0 0 16px;
  font-size: 3rem;
  line-height: 1.1;
  font-weight: 800;
  color: #1f2a3d;
  font-family: Georgia, 'Times New Roman', serif;
}

.login-text {
  margin: 0 0 28px;
  font-size: 1.15rem;
  line-height: 1.7;
  color: #3d4b63;
  max-width: 560px;
}

.login-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

label {
  font-size: 1rem;
  font-weight: 700;
  color: #2f3b52;
}

input {
  width: 100%;
  padding: 16px 18px;
  font-size: 1rem;
  color: #1f2a3d;
  background: #ffffff;
  border: 1px solid #d9dde5;
  border-radius: 18px;
  outline: none;
  transition: all 0.2s ease;
  box-sizing: border-box;
}

input::placeholder {
  color: #93a0b4;
}

input:focus {
  border-color: #f9732f;
  box-shadow: 0 0 0 4px rgba(249, 115, 47, 0.12);
}

.actions {
  margin-top: 8px;
  gap: 16px;
  display: flex;
  justify-content: flex-start;
}

.primary-btn {
  border: none;
  border-radius: 999px;
  padding: 14px 26px;
  background: linear-gradient(180deg, #ff7a36 0%, #f56824 100%);
  color: white;
  font-size: 1rem;
  font-weight: 800;
  cursor: pointer;
  box-shadow: 0 10px 20px rgba(245, 104, 36, 0.22);
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;
}

.primary-btn:hover {
  transform: translateY(-1px);
  box-shadow: 0 14px 24px rgba(245, 104, 36, 0.28);
}

.primary-btn:active {
  transform: translateY(0);
}

.primary-btn:disabled {
  cursor: wait;
  opacity: 0.75;
}

.secondary-btn {
  border-radius: 999px;
  padding: 14px 26px;
  background: transparent;
  border: 2px solid #f56824;
  color: #f56824;
  font-weight: 700;
  text-decoration: none;
  display: inline-block;
}

.secondary-btn:hover {
  background: rgba(245, 104, 36, 0.08);
}

@media (max-width: 768px) {
  .login-card {
    padding: 24px 18px;
    border-radius: 20px;
  }

  .login-title {
    font-size: 2.2rem;
  }

  .login-text {
    font-size: 1rem;
  }

  .primary-btn {
    width: 100%;
  }
}
</style>
