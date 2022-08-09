<script setup>
  import HelloWorld from './components/HelloWorld.vue'

  import { useLDReady } from 'launchdarkly-vue-client-sdk'
  let msg = "You did it... sort of";
  let imgPath = "./logo.svg";
  let ldReady = false;
  try {
    ldReady = useLDReady();
    msg = "You did it!!"
    imgPath = "./white-osmo.png";
  } catch (error) {
    console.error(error);
  }
</script>

<template>
  <header>
    <img alt="Vue logo" class="logo" v-bind:src="imgPath" width="125" height="125" />

    <div class="wrapper">
      <HelloWorld :msg=msg :isLDReady=ldReady />
    </div>
  </header>

  <main>
<!--     <TheWelcome /> -->
  </main>
</template>

<style scoped>
header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>
