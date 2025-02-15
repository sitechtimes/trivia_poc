<template>
  <button
    :class="[
      'px-6 py-3 text-lg font-medium text-white rounded-lg shadow-md transition-colors duration-200 ease-in-out',
      {
        'bg-indigo-600 hover:bg-indigo-700': !disabled,
        'bg-indigo-300 cursor-not-allowed': disabled,
      },
    ]"
    :disabled="disabled"
    @click="$emit('click')"
    v-html="answer"
  ></button>
</template>
  
  <script setup>
defineProps({
  answer: String,
  disabled: Boolean,
});
</script>
  