<script setup>
import HelloLaunchDarkly from './HelloLaunchDarkly.vue';
import HelloVue from './HelloVue.vue';
defineProps({
  msg: {
    type: String,
    required: true
  },
  isLDReady: {
    type: Boolean,
    required: true
  }
})
</script>

<template>
  <div class="greetings">
    <h1 class="green">{{ msg }}</h1>
    <h3>You’ve successfully created a project with <br/></h3>
    <HelloLaunchDarkly v-show="isLDReady" />
    <HelloVue v-show="!isLDReady" />
  </div>
</template>

<style scoped>
h1 {
  font-weight: 500;
  font-size: 2.6rem;
  top: -10px;
}

h3 {
  font-size: 1.2rem;
}

.greetings h1,
.greetings h3 {
  text-align: center;
}

@media (min-width: 1024px) {
  .greetings h1,
  .greetings h3 {
    text-align: left;
  }
}
</style>
