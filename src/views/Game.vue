<template>
  <div class="page-container">
    <div class="page-content">
      <h1>You are in game {{ gameId() }}</h1>
      <h2>Your connection state is {{ getConnectionState() }}</h2>
      <JSONDisplay :formattedJson="JSON.stringify(getEvents(), null, 2)"></JSONDisplay>
    </div>
    <NetworkingPanel :events="getEvents()"></NetworkingPanel>
  </div>
</template>

<style>
.page-container {
  display:flex;
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
}
</style>

<script>
import NetworkingPanel from '@/components/NetworkingPanel.vue';
import JSONDisplay from '@/components/JSONDisplay.vue';
import { mapActions, mapGetters } from 'vuex';

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
      gameId: "game/getGameId",
      getConnectionState: "game/getConnectionState",
      getEvents: "game/getEvents"
    })
  },
  components: { NetworkingPanel, JSONDisplay }
}
</script>
