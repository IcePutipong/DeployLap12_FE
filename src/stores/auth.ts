import { defineStore } from "pinia";
import axios from "axios";
import type { AxiosInstance } from "axios";
import type { Organizer } from "@/type";

const apiClient: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
})

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: null as string | null,
    user: null as Organizer | null
  }),
  getters: {
    currentUserName(): string {
      return this.user?.name || ''
    },
    isAdmin(): boolean {
      return this.user?.roles.includes('ROLE_ADMIN') || false
    }
  },
  actions: {
    login(email: string, password: string) {
      return apiClient
        .post('/api/v1/auth/authenticate', {
          username: email,
          password: password
        })
        .then((res) => {
          this.token = res.data.access_token
          ///SUS Line
          this.user = res.data.user
          localStorage.setItem('access_token', this.token as string)
          localStorage.setItem('user', JSON.stringify(this.user))
          return res
        })
    },
    logout() {
      console.log('logout')
      this.token = null
      this.user = null
      localStorage.removeItem('access_token')
      localStorage.removeItem('user')
    },
    reload(token: string, user: Organizer) {
      this.token = token
      this.user = user
    },
    register(
      email: string,
      password: string,
      username: string,
      firstname: string,
      lastname: string

    ) {
      return apiClient
        .post('/api/v1/auth/register', {
          username,
          email,
          password,
          firstname,
          lastname
        })
        .then((res) => {
          this.token = res.data.access_token
          console.log(res.data.user)
          this.user = {
            id: res.data.user.id,
            name: res.data.user.name,
            address: res.data.user.address,
            images: res.data.user.images,
            roles: res.data.user.roles
          } as unknown as Organizer
          localStorage.setItem('access_token', this.token as string)
          localStorage.setItem('user', JSON.stringify(this.user))
          return res
        })
    }
  }
})