<template>
<div>
  <v-list v-if="info">
    <v-list-item>
      <v-list-item-avatar size="50" color="#eee">
        <v-img v-if="info.profile_picture" :src="info.profile_picture"></v-img>
        <v-icon v-else color="#777">fa-user</v-icon>
      </v-list-item-avatar>

      <v-list-item-content>
        <v-list-item-title>{{ info.firstname }} {{ info.lastname }}</v-list-item-title>
        <v-list-item-subtitle class="caption">{{ app_version }}</v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>
  </v-list>
</div>
</template>

<script>
export default {
  data() {
    return {
      info: this.$auth.user,
      app_version: '1.0.1'
    }
  }
}
</script>
