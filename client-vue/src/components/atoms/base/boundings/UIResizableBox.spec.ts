import { mount } from "@vue/test-utils";
import { describe, expect, test } from "vitest";

import UIResizableBox from "./UIResizableBox.vue";
import { nextTick } from "vue";

const TRIGGERS_DATA: [string, boolean][] = [
  ["show", true],
  ["hide", false],
];

const DEFAULT_PROPS = {
  width: 320,
  minWidth: 300,
  maxWidth: 360,
};

describe("UIResizableBox", () => {
  describe("classes", () => {
    test.each(TRIGGERS_DATA)(
      'should have the class name "%s" when mouseenter ',
      async (_className, isExists) => {
        const wrapper = mount(UIResizableBox, {
          props: { ...DEFAULT_PROPS },
        });

        const splitter = wrapper.find(
          '[data-test-id="resizaable-box-pane-splitter"]'
        );

        await nextTick();
        await splitter.trigger("mouseenter");

        const className = splitter.classes(_className);
        expect(className).toBe(isExists);
        expect(className).toMatchSnapshot();
      }
    );

    test.each(TRIGGERS_DATA)(
      'should have the class name "%s" when mouseleave ',
      async (_className, isExists) => {
        const wrapper = mount(UIResizableBox, { props: { ...DEFAULT_PROPS } });

        const splitter = wrapper.find(
          '[data-test-id="resizaable-box-pane-splitter"]'
        );

        await nextTick();
        await splitter.trigger("mouseenter");
        await splitter.trigger("mouseleave");

        const className = splitter.classes(_className);

        expect(className).toBe(!isExists);
        expect(className).toMatchSnapshot();
      }
    );
  });
});
