<template>
  <div class="grid-container">
    <div class="item item-enemy-gold">Enemy Gold: {{ enemy.gold }}</div>
    <div class="item item-enemy-hand">Enemy Hand: {{ enemy.hand }}</div>
    <div class="item item-effects">Effects: {{ game.effects }}</div>
    <div class="item item-deck">Deck: {{ game.deck }}</div>
    <div class="item item-enemy-board">Enemy Board: {{ enemy.board }}</div>
    <div class="item item-discard">Discard: {{ game.discard }}</div>
    <div class="item item-board">Board: {{ me.board }}</div>
    <div class="item item-gold">Gold: {{ me.gold }}</div>
    <div class="item item-hand">Hand: {{ me.hand }}</div>
    <div class="item item-end-turn"><button>End Turn</button></div>
  </div>
</template>

<style>
.grid-container {
  display: grid;
  grid-template-columns: 20% 60% 20%;
  grid-template-rows: 20% 30% 30% 20%;
  height: 100%;
}

.item {
  display: flex;
  justify-content: center;
  font-size: 2rem;
  background-color: #fff;
  border: 1px solid #000;
  overflow: auto;
  padding: 10px;
}

.item-enemy-gold {
  grid-row: 1;
  grid-column: 1;
}

.item-enemy-hand {
  grid-row: 1;
  grid-column: 2;
}

.item-effects {
    grid-row: 1 / span 3;
}

.item-deck {
  grid-row: 2;
  grid-column: 1;
}

.item-enemy-board {
  grid-row: 2;
  grid-column: 2;
}

.item-discard {
  grid-row: 3;
  grid-column: 1;
}

.item-board {
  grid-row: 3;
  grid-column: 2;
}

.item-gold {
  grid-row: 4;
  grid-column: 1;
}

.item-hand {
  grid-row: 4;
  grid-column: 2;
}

.item-end-turn {
  grid-row: 4;
  grid-column: 3;
}
.item-end-turn>button {
    width:100%;
}
</style>

<script lang="ts">
import { mapGetters } from 'vuex';

export default {
    name: "game-board",
    methods: {
        ...mapGetters({
            getGame: "game/getGame",
            getUser: "getUser",
            isCreator: "game/isCreator",
            isPlayer: "game/isPlayer"
        }),
    },
    computed: {
        me(): Record<string, any> {
            if (this.isPlayer()) {
                return {
                    gold: this.getGame().state.game.players.player.gold,
                    ...this.getGame().state.game.round.players.player
                }
            } else {
                return {
                    gold: this.getGame().state.game.players.creator.gold,
                    ...this.getGame().state.game.round.players.creator
                }
            }
        },
        enemy(): Record<string, any> {
            if (!this.isPlayer()) {
                return {
                    gold: this.getGame().state.game.players.player.gold,
                    ...this.getGame().state.game.round.players.player
                }
            } else {
                return {
                    gold: this.getGame().state.game.players.creator.gold,
                    ...this.getGame().state.game.round.players.creator
                }
            }
        },
        game() {
            return this.getGame().state.game
        }
    }
};
</script>