import type { RouteRecordRaw } from "vue-router";

const routes: RouteRecordRaw[] = [
  { path: "/", component: () => import("./Menu/MainMenu.vue") },
  {
    path: "/pokemon/:search/",
    component: () => import("./Pokemon/PokemonPage.vue"),
  },
];

export { routes };
