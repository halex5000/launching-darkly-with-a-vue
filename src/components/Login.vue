<script setup>
import { useLDFlag, useLDClient } from 'launchdarkly-vue-client-sdk'
import { ref } from 'vue'

// how we consume flags using the use hook in Vue
const loginEnabled = useLDFlag('login', false);
const client = useLDClient();

// make the username a reactive element so Vue can update elements using this
let username = ref('anonymous');

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
  <div class="login" v-show="loginEnabled" >
    <input v-model="form.username" placeholder="enter your username" /><button @click="login">Login</button><button @click="clearUser">Clear User</button>
    <p>{{username === 'anonymous' ? 'You are anonymous' : `You are logged in as ${username}`}} </p>
  </div>
</template>

<style scoped>

</style>