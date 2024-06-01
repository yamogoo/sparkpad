import { describe, expect, test } from "vitest";

import { ref, type Ref } from "vue";

import { useVerifyField } from "./useVerifyField";
import type {
  FormError,
  FormInputValue,
} from "@/components/atoms/forms/UIForm.vue";

type ModelKeys = "login";

const formError: Ref<FormError> = ref({
  message: undefined,
  status: false,
});

describe("useVerifyField", () => {
  describe("not be verified", () => {
    const model: Ref<Record<"login", FormInputValue>> = ref({
      login: {
        value: "",
        error: false,
        isVerifyed: false,
      },
    });

    const isVerifyed = false;

    useVerifyField<ModelKeys>("login", model, {
      formError,
      errorMessage: "",
      isVerifyed,
    });

    const verify = model.value.login.isVerifyed;
    const errorStatus = formError.value.status;

    test("field should not be verified", () => {
      expect(verify).toBe(false);
      expect(verify).toMatchSnapshot();
    });

    test("error status should be false", () => {
      expect(errorStatus).toBe(false);
      expect(errorStatus).toMatchSnapshot();
    });
  });

  describe("field should be verified", () => {
    const model: Ref<Record<"login", FormInputValue>> = ref({
      login: {
        value: "",
        error: false,
        isVerifyed: false,
      },
    });

    const isVerifyed = true;

    useVerifyField<ModelKeys>("login", model, {
      formError,
      errorMessage: "",
      isVerifyed,
    });

    const verify = model.value.login.isVerifyed;
    const errorStatus = formError.value.status;

    test("field should be verified", () => {
      expect(verify).toBe(true);
      expect(verify).toMatchSnapshot();
    });

    test("error status should be false", () => {
      expect(errorStatus).toBe(false);
      expect(errorStatus).toMatchSnapshot();
    });
  });

  test("field should be write error message", () => {
    const ERROR_MESSAGE = "Error Message";

    const model: Ref<Record<"login", FormInputValue>> = ref({
      login: {
        value: "",
        error: false,
        isVerifyed: false,
      },
    });

    const isVerifyed = false;

    useVerifyField<ModelKeys>("login", model, {
      formError,
      errorMessage: ERROR_MESSAGE,
      isVerifyed,
    });

    const errorMessage = formError.value.message;

    expect(errorMessage).toBe(ERROR_MESSAGE);
    expect(errorMessage).toMatchSnapshot();
  });
});
