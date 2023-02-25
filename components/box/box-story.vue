<template>
<div class="mb-2">
  <v-card class="mx-auto" elevation="1">
    <v-slide-group v-model="model" class="pa-4" center-active :show-arrows="false">
      <v-slide-item v-for="n in 15" :key="n" v-slot="{ active, toggle }">
        <v-card :color="active ? 'primary' : 'grey lighten-1'" class="ma-4" height="200" width="150" @click="toggle">
          <v-img width="100%" height="100%" :src="profile" :lazy-src="profile"></v-img>
        </v-card>
      </v-slide-item>
    </v-slide-group>
  </v-card>
</div>
</template>

<script>
export default {
  data: () => ({
    model: null,
    profile: 'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/gettyimages-1144982182.jpg?crop=0.669xw:1.00xh;0.166xw,0&resize=1200:*'
  }),
}
</script>
