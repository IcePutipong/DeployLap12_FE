<script setup lang="ts">
import type { Organizer } from '@/type'
import { computed, ref } from 'vue'
import OrganizerService from '@/services/OrganizerService'
import { useRouter } from 'vue-router'
import { useMessangeStore } from '@/stores/message'
import ImageUpload from '@/components/ImageUpload.vue'

const store = useMessangeStore()

const organizer = ref<Organizer>({
  id: 0,
  name: '',
  address: '',
  images: [],
  roles: []
})

const router = useRouter()
function saveOrganizer() {
  OrganizerService.saveOrganizer(organizer.value).then((res) => {
    console.log(res.data)
    router
      .push({
        name: 'organizer-detail',
        params: { id: res.data.id }
      })
      .catch(() => {
        router.push({ name: 'network-error' })
      })

    store.updateMessage('You are successfully add a new organizer for' + res.data.name)
    setTimeout(() => {
      store.resetMessage()
    }, 3000)
  })
}
</script>

<template>
  <div>
    <h1>Add Organizer</h1>
    <form @submit.prevent="saveOrganizer">
      <label>Organizer Name</label>
      <input v-model="organizer.name" type="text" placeholder="Organizer Name" class="field" />
      <h3>Address</h3>
      <input v-model="organizer.address" type="text" placeholder="Address" class="field" />

      <h3>The image of the Event</h3>
      <ImageUpload v-model="organizer.images" />
      <button tyoe="submit">Submit</button>
    </form>
    <pre>{{ organizer }}</pre>
  </div>
</template>
