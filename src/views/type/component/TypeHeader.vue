<template>
  <header 
    class="fixed top-0 max-w-md w-full h-12 bg-white z-50 flex items-center px-4 py-2"
    style="box-shadow: 0px 1px 0px 0px #E6E6E6;"  
  >
    <!-- search -->
    <div class="flex-grow h-full">
      <div class="h-full flex items-center space-x-2.5 px-3 bg-gray-200 rounded-2xl" @click="search">
        <van-image 
          :src="searchImg" 
          width="18" 
          height="18" 
          lazy-load
          class="flex-shrink-0" 
        />
        <p class="text-xs text-gray-500">请输入您要搜索的药品、品牌</p>
      </div>
    </div>
    <p class="ml-2.5 text-sm flex-shrink-0">搜索</p>
  </header>
</template>

<script>
import { useRouter } from 'vue-router'
import searchImg from '../../../assets/images/search.png'
export default {
  setup() {
    const router = useRouter()
    return {
      searchImg,
      search() {
        sessionStorage.setItem('searchFrom', '/type')
        router.push({ path:'/search' })
      },
    }
  }
}
</script>