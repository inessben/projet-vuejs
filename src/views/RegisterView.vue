<template>
  <section class="register-card">
    <p class="register-subtitle">INSCRIPTION</p>
    <h1 class="register-title">Créer un compte</h1>
    <p class="register-text">Rejoins CineTrack pour enregistrer tes films et gérer ta watchlist.</p>

    <form @submit.prevent="handleSubmit" class="register-form">
      <div class="form-group">
        <label for="name">Nom</label>
        <input id="name" v-model="name" type="text" placeholder="Ton nom" required />
      </div>

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
          {{ isSubmitting ? 'Inscription...' : "S'inscrire" }}
        </button>

        <router-link to="/login" class="secondary-btn"> Déjà un compte ? </router-link>
      </div>
    </form>
  </section>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useToast } from '@/composables/useToast'

const name = ref('')
const email = ref('')
const password = ref('')
const isSubmitting = ref(false)

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000'
const { showToast } = useToast()
const router = useRouter()

const handleSubmit = async () => {
  isSubmitting.value = true

  try {
    const response = await fetch(`${apiBaseUrl}/api/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: name.value,
        email: email.value,
        password: password.value
      })
    })

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.message || 'Impossible de créer le compte.')
    }

    showToast(data.message || 'Compte créé avec succès.', 'success')
    name.value = ''
    email.value = ''
    password.value = ''
    await router.push({
      path: '/login',
      query: { registered: '1' }
    })
  } catch (error) {
    showToast(error.message || 'Une erreur est survenue.', 'error')
  } finally {
    isSubmitting.value = false
  }
}
</script>

<style scoped>
.register-card {
  max-width: 700px;
  margin: 24px auto;
  padding: 32px 24px;
  background: #f8f8f8;
  border-radius: 24px;
  box-shadow: 0 10px 30px rgba(120, 140, 160, 0.12);
  border: 1px solid rgba(80, 95, 120, 0.08);
}

.register-subtitle {
  margin: 0 0 12px;
  font-size: 0.95rem;
  font-weight: 800;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #3d4b63;
}

.register-title {
  margin: 0 0 16px;
  font-size: 3rem;
  line-height: 1.1;
  font-weight: 800;
  color: #1f2a3d;
  font-family: Georgia, 'Times New Roman', serif;
}

.register-text {
  margin: 0 0 28px;
  font-size: 1.15rem;
  line-height: 1.7;
  color: #3d4b63;
  max-width: 560px;
}

.register-form {
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
  display: flex;
  gap: 16px;
  margin-top: 12px;
  align-items: center;
  flex-wrap: wrap;
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
  font-size: 1rem;
  font-weight: 700;
  text-decoration: none;
  display: inline-block;
  transition: all 0.2s ease;
}

.secondary-btn:hover {
  background: rgba(245, 104, 36, 0.08);
}

@media (max-width: 768px) {
  .register-card {
    padding: 24px 18px;
    border-radius: 20px;
  }

  .register-title {
    font-size: 2.2rem;
  }

  .register-text {
    font-size: 1rem;
  }

  .actions {
    flex-direction: column;
    align-items: stretch;
  }

  .primary-btn,
  .secondary-btn {
    width: 100%;
    text-align: center;
  }
}
</style>
