<script setup>
import { useLDFlag, useLDClient } from "launchdarkly-vue-client-sdk";
import { ref } from "vue";

// how we consume flags using the use composable in Vue
const loginEnabled = useLDFlag("login", false);

// this is how we'll interact with the LaunchDarkly client directly
// also needs to be in the setup block
// we'll use this to identify the user once they login
const client = useLDClient();

// make the username a reactive element so Vue can update elements using this
let username = ref("anonymous");

let showLoginDialog = ref(false);

// capture the state in an object so we don't update the actual username until
// the user clicks login
const form = {};

// set the username when the user clicks login
const login = async () => {
  if (form.username) {
    username.value = form.username;
    form.username = "";

    // asks the LaunchDarkly client for the current user info
    const user = client.getUser();

    console.log("current user is", client.getUser());

    // here's where update the user's identity in the LaunchDarkly client
    await client.identify({
      // keep anything else we already attributed to the user
      ...user,
      // update the key, the unique identifier for this user
      // to be their username
      // we use .value to access the value because as a reactive object
      // we interact with Vue's proxy for the object
      // learn more here: https://vuejs.org/guide/essentials/reactivity-fundamentals.html
      key: username.value,
    });

    console.log("current user is", client.getUser());

    showLoginDialog.value = false;
  }
};

// clear the user when they click Clear User
// return them to being anonymous
const clearUser = async () => {
  // just like we used identify above to identify the user
  // so we can use it again to make them anonymous
  // this time, we don't indicate a user key because the client will use a UUID instead
  await client.identify({
    anonymous: true,
  });
  username.value = "anonymous";
};
</script>

<template>
  <v-card
    class="overflow-auto mx-auto d-sm-none d-md-flex d-lg-flex d-xl-flex"
    v-show="loginEnabled"
  >
    <v-banner
      sticky="sticky"
      icon="mdi-duck"
      color="#3DD6F5"
      density="compact"
      elevation="24"
      rounded="true"
    >
      <template v-slot:text>
        <p>
          {{
            username === "anonymous"
              ? "You are anonymous, login to see new features!"
              : `You are logged in as ${username}`
          }}
        </p>
      </template>

      <template v-slot:actions>
        <v-btn @click="showLoginDialog = true" v-if="username === 'anonymous'">
          Login
        </v-btn>

        <v-btn @click="clearUser()" v-if="username !== 'anonymous'">
          Clear User
        </v-btn>
      </template>

      <v-dialog transition="dialog-top-transition" v-model="showLoginDialog">
        <template v-slot:default="{ isActive }">
          <v-card
            height="250"
            width="400"
            color="#282828"
            class="align-center justify-center"
          >
            <v-card-title> Login </v-card-title>
            <v-spacer></v-spacer>
            <v-container>
              <v-row>
                <v-col>
                  <v-card-text>
                    <v-text-field
                      label="Username"
                      required
                      v-model="form.username"
                    ></v-text-field>
                  </v-card-text>
                </v-col>
              </v-row>
            </v-container>
            <v-spacer></v-spacer>
            <v-card-actions>
              <v-btn primary @click="login()">Login</v-btn>
              <v-btn @click="showLoginDialog = false">Cancel</v-btn>
            </v-card-actions>
          </v-card>
        </template>
      </v-dialog>
    </v-banner>
  </v-card>
</template>
