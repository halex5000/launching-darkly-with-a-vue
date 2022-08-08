import { createApp } from 'vue'
import App from './App.vue'
import { LDPlugin } from 'launchdarkly-vue-client-sdk'

import './assets/main.css'

const app = createApp(App);

if (import.meta.env.VITE_LD_CLIENT_ID) {
    const launchDarklyPluginOptions = {
        clientSideID: import.meta.env.VITE_LD_CLIENT_ID,
    };
    app.use(LDPlugin, launchDarklyPluginOptions)
}

app.mount('#app')
