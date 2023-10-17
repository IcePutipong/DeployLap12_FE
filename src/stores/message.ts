import { defineStore } from 'pinia'
export const useMessangeStore = defineStore('message', {
    state: () => ({
        message: '' as string
    }),
    actions: {
        updateMessage(message: string) {
            this.message = message
        },
        resetMessage() {
            this.message = ''
        }
    }
})