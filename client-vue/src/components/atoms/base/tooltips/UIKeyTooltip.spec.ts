import { mount } from "@vue/test-utils";
import { describe, expect, test } from "vitest";

import UIKeyTooltip from "./UIKeyTooltip.vue";

const CONTENT_PROP = "Inner Content";

describe("UIKeyTooltip", () => {
  test("should render content", () => {
    const wrapper = mount(UIKeyTooltip, {
      props: {
        content: CONTENT_PROP,
      },
    });

    const el = wrapper.find('[data-testid="key-tooltip"]');
    const text = el.text();

    expect(text).toContain(CONTENT_PROP);
    expect(text).toMatchSnapshot();
  });
});
