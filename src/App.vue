<script setup>
  import { ref } from 'vue'
  import { useLDReady, useLDFlag } from 'launchdarkly-vue-client-sdk'
  import TimeLineItem from './components/TimeLineItem.vue';
  let msg = "You did it... sort of";
  let ldReady = false;
  let showExperimentalLogo = ref(false);
  
  try {
    ldReady = useLDReady();

    showExperimentalLogo = useLDFlag('new-ui', false);
    msg = "You did it!!"
  } catch (error) {
    console.error(error);
  }
</script>

<template>

<v-app>
  <v-navigation-drawer color="grey-darken-2"></v-navigation-drawer>
  <v-navigation-drawer color="grey-darken-2" location="right"></v-navigation-drawer>
  
  <v-app-bar app>
    <div class="d-flex justify-center align-center w-100">
      <h1>Launching Darkly with a Vue</h1>
    </div>
  </v-app-bar>

  <v-main app>
    <v-container fluid>
      <v-timeline>
          <TimeLineItem 
            title="Vite"
            subtitle="Successfully built your app!"
            image="https://vitejs.dev/logo.svg"
            dot-color="#405BFF"
          />
          <TimeLineItem 
            title="Vue 3"
            subtitle="Is running your app!"
            image="./logo.svg"
            dot-color="#EBFF38"
          />
          <TimeLineItem 
            title="LaunchDarkly"
            subtitle="Is super-powering your features!"
            image="./white-osmo.png"
            dot-color="#FF386B"
          />
      </v-timeline>
    </v-container>

  </v-main>

  <v-footer app>
    <div class="d-flex justify-center align-center w-100">
      Launching Darkly with a Vue Footer
    </div>
  </v-footer>
</v-app>
</template>
