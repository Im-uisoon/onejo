<template>
  <div class="fixed inset-0 flex items-center justify-center bg-transparent z-10">
    <div class="bg-white p-8 rounded-lg w-full max-w-md md:shadow-lg">
      <h2 class="text-2xl font-bold text-center text-gray-800 mb-6 ">회원가입</h2>
      <form @submit.prevent="handleRegister">
        <div class="mb-4">
          <label for="email" class="block text-sm font-medium text-gray-700">이메일</label>
          <input
            type="email"
            id="email"
            v-model="email"
            class="mt-1 w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="이메일을 입력하세요"
            required
          />
        </div>
        <div class="mb-6">
          <label for="password" class="block text-sm font-medium text-gray-700">비밀번호</label>
          <input
            type="password"
            id="password"
            v-model="password"
            class="mt-1 w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="비밀번호를 입력하세요"
            required
          />
        </div>
        <button
          type="submit"
          class="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition"
        >
          회원가입
        </button>
      </form>
      <p class="mt-4 text-center text-sm text-gray-600">
        이미 계정이 있으신가요? <RouterLink to="/login" class="text-blue-500 hover:underline">로그인</RouterLink>
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const email = ref('')
const password = ref('')
const router = useRouter()

const handleRegister = () => {
  console.log('회원가입 시도:', email.value, password.value)
  router.push('/login')
}
</script>