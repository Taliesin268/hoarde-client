import axios from 'axios'
import { io } from 'socket.io-client'
import router from '../../router'

import { GetterTree, MutationTree, ActionTree } from 'vuex'

const MUTATIONS = {
    SET_GAME_ID: 'SET_GAME_ID',
    SET_CONNECTION_STATE: 'SET_CONNECTION_STATE',
    ADD_EVENT: 'ADD_EVENT'
}

class Game {
    id: string | null = null
    socketState: string = 'Disconnected'
}

class State {
    game: Game = new Game()
    events: Array<Object> = []
}

const mutations = <MutationTree<State>>{
    [MUTATIONS.SET_GAME_ID](state, id) {
        state.game.id = id
    },
    [MUTATIONS.SET_CONNECTION_STATE](state, conState) {
        state.game.socketState = conState
    },
    [MUTATIONS.ADD_EVENT](state, event) {
        state.events.push(event)
    }
}

const actions = <ActionTree<State, any>>{
    /**
     * Creates a new game.
     */
    async createNewGame({ commit, rootState }) {
        try {
            // Create a new game, and once we know the ID, go to that game in this client.
            const data = await axios.post('http://localhost:4000/games', { user_id: rootState.user.id })
            router.push(`/game/${data.data.game.id}`)
            commit('SET_GAME_ID', data.data.game.id)
        } catch (error) {
            alert(error);
            console.log(error);
        }
    },
    /**
     * Sets the game ID explicitely. Used when connecting to an existing game.
     * @param {string} id The ID of the game with the server
     */
    setGameId({ commit }, id) {
        commit('SET_GAME_ID', id)
    },
    connectToSocket({ state, commit, rootState }) {
        console.log(`attempting to connect to http://localhost:4000/`)
        const socket = io('http://localhost:4000', {
            query: {
                gameId: state.game.id,
                userId: rootState.user.id
            }
        });

        socket.on('connect', () => {
            console.log('Connected to socket.io server!');
            commit(MUTATIONS.SET_CONNECTION_STATE, 'Connected');
            commit(MUTATIONS.ADD_EVENT, { name: "connect", body: `Connected with Socket ID: ${socket.id}` });
        });

        socket.on('game update', (update) => {
            console.log('heard a game update');
            commit(MUTATIONS.ADD_EVENT, {name: "Game Update", body: update});
        })

        socket.on('disconnect', () => {
            console.log('Disconnected from socket.io server.');
            commit(MUTATIONS.SET_CONNECTION_STATE, 'Disconnected')
            commit(MUTATIONS.ADD_EVENT, { name: "disconnect", body: `Disconnected with Socket ID: ${socket.id}` });
        })

    }
}

const getters = <GetterTree<State, any>>{
    getGameId: (state) => state.game.id,
    getConnectionState: (state) => state.game.socketState,
    getEvents: (state) => state.events
}

export default {
    namespaced: true,
    state: new State(),
    mutations: mutations,
    actions: actions,
    getters: getters
}