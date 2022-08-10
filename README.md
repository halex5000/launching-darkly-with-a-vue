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
      npx degit halex5000/launching-darkly-with-a-vue launching-darkly-with-a-vue
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

      

# Congratulations, you're launching darkly with a Vue!

Stay tuned, there is more to come with our Vue SDK, but in the meantime, here are some things to fuel your feature flagging journey

If you're totally new to feature flagging, start here: https://docs.launchdarkly.com/home/getting-started.

Whatever you do, learn more about targeting, it is LaunchDarkly's not so hidden superpower: https://docs.launchdarkly.com/home/flags/targeting-users and for me, one of the most stunningly powerful tools in your feature management toolbox.

- Our YouTube channel: https://www.youtube.com/c/LaunchDarkly
- Our blog: https://launchdarkly.com/blog/
- Our amazing docs: https://docs.launchdarkly.com/home
