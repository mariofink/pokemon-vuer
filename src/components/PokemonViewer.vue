<script setup lang="ts">
import { usePokemonStore } from '@/stores/pokemonStore';
import LoaderIndicator from './LoaderIndicator.vue';

const store = usePokemonStore();
const getRandomPokemonID = () => Math.floor(Math.random() * 150) + 1;
</script>

<template>
  <div class="flex flex-col items-center mt-8">
    <h1 class="text-2xl font-bold">Random Pokémon Viewer</h1>
    <div class="mt-4 mb-8 h-[120px] flex items-center">
      <div v-if="store.isPending"><LoaderIndicator /></div>
      <div v-else-if="store.isError">An error has occurred: {{ store.error }}</div>
      <figure v-else-if="store.pokemon">
        <img :src="store.pokemon.sprites?.front_default" :alt="store.pokemon.name" />
        <figcaption class="text-center">{{ store.pokemon.name }}</figcaption>
      </figure>
    </div>
    <button
      type="button"
      @click="
        () => {
          store.updateId(getRandomPokemonID());
        }
      "
      class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
    >
      Get Random Pokémon
    </button>
  </div>
</template>
