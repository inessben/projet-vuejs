import { describe, test, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'

const fermerSessionMock = vi.fn()
const pushMock = vi.fn()
const basculerThemeMock = vi.fn()

vi.mock('~/stores/user', () => ({
  useUserStore: () => ({
    estConnecte: true,
    username: 'john',
    initiales: 'JD',
    fermerSession: fermerSessionMock
  })
}))

vi.mock('~/composables/useTheme', () => ({
  useTheme: () => ({
    estSombre: false,
    basculerTheme: basculerThemeMock
  })
}))

vi.mock('#app', async (importOriginal) => {
  const actual = await importOriginal()
  return {
    ...actual,
    useRouter: () => ({
      push: pushMock
    })
  }
})

import AppNavbar from '../../components/AppNavbar.vue'

function mountNavbar() {
  return mount(AppNavbar, {
    global: {
      stubs: {
        NuxtLink: {
          template: '<a><slot /></a>'
        }
      }
    }
  })
}

describe('AppNavbar', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  test('rend la navbar', () => {
    const wrapper = mountNavbar()

    expect(wrapper.exists()).toBe(true)
    expect(wrapper.text()).toContain('CineTrack')
  })

  test('affiche les infos utilisateur si connecté', () => {
    const wrapper = mountNavbar()

    expect(wrapper.text()).toContain('@john')
    expect(wrapper.text()).toContain('JD')
  })

  test('déconnecte et redirige', async () => {
    const wrapper = mountNavbar()

    const decoBtn = wrapper.find('.deco-btn')
    expect(decoBtn.exists()).toBe(true)

    await decoBtn.trigger('click')

    expect(fermerSessionMock).toHaveBeenCalledTimes(1)
  })

  test('change le thème au clic', async () => {
    const wrapper = mountNavbar()

    await wrapper.find('.theme-btn').trigger('click')

    expect(basculerThemeMock).toHaveBeenCalledTimes(1)
  })

  test('affiche watchlist si connecté', () => {
    const wrapper = mountNavbar()

    expect(wrapper.text()).toContain('Watchlist')
  })
})
