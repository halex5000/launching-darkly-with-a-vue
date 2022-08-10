<script setup>
import { useLDFlag, useLDClient } from 'launchdarkly-vue-client-sdk'
import { ref } from 'vue'

// how we consume flags using the use hook in Vue
const loginEnabled = useLDFlag('login', false);
const client = useLDClient();

// make the username a reactive element so Vue can update elements using this
let username = ref('anonymous');

let showLoginDialog = ref(false);

// capture the state in an object so we don't update the actual username until
// the user clicks login
const form = {};

// set the username when the user clicks login
const login = async () => {
    if (form.username) {
        username.value = form.username;
        form.username = '';
        const user = client.getUser();

        console.log('current user is', client.getUser());
        
        const something = await client.identify({
            ...user,
            key: username.value,
        });

        console.log('current user is', client.getUser());

        console.log('return from identify', something)

        client.track('userLogin', {customProperty: username})
        showLoginDialog.value = false;
    }
}

const clearUser = async () => {
    client.track('userLogin', {customProperty: username})
    await client.identify({
        anonymous: true,
    });
    username.value = 'anonymous';
}
</script>

<template>
  <v-card
    class="overflow-auto mx-auto"
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
            <p>{{username === 'anonymous' ? 'You are anonymous, login to see new features!' : `You are logged in as ${username}`}} </p>
        </template>

        <template v-slot:actions>
            <v-btn @click="showLoginDialog=true" v-if="username === 'anonymous'">
                Login
            </v-btn>

            <v-btn @click="clearUser()" v-if="username !== 'anonymous'">
                Clear User
            </v-btn>
        </template>

        <v-dialog transition="dialog-top-transition" v-model="showLoginDialog">
            <template v-slot:default="{ isActive }">
                <v-card height="250" width="400" color="#282828" class="align-center justify-center">
                    <v-card-title>
                        Login
                    </v-card-title>
                    <v-spacer></v-spacer>
                    <v-container>
                        <v-row>
                            <v-col>
                                <v-card-text>
                                    <v-text-field label="Username" required v-model="form.username"></v-text-field>
                                </v-card-text>
                            </v-col>
                        </v-row>
                    </v-container>
                    <v-spacer></v-spacer>
                    <v-card-actions>
                        <v-btn primary @click="login()">Login</v-btn>
                        <v-btn @click="showLoginDialog=false">Cancel</v-btn>
                    </v-card-actions>
                </v-card>
            </template>
        </v-dialog>
    </v-banner>
  </v-card>
</template>