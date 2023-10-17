<template>
    <div class="mb-3 p-2 border-2 border-solid border-emerald-400 w-60 h-30 ">
      <span> @ {{ student?.name }} {{ student?.surname }} </span>
      <h4  class="text-center font-semibold">{{ student?.gpa }}</h4>
    </div>
  </template>
  
  <script setup lang="ts">
  import type { StudentItem } from '@/type'
  import type { PropType } from 'vue'
  const props = defineProps({
    student: {
      type: Object as PropType<StudentItem>,
      require: true
    }
  })
  </script>
  
  <style scoped>
  .event-card {
    padding: 20px;
    width: 250px;
    cursor: pointer;
    border: 1px solid #39495c;
    margin-bottom: 18px;
  }
  
  .event-card:hover {
    transform: scale(1.01);
    box-shadow: 0 3px 12 px 0 rgba(0, 0, 0, 0.2);
  }
  </style>
  