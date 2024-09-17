import { ref } from 'vue';
import { defineStore } from 'pinia';
import { usePokemonQuery } from '@/queries/pokemonQuery';

export const usePokemonStore = defineStore('pokemon', () => {
  const id = ref(3);
  const { isPending, isError, data, error } = usePokemonQuery(id);
  function updateId(newId: number) {
    id.value = newId;
  }
  return {
    id,
    pokemon: data,
    isPending,
    isError,
    error,
    updateId
  };
});
