import axios from 'axios'
import { io, Socket } from 'socket.io-client'
import router from '../../router'

import { GetterTree, MutationTree, ActionTree } from 'vuex'

import { User, State as RootState } from '../index.js'

const MUTATIONS = {
    SET_GAME_ID: 'SET_GAME_ID',
    SET_SOCKET: 'SET_SOCKET',
    ADD_EVENT: 'ADD_EVENT',
    SET_GAME: 'SET_GAME',
    SET_PLAYER: 'SET_PLAYER'
}

const GAME_ACTIONS = {
    SELECT_OPPONENT: 'select opponent',
    START_GAME: 'start game',
    ACTIVATE_CARD: 'activate card'
}

type Card = {
    name: String;
    wager: number;
    rules_text: String;
    alignments?: String;
    type?: String;
}

enum Visibility {
    Creator,
    Player,
    Private,
    Public
}

enum MoralAlignment {
    Good,
    Evil,
    Neutral
}

enum EthicalAlignment {
    Lawful,
    Chaotic,
    Neutral
}

enum AlignmentTrait {
    Unchangeable,
    Dragon
}

enum Turn {
    Player,
    Creator,
    None
}

enum TurnState {
    Ready = "Ready",
    Played = "Played",
    Waiting = "Waiting",
    Resting = "Resting",
    FreePlayed = "Free Played"
}

type PlayerBoardState = {
    board: Card[],
    hand: {
        card: Card,
        visibility: Visibility
    }[],
    wager: number,
    ethicalAlignment: {
        alignment: EthicalAlignment,
        traits: AlignmentTrait[]
    },
    turn: TurnState
}

type Game = {
    id: string
    iteration: number
    creator: User
    player?: User
    state: {
        state: string
        players: {
            creator: string[],
            player: string[]
            guests: Record<string, { name: string, sockets: string[] }>
        },
        game?: {
            deck: Card[],
            discard: {
                card: Card
                visibility: Visibility
            }[],
            players: {
                creator: {
                    gold: number
                },
                player: {
                    gold: number
                }
            },
            effects: []; // TODO
            round: {
                number: number,
                moralAlignment: {
                    alignment: MoralAlignment,
                    traits: AlignmentTrait[]
                },
                players: {
                    creator: PlayerBoardState,
                    player: PlayerBoardState
                }
            }
        }
    }
}

class State {
    game: Game = {
        id: "",
        iteration: -1,
        creator: { name: "", id: "" },
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
    [MUTATIONS.SET_SOCKET](state, socket) {
        state.socket = socket;
    },
    [MUTATIONS.SET_PLAYER](state, user: User) {
        state.game.player = user;
        state.game.state.players.player = state.game.state.players.guests[user.id].sockets
        delete state.game.state.players.guests[user.id]
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
    },
    challengePlayer({ state, commit, getters }, user: User) {
        console.log(`Action called! With user ${JSON.stringify(user)}`)
        // Check if socket is connected and is creator
        if (!getters.isCreator) { alert('You are not the creator'); return; }
        if (typeof state.socket == 'undefined' || state.socket == null) { alert('Not connected to the server'); return; }

        // Update the state
        commit(MUTATIONS.SET_PLAYER, user)

        // Send action 
        state.socket.emit(GAME_ACTIONS.SELECT_OPPONENT, user)
    },
    startGame({ state }) {
        if (typeof state.socket == 'undefined' || state.socket == null) { alert('Not connected to the server'); return; }
        if (state.game.player == undefined) { alert('No player selected'); return; }
        console.log('Starting game!')
        state.socket.emit(GAME_ACTIONS.START_GAME)
        state.game.state.state = 'ProcessingState';
    },
    activateCard({ state, rootState }, id: number) {
        if (typeof state.socket == 'undefined' || state.socket == null) { alert('Not connected to the server'); return; }
        console.log(`Playing card: ${ rootState.cards[id].name } (${id})`)
        state.socket.emit(GAME_ACTIONS.ACTIVATE_CARD, { card: id})
        state.game.state.state = 'ProcessingState'
    }
}

const getters = <GetterTree<State, any>>{
    getGameId: (state) => state.game.id,
    getEvents: (state) => state.events,
    getGame: (state) => state.game,
    getLoading: (state) => state.loading,
    isCreator: (state, getters, rootState: RootState) => rootState.user.id == state.game.creator.id,
    isPlayer: (state, getters, rootState: RootState) => state.game.player != undefined && rootState.user.id == state.game.player.id
}

export default {
    namespaced: true,
    state: new State(),
    mutations: mutations,
    actions: actions,
    getters: getters
}