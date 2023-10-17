<script setup lang="ts">
import type { PropType } from 'vue'
import { type EventItem } from '@/type'

defineProps({
    event: {
        type: Object as PropType<EventItem>,
        require: true
    }
})


</script>

<template>
    <div v-if="event" class="text-center font-mono mt-2">
        <p>{{ event.time }} on {{ event.date }} @ {{ event.location }}</p>
        <p>{{ event.description }}</p>
        <img 
            v-for="image in event.images"
            :key="image"
            :src="image"
            alt=" events image"
        />

    </div>
</template>