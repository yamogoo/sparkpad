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
      data-testid="login-form"
      type="submit"
      title="Sign In"
    )
      template(#header)
        UILink.md(
          label="Sign Up"
          :to="PublicRoutes.REGISTER"
          style="position: absolute; right: 0; top: 10px;"
        )
      UIFormField
        UIInput(
          label="Login or email"
          autocomplete="email"
          required
          :is-error="model.login.error"
          v-model:value="model.login.value"
          @update:value="onUpdateLogin"
          @verify:value="onVerifyLogin"
        )
      UIFormField
        UIInput(
          label="Password"
          autocomplete="current-password"
          required
          :is-error="model.password.error"
          v-model:value="model.password.value"
          @update:value="onUpdatePassword"
          @verify:value="onVerifyPassword"
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
import { computed, onMounted, ref, type Ref } from "vue";
import { useRouter } from "vue-router";
import g from "gsap";

import { verifyLogin, verifyPassword } from "@/utils";
import { useVerifyField } from "@/composables/useVerifyField";

import { useAuthStore } from "@/stores/auth";
import type { AuthLoginCredentials } from "@/typings";

import { PrivateRoutes, PublicRoutes } from "@/router";

import UIFormProvider from "@/components/atoms/forms/UIFormProvider.vue";
import UIForm, {
  type FormError,
  type FormInputValue,
} from "@/components/atoms/forms/UIForm.vue";
import UIFormField from "@/components/atoms/forms/UIFormField.vue";
import UIInput from "@/components/atoms/base/inputs/UIInput.vue";
import UIButton from "@/components/atoms/base/buttons/UIButton.vue";
import UICheckbox from "@/components/atoms/base/switches/UICheckbox.vue";
import UILink from "@/components/atoms/base/links/UILink.vue";

// import UILoginSocial from "./UILoginSocial.vue";

enum ErrorMessages {
  PASSWORD_NOT_VERIFIED = "pasword must be more than 8 characters",
  LOGIN_NOT_VERIFIED = "login must be more than 4 characters",
}

const router = useRouter();

const authStore = useAuthStore();

type ModelKeys = "login" | "password";

const model: Ref<Record<ModelKeys, FormInputValue>> = ref({
  login: {
    value: "",
    error: false,
    isVerifyed: false,
  },
  password: {
    value: "",
    error: false,
    isVerifyed: false,
  },
});

const formError: Ref<FormError> = ref({
  message: undefined,
  status: false,
});

const isPasswordCached = ref(false);

const onUpdateShowError = (state: boolean): void => {
  formError.value.status = state;
};

/* * * Verification Handlers * * */

const onUpdateLogin = (login: string): void => {
  model.value.login.value = login;
};

const onUpdatePassword = (password: string): void => {
  model.value.password.value = password;
};

const onUpdateRememberPasword = (state: boolean): void => {
  isPasswordCached.value = state;
};

/* * * Verifications * * */

const onVerifyLogin = (): void => {
  useVerifyField<ModelKeys>("login", model, {
    formError,
    errorMessage: ErrorMessages.LOGIN_NOT_VERIFIED,
    isVerifyed: verifyLogin(model.value.login.value),
  });
};

const onVerifyPassword = (): void => {
  useVerifyField<ModelKeys>("password", model, {
    formError,
    errorMessage: ErrorMessages.PASSWORD_NOT_VERIFIED,
    isVerifyed: verifyPassword(model.value.password.value),
  });
};

const isFormValidated = computed(() => {
  return model.value.login.isVerifyed && model.value.password.isVerifyed;
});

/* * * Submit * * */

const onSubmit = async (_id: number): Promise<void> => {
  onVerifyLogin(), onVerifyPassword();

  if (!isFormValidated.value) return;

  const credentials: AuthLoginCredentials = {
    login: model.value.login.value,
    password: model.value.password.value,
  };

  const error = await authStore.login(credentials);
  if (error) {
    formError.value.message = error;
    formError.value.status = true;
    return;
  }

  router.push({ path: PrivateRoutes.EDITOR });
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
