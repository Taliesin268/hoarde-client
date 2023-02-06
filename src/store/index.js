import { createStore } from 'vuex'
import axios from 'axios'

export default createStore({
  state: {
    cards: []
  },
  getters: {
    getCards: (state) => state.cards
  },
  mutations: {
    SET_CARDS(state, cards) {
      state.cards = cards;
    }
  },
  actions: {
    async fetchCards({ commit }) {
      try {
        const data = await axios.get(
          "http://localhost:4000/cards"
        );
        commit("SET_CARDS", data.data);
      } catch (error) {
        alert(error);
        console.log(error);
      }
    },
    async createUser({ commit }) {
      try {
        const data = await axios.post("http://localhost:4000/users");
        console.log(data);
      } catch (error) {
        alert(error);
        console.log(error);
      }
    }
  },
  modules: {
  }
})
