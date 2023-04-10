<template>
  <div>
    <div class="main-pane">
      <div class="main-pane-header">
        <h3>Account</h3>
      </div>
      <div class="main-pane-body">
        <div v-if="!isLoggedIn">
          You are not logged in.
        </div>
        <div v-if="isLoggedIn && isAdmin">
          You are logged in as an admin.
        </div>
        <div v-if="isLoggedIn && !isAdmin">
          You are logged in.
        </div>
        <button v-if="isLoggedIn" @click="signOut">Log Out</button>
      </div>
    </div>
  </div>
</template>

<script>
import { createClient } from "@supabase/supabase-js";

export default {
  name: "Account",
  computed: {
    isLoggedIn() {
      return this.$store.getters.isLoggedIn;
    },
    isAdmin() {
      return this.$store.getters.isAdmin;
    }
  },
  methods: {
    async signOut() {
      const supabase = createClient(
        import.meta.env.VITE_SUPABASE_URL,
        import.meta.env.VITE_SUPABASE_KEY
      );

      try {
        let { error } = await supabase.auth.signOut()

        if (error)  {
          this.$store.commit("addNotification", {
            type: "error",
            message: "Error encountered while logging you out: " + JSON.stringify(error),
          });
        }
      } catch (error) {
        this.$store.commit("addNotification", {
            type: "error",
            message: "Error encountered while logging you out: " + JSON.stringify(error),
          });
      } finally {
        this.$store.commit("addNotification", {
          type: "success",
          message: "You are now logged out"
        });

        this.$store.commit("updateIsLoggedIn", false);
        this.$store.commit("updateIsAdmin", false);

        this.$router.push("/");
      }
    }
  }
};
</script>
