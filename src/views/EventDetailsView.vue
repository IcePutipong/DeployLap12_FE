<script setup lang="ts">
import {ref} from 'vue'
import  type   {Ref} from 'vue'
import   {type EventItem } from '@/type';
import EventService from '@/services/EventService';

const event = ref<EventItem | null> (null)
const props = defineProps({
    id: String
})

    // eslint-disable-next-line vue/no-setup-props-destructure
    EventService.getEventById(Number(props.id))
    .then((response) => {
        event.value = response.data
    }).catch(error => {
        console.log(error)
    })

</script>

<template>
    <div v-if="event">
        <h1>{{ event?.title }}</h1>
        <p>{{ event?.time }} on {{ event?.date }} @ {{ event?.location }}</p>
        <p>{{ event?.description }}</p>
        <div class="flex flex-row flex-wrap justify-center">
            <img v-for="image in event.images" :key="image" :src="image" alt="events image"
            class="border-solid border-gray-200 border-2 rounded p-1 m-1 w-40 hover::shadow-lg"
            />
        </div>
    </div>
    
</template>