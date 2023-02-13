<template>
  <div class="p-md-5 p-sm-2">
    <div class="row justify-content">
      <div class="col-12">
        <h1>Pokelist</h1>
      </div>
      <div
        class="col-12 col-sm-6 col-md-4 col-lg-3 g-2 align-items-start justify-content-center"
        v-for="pokemon in pokemonList"
        :key="pokemon"
      >
        <PokeCard :pokemonRef="pokemon" />
      </div>
      <div class="col-4 offset-4">
        <button
          :disabled="!previous"
          class="btn btn-info"
          @click="getPreviousPokemon"
        >
          previous
        </button>
        <button
          :disabled="!next"
          class="btn btn-info m-3"
          @click="getNextPokemon"
        >
          next
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import axios from "axios";
import PokeCard from "./PokeCard.vue";
export default {
  data() {
    return {
      url: "https://pokeapi.co/api/v2/pokemon/",
      pokemonList: [],
      next: "",
      previous: "",
    };
  },
  async beforeMount() {
    await this.getPokemon();
  },
  components: {
    PokeCard,
  },
  methods: {
    async getPokemon() {
      const {
        data: { results, next, previous },
      } = await axios.get(this.url);

      this.pokemonList = results;
      this.next = next;
      this.previous = previous;
    },
    async getNextPokemon() {
      this.url = this.next;
    },
    async getPreviousPokemon() {
      this.url = this.previous;
    },
  },
  watch: {
    async url() {
      await this.getPokemon();
    },
  },
};
</script>
