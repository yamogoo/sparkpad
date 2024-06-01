import { createApp } from "vue";
import App from "./App.vue";

import { createPinia } from "pinia";
import { router } from "@/router";

import "./assets/_fonts.scss";

/* * *  Set app title (from package.json) * * */

const appTitle = import.meta.env.APP_TITLE ?? "";

const setTitle = () => {
  const title = document.querySelector("title");
  if (title) title.innerHTML = appTitle;
  else {
    const head = document.querySelector("head");
    if (head) {
      const el: HTMLTitleElement = document.createElement("title");
      el.innerHTML = appTitle;
      head.appendChild(el);
    }
  }
};

setTitle();

const app = createApp(App);
app.use(createPinia());
app.use(router);
app.mount("#app");
