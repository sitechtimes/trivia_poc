<template>
  <div
    v-if="!loading"
    :class="{
      'bg-green-100': showResult === true,
      'bg-red-100': showResult === false,
    }"
    class="flex flex-col items-center p-8 min-h-screen transition-colors duration-500"
  >
    <div
      v-if="question"
      class="w-full max-w-lg bg-white p-8 rounded-xl shadow-lg space-y-8"
    >
      <h1
        class="text-2xl font-semibold text-gray-800 text-center"
        v-html="question.question"
      ></h1>

      <div v-if="isMultipleChoice" class="flex flex-col gap-4">
        <AnswerButton
          v-for="(answer, index) in shuffledAnswers"
          :key="index"
          :answer="answer"
          :disabled="showResult !== null"
          @click="checkAnswer(answer)"
        />
      </div>

      <div v-if="isBoolean" class="flex flex-col gap-4">
        <BooleanAnswerButton
          v-for="value in ['True', 'False']"
          :key="value"
          :value="value"
          :disabled="showResult !== null"
          @click="checkAnswer(value)"
        />
      </div>
    </div>

    <div v-if="showResult !== null" class="mt-8 text-center">
      <h2 class="text-xl font-medium text-gray-800 mb-4">
        {{ showResult ? "Correct!" : "Incorrect!" }}
      </h2>
      <button
        class="px-6 py-3 text-lg font-medium text-white bg-blue-600 rounded-lg shadow-md hover:bg-blue-700 transition-colors duration-200 ease-in-out"
        @click="nextQuestion"
      >
        Next Question
      </button>
    </div>
  </div>

  <div
    v-else
    class="flex items-center justify-center h-screen text-2xl font-semibold text-gray-600"
  >
    Loading...
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import AnswerButton from "@/components/AnswerButton.vue";
import BooleanAnswerButton from "@/components/BooleanAnswerButton.vue";

const question = ref(null);
const shuffledAnswers = ref([]);
const showResult = ref(null);
const sessionToken = ref("");
const currentIndex = ref(0);
const allQuestions = ref([]);
const loading = ref(true);

// Fetch session token
async function getSessionToken() {
  try {
    const response = await fetch(
      "https://opentdb.com/api_token.php?command=request"
    );
    const data = await response.json();
    sessionToken.value = data.token;
  } catch (error) {
    console.error("Error retrieving session token:", error);
  }
}

// Fetch questions from the API
async function fetchQuestions() {
  let success = false;
  while (!success) {
    try {
      const url = `https://opentdb.com/api.php?amount=20&token=${sessionToken.value}`;
      const response = await fetch(url);
      const data = await response.json();
      if (data.results?.length === 20) {
        allQuestions.value = data.results;
        loadNextQuestion();
        success = true;
      }
    } catch (error) {
      console.error("Error fetching questions, retrying...", error);
    }
  }
}

// Shuffle the answers for each question
function shuffleAnswers(question) {
  return [...question.incorrect_answers, question.correct_answer].sort(
    () => Math.random() - 0.5
  );
}

// Load the next question
function loadNextQuestion() {
  if (currentIndex.value < allQuestions.value.length) {
    question.value = allQuestions.value[currentIndex.value];
    shuffledAnswers.value = shuffleAnswers(question.value);
    showResult.value = null;
  }
}

// Check the selected answer
function checkAnswer(selectedAnswer) {
  showResult.value = selectedAnswer === question.value.correct_answer;
}

// Proceed to the next question
function nextQuestion() {
  currentIndex.value++;
  if (currentIndex.value < allQuestions.value.length) {
    loadNextQuestion();
  } else {
    alert("You have completed the quiz!");
  }
}

// Initialize the quiz
async function initializeQuiz() {
  await getSessionToken();
  await fetchQuestions();
  loading.value = false;
}

// Computed properties for checking question types
const isMultipleChoice = computed(() => question.value?.type === "multiple");
const isBoolean = computed(() => question.value?.type === "boolean");

onMounted(initializeQuiz);
</script>

<style scoped>
body {
  background-color: #f7f7f7;
  font-family: "Inter", sans-serif;
}
</style>
