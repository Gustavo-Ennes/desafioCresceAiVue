<template>
  <div class="card">
    <img :src="src" class="card-img-top" :alt="pokemon.id" height="200" />
    <div class="card-body text-center">
      <h5 class="card-title">{{ pokemon.name }}</h5>
      <p class="card-text">#{{ pokemon.id }}</p>
      <span
        v-for="poketype in pokemon.types"
        :key="poketype.type.name"
        class="text-light bg-success rounded p-1 m-1"
      >
        {{ poketype.type.name as never }}
      </span>
    </div>
    <div class="card-footer">
      <input
        class="form-control"
        @change="getPokemon"
        v-model="searchTerm"
        placeholder="name or number"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { getPokemon } from "@/routes/utils";
import NotFoundImage from "../../../assets/404.png";

export default {
  name: "CreateSlot",
  props: ["slotId"],
  async beforeMount() {
    await this.getPokemon();
  },
  data() {
    return {
      pokemon: {
        id: "",
        name: "",
        sprites: {
          front_default: "",
          other: {
            dream_world: {
              front_default: "",
            },
            home: {
              front_default: "",
            },
            official_artwork: {
              front_default: "",
            },
          },
        },
        types: [{ type: { name: "" } }],
      },
      searchTerm: "",
    };
  },
  computed: {
    src() {
      return this.pokemon.id
        ? this.pokemon?.sprites.other?.dream_world.front_default ||
            this.pokemon?.sprites.other?.home.front_default ||
            this.pokemon?.sprites.other?.official_artwork.front_default ||
            this.pokemon?.sprites.front_default
        : NotFoundImage;
    },
  },
  methods: {
    async getPokemon(): Promise<any> {
      this.pokemon = await getPokemon(this.searchTerm);
      this.$emit("selected", {
        id: this.pokemon.id,
        slotId: this.slotId,
        types: this.pokemon.types,
      });
    },
  },
};
</script>

<style lang="scss">
.card {
  background-color: rgba(255, 255, 255, 0.5);
  height: 400px;
}
</style>
