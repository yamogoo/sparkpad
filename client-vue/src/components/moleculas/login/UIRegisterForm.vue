<template lang="pug">
Transition(
  :css="false"
  @enter="onEnter"
)
  UIFormProvider.register-form(v-if="isMounted")
    UIForm(
      id="register"
      type="submit"
      title="Sign Up"
    )
      template(#header)
        UILink.md(
          label="Login"
          :to="'/login'"
          style="position: absolute; right: 0; top: 10px;"
        )
      UIFormField
        UIInput(
          label="Login"
          autocomplete="username"
          required
          v-model:value="modelLogin"
          @update:value="onUpdateLogin"
        )
      UIFormField
        UIInput(
          label="Email"
          autocomplete="email"
          required
          v-model:value="modelLogin"
          @update:value="onUpdateLogin"
        )
      UIFormField
        UIInput(
          label="Password"
          autocomplete="new-password"
          required
          v-model:value="modelPassword"
          @update:value="onUpdatePassword"
        )
      UIFormField
        UIInput(
          label="Repeat password"
          autocomplete="new-password"
          required
          v-model:value="modelPassword"
          @update:value="onUpdatePassword"
        )
      template(#footer)
        div.form__group-rtl
            UIButton(
              type="submit"
              label="Register"
              for="register"
              @press="onSubmit"
            )
</template>

<script setup lang="ts">
import { onMounted, ref, Transition } from "vue";
import g from "gsap";

import UIFormProvider from "@/components/atoms/forms/UIFormProvider.vue";
import UIForm from "@/components/atoms/forms/UIForm.vue";
import UIFormField from "@/components/atoms/forms/UIFormField.vue";
import UIInput from "@/components/atoms/base/inputs/UIInput.vue";
import UIButton from "@/components/atoms/base/buttons/UIButton.vue";
import UILink from "@/components/atoms/base/links/UILink.vue";

const modelLogin = ref("");
const modelPassword = ref("");

const onUpdateLogin = (email: string): void => {
  console.log(email);
};

const onUpdatePassword = (password: string): void => {
  console.log(password);
};

const onSubmit = (_id: number): void => {
  console.log(_id);
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
