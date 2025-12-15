// Middleware to protect the onboarding page
// Only users who need to complete onboarding should access this page
// Users with complete profiles should be redirected away

export default defineNuxtRouteMiddleware(async () => {
  const client = useSupabaseClient()
  const user = useSupabaseUser()

  // If not logged in, redirect to login
  if (!user.value) {
    return navigateTo("/login")
  }

  const { data } = await getProfile(client, user)

  // If profile exists and has a name, they've completed onboarding
  // Redirect them to the stored URL or home
  if (data && data.length > 0 && data[0].name) {
    const redirectUrl = useCookie<string>('onboarding_redirect')
    const destination = redirectUrl.value || '/'

    // Clear the cookie
    redirectUrl.value = null

    return navigateTo(destination)
  }

  // Otherwise, let them access onboarding
  return
})
