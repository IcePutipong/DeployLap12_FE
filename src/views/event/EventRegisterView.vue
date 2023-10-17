<script setup lang="ts">
import { type EventItem } from '@/type'
import type { PropType } from 'vue'
import { useRouter } from 'vue-router';
import { useMessangeStore } from '@/stores/message';

const props = defineProps({
    event: {
        type: Object as PropType<EventItem>,
        require: true
    }
})

const router = useRouter()
const store = useMessangeStore()
function register(){
    store.updateMessage('You are successfully registerd for'+ props.event?.title)
    setTimeout(() =>{
        store.resetMessage()
    },3000)
    router.push({
        name: 'event-detail',
        params:{
            id: props.event?.id
        }
    })
}


</script>
<template>
        <p class="text-center font-mono mt-2"> Registration from here </p>
        <button @click="register" class="mt-1 border border-emerald-500 rounded-md w-24 text-emerald-500"> Register ME </button>
</template>
