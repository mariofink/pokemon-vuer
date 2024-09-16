<template>
  <div class="flex flex-col items-center mt-8">
    <h1 class="text-2xl font-bold">Random Pokémon Viewer</h1>
    <div class="mt-4 mb-8 h-[120px] flex items-center">
      <div v-if="isPending"><LoaderIndicator /></div>
      <div v-else-if="isError">An error has occurred: {{ error }}</div>
      <figure v-else-if="data">
        <img :src="data.sprites?.front_default" :alt="data.name" />
        <figcaption class="text-center">{{ data.name }}</figcaption>
      </figure>
    </div>
    <button
      type="button"
      @click="
        () => {
          pokemonID = getRandomPokemonID();
        }
      "
      class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
    >
      Get Random Pokémon
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { PokeApiService, type Pokemon } from '@/services/PokeApiService';
import { useQuery } from '@tanstack/vue-query';
import LoaderIndicator from './LoaderIndicator.vue';

const pokeApiService = new PokeApiService();

const getRandomPokemonID = () => Math.floor(Math.random() * 150) + 1;
const pokemonID = ref(getRandomPokemonID());
import { computed } from 'vue';

const queryKey = computed(() => ['pokemon', pokemonID.value]);
const { isPending, isError, data, error } = useQuery({
  queryKey,
  queryFn: (): Promise<Pokemon> => pokeApiService.getPokemonById(pokemonID.value)
});
</script>
