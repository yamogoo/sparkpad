<template lang="pug">
Transition(
  :css="false"
  @enter="onEnter"
)
  UIFormProvider.login-form(
    v-if="isMounted"
  )
    UIForm(
      id="login"
      data-test-id="login-form"
      type="submit"
      title="Sign In"
    )
      template(#header)
        UILink.md(
          label="Sign Up"
          :to="'/register'"
          style="position: absolute; right: 0; top: 10px;"
        )
      UIFormField
        UIInput(
          label="Login or email"
          autocomplete="email"
          required
          v-model:value="model.login"
          @update:value="onUpdateLogin"
        )
      UIFormField
        UIInput(
          label="Password"
          autocomplete="current-password"
          required
          v-model:value="model.password"
          @update:value="onUpdatePassword"
        )
      template(#footer)
        div.form__group-between
          UICheckbox(
            label="Remember me" 
            v-model:state="model.isPasswordCached"
            @update:state="onUpdateRememberPasword"
          )
          UILink(
            label="Forgot password?"
            to="/"
          )
        div.form__group-rtl
            UIButton(
              type="submit"
              label="login"
              for="login"
              @press="onSubmit"
            )
        //- UILoginSocial
</template>

<script setup lang="ts">
import { onMounted, ref, Transition } from "vue";
import { useRouter } from "vue-router";
import g from "gsap";

import { useAuthStore } from "~/src/stores/auth";
import type { AuthLoginCredentials } from "~/src/services/authService";

import UIFormProvider from "@/components/atoms/forms/UIFormProvider.vue";
import UIForm from "@/components/atoms/forms/UIForm.vue";
import UIFormField from "@/components/atoms/forms/UIFormField.vue";
import UIInput from "@/components/atoms/base/inputs/UIInput.vue";
import UIButton from "@/components/atoms/base/buttons/UIButton.vue";
import UICheckbox from "@/components/atoms/base/switches/UICheckbox.vue";
import UILink from "@/components/atoms/base/links/UILink.vue";

// import UILoginSocial from "./UILoginSocial.vue";

const router = useRouter();

const authStore = useAuthStore();

const model = ref({
  login: "",
  password: "",
  isPasswordCached: false,
});

const onUpdateLogin = (login: string): void => {
  model.value.login = login;
};

const onUpdatePassword = (password: string): void => {
  model.value.password = password;
};

const onUpdateRememberPasword = (state: boolean): void => {
  model.value.isPasswordCached = state;
};

const onSubmit = async (_id: number): Promise<void> => {
  const credentials: AuthLoginCredentials = {
    login: model.value.login,
    password: model.value.password,
  };

  const { accessToken } = await authStore.login(credentials);

  if (accessToken) {
    router.push({ path: "/private" });
  }

  return;
};

const isMounted = ref(false);

onMounted(() => (isMounted.value = true));

/* * * Animations * * */

const POS_Y_OUT = 240;

const onEnter = (el: Element, done: () => void) => {
  g.fromTo(
    el,
    {
      y: POS_Y_OUT,
      scale: 0.9,
      opacity: 0.0,
    },
    {
      y: 0,
      scale: 1,
      opacity: 1,
      duration: 0.55,
      ease: "power4.out",
      onComplete: done,
    }
  );
};
</script>

<style lang="scss">
.login-form {
  .form__footer {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
}
</style>
