import { reactive } from 'vue'
const toasts = reactive([])
let compteur = 0
export function useToast() {
  function showToast(message, type = 'success') {
    const id = ++compteur
    toasts.push({ id, message, type })
    setTimeout(() => supprimerToast(id), 3000)
  }
  function supprimerToast(id) {
    const index = toasts.findIndex((t) => t.id === id)
    if (index !== -1) toasts.splice(index, 1)
  }
  return { toasts, showToast, supprimerToast }
}
