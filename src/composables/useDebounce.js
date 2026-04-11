export function useDebounce(fn, delai = 300) {
  let timer
  return (...args) => {
    clearTimeout(timer)
    timer = setTimeout(() => fn(...args), delai)
  }
}
