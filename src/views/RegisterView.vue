<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useMessangeStore } from '@/stores/message'
import { useAuthStore } from '@/stores/auth'
import * as yup from 'yup'
import { useField, useForm } from 'vee-validate'
import InputText from '@/components/InputText.vue'

const router = useRouter()
const authStore = useAuthStore()
const messageStore = useMessangeStore()

const validationSchema = yup.object({
  username: yup.string().required('The email is required'),
  password: yup.string().required('The password is required'),
  firstname: yup.string().required('The firstname is required'),
  lastname: yup.string().required('The lastname is required'),
  email: yup.string().required('The email is required').email()
})

const { errors, handleSubmit } = useForm({
  validationSchema,
  initialValues: {
    username: '',
    password: '',
    firstname: '',
    lastname: '',
    email: ''
  }
})

const { value: email } = useField<string>('email')
const { value: password } = useField<string>('password')
const { value: firstname } = useField<string>('firstname')
const { value: lastname } = useField<string>('lastname')
const { value: username } = useField<string>('username')

const onSubmit = handleSubmit((values) => {
  console.log(values)
  authStore
    .register(values.email, values.password, values.username, values.firstname, values.lastname)
    .then(() => {
      console.log('Register Success')
      router.push({ name: 'event-list' })
    })
    .catch((err) => {
      messageStore.updateMessage('Success')
      router.push({ name: 'login' })
      console.log(err)
      setTimeout(() => {
        messageStore.resetMessage()
      }, 3000)
      // console.log('error', err)
    })
})
</script>

<template>
 <div class="flex min-h-full flex-1 flex-col justify-items-center px-6 py-12 lg:px-8">
    <form action="#" method="POST" @submit.prevent="onSubmit">
      <div class="my-5">
        <h5>Username</h5>
        <InputText type="text" v-model="username" :error="errors['username']"></InputText>
      </div>
      <div class="my-5">
        <h5>Firstname</h5>
        <InputText type="text" v-model="firstname" :error="errors['firstname']"></InputText>
      </div>
      <div class="my-5">
        <h5>Lastname</h5>
        <InputText type="text" v-model="lastname" :error="errors['lastname']"></InputText>
      </div>
      <div class="my-5">
        <h5>Email</h5>
        <InputText type="text" v-model="email" :error="errors['email']"></InputText>
      </div>
      <div class="my-5">
        <h5>Password</h5>
        <InputText type="password" v-model="password" :error="errors['password']"></InputText>
      </div>

      <button
        type="submit"
        class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        Submit
      </button>
    </form>
  </div>

</template>