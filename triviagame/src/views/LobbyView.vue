<template>
    <head><link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Henny+Penny&family=Sankofa+Display&display=swap" rel="stylesheet">
</head>
    <div class="container">
      <div class="header">
        <h2 class="connect_players_h2">Connect Players</h2>
        <button @click="addPlayer" :disabled="players.length >= 5" class="add_player_btn"><img src="../assets/plus_symbol.png"></button>
      </div>
      <div class="players">
        <div v-for="(player, index) in players" :key="player.id" :class="['player-card', player.status]">
          <div class="player-header">
            <span>{{ player.name }}</span>
            <button v-if="players.length > 1" @click="removePlayer(index)">&#x2716;</button>
          </div>
          <div class="player-status">
            <span v-if="player.status === 'connected'">✔ Connected</span>
            <span v-else>✖ Disconnected</span>
          </div>
        </div>
      </div>
      <button class="start-btn" @click="startGame" :disabled="players.some(p => p.status === 'disconnected')">START</button>
    </div>
  </template>
  
  <script>
  import { ref } from 'vue';
  
  export default {
    setup() {
      const players = ref([
        { id: 1, name: 'Player One', status: 'disconnected', mac: null }
      ]);
      
      const storedMacs = ["MAC1", "MAC2", "MAC3", "MAC4", "MAC5"]; // Replace with real MACs
      
      const addPlayer = () => {
        if (players.value.length < 5) {
          const playerId = players.value.length + 1;
          players.value.push({ id: playerId, name: `Player ${playerId}`, status: 'disconnected', mac: null });
        }
      };
      
      const removePlayer = (index) => {
        if (players.value.length > 1) {
          players.value.splice(index, 1);
        }
      };
      
      const connectPlayer = (macAddress) => {
        const player = players.value.find(p => p.status === 'disconnected');
        if (player) {
          player.status = 'connected';
          player.mac = macAddress;
        }
      };
      
      const startGame = () => {
        alert('Game Started!');
      };
      
      return {
        players,
        addPlayer,
        removePlayer,
        connectPlayer,
        startGame
      };
    }
  };
  </script>
  
  <style scoped>
  #app{
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .container {
    /* text-align: center; */
    padding: 20px;
    display:flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width:100%;
    align-self: center;
    justify-self: center;
  }
  .header {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px;
    border-radius: 10px;
    width: 100%;
    height: 120px;
  }
  .connect_players_h2{
    background-color: #b993ff;
    width: 60%;
    height: 100%;
    justify-self: center;
    display: flex;
    justify-content: center;
    border-radius: 20px;
    align-items: center;
    font-family: "Henny Penny", serif;
    font-weight: 400;
    font-style: normal;
    font-size: 50px;
    line-height: 100%;
    margin-right: 30px;
  }
  .players {
    display: flex;
    justify-content: center;
    gap: 15px;
    margin-top: 20px;
  }
  .player-card {
    width: 250px;
    height: 400px;
    padding: 15px;
    margin: 20px;
    margin-bottom: 80px;
    margin-top: 80px;
    border-radius: 20px;
    text-align: center;
  }
  .connected {
    background: lightgreen;
  }
  .disconnected {
    background: lightcoral;
  }
  .start-btn {
    margin-top: 20px;
    padding: 10px;
    background: peachpuff;
    border-radius: 5px;
  }
  .add_player_btn{
    margin:20px;
    height: 50px;
    width: 50px;
    /* padding-left: 5px;
    padding-right: 5px;
    padding-bottom:5px; */
    background-color: #e693ff;
    border-radius: 20px;
    display:flex;
    justify-content: center;
    align-items: center;
  }
  </style>
  