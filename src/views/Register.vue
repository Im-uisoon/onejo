<template>
  <div class="fixed inset-0 flex items-center justify-center bg-transparent z-10">
    <div class="bg-white p-8 rounded-lg w-full max-w-md md:shadow-lg">
      <div class="text-left">
        <p class="text-sm text-gray-500 mb-2">Welcome!</p>
        <h2 class="text-4xl font-bold text-gray-800">Sign up</h2>
      </div>
      <form @submit.prevent="handleRegister" class="mt-6">
        <div class="mb-4">
          <label for="name" class="block text-sm font-medium text-gray-700">Name</label>
          <input type="text" id="name" v-model="name" class="mt-1 w-full p-2 bg-gray-100 rounded-md focus:outline-none focus:ring-1 focus:ring-black" placeholder="Enter your name" required />
        </div>
        <div class="mb-4">
          <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
          <input type="email" id="email" v-model="email" class="mt-1 w-full p-2 bg-gray-100 rounded-md focus:outline-none focus:ring-1 focus:ring-black" placeholder="Enter your email" required :disabled="isEmailVerified" />
          <p v-if="emailError" class="text-red-500 text-sm mt-1">{{ emailError }}</p>
        </div>
        <div class="mb-4">
          <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
          <input type="password" id="password" v-model="password" class="mt-1 w-full p-2 bg-gray-100 rounded-md focus:outline-none focus:ring-1 focus:ring-black" placeholder="Enter your password" required />
        </div>
        <div class="mb-4">
          <label for="confirmPassword" class="block text-sm font-medium text-gray-700">Confirm Password</label>
          <input type="password" id="confirmPassword" v-model="confirmPassword" class="mt-1 w-full p-2 bg-gray-100 rounded-md focus:outline-none focus:ring-1 focus:ring-black" placeholder="Confirm your password" required />
          <p v-if="passwordError" class="text-red-500 text-sm mt-1">{{ passwordError }}</p>
        </div>
        <div class="mb-4" v-if="showVerificationInput">
          <label for="verificationCode" class="block text-sm font-medium text-gray-700">Verification Code</label>
          <input type="text" id="verificationCode" v-model="verificationCode" class="mt-1 w-full p-2 bg-gray-100 rounded-md focus:outline-none focus:ring-1 focus:ring-black" placeholder="Enter verification code" required />
          <button type="button" @click="verifyEmailCode" class="mt-2 w-full bg-gray-200 text-black py-2 rounded-full hover:bg-gray-300 transition" :disabled="isVerifying">
            {{ isVerifying ? 'Verifying...' : 'Submit Code' }}
          </button>
          <p v-if="verificationError" class="text-red-500 text-sm mt-1">{{ verificationError }}</p>
        </div>
        <button type="submit" class="w-full bg-gray-200 text-black py-2 rounded-full hover:bg-gray-300 transition" :disabled="isEmailVerified || isSendingVerification">
          {{ isSendingVerification ? 'Sending...' : 'Done →' }}
        </button>
      </form>
      <p class="mt-4 text-center text-sm text-gray-600">Already have an account? <RouterLink to="/login" class="text-black hover:underline">Login</RouterLink></p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

const name = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const verificationCode = ref('')
const isEmailVerified = ref(false)
const isSendingVerification = ref(false)
const isVerifying = ref(false)
const showVerificationInput = ref(false)
const emailError = ref('')
const passwordError = ref('')
const verificationError = ref('')
const router = useRouter()

const handleRegister = async () => {
  // 비밀번호 교차 인증
  if (password.value !== confirmPassword.value) {
    passwordError.value = '비밀번호가 일치하지 않습니다.'
    return
  }
  passwordError.value = ''

  // 이메일 유효성 검사
  if (!email.value) {
    emailError.value = '이메일을 입력하세요.'
    return
  }

  // 이메일 인증 코드 전송
  isSendingVerification.value = true
  emailError.value = ''
  try {
    await axios.post('/api/send-verification', { email: email.value })
    showVerificationInput.value = true
    emailError.value = '인증 코드를 이메일로 전송했습니다.'
  } catch (error) {
    emailError.value = '이메일 전송에 실패했습니다. 다시 시도하세요.'
  } finally {
    isSendingVerification.value = false
  }
}

const verifyEmailCode = async () => {
  if (!verificationCode.value) {
    verificationError.value = '인증 코드를 입력하세요.'
    return
  }
  isVerifying.value = true
  verificationError.value = ''
  try {
    const response = await axios.post('/api/verify-code', { email: email.value, code: verificationCode.value })
    if (response.data.success) {
      isEmailVerified.value = true
      showVerificationInput.value = false
      emailError.value = '이메일이 성공적으로 인증되었습니다.'
      // 회원가입 완료 처리
      console.log('회원가입 완료:', { name: name.value, email: email.value, password: password.value })
      router.push('/login')
    } else {
      verificationError.value = '잘못된 인증 코드입니다.'
    }
  } catch (error) {
    verificationError.value = '인증에 실패했습니다. 다시 시도하세요.'
  } finally {
    isVerifying.value = false
  }
}
</script>
