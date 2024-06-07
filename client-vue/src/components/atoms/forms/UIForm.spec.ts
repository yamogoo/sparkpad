import { mount } from "@vue/test-utils";
import { describe, expect, test } from "vitest";

import UIForm from "./UIForm.vue";

describe("UIForm", () => {
  test('should have the "id" attr value', () => {
    const ID = "login";
    const wrapper = mount(UIForm, {
      props: {
        id: ID,
      },
    });

    const id = wrapper.find(".form").attributes("id");
    expect(id).toBe(ID);
    expect(id).toMatchSnapshot();
  });

  test("should render the title (%s) into header DOM", () => {
    const TITLE = "Login";

    const wrapper = mount(UIForm, {
      props: {
        title: TITLE,
      },
    });

    const title = wrapper.find('[data-testid="form-title"]').text();
    expect(title).toBe(TITLE);
    expect(title).toMatchSnapshot();
  });

  test("should not render a title into header DOM if title is not set", () => {
    const wrapper = mount(UIForm);

    const title = wrapper.find('[data-testid="form-title"]');
    const isTitleExists = title.exists();

    expect(isTitleExists).toBe(false);
    expect(isTitleExists).toMatchSnapshot();
  });

  test("should not render header (showHeader: false)", () => {
    const wrapper = mount(UIForm, {
      props: {
        showHeader: false,
      },
    });

    const header = wrapper.find('[data-testid="form-header"]');
    const isHeaderExists = header.exists();
    expect(isHeaderExists).toBe(false);
    expect(isHeaderExists).toMatchSnapshot();
  });

  test.each(['<p id="header-slot">Header content</p>'])(
    "should render header slot (%s)",
    (header) => {
      const wrapper = mount(UIForm, {
        slots: {
          header,
        },
      });

      const headerContent = wrapper.find('[id="header-slot"]');
      const isHeaderSlotExists = headerContent.exists();

      expect(isHeaderSlotExists).toBe(true);
      expect(headerContent.html()).toMatchSnapshot();
    }
  );

  test.each(['<p id="body-slot">Body content</p>'])(
    "should render body slot (%s)",
    (body) => {
      const wrapper = mount(UIForm, {
        slots: {
          default: body,
        },
      });

      const bodyContent = wrapper.find('[id="body-slot"]');
      const isBodySlotExists = bodyContent.exists();

      expect(isBodySlotExists).toBe(true);
      expect(bodyContent.html()).toMatchSnapshot();
    }
  );

  test.each(['<p id="footer-slot">Footer content</p>'])(
    "should render footer slot (%s)",
    (body) => {
      const wrapper = mount(UIForm, {
        slots: {
          default: body,
        },
      });

      const footerContent = wrapper.find('[id="footer-slot"]');
      const isFooterSlotExists = footerContent.exists();

      expect(isFooterSlotExists).toBe(true);
      expect(footerContent.html()).toMatchSnapshot();
    }
  );
});
