import { mount } from "@vue/test-utils";
import { describe, expect, test } from "vitest";

import UICheckbox from "./UICheckbox.vue";

describe("UICheckbox", () => {
  const DEFAULT_LABEL = "Checkbox Label";

  test.each([DEFAULT_LABEL])("should render label", (label) => {
    const wrapper = mount(UICheckbox, {
      props: { label, state: false },
    });

    const labelEl = wrapper.find('[data-test-id="checkbox-label"]');
    const isLabelExists = labelEl.exists();

    expect(isLabelExists).toBe(true);
    expect(labelEl).toMatchSnapshot();
  });

  test.each([DEFAULT_LABEL])("should render label=%s", (label) => {
    const wrapper = mount(UICheckbox, {
      props: { label, state: false },
    });

    const labelEl = wrapper.find('[data-test-id="checkbox-label"]');
    const text = labelEl.text();

    expect(text).toBe(label);
    expect(text).toMatchSnapshot();
  });

  test('should emit "update:state" when clicking on the wrapper', async () => {
    const wrapper = mount(UICheckbox, {
      props: {
        state: false,
      },
    });

    const inputEl = wrapper.find("input");
    await inputEl.trigger("change");

    expect(wrapper.emitted()).toHaveProperty("update:state");
    expect(wrapper.emitted("update:state")).toMatchSnapshot();
  });

  test.each([true])(
    'should add class attribute "active" to container DOM if "state" prop equals %s',
    (state) => {
      const wrapper = mount(UICheckbox, {
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
      const wrapper = mount(UICheckbox, {
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
});
