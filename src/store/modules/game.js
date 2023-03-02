import axios from 'axios'
import { io } from 'socket.io-client'
import router from '../../router'

export default {
    namespaced: true,
    state: {
        game: {
            id: null, // The ID of the game in the database (and the URL)
            socketState: 'Disconnected' // Whether or not we're connected to the server
        },
        events: []
    },
    getters: {
        getGameId: (state) => state.game.id,
        getConnectionState: (state) => state.game.socketState,
    },
    mutations: {
        SET_GAME_ID(state, id) {
            state.game.id = id
        },
        SET_CONNECTION_STATE(state, conState) {
            state.game.socketState = conState
        }
    },
    actions: {
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
                commit('SET_CONNECTION_STATE', 'Connected')
            });

            socket.on('disconnect', () => {
                console.log('Disconnected from socket.io server.');
                commit('SET_CONNECTION_STATE', 'Disconnected')
            })
        }
    }
}