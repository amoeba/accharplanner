<script setup lang="ts">
import { ref, watch } from "vue"
import type { ProfileRow } from "~/utils/database.types";
import { setProfileName, getUserId, doesProfileNameAlreadyExist } from "~/utils/supabase";

const client = useSupabaseClient()
const user = useSupabaseUser()

const profile = ref<ProfileRow>()
const username = ref("")
const errorMessage = ref("")
const validationMessage = ref("")
const isCheckingAvailability = ref(false)
const isSubmitting = ref(false)

// Get the intended redirect URL from cookie or default to home
const redirectUrl = useCookie<string>('onboarding_redirect', { default: () => '/' })

// Get user ID
const userId = getUserId(user)

// Form state
enum FormState {
  UNSENT,
  CHECKING,
  VALID,
  INVALID,
  SUBMITTING,
  SUCCESS,
  ERROR,
}

const formState = ref(FormState.UNSENT)

// Load existing profile
if (userId) {
  const { data, error } = await client
    .from("profiles")
    .select()
    .eq("id", userId)

  if (error) {
    errorMessage.value = "Unable to load profile: " + error.message
  } else if (data && data.length > 0) {
    profile.value = data[0]
    // If they already have a name, populate it
    if (profile.value.name) {
      username.value = profile.value.name
    }
  } else {
    // Initialize empty profile if none exists
    profile.value = { id: userId, name: null, is_admin: false }
  }
} else {
  errorMessage.value = "Unable to load profile: User authentication is invalid."
}

// Debounce timer
let debounceTimer: NodeJS.Timeout | null = null

// Validate username format
const validateUsernameFormat = (name: string): { valid: boolean; message: string } => {
  const trimmed = name.trim()

  if (trimmed.length === 0) {
    return { valid: false, message: "" }
  }

  if (trimmed.length < 3) {
    return { valid: false, message: "Username must be at least 3 characters long." }
  }

  // Pattern: starts with letter, contains only letters, numbers, spaces, and apostrophes
  const pattern = /^[a-zA-Z][a-zA-Z0-9 ']{2,}$/

  if (!trimmed.match(pattern)) {
    return {
      valid: false,
      message: "Username must start with a letter and contain only letters, numbers, spaces, and apostrophes."
    }
  }

  return { valid: true, message: "" }
}

// Check username availability
const checkUsernameAvailability = async (name: string) => {
  const trimmed = name.trim()

  // Skip if it's their current name
  if (profile.value?.name === trimmed) {
    return { available: true, message: "This is your current username." }
  }

  isCheckingAvailability.value = true
  formState.value = FormState.CHECKING

  try {
    const { data, error } = await doesProfileNameAlreadyExist(client, trimmed)

    if (error) {
      return {
        available: false,
        message: "Error checking availability: " + error.message
      }
    }

    if (data && data.length > 0) {
      return {
        available: false,
        message: "This username is already taken. Please choose another."
      }
    }

    return { available: true, message: "Username is available!" }
  } finally {
    isCheckingAvailability.value = false
  }
}

// Watch username changes and validate/check availability
watch(username, async (newValue) => {
  validationMessage.value = ""
  errorMessage.value = ""

  // Clear any pending debounce
  if (debounceTimer) {
    clearTimeout(debounceTimer)
  }

  // Validate format first
  const formatValidation = validateUsernameFormat(newValue)

  if (!formatValidation.valid) {
    if (formatValidation.message) {
      validationMessage.value = formatValidation.message
      formState.value = FormState.INVALID
    } else {
      formState.value = FormState.UNSENT
    }
    return
  }

  // Debounce the availability check
  debounceTimer = setTimeout(async () => {
    const availabilityCheck = await checkUsernameAvailability(newValue)

    if (availabilityCheck.available) {
      validationMessage.value = availabilityCheck.message
      formState.value = FormState.VALID
    } else {
      validationMessage.value = availabilityCheck.message
      formState.value = FormState.INVALID
    }
  }, 500)
})

// Submit the username
const submitUsername = async () => {
  if (!profile.value || formState.value === FormState.SUBMITTING) {
    return
  }

  const trimmed = username.value.trim()

  // Final validation
  const formatValidation = validateUsernameFormat(trimmed)
  if (!formatValidation.valid) {
    errorMessage.value = formatValidation.message
    return
  }

  formState.value = FormState.SUBMITTING
  isSubmitting.value = true
  errorMessage.value = ""

  try {
    const { data, error } = await setProfileName(client, user, trimmed)

    if (error) {
      formState.value = FormState.ERROR
      errorMessage.value = error.message
      isSubmitting.value = false
      return
    }

    if (data) {
      formState.value = FormState.SUCCESS

      // Wait a moment to show success, then redirect
      setTimeout(() => {
        const destination = redirectUrl.value || '/'
        // Clear the redirect cookie
        redirectUrl.value = null
        navigateTo(destination)
      }, 500)
    }
  } catch (e) {
    formState.value = FormState.ERROR
    errorMessage.value = (e as Error).message
    isSubmitting.value = false
  }
}

// Check if form can be submitted
const canSubmit = computed(() => {
  return formState.value === FormState.VALID && !isSubmitting.value
})
</script>

<template>
  <div>
    <div
      v-if="errorMessage && !profile"
      class="text-red-500 mb-4"
    >
      {{ errorMessage }}
    </div>
    <form
      v-else
      @submit.prevent="submitUsername"
      class="space-y-4"
    >
      <div>
        <label class="block mb-2">
          <span class="text-sm font-medium">Username</span>
          <input
            v-model="username"
            placeholder="Choose your username..."
            class="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md dark:border-stone-600 dark:bg-stone-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="text"
            :disabled="isSubmitting"
            autofocus
          >
        </label>

        <!-- Validation feedback -->
        <div class="mt-2 min-h-[24px]">
          <div
            v-if="isCheckingAvailability"
            class="text-sm text-gray-500"
          >
            Checking availability...
          </div>
          <div
            v-else-if="formState === FormState.VALID"
            class="text-sm text-green-600"
          >
            ✓ {{ validationMessage }}
          </div>
          <div
            v-else-if="formState === FormState.INVALID && validationMessage"
            class="text-sm text-red-500"
          >
            {{ validationMessage }}
          </div>
          <div
            v-else-if="errorMessage"
            class="text-sm text-red-500"
          >
            {{ errorMessage }}
          </div>
        </div>

        <!-- Username requirements -->
        <div class="mt-3 text-xs text-gray-500 dark:text-gray-400">
          <p class="font-medium mb-1">Username requirements:</p>
          <ul class="list-disc list-inside space-y-1">
            <li>At least 3 characters long</li>
            <li>Must start with a letter</li>
            <li>Can contain letters, numbers, spaces, and apostrophes</li>
            <li>Must be unique</li>
          </ul>
        </div>
      </div>

      <div class="flex justify-end">
        <button
          type="submit"
          :disabled="!canSubmit"
          class="px-6 py-2 rounded-md font-medium transition-colors"
          :class="canSubmit
            ? 'bg-blue-600 text-white hover:bg-blue-700 cursor-pointer'
            : 'bg-gray-300 text-gray-500 cursor-not-allowed dark:bg-stone-700 dark:text-stone-500'"
        >
          <span v-if="isSubmitting">Setting up...</span>
          <span v-else-if="formState === FormState.SUCCESS">Success!</span>
          <span v-else>Continue</span>
        </button>
      </div>
    </form>
  </div>
</template>
