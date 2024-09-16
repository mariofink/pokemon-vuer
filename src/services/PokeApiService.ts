import { type InferType } from 'yup';
import PokeApiSchema from '@/schemas/PokeApiSchema';

export interface Pokemon extends InferType<typeof PokeApiSchema> {}

export class PokeApiService {
  private readonly apiUrl: string;

  constructor(apiUrl: string = 'https://pokeapi.co/api/v2') {
    this.apiUrl = apiUrl;
  }

  private async fetchPokemonById(id: number): Promise<Pokemon> {
    const response = await fetch(`${this.apiUrl}/pokemon/${id}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch Pokémon with ID ${id}`);
    }
    return PokeApiSchema.validate(await response.json());
  }

  async getPokemonById(id: number): Promise<Pokemon> {
    return this.fetchPokemonById(id);
  }
}
