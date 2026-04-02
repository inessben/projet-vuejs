export const vLazyImage = {
  mounted(el, binding) {
    const observateur = new IntersectionObserver(([entree]) => {
      if (entree.isIntersecting) {
        el.src = binding.value
        observateur.disconnect()
      }
    })

    observateur.observe(el)
  }
}
