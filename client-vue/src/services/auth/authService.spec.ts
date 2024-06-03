import { describe, expect, test } from "vitest";

describe("authService", () => {
  const envVars = [
    ["VITE_SERVER_HOST", import.meta.env.VITE_SERVER_HOST],
    ["VITE_SERVER_PORT", import.meta.env.VITE_SERVER_PORT],
    ["VITE_SERVER_API_VERSION", import.meta.env.VITE_SERVER_API_VERSION],
  ];

  test.each(envVars)(
    ".env (*.local) should contain values for %s=%s. The value must not be nullish",
    (_k, v) => {
      expect(v).not.toBe(undefined);
      expect(v).not.toBe("");
      expect(v).toMatchSnapshot();
    }
  );
});
