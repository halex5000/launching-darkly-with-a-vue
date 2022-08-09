<script setup>
  defineProps({
    title: String,
    subtitle: String,
    image: String,
    link: String,
    items: Array,
    dotColor: String,
  })
</script>

<template>
  <v-timeline-item :dot-color="dotColor" filldot >
    <v-card max-width="400" min-width="400">
      <v-card-title color="#EBFF38" class="white text--primary text-h5" align="center" back >
        <h4>{{title}}</h4>
      </v-card-title>
      <v-card-subtitle align="center" class="white text--primary">{{subtitle}}</v-card-subtitle>
      <v-card-text class="white text--primary" align="center">
        <v-avatar  :image="image" size="125" />
      </v-card-text>
    </v-card>
  </v-timeline-item>
</template>
