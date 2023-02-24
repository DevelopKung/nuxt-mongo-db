<template>
  <v-overlay :value="loading" z-index="999">
    <v-progress-circular
      indeterminate
      size="64"
    ></v-progress-circular>
  </v-overlay>
</template>
<script>
export default {
  props : {
    loading : { type:Boolean , default:false }
  }
}
</script>