<template>
<div>
  <v-container>
    <BoxPost />
  </v-container>
</div>
</template>

<script>
import BoxPost from "@/components/pets/card";
export default {
  components: {
    BoxPost,
  },
  data() {
    return {
      id: this.$route.params.id
    }
  },
}
</script>

<style lang="scss" scoped>

</style>
