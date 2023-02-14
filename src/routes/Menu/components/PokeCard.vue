<template>
  <RouterLink :to="`/pokemon/${pokemon.name}`" class="router">
    <div class="card p-2">
      <img
        v-if="pokemon"
        :src="src"
        class="card-img-top"
        alt="pokemon.name"
        height="250"
      />
      <div class="card-body p-1">
        <h2>#{{ pokemon.order }}</h2>
        <h5 class="card-title">{{ pokemon.name }}</h5>
        <div class="row justify-content-center align-items-center">
          <div
            v-for="pokeType in pokemon.types"
            :key="pokeType"
            class="col badge text-bg-success m-2"
          >
            {{ pokeType }}
          </div>
        </div>
      </div>
      <div class="card-footer">
        <div class="row">
          <div class="col-6">
            <p>Weight</p>
            <small>{{ pokemon.weight }}</small>
          </div>
          <div class="col-6">
            <p>Height</p>
            <small>{{ pokemon.height }}</small>
          </div>
        </div>
      </div>
    </div>
  </RouterLink>
</template>

<script lang="ts">
import axios from "axios";

export default {
  props: ["pokemonRef"],
  data() {
    return {
      pokemon: {
        height: 0,
        weight: 0,
        name: "",
        order: -1,
        sprites: {
          other: {
            home: { front_default: "" },
            official_artwork: { front_default: "" },
            dream_world: { front_default: "" },
          },
        },
        types: [],
      },
    };
  },
  async beforeCreate() {
    const { data }: any = await axios.get(this.pokemonRef.url);
    this.pokemon = this.parseData(data);
  },
  computed: {
    src() {
      return (
        this.pokemon.sprites.other.dream_world.front_default ||
        this.pokemon.sprites.other.home.front_default ||
        this.pokemon.sprites.other.official_artwork.front_default
      );
    },
  },
  methods: {
    parseData({ name, id, types, sprites, weight, height }: any) {
      const data = { name, order: id, types, sprites, weight, height };
      const parsedTypes = types.map(({ type }: any) => type.name);
      data.types = parsedTypes;
      return data;
    },
  },
};
</script>

<style lang="scss">
.card {
  background-color: rgba(255, 255, 255, 0.3);
}
a {
  text-decoration: none;
  color: #ccc;
}
</style>
