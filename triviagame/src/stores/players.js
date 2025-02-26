import { ref, computed } from 'vue';
import { defineStore } from 'pinia';

export const usePlayerStore = defineStore('player', () => {
	let players = ref([]);

	function addPlayer(player) {
		players.push(player);
	}

	function clearPlayers() {
		players = ref([]);
	}

	return { players, addPlayer, clearPlayers };
});
