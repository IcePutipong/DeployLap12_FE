<script setup lang="ts">
import { useEventStore } from '@/stores/event';
import { storeToRefs } from 'pinia';
import { ref } from 'vue';

const store = useEventStore()
const event = storeToRefs(store).event
const id = ref(event?.value?.id)

</script>
<template>
    <div class="m-2 border-t-2 border-emerald-400"/>
    <div v-if="event" class="text-center" >
        <h1 class=" text-emerald-500 font-bold font-mono text-xl">{{ event.title }}</h1>
        <div class="font-mono text-lg">
            <router-link :to="{ name: 'event-detail', params: { id } }"
            > Details </router-link> 
            |
            <router-link :to="{ name: 'event-register', params: {id} }"
            > Register </router-link>
            |
            <router-link :to="{ name: 'event-edit', params: {id} }"
            > Edit </router-link>

        </div>
        
        <RouterView :event="event"></RouterView>
    </div>
</template>