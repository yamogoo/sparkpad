<template lang="pug">
Transition(
  :css="false"
  @enter="onEnter"
)
  UIFormProvider.register-form(
    v-if="isMounted"
  )
    UIForm(
      id="register"
      data-test-id="register-form"
      type="submit"
      title="Sign Up"
    )
      template(#header)
        UILink.md(
          label="Sign In"
          :to="'/login'"
          style="position: absolute; right: 0; top: 10px;"
        )
      UIFormField
        UIInput(
          label="Login"
          autocomplete="username"
          required
          v-model:value="model.login"
          @update:value="onUpdateLogin"
        )
      UIFormField
        UIInput(
          label="Email"
          autocomplete="email"
          required
          v-model:value="model.email"
          @update:value="onUpdateEmail"
        )
      UIFormField
        UIInput(
          label="Password"
          autocomplete="new-password"
          required
          v-model:value="model.password"
          @update:value="onUpdatePassword"
        )
      UIFormField
        UIInput(
          label="Repeat password"
          autocomplete="new-password"
          required
          v-model:value="model.passwordRepeat"
          @update:value="onUpdateRepeatPassword"
        )
      template(#footer)
        div.form__group-rtl
            UIButton(
              type="submit"
              label="register"
              for="register"
              @press="onSubmit"
            )
</template>

<script setup lang="ts">
import { onMounted, ref, Transition } from "vue";
import g from "gsap";

import { useAuthStore } from "~/src/stores/auth";

import UIFormProvider from "@/components/atoms/forms/UIFormProvider.vue";
import UIForm from "@/components/atoms/forms/UIForm.vue";
import UIFormField from "@/components/atoms/forms/UIFormField.vue";
import UIInput from "@/components/atoms/base/inputs/UIInput.vue";
import UIButton from "@/components/atoms/base/buttons/UIButton.vue";
import UILink from "@/components/atoms/base/links/UILink.vue";

const authStore = useAuthStore();

const model = ref({
  login: "",
  email: "",
  password: "",
  passwordRepeat: "",
});

const onUpdateLogin = (login: string): void => {
  model.value.login = login;
};

const onUpdateEmail = (email: string): void => {
  model.value.email = email;
};

const onUpdatePassword = (password: string): void => {
  model.value.password = password;
};

const onUpdateRepeatPassword = (password: string): void => {
  model.value.password = password;
};

const onSubmit = (_id: number): void => {
  const credentials = {
    login: model.value.login,
    email: model.value.email,
    password: model.value.password,
  };

  authStore.register(credentials);
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
