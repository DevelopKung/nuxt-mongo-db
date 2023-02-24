<template>
<div v-if="user" class="user">
  <v-card v-if="false" class="grid px-4" elevation="0">
    <div class="grid-item img">
      <v-img aspect-ratio="1" :src="user.profile ? user.profile : 'https://www.pngall.com/wp-content/uploads/5/User-Profile-PNG-High-Quality-Image.png'"></v-img>
    </div>
    <div class="grid-item align-self-center">
      <div class="pa-4">
        <h2 class="text-center text-sm-start">My Profile</h2>
        <div class="text-form py-2" v-if="user.firstname"> ชื่อ: {{user.firstname}} </div>
        <div class="text-form py-2" v-if="user.lastname">นามสกุล: {{user.lastname}} </div>
        <div class="text-form py-2" v-if="user.mobile"> โทร. {{user.mobile}} </div>
        <div class="text-form py-2" v-if="user.email"> Email: {{user.email}} </div>
      </div>
    </div>
  </v-card>

  <v-card elevation="0" class="template-2">
    <div class="box-profile">
      <v-img class="bg-profile" :src="user.profile ? user.profile : 'https://www.teahub.io/photos/full/103-1031656_abstract-black-white-line-creative-background-wallpaper-black.jpg'"></v-img>
      <v-img class="profile" aspect-ratio="1" width="200" :src="user.profile ? user.profile : 'https://www.pngall.com/wp-content/uploads/5/User-Profile-PNG-High-Quality-Image.png'"></v-img>
    </div>
    <div class="pa-4 text-center box-name">
      <h2>{{user.firstname}} {{user.lastname}}</h2>
      <div v-if="user.mobile"> โทร. {{user.mobile}} </div>
      <div v-if="user.email"> Email: {{user.email}} </div>
    </div>
  </v-card>
</div>
</template>

<script>
export default {
  props: {
    user: {
      type: Object,
      default: null
    },
  },
};
</script>

<style lang="scss" scoped>
.user {
  box-sizing: border-box;

  .grid {
    display: grid;
    grid-template-columns: 1fr 1.5fr;
    column-gap: 10px;

    .img {
      margin: 10px 0;
      border-right: 2px solid #ccc;
    }

    .grid-item {
      max-width: 100%;
    }
  }

  .template-2 {
    .box-profile {
      position: relative;

      .bg-profile {
        height: 300px;
      }

      .profile {
        position: absolute;
        left: 50%;
        transform: translate(-50%, -50%);
      }
    }

    .box-name {
      margin-top: 6rem;
    }
  }
}

.text-form {
  border-bottom: 2px solid #ccc;
}

@media only screen and (max-width: 540px) {
  .grid {
    grid-template-columns: 1fr !important;

    .img {
      margin: 0;
      border-right: none !important;
    }
  }

  .template-2 {
    .bg-profile {
      height: 200px !important;
    }
  }
}
</style>
