// src/services/omdb.js — fichier central pour tous les appels API
const BASE = 'https://www.omdbapi.com'
const CLE = import.meta.env.VITE_OMDB_API_KEY
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
export const searchMovies = (query, page = 1) => get({ s: query, type: 'movie', page })
export const getMovieById = (id) => get({ i: id, plot: 'full' })
export const searchByGenre = (genre, page = 1) => get({ s: genre, type: 'movie', page })
export const getPersonById = (id) => get({ i: id })
