/**
 * Profanity filter for username validation
 * Uses leo-profanity package for well-maintained word lists
 */

import leoProfanity from 'leo-profanity'

// Initialize the filter with English dictionary
// Also includes additional words that might be used to impersonate staff
const additionalBlockedWords = [
  'admin',
  'administrator',
  'support',
  'official',
  'moderator',
  'staff',
  'mod',
  'owner',
  'founder'
]

// Initialization function to add custom words
let initialized = false
function ensureInitialized() {
  if (!initialized) {
    additionalBlockedWords.forEach(word => {
      leoProfanity.add(word)
    })
    initialized = true
  }
}

/**
 * Check if a username contains profanity or inappropriate content
 * Uses leo-profanity's built-in detection which handles:
 * - Profane words (whole words and within strings)
 * - Custom blocked words for staff impersonation
 */
export function containsProfanity(username: string): boolean {
  ensureInitialized()

  // Check if the whole username is profane (handles whole words)
  if (leoProfanity.check(username)) {
    return true
  }

  // Split by common separators and check each part
  const parts = username.split(/[_-]/)
  for (const part of parts) {
    if (leoProfanity.check(part)) {
      return true
    }
  }

  // Check if any blocked word is contained as a substring
  const lowerUsername = username.toLowerCase()
  for (const word of additionalBlockedWords) {
    if (lowerUsername.includes(word)) {
      return true
    }
  }

  // Get all profane words from leo-profanity and check as substrings
  // This catches cases like "ass123" where profanity is embedded without separators
  const profaneWords = leoProfanity.list()
  for (const word of profaneWords) {
    if (lowerUsername.includes(word)) {
      return true
    }
  }

  return false
}

/**
 * Validate that a username doesn't contain profanity
 * Returns null if valid, or an error message if invalid
 */
export function validateNoProfanity(username: string): string | null {
  if (containsProfanity(username)) {
    return "This username contains inappropriate content. Please choose a different one."
  }

  return null
}

