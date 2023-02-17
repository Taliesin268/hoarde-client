<template><h1>You are in game {{ gameId() }}</h1></template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'Game',
  created() {
    this.setGameId(this.$route.params.id)
    this.connectToSocket()
  },
  methods: {
    ...mapActions({
      setGameId: 'game/setGameId',
      connectToSocket: 'game/connectToSocket'
    }),
    ...mapGetters({
      gameId: 'game/getGameId'
    })
  }
}
</script>
