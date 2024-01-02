// Middleware to force a logged-in user to set up their profile if they haven't
// done so yet.
//
// At the time of writing this comment, this ensures:
//
// 1. There is a row in the profiles table for the logged-in-user
// 2. The profile has a valid name set
export default defineNuxtRouteMiddleware(async (to, from) => {
  // Only run if we're not already on /account
  if (to.path === "/account") {
    return;
  }

  const client = useSupabaseClient()
  const user = useSupabaseUser()

  // Don't redirect if we're not logged in
  if (!user) {
    return;
  }

  const { data } = await getProfile(client, user)

  // Don't redirect if we run into an error
  if (!data) {
    return
  }

  // Redirect only if no profile exists or profile name exists but isn't set
  const message = useCookie('message')

  if (data.length < 1 || !data[0].name) {
    message.value = "You were redirected because you are logged in but your profile isn't completely set up. Please finish setting up your profile by choosing name below."

    return navigateTo("/account")
  } else {
    message.value = ""
  }

  return;
})
