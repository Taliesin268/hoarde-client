<template>
    <div class="lobby-wrapper">
        <h1>Hi {{ getUser().name }}</h1>
        <h2>{{ `${getGame().creator.name} ${isCreator() ? '(You)' : ''}` }} VS {{ typeof getGame().player != 'undefined' ?
            getGame().player.name : '...' }}</h2>
        <h3>Connected Users:</h3>
        <ul>
            <li v-for="(user, userId) in getGame().state.players.guests">
                <input :disabled="!isCreator()" @click="challengePlayer({ id: userId, name: user.name })" type="radio"
                    :id="userId" :value="userId">
                <label :for="userId">{{ user.name }}</label>
            </li>
        </ul>
        <button @click="startGame()" :disabled="typeof getGame().player == 'undefined' || !isCreator()">Challenge Selected
            Player</button>
    </div>
</template>

<style>
.lobby-wrapper {
    margin-left: 20px;
}
</style>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
    name: "lobby",
    methods: {
        ...mapGetters({
            getGame: "game/getGame",
            getUser: "getUser",
            isCreator: "game/isCreator"
        }),
        ...mapActions({
            challengePlayer: "game/challengePlayer",
            startGame: "game/startGame"
        })
    },
};
</script>