<template>
  <div v-if="!$store.state.loading" class="p-xs-1 p-md-2 p-5-lg">
    <div
      v-if="teams.length"
      class="row justify-content-center align-items-center text-center"
    >
      <div class="col-12">
        <div class="p-3">
          <h1>Your Teams</h1>
          <table class="table text-light">
            <thead>
              <tr class="row">
                <th scope="col-4" class="col">Name</th>
                <th scope="col" class="col">Pokemon</th>
                <th scope="col-2" class="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="team in teams" :key="team" class="row">
                <td class="col-4">{{ (team as any).name }}</td>
                <td class="col">
                  <div class="row justify-content-stretch align-items-stretch">
                    <div
                      class="col"
                      v-for="pokemon in (team as any).pokemon"
                      :key="(pokemon as any).id"
                    >
                      <div class="row">
                        <div class="col-12">
                          <img
                            class="img"
                            :src="(pokemon as any).src"
                            :alt="(pokemon as any).name"
                            height="50"
                          />
                        </div>
                        <div class="col-12">
                          <small>#{{ (pokemon as any).id }}</small>
                        </div>
                        <div class="col-12">
                          <small>{{ (pokemon as any).name }}</small>
                        </div>
                      </div>
                    </div>
                  </div>
                </td>
                <td class="col-2">
                  <button
                    class="btn btn-danger"
                    @click="handleExclude((team as any).id)"
                  >
                    exclude
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div class="col-12">
        <button
          class="btn btn-primary"
          @click="$router.push('/poketeam/create')"
        >
          Create Your Team
        </button>
      </div>
    </div>
    <div v-else class="noTeam">
      <div class="row text-center">
        <div class="col-12">
          <h1 class="col-12">Seems like you don't have any team yet!</h1>
        </div>
        <div class="col-12">
          <button
            class="btn btn-primary col-12"
            @click="$router.push('/poketeam/create')"
          >
            Let's create one
          </button>
        </div>
      </div>
    </div>
  </div>
  <LoadingFrame v-else />
</template>

<script lang="ts">
import axios, { type AxiosResponse } from "axios";
import LoadingFrame from "@/components/LoadingFrame.vue";
import { teamsQuery, deleteTeamMutation, createTeamMutation } from "./query";

export default {
  async beforeMount(): Promise<void> {
    this.$store.commit("startLoading");
    const headers = {
      "Content-Type": "application/json",
    };
    const { data }: AxiosResponse = await axios.post(
      "http://localhost:3000/graphql",
      { query: teamsQuery },
      { headers }
    );
    (this.teams as any) = await Promise.all(
      data.data.getTeams.map(async (team: any) => {
        const pokemon = await Promise.all([
          this.getPokemon(team.slot1),
          this.getPokemon(team.slot2),
          this.getPokemon(team.slot3),
          this.getPokemon(team.slot4),
          this.getPokemon(team.slot5),
          this.getPokemon(team.slot6),
        ]);
        const data = { pokemon, ...team };
        return data;
      })
    );

    this.$store.commit("stopLoading");
  },
  data() {
    return {
      teams: [],
    };
  },
  methods: {
    async fetchTeams() {},
    getSlots(team: any): any {
      const slots = [];
      for (let i = 1; i < 7; i++) {
        slots.push(team[`slot${i}`]);
      }
      return slots;
    },
    getSrc(pokemon: any): any {
      return (
        pokemon?.sprites.other.dream_world.front_default ||
        pokemon?.sprites.other.home.front_default ||
        pokemon?.sprites.other.official_artwork.front_default ||
        pokemon?.sprites.front_default
      );
    },
    async handleCreate() {
      const headers = {
        "Content-Type": "application/json",
      };
      const team = {
        name: "team 2",
        slot1: 11,
        slot2: 23,
        slot3: 478,
        slot4: 854,
        slot5: 26,
        slot6: 590,
      };
      await axios.post(
        "http://localhost:3000/graphql",
        { query: createTeamMutation(team) },
        { headers }
      );
    },
    async handleExclude(id: string): Promise<any> {
      const headers = {
        "Content-Type": "application/json",
      };
      await axios.post(
        "http://localhost:3000/graphql",
        { query: deleteTeamMutation(id) },
        { headers }
      );
      this.teams.splice(this.teams.indexOf(id as never), 1);
    },
    async getPokemon(id: number): Promise<any> {
      const { data }: AxiosResponse = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${id}`
      );
      data.src = this.getSrc(data);
      return data;
    },
  },
  components: { LoadingFrame },
};
</script>

<style lang="scss">
.buttons {
  display: flex;
  align-items: center;
  justify-content: center;
}
.small {
  font-size: 7px;
}
.noTeam {
  display: flex;
  height: 100vh;
  align-items: center;
  justify-content: center;
}
</style>
