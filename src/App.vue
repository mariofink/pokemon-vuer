<!-- App.vue -->
<template>
  <PokemonViewer />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import PokemonViewer from './components/PokemonViewer.vue';

export default defineComponent({
  name: 'App',
  components: {
    PokemonViewer
  }
});
</script>

<style></style>
