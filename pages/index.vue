<template>
<div>
  <v-container>
    <v-card>
      <v-btn @click="logout">logout</v-btn>
    </v-card>
  </v-container>
</div>
</template>

<script>
export default {
  methods: {
    async logout() {
      await this.$auth.logout()
      await this.$router.replace('/logout')
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
