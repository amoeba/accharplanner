// Middleware to force a logged-in user to set up their profile if they haven't
// done so yet.
//
// At the time of writing this comment, this ensures:
//
// 1. There is a row in the profiles table for the logged-in-user
// 2. The profile has a valid name set
export default defineNuxtRouteMiddleware(async (to) => {
  // Only run if we're not already on /onboarding or /account
  if (to.path === "/onboarding" || to.path === "/account") {
    return;
  }

  const client = useSupabaseClient()
  const user = useSupabaseUser()

  // Don't redirect if we're not logged in
  if (!user.value) {
    return;
  }

  const { data } = await getProfile(client, user)

  // Don't redirect if we run into an error
  if (!data) {
    return
  }

  // Check if profile is incomplete (no profile exists or no name is set)
  if (data.length < 1 || !data[0].name) {
    // Store the URL they were trying to access
    const redirectUrl = useCookie<string>('onboarding_redirect')
    redirectUrl.value = to.fullPath

    return navigateTo("/onboarding")
  }

  return;
})
