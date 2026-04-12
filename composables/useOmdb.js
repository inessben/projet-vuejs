export function useOmdb() {
  const config = useRuntimeConfig()
  const CLE = config.public.omdbApiKey
  const BASE = 'https://www.omdbapi.com'

  async function get(params) {
    const url = new URL(BASE)
    url.searchParams.set('apikey', CLE)
    Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, v))
    const res = await fetch(url)
    if (!res.ok) throw new Error(`Erreur HTTP ${res.status}`)
    const data = await res.json()
    if (data.Response === 'False') throw new Error(data.Error)
    return data
  }

  return {
    searchMovies: (query, page = 1) => get({ s: query, type: 'movie', page }),
    getMovieById: (id) => get({ i: id, plot: 'full' }),
    searchByGenre: (genre, page = 1) => get({ s: genre, type: 'movie', page }),
    getPersonById: (id) => get({ i: id })
  }
}
