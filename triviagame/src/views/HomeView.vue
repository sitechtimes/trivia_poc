<template>
  <div class="home-container">
    <div class="top_section">
    <div class="title">TRIVIA SMASH</div>
    <div class="outsetdiv">
    <div class="settings_div">
      <div class="settings">
      <label>
        Number of Questions:
        <input class="number" type="number" v-model.number="numQuestions" min="1" />
      </label>
    </div>
    <div class="settings">

      <label class="toggle">
        Multiple Choice:
        <div class="switch">        <input type="checkbox" v-model="multipleChoice" @change="ensureOneSelected" />
          <span class="slider round"></span></div>

      </label>
    </div>
    <div class="settings">
      <label class="toggle">
        True/False:
        <div class="switch">        <input type="checkbox" v-model="trueFalse" @change="ensureOneSelected" />
          <span class="slider round"></span></div>

      </label>
    </div>
    </div>
  </div>
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
  /* justify-content: center; */
  height: 100vh;
  background-color: #f8f8f8;
}
.top_section{
  display:flex;
}
.title {
  font-size: 7rem;
  font-family: "Henny Penny", serif;
  font-weight: 400;
  font-style: normal;
  background-color: #f0645a;
  padding: 20px 40px;
  border-radius: 20px;
  color: black;
  margin: 100px;
  position:relative;
  top: 0;
  display:flex;
  justify-content: center;
}
.outsetdiv{
  display:flex;
  justify-content: right;
  width:100%;
  padding-right: 15%;
}
.settings_div{
  display:flex;
  flex-direction: column;
  justify-content: center;
  align-items: right;
}
.settings {
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  background-color: #a7f3a7;
  padding: 20px;
  border-radius: 10px;
  width:120%;
  font-size: 130%;
  justify-content:center;
  align-items: center;
  font-family: "Henny Penny", serif;
  font-weight: 400;
  font-style: normal;
}
input[type="number"] {
  width: 50px;
}
.toggle input {
  margin-left: 10px;
}
.buttons {
  display: flex;
  gap: 100px;
  margin-top: 40px;
}
button {
  width: 200px;
  height: 110px;
  border-radius: 50%;
  border: none;
  box-shadow: 3px 15px 5px gray;
  margin-top: 50px;
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
.number{
  background-color: #f8f8f8;
  border-radius: 20%;
}
/* The switch - the box around the slider */
.switch {
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;
}

/* Hide default HTML checkbox */
.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

/* The slider */
.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  -webkit-transition: .4s;
  transition: .4s;
}

.slider:before {
  position: absolute;
  content: "";
  height: 26px;
  width: 26px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  -webkit-transition: .4s;
  transition: .4s;
}

input:checked + .slider {
  background-color: #deabff;
}

input:focus + .slider {
  box-shadow: 0 0 1px #deabff;
}

input:checked + .slider:before {
  -webkit-transform: translateX(26px);
  -ms-transform: translateX(26px);
  transform: translateX(26px);
}

/* Rounded sliders */
.slider.round {
  border-radius: 34px;
}

.slider.round:before {
  border-radius: 50%;
}
</style>
