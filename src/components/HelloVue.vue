<script setup>

</script>

<template>
  <div class="greetings">
    <h3>
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
