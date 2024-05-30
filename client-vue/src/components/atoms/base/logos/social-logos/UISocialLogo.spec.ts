import { describe, expect, test, vi } from "vitest";
import { mount } from "@vue/test-utils";

import { SocialLogos } from "./Logos";
import UISocialLogo from "./UISocialLogo.vue";

describe("UISymbol", () => {
  test.each(Object.values(SocialLogos))(
    'should render %s icon from "Symbols" data set',
    async (iconName) => {
      const component = mount(UISocialLogo, {
        props: {
          name: iconName,
        },
      });

      await vi.dynamicImportSettled();

      const res = component.find("svg");
      expect(res.exists()).toBe(true);
      expect(res.exists()).toMatchSnapshot();
    }
  );
});
