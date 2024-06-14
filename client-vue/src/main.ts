import { createApp } from "vue";
import App from "./App.vue";

import { createPinia } from "pinia";
import { router } from "@/router";

import "./assets/_fonts.scss";
import "./assets/styles/_reset-styles.scss";

import { setAppTitle, setMeta } from "@/utils";

/* * *  Set app title (from package.json) * * */

const appTitle = import.meta.env.APP_TITLE ?? "";
setAppTitle(appTitle);
setMeta("description", "mdx editor");

const pinia = createPinia();

const app = createApp(App);
app.use(pinia);
app.use(router);
app.mount("#app");
