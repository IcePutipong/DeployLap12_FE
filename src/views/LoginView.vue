<template>
    <div class="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div class="sm:mx-auto sm:w-full sm:max-w-sm">
            <img class="mx-auto h-10 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="Your Company"/>
            <h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Sign in to your account</h2>
        </div>
        <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form class="space-y-6" @submit.prevent="onSubmit">
                <div>
                    <label for="email" class="block text-sm font-medium leading-6 text-gray-900">Email address</label>
                    <InputText type="text" v-model="email" :error="errors['email']"></InputText>
                </div>
                <div>
                    <div class="flex items-center justify-between">
                        <label for="password" class="block text-sm font-medium leading-6
                        text-gray-900">Password</label>
                        <div class="text-sm">
                            <a href="#" class="font-semibold text-indigo-600 hover:text-indigo-500">Forgot Password?</a>
                        </div>
                    </div>
                    <InputText type="password" v-model="password" :error="errors['password']"></InputText>
                </div>
                <div>
                    <button type="submit" class="flex w-full justify-center rounded-md bg-indigo-600 px-3
                    py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500
                    focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Sign in</button>
                </div>
            </form>
            <p class="mt-10 text-center text-sm text-gray-500">
                Not a member?
                {{ ' ' }}
                <a href="#" class="font-semibold leading-6 text-indigo-600
                hover:text-indigo-500">Try to register here</a>
            </p>
        </div>
    </div>
</template>
<script setup lang="ts">
import InputText from '@/components/InputText.vue';
import  * as yup from 'yup'
// import { ref } from 'vue'
import { useField, useForm } from 'vee-validate'
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router';
import { useMessangeStore } from '@/stores/message';

const messageStore = useMessangeStore()
const router = useRouter()

const authStore = useAuthStore()

const validationSchema = yup.object({
    email: yup.string().required('The email is required'),
    password: yup.string().required('The password is required')
})
const { errors, handleSubmit } = useForm ({
    validationSchema,
    initialValues: {
        email: '',
        password: ''
    }
})
const { value: email } = useField<string>('email')
const { value: password} = useField<string>('password')
const onSubmit = handleSubmit((values) => {
    authStore.login(values.email, values.password  )
    .then(() => {
        router.push({name:  'EventList' })
    }).catch(() => {
        messageStore.updateMessage('could not login')
        setTimeout(() => {
            messageStore.resetMessage()
        },3000)
    })
})
</script>