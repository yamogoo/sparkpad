import { describe, test, expect, vi } from "vitest";
import { mount } from "@vue/test-utils";

import UICellOption from "./UICellOption.vue";

describe("UICellOption", () => {
  test("should render title", () => {
    const wrapper = mount(UICellOption, {
      props: {
        title: "Title",
      },
    });

    const titleEl = wrapper.find('[data-testid="cell-option-title"]');
    const title = titleEl.text();

    expect(title).toContain("Title");
  });

  test('should render description when the "showDescription" prop is passed', () => {
    const wrapper = mount(UICellOption, {
      props: {
        title: "Title",
        description: "Description",
        showDescription: true,
      },
    });

    const text = wrapper.text();
    const description = wrapper.find('[data-testid="cell-option-description"');
    const isDescriptionExists = description.exists();

    expect(text).toContain("Title");
    expect(text).toContain("Description");
    expect(isDescriptionExists).toBe(true);
    expect(isDescriptionExists).toMatchSnapshot();
  });

  test('should not render description when the "description" prop is specified and the "showDescription" prop is not passed', () => {
    const wrapper = mount(UICellOption, {
      props: {
        title: "Title",
        description: "Description",
        showDescription: false,
      },
    });

    const text = wrapper.text();
    const description = wrapper.find('[data-testid="cell-option-description"');
    const isDescriptionExists = description.exists();

    expect(text).toContain("Title");
    expect(isDescriptionExists).toBe(false);
    expect(isDescriptionExists).toMatchSnapshot();
  });

  test("should render chevron", async () => {
    const wrapper = mount(UICellOption, {
      props: {
        title: "Title",
        showChevron: true,
      },
    });

    await vi.dynamicImportSettled();

    const chevron = wrapper.find('[data-testid="cell-option__chevron"]');
    const isChevronExists = chevron.exists();

    expect(isChevronExists).toBe(true);
    expect(wrapper.getComponent({ name: "UISymbol" }));
  });

  test('should render the Control inside the "default" slot', () => {
    const CONTROL = "Control";

    const wrapper = mount(UICellOption, {
      props: {
        title: "Title",
        showChevron: true,
      },
      slots: {
        default: `<p>${CONTROL}</p>`,
      },
    });

    const text = wrapper.text();

    expect(text).toContain(CONTROL);
    expect(text).toMatchSnapshot();
  });
});
