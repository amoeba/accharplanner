import { describe, it, expect } from "vitest"
import { containsProfanity, validateNoProfanity } from "../utils/profanity-filter"

describe("profanity-filter", () => {
  describe("containsProfanity", () => {
    it("returns false for clean usernames", () => {
      expect(containsProfanity("john_doe")).toBe(false)
      expect(containsProfanity("player123")).toBe(false)
      expect(containsProfanity("cool-gamer")).toBe(false)
      expect(containsProfanity("AC_Fan_2024")).toBe(false)
    })

    it("returns true for profane words in leo-profanity dictionary", () => {
      // Testing with words that are definitely in leo-profanity's dictionary
      expect(containsProfanity("ass")).toBe(true)
      expect(containsProfanity("asshole")).toBe(true)
      expect(containsProfanity("bastard")).toBe(true)
    })

    it("returns true for usernames containing profanity", () => {
      expect(containsProfanity("ass123")).toBe(true)
      expect(containsProfanity("cool_ass")).toBe(true)
    })

    it("returns true for staff impersonation attempts", () => {
      // These are added by our custom filter
      expect(containsProfanity("admin")).toBe(true)
      expect(containsProfanity("admin123")).toBe(true)
      expect(containsProfanity("support")).toBe(true)
      expect(containsProfanity("moderator")).toBe(true)
      expect(containsProfanity("official")).toBe(true)
    })

    it("is case insensitive", () => {
      expect(containsProfanity("ASS")).toBe(true)
      expect(containsProfanity("AsS")).toBe(true)
      expect(containsProfanity("ADMIN")).toBe(true)
    })
  })

  describe("validateNoProfanity", () => {
    it("returns null for valid usernames", () => {
      expect(validateNoProfanity("john_doe")).toBe(null)
      expect(validateNoProfanity("player123")).toBe(null)
      expect(validateNoProfanity("cool-gamer")).toBe(null)
    })

    it("returns error message for profane usernames", () => {
      const result = validateNoProfanity("ass123")
      expect(result).toBeTruthy()
      expect(result).toContain("inappropriate")
    })

    it("returns error message for staff impersonation", () => {
      const result = validateNoProfanity("admin")
      expect(result).toBeTruthy()
      expect(result).toContain("inappropriate")
    })
  })
})
