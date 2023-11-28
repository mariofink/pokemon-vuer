<!-- PokemonViewer.vue -->
<template>
  <div class="flex flex-col items-center mt-8">
    <h1 class="text-2xl font-bold">Random Pokémon Viewer</h1>
    <div class="mt-4 mb-8 h-[120px] flex items-center">
      <div v-if="loading"><LoaderIndicator /></div>
      <div v-else>
        <img :src="pokemonSprite" :alt="pokemon.name" />
        <h2 class="text-center">{{ pokemon.name }}</h2>
      </div>
    </div>
    <button
      type="button"
      @click="fetchRandomPokemon"
      class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
    >
      Get Random Pokémon
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import LoaderIndicator from './LoaderIndicator.vue';

interface Pokemon {
  name: string;
  sprites: {
    front_default: string;
  };
}

export default defineComponent({
  name: 'PokemonViewer',
  components: { LoaderIndicator },
  data() {
    return {
      loading: true,
      pokemon: {} as Pokemon
    };
  },
  computed: {
    pokemonSprite(): string {
      return this.pokemon.sprites?.front_default || '';
    }
  },
  methods: {
    async fetchRandomPokemon() {
      this.loading = true;
      try {
        const randomPokemonId = Math.floor(Math.random() * 150) + 1;
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${randomPokemonId}`);
        const data = await response.json();
        this.pokemon = data;
      } catch (error) {
        console.error('Error fetching Pokémon:', error);
      } finally {
        this.loading = false;
      }
    }
  },
  mounted() {
    this.fetchRandomPokemon();
  }
});
</script>
