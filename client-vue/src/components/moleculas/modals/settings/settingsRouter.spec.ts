import { describe, expect, test } from "vitest";

import { useSettingsRoute, useSettingsRouter } from "./settingsRouter";

const NEW_ROUTE = {
  path: "new",
};

describe("settingsRouter", () => {
  test(`"route" should watching for current route value (${NEW_ROUTE.path})`, () => {
    const router = useSettingsRouter();
    const route = useSettingsRoute();

    router.push(NEW_ROUTE);

    expect(route.value.path).toBe(NEW_ROUTE.path);
    expect(route.value).toMatchSnapshot();
  });
});
