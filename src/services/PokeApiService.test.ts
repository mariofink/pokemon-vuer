import { describe, test, expect, vi, beforeEach } from 'vitest';
import { PokeApiService } from './PokeApiService';

describe('PokeApiService', () => {
  const mockPokemon = {
    id: 1,
    name: 'bulbasaur',
    species: {},
    sprites: {}
  };

  beforeEach(() => {
    vi.resetAllMocks();
  });

  test('getPokemonById returns a valid Pokemon', async () => {
    const mockFetch = vi.spyOn(global, 'fetch').mockResolvedValue({
      ok: true,
      json: async () => mockPokemon
    } as Response);

    const service = new PokeApiService();
    const pokemon = await service.getPokemonById(1);

    expect(mockFetch).toHaveBeenCalledWith('https://pokeapi.co/api/v2/pokemon/1');
    expect(pokemon).toEqual(mockPokemon);
  });

  test('getPokemonById throws an error when fetch fails', async () => {
    vi.spyOn(global, 'fetch').mockResolvedValue({
      ok: false
    } as Response);

    const service = new PokeApiService();

    await expect(service.getPokemonById(1)).rejects.toThrow('Failed to fetch Pokémon with ID 1');
  });
});
