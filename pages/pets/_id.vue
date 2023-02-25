<template>
<div>
  <v-container>
   <v-row>
    <v-col cols="12" sm="12" md="6">
      <BoxPost />
    </v-col>
    <v-col cols="12" sm="12" md="6">

    </v-col>
   </v-row>
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
