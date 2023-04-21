<template>
  <div class="grid-container">
    <div class="item item-enemy-gold">
      <div class="item-title">Enemy Gold</div>
      <div class="item-body">{{ enemy.gold }}</div>
    </div>
    <div class="item item-enemy-hand">
      <div class="item-title">Enemy Hand</div>
      <div class="item-body"><Card v-for="card in enemy.hand" v-bind="getCards()[card.card]"></Card></div>
    </div>
    <div class="item item-effects">
      <div class="item-title">Effects</div>
      <div class="item-body">{{ game.effects }}</div>
    </div>
    <div class="item item-deck">
      <div class="item-title">Deck</div>
      <div class="item-body">{{ game.deck }}</div>
    </div>
    <div class="item item-enemy-board">
      <div class="item-title">Enemy Board</div>
      <div class="item-body">{{ enemy.board }}</div>
    </div>
    <div class="item item-discard">
      <div class="item-title">Discard</div>
      <div class="item-body">{{ game.discard }}</div>
    </div>
    <div class="item item-board">
      <div class="item-title">Board</div>
      <div class="item-body">{{ me.board }}</div>
    </div>
    <div class="item item-gold">
      <div class="item-title">Gold</div>
      <div class="item-body">{{ me.gold }}</div>
    </div>
    <div class="item item-hand">
      <div class="item-title">Hand</div>
      <div class="item-body"><Card v-for="card in me.hand" v-bind="getCards()[card.card]"></Card></div>
    </div>
    <div class="item item-end-turn">
      <div class="item-title">End / Rest</div>
      <div class="item-body"><button>End Turn</button></div>
    </div>
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
}

.item-enemy-hand .card:hover {
  height: 140%;
}

</style>

<script lang="ts">
import { defineComponent } from 'vue';
import { mapGetters } from 'vuex';
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
      getCards: "getCards"
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
});
</script>