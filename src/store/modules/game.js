import axios from 'axios'
import { io } from 'socket.io-client'
import router from '../../router'

export default {
    namespaced: true,
    state: {
        game: {
            id: null,
            socket: null
        }
    },
    getters: {
        getGameId: (state) => state.game.id,
    },
    mutations: {
        SET_GAME_ID(state, id) {
            state.game.id = id
        },
        SET_SOCKET(state, socket) {
            state.game.socket = socket
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
        connectToSocket({ state, commit }) {
            console.log(`attempting to connect to http://localhost:4000/`)
            const socket = io('http://localhost:4000');

            socket.on('connect', () => {
                console.log('Connected to socket.io server!');
            });
        }
    }
}