import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Cards from '../views/Cards.vue'
import Game from '../views/Game.vue'
import GameBoard from '../components/GameBoard.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home 
  },
  {
    path: '/cards',
    name: 'Cards',
    component: Cards
  },
  {
    path: '/game/:id',
    name: 'Game',
    component: Game
  },
  {
    path: '/board-test',
    name: 'Test Game Board',
    component: GameBoard
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
