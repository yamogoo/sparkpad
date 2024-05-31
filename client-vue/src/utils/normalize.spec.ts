import { describe, expect, test } from "vitest";
import { normalizePort } from "./normalize";

describe("normalize", () => {
  describe("normalizePort", () => {
    const PORTS = ["5001", "3000"];
    test.each(PORTS)("should return typeof port === number (%i)", (port) => {
      const normalizedPort = normalizePort(port ?? "0");

      expect(normalizedPort).toBe(Number(port));
    });
  });
});
