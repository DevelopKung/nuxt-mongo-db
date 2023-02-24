<template>
<div>
  <Navbar title="index" />
  <User :user="user" />
  <v-container v-if="!loading">
    <v-row>
      <v-col>
        <MyPets />
      </v-col>
      <v-col>
        <MyPets />
      </v-col>
    </v-row>
  </v-container>
  <!-- <Loader v-else :loading="loading" /> -->
</div>
</template>

<script>
import User from "@/components/profile/user.vue";
import MyPets from "@/components/profile/my-pets.vue";
export default {
  components: {
    User,
    MyPets
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
