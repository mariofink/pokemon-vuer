import { describe, test, expect, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import PokemonViewer from '@/components/PokemonViewer.vue';

describe('PokemonViewer', () => {
  test('renders a loader when loading', async () => {
    const wrapper = mount(PokemonViewer);

    // Ensure the loader is rendered when loading is true
    expect(wrapper.find('[role=status]').exists()).toBe(true);

    // Wait for the fetchRandomPokemon method to complete
    await wrapper.vm.$nextTick();

    // Ensure the loader is not rendered when loading is false
    expect(wrapper.find('.loader-indicator').exists()).toBe(false);
  });

test('renders Pokemon information after loading', async () => {
    const wrapper = mount(PokemonViewer);
    // Simulate the component's state after fetching a Pokemon
    wrapper.setData({
      loading: false,
      pokemon: {
        id: 1,
        name: 'bulbasaur',
        sprites: {
          front_default: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png',
        },
      },
    });
    await wrapper.vm.$nextTick();
    // Ensure the Pokemon image and name are rendered when not loading
    expect(wrapper.find('img').exists()).toBe(true);
    expect(wrapper.find('img').attributes('src')).toBe('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png');
    expect(wrapper.find('figcaption').exists()).toBe(true);
    expect(wrapper.find('figcaption').text()).toBe('bulbasaur');
  });

  test('fetches random Pokemon when the button is clicked', async () => {
    const wrapper = mount(PokemonViewer);

    // Mock the fetchRandomPokemon method
    const fetchRandomPokemonMock = vi.spyOn(wrapper.vm, 'fetchRandomPokemon');

    // Click the button
    await wrapper.find('button').trigger('click');

    // Ensure the fetchRandomPokemon method is called
    expect(fetchRandomPokemonMock).toHaveBeenCalled();
  });
});
