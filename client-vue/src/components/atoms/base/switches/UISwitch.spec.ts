import { describe, expect, test } from "vitest";
import { mount } from "@vue/test-utils";

import UISwitch from "./UISwitch.vue";

describe("Switch", () => {
  test.each([true])(
    'should add class attribute "active" to container DOM if "state" prop equals %s',
    (state) => {
      const wrapper = mount(UISwitch, {
        props: {
          state,
        },
      });

      const className = wrapper.classes("active");
      expect(className).toBe(true);
      expect(wrapper.classes("normal")).toBe(false);
      expect(className).toMatchSnapshot();
    }
  );

  test.each([false])(
    'should add class attribute "normal" to container DOM if "state" prop equals %s',
    (state) => {
      const wrapper = mount(UISwitch, {
        props: {
          state,
        },
      });

      const className = wrapper.classes("normal");
      expect(className).toBe(true);
      expect(wrapper.classes("active")).toBe(false);
      expect(className).toMatchSnapshot();
    }
  );

  test('should emit "update:state" when clicking on the wrapper', async () => {
    const wrapper = mount(UISwitch, {
      props: {
        state: true,
      },
    });

    const inputEl = wrapper.find('input[type="checkbox"]');
    await inputEl.trigger("change");

    expect(wrapper.emitted("update:state")).toHaveLength(1);
    expect(wrapper.emitted()).toHaveProperty("update:state");
    expect(wrapper.emitted("update:state")).toMatchSnapshot();
  });
});
