<template lang="pug">
Transition(
  :css="false"
  @enter="onEnter"
)
  UIFormProvider.register-form(
    v-if="isMounted"
    :show-error="formError.status"
    :error-message="formError.message"
    @update:show-error="onUpdateShowError"
  )
    UIForm(
      id="register"
      data-testid="register-form"
      type="submit"
      title="Sign Up"
    )
      template(#header)
        UILink.md(
          label="Sign In"
          :to="PublicRoutes.LOGIN"
          style="position: absolute; right: 0; top: 10px;"
        )
      UIFormField
        UIInput(
          label="Login"
          autocomplete="username"
          required
          :is-error="model.login.error"
          v-model:value="model.login.value"
          @update:value="onUpdateLogin"
          @verify:value="onVerifyLogin"
        )
      UIFormField
        UIInput(
          label="Email"
          autocomplete="email"
          required
          :is-error="model.email.error"
          v-model:value="model.email.value"
          @update:value="onUpdateEmail"
          @verify:value="onVerifyEmail"
        )
      UIFormField
        UIInput(
          label="Password"
          autocomplete="new-password"
          required
          :is-error="model.password.error"
          v-model:value="model.password.value"
          @update:value="onUpdatePassword"
          @verify:value="onVerifyPassword"
        )
      UIFormField
        UIInput(
          label="Repeat password"
          autocomplete="new-password"
          :is-error="model.passwordRepeat.error"
          required
          v-model:value="model.passwordRepeat.value"
          @update:value="onUpdateRepeatPassword"
          @verify:value="onVerifyRepeatPassword"
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
import { computed, onMounted, ref, type Ref, Transition } from "vue";
import { useRouter } from "vue-router";
import g from "gsap";

import {
  verifyEmail,
  verifyLogin,
  verifyPassword,
  verifyPasswordRepeat,
} from "@/utils";
import { useVerifyField } from "@/composables/useVerifyField";

import { useAuthStore } from "@/stores/auth";

import { PublicRoutes } from "@/router";

import UIFormProvider from "@/components/atoms/forms/UIFormProvider.vue";
import UIForm, {
  type FormError,
  type FormInputValue,
} from "@/components/atoms/forms/UIForm.vue";
import UIFormField from "@/components/atoms/forms/UIFormField.vue";
import UIInput from "@/components/atoms/base/inputs/UIInput.vue";
import UIButton from "@/components/atoms/base/buttons/UIButton.vue";
import UILink from "@/components/atoms/base/links/UILink.vue";

enum ErrorMessages {
  PASSWORD_NOT_VERIFIED = "pasword must be more than 8 characters",
  REPEAT_PASSWORD_NOT_MATCH = "repeated password does not match with passwor",
  LOGIN_NOT_VERIFIED = "login must be more than 4 characters",
  EMAIL_NOT_VERIFIED = "Invalid email address",
}

const router = useRouter();

const authStore = useAuthStore();

type ModelKeys = "login" | "email" | "password" | "passwordRepeat";

const model: Ref<Record<ModelKeys, FormInputValue>> = ref({
  login: {
    value: "",
    error: false,
    isVerifyed: false,
  },
  email: {
    value: "",
    error: false,
    isVerifyed: false,
  },
  password: {
    value: "",
    error: false,
    isVerifyed: false,
  },
  passwordRepeat: {
    value: "",
    error: false,
    isVerifyed: false,
  },
});

const formError: Ref<FormError> = ref({
  message: undefined,
  status: false,
});

const onUpdateShowError = (state: boolean): void => {
  formError.value.status = state;
};

/* * * Verification Handlers * * */

const onUpdateLogin = (login: string): void => {
  model.value.login.value = login;
};

const onUpdateEmail = (email: string): void => {
  model.value.email.value = email;
};

const onUpdatePassword = (password: string): void => {
  model.value.password.value = password;
};

const onUpdateRepeatPassword = (password: string): void => {
  model.value.password.value = password;
};
/* * * Verifications * * */

const onVerifyLogin = (): void => {
  useVerifyField<ModelKeys>("login", model, {
    formError,
    errorMessage: ErrorMessages.LOGIN_NOT_VERIFIED,
    isVerifyed: verifyLogin(model.value.login.value),
  });
};

const onVerifyEmail = (): void => {
  useVerifyField<ModelKeys>("email", model, {
    formError,
    errorMessage: ErrorMessages.EMAIL_NOT_VERIFIED,
    isVerifyed: verifyEmail(model.value.email.value),
  });
};

const onVerifyPassword = (): void => {
  useVerifyField<ModelKeys>("password", model, {
    formError,
    errorMessage: ErrorMessages.PASSWORD_NOT_VERIFIED,
    isVerifyed: verifyPassword(model.value.password.value),
  });
};

const onVerifyRepeatPassword = (): void => {
  useVerifyField<ModelKeys>("passwordRepeat", model, {
    formError,
    errorMessage: ErrorMessages.REPEAT_PASSWORD_NOT_MATCH,
    isVerifyed: verifyPasswordRepeat(
      model.value.password.value,
      model.value.passwordRepeat.value
    ),
  });
};

const isFormValidated = computed(() => {
  return (
    model.value.login.isVerifyed &&
    model.value.email.isVerifyed &&
    model.value.password.isVerifyed &&
    model.value.passwordRepeat.isVerifyed
  );
});

/* * * Submit * * */

const onSubmit = async (_id: number): Promise<void> => {
  onVerifyLogin();
  onVerifyEmail();
  onVerifyPassword();
  onVerifyRepeatPassword();

  if (!isFormValidated.value) return;

  const credentials = {
    login: model.value.login.value,
    email: model.value.email.value,
    password: model.value.password.value,
  };

  const error = await authStore.register(credentials);

  if (error) {
    formError.value.message = error;
    formError.value.status = true;
    return;
  }

  router.push({ path: PublicRoutes.LOGIN });
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
