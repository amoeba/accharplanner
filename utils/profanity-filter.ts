/**
 * Profanity filter for username validation
 * Checks for inappropriate words and common variations
 */

// List of blocked words and patterns
// This is a basic list - you may want to expand this based on your needs
const BLOCKED_WORDS = [
  // Common profanity
  'fuck', 'shit', 'bitch', 'damn', 'crap', 'ass', 'asshole',
  'bastard', 'dick', 'cock', 'pussy', 'cunt', 'whore', 'slut',

  // Slurs and hate speech (partial list - expand as needed)
  'nigger', 'nigga', 'faggot', 'fag', 'retard', 'retarded',
  'tranny', 'chink', 'spic', 'kike', 'dyke',

  // Sexual content
  'porn', 'xxx', 'sex', 'nude', 'naked', 'penis', 'vagina',

  // Violence/harmful
  'kill', 'murder', 'rape', 'molest', 'terrorist', 'nazi',

  // Scam/spam indicators
  'admin', 'support', 'official', 'moderator', 'staff',

  // Add more as needed
]

// Common leetspeak substitutions
const LEETSPEAK_MAP: Record<string, string> = {
  '0': 'o',
  '1': 'i',
  '3': 'e',
  '4': 'a',
  '5': 's',
  '7': 't',
  '8': 'b',
  '@': 'a',
  '$': 's',
  '!': 'i',
}

/**
 * Normalize text to catch common obfuscation attempts
 */
function normalizeText(text: string): string {
  let normalized = text.toLowerCase()

  // Replace leetspeak characters
  for (const [leet, normal] of Object.entries(LEETSPEAK_MAP)) {
    normalized = normalized.replaceAll(leet, normal)
  }

  // Remove common separator characters
  normalized = normalized.replace(/[-_.\s]/g, '')

  return normalized
}

/**
 * Check if a username contains profanity or inappropriate content
 */
export function containsProfanity(username: string): boolean {
  const normalized = normalizeText(username)

  // Check if any blocked word is contained in the username
  for (const word of BLOCKED_WORDS) {
    if (normalized.includes(word)) {
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
