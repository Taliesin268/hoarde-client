import { createApp } from 'vue'
import App from './App'
import router from './router'
import store from './store'

try {
    const user = JSON.parse(localStorage.getItem('user')) ;
    store.commit('SET_USER', user);
} catch (error) {
    console.log('Unable to find existing user - creating new one');
    store.dispatch('createUser');
}

createApp(App).use(store).use(router).mount('#app')