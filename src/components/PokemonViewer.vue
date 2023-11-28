<!-- PokemonViewer.vue -->
<template>
  <div>
    <h1>Random Pokémon Viewer</h1>
    <div v-if="loading">Loading...</div>
    <div v-else>
      <img :src="pokemonSprite" :alt="pokemon.name" />
      <h2>{{ pokemon.name }}</h2>
    </div>
    <button @click="fetchRandomPokemon">Get Random Pokémon</button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

interface Pokemon {
  name: string;
  sprites: {
    front_default: string;
  };
}

export default defineComponent({
  name: 'PokemonViewer',
  data() {
    return {
      loading: false,
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
