<template>
  <RouterLink :to="{name: 'event-detail', params: {id: event?.id}}">
      <div class="mb-3 p-2 border-2 border-solid border-emerald-300 w-80 h-28">
          <span class="font-mono"> @{{ event?.time }} on {{ event?.date }} </span>
          <h4 class="text-center font-semibold font-mono">{{ event?.title }}</h4>
          <h5 class="font-mono text-center">By</h5>
          <h5 class="text-center">{{ event?.organizer.name }}</h5>
      </div>
  </RouterLink>
</template>

<script setup lang="ts">
import type { EventItem } from '@/type'
import type { PropType } from 'vue'
const props = defineProps({
  event: {
    type: Object as PropType<EventItem>,
    require: true
  }
})
</script>

<style scoped>
.event-card {
  padding: 20px;
  width: 250px;
  cursor: pointer;
  border: 1px solid #39495c;
  margin-bottom: 18px;
}

.event-card:hover {
  transform: scale(1.01);
  box-shadow: 0 3px 12 px 0 rgba(0, 0, 0, 0.2);
}

.event-link {
  color: #2c3e2c;
  text-decoration: none;
}
</style>
