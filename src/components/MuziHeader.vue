<template>
  <header class="fixed top-0 max-w-md w-full bg-red-400 h-12 px-4 py-2 flex items-center z-50">
    <img v-if="showLogo" src="/src/assets/images/header_logo.png" class="w-1/4 h-full">
    <div v-else @click="back">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
      </svg>
    </div>
    <!-- search -->
    <div v-if="!title" class="ml-5 flex-grow w-full h-full">
      <router-link to="/search">
      </router-link>
      <div class="w-full h-full flex items-center px-3 bg-white rounded-2xl" @click="search">
        <p class="text-xs">{{ placeholder }}</p>
        <img src="/src/assets/images/search.png" class="w-4 h-4 ml-auto text-gray-500">
      </div>
    </div>
    <!-- title -->
    <div v-if="title" class="mx-auto">
      <p class="-ml-6 text-lg text-white">{{ title }}</p>
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
    title: {
      type: String,
      default:''
    },
    backUrl: {
      type: String,
      default:''
    },
    placeholder: {
      type: String,
      default: '搜索药品、品牌'
    }
  },
  setup(props) {
    const router = useRouter()
    const path = useRoute().path
    return {
      path, 
      back() { props.backUrl ? router.push({ path: props.backUrl }) : router.go(-1) },
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
