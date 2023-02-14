<template>
  <div class="card">
    <div class="card-img">
      <img :src="computedPokemon.src" :alt="computedPokemon.name" />
    </div>
    <div class="card-content">
      <h4>{{ computedPokemon.id }}</h4>
      <p>{{ computedPokemon.name }}</p>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  props: ["pokemon"],
  computed: {
    computedPokemon() {
      return this.pokemon;
    },
  },
};
</script>
