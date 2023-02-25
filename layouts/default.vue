<template>
<div>
  <v-app>
    <Navbar :title="'My Pets'">
      <Nuxt />
    </Navbar>
  </v-app>
</div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
v-app,
.v-application {
  min-height: 100%;
  width: 100% !important;
}
</style>
