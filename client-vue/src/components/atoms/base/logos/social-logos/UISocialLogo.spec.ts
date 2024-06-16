import { describe, expect, test, vi } from "vitest";
import { mount } from "@vue/test-utils";

import { SocialLogos } from "./Logos";
import { initRouter, router } from "@/router/mock";

import UISocialLogo from "./UISocialLogo.vue";

describe("UISymbol", () => {
  initRouter();

  test.each(Object.values(SocialLogos))(
    'should render %s icon from "Symbols" data set',
    async (iconName) => {
      const component = mount(UISocialLogo, {
        props: {
          name: iconName,
        },
        global: {
          plugins: [router],
        },
      });

      await vi.dynamicImportSettled();

      const res = component.find("svg");
      expect(res.exists()).toBe(true);
      expect(res.exists()).toMatchSnapshot();
    }
  );
});
