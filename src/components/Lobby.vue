<template>
    <div>
        <h1>{{ getUser().name }} VS {{ selectedPlayerId ?? '...' }}</h1>
        <h2>Connected Users:</h2>
        <ul>
            <li v-for="(user, userId) in getGame().state.players.guests">
                <input type="radio" :id="userId" :value="userId" v-model="selectedPlayerId">
                <label :for="userId">{{ user.name }}</label>
            </li>
        </ul>
        <button @click="challengePlayer">Challenge Selected Player</button>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
    name: "lobby",
    data() {
        return {
            players: [
                { id: 1, name: 'Alice' },
                { id: 2, name: 'Bob' },
                { id: 3, name: 'Charlie' },
            ],
            selectedPlayerId: null,
        };
    },
    methods: {
        challengePlayer() {
            if (this.selectedPlayerId) {
                // TODO: implement challenge logic here
                console.log(`Challenging player with ID ${this.selectedPlayerId}`);
            } else {
                console.log('No player selected');
            }
        },
        ...mapGetters({
            getGame: "game/getGame",
            getUser: "getUser"
        })
    },
};
</script>