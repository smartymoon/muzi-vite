<template>
  <header class="fixed top-0 max-w-md w-full bg-red-400 h-12 z-50 text-white">
    <div class="w-full h-full flex items-center px-4 py-2 relative z-20">
      <div v-if="showBack" class="absolute left-0 flex items-center px-4" @click="back">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
        </svg>
      </div>
      <!-- logo -->
      <van-image
        v-if="showLogo" 
        src="/src/assets/images/header_logo.png" 
        width="82" 
        height="30" 
        lazy-load 
        class="flex-shrink-0 mr-3" 
      />
      <div v-if="!title" class="flex-grow w-full h-full" :class="showBack ? 'ml-10' : ''">
        <div class="w-full h-full flex items-center space-x-2.5 px-3 bg-white rounded-2xl" @click="search">
          <van-image 
            src="/src/assets/images/search.png" 
            width="18" 
            height="18" 
            lazy-load
            class="flex-shrink-0" 
          />
          <p class="text-xs text-gray-500">{{ placeholder }}</p>
        </div>
      </div>
      <!-- title -->
      <div v-if="title" class="absolute flex items-center" style="left:50%; top:50%; transform: translate(-50%, -50%);">
        <p class="text-lg flex-shrink-0">{{ title }}</p>
      </div>
      <!-- right -->
      <slot />
    </div>
  </header>
</template>

<script>
import { useRouter, useRoute } from 'vue-router'
export default {
  props: {
    showLogo: {
      type: Boolean,
      default: false
    },
    showBack: {
      type: Boolean,
      default: true
    },
    title: {
      type: String,
      default:''
    },
    customBack: {
      type: Boolean,
      default: false
    },
    placeholder: {
      type: String,
      default: '搜索药品、品牌'
    }
  },
  emits: ['back'],
  setup(props,{ slots, attrs, emit }) {
    const router = useRouter()
    const path = useRoute().path
    return {
      path, 
      back() { props.customBack ? emit('back') : router.go(-1) },
      search() {
        if (path !== '/search/list') {
          sessionStorage.setItem('searchFrom',path)
        }
        router.push({ path:'/search' })
      },
    }
  }
}
</script>
