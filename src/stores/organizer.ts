import type { Organizer } from '@/type'
import { defineStore } from 'pinia'
export const useOrganizer = defineStore('organizer', {
    state: () => ({
        organizer: null as Organizer | null
    }),
    actions: {
        setOrganizer(organizer: Organizer) {
            this.organizer = organizer
        }
    }
})
