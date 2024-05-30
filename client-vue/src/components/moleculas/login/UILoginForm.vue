<template lang="pug">
Transition(
  :css="false"
  @enter="onEnter"
)
  UIFormProvider.login-form(v-if="isMounted")
    UIForm(
      id="login"
      type="submit"
      title="Login"
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
          v-model:value="modelLogin"
          @update:value="onUpdateLogin"
        )
      UIFormField
        UIInput(
          label="Password"
          autocomplete="current-password"
          required
          v-model:value="modelPassword"
          @update:value="onUpdatePassword"
        )
      template(#footer)
        div.form__group-between
          UICheckbox(
            label="Remember me" 
            v-model:state="isPasswordCached"
            @update:state="onUpdateRememberPasword"
          )
          UILink(
            label="Forgot password?"
            to="/"
          )
        div.form__group-rtl
            UIButton(
              type="submit"
              label="Next"
              for="login"
              @press="onSubmit"
            )
        UILoginSocial
</template>

<script setup lang="ts">
import { onMounted, ref, Transition } from "vue";
import g from "gsap";

import UIFormProvider from "@/components/atoms/forms/UIFormProvider.vue";
import UIForm from "@/components/atoms/forms/UIForm.vue";
import UIFormField from "@/components/atoms/forms/UIFormField.vue";
import UIInput from "@/components/atoms/base/inputs/UIInput.vue";
import UIButton from "@/components/atoms/base/buttons/UIButton.vue";
import UICheckbox from "@/components/atoms/base/switches/UICheckbox.vue";
import UILink from "@/components/atoms/base/links/UILink.vue";
import UILoginSocial from "./UILoginSocial.vue";

const modelLogin = ref("");
const modelPassword = ref("");
const isPasswordCached = ref(false);

const onUpdateLogin = (email: string): void => {
  console.log(email);
};

const onUpdatePassword = (password: string): void => {
  console.log(password);
};

const onUpdateRememberPasword = (state: boolean): void => {
  console.log(state);
  isPasswordCached.value = state;
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
