# Launching Darkly with a Vue (app)

![](./public/osmo.png)

This [Vue](https://vuejs.org/) application is designed to get you up and running with a working Vue app in no time flat and use use several feature flags to showcase the ability to release features quickly using [LaunchDarkly](https://www.launchdarkly.com) and super power your Vue app. 



If you found this repo on your own, checkout this blog post to read more about the new LaunchDarkly Vue SDK!
(TODO: insert blog post link here)



## Getting Started



### :gear: **Setup**

If you don't already have a LaunchDarkly account, sign up for a [free trial of LaunchDarkly](https://app.launchdarkly.com/signup) to explore creating Feature Flags and targeting users with changes. It's fast, easy, and there's no obligation to continue.



### :flags: **Creating flags**

Create the following feature flags within LaunchDarkly

* `login`

  - Create this flag as a `boolean` flag 

  - This feature flag will be used to enable the login UI that can be used to leverage targeting based on a user ID. 

    <details><summary>Click here to see how</summary>


      ![](./public/create-login-flag.gif)
    </details>

* `new-ui`

  - Create this flag as a `boolean` flag

  - This feature flag changes the view of the application out of the Osmo logo, introducing a new banner, image, and text.

    <details><summary>Click here to see how</summary>


    ![](./public/create-new-ui-flag.gif)
    </details>

### :zipper_mouth_face: **Secret time**

Get your LaunchDarkly Client-Side ID from the [LaunchDarkly console](https://app.launchdarkly.com/)

- :sunglasses:  Super cool way 

  -  `CMD+K` or `CTRL+K`, typing "copy" and selecting `Copy SDK key for the current environment` and selecting **"Client-side ID"** from the list. 

  <details><summary>Click here to see how</summary>


   ![](./public/retrieve-client-id-without-save.gif)
  </details>

- :hand: Manual way 

  - You can find the Client-Side ID under `Account Settings > Projects > <Your Project Name>`
  - Click your project name
  - Click the `Client-side ID` for the key you want
    (This will add it to your clipboard for easy copy and paste.)

- **:warning: Potential gotcha**: 
  make sure you got the **"Client-side ID"** from the LaunchDarkly console and not one of the other keys! 

  

### **Step 4** :ship: with :flags:

:world_map: Choose your own adventure

1. Run locally

   <details><summary>Click here to see how</summary>


   1. Get the code

      ```shell
      # just run this command to quickly pull the source code locally
      # you have to have Node and NPM installed already, but you probably already do if you work with Vue
      npx degit halex5000/launching-darkly-with-a-vue
      ```

   2. Setup the env

      ```shell
      # go into the directory you just created by pulling the code
      cd launching-darkly-with-a-vue
      
      # this will make the terminal wait for your client ID to be pasted 
      read client_id
      
      # paste your client ID into the terminal and hit enter
      
      # this will write your client ID to your .env file, which is ignored by the .gitignore
      echo "VITE_CLIENT_ID=$client_id" > .env                                                                                  
      ```

   3. Install all the things

      ```shell
      npm install
      ```

   4. Run your app!

      ```shell
      # this will set you up for hot reloading so as you change things, the app will auto-update
      npm start
      ```

    </details>


2. Run in replit

   <details><summary>Click here to see how</summary>


   1. Go check out this Repl I made: https://replit.com/@halex5000/Launching-Darkly-with-a-Vue

   2. Fork it.

   3. Add a secret into your Repl `VITE_CLIENT_ID` and paste the Client Side ID you copied from the LaunchDarkly console

      <details><summary>Click here to see how</summary>


        ![](./public/save-client-id.gif)
    
      </details>

   4. Run your Repl!

    </details>
​      

## :champagne: Let's pop some flags :champagne:



:rocket: If you've set everything up, you should be ready to roll! :rocket:

From here, we can enable our new feature and observe how our application changes based on a new feature being rolled out. 

* `login`
  - Enable this feature (in case you don't know how yet, [click here](https://docs.launchdarkly.com/home/getting-started/toggle))
    - You should now have a prompt on the screen indicating you're anonymous and a button to Login
    - Click Login
    - Enter any name you want here and you should see the screen update to tell you who you have logged in as.
    - We'll use this feature to allow for specific user targeting
  - :smiley: you just popped your first flag and saw a nearly instantaneous change in the UI :boom: thanks to the combined power of the reactive nature of Vue and the LaunchDarkly's global super powered Flag Delivery Network (FDN)
  
* `new-ui`
  - Create a `targeting rule` for your user, for this feature flag. ([click here to read how](https://docs.launchdarkly.com/home/flags/targeting-rules))
  
  - Ensure you set the `Default Rule` to false to ensure that only users who are targeted receive feature changes.
  
  - :raised_hands: You should see a new image on the left side of the app now 
    - enter a new username and click login again or clear the existing login
    
    - if the new user isn't targeted you should no longer see the image on the left
    
      

## Congratulations, you're launching darkly with a Vue!

Now that you've got a working Vue app and you're seeing features powered by LaunchDarkly, let's unpack a little of how LaunchDarkly's Vue SDK works with Vue.



### In the beginning

First, in our app, we initialize the LaunchDarkly client using [Vue's Plugin system](https://vuejs.org/guide/reusability/plugins.html) when our app starts up. You can find this code in `src/main.js`, but here's how it works:

```javascript
import { createApp } from 'vue'
import App from './App.vue'
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
  const clientSideID = import.meta.env.VITE_CLIENT_ID,
  
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

app.mount('#app')
```



### Composing our masterpiece

Next, let's peek into the app and see how the SDK works with Vue to surface flags and tell the app when it's ready.
We're using [Vue's Composables](https://vuejs.org/guide/reusability/composables.html#what-is-a-composable) pattern to track the state of the LaunchDarkly client as well as flag values.

> In the context of Vue applications, a "composable" is a function that leverages Vue's Composition API to encapsulate and reuse **stateful logic**.

source: https://vuejs.org/guide/reusability/composables.html#what-is-a-composable

The SDK handles communicating with LaunchDarkly APIs, retries, error handling, and encapsulates the state management and caching for you, all you have to do is use the `use` functions to hook into this. 

Check this out these samples from `src/App.vue` to see how we use our composables from the SDK to make integrating the flags into our code so simple:

#### You're so... reactive

```vue
<!-- abrdiged version of src/App.vue setup script for illustration purposes -->
<script setup>
  import { ref } from 'vue';
  // these MUST be used in a `setup` script, otherwise they won't work
  // I learned this the hard way for you, you're welcome
  import { useLDReady, useLDFlag } from 'launchdarkly-vue-client-sdk';
  // by default, nothing is ready or enabled
  // ref() lets us define a variable as reactive so Vue can respond to changes in the value
  let ldReady = ref(false);
  let loginEnabled = ref(false);
  let newLogoEnabled = ref(false);
  
  try {
    // useLDReady returns a reactive boolean variable
    // indicating whether the client is ready to use
    // it does throw an error if the client ID, so I wrapped in a try/catch here
    ldReady = useLDReady();
    
    // useLDFlag accepts the name of the flag to evaluate
    // and a default value
    // so at first evaluation you can have a value regardless of the latency in your connection
    // here, we've defaulted to false
    // in a strongly typed environment, useLDFlag will infer the type from the default value
    loginEnabled = useLDFlag('login', false);
    newLogoEnabled = useLDFlag('new-ui', false);
  } catch (error) {
    console.error(error);
  }
</script>
```



#### When it's time to change

```vue
<!-- abridged version of src/App.vue template for illustration purposes -->
<template>
  <v-app>  
    <v-app-bar app>
      <div class="d-flex justify-center align-center w-100">
        <h1>Launching Darkly with a Vue</h1>
      </div>
    </v-app-bar>

    <v-main app class="w-100">
      <v-container fluid>
        <!-- v-if determines if a component will render or not and here, we're evaluating the flag, loginEnabled -->
        <Login v-if="loginEnabled" />
        
      	<v-timeline>
          <!--
						In our app, the timeline shows your progress through the setup
						and in this case, we've kept it super simple and only used boolean flags
						but, feature flags in LaunchDarkly can be SO much more than just boolean values
						imagine not having to change your code when you change the messaging, styling, or icons!
					-->
          <TimeLineItem 
            title="LaunchDarkly"
            :subtitle="ldReady ? 'super-powering your features!' : `isn't working yet`"
            image="./white-osmo.png"
            dot-color="#FF386B"
            :icon="ldReady ? '' : mdi-emoticon-sad"
            :error="!ldReady ? `LaunchDarkly initialization failed, check your environment` : ''"
            :timelineIcon="ldReady ? 'mdi-checkbox-marked-circle' : 'mdi-alert-octagram'"
          />
          <!--
						In the above, note the use of `:` for binding to attributes where we're using an expression
						in these expressions we're using the truthiness of ldReady to indicate, on the timeline,
						if things are working as expected or not
					-->
  			</v-timeline>
  	</v-container>
  </v-main>
</template>
```



#### New app, who this?

```vue
<!-- abridged version of src/components/Login.vue for illustration purposes -->

<!-- remember to use the SDK composabled within a setup block! -->
<script setup>
  import { useLDFlag, useLDClient } from 'launchdarkly-vue-client-sdk'
  import { ref } from 'vue'

  // how we consume flags using the use composable in Vue
  const loginEnabled = useLDFlag('login', false);
  
  // this is how we'll interact with the LaunchDarkly client directly
  // also needs to be in the setup block
  // we'll use this to identify the user once they login
  const client = useLDClient();

  // make the username a reactive element so Vue can update elements using this
  let username = ref('anonymous');

  let showLoginDialog = ref(false);

  // capture the state in an object so we don't update the actual username until
  // the user clicks login
  const form = {};

  // set the username when the user clicks login
  const login = async () => {
      if (form.username) {
          username.value = form.username;
          form.username = '';
        
        	// asks the LaunchDarkly client for the current user info
          const user = client.getUser();
        
          console.log('current user is', client.getUser());

        	// here's where update the user's identity in the LaunchDarkly client
					await client.identify({
            	// keep anything else we already attributed to the user
              ...user, 
            	// update the key, the unique identifier for this user
            	// to be their username
            	// we use .value to access the value because as a reactive object
            	// we interact with Vue's proxy for the object
            	// learn more here: https://vuejs.org/guide/essentials/reactivity-fundamentals.html
              key: username.value,
          });

          console.log('current user is', client.getUser());

          showLoginDialog.value = false;
      }
  }
	
	// clear the user when they click Clear User
  // return them to being anonymous
  const clearUser = async () => {
    	// just like we used identify above to identify the user
    	// so we can use it again to make them anonymous
    	// this time, we don't indicate a user key because the client will use a UUID instead
      await client.identify({
          anonymous: true,
      });
      username.value = 'anonymous';
  }
</script>

<template>
	<!-- the card containing the login components -->
  <v-card
    v-show="loginEnabled"
  >
		<!-- 
			instead of using v-if, we're using v-show, so the element is rendered
			but not visible, Vue just changes the display property, but the element is in the DOM
		-->
  </v-card>
</template>
```



## :dash: And Just Like That

You've seen how easy it is to build LaunchDarkly's Vue SDK into your Vue app. 

You got use feature flags to supercharge your delivery by decoupling your release of features from deployment of your app.

You got to see first-hand how you can choose who sees what features either turning them on for an entire userbase or releasing to a single user at a time.

Finally, you got to see the :zap: lightning fast :zap: response time from LaunchDarkly's Flag Delivery Network where the changes to your flags are propagated around the world in milliseconds.



## More to come

Stay tuned, there is more to come with our Vue SDK, but in the meantime, here are some things to fuel your feature flagging journey

If you're totally new to feature flagging, start here: https://docs.launchdarkly.com/home/getting-started.

Whatever you do, learn more about targeting, it is LaunchDarkly's not so hidden superpower: https://docs.launchdarkly.com/home/flags/targeting-users and for me, one of the most stunningly powerful tools in your feature management toolbox.

- Our YouTube channel: https://www.youtube.com/c/LaunchDarkly
- Our blog: https://launchdarkly.com/blog/
- Our amazing docs: https://docs.launchdarkly.com/home

