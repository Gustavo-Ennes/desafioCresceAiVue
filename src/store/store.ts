import type { InjectionKey } from "vue";
import { createStore, Store } from "vuex";
import "./store.d";

// define your typings for the store state
interface State {
  poketeam: number[];
}

// define injection key
const key: InjectionKey<Store<State>> = Symbol();

const store = createStore<State>({
  state(): { poketeam: number[] } {
    return {
      poketeam: [],
    };
  },
  mutations: {
    addPokemon(state, id): void {
      state.poketeam.push(id as never);
    },
    deletePokemon(state, id): void {
      state.poketeam.splice(state.poketeam.indexOf(id), 1);
    },
    deleteTeam(state) {
      state.poketeam = [];
    },
  },
});

export type { State };
export { store, key };
