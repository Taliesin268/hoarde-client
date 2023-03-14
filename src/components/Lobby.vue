<template>
    <div>
        <h1>{{ getUser().name }} VS {{ typeof getGame().player != 'undefined' ? getGame().player.name : '...' }}</h1>
        <h2>Connected Users:</h2>
        <ul>
            <li  v-for="(user, userId) in getGame().state.players.guests">
                <input @click="challengePlayer({ id: userId, name: user.name })" type="radio" :id="userId" :value="userId">
                <label :for="userId">{{ user.name }}</label>
            </li>
        </ul>
        <button>Challenge Selected Player</button>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
    name: "lobby",
    methods: {
        ...mapGetters({
            getGame: "game/getGame",
            getUser: "getUser"
        }),
        ...mapActions({
            challengePlayer: "game/challengePlayer"
        })
    },
};
</script>