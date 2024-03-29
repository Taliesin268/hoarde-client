<template>
  <div id="floating-board" class="inactive">
    <Card 
      v-for="card in whelps" v-bind="card"></Card>
  </div>
  <div class="grid-container">
    <div class="item item-enemy-gold" :class="{ 'player-active': enemy.isTurn }">
      <div class="item-title">Enemy Gold</div>
      <div class="item-body">{{ enemy.gold }}</div>
    </div>
    <div class="item item-enemy-hand" :class="{ 'player-active': enemy.isTurn }">
      <div class="item-title">Enemy Hand</div>
      <div class="item-body">
        <Card v-for="card in enemy.hand" v-bind="getCards()[card.card]"></Card>
      </div>
    </div>
    <div class="item item-effects">
      <div class="item-title">Effects</div>
      <div class="item-body">{{ game.effects.length < 1 ? "" : game.effects }}</div>
      </div>
      <div class="item item-deck">
        <div class="item-title">Deck</div>
        <div class="item-body">{{ game.deck.length }} cards left in deck</div>
      </div>
      <div class="item item-enemy-board" :class="{ 'player-active': enemy.isTurn }">
        <div class="item-title">Enemy Board</div>
        <div class="item-body">
          <Card v-for="card in enemy.board" v-bind="getCards()[card]"></Card>
          </div>
        </div>
        <div class="item item-enemy-wager item-wager">
          <div class="item-body">Wager: {{ enemy.wager }}</div>
        </div>
        <div class="item item-enemy-ethical-alignment item-ethical-alignment item-alignment"
          :class="enemy.ethicalAlignment">
          <div class="item-body">{{ enemy.ethicalAlignment }}</div>
        </div>
        <div class="item item-player-ethical-alignment item-ethical-alignment item-alignment"
          :class="me.ethicalAlignment">
          <div class="item-body">{{ me.ethicalAlignment }}</div>
        </div>
        <div class="item item-moral-alignment item-alignment" :class="game.round.moralAlignment">
          <div class="item-body">{{ game.round.moralAlignment }}</div>
        </div>
        <div class="item item-wager item-player-wager">
          <div class="item-body">Wager: {{ me.wager }}</div>
        </div>
        <div class="item item-discard">
          <div class="item-title">Discard</div>
            <div class="item-title">{{ game.discard.length }} cards</div>
          <div class="item-body">
            <Card v-for="card in game.discard.slice().reverse()" v-bind="getCards()[card.card]"></Card>
          </div>
          </div>
          <div class="item item-board" :class="{ 'player-active': me.isTurn }">
            <div class="item-title">Board</div>
            <div class="item-body">
                <Card v-for="card in me.board" v-bind="getCards()[card]"></Card>
            </div>
            </div>
            <div class="item item-gold" :class="{ 'player-active': me.isTurn }">
              <div class="item-title">Gold</div>
              <div class="item-body">{{ me.gold }}</div>
            </div>
            <div class="item item-hand" :class="{ 'player-active': me.isTurn }">
              <div class="item-title">Hand</div>
              <div class="item-body">
                <Card v-for="card in me.hand" v-bind="getCards()[card.card]" @click="activateCard(card.card)"></Card>
              </div>
            </div>
            <div class="item item-end-turn" :class="{ 'player-active': me.isTurn }">
              <div class="item-body"><button :disabled="enemy.isTurn" @click="endTurn()">{{ endTurnText }}</button></div>
            </div>
          </div>
</template>

<style scoped>
#floating-board {
  position:absolute;
  height: 100vh;
  width: 100vw;
  top: 0;
  left: 0;
  z-index: 1000;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  flex-direction: row;
  background-color: #ffffff55;
}

#floating-board.inactive {
  display: none;
}

#floating-board div {
  cursor: pointer;
}

#floating-board .card:hover {
  box-shadow: 0px 0px 1rem 1px gold;
}

.grid-container {
  display: grid;
  grid-template-columns: 19.75% 29.5% 29.5% 19.75%;
  grid-template-rows: 19% 25.25% 2% 2% 2% 2% 25.25% 19%;
  height: 100%;
  gap: 0.5%;
  padding: 0.5%;
  box-sizing: border-box;
}

.item {
  font-size: 2rem;
  background-color: #fff;
  border: 1px solid #000;
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
}

.item-body {
  display: flex;
  justify-content: center;
  flex-shrink: 2;
  gap: 1%;
  height: 100%;
}

.item-title {
  background-color: #eee;
  border-bottom: 1px solid black;
  text-align: center;
  padding: 1px;
  font-size: medium;
}

.item-title:nth-child(2) {
  background-color: white;
  border-bottom: none;
}

.item-enemy-gold {
  grid-row: 1;
  grid-column: 1;
}

.item-enemy-hand {
  grid-row: 1;
  grid-column: 2 / span 2;
}

.item-effects {
  grid-row: 1 / span 7;
  grid-column: 4;
}

.item-deck {
  grid-row: 2 / span 3;
  grid-column: 1;
}

