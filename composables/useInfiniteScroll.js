import { onMounted, onUnmounted } from 'vue'

export function useInfiniteScroll(callback, seuil = 200) {
  function verifier() {
    const distanceDuBas = document.body.offsetHeight - window.innerHeight - window.scrollY
    if (distanceDuBas < seuil) callback()
  }

  onMounted(() => window.addEventListener('scroll', verifier))
  onUnmounted(() => window.removeEventListener('scroll', verifier))
}
