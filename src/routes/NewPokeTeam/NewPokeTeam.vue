<template>
  <div v-if="!$store.state.loading" class="p-sm-1 p-md-2 p-lg-5 main">
    <div class="row justify-content-center align-items-center">
      <h1 class="h1 mb-3">Create a team</h1>
      <small class="mb-5">
        Select one pokemon each card, typing the number or the name of the
        pokemon and hiting enter.<br />
        TO CREATE A TEAM, ALL POKEMON MUST HAVE DIFFERENT TYPES FROM EACH
        OTHER.</small
      >
      <div class="col-12">
        <h5>Define a name to the team</h5>
        <input
          class="form-control mb-4"
          v-model="name"
          placeholder="Team name"
        />
      </div>
      <div v-for="i in 6" :key="i" class="col-sm-4 col-md-2">
        <CreateSlot :slotId="i" @selected="handleSelected" />
      </div>
      <div v-if="error" class="text text-danger m-3">
        <div v-if="repeatedTypes.length">
          There're some repeated types in your team, see:
          <span
            v-for="repeatedType in repeatedTypes"
            :key="repeatedType"
            class="p-3"
          >
            {{ repeatedType || "name is empty" }}</span
          >
        </div>
        <div v-else class="p-3">Name is empty</div>
      </div>
      <div class="col-12 text-center">
        <button class="btn btn-info btn-block mt-5" @click="handleCreate">
          Create this team
        </button>
      </div>
    </div>
  </div>
  <LoadingFrame v-else />
</template>

<script lang="ts">
import LoadingFrame from "@/components/LoadingFrame.vue";
import axios from "axios";
import { createTeamMutation } from "../PokeTeam/query";
import CreateSlot from "./components/CreateSlot.vue";

export default {
  name: "NewPokeTeam",
  components: { LoadingFrame, CreateSlot },
  data() {
    return {
      slot1: null,
      slot2: null,
      slot3: null,
      slot4: null,
      slot5: null,
      slot6: null,
      typesComparasionArray: [],
      repeatedTypes: [],
      error: false,
      name: "",
    };
  },
  methods: {
    async handleCreate() {
      this.repeatedTypes = [];
      this.error =
        !this.checkAllSelected() || !this.checkSameTypes() || !this.name;
      const headers = {
        "Content-Type": "application/json",
      };
      if (!this.error) {
        const query = createTeamMutation({
          name: this.name,
          slot1: String((this.slot1 as any).id),
          slot2: String((this.slot2 as any).id),
          slot3: String((this.slot3 as any).id),
          slot4: String((this.slot4 as any).id),
          slot5: String((this.slot5 as any).id),
          slot6: String((this.slot6 as any).id),
        });
        await axios.post(
          "http://localhost:3000/graphql",
          {
            query,
          },
          { headers }
        );
        this.$router.push("/poketeam");
      }
    },
    checkSameTypes() {
      const keys = Object.keys(this.$data);
      const is = { valid: true };
      this.typesComparasionArray = [];

      keys.forEach((key) => {
        const slot = (this.$data as any)[key];
        const types = slot.types;
        if (types) {
          types.forEach((type: any) => {
            if (
              this.typesComparasionArray.indexOf(type.type.name as never) !== -1
            ) {
              is.valid = false;
              if (this.repeatedTypes.indexOf(type.type.name as never) === -1)
                this.repeatedTypes.push(type.type.name as never);
            } else {
              this.typesComparasionArray.push(type.type.name as never);
            }
          });
        }
      });
      this.typesComparasionArray = [];
      return is.valid;
    },
    checkAllSelected() {
      const keys = Object.keys(this.$data);
      const is = { valid: true };
      keys.forEach((key) => {
        if (key.includes("slot") && !(this.$data as any)[key]) {
          is.valid = false;
        }
      });
      return is.valid;
    },
    handleSelected(payload: any) {
      const { slotId } = payload;
      const keys = Object.keys(this.$data);
      this.repeatedTypes = [];
      this.error = false;
      keys.forEach((key) => {
        if (key.includes(slotId)) {
          (this.$data as any)[key] = payload;
        }
      });
    },
  },
};
</script>

<style lang="scss">
.main {
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
