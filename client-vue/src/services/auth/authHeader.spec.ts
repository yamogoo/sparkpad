import { describe, expect, test } from "vitest";

import authHeader from "./authHeader";

describe("authHeader", () => {
  test("should return an empty object", () => {
    const token = authHeader();

    expect(token).toMatchObject({});
    expect(token).toMatchSnapshot();
  });
});
