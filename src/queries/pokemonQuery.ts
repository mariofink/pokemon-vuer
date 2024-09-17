import { PokeApiService, type Pokemon } from '@/services/PokeApiService';
import { useQuery } from '@tanstack/vue-query';
import { computed, watch, type Ref } from 'vue';

const pokeApiService = new PokeApiService();

export function usePokemonQuery(id: Ref<number>) {
  const queryKey = computed(() => ['pokemon', id.value]);

  const query = useQuery({
    queryKey: queryKey,
    queryFn: (): Promise<Pokemon> => pokeApiService.getPokemonById(id.value)
  });

  // Watch for changes in the id and refetch the query
  watch(id, () => {
    query.refetch();
  });

  return query;
}
