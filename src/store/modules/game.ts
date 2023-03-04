import axios from 'axios'
import { io, Socket } from 'socket.io-client'
import router from '../../router'

import { GetterTree, MutationTree, ActionTree } from 'vuex'

const MUTATIONS = {
    SET_GAME_ID: 'SET_GAME_ID',
    SET_SOCKET: 'SET_SOCKET',
    ADD_EVENT: 'ADD_EVENT',
    SET_GAME: 'SET_GAME'
}

type Game = { 
    id: string
    iteration: number
    creator: { name: string, id: string }
    player?: { name: string, id: string }
    state: {
        state: string
        players: {
            creator: string[],
            player: string[]
            guests: Record<string, { name: string, sockets: string[] }>
        }
    }
}

class State {
    game: Game = {
        id: "",
        iteration: -1,
        creator: {name: "", id: ""},
        state: {
            state: "",
            players: {
                creator: [],
                player: [],
                guests: {}
            }
        }
    }
    events: Array<Object> = []
    loading: Boolean = true
    socket?: Socket
}

const mutations = <MutationTree<State>>{
    [MUTATIONS.SET_GAME_ID](state, id) {
        state.game.id = id
    },
    [MUTATIONS.ADD_EVENT](state, event) {
        state.events.push(event)
    },
    [MUTATIONS.SET_GAME](state, game) {
        state.game = game;
        state.loading = false;
    },
    [MUTATIONS.SET_SOCKET](state,socket) {
        state.socket = socket
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
        const socket = io('http://localhost:4000', {
            query: {
                gameId: state.game.id,
                userId: rootState.user.id
            }
        });
        
        socket.on('connect', () => {
            commit(MUTATIONS.ADD_EVENT, { name: "connect", body: `Connected with Socket ID: ${socket.id}` });
            commit(MUTATIONS.SET_SOCKET, socket)
        });

        socket.on('game update', (update) => {
            commit(MUTATIONS.ADD_EVENT, { name: "Game Update", body: update });
            commit(MUTATIONS.SET_GAME, update)
        })

        socket.on('disconnect', () => {
            commit(MUTATIONS.ADD_EVENT, { name: "disconnect", body: `Disconnected with Socket ID: ${socket.id}` });
            commit(MUTATIONS.SET_SOCKET, null)
        })

    }
}

const getters = <GetterTree<State, any>>{
    getGameId: (state) => state.game.id,
    getEvents: (state) => state.events,
    getGame: (state) => state.game,
    getLoading: (state) => state.loading
}

export default {
    namespaced: true,
    state: new State(),
    mutations: mutations,
    actions: actions,
    getters: getters
}