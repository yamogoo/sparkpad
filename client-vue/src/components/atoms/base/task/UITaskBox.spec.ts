import { type DOMWrapper, mount } from "@vue/test-utils";
import { describe, expect, test } from "vitest";

import UITaskBox from "./UITaskBox.vue";

describe("UITaskBox", () => {
  const ArrOfProps = [
    "APP_AUTHOR",
    "APP_NAME",
    "APP_DESCRIPTION",
    "APP_VERSION",
  ];

  const defaultArrOfProps = [
    import.meta.env.APP_AUTHOR,
    import.meta.env.APP_NAME,
    import.meta.env.APP_DESCRIPTION,
    import.meta.env.APP_VERSION,
  ];

  test.each([[defaultArrOfProps]])(
    "should show default %s props (from package.json)",
    (data) => {
      const wrapper = mount(UITaskBox, {
        props: {
          author: data[0],
          name: data[1],
          description: data[2],
          version: data[3],
        },
      });

      const content = wrapper.find('[data-test-id="task-box-content"]');

      defaultArrOfProps.forEach((prop) => {
        expect(content.html()).toContain(prop.toUpperCase());
      });

      expect(content.html()).toMatchSnapshot();
    }
  );

  test.each([[ArrOfProps]])(
    "should show custom props (from package.json)",
    (data) => {
      const wrapper = mount(UITaskBox, {
        props: {
          author: data[0],
          name: data[1],
          description: data[2],
          version: data[3],
        },
      });

      const content = wrapper.find('[data-test-id="task-box-content"]');

      ArrOfProps.forEach((prop) => {
        expect(content.html()).toContain(prop);
      });

      expect(content.html()).toMatchSnapshot();
    }
  );

  test("should render default names if each prop = undefined", () => {
    const wrapper = mount(UITaskBox, {
      props: {
        author: undefined,
        name: undefined,
        description: undefined,
        version: undefined,
      },
    });

    type Data = "author" | "name" | "description" | "version";

    const props: Record<Data, DOMWrapper<Element>> = {
      author: wrapper.find('[data-test-id="task-box-author"]'),
      name: wrapper.find('[data-test-id="task-box-name"]'),
      description: wrapper.find('[data-test-id="task-box-description"]'),
      version: wrapper.find('[data-test-id="task-box-version"]'),
    };

    for (const [k, v] of Object.entries(props)) {
      expect(v.exists()).toBe(true);
    }

    // expect(props).toMatchSnapshot();
  });
});
