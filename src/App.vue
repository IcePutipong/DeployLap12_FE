<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { ref } from 'vue'
import { useMessangeStore } from './stores/message'
import { storeToRefs } from 'pinia'
import { useAuthStore} from './stores/auth'
import { useRouter } from 'vue-router'


const store = useMessangeStore()
const { message } = storeToRefs(store)
const authStore = useAuthStore()
const router = useRouter()
const sizes = ref<number>(2)

function logout() {
  authStore.logout()
  router.push({ name: 'login'})
}

const token = localStorage.getItem('token')
const user = localStorage.getItem('user')
if( token && user) {
  authStore.reload(token, JSON.parse(user))
}else{
  authStore.logout()
}
</script>

<template>
  <div>
    <nav class="flex">
      <ul v-if="!authStore.currentUserName" class="flex navbar-nav ml-auto">
        <li class="nav-item px-2">
          <router-link to="/register" class="nav-link">
            <font-awesome-icon icon="user-plus" /> Sign Up
          </router-link>
        </li>
        <li class="nav-item px-2">
          <router-link to="/login" class="nav-link">
            <font-awesome-icon icon="sign-in-alt"/> Login
          </router-link>
        </li>
      </ul>
      <ul v-if="authStore.currentUserName" class="flex navbar-nav ml-auto">
        <li class="nav-item px-2">
          <router-link  to="/profile" class="nav-link">
            <font-awesome-icon icon="user"/>
            {{ authStore.currentUserName }}
          </router-link>
        </li>
        <li class="nav-item px-2">
          <a class="nav-link hover:cursor-pointer" @click="logout">
            <font-awesome-icon icon="sign-out-alt"/>LogOut
          </a>

        </li>

      </ul>
    </nav>
    <div>
      <img alt="logo" src="@/assets/logo.svg" class="mt-5 m-auto mb-10 object-center h-20 w-28" />
    </div>

    <header class="max-h-screen leading-normal">
      <h4 class="text-center font-bold font-mono text-emerald-500">Putipong Sailen</h4>
      <nav class="sm:flex justify-center items-center ">
        <div class="space-x-2 font-mono">
          <RouterLink :to="{ name: 'EventList' }">Home</RouterLink>
          <RouterLink :to="{ name: 'about' }">About</RouterLink>
          <!-- 4.15 problem  in line 17-->
          <RouterLink :to="{ name: 'organizer' }">Organizer</RouterLink>
          <span v-if="authStore.isAdmin">
            <RouterLink :to="{ name: 'add-event' }">New Event</RouterLink>
          </span>
          <span v-if="authStore.isAdmin">
            <RouterLink :to="{ name: 'add-organizer' }">New Organizer</RouterLink>
          </span>
          <RouterLink :to="{ name: 'student' }">Student</RouterLink>
        </div>
      </nav>

      <div class="bg-emerald-300 transition duration-3000 m-2" v-if="message">
        <h4 class="text-center font-mono">{{ message }}</h4>
      </div>
    </header>
    <RouterView />
    <br />
  </div>
</template>



