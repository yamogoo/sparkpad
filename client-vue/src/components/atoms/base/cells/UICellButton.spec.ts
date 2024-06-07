import { describe, expect, it, test, vi } from "vitest";
import { mount } from "@vue/test-utils";

import UICellButton from "./UICellButton.vue";

describe("UICellButton", () => {
  describe("title", () => {
    it("should render title without the showTitle prop", () => {
      const wrapper = mount(UICellButton, {
        props: {
          title: "Title",
        },
      });

      const text = wrapper.text();
      const title = wrapper.find('[data-testid="cell-button-title"]');
      const isTitleExists = title.exists();

      expect(text).toContain("Title");
      expect(isTitleExists).toBe(true);
      expect(isTitleExists).toMatchSnapshot();
    });

    it("should render title", () => {
      const wrapper = mount(UICellButton, {
        props: {
          title: "Title",
          showTitle: true,
        },
      });

      const title = wrapper.find('[data-testid="cell-button-title"]');
      const isTitleExists = title.exists();

      expect(wrapper.text()).toContain("Title");
      expect(isTitleExists).toBe(true);
      expect(isTitleExists).toMatchSnapshot();
    });
  });

  describe("description", () => {
    it("should render description", () => {
      const wrapper = mount(UICellButton, {
        props: {
          description: "Description",
          showDescription: true,
        },
      });

      const description = wrapper.find(
        '[data-testid="cell-button-description"]'
      );
      const isDescriptionExists = description.exists();

      expect(wrapper.text()).toContain("Description");
      expect(isDescriptionExists).toBe(true);
      expect(isDescriptionExists).toMatchSnapshot();
    });
  });

  describe("image", () => {
    it("should render image", async () => {
      const wrapper = mount(UICellButton, {
        props: {
          showImage: true,
        },
      });

      await vi.dynamicImportSettled();

      const image = wrapper.find('[data-testid="image-thumbnail"]');
      const isImageExists = image.exists();

      expect(isImageExists).toBe(true);
      expect(isImageExists).toMatchSnapshot();
    });
  });

  test('should emit "open" event when clicking on the root "button" DOM element', async () => {
    const wrapper = mount(UICellButton, {});

    const button = wrapper.find(".cell-button");
    await button.trigger("click");

    expect(wrapper.emitted("open")).toHaveLength(1);
    expect(wrapper.emitted()).toHaveProperty("open");
    expect(wrapper.emitted("open")).toMatchSnapshot();
  });
});
