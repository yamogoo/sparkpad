import { describe, expect, test } from "vitest";
import { mount } from "@vue/test-utils";

import UISwitch from "./UISwitch.vue";

describe("Switch", () => {
  test.each([true])(
    'should add class attribute "active" to container DOM if "state" prop equals %s',
    (state) => {
      const component = mount(UISwitch, {
        props: {
          state,
        },
      });

      const className = component.classes("active");
      expect(className).toBe(true);
      expect(component.classes("normal")).toBe(false);
      expect(className).toMatchSnapshot();
    }
  );

  test.each([false])(
    'should add class attribute "normal" to container DOM if "state" prop equals %s',
    (state) => {
      const component = mount(UISwitch, {
        props: {
          state,
        },
      });

      const className = component.classes("normal");
      expect(className).toBe(true);
      expect(component.classes("active")).toBe(false);
      expect(className).toMatchSnapshot();
    }
  );

  test('should emit "update:state" when clicking on the component', () => {
    const component = mount(UISwitch, {
      props: {
        state: true,
      },
    });

    const inputEl = component.find('input[type="checkbox"]');
    inputEl.trigger("change");

    expect(component.emitted("update:state")).toHaveLength(1);
    expect(component.emitted()).toHaveProperty("update:state");
    expect(component.emitted("update:state")).toMatchSnapshot();
  });
});
