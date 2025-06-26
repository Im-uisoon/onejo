<template>
  <header class="bg-blue-500 text-white shadow-md z-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-16">
        <!-- 로고 -->
        <div class="flex-shrink-0">
          <RouterLink to="/" class="text-2xl font-bold">OneJO</RouterLink>
        </div>
        <!-- 내비게이션 메뉴 (PC) -->
        <nav class="hidden md:flex space-x-4">
          <RouterLink
            to="/"
            class="px-3 py-2 rounded-md hover:bg-blue-600 transition"
            active-class="bg-blue-700"
          >
            홈
          </RouterLink>
          <RouterLink
            to="/about"
            class="px-3 py-2 rounded-md hover:bg-blue-600 transition"
            active-class="bg-blue-700"
          >
            소개
          </RouterLink>
        </nav>
        <!-- PC: 로그인/로그아웃 버튼, 모바일: 아이콘 및 메뉴 버튼 -->
        <div class="flex items-center space-x-2">
          <!-- PC: 로그인/로그아웃 버튼 -->
          <div class="hidden md:flex space-x-4">
            <RouterLink
              v-if="!isLoggedIn"
              to="/login"
              class="px-4 py-2 bg-white text-blue-500 rounded-md hover:bg-gray-100"
            >
              로그인
            </RouterLink>
            <button
              v-if="isLoggedIn"
              @click="handleLogout"
              class="px-4 py-2 bg-white text-blue-500 rounded-md hover:bg-gray-100"
            >
              로그아웃
            </button>
          </div>
          <!-- 모바일: 로그인/로그아웃 아이콘 -->
          <RouterLink
            v-if="!isLoggedIn"
            to="/login"
            class="md:hidden p-2 rounded-md hover:bg-blue-600"
          >
            <UserIcon class="h-6 w-6" />
          </RouterLink>
          <button
            v-if="isLoggedIn"
            @click="handleLogout"
            class="md:hidden p-2 rounded-md hover:bg-blue-600"
          >
            <ArrowLeftOnRectangleIcon class="h-6 w-6" />
          </button>
          <!-- 모바일: 메뉴 버튼 -->
          <button
            class="md:hidden p-2 rounded-md hover:bg-blue-600"
            @click="toggleMenu"
          >
            <svg
              class="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                :d="isMenuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'"
              />
            </svg>
          </button>
        </div>
      </div>
      <!-- 모바일 메뉴 -->
      <nav v-if="isMenuOpen" class="md:hidden bg-blue-600 px-4 py-2">
        <RouterLink
          to="/"
          class="block px-3 py-2 rounded-md hover:bg-blue-700"
          active-class="bg-blue-700"
          @click="toggleMenu"
        >
          홈
        </RouterLink>
        <RouterLink
          to="/about"
          class="block px-3 py-2 rounded-md hover:bg-blue-700"
          active-class="bg-blue-700"
          @click="toggleMenu"
        >
          소개
        </RouterLink>
      </nav>
    </div>
  </header>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { UserIcon, ArrowLeftOnRectangleIcon } from '@heroicons/vue/24/solid'

const isLoggedIn = ref(false)
const isMenuOpen = ref(false)
const router = useRouter()

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}

const handleLogout = () => {
  isLoggedIn.value = false
  router.push('/login')
}
</script>