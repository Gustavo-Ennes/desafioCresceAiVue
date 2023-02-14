import type { InjectionKey } from "vue";
import { createStore, Store } from "vuex";
import "./store.d";

// define your typings for the store state
interface State {
  loading: boolean;
}

// define injection key
const key: InjectionKey<Store<State>> = Symbol();

const store = createStore<State>({
  state(): State {
    return {
      loading: false,
    };
  },
});

export type { State };
export { store, key };
