<template>
  <nav></nav>

  <body>
    <router-view />
  </body>
</template>

<style>
body{ 
  margin: 0;
  height: 100vh;
}
</style>

<script>
import { mapActions } from 'vuex';
export default {
  created() {
    this.createUser()
  },
  methods: {
    ...mapActions([
      'createUser'
    ])
  }
}
</script>