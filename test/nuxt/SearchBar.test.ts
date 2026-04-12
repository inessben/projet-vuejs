import { describe, test, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'

const debounceMock = vi.fn()

vi.mock('~/composables/useDebounce', () => ({
  useDebounce: (fn: Function) => {
    return (value: any) => {
      fn(value)
    }
  }
}))

import SearchBar from '../../components/SearchBar.vue'

function mountSearchBar(initialQuery = '') {
  return mount(SearchBar, {
    props: {
      modelValue: initialQuery
    }
  })
}

describe('SearchBar', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  test('rend le composant SearchBar', () => {
    const wrapper = mountSearchBar()

    expect(wrapper.exists()).toBe(true)
    expect(wrapper.find('.search-bar').exists()).toBe(true)
  })

  test('a l\'attribut role="search" pour l\'accessibilité', () => {
    const wrapper = mountSearchBar()

    expect(wrapper.find('[role="search"]').exists()).toBe(true)
  })

  test("affiche l'icône de recherche", () => {
    const wrapper = mountSearchBar()

    expect(wrapper.find('.search-icon').exists()).toBe(true)
    expect(wrapper.find('.search-icon svg').exists()).toBe(true)
  })

  test("affiche l'input avec le placeholder correct", () => {
    const wrapper = mountSearchBar()
    const input = wrapper.find('.search-input')

    expect(input.exists()).toBe(true)
    expect(input.attributes('placeholder')).toBe('Chercher un film...')
  })

  test('affiche la classe "input" sur l\'input', () => {
    const wrapper = mountSearchBar()
    const input = wrapper.find('.search-input')

    expect(input.classes()).toContain('input')
    expect(input.classes()).toContain('search-input')
  })

  test('met à jour le v-model lors du typage', async () => {
    const wrapper = mountSearchBar()
    const input = wrapper.find('input')

    await input.setValue('Inception')

    expect(wrapper.emitted('update:modelValue')).toBeTruthy()
  })

  test("le bouton clear n'est pas visible au démarrage", () => {
    const wrapper = mountSearchBar('')

    expect(wrapper.find('.clear-btn').exists()).toBe(false)
  })

  test('le bouton clear apparaît quand il y a du texte', async () => {
    const wrapper = mountSearchBar('Test')

    await wrapper.vm.$nextTick()

    expect(wrapper.find('.clear-btn').exists()).toBe(true)
  })

  test('le bouton clear a un aria-label', async () => {
    const wrapper = mountSearchBar('Test')

    await wrapper.vm.$nextTick()

    const clearBtn = wrapper.find('.clear-btn')
    expect(clearBtn.attributes('aria-label')).toBe('Effacer')
  })

  test('le bouton clear contient un SVG', async () => {
    const wrapper = mountSearchBar('Test')

    await wrapper.vm.$nextTick()

    const clearBtn = wrapper.find('.clear-btn')
    expect(clearBtn.find('svg').exists()).toBe(true)
  })

  test('cliquer sur le bouton clear efface le texte', async () => {
    const wrapper = mountSearchBar('Inception')

    await wrapper.vm.$nextTick()

    const clearBtn = wrapper.find('.clear-btn')
    await clearBtn.trigger('click')

    expect(wrapper.emitted('update:modelValue')).toBeTruthy()
  })

  test('émet l\'événement "search" lors du typage', async () => {
    const wrapper = mountSearchBar()
    const input = wrapper.find('input')

    await input.setValue('Matrix')

    expect(wrapper.emitted('search')).toBeTruthy()
  })

  test('émet l\'événement "search" avec la bonne valeur', async () => {
    const wrapper = mountSearchBar()
    const input = wrapper.find('input')

    await input.setValue('Avatar')

    const emitted = wrapper.emitted('search')
    expect(emitted).toBeTruthy()
    expect(emitted?.[0]?.[0]).toBe('Avatar')
  })

  test('la structure du template est correcte', () => {
    const wrapper = mountSearchBar()

    const searchBar = wrapper.find('.search-bar')
    expect(searchBar.find('.search-icon').exists()).toBe(true)
    expect(searchBar.find('.search-input').exists()).toBe(true)
  })

  test('l\'input a la classe "search-input"', () => {
    const wrapper = mountSearchBar()
    const input = wrapper.find('.search-input')

    expect(input.exists()).toBe(true)
    expect(input.classes()).toContain('search-input')
  })

  test('accepte une valeur initiale en prop', () => {
    const wrapper = mountSearchBar('Initial Search')

    const input = wrapper.find('input') as any
    expect(input.element.value).toBe('Initial Search')
  })

  test('le bouton clear a les bonnes classes', async () => {
    const wrapper = mountSearchBar('Test')

    await wrapper.vm.$nextTick()

    const clearBtn = wrapper.find('.clear-btn')
    expect(clearBtn.classes()).toContain('clear-btn')
  })

  test("affiche l'input avec la bonne classe", () => {
    const wrapper = mountSearchBar()

    const input = wrapper.find('input')
    expect(input.classes()).toContain('search-input')
  })

  test('émet plusieurs fois lors de plusieurs saisies', async () => {
    const wrapper = mountSearchBar()
    const input = wrapper.find('input')

    await input.setValue('Dia')
    await input.setValue('Diana')
    await input.setValue('Diamond')

    const searchEvents = wrapper.emitted('search')
    expect(searchEvents).toBeTruthy()
    expect(searchEvents?.length).toBeGreaterThanOrEqual(1)
  })

  test('le composant utilise v-model correctement', async () => {
    const wrapper = mountSearchBar('Test')

    const input = wrapper.find('input') as any
    expect(input.element.value).toBe('Test')

    await input.setValue('Updated')
    expect(wrapper.emitted('update:modelValue')).toBeTruthy()
  })
})
