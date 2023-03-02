<template>
  <div class="page-container">
    <div class="page-content">

      <h1>You are in game {{ gameId() }}</h1>
      <h2>Your connection state is {{ getConnectionState() }}</h2>
    </div>

    <NetworkingPanel :events="events"></NetworkingPanel>
  </div>
</template>

<style>
.page-container {
  display:flex;
}

.network-events {
  flex: 0 0 300px;
  height: 100%;
  overflow-y: auto;
}

.page-content {
  flex: 1;
}
</style>

<script>
import NetworkingPanel from '@/components/NetworkingPanel.vue';
import { mapActions, mapGetters } from 'vuex';

export default {
  name: "Game",
  data() {
    return {
      events: [
        { id: 1, name: 'Event 1', body: { data: 'event data' }, expanded: false },
        { id: 2, name: 'Event 2', body: { data: 'more event data' }, expanded: false },
        { id: 3, name: 'Event 3', body: { data: 'even more event data' }, expanded: false }
      ]
    }
  },
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
      getConnectionState: "game/getConnectionState"
    })
  },
  components: { NetworkingPanel }
}
</script>
