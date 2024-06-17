import { describe, expect, test } from "vitest";
import {
  findAllSegments,
  findAllSubstrIdxs,
  findSubstrIdxs,
} from "./substring";

describe("findSubstrIdxs", () => {
  test.each([
    [{ start: 0, end: 2 }, "str", "string"],
    [{ start: 1, end: 2 }, "tr", "string"],
    [{ start: -1, end: -1 }, "w", "string"],
  ])(`should have (%o) indexes of "%s" substring`, (_idxs, substr, str) => {
    const idxs = findSubstrIdxs(str, substr);

    expect(idxs).toMatchObject(_idxs);
    expect(idxs).toMatchSnapshot();
  });

  describe("findAllSubstrIdxs", () => {
    test.each([
      [
        [
          { start: 5, end: 5 },
          { start: 8, end: 8 },
        ],
        "i",
        "description",
      ],
      [[{ start: 1, end: 3 }], "esc", "description"],
      [[], "rewtqw", "description"],
    ])(`should have (%o) indexes of "%s" substring`, (_idxs, substr, str) => {
      const idxs = findAllSubstrIdxs(str, substr);

      expect(idxs).toMatchObject(_idxs);
      expect(idxs).toMatchSnapshot();
    });
  });

  describe("findAllSegments", () => {
    test.each([
      [
        [
          { value: "d", position: { start: 0, end: 0 } },
          { value: "esc", position: { start: 1, end: 3 }, match: "esc" },
          { value: "ription", position: { start: 4, end: 10 } },
        ],
        "esc",
        "description",
        false,
      ],
      [
        [
          { value: "D", position: { start: 0, end: 0 } },
          { value: "eSc", position: { start: 1, end: 3 }, match: "ESC" },
          { value: "RiPtIoN", position: { start: 4, end: 10 } },
        ],
        "ESC",
        "DeScRiPtIoN",
        true,
      ],
      [
        [
          { value: "Desc", position: { start: 0, end: 3 }, match: "desc" },
          { value: " ", position: { start: 4, end: 4 } },
          { value: "Desc", position: { start: 5, end: 8 }, match: "desc" },
          { value: " ", position: { start: 9, end: 9 } },
          { value: "desc", position: { start: 10, end: 13 }, match: "desc" },
          { value: " ", position: { start: 14, end: 14 } },
          { value: "desc", position: { start: 15, end: 18 }, match: "desc" },
          { value: "ription", position: { start: 19, end: 25 } },
        ],
        "desc",
        "Desc Desc desc description",
        true,
      ],
    ])(
      "should look for matches regardless of case (%o)",
      (_idxs, substr, str, isInsensitive) => {
        const segments = findAllSegments(str, substr, isInsensitive);

        expect(segments).toMatchObject(_idxs);
        expect(segments).toMatchSnapshot();
      }
    );
  });
});
