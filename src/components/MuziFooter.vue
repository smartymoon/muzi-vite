<template>
  <div 
    class="fixed bottom-0 max-w-md w-full bg-white h-12 py-1.5 grid grid-cols-4 z-50 text-center"
    style="box-shadow: 0px -1px 0px 0px #E6E6E6;"
  >
    <!-- 首页 -->
    <router-link to="/">
      <div class="w-6 h-6 mx-auto">
        <img 
          :src="footerIndex === 0 ? '/src/assets/images/footer/home_s.png':'/src/assets/images/footer/home.png'" 
          alt="" 
          class="w-full h-full"
        >
      </div>
      <p 
        class="text-xs"
        :class="footerIndex === 0 ? 'text-red-400':'text-gray-600'"
      >
        首页
      </p>
    </router-link>
    <!-- 分类 -->
    <router-link to="/type">
      <div class="w-6 h-6 mx-auto">
        <img 
          :src="footerIndex === 1 ? '/src/assets/images/footer/type_s.png':'/src/assets/images/footer/type.png'" 
          alt="" 
          class="w-full h-full"
        >
      </div>
      <p 
        class="text-xs"
        :class="footerIndex === 1 ? 'text-red-400':'text-gray-600'"
      >
        分类
      </p>
    </router-link>
    <!-- 购物车 -->
    <router-link to="/cart">
      <div class="w-6 h-6 mx-auto">
        <img 
          :src="footerIndex === 2 ? '/src/assets/images/footer/cart_s.png':'/src/assets/images/footer/cart.png'" 
          alt="" 
          class="w-full h-full"
        >
      </div>
      <p 
        class="text-xs"
        :class="footerIndex === 2 ? 'text-red-400':'text-gray-600'"
      >
        购物车
      </p>
    </router-link>
    <!-- 我的 -->
    <router-link to="/mine">
      <div class="w-6 h-6 mx-auto">
        <img 
          :src="footerIndex === 3 ? '/src/assets/images/footer/mine_s.png':'/src/assets/images/footer/mine.png'" 
          alt="" 
          class="w-full h-full"
        >
      </div>
      <p 
        class="text-xs"
        :class="footerIndex === 3 ? 'text-red-400':'text-gray-600'"
      >
        我的
      </p>
    </router-link>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useRouter } from "vue-router"
export default {
  props: {
    footerIndex: {
      type: Number,
      default: 0
    }
  }
}
</script>

<style>

</style>