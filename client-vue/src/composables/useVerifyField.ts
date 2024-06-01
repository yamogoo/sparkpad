import type { Ref } from "vue";

import { getError } from "@/utils";
import type {
  FormError,
  FormInputValue,
} from "@/components/atoms/forms/UIForm.vue";

export const useVerifyField = <K extends string>(
  key: K,
  model: Ref<Record<K, FormInputValue>>,
  opts: {
    formError: Ref<FormError>;
    errorMessage: string;
    isVerifyed: boolean;
  }
) => {
  if (!opts.isVerifyed) {
    model.value[key].error = true;
    opts.formError.value = getError(opts.errorMessage);
    return;
  } else {
    model.value[key].error = false;
    opts.formError.value = getError(undefined);
  }

  model.value[key].isVerifyed = opts.isVerifyed;
};
