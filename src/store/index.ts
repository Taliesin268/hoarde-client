import axios from 'axios'
import game from '@/store/modules/game.js'
import Vuex from 'vuex'
import { GetterTree, MutationTree, ActionTree } from 'vuex'

class User {
  id: string | null = null;
  name: string | null = null;
}

class State {
  cards: Array<Object> = [];
  user: User = new User();
  createUserPromise: Promise<void> | null = null;
}

const mutations = <MutationTree<State>>{
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
}

const actions = <ActionTree<State, any>>{
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
     * Makes sure not to duplicate users by checking for promises in progress or existing users in state or storage.
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
}

const getters = <GetterTree<State, any>>{
    getCards: (state) => state.cards,
    getUser: (state) => state.user
}

export default new Vuex.Store({
    state: new State(),
    mutations: mutations,
    actions: actions,
    getters: getters,
    modules: {
      game: game
    }
})