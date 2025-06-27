<template>
  <div class="fixed inset-0 flex items-center justify-center bg-transparent z-10">
    <div class="bg-white p-8 rounded-lg w-full max-w-md md:shadow-lg">
      <div class="text-left">
        <p class="text-sm text-gray-500 mb-2">Welcome!</p>
        <h2 class="text-4xl font-bold text-gray-800">Login</h2>
      </div>
      <form @submit.prevent="handleLogin" class="mt-6">
        <div class="mb-4">
          <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
          <input type="email" id="email" v-model="email" class="mt-1 w-full p-2 bg-gray-100 rounded-md focus:outline-none focus:ring-1 focus:ring-black" placeholder="Enter your email" required />
        </div>
        <div class="mb-4">
          <div class="flex justify-between">
            <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
            <RouterLink to="/forget" class="block text-sm font-medium text-gray-500 hover:underline">Forget Password?</RouterLink>
          </div>
          <input type="password" id="password" v-model="password" class="mt-1 w-full p-2 bg-gray-100 rounded-md focus:outline-none focus:ring-1 focus:ring-black" placeholder="Enter your password" required />
        </div>
        <button type="submit" class="w-full bg-gray-200 text-black py-2 rounded-full hover:bg-gray-300 transition">Login →</button>
      </form>
      <p class="mt-4 text-center text-sm text-gray-600">Don’t have an account? <RouterLink to="/register" class="text-black hover:underline">Sign up</RouterLink></p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const email = ref('')
const password = ref('')
const router = useRouter()

const handleLogin = () => {
  console.log('로그인 시도:', email.value, password.value)
  router.push('/')
}
</script>
