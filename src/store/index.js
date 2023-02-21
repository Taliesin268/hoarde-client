import { createStore } from 'vuex'
import axios from 'axios'
import game from './modules/game.js'

export default createStore({
  state: {
    cards: [],
    user: {
      id: null, // The UUID of the current user with the server
      name: null, // The user's username
    },
    createUserPromise: null // A promise for if we're waiting on response from the server about the user
  },
  getters: {
    getCards: (state) => state.cards,
    getUser: (state) => state.user
  },
  mutations: {
    SET_CARDS(state, cards) {
      state.cards = cards;
    },
    SET_USER(state, user) {
      state.user.id = user.id;
      state.user.name = user.name;
      localStorage.setItem('user', JSON.stringify(user));
    },
    SET_CREATE_USER_PROMISE(state, promise) {
      state.createUserPromise = promise
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
     * 
     * @returns {object|Promise} Either returns a user with ID and name, or returns a promise that will resolve into that
     */
    async createUser({ commit, state }) {
      // If we're already waiting on response from the server, return that promise
      if (state.createUserPromise) { return state.createUserPromise }

      // If we already have a user, simply return that user
      if (state.user.id) {
        console.log('Found user in state')
        return state.user // Returns user synchronously
      }

      // If the user is in the local storage, chuck it in the state and use that
      const userString = localStorage.getItem('user');
      if (userString && userString != 'null') {
        const user = JSON.parse(userString)
        console.log('Found user in local storage')
        commit('SET_USER', user);
        return user; // Returns user asynchronously
      }

      // If the user is neither in local storage or the state, create them
      try {
        // Returns a promise for when this completes
        const createUserPromise = axios.post("http://localhost:4000/users").then((data) => {
          console.log('Created new user with server');
          commit("SET_USER", data.data.user);
          commit("SET_CREATE_USER_PROMISE", null);
          return data.data.user
        })
        commit("SET_CREATE_USER_PROMISE", createUserPromise);
        return createUserPromise;
      } catch (error) {
        console.log(error);
      }
    }
  },
  modules: {
    game
  }
})
