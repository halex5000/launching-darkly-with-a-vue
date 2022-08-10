<script setup>
  import { ref } from 'vue'
  import { useLDReady, useLDFlag } from 'launchdarkly-vue-client-sdk'
  import TimeLineItem from './components/TimeLineItem.vue';
  import Login from './components/Login.vue';
  let ldReady = ref(false);
  let loginEnabled;
  let newLogoEnabled;
  
  try {
    ldReady = useLDReady();
    loginEnabled = useLDFlag('login', false);
    newLogoEnabled = useLDFlag('new-ui', false);
  } catch (error) {
    console.error(error);
  }
  

</script>

<template>

<v-app>
  <v-navigation-drawer v-if="newLogoEnabled" color="grey-darken-2" width="550" image="./toggle.png">
  </v-navigation-drawer>
  <v-navigation-drawer  v-if="!newLogoEnabled" color="grey-darken-2" permanent>
  </v-navigation-drawer>
  <v-navigation-drawer  v-if="!newLogoEnabled" color="grey-darken-2" location="right" permanent>
  </v-navigation-drawer>
  
  <v-app-bar app>
    <div class="d-flex justify-center align-center w-100">
      <h1>Launching Darkly with a Vue</h1>
    </div>
  </v-app-bar>

  <v-main app>
    <v-container fluid>
      <Login :v-if="ldReady" />
      <v-progress-linear
        class="d-flex justify-center align-center w-100"
        v-if="newLogoEnabled"
        model-value="100"
        height="50"
        color="#405BFF"
      >
        Now go explore without fear.
      </v-progress-linear>
      <v-timeline>
          <TimeLineItem 
            v-if="newLogoEnabled"
            title="Congratulations!!!"
            :subtitle="newLogoEnabled ? `you're launching darkly with a Vue!` : `you're not seeing the new UI`"
            dot-color="#FF386B"
            icon="mdi-trophy"
            :timelineIcon="newLogoEnabled ? 'mdi-checkbox-marked-circle' : 'mdi-close-circle-outline'"
          />
          <TimeLineItem 
            title="New UI"
            :subtitle="newLogoEnabled ? `you're seeing the new UI` : `you are NOT seeing the new UI`"
            dot-color="#A34FDE"
            :icon="newLogoEnabled ? 'mdi-heart' : 'mdi-heart-off'"
            :error="!newLogoEnabled ? 'waiting for new-ui to be enabled' : ''"
            :timelineIcon="newLogoEnabled ? 'mdi-checkbox-marked-circle' : 'mdi-close-circle-outline'"
          />
          <TimeLineItem 
            title="Login"
            :subtitle="loginEnabled ? `you've enabled the login feature` : `login is not enabled`"
            dot-color="#405BFF"
            icon="mdi-account-arrow-left"
            :error="!loginEnabled ? 'waiting for login to be enabled' : ''"
            :timelineIcon="loginEnabled ? 'mdi-checkbox-marked-circle' : 'mdi-close-circle-outline'"
          />
          <TimeLineItem 
            title="LaunchDarkly"
            :subtitle="ldReady ? 'super-powering your features!' : `isn't working yet`"
            image="./white-osmo.png"
            dot-color="#FF386B"
            :icon="ldReady ? '' : mdi-emoticon-sad"
            :error="!ldReady ? `LaunchDarkly initialization failed` : ''"
            :timelineIcon="ldReady ? 'mdi-checkbox-marked-circle' : 'mdi-alert-octagram'"
          />
          <TimeLineItem 
            title="Vue 3"
            subtitle="running your app!"
            image="./logo.svg"
            dot-color="#A34FDE"
            timelineIcon="mdi-checkbox-marked-circle"
          />
          <TimeLineItem 
            title="Vite"
            subtitle="built your app!"
            image="https://vitejs.dev/logo.svg"
            dot-color="#405BFF"
            timelineIcon="mdi-checkbox-marked-circle"
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
