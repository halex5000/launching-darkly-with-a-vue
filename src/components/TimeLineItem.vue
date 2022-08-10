<script setup>
  import { ref } from 'vue'
  defineProps({
    title: String,
    subtitle: String,
    image: String,
    dotColor: String,
    timelineIcon: String,
    icon: String,
    error: String,
  })
  let overlay = ref(false);
</script>

<template>
  <v-timeline-item :dot-color="dotColor" filldot :icon="timelineIcon" size="x-large">
    <template v-slot:opposite>
      <v-chip
        v-if="error"
        class="ma-2"
        color="red"
        text-color="white"
      >
        {{error}}
      </v-chip>
    </template>
    <v-card max-width="425" min-width="400" elevated rounded="true" max-height="150">
      <v-container>
        <v-row dense>
          <v-col>
            <v-card-text class="white text--primary" align="center">
              <v-avatar size="100">
                <v-img v-if="image" :src="image"></v-img>
                <v-icon v-else="icon" size="100" :color="dotColor">{{icon}}</v-icon>
              </v-avatar>
            </v-card-text>
          </v-col>
          <v-col cols="6">
            <v-card-title class="white text--primary text-h5" align="center" >
              <h4>{{title}}</h4>
            </v-card-title>
            <v-card-text align="center" class="white text--primary">
              <p>{{subtitle}}</p>
              <v-icon v-if="icon">{{icon}}</v-icon>
            </v-card-text>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
  </v-timeline-item>
</template>
