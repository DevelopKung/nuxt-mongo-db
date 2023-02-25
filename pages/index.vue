<template>
<div>
  <v-container >
    <v-row>
      <v-col class="d-none d-md-block">
        <v-card class="pa-4" min-height="500"></v-card>
      </v-col>
      <v-col cols="12" sm="12" md="6">
        <BoxStory/>
        <BoxPost v-for="(box,i) in 10" :key="i" />
      </v-col>
      <v-col class="d-none d-md-block">
        <v-card class="pa-4" min-height="500"></v-card>
      </v-col>
    </v-row>
  </v-container>
  <Loader v-if="loading" :loading="loading" />
</div>
</template>

<script>
import BoxPost from "@/components/box/box-post";
import BoxStory from '../components/box/box-story.vue';
export default {
  components: {
    BoxPost,
    BoxStory,
  },
  data() {
    return {
      loading: false,
      user: this.$auth.user
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
