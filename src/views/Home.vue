<template>
  <main>
    <button @click="createUser()">Create User</button>
    <RouterLink to="/cards">Go to cards</RouterLink>
  </main>
</template>

<style>
.card {
  margin: 10mm;
}

main {
  display: flex;
  min-height: 100vh;
  justify-content: center;
  align-items: center;
}
</style>

<script>
import Card from '@/components/Card.vue'
import { mapActions } from 'vuex';

export default {
  name: 'Home',
  components: { Card },
  methods: {
    ...mapActions([
      'createUser'
    ])
  }
}
</script>