<script setup>
defineProps({
  msg: {
    type: String,
    required: true
  },
  isLDReady: {
    type: Boolean,
    required: true
  }
})
</script>

<template>
  <div class="greetings">
    <h1 class="green">{{ msg }}</h1>
    <h3>You’ve successfully created a project with <br/></h3>
    <h3 v-if="isLDReady">
      <a target="_blank" href="https://launchdarkly.com">LaunchDarkly</a> +
      <a target="_blank" href="https://vitejs.dev/">Vite</a> +
      <a target="_blank" href="https://vuejs.org/">Vue 3</a>.
    </h3>
    <h3 v-else>
      <a target="_blank" href="https://vitejs.dev/">Vite</a> +
      <a target="_blank" href="https://vuejs.org/">Vue 3</a>. <br/>
      but LaunchDarkly isn't setup yet. <br/>
      Make sure your <code>.env</code> file is setup like this:
      <code>VITE_CLIENT_ID=62df36fed75e061473cc548e</code>
    </h3>
  </div>
</template>

<style scoped>
h1 {
  font-weight: 500;
  font-size: 2.6rem;
  top: -10px;
}

h3 {
  font-size: 1.2rem;
}

.greetings h1,
.greetings h3 {
  text-align: center;
}

@media (min-width: 1024px) {
  .greetings h1,
  .greetings h3 {
    text-align: left;
  }
}
</style>
