import { mount } from "@vue/test-utils";
import { describe, expect, test } from "vitest";

import UINoteListItem from "./UINoteListItem.vue";

enum ClassNames {
  ACTIVE = "active",
  NORMAL = "normal",
  FOCUSED = "focused",
}

describe("UINoteListItem", () => {
  const DESCRIPTION = "Description Content";
  const TITLE = "Title Content";

  test(`should render description ${DESCRIPTION}`, () => {
    const wrapper = mount(UINoteListItem, {
      props: {
        id: 1,
        title: TITLE,
        description: DESCRIPTION,
      },
    });

    const descriptionEl = wrapper.find(
      '[data-testid="notes-list-item-description"]'
    );
    const description = descriptionEl.text();

    expect(description).toContain(DESCRIPTION);
    expect(description).toMatchSnapshot();
  });

  test(`should emit "open" event`, async () => {
    const wrapper = mount(UINoteListItem, {
      props: {
        id: 1,
        title: TITLE,
        description: DESCRIPTION,
      },
    });

    const descriptionEl = wrapper.find(
      '[data-testid="notes-list-item-description"]'
    );
    await descriptionEl.trigger("click");

    expect(wrapper.emitted()).toHaveProperty("open");
    expect(wrapper.emitted("open")).toMatchSnapshot();
  });

  test(`should have the ${ClassNames.ACTIVE} class name`, () => {
    const wrapper = mount(UINoteListItem, {
      props: {
        id: 1,
        isActive: true,
        title: TITLE,
        description: DESCRIPTION,
      },
    });

    const className = wrapper.classes(ClassNames.ACTIVE);

    expect(className).toBe(true);
    expect(className).toMatchSnapshot();
  });

  test(`should have the ${ClassNames.NORMAL} class name`, () => {
    const wrapper = mount(UINoteListItem, {
      props: {
        id: 1,
        isActive: false,
        title: TITLE,
        description: DESCRIPTION,
      },
    });

    const classes = wrapper.classes();
    const className = wrapper.classes(ClassNames.NORMAL);

    expect(classes).toContain(ClassNames.NORMAL);
    expect(className).toMatchSnapshot();
  });

  test(`should have the ${ClassNames.FOCUSED} class name`, async () => {
    const wrapper = mount(UINoteListItem, {
      props: {
        id: 1,
        isActive: false,
        title: TITLE,
        description: DESCRIPTION,
      },
    });

    const itemEl = wrapper.find('[data-testid="notes-list-item"]');
    await itemEl.trigger("mouseenter");

    const className = wrapper.classes(ClassNames.FOCUSED);

    expect(className).toBe(true);
    expect(className).toMatchSnapshot();
  });

  test(`should not have the ${ClassNames.FOCUSED} class name`, async () => {
    const wrapper = mount(UINoteListItem, {
      props: {
        id: 1,
        isActive: false,
        title: TITLE,
        description: DESCRIPTION,
      },
    });

    const itemEl = wrapper.find('[data-testid="notes-list-item"]');
    await itemEl.trigger("mouseenter");
    await itemEl.trigger("mouseleave");

    const className = wrapper.classes(ClassNames.FOCUSED);

    expect(className).toBe(false);
    expect(className).toMatchSnapshot();
  });
});
