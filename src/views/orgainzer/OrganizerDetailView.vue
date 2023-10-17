<script setup lang="ts">
import { type Organizer } from '@/type'
import type { PropType } from 'vue'

defineProps({
  organizer: {
    type: Object as PropType<Organizer>,
    require: true
  }
})
</script>

<template>
    <div v-if="organizer" class="text-center font-mono mt-2">
        <p>{{ organizer.id }} on {{ organizer.name }}</p>
        <p>{{ organizer.address }}</p>
        <img 
            v-for="image in organizer.images"
            :key="image"
            :src="image"
            alt=" organizer image"
        />
    </div>
</template>