.item-enemy-board {
  grid-row: 2;
  grid-column: 2 / span 2;
}

.item-enemy-wager {
  grid-row: 3;
}

.item-alignment.Good {
  background-color: white;
}

.item-alignment.Evil {
  background-color: red;
}

.item-alignment.Lawful {
  background-color: gold;
}

.item-alignment.Chaotic {
  background-color: #4D1A69bb;
}

.item-alignment.Neutral {
  background-color: grey;
}

.item-ethical-alignment {
  grid-column: 2;
  font-size: small;
}

.item-enemy-ethical-alignment {
  grid-row: 4;
}

.item-player-ethical-alignment {
  grid-row: 5;
}

.item-moral-alignment {
  grid-row: 4 / span 2;
  grid-column: 3;
}

.item-discard {
  grid-row: 5 / span 3;
  grid-column: 1;
}

.item-discard > .item-body {
  display: flex;
  flex-direction: column-reverse;
  flex-wrap: wrap;
  justify-content: flex-end;
  overflow-y: auto;
  height: 100%;
}

.item-discard .card {
  height: 88mm;
  margin: auto;
}

.item-player-wager {
  grid-row: 6;
}

.item-wager {
  grid-column: 2 / span 2;
  font-size: small;
}

.item-board {
  grid-row: 7;
  grid-column: 2 / span 2;
}

.item-gold {
  grid-row: 8;
  grid-column: 1;
}

.item-hand {
  grid-row: 8;
  grid-column: 2 / span 2;
}

.item-end-turn {
  grid-row: 8;
  grid-column: 4;
  border: none;
}

.item-end-turn button {
  width: 100%;
  height: 100%;
}

.card {
  box-sizing: border-box;
  height: 100%;
}

.item-hand .card:hover {
  top: -50%;
  height: 140%;
  cursor: pointer;
}

.item-enemy-hand .card:hover {
  height: 140%;
  top: 10%;
}

.player-active {
  box-shadow: 0px 0px 1rem 1px green;
}

button:not([disabled]):hover {
  cursor: pointer;
}
</style>

<script lang="ts">
import { defineComponent } from 'vue';
import { mapGetters, mapActions } from 'vuex';
import Card from '@/components/Card.vue'

export default defineComponent({
  name: "game-board",
  components: { Card },
  methods: {
    ...mapGetters({
      getGame: "game/getGame",
      getUser: "getUser",
      isCreator: "game/isCreator",
      isPlayer: "game/isPlayer",
      getCards: "getCards",
      tokens: "getTokens"
    }),
    ...mapActions({
      activateCard: "game/activateCard",
      endTurn: "game/endTurn"
    })
  },
  computed: {
    whelps() {
      return [
        this.tokens()["Benevolent Whelp"],
        this.tokens()["Malevolent Whelp"],
        this.tokens()["Caring Whelp"],
        this.tokens()["Malicious Whelp"],
      ]
    },
    me(): Record<string, any> {
      if (this.isPlayer()) {
        return {
          gold: this.getGame().state.game.players.player.gold,
          isTurn: 
            this.getGame().state.game.round.players.player.turn == 'Ready' ||
            this.getGame().state.game.round.players.player.turn == 'Free Played' ||
            this.getGame().state.game.round.players.player.turn == 'Played'
          ,
          ...this.getGame().state.game.round.players.player
        }
      } else {
        return {
          gold: this.getGame().state.game.players.creator.gold,
          isTurn: 
            (this.getGame().state.game.round.players.creator.turn == 'Ready' ||
            this.getGame().state.game.round.players.creator.turn == 'Free Played' ||
            this.getGame().state.game.round.players.creator.turn == 'Played')
            ,
          ...this.getGame().state.game.round.players.creator
        }
      }
    },
    enemy(): Record<string, any> {
      if (!this.isPlayer()) {
        return {
          gold: this.getGame().state.game.players.player.gold,
          isTurn: 
            this.getGame().state.game.round.players.player.turn == 'Ready' ||
            this.getGame().state.game.round.players.player.turn == 'Free Played' ||
            this.getGame().state.game.round.players.player.turn == 'Played'
          ,
          ...this.getGame().state.game.round.players.player
        }
      } else {
        return {
          gold: this.getGame().state.game.players.creator.gold,
          isTurn: 
            this.getGame().state.game.round.players.creator.turn == 'Ready' ||
            this.getGame().state.game.round.players.creator.turn == 'Free Played' ||
            this.getGame().state.game.round.players.creator.turn == 'Played'
            ,
          ...this.getGame().state.game.round.players.creator
        }
      }
    },
    game() {
      return this.getGame().state.game
    },
    endTurnText(): string {
      switch (this.me.turn) {
        case "Ready": 
          if(this.game.round.turn < 3)
            return "Forfeit Round";
          return "Rest"
        case "Played":
        case "FreePlayed": return "End Turn";
        case "Resting": return "Resting"
        case "Waiting": return "...";
        default: return "Error: Unknown Game State";
      }
    }
  }
});
</script>