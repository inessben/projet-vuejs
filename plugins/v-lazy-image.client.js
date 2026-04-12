export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive('lazy-image', {
    mounted(el, binding) {
      const observateur = new IntersectionObserver(([entree]) => {
        if (entree.isIntersecting) {
          el.src = binding.value
          observateur.disconnect()
        }
      })
      observateur.observe(el)
    }
  })
})
