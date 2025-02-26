<template>
  <div class="home-container">
    <div class="title">TRIVIA SMASH</div>
    
    <div class="settings">
      <label>
        Number of Questions:
        <input type="number" v-model.number="numQuestions" min="1" />
      </label>
      
      <label class="toggle">
        Multiple Choice:
        <input type="checkbox" v-model="multipleChoice" @change="ensureOneSelected" />
      </label>
      
      <label class="toggle">
        True/False:
        <input type="checkbox" v-model="trueFalse" @change="ensureOneSelected" />
      </label>
    </div>
    
    <div class="buttons">
      <button class="blue-button"></button>
      <button class="yellow-button"></button>
      <button class="pink-button"></button>
      <button class="orange-button"></button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      numQuestions: 10,
      multipleChoice: true,
      trueFalse: false,
    };
  },
  methods: {
    ensureOneSelected() {
      if (!this.multipleChoice && !this.trueFalse) {
        // Ensure at least one option remains selected
        this.multipleChoice = true;
      }
    },
  },
};
</script>

<style scoped>
.home-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #f8f8f8;
}
.title {
  font-size: 7rem;
  font-family: fantasy;
  background-color: #f0645a;
  padding: 20px 40px;
  border-radius: 20px;
  color: black;
  margin: 100px;
}
.settings {
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  background-color: #a7f3a7;
  padding: 15px;
  border-radius: 10px;
}
input[type="number"] {
  width: 50px;
}
.toggle input {
  margin-left: 10px;
}
.buttons {
  display: flex;
  gap: 20px;
  margin-top: 40px;
}
button {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  border: none;
  box-shadow: 3px 3px 5px gray;
}
.blue-button {
  background-color: #5a9cf0;
}
.yellow-button {
  background-color: #f0d35a;
}
.pink-button {
  background-color: #f05aa3;
}
.orange-button {
  background-color: #f0a25a;
}
</style>
