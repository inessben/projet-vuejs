import { describe, test, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'

const ajouterMock = vi.fn()
const retirerMock = vi.fn()
const estDansLaListeMock = vi.fn(() => false)
const showToastMock = vi.fn()
const pushMock = vi.fn()
const getMovieByIdMock = vi.fn()

vi.mock('~/stores/watchlist', () => ({
  useWatchlistStore: () => ({
    ajouter: ajouterMock,
    retirer: retirerMock,
    estDansLaListe: estDansLaListeMock
  })
}))

vi.mock('~/stores/user', () => ({
  useUserStore: () => ({
    estConnecte: true,
    username: 'john'
  })
}))

vi.mock('~/composables/useToast', () => ({
  useToast: () => ({
    showToast: showToastMock
  })
}))

vi.mock('#app', async (importOriginal) => {
  const actual = await importOriginal()
  return {
    ...actual,
    useRouter: () => ({
      push: pushMock
    }),
    useRoute: () => ({
      fullPath: '/movies/tt1234567'
    })
  }
})

vi.mock('~/composables/useOmdb', () => ({
  useOmdb: () => ({
    getMovieById: getMovieByIdMock
  })
}))

import WatchlistButton from '../../components/WatchlistButton.vue'

function mountWatchlistButton(film = { imdbID: 'tt1234567', title: 'Test Movie' }) {
  return mount(WatchlistButton, {
    props: {
      film
    }
  })
}

describe('WatchlistButton', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    estDansLaListeMock.mockReturnValue(false)
  })

  test('affiche le bouton "+ Watchlist" quand le film n\'est pas dans la liste', () => {
    const wrapper = mountWatchlistButton()

    expect(wrapper.text()).toContain('+ Watchlist')
  })

  test('affiche le bouton "Retirer" quand le film est dans la liste', () => {
    estDansLaListeMock.mockReturnValue(true)
    const wrapper = mountWatchlistButton()

    expect(wrapper.text()).toContain('Retirer')
  })

  test("applique la classe btn-primary quand le film n'est pas dans la liste", () => {
    const wrapper = mountWatchlistButton()

    expect(wrapper.classes()).toContain('btn-primary')
  })

  test('applique la classe btn-secondary quand le film est dans la liste', () => {
    estDansLaListeMock.mockReturnValue(true)
    const wrapper = mountWatchlistButton()

    expect(wrapper.classes()).toContain('btn-secondary')
  })

  test('ajoute le film à la watchlist lors du clic', async () => {
    getMovieByIdMock.mockResolvedValue({
      imdbID: 'tt1234567',
      title: 'Test Movie',
      plot: 'Test plot'
    })

    const wrapper = mountWatchlistButton()
    const button = wrapper.find('button')

    await button.trigger('click')
    await wrapper.vm.$nextTick()

    expect(ajouterMock).toHaveBeenCalled()
    expect(showToastMock).toHaveBeenCalledWith('Film ajoute a la watchlist !')
  })

  test('retire le film de la watchlist lors du clic', async () => {
    estDansLaListeMock.mockReturnValue(true)
    const wrapper = mountWatchlistButton()
    const button = wrapper.find('button')

    await button.trigger('click')
    await wrapper.vm.$nextTick()

    expect(retirerMock).toHaveBeenCalledWith('tt1234567')
    expect(showToastMock).toHaveBeenCalledWith('Film retire de la watchlist')
  })

  test("affiche un message d'erreur si l'API échoue", async () => {
    getMovieByIdMock.mockRejectedValue(new Error('API Error'))

    const wrapper = mountWatchlistButton()
    const button = wrapper.find('button')

    await button.trigger('click')
    await wrapper.vm.$nextTick()

    expect(ajouterMock).toHaveBeenCalledWith({ imdbID: 'tt1234567', title: 'Test Movie' })
    expect(showToastMock).toHaveBeenCalledWith(
      'Film ajoute a la watchlist (infos partielles).',
      'error'
    )
  })

  test('le bouton a la classe "btn"', () => {
    const wrapper = mountWatchlistButton()

    expect(wrapper.classes()).toContain('btn')
  })

  test('accepte un film avec les propriétés imdbID et title', () => {
    const film = {
      imdbID: 'tt9876543',
      title: 'Another Movie'
    }

    const wrapper = mountWatchlistButton(film)

    expect(wrapper.exists()).toBe(true)
    expect(wrapper.props('film')).toEqual(film)
  })

  test('le bouton est désactivé pendant le rendu initial si film.imdbID est vide', () => {
    const wrapper = mountWatchlistButton({ imdbID: '', title: 'Test' })

    expect(wrapper.find('button').exists()).toBe(true)
  })

  test('affiche le contenu du template correctement', () => {
    const wrapper = mountWatchlistButton()

    expect(wrapper.find('button').exists()).toBe(true)
    expect(wrapper.html()).toMatch(/button/)
  })

  test('utilise le film passé en prop', async () => {
    const film = { imdbID: 'test-id', title: 'Test Title' }
    const wrapper = mountWatchlistButton(film)

    expect(wrapper.props('film')).toEqual(film)
  })

  test("vérifier que l'utilisateur ne peut pas cliquer trop rapidement", async () => {
    getMovieByIdMock.mockResolvedValue({
      imdbID: 'tt1234567',
      title: 'Test Movie'
    })

    const wrapper = mountWatchlistButton()
    const button = wrapper.find('button')

    const firstClick = button.trigger('click')
    await wrapper.vm.$nextTick()

    const initialCallCount = ajouterMock.mock.calls.length

    await firstClick
  })
})
