export function useTheme() {
  const estSombre = useState('theme-sombre', () => false)

  function appliquer(sombre) {
    document.documentElement.setAttribute('data-theme', sombre ? 'dark' : '')
    localStorage.setItem('cinetrack-theme', sombre ? 'dark' : 'light')
  }

  function basculerTheme() {
    estSombre.value = !estSombre.value
    appliquer(estSombre.value)
  }

  onMounted(() => {
    const sauvegarde = localStorage.getItem('cinetrack-theme')
    const prefereSombre =
      sauvegarde === 'dark' ||
      (!sauvegarde && window.matchMedia('(prefers-color-scheme: dark)').matches)
    estSombre.value = prefereSombre
    appliquer(prefereSombre)
  })

  return { estSombre, basculerTheme }
}
