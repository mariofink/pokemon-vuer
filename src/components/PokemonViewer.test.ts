import { describe, test, expect, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import { VueQueryPlugin, QueryClient } from '@tanstack/vue-query';
import PokemonViewer from '@/components/PokemonViewer.vue';

vi.mock('@/services/PokeApiService', () => {
  return {
    PokeApiService: vi.fn().mockImplementation(() => {
      return {
        getPokemonById: () => ({
          id: 1,
          name: 'bulbasaur',
          sprites: {
            front_default:
              'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png'
          } as any
        })
      };
    })
  };
});

describe('PokemonViewer', () => {
  const queryClient = new QueryClient();
  const mountOptions = {
    global: {
      plugins: [[VueQueryPlugin, { queryClient }]]
    }
  };

  test('renders a loader when loading', async () => {
    const wrapper = mount(PokemonViewer, mountOptions as any);
    await wrapper.vm.$nextTick();
    expect(wrapper.find('.loader-indicator').exists()).toBe(false);
  });

  test('renders Pokemon information after loading', async () => {
    const wrapper = mount(PokemonViewer, mountOptions as any);
    await wrapper.vm.$nextTick();
    expect(wrapper.find('img').exists()).toBe(true);
    expect(wrapper.find('img').attributes('src')).toBe(
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png'
    );
    expect(wrapper.find('figcaption').exists()).toBe(true);
    expect(wrapper.find('figcaption').text()).toBe('bulbasaur');
  });
});
