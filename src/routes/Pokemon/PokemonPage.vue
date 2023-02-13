<template>
  <div v-if="pokemon" class="container">
    <button class="btn btn-outline-light" @click="$router.push('/')">
      back
    </button>
    <div class="row justify-content-center align-items-center text-center">
      <div class="col-12">
        <img :src="src" :alt="pokemon.name" />
      </div>
      <div class="col-12">
        <h1>{{ pokemon.name }}</h1>
      </div>
    </div>
    <div class="col-12">
      <div class="row justify-content-center align-items-center text-center">
        <div class="col-12">
          <h5 class="">Types</h5>
          <div
            class="row justify-content-center align-items-center text-center"
          >
            <div class="col-4" v-for="pokeType in types" :key="pokeType">
              <span class="text-secondary">{{ pokeType }}</span>
            </div>
          </div>
        </div>
        <div class="col-6">
          <h5>Height</h5>
          <p>{{ pokemon.height }}</p>
        </div>
        <div class="col-6">
          <h5>Weight</h5>
          <p>{{ pokemon.weight }}</p>
        </div>
      </div>
    </div>
    <div class="col-12">
      <div class="row justify-content-center align-items-center text-center">
        <div class="col-12">
          <h5 class="">moves</h5>
        </div>
        <div class="col-4" v-for="{ move } in pokemon.moves" :key="move.name">
          <span class="text-secondary">{{ move.name }}</span>
        </div>
      </div>
    </div>
  </div>
  <div v-else class="container">
    pokemon name or id equals {{ search }} not found!
  </div>
</template>

<script lang="ts">
import axios, { type AxiosResponse } from "axios";

export default {
  data() {
    return {
      pokemon: {
        name: "",
        height: 0,
        weight: 0,
        moves: [{ move: { name: "" } }],
        types: [],
        sprites: {
          front_default: "",
          other: {
            official_artwork: {
              front_default: "",
            },
            home: {
              front_default: "",
            },
            dream_world: {
              front_default: "",
            },
          },
        },
      },
    };
  },
  computed: {
    search(): string | string[] {
      return this.$route.params.search;
    },
    types() {
      return this.pokemon.types.map(({ type: { name } }) => name);
    },
    src() {
      return (
        this.pokemon.sprites.other.dream_world.front_default ||
        this.pokemon.sprites.other.home.front_default ||
        this.pokemon.sprites.other.official_artwork.front_default ||
        this.pokemon.sprites.front_default
      );
    },
  },
  async beforeMount() {
    try {
      const pokemon: AxiosResponse = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${this.search}`
      );
      this.pokemon = pokemon.data;
      console.log(
        "🚀 ~ file: PokemonPage.vue:43 ~ beforeMount ~ this.pokemon",
        this.pokemon
      );
    } catch (err) {
      console.log("🚀 ~ file: Pokemon.vue:27 ~ beforeMount ~ err", err);
    }
  },
};
</script>
<style lang="scss" scoped>
.container {
  padding: 20px;
}
img {
  height: 400px;
}
</style>
