<template>
  <div class="flex flex-col items-center mt-8">
    <h1 class="text-2xl font-bold">Random Pokémon Viewer</h1>
    <div class="mt-4 mb-8 h-[120px] flex items-center">
      <div v-if="loading"><LoaderIndicator /></div>
      <figure v-else>
        <img :src="pokemonSprite" :alt="pokemon.name" />
        <figcaption class="text-center">{{ pokemon.name }}</figcaption>
      </figure>
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
import { PokeApiService, type Pokemon } from '@/services/PokeApiService';
import LoaderIndicator from './LoaderIndicator.vue';

const pokeApiService = new PokeApiService();

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
        this.pokemon = await pokeApiService.getRandomPokemon();
      } catch (error) {
        this.pokemon = {} as Pokemon;
        console.error(error);
      }
      this.loading = false;
    }
  },
  mounted() {
    this.fetchRandomPokemon();
  }
});
</script>
