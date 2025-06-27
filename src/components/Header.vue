<template>
  <header class="text-gray-800 shadow-md z-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-20">
        <!-- 로고 -->
        <div class="flex-shrink-0">
          <RouterLink to="/" class="text-2xl font-bold">{{ userName }}님의 Note</RouterLink>
        </div>

        <div class="flex items-center">
          <!-- 내비게이션 메뉴 (PC) -->
          <div class="hidden md:flex items-center space-x-4">
            <RouterLink to="/" class="px-3 py-2 hover:border-b-1 hover:border-black transition text-sm rounded-none" active-class="border-b-1 border-black"> Home </RouterLink>
            <RouterLink to="/plan" class="px-3 py-2 hover:border-b-1 hover:border-black transition text-sm rounded-none" active-class="border-b-1 border-black"> Plan </RouterLink>
            <RouterLink to="/community" class="px-3 py-2 hover:border-b-1 hover:border-black transition text-sm rounded-none" active-class="border-b-1 border-black"> Community </RouterLink>
            <RouterLink to="/note" class="px-3 py-2 hover:border-b-1 hover:border-black transition text-sm rounded-none" active-class="border-b-1 border-black"> Note </RouterLink>

            <!-- 로그인/로그아웃 버튼 (PC) -->
            <div v-if="!isLoggedIn" class="flex space-x-2">
              <RouterLink to="/login" class="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 text-sm"> Login </RouterLink>
              <RouterLink to="/register" class="px-4 py-2 border border-blue-500 text-blue-500 rounded-md hover:bg-blue-50 text-sm"> Sign up </RouterLink>
            </div>

            <!-- 사용자 박스 (PC) -->
            <div v-if="isLoggedIn" class="relative">
              <button @click="toggleUserMenu" class="flex items-center space-x-2 px-3 py-2 bg-gray-100 rounded-md hover:bg-gray-200 text-sm">
                <UserIcon class="h-5 w-5" />
                <span>{{ userName }}</span>
              </button>
              <div v-if="isUserMenuOpen" class="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                <button @click="handleLogout" class="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">로그아웃</button>
              </div>
            </div>
          </div>

          <!-- 모바일: 로그인/로그아웃 아이콘 및 메뉴 버튼 -->
          <div class="flex items-center space-x-2 md:hidden">
            <RouterLink v-if="!isLoggedIn" to="/login" class="p-2 rounded-md hover:bg-gray-100">
              <UserIcon class="h-6 w-6" />
            </RouterLink>
            <button v-if="isLoggedIn" @click="handleLogout" class="p-2 rounded-md hover:bg-gray-100">
              <ArrowLeftOnRectangleIcon class="h-6 w-6" />
            </button>
            <button class="md:hidden p-2 rounded-md hover:bg-gray-100" @click="toggleMenu">
              <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="isMenuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <!-- 모바일 메뉴 -->
      <nav v-if="isMenuOpen" class="md:hidden bg-gray-50 px-4 py-2 z-50">
        <RouterLink to="/" class="block px-3 py-2 rounded-md hover:bg-gray-100 text-sm" active-class="bg-gray-200" @click="handleRouterLinkClick"> Home </RouterLink>
        <RouterLink to="/schedule" class="block px-3 py-2 rounded-md hover:bg-gray-100 text-sm" active-class="bg-gray-200" @click="handleRouterLinkClick"> 일정 </RouterLink>
        <RouterLink to="/notes" class="block px-3 py-2 rounded-md hover:bg-gray-100 text-sm" active-class="bg-gray-200" @click="handleRouterLinkClick"> 필기 </RouterLink>

        <!-- 모바일 로그인/회원가입 버튼 -->
        <div v-if="!isLoggedIn" class="mt-2 pt-2 border-t border-gray-200">
          <RouterLink to="/login" class="block px-3 py-2 rounded-md hover:bg-gray-100 text-sm text-blue-500" @click="handleRouterLinkClick"> 로그인 </RouterLink>
          <RouterLink to="/register" class="block px-3 py-2 rounded-md hover:bg-gray-100 text-sm text-blue-500" @click="handleRouterLinkClick"> 회원가입 </RouterLink>
        </div>
      </nav>
    </div>
  </header>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { UserIcon, ArrowLeftOnRectangleIcon } from '@heroicons/vue/24/solid'

const isLoggedIn = ref(false)
const isMenuOpen = ref(false)
const isUserMenuOpen = ref(false)
const userName = ref('사용자')
const router = useRouter()

const toggleMenu = () => {
  console.log('toggleMenu called, isMenuOpen:', isMenuOpen.value)
  isMenuOpen.value = !isMenuOpen.value
}

const handleRouterLinkClick = () => {
  isMenuOpen.value = false
}

const toggleUserMenu = () => {
  isUserMenuOpen.value = !isUserMenuOpen.value
}

const handleLogout = () => {
  isLoggedIn.value = false
  isUserMenuOpen.value = false
  isMenuOpen.value = false
  router.push('/login')
}

const handleClickOutside = (event) => {
  if (!event.target.closest('.relative')) {
    isUserMenuOpen.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>
