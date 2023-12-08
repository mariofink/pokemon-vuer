import PokeApiSchema from '@/schemas/PokeApiSchema';

interface Pokemon {
  name: string;
  sprites: {
    front_default: string;
  };
}

export class PokeApiService {
  private apiUrl: string;

  constructor(apiUrl: string = 'https://pokeapi.co/api/v2') {
    this.apiUrl = apiUrl;
  }

  private async fetchPokemonById(id: number): Promise<Pokemon> {
    const response = await fetch(`${this.apiUrl}/pokemon/${id}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch Pokémon with ID ${id}`);
    }
    const { value, error } = PokeApiSchema.validate(await response.json());
    if (error) {
      console.error(error);
    }
    return value;
  }

  async getRandomPokemon(): Promise<Pokemon> {
    const randomPokemonId = Math.floor(Math.random() * 150) + 1;
    return this.fetchPokemonById(randomPokemonId);
  }

  async getPokemonById(id: number): Promise<Pokemon> {
    return this.fetchPokemonById(id);
  }
}
