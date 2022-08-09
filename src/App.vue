<script setup>
  import HelloWorld from './components/HelloWorld.vue'
  import { ref, provide } from 'vue'
  import { useLDReady, useLDFlag } from 'launchdarkly-vue-client-sdk'
import DebugPanel from './components/DebugPanel.vue'
  let msg = "You did it... sort of";
  let ldReady = false;
  let showExperimentalLogo = ref(false);
  let height = ref(300);
  let width = ref(300);

  const imgPath = (showExperimentalLogo) => {
    if (ldReady) {
      if (showExperimentalLogo) {
        return "./toggle.png";
      }
      return "./white-osmo.png";
    }
    return "./logo.svg";
  }
  
  try {
    ldReady = useLDReady();

    showExperimentalLogo = useLDFlag('new-ui', false);
    msg = "You did it!!"
  } catch (error) {
    console.error(error);
  }

  provide('showExperimentalLogo', showExperimentalLogo);
</script>

<template>
  <header>
    <!-- notice that we bound the path for the logo  to a variable which changes depending on the state of our LaunchDarkly connection-->
    <img alt="Vue logo" class="logo" v-bind:src="imgPath(showExperimentalLogo)" v-bind:width="width" v-bind:height="height" />
  </header>

  <main>
    <div class="wrapper">
      <HelloWorld :msg=msg :isLDReady=ldReady />
    </div>
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
