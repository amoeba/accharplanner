<template>
  <div>
    <div class="main-pane">
      <div class="main-pane-header">
        <h3>Log In</h3>
      </div>
      <div class="main-pane-body">
        <form @submit.prevent="handleSubmit">
          <p>Enter your email address to receive a link which you can use to log in.</p>
          <label>Email
            <input type="text" v-model="email" />
          </label>
          <input type="submit" class="button block" :value="isSending ? 'Sending...' : 'Send Magic Link'"
            :disabled="isSending" />
          <div v-if="errors.length">
            <p v-for="error in errors" class="error">{{ error }}</p>
          </div>
          <div v-if="message">
            {{ message }}</div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { createClient } from "@supabase/supabase-js";

export default {
  name: "Login",
  data() {
    return {
      email: "",
      isSending: false,
      message: null,
      errors: []
    }
  },
  methods: {
    async handleSubmit() {
      await this.signInWithEmail(this.email.trim());
    },
    async signInWithEmail(email) {
      this.isSending = true;
      this.errors = [];

      const supabase = createClient(
        import.meta.env.VITE_SUPABASE_URL,
        import.meta.env.VITE_SUPABASE_KEY
      );

      // Wrapped in try-catch to catch non-Supabase errors
      try {
        const { data, error } = await supabase.auth.signInWithOtp({
          email: email,
          options: {
            emailRedirectTo: 'http://localhost:5173/account',
          },
        })

        // Add Supabase errors to errors object
        if (error) {
          this.errors.push(error);
        }
      } catch (e) {
        this.errors.push(e)
      } finally {
        this.isSending = false;
      }

      if (this.errors.length <= 0) {
        this.message = "Check your email for a link to log in."
      }

      this.isSending = false;
    }
  }
};
</script>
