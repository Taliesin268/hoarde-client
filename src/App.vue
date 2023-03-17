<template>
  <nav></nav>

  <body>
    <router-view />
  </body>
</template>

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