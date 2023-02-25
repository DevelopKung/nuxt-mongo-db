<template>
<div>
  <v-container >
    <BpxPost />
    <BpxPost />
    <BpxPost />
  </v-container>
  <Loader v-if="loading" :loading="loading" />
</div>
</template>

<script>
import BpxPost from "@/components/box/box-post";
export default {
  components: {
    BpxPost
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
