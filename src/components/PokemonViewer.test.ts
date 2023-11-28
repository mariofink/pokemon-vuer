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
    // TODO: Very hard to test with the current implementation.
    const wrapper = mount(PokemonViewer);

    // Wait for the fetchRandomPokemon method to complete
    await wrapper.vm.$nextTick();

    // Ensure the Pokemon image is rendered when not loading
    expect(wrapper.find('img').exists()).toBe(true);
    // Ensure the Pokemon name is rendered when not loading
    expect(wrapper.find('figcaption').exists()).toBe(true);
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
