# Launching Darkly with a Vue



Hey folks, I am stoked to share with you that the new [LaunchDarkly Vue SDK](https://docs.launchdarkly.com/sdk/client-side/vue) is available for your [Vue 3](https://vuejs.org/) apps and we've got an example app you can sink your teeth into and start launching darkly with a Vue in no time flat!

I'm particularly excited about the Vue SDK release because I got the chance to play in Vue and while I've spent a lot of time with React and a little time with Angular, I've only ever glanced at Vue, but building this example got me elbow deep into it all fast!

## tl;dr

If you want to get right to building and get things working :fast_forward: [jump ahead](#getting-started)!



## The backstory

Admittedly, I thrashed a little early on. I was looking for easy solutions for building, bundling, deployment, and component libraries. I'm not much of a designer and I love when I can find tools that accelerate and abstract away problems so I can focus on what I really want to build. Here's the story of where I landed and why:



### :package: Of Bundles and Building

Within a few early iterations, I found that [Vite](https://vitejs.dev/) made for a super-simple builder and bundler and I've never looked back. A lot of tools claim to "just work", but honestly, Vite really delivered on that. The build is fast, the tooling makes it easy, and I didn't have to learn too much to get things working.



### :heart_eyes: Let's make it Veautiful

The same was true in seeking out a component library with a decent design system. I had to iterate a few times and challenged with a few false starts when I tried to sort out bundling and components that were well documented and easy enough to use so they wouldn't be a distraction. Many component libraries are still only supporting Vue 2 and I wanted Vue 3. Ultimately, [Vuetify's beta release of Vuetify 3](https://next.vuetifyjs.com/en/) ended up being the best fit. The docs are still incomplete as it's not yet released, but they have done a spectacular job with what's there and it was enough to make an app that I think is kind of beautiful.



### :rocket: Easy Launch Button

Finally, I wanted to give folks an option to run other than locally to make the barrier to entry lower and give folks an ultra easy way to get started, so I decided to make this a Repl on [Replit](https://replit.com/~) as well. You can pull the repo locally and run it there as well almost as easily. [Setting up a Repl in Replit](https://docs.replit.com/programming-ide/configuring-repl) made for a great mini-game within the journey to create my Vue app, one I'm looking forward to getting back to in the future! (Come catch up with me on Replit [here](https://replit.com/@halex5000))



### :sunrise: The Vue from here is great!

I won't try to espouse the benefits of Vue, but here are some of the things that jumped right out at me. The official Vue site is a wealth of information that has been so well-curated. It was easy to navigate, find what I needed, and find good examples and play in a playground to learn fast.

- [The Single-File Component](https://vuejs.org/guide/scaling-up/sfc.html)

  - This paradigm took a lot of adjustment for me, but I really enjoyed the encapsulation it encouraged. This pattern drives you to encapsulate your components and you have to intentionally cross component boundaries and it keeps you from accidentally leaking too much of the abstraction of a component

- [Reactivity](https://vuejs.org/guide/essentials/reactivity-fundamentals.html)

  - Declaring elements as reactive took a little getting used to, but after setting up a few apps and using this pattern, it started to feel like second nature
  - Assigning to the `value` attribute of a reactive variable still feels a little clunky, but I'm sure this is part of learning a new space and as I develop that muscle memory, I'm sure I'll start to see how I can leverage reactive variables in a way that feels more natural

- [Conditional Rendering](https://vuejs.org/guide/essentials/conditional.html)

  - Learning about Vue's rules about conditional rendering was incredibly powerful because learning the difference between the different directives was totally worth it. :star2: #themoreyouknow
    - `v-if`
    - `v-else`
    - `v-show`
    - `hidden`
  - Learning how to use reactive variables to control the render, visibility, and additionally adding responsiveness so I could provide a more informative experience in smaller viewports was enlightening.

- Some of the things I didn't really get into because they felt outside of the scope of getting up and running with our new Vue SDK, but I'm looking forward to playing with in the future

  - Testing - I'm a huge TDD fan, I've used Jest a lot for all kinds of testing, but I didn't get to dip my toes into testing with Vue this time.

  - State Management - this app is only the tip of the iceberg in terms of state management, but I'm really interested in playing more with state management offerings in Vue.

  - Performance - I'm passionate about accessibility and page performance, there are some amazing tools to help offer insights. I'd love to play with my bundling, tweak my loading, and get some better insights into how to make the page more accessible and performant.

    

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
    
      

# Congratulations, you're launching darkly with a Vue!

Stay tuned, there is more to come with our Vue SDK, but in the meantime, here are some things to fuel your feature flagging journey

If you're totally new to feature flagging, start here: https://docs.launchdarkly.com/home/getting-started.

Whatever you do, learn more about targeting, it is LaunchDarkly's not so hidden superpower: https://docs.launchdarkly.com/home/flags/targeting-users and for me, one of the most stunningly powerful tools in your feature management toolbox.

- Our YouTube channel: https://www.youtube.com/c/LaunchDarkly
- Our blog: https://launchdarkly.com/blog/
- Our amazing docs: https://docs.launchdarkly.com/home

