<template>
<div>
  <Navbar :title="profile.firstname" />
  <v-container>
    <v-card :elevation="0">
      {{ profile.username }}
    </v-card>
  </v-container>
</div>
</template>

<script>
export default {
  data() {
    return {
      profile: this.$auth.user
    }
  },
  computed: {
    checkUser(){
      if (this.profile.firstname == this.$route.params.id) return true
      return false
    }
  },
  methods: {

  },
}
</script>

<style lang="scss" scoped>

</style>
