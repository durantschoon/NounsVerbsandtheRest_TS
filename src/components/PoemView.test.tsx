import { exportedForTesting } from "./PoemView";
const { inpendNestedKeys, getLines } = exportedForTesting;

describe("PoemView", () => {
  describe("inpendNestedKeys", () => {
    it("should initialize and append values correctly", () => {
      const container = {};

      inpendNestedKeys(container, "key1", "key2", "value1");
      expect(container).toEqual({ key1: { key2: ["value1"] } });

      inpendNestedKeys(container, "key1", "key2", "value2");
      expect(container).toEqual({ key1: { key2: ["value1", "value2"] } });

      inpendNestedKeys(container, "key1", "key3", "value3");
      expect(container).toEqual({
        key1: { key2: ["value1", "value2"], key3: ["value3"] },
      });
    });
  });

  describe("getLines", () => {
    it("should return the lines of the correct poem", () => {
      const poems = [
        { title: "Poem1", lines: ["Line1", "Line2"] },
        { title: "Poem2", lines: ["Line3", "Line4"] },
      ];

      expect(getLines(poems, "Poem1")).toEqual(["Line1", "Line2"]);
      expect(getLines(poems, "Poem2")).toEqual(["Line3", "Line4"]);
    });
  });
});
