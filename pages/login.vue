<script setup>
import { ref, computed, watch } from 'vue'
import { useUserStore } from '~/stores/user'

definePageMeta({ middleware: 'guest' })

const router = useRouter()
const route = useRoute()
const userStore = useUserStore()

const mode = ref('login')
function basculerMode() {
  mode.value = mode.value === 'login' ? 'register' : 'login'
  erreurGlobale.value = ''
  usernameDisponible.value = null
}

const username = ref('')
const password = ref('')
const email = ref('')
const passwordVisible = ref(false)
const chargement = ref(false)
const erreurGlobale = ref('')
const usernameDisponible = ref(null)

const REGEX_USERNAME = /^[a-zA-Z0-9_-]{3,20}$/
const erreurUsername = computed(() => {
  if (!username.value) return ''
  if (!REGEX_USERNAME.test(username.value)) return '3–20 caractères, lettres/chiffres/_ autorisés.'
  return ''
})

const erreurPassword = computed(() => {
  if (!password.value) return ''
  if (password.value.length < 8) return 'Minimum 8 caractères.'
  if (!/\d/.test(password.value)) return 'Doit contenir au moins un chiffre.'
  return ''
})

const erreurEmail = computed(() => {
  if (mode.value !== 'register' || !email.value) return ''
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) return 'Email invalide.'
  return ''
})

const formulaireValide = computed(() => {
  if (erreurUsername.value || erreurPassword.value) return false
  if (!username.value || !password.value) return false
  if (mode.value === 'register') {
    if (erreurEmail.value || !email.value) return false
    if (usernameDisponible.value === false) return false
  }
  return true
})

const verificateurUsername = useDebounce(async (u) => {
  if (!u || erreurUsername.value || mode.value !== 'register') {
    usernameDisponible.value = null
    return
  }
  try {
    const { disponible } = await $fetch('/api/auth/check-username', { query: { username: u } })
    usernameDisponible.value = disponible
  } catch {
    usernameDisponible.value = null
  }
}, 400)

watch(username, (u) => {
  erreurGlobale.value = ''
  if (mode.value === 'register') verificateurUsername(u)
  else usernameDisponible.value = null
})

watch([password, email], () => {
  erreurGlobale.value = ''
})

async function soumettre() {
  if (!formulaireValide.value || chargement.value) return
  chargement.value = true
  erreurGlobale.value = ''

  try {
    if (mode.value === 'register') {
      const compte = await $fetch('/api/auth/register', {
        method: 'POST',
        body: { username: username.value, email: email.value, password: password.value }
      })
      userStore.ouvrirSession({ id: compte.id, username: compte.username, email: compte.email })
    } else {
      const compte = await $fetch('/api/auth/login', {
        method: 'POST',
        body: { username: username.value, password: password.value }
      })
      userStore.ouvrirSession({ id: compte.id, username: compte.username, email: compte.email })
    }
    const destination = route.query.redirect || '/profile'
    router.push(destination)
  } catch (e) {
    erreurGlobale.value = e.data?.message || 'Une erreur est survenue.'
  } finally {
    chargement.value = false
  }
}
</script>

<template>
  <section class="page auth-view">
    <article class="panel auth-card">
      <div class="auth-header">
        <img src="/logo.png" alt="CineTrack" class="auth-logo" />
        <h1 class="auth-title">
          {{ mode === 'login' ? 'Connexion' : 'Inscription' }}
        </h1>
        <p class="text-muted auth-subtitle">
          {{ mode === 'login' ? 'Retrouve ta watchlist et tes avis.' : 'Crée ton compte CineTrack gratuitement.' }}
        </p>
      </div>

      <form class="auth-form" @submit.prevent="soumettre">
        <div class="field">
          <label class="field-label" for="auth-username">Nom d'utilisateur</label>
          <div class="input-wrapper">
            <input
              id="auth-username"
              v-model="username"
              class="input"
              :class="{
                'input-error': erreurUsername,
                'input-ok': mode === 'register' && usernameDisponible === true && !erreurUsername
              }"
              type="text"
              placeholder="ex: MonSuperUsername"
              autocomplete="username"
              maxlength="20"
            />
            <span
              v-if="mode === 'register' && username && !erreurUsername"
              class="badge"
              :class="usernameDisponible ? 'badge-ok' : 'badge-taken'"
            >
              {{ usernameDisponible ? '✓ Disponible' : '✗ Déjà pris' }}
            </span>
          </div>
          <p v-if="erreurUsername" class="field-error">{{ erreurUsername }}</p>
        </div>

        <div v-if="mode === 'register'" class="field">
          <label class="field-label" for="auth-email">Email</label>
          <input
            id="auth-email"
            v-model="email"
            class="input"
            :class="{ 'input-error': erreurEmail }"
            type="email"
            placeholder="ton@email.com"
            autocomplete="email"
          />
          <p v-if="erreurEmail" class="field-error">{{ erreurEmail }}</p>
        </div>

        <div class="field">
          <label class="field-label" for="auth-password">Mot de passe</label>
          <div class="password-wrapper">
            <input
              id="auth-password"
              v-model="password"
              class="input password-input"
              :class="{ 'input-error': erreurPassword }"
              :type="passwordVisible ? 'text' : 'password'"
              placeholder="Min. 8 caractères + 1 chiffre"
              autocomplete="current-password"
            />
            <button
              type="button"
              class="toggle-password"
              :aria-label="passwordVisible ? 'Masquer' : 'Afficher'"
              @click="passwordVisible = !passwordVisible"
            >
              {{ passwordVisible ? '🙈' : '👁' }}
            </button>
          </div>
          <p v-if="erreurPassword" class="field-error">{{ erreurPassword }}</p>
          <p v-if="mode === 'register' && !erreurPassword && password" class="field-hint">✓ Mot de passe valide</p>
        </div>

        <p v-if="erreurGlobale" class="erreur-globale">{{ erreurGlobale }}</p>

        <button
          type="submit"
          class="btn btn-primary submit-btn"
          :disabled="!formulaireValide || chargement"
        >
          {{ chargement ? 'Chargement...' : mode === 'login' ? 'Se connecter' : 'Créer le compte' }}
        </button>
      </form>

      <div class="switch-mode">
        <span class="text-muted">{{ mode === 'login' ? 'Pas encore de compte ?' : 'Déjà inscrit ?' }}</span>
        <button class="link-btn" type="button" @click="basculerMode">
          {{ mode === 'login' ? "S'inscrire" : 'Se connecter' }}
        </button>
      </div>
    </article>
  </section>
