import { createApp } from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import { loadFonts } from './plugins/webfontloader'
import { LDPlugin } from 'launchdarkly-vue-client-sdk'

const app = createApp(App);

// Vite puts the environment variables in this variable and to prevent leaking of environment variables not
// meant for the client, they have to be prefixed with VITE 
// or else Vite wouldn't add them to it's environment #yoursecretissafewithvite
if (import.meta.env.VITE_CLIENT_ID) {
  
    /**
  	if we know who the user was, we could add that information here
  	but in ouur app, the user is anonymous at first, so we'll identify the user later
  	if you want to read more about user attributes, check out these docs
    @link https://launchdarkly.github.io/js-client-sdk/interfaces/_launchdarkly_js_client_sdk_.lduser.html
  */
  const user = {
    // unique identifier for the users
    // defaults to a UUID if you don't provide one and the user is anonymous
    // otherwise, it's required
    key: '',
    // boolean indicating whether the user is anonymous or not
    // defaults to true
    anonymous: true,
  }
  
  // we're telling the LaunchDarkly SDK the client ID with which it should retrieve flags
  const clientSideID = import.meta.env.VITE_CLIENT_ID;
  
  // this didn't have to be a named variable, but I wanted to be extra clear about what I was doing here
  // here are the docs about the plugin options: 
  // https://launchdarkly.github.io/vue-client-sdk/index.html#LDPluginOptions
  const launchDarklyPluginOptions = { 
    clientSideID,
    // user, // user is anonymous right now, so we won't pass anything
  };
  
  // tell Vue to use our plugin
  app.use(LDPlugin, launchDarklyPluginOptions)
}

loadFonts()

app.use(vuetify)
app.mount('#app')