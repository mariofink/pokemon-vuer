<template>
  <div class="flex flex-col items-center mt-8">
    <h1 class="text-2xl font-bold">Random Pokémon Viewer</h1>
    <div class="mt-4 mb-8 h-[120px] flex items-center">
      <div v-if="isPending"><LoaderIndicator /></div>
      <div v-else-if="isError">An error has occurred: {{ error }}</div>
      <figure v-else-if="Pokemon">
        <img :src="Pokemon.sprites?.front_default" :alt="Pokemon.name" />
        <figcaption class="text-center">{{ Pokemon.name }}</figcaption>
      </figure>
    </div>
    <button
      type="button"
      @click="refetch"
      class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
    >
      Get Random Pokémon
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { PokeApiService, type Pokemon } from '@/services/PokeApiService';
import { useQuery } from '@tanstack/vue-query'
import LoaderIndicator from './LoaderIndicator.vue';

const pokeApiService = new PokeApiService();

export default defineComponent({
  name: 'PokemonViewer',
  components: { LoaderIndicator },
  setup() {
    const { isPending, isError, isFetching, data: Pokemon, error, refetch } = useQuery({
      queryKey: ['pokemonRandom'],
      queryFn: (): Promise<Pokemon> => pokeApiService.getRandomPokemon(),
    })

    return { isPending, isError, isFetching, Pokemon, error, refetch }
  },
  data() {
    return {
      loading: true,
    };
  },
});
</script>
