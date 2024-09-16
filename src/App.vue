<!-- App.vue -->
<template>
  <PokemonViewer />
  <VueQueryDevtools />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { VueQueryDevtools } from '@tanstack/vue-query-devtools'
import PokemonViewer from './components/PokemonViewer.vue';


export default defineComponent({
  name: 'App',
  components: {
    PokemonViewer,
    VueQueryDevtools
  }
});
</script>

<style></style>
