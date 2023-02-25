<template>
<div>
  <v-container >
    <BoxStory/>
    <BoxPost />
    <BoxPost />
    <BoxPost />
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
