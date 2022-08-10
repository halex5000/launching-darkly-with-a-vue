<script setup>
  defineProps({
    title: String,
    subtitle: String,
    image: String,
    link: String,
    items: Array,
    dotColor: String,
    icon: String,
  })
</script>

<template>
  <v-timeline-item :dot-color="dotColor" filldot :icon="icon" size="x-large" >
    <v-card max-width="400" min-width="400" tonal>
      <v-container>
        <v-row dense>
          <v-col>
            <v-card-text class="white text--primary" align="center">
              <v-avatar  :image="image" size="125" />
            </v-card-text>
          </v-col>
          <v-col cols="6">
            <v-card-title class="white text--primary text-h5" align="center" >
              <h4>{{title}}</h4>
            </v-card-title>
            <v-card-text align="center" class="white text--primary"><p>{{subtitle}}</p></v-card-text>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
  </v-timeline-item>
</template>
