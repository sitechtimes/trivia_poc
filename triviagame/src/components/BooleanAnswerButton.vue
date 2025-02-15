<template>
  <button
    :class="[
      'px-6 py-3 text-lg font-medium text-white rounded-lg shadow-md transition-colors duration-200 ease-in-out',
      {
        'bg-green-600 hover:bg-green-700': value === 'True' && !disabled,
        'bg-red-600 hover:bg-red-700': value === 'False' && !disabled,
      },
      { 'bg-gray-300 cursor-not-allowed': disabled },
    ]"
    :disabled="disabled"
    @click="$emit('click')"
    v-html="value"
  ></button>
</template>
  
  <script setup>
defineProps({
  value: String,
  disabled: Boolean,
});
</script>
  