import { createApp } from "vue";
import AppVue from "./App.vue";

import "./assets/app.scss";
import { router } from "./router/router";

// 5. Create and mount the root instance.
const app = createApp(AppVue);
// Make sure to _use_ the router instance to make the
// whole app router-aware.
app.use(router);

app.mount("#app");
