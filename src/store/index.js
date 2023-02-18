import { createStore } from 'vuex'
import axios from 'axios'
import game from './modules/game.js'

export default createStore({
  state: {
    cards: [],
    user: {
      id: null, // The UUID of the current user with the server
      name: null // The user's username
    }
  },
  getters: {
    getCards: (state) => state.cards,
    getUser: (state) => state.user
  },
  mutations: {
    SET_CARDS(state, cards) {
      state.cards = cards;
    },
    SET_USER(state, user){
      state.user.id = user.id;
      state.user.name = user.name;
      localStorage.setItem('user', JSON.stringify(user));
    }
  },
  actions: {
    /**
     * Fetches all cards from the server as an array of JSON objects.
     */
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
    /**
     * Creates a new user with the server and sets its details in the local storage.
     */
    async createUser({ commit }) {
      try {
        const data = await axios.post("http://localhost:4000/users");
        console.log('Created new user:');
        console.log(data);
        commit("SET_USER", data.data.user);
      } catch (error) {
        alert(error);
        console.log(error);
      }
    }
  },
  modules: {
    game
  }
})
