import { mount } from "@vue/test-utils";
import { describe, expect, test } from "vitest";

import UIFormProvider from "./UIFormProvider.vue";

describe("UIFormField", () => {
  test.each(['<p id="default-slot">Default content</p>'])(
    "should render default slot (%s)",
    (defaultSlot) => {
      const wrapper = mount(UIFormProvider, {
        props: {
          showError: true,
          errorMessage: "Error",
        },
        slots: {
          default: defaultSlot,
        },
      });

      const DefaultContent = wrapper.find('[id="default-slot"]');
      const isDefaultSlotExists = DefaultContent.exists();

      expect(isDefaultSlotExists).toBe(true);
      expect(DefaultContent.html()).toMatchSnapshot();
    }
  );
});
