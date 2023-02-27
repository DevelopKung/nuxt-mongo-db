<template>
<div class="mb-2">
  <v-card class="mx-auto" elevation="1">
    <v-slide-group v-model="model" class="pa-4" center-active :show-arrows="false">
      <v-slide-item v-for="n in 15" :key="n" v-slot="{ active, toggle }">
        <v-card :color="active ? 'primary' : 'grey lighten-1'" class="ma-4 card" height="200" width="150" @click="toggle">
          <v-img width="100%" height="100%" :src="image" :lazy-src="image"></v-img>
          <v-avatar class="avatar">
            <v-img :src="profile" :lazy-src="profile"></v-img>
          </v-avatar>
          <span class="name mx-2 text-truncate"> <h3>{{ info.name_pet || 'cat name' }}</h3> </span>
        </v-card>
      </v-slide-item>
    </v-slide-group>
  </v-card>
</div>
</template>

<script>
export default {
  props: {
    info: {
      type: Object,
      default: {}
    }
  },
  data: () => ({
    model: null,
    profile: 'https://images.livemint.com/img/2022/08/01/1600x900/Cat-andriyko-podilnyk-RCfi7vgJjUY-unsplash_1659328989095_1659328998370_1659328998370.jpg',
    image: 'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/gettyimages-1144982182.jpg?crop=0.669xw:1.00xh;0.166xw,0&resize=1200:*'
  }),
}
</script>

<style lang="scss" scoped>
.card {
  position: relative;

  .avatar {
    position: absolute;
    left: 0;
    right: 0;
    margin: auto;
    bottom: 24px;
  }

  .name {
    position: absolute;
    left: 0;
    right: 0;
    text-align: center;
    bottom: 0;
    color: #fff;
    max-width: 90%;
  }
}
</style>
