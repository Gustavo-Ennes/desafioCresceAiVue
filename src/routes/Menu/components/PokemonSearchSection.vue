<template>
  <div class="p-5">
    <div class="row">
      <div class="col-12 p-2">
        <h1>Search for a pokemon</h1>
      </div>
      <div class="col-12 p-2">
        <input
          class="form-control"
          v-model="text"
          type="text"
          placeholder="Name or number"
        />
      </div>
      <div class="col-12 p-2">
        <button class="btn btn-success" @click="goToPokemonPage">
          Search!
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  data() {
    return {
      text: "",
    };
  },
  methods: {
    goToPokemonPage() {
      this.$router.push(`/pokemon/${this.text}`);
    },
  },
};
</script>
