import { describe, expect, test } from "vitest";
import { History } from "./history";

describe("history", () => {
  test("should add new item", () => {
    const history = new History<string>(3);

    history.add({ uid: "1", data: "data" });
    const item = history.front;
    const length = history.all.length;

    expect(length).toBe(1);
    expect(item).toMatchSnapshot();
  });

  test.each([3, 12])("size of queue should be %i", (size) => {
    const history = new History<string>(size);

    for (let i = 0; i < 20; i++) {
      history.add({ uid: `${i}`, data: `${i}` });
    }

    const items = history.all;
    const length = history.all.length;

    expect(length).toBe(size);
    expect(items).toMatchSnapshot();
  });

  test("should set sid", () => {
    const SIZE = 3;
    const history = new History<string>(SIZE);

    for (let i = 0; i < 6; i++) {
      history.add({ uid: `${i}`, data: `${i}` });
    }

    history.sid = 2;
    const current = history.current;

    expect(current).toMatchObject({ uid: "5", data: `${5}` });
    expect(history.sid).toMatchSnapshot();
  });
});
