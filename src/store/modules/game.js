import axios from 'axios'

export default {
    namespaced: true,
    state: {
    },
    getters: {
    },
    mutations: {
    },
    actions: {
        async createNewGame({ commit, rootState }) {
            console.log('calling createNewGame')
            console.log(rootState.user.id);
            try {
                const data = await axios.post('http://localhost:4000/games', { user_id: rootState.user.id })
            } catch (error) {
                alert(error);
                console.log(error);
            }
        },
    },
    modules: {
    }
}