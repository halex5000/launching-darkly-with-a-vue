import { createApp } from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import { loadFonts } from './plugins/webfontloader'
import { LDPlugin } from 'launchdarkly-vue-client-sdk'

const app = createApp(App);

if (import.meta.env.VITE_CLIENT_ID) {
    const launchDarklyPluginOptions = {
        clientSideID: import.meta.env.VITE_CLIENT_ID,
    };
    app.use(LDPlugin, launchDarklyPluginOptions)
}

loadFonts()

app.use(vuetify)
app.mount('#app')