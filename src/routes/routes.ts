import type { RouteRecordRaw } from "vue-router";

const routes: RouteRecordRaw[] = [
  { path: "/", component: () => import("./Menu/MainMenu.vue") },
  {
    path: "/pokemon/:search/",
    component: () => import("./Pokemon/PokemonPage.vue"),
  },
  {
    path: "/poketeam/",
    component: () => import("./PokeTeam/PokeTeam.vue"),
  },
  {
    path: "/poketeam/create",
    component: () => import("./NewPokeTeam/NewPokeTeam.vue"),
  },
];

export { routes };
