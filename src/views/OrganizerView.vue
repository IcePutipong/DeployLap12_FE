<!-- eslint-disable vue/no-setup-props-destructure -->
<!-- 4.15 problem create this file-->
<script setup lang="ts">
import type { Organizer } from '@/type';
import OrganizerCard from '@/components/OrganizerCard.vue';
import { computed, ref, type Ref } from 'vue';
import OrganizerService from '@/services/OrganizerService';
import { onBeforeRouteUpdate } from 'vue-router';
import type { AxiosResponse } from 'axios';
import router from '@/router';


const organizers: Ref<Array<Organizer>> = ref([])
const totalOrganizer = ref<number>(0)
const props = defineProps({
  page: {
    type: Number,
    required: true
  }
})




const hasNextPage = computed(() => {
  const totalPages = Math.ceil(totalOrganizer.value / 3)
  return props.page.valueOf() < totalPages
  
})

OrganizerService.getOrganizers(3, props.page)
    .then((response: AxiosResponse<Organizer[]>) => {
      organizers.value = response.data
      totalOrganizer.value =
          response.headers['x-total-count']
      console.log(response.data)
    })
    .catch(() => {
      router.push({ name: 'network-error' })
    })

onBeforeRouteUpdate((to, from, next) => {
  const toPage = Number(to.query.page)
  OrganizerService.getOrganizers(3, toPage)
      .then((response: AxiosResponse<Organizer[]>) => {
        organizers.value = response.data
        totalOrganizer.value = response.headers['x-total-count']
        next()
      })
      .catch(() => {
        next({ name: 'NetworkError' })
      })
})
</script>

<template>
  <br>
  <h1 class="text-center font-bold font-mono text-emerald-500" >Events For Good</h1>
  <br>
  <main  class="flex flex-col items-center">
    <OrganizerCard v-for="organizer in organizers" :organizer="organizer" :key="organizer.id"></OrganizerCard>
    <RouterLink :to="{ name: 'organizer', query: { page: page - 1 } }" rel="prev" v-if="page != 1" id="page-prev" class="font-mono">
      Prev Page
    </RouterLink>
    <RouterLink :to="{ name: 'organizer', query: { page: page + 1 } }" rel="prev" v-if="hasNextPage" id="page-next" class="font-mono">
      Next Page
    </RouterLink>
  </main>

</template>


