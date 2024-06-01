<template lang="pug">
Transition(
  :css="false"
  @enter="onEnter"
)
  UIFormProvider.login-form(
    v-if="isMounted"
    :show-error="formError.status"
    :error-message="formError.message"
    @update:show-error="onUpdateShowError"
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
          :class="[{'error' : model.login.error}]"
          required
          v-model:value="model.login.value"
          @update:value="onUpdateLogin"
        )
      UIFormField
        UIInput(
          label="Password"
          autocomplete="current-password"
          :class="[{'error' : model.password.error}]"
          required
          v-model:value="model.password.value"
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
              label="login"
              for="login"
              @press="onSubmit"
            )
        //- UILoginSocial
</template>

<script setup lang="ts">
import { onMounted, ref, type Ref } from "vue";
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

interface FormInputValue {
  value: string;
  error: boolean;
}

const model: Ref<Record<"login" | "password", FormInputValue>> = ref({
  login: {
    value: "",
    error: false,
  },
  password: {
    value: "",
    error: false,
  },
});

interface FormError {
  message: string | undefined;
  status: boolean;
}

const formError: Ref<FormError> = ref({
  message: undefined,
  status: false,
});

const isPasswordCached = ref(false);

const onUpdateShowError = (state: boolean): void => {
  formError.value.status = state;
};

/* * * Verification * * */

const verifyLogin = (login: string): boolean => {
  if (login && login.length > 4) return true;
  return false;
};

const onUpdateLogin = (login: string): void => {
  model.value.login.value = login;
};

const onUpdatePassword = (password: string): void => {
  model.value.password.value = password;
};

const onUpdateRememberPasword = (state: boolean): void => {
  isPasswordCached.value = state;
};

const getError = (
  message: string | undefined = undefined
): { status: boolean; message: string | undefined } => {
  const status = message !== "" && !!message;
  return { message, status };
};

const onSubmit = async (_id: number): Promise<void> => {
  const isLoginVerifyed = verifyLogin(model.value.login.value);

  if (!isLoginVerifyed) {
    model.value.login.error = true;
    formError.value = getError("login must be more than 4 characters");
    return;
  } else {
    model.value.login.error = false;
    formError.value = getError(undefined);
  }

  const isPasswordVerifyed = verifyLogin(model.value.password.value);

  if (!isPasswordVerifyed) {
    model.value.password.error = true;
    formError.value = getError("pasword must be more than 8 characters");
    return;
  } else {
    model.value.password.error = false;
    formError.value = getError(undefined);
  }

  const credentials: AuthLoginCredentials = {
    login: model.value.login.value,
    password: model.value.password.value,
  };

  const { accessToken } = await authStore.login(credentials);

  if (accessToken) router.push({ path: "/private" });
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
