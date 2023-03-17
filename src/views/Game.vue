<template>
  <div class="page-container">
    <div class="page-content">
      <lobby v-if="!loading() && game().state.state == 'LobbyState'"></lobby>
      <game-board v-if="game().state.game != undefined"></game-board>
    </div>
  </div>
</template>

<style>
.page-container {
  display: flex;
  height: 100%;
  flex-direction: column;
}

.network-events {
  height: 100%;
  max-width: 50%;
  overflow-y: auto;
  flex: 1;
}

.page-content {
  flex: 3;
  overflow: auto;
  height: 100%;
}
</style>

<script>
import { mapActions, mapGetters } from 'vuex';
import Lobby from '../components/Lobby'
import GameBoard from '../components/GameBoard'

export default {
  name: "Game",
  mounted() {
    this.setGameId(this.$route.params.id);
    this.createUser().then(() => {
      this.connectToSocket();
    });
  },
  methods: {
    ...mapActions({
      setGameId: "game/setGameId",
      connectToSocket: "game/connectToSocket",
      createUser: "createUser"
    }),
    ...mapGetters({
      game: "game/getGame",
      loading: "game/getLoading",
      getUser: "getUser"
    }),
  },
  components: { Lobby, GameBoard }
}
</script>
