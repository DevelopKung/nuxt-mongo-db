<template>
<div>
  <v-card class="mx-auto overflow-hidden nav" min-height="100vh">
    <v-app-bar color="primary" dense dark elevation="0" fixed>
      <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>

      <v-toolbar-title class="cursor" v-if="title" @click="$router.push('/')">{{ title }}</v-toolbar-title>
      <v-spacer></v-spacer>

      <!-- <v-btn icon>
        <v-icon>mdi-heart</v-icon>
      </v-btn>

      <v-btn icon>
        <v-icon>mdi-magnify</v-icon>
      </v-btn> -->

      <v-btn icon @click="logout">
        <v-icon>fas fa-sign-out-alt</v-icon>
      </v-btn>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" absolute temporary>
      <v-row justify="center" class="ma-auto">
        <v-avatar size="200" class="my-5">
          <img src="https://cdn.vuetifyjs.com/images/john.jpg" alt="John">
        </v-avatar>
      </v-row>

      <div class="text-center"> <h2>{{ $auth.user.firstname }}</h2> </div>

      <v-card-subtitle class="pb-0 caption">My Pets</v-card-subtitle>
      <v-divider></v-divider>

      <v-list nav dense>
        <v-list-item-group v-model="group" active-class="primary--text text--accent-4">

          <v-list-item @click="$router.push('/pets/1')">
            <v-list-item-icon>
              <v-icon>mdi-paw</v-icon>
            </v-list-item-icon>
            <v-list-item-title>My Pets</v-list-item-title>
          </v-list-item>

        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>

    <div>
      <slot></slot>
    </div>
  </v-card>
</div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      drawer: false,
      group: null
    }
  },
  methods: {
    async logout() {
      await this.$auth.logout()
      await this.$router.replace('/logout')
    }
  }
}
</script>

<style scoped>
.nav { background: #0000000d; }

.cursor { cursor: pointer; }
</style>
