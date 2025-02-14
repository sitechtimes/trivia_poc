<template>
  <div class="quiz-container">
    <div v-if="question" class="question-box">
      <!-- Display the Question -->
      <h1>{{ question.question }}</h1>
      <div v-if="question.type === 'multiple'" class="answers">
        <!-- Display answer choices for multiple-choice questions -->
        <button
          v-for="(answer, index) in shuffledAnswers"
          :key="index"
          class="answer-button"
          @click="checkAnswer(answer)"
        >
          {{ answer }}
        </button>
      </div>
      <div v-if="question.type === 'boolean'" class="answers">
        <!-- Display True/False options for True/False questions -->
        <button class="answer-button" @click="checkAnswer('True')">True</button>
        <button class="answer-button" @click="checkAnswer('False')">
          False
        </button>
      </div>
    </div>
    <div v-if="showResult !== null" class="result">
      <h2>{{ showResult ? "Correct!" : "Incorrect!" }}</h2>
      <button @click="nextQuestion">Next Question</button>
    </div>
  </div>
</template> <script>
export default {
  data() {
    return {
      question: null,
      shuffledAnswers: [],
      showResult: null,
      sessionToken: "",
      currentIndex: 0,
      allQuestions: [],
    };
  },
  mounted() {
    this.initializeQuiz();
  },
  methods: {
    async getSessionToken() {
      try {
        const response = await fetch(
          "https://opentdb.com/api_token.php?command=request"
        );
        const data = await response.json();
        this.sessionToken = data.token;
      } catch (error) {
        console.error("Error retrieving session token:", error);
      }
    },
    async fetchQuestions() {
      const url = `https://opentdb.com/api.php?amount=10&token=${this.sessionToken}`;
      try {
        const response = await fetch(url);
        const data = await response.json();
        this.allQuestions = data.results;
        this.loadNextQuestion();
      } catch (error) {
        console.error("Error fetching questions:", error);
      }
    },
    shuffleAnswers(question) {
      let answers = [...question.incorrect_answers, question.correct_answer];
      answers = answers.sort(() => Math.random() - 0.5);
      return answers;
    },
    async initializeQuiz() {
      await this.getSessionToken();
      await this.fetchQuestions();
    },
    loadNextQuestion() {
      if (this.currentIndex < this.allQuestions.length) {
        this.question = this.allQuestions[this.currentIndex];
        this.shuffledAnswers = this.shuffleAnswers(this.question);
        this.showResult = null;
      }
    },
    checkAnswer(selectedAnswer) {
      const isCorrect = selectedAnswer === this.question.correct_answer;
      this.showResult = isCorrect;
    },
    nextQuestion() {
      this.currentIndex++;
      if (this.currentIndex < this.allQuestions.length) {
        this.loadNextQuestion();
      } else {
        alert("You have completed the quiz!");
      }
    },
  },
};
</script> <style scoped>
.quiz-container {
  text-align: center;
  padding: 20px;
}
.question-box {
  margin-bottom: 20px;
}
h1 {
  font-size: 36px;
  margin-bottom: 20px;
}
.answers {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.answer-button {
  padding: 10px 20px;
  font-size: 18px;
  cursor: pointer;
  border: none;
  border-radius: 5px;
  background-color: #4caf50;
  color: white;
  transition: background-color 0.3s;
}
.answer-button:hover {
  background-color: #45a049;
}
.result {
  margin-top: 20px;
}
.result h2 {
  font-size: 24px;
  margin-bottom: 20px;
}
</style>
