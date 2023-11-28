<!-- App.vue -->
<template>
  <div id="app">
    <PokemonViewer />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import PokemonViewer from './components/PokemonViewer.vue'

export default defineComponent({
  name: 'App',
  components: {
    PokemonViewer
  }
})
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

button {
  margin-top: 20px;
  padding: 10px;
  cursor: pointer;
}
</style>
