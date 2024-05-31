import { mount } from "@vue/test-utils";
import { describe, expect, test } from "vitest";

import { createPinia, setActivePinia } from "pinia";
import UIPrivateLayout from "./UIPrivateLayout.vue";

const pinia = createPinia();

describe("UIPrivateLayout", () => {
  test("should render MainHeader", () => {
    setActivePinia(pinia);

    const wrapper = mount(UIPrivateLayout);

    const header = wrapper.find('[data-test-id="main-header"]');
    const isHeaderExists = header.exists();

    expect(isHeaderExists).toBe(true);
    expect(isHeaderExists).toMatchSnapshot();
  });

  test("should render MainFooter", () => {
    setActivePinia(pinia);

    const wrapper = mount(UIPrivateLayout);

    const footer = wrapper.find('[data-test-id="main-footer"]');
    const isFooterExists = footer.exists();

    expect(isFooterExists).toBe(true);
    expect(isFooterExists).toMatchSnapshot();
  });

  /* * * !!!TEST RouterView * * */
});
