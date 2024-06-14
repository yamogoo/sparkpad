import { describe, expect, test } from "vitest";

import { useDoubleClick } from "./useDoubleClick";

const MS = 1000;

describe("useDoubleClick", () => {
  test(`should set isChecked to "true"`, async () => {
    const doubleClick = useDoubleClick(MS);

    let isClicked = false;

    const callback = () => {
      isClicked = true;
    };

    doubleClick(callback);

    await new Promise((resolve) => {
      setTimeout(() => {
        resolve(doubleClick(callback));
      }, 500);
    });

    expect(isClicked).toBe(true);
    expect(isClicked).toMatchSnapshot();
  });

  test(`should set isChecked to "false"`, async () => {
    const doubleClick = useDoubleClick(MS);

    let isClicked = false;

    const callback = () => {
      isClicked = true;
    };

    doubleClick(callback);

    await new Promise((resolve) => {
      setTimeout(() => {
        resolve(doubleClick(callback));
      }, 1100);
    });

    expect(isClicked).toBe(true);
    expect(isClicked).toMatchSnapshot();
  });
});
