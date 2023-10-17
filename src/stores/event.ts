import type { EventItem } from "@/type";
import { defineStore } from "pinia";
import { defineProps } from "vue";
export const useEventStore = defineStore('event', {
    state: () => ({
        event: null as EventItem | null
    }),
    actions: {
        setEvent(event: EventItem){
            this.event = event
        }
    }
})