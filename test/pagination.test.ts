import { expect, it } from "vitest"
import { getPage } from "../utils/pagination"

it("getPage works as expected", () => {
  expect(getPage(undefined)).toBe(1)
  expect(getPage("a")).toBe(1)
  expect(getPage("1")).toBe(1)
  expect(getPage("1")).toBe(1)
  expect(getPage("1.1")).toBe(1)
  expect(getPage("100")).toBe(100)
  expect(getPage("-1")).toBe(1)
})
