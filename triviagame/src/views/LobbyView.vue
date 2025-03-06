<template>
    <head><link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Henny+Penny&family=Sankofa+Display&display=swap" rel="stylesheet">
</head>
    <div class="container">
      <div class="header">
        <button class="back_to_home" @click="toHome()"><span id="back" class="material-symbols-outlined">arrow_back_ios</span></button>
        <h2 class="connect_players_h2">Connect Players</h2>
        <button @click="addPlayer" :disabled="players.length >= 5" class="add_player_btn"><span class="material-symbols-outlined" id="add_player">add</span></button>
      </div>
      <div class="players">
        <div 
        v-for="(player, index) in players" 
        :key="player.id" 
        :class="['player-card', player.status]" 
        :style="{ backgroundColor: playerColors[index % playerColors.length] }"
      >
          <div class="card_interior_overall">
          <button v-if="players.length > 1" @click="removePlayer(index)" class="x_button" id="delete_player"><span class="material-symbols-outlined">cancel</span></button>
        <div class="card_interior">
          <div class="player-header">
            <span>{{ player.name }}</span>
          </div>
          <div class="player-status">
            <div v-if="player.status === 'connected'" class="status"><span class="material-symbols-outlined" id="connected">check_circle</span> <span>Connected</span></div>
            <div v-else class="status"><span class="material-symbols-outlined" id="disconnected">disabled_by_default</span> <span>Disconnected</span></div>
          </div>
        </div>
      </div>
        </div>
      </div>
      <button class="start-btn" @click="startGame" :disabled="players.some(p => p.status === 'disconnected')">START</button>
    </div>
  </template>
  
  <script>
  import router from '@/router';
import { ref } from 'vue';
  
  export default {
    setup() {
      const playerColors = ['#FF8A65', '#DCE775','#A8E6CF', '#4FC3F7', '#BA68C8']; // Unique colors for each player

      const players = ref([
        { id: 1, name: 'Player 1', status: 'disconnected', mac: null }
      ]);
      
      const storedMacs = ["MAC1", "MAC2", "MAC3", "MAC4", "MAC5"]; // Replace with real MACs

      const addPlayer = () => {
        if (players.value.length < 5) {
          // Get the list of all possible player IDs
          const allIds = [1, 2, 3, 4, 5];
          
          // Get the current player IDs in the array
          const existingIds = players.value.map(player => player.id);
          
          // Find the first missing ID by filtering out the existing ones
          const missingId = allIds.find(id => !existingIds.includes(id));
          
          // If there is a missing ID, add the new player with that ID
          if (missingId) {
            players.value.push({ id: missingId, name: `Player ${missingId}`, status: 'disconnected', mac: null });
          }
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
      
      const toHome = () => {
        router.push('/');
      }
      return {
        players,
        addPlayer,
        removePlayer,
        connectPlayer,
        startGame,
        playerColors,
        toHome
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
    height: 140px;
  }
  .back_to_home{
    margin:20px;
    padding: 5px;
    padding-right:0px;
    width: 50px;
    margin-right:50px;
    transform: scale(2);
    background-color: rgb(177, 228, 177);
    border-radius: 20px;
    display:flex;
    justify-content: center;
    align-items: center;
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
    font-size: 60px;
    line-height: 100%;
    margin-right: 30px;
  }
  .players {
    display: flex;
    justify-content: center;
    gap: 15px;
    margin-top: 20px;
    font-family: "Henny Penny", serif;
    font-weight: 400;
    font-style: normal;
  }
  .player-card {
    width: 300px;
    height: 420px;
    padding: 15px;
    margin: 20px;
    margin-bottom: 80px;
    margin-top: 80px;
    border-radius: 20px;
    /* text-align: center; */
  }
  .card_interior_overall{
    display:flex;
    flex-direction: column;
    align-items: end;
  }
  .card_interior{
    display:flex;
    justify-content:center;
    flex-direction: column;
    align-items: center;
    width: 100%;
    height: 100%;
  }
  #disconnected, #connected{
    font-size: 100px;
  }
  #delete_player{
    transform: scale(2);
    margin: 5px;
  }
  .player-header{
    background-color: #fff;
    margin:10px;
    height: 50px;
    width: 60%;
    border-radius: 10px;
    display:flex;
    justify-content: center;
    align-items: center;
    font-size: 22px;
    margin-top: 0px;
  }
  .player-status{
    background-color:#fff;
    margin: 50px;
    margin-top:30px;
    padding: 20px;
    height: 220px;
    width: 75%;
    border-radius: 10px;
    display: flex;
    justify-content: center;
    font-size: 25px;
    align-items: center;
  }
  .status{
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
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
    border-radius: 20px;
    height: 90px;
    width: 20%;
    font-family: "Henny Penny", serif;
    font-weight: 400;
    font-style: normal;
    font-size: 60px;
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
  #add_player{
    font-size: 50px;
  }
  </style>
  