</template>

<style scoped>
.auth-view {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 70vh;
}

.auth-card {
  width: min(440px, 100%);
  padding: clamp(24px, 4vw, 40px);
  display: grid;
  gap: 26px;
}

.auth-header {
  display: grid;
  gap: 8px;
  text-align: center;
}

.auth-logo {
  width: 48px;
  height: 48px;
  object-fit: contain;
  border-radius: 12px;
  margin: 0 auto 4px;
  display: block;
}

.auth-title {
  margin: 0;
  font-family: 'Fraunces', serif;
  font-size: 1.6rem;
  font-weight: 700;
  color: var(--text-900);
  letter-spacing: -0.01em;
}

.auth-subtitle {
  margin: 0;
  font-size: 0.92rem;
}

.auth-form {
  display: grid;
  gap: 16px;
}

.field {
  display: grid;
  gap: 5px;
}

.field-label {
  font-size: 0.84rem;
  font-weight: 700;
  color: var(--text-700);
}

.field-error {
  margin: 0;
  font-size: 0.8rem;
  color: var(--danger);
}

.field-hint {
  margin: 0;
  font-size: 0.8rem;
  color: var(--success);
}

.input-error {
  border-color: var(--danger) !important;
  box-shadow: 0 0 0 3px rgba(211, 72, 72, 0.10) !important;
}

.input-ok {
  border-color: var(--success) !important;
  box-shadow: 0 0 0 3px rgba(29, 155, 102, 0.10) !important;
}

.input-wrapper {
  display: grid;
  gap: 5px;
}

.badge {
  font-size: 0.76rem;
  font-weight: 700;
  padding: 2px 9px;
  border-radius: 999px;
  width: fit-content;
}

.badge-ok {
  background: rgba(29, 155, 102, 0.10);
  color: var(--success);
}

.badge-taken {
  background: rgba(211, 72, 72, 0.08);
  color: var(--danger);
}

.password-wrapper {
  position: relative;
  display: flex;
  align-items: center;
}

.password-input {
  padding-right: 44px;
}

.toggle-password {
  position: absolute;
  right: 12px;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1rem;
  padding: 0;
  line-height: 1;
  opacity: 0.7;
  transition: opacity var(--transition);
}

.toggle-password:hover {
  opacity: 1;
}

.erreur-globale {
  margin: 0;
  padding: 10px 14px;
  background: rgba(211, 72, 72, 0.07);
  border: 1.5px solid rgba(211, 72, 72, 0.22);
  border-radius: var(--radius-md);
  color: var(--danger);
  font-size: 0.87rem;
}

.submit-btn {
  width: 100%;
  padding: 12px;
  font-size: 0.95rem;
}

.switch-mode {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  font-size: 0.9rem;
}

.link-btn {
  background: none;
  border: none;
  cursor: pointer;
  font-family: 'Open Sans', sans-serif;
  font-size: inherit;
  font-weight: 700;
  color: var(--accent-strong);
  padding: 0;
  text-decoration: underline;
  text-underline-offset: 2px;
  transition: color var(--transition);
}

.link-btn:hover {
  color: var(--accent);
}
</style>
