<template>
  <h1>You are in game {{ gameId() }}</h1>
  <h2>Your connection state is {{ getConnectionState() }}</h2>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'Game',
  mounted() {
    this.setGameId(this.$route.params.id)
    this.createUser().then(() => {
      this.connectToSocket()
    })
  },
  methods: {
    ...mapActions({
      setGameId: 'game/setGameId',
      connectToSocket: 'game/connectToSocket',
      createUser: 'createUser'
    }),
    ...mapGetters({
      gameId: 'game/getGameId',
      getConnectionState: 'game/getConnectionState'
    })
  }
}
</script>
