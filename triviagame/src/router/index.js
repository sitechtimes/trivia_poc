import { createRouter, createWebHistory } from 'vue-router';
import LobbyView from '../views/LobbyView.vue';

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: '/',
			name: 'home',
			component: LobbyView,
		},
		{
			path: '/game',
			name: 'game',
			// route level code-splitting
			// this generates a separate chunk (About.[hash].js) for this route
			// which is lazy-loaded when the route is visited.
			component: () => import('../views/GameView.vue'),
		},
		{
			path: '/connect',
			name: 'connect',
			// route level code-splitting
			// this generates a separate chunk (About.[hash].js) for this route
			// which is lazy-loaded when the route is visited.
			component: () => import('../views/ConnectPlayers.vue'),
		},
	],
});

export default router;
