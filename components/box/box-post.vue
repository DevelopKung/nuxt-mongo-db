<template>
<div>
  <v-card class="pa-8 mb-2" elevation="1">
    <v-row align="end">
      <v-col cols="auto">
        <v-avatar>
          <v-img :src="image"></v-img>
        </v-avatar>
      </v-col>
      <v-col>
        <div>Username</div>
        <small>My pets</small>
      </v-col>
    </v-row>
    <div class="my-2">
      <span> test data  </span>
    </div>

    <v-card elevation="0">
      <v-img max-height="400" :src="image"></v-img>
    </v-card>
 
    <v-row class="my-2 px-2">
      <v-btn icon>
        <v-icon>mdi-heart</v-icon> {{ 2 }}
      </v-btn>
      <v-btn class="mx-3" icon>
        <v-icon>mdi-thumb-up-outline</v-icon> {{ 2 }}
      </v-btn>
      <v-spacer></v-spacer>
      <v-btn icon>
        {{ 2 }} <v-icon>mdi-comment-text-outline</v-icon>
      </v-btn>
    </v-row>

  </v-card>
</div>
</template>

<script>
export default {
  data() {
    return {
      image: 'https://images.livemint.com/img/2022/08/01/1600x900/Cat-andriyko-podilnyk-RCfi7vgJjUY-unsplash_1659328989095_1659328998370_1659328998370.jpg'
    }
  },
}
</script>

<style lang="scss" scoped>

</style>
