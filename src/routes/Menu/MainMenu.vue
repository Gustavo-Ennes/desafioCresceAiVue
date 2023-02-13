<template>
  <main class="container-fluid main">
    <div class="row justify-content align-items text-center">
      <div class="col-12">
        <h1>PokeDex</h1>
        <br />
      </div>
      <div class="col-12 col-lg-6">
        <PokemonSearchSection />
      </div>
      <div class="col-12 col-lg-6">
        <PokemonTeamSection />
      </div>
      <div class="col-12">
        <Pokelist />
      </div>
    </div>
  </main>
</template>

<script lang="ts">
import PokemonTeamSection from "./components/PoketeamSection.vue";
import PokemonSearchSection from "./components/PokemonSearchSection.vue";
import Pokelist from "./components/PokeList.vue";

export default {
  mounted() {
    console.log("poketeam", this.$store.state.poketeam);
  },
  components: { PokemonSearchSection, PokemonTeamSection, Pokelist },
};
</script>

<style lang="scss" scoped>
.main {
  padding: 25px;
  min-height: 100vh;
  min-width: 100vw;
}
.column {
  padding: 10px;
}
h1 {
  text-align: center;
}
</style>
