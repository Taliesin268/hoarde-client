<template>
  <main>
    <h1>Hello {{ getUser().name }}</h1>
    <RouterLink to="/cards">Go to cards</RouterLink>
    <button @click="this.createNewGame">Create New Game</button>
  </main>
</template>

<style>
main {
  display: flex;
  min-height: 100vh;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
</style>

<script>
import Card from '@/components/Card.vue'
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'Home',
  components: { Card },
  methods: {
    ...mapGetters([
      'getUser'
    ]),
    ...mapActions('game', [
      'createNewGame'
    ]),
  }
}
</script>