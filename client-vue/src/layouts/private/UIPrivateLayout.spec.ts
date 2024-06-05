import { mount } from "@vue/test-utils";
import { describe, expect, test, vi } from "vitest";
import { h } from "vue";

import { createPinia, setActivePinia } from "pinia";
import UIPrivateLayout from "./UIPrivateLayout.vue";

const pinia = createPinia();

vi.mock("vue-router");

describe("UIPrivateLayout", () => {
  test("should render MainHeader", async () => {
    setActivePinia(pinia);

    const wrapper = mount(UIPrivateLayout);

    await vi.dynamicImportSettled();

    const header = wrapper.find('[data-test-id="main-header"]');
    const isHeaderExists = header.exists();

    expect(isHeaderExists).toBe(true);
    expect(isHeaderExists).toMatchSnapshot();
  });

  // test("should render MainFooter", () => {
  //   setActivePinia(pinia);

  //   const wrapper = mount(UIPrivateLayout);

  //   const footer = wrapper.find('[data-test-id="main-footer"]');
  //   const isFooterExists = footer.exists();

  //   expect(isFooterExists).toBe(true);
  //   expect(isFooterExists).toMatchSnapshot();
  // });

  /* * * !!!TEST RouterView * * */
});
