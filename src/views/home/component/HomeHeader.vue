<template>
  <header class="fixed top-0 max-w-md w-full h-12 bg-red-400 z-50 flex items-center px-4 py-2">
    <!-- logo -->
    <van-image
      :src="logoImg" 
      width="82" 
      height="30" 
      lazy-load 
      class="flex-shrink-0 mr-3" 
    />
    <!-- search -->
    <div class="flex-grow h-full">
      <div class="h-full flex items-center space-x-2.5 px-3 bg-white rounded-2xl" @click="search">
        <van-image 
          :src="searchImg" 
          width="18" 
          height="18" 
          lazy-load
          class="flex-shrink-0" 
        />
        <p class="text-xs text-gray-500">搜索药品、品牌</p>
      </div>
    </div>
    <router-link to="/user/msg" class="ml-3 mt-1">
      <van-image :src="noticeImg" width="19" height="22" lazy-load fit="cover" class="flex-shrink-0" />
    </router-link>
  </header>
</template>

<script>
import { useRouter } from 'vue-router'
import logoImg from '../../../assets/images/header_logo.png'
import searchImg from '../../../assets/images/search.png'
import noticeImg from '../../../assets/images/user/notice.png'
export default {
  setup() {
    const router = useRouter()
    return {
      logoImg,
      searchImg,
      noticeImg,
      search() {
        sessionStorage.setItem('searchFrom', '/')
        router.push({ path:'/search' })
      },
    }
  }
}
</script>