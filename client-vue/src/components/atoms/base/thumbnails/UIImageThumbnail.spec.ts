import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";

import { Symbols } from "@/components/atoms/base/icons/Symbols";
import UIImageThumbnail from "./UIImageThumbnail.vue";

describe("UIImageThumbnail", () => {
  describe("UISymbol", () => {
    it("should display a default icon if no URL is specified and defaultSymbol is defined", () => {
      const wrapper = mount(UIImageThumbnail, {
        props: {
          url: undefined,
          defaultSymbol: Symbols.USER_THUMBNAIL,
        },
      });

      expect(wrapper.getComponent({ name: "UISymbol" }));
      expect(wrapper.find('[data-testid="symbol"]').exists()).toBe(true);
    });
  });
});
