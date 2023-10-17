<script setup lang="ts">
import { type EventItem } from '@/type'
import {type PropType } from 'vue'
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

function edit(){
  store.updateMessage(' You are Edit succesfully for'+ props.event?.title)
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
  <p class="text-center  font-mono mt-2">Edit the event here</p>
  <button @click="edit" class="mt-1 border border-emerald-500 rounded-md w-24 text-emerald-500">Edit Me</button>
</template>
