<template>
  <br>
  <h1 class="text-center font-bold font-mono text-emerald-500" >Events For Good</h1>
  <br>
  <main  class="flex flex-col items-center">
    <StudentCard v-for="student in students" :student="student" :key="student.id"></StudentCard>
  </main>
</template>

<script setup lang="ts">
import type { StudentItem } from '@/type'
import StudentCard from '@/components/StudentCard.vue'
import { ref, type Ref } from 'vue'
import StuedntService from '@/services/StudentService'

const students: Ref<Array<StudentItem>> = ref([])
StuedntService.getEvent().then((res) => {
  students.value = res.data
})
</script>

<!-- <style scoped></style> -->
