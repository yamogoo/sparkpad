import { describe, expect, test } from "vitest";

import { getError } from "./errors";

describe("errors", () => {
  describe("getError", () => {
    enum ReturnKeys {
      STATUS = "status",
      MESSAGE = "message",
    }
    test("function should return status object", () => {
      const res = getError("Error");
      const status = Object.keys(res).find((key) => key === ReturnKeys.STATUS);

      expect(status).toBe(ReturnKeys.STATUS);
      expect(status).toMatchSnapshot();
    });

    test("function should return message object", () => {
      const res = getError("Error");
      const status = Object.keys(res).find((key) => key === ReturnKeys.MESSAGE);

      expect(status).toBe(ReturnKeys.MESSAGE);
      expect(status).toMatchSnapshot();
    });

    test("function should return status = false", () => {
      const res = getError();
      const status = Object.keys(res).find((key) => key === ReturnKeys.STATUS);

      expect(res["status"]).toBe(false);
      expect(status).toMatchSnapshot();
    });

    test("function should return status = true", () => {
      const res = getError("Message");
      const status = Object.keys(res).find((key) => key === ReturnKeys.STATUS);

      expect(res["status"]).toBe(true);
      expect(status).toMatchSnapshot();
    });
  });
});
