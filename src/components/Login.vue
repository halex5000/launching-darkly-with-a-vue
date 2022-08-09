<script setup>
import { useLDFlag } from 'launchdarkly-vue-client-sdk'
import { ref } from 'vue'
const loginEnabled = useLDFlag('login', true);
let username = ref(null);
const form = {};
const login = () => {
    console.log('form.username', form.username);
    if (form.username) {
        username.value = form.username;
    }
}
</script>

<template>
  <div class="login" v-if="loginEnabled">
    <input v-model="form.username" placeholder="enter your username" /><button @click="login">Login</button>
    <p v-if="username">You are logged in as {{username}}</p>
  </div>
</template>

<style scoped>

</style>