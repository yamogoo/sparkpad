import { mount } from "@vue/test-utils";
import { describe, expect, test } from "vitest";

import { nextTick } from "vue";

import { HierarchyNodeTypes } from "@/typings";
import { Symbols } from "@/components/atoms/base/icons/Symbols";

import UIHierarchyItem from "./UIHierarchyItem.vue";

enum Classes {
  FOCUSED = "focused",
  ACTIVE = "active",
  FILE = "file",
}

enum Emits {
  SELECT = "select",
  DELETE = "delete",
}

describe("UIHierarchyItem", () => {
  describe("classes", () => {
    describe(`${Classes.FOCUSED} class name`, async () => {
      const wrapper = mount(UIHierarchyItem, {
        props: {
          id: "1",
          parentId: null,
          sid: "1",
          label: "Label",
          type: HierarchyNodeTypes.FILE,
        },
      });

      const body = wrapper.find('[data-testid="hierarchy-item-body"]');

      await body.trigger("mouseenter");
      const root = wrapper.find('[data-testid="hierarchy-item"]');

      test.each([Classes.FOCUSED])(
        'should have "%s" class name',
        async (className) => {
          expect(root.classes(className)).toBe(true);
          expect(root.classes()).toMatchSnapshot();
        }
      );
      test.each([Classes.FOCUSED])(
        'should note have "%s" class name',
        async (className) => {
          await body.trigger("mouseleave");

          expect(root.classes(className)).toBe(false);
          expect(root.classes()).toMatchSnapshot();
        }
      );
    });

    describe(`${Classes.ACTIVE} class name`, () => {
      const wrapper = mount(UIHierarchyItem, {
        props: {
          id: "1",
          parentId: null,
          sid: "1",
          label: "Label",
          type: HierarchyNodeTypes.FILE,
        },
      });

      const root = wrapper.find('[data-testid="hierarchy-item"]');

      test.each([Classes.ACTIVE])(
        'should have "%s" class name',
        (className) => {
          expect(root.classes(className)).toBe(true);
          expect(root.classes()).toMatchSnapshot();
        }
      );

      test.each([Classes.ACTIVE])(
        'should not have "%s" class name',
        async (className) => {
          wrapper.setProps({ sid: "2" });

          await nextTick();

          expect(root.classes(className)).toBe(false);
          expect(root.classes()).toMatchSnapshot();
        }
      );
    });

    describe(`${Classes.FILE}`, () => {
      const wrapper = mount(UIHierarchyItem, {
        props: {
          id: "1",
          parentId: null,
          sid: "1",
          label: "Label",
          type: HierarchyNodeTypes.FILE,
        },
      });

      const root = wrapper.find('[data-testid="hierarchy-item"]');

      test.each([Classes.FILE])(`should have "%s" class name`, (className) => {
        expect(root.classes(className)).toBe(true);
        expect(root.classes()).toMatchSnapshot();
      });

      test.each([Classes.FILE])(
        `should  not have "%s" class name`,
        async (className) => {
          await wrapper.setProps({ type: HierarchyNodeTypes.DIR });

          expect(root.classes(className)).toBe(false);
          expect(root.classes()).toMatchSnapshot();
        }
      );
    });
  });

  describe("events", () => {
    test.each([Emits.SELECT])(`should emit "%s" event`, async (eventName) => {
      const wrapper = mount(UIHierarchyItem, {
        props: {
          id: "1",
          parentId: null,
          sid: "1",
          label: "Label",
          type: HierarchyNodeTypes.FILE,
        },
      });

      const body = wrapper.find('[data-testid="hierarchy-item-body"]');
      await body.trigger("click");

      expect(wrapper.emitted()).toHaveProperty(eventName);
      expect(wrapper.emitted(eventName)).toMatchSnapshot();
    });

    // test.each([Emits.DELETE])(`should emit "%s" event`, async (eventName) => {
    //   const wrapper = mount(UIHierarchyItem, {
    //     props: {
    //       id: "1",
    //       parentId: null,
    //       sid: "1",
    //       label: "Label",
    //       type: HierarchyNodeTypes.FILE,
    //     },
    //   });

    //   const deleteButton = wrapper.find(
    //     '[data-testid="hierarchy-item-delete-button"]'
    //   );
    //   await deleteButton.trigger("click");

    //   expect(wrapper.emitted()).toHaveProperty(eventName);
    //   expect(wrapper.emitted(eventName)).toMatchSnapshot();
    // });
  });

  describe("components", () => {
    // test(`should render "Delete" button`, async () => {
    //   const wrapper = mount(UIHierarchyItem, {
    //     props: {
    //       id: "1",
    //       parentId: null,
    //       sid: "1",
    //       label: "Label",
    //       type: HierarchyNodeTypes.FILE,
    //     },
    //   });

    //   const deleteButton = wrapper.find(
    //     '[data-testid="hierarchy-item-delete-button"]'
    //   );
    //   const isDeleteButtonExists = deleteButton.exists();

    //   expect(isDeleteButtonExists).toBe(true);
    //   expect(isDeleteButtonExists).toMatchSnapshot();
    // });

    describe("Node Type Icon", () => {
      const wrapper = mount(UIHierarchyItem, {
        props: {
          id: "1",
          parentId: null,
          sid: "1",
          label: "Label",
          type: HierarchyNodeTypes.FILE,
        },
      });

      test(`should render "Node Type" icon`, async () => {
        const nodeIcon = wrapper.find(
          '[data-testid="hierarchy-item-node-icon"]'
        );
        const isNodeIconExists = nodeIcon.exists();

        expect(isNodeIconExists).toBe(true);
        expect(isNodeIconExists).toMatchSnapshot();
      });

      test(`should render "Node File" icon`, async () => {
        await wrapper.setProps({ type: HierarchyNodeTypes.FILE });

        const nodeIcon = wrapper.find(`[data-test="${Symbols.FILE}"]`);
        const isNodeIconExists = nodeIcon.exists();

        expect(isNodeIconExists).toBe(true);
        expect(isNodeIconExists).toMatchSnapshot();
      });

      test(`should render "Node Dir Open" icon`, async () => {
        await wrapper.setProps({ type: HierarchyNodeTypes.DIR });
        await nextTick();

        const nodeIcon = wrapper.find(`[data-test="${Symbols.DIR_FILL}"]`);
        const isNodeIconExists = nodeIcon.exists();

        expect(isNodeIconExists).toBe(true);
        expect(isNodeIconExists).toMatchSnapshot();
      });

      test(`should render "Node Dir Open" icon`, async () => {
        await wrapper.setProps({ type: HierarchyNodeTypes.DIR });
        const body = wrapper.find('[data-testid="hierarchy-item-body"]');
        await body.trigger("click");

        await nextTick();

        const nodeIcon = wrapper.find(`[data-test="${Symbols.DIR_OPEN_FILL}"]`);
        const isNodeIconExists = nodeIcon.exists();

        expect(isNodeIconExists).toBe(true);
        expect(isNodeIconExists).toMatchSnapshot();
      });
    });

    describe("Arrow Icon", () => {
      const wrapper = mount(UIHierarchyItem, {
        props: {
          id: "1",
          parentId: null,
          sid: "1",
          label: "Label",
          type: HierarchyNodeTypes.FILE,
        },
      });

      test("shoud not render arrow icon", () => {
        const icon = wrapper.find('[data-testid="hierarchy-item-arrow-icon"]');
        const isIconExists = icon.exists();

        expect(isIconExists).toBe(false);
        expect(isIconExists).toMatchSnapshot();
      });

      test("shoud render arrow icon", async () => {
        await wrapper.setProps({ type: HierarchyNodeTypes.DIR });

        const icon = wrapper.find('[data-testid="hierarchy-item-arrow-icon"]');
        const isIconExists = icon.exists();

        expect(isIconExists).toBe(true);
        expect(isIconExists).toMatchSnapshot();
      });
    });
  });
});
