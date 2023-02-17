import axios from 'axios'
import { io } from 'socket.io-client'
import router from '../../router'

export default {
    namespaced: true,
    state: {
        game: {
            id: null,
            socket: {
                state: 'Disconnected',
                connection: null
            }
        }
    },
    getters: {
        getGameId: (state) => state.game.id,
        getConnectionState: (state) => state.game.socket.state,
    },
    mutations: {
        SET_GAME_ID(state, id) {
            state.game.id = id
        },
        SET_SOCKET(state, socket) {
            state.game.socket.connection = socket
        },
        SET_CONNECTION_STATE(state, conState) {
            state.game.socket.state = conState
        }
    },
    actions: {
        async createNewGame({ commit, rootState }) {
            console.log('calling createNewGame')
            console.log(rootState.user.id);
            try {
                const data = await axios.post('http://localhost:4000/games', { user_id: rootState.user.id })
                router.push(`/game/${data.data.game.id}`)
                commit('SET_GAME_ID', data.data.game.id)
            } catch (error) {
                alert(error);
                console.log(error);
            }
        },
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
                //socket.state = 'Connected'
            });

            socket.on('disconnect', () => {
                console.log('Disconnected from socket.io server.');
                //socket.state = 'Disconnected'
                commit('SET_CONNECTION_STATE', 'Disconnected')
            })

            commit('SET_SOCKET', socket)
        }
    }
}