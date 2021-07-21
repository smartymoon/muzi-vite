<template>
  <header class="w-full bg-red-400 h-12 px-4 flex items-center py-2">
    <van-image width="25%" height="100%" src="/src/assets/images/logo.png" lazy-load />
    <div class="ml-5 w-4/6 h-full bg-white rounded-2xl text-right flex items-center px-3">
      <p class="text-xs">搜索药品、品牌</p>
      <img src="/src/assets/images/search.png" class="w-4 h-4 ml-auto text-gray-500">
    </div>
  </header>
  <van-tabs 
    v-model:active="active" 
    background="#f23030" 
    color="#FFFFFF" 
    line-width="50"
    title-inactive-color="#FFFFFF"
    title-active-color="#FFFFFF"
  >
    <van-tab v-for="(item,index) in tabTitles" :key="index" :title="item.title">内容 1</van-tab>
  </van-tabs>
</template>

<script>
import { ref } from 'vue';
export default {
  setup() {
    const active = ref(0)
    const tabTitles = [
      { title: '首页', id: 0 },
      { title: '日本药品馆', id: 0 },
      { title: '韩国药品馆', id: 0 },
      { title: '泰国药品馆', id: 0 },
      { title: '新加坡药品馆', id: 0 },
      { title: '印度药品馆', id: 0 },
    ]
    return {
      active,
      tabTitles
    }
  }
}
</script>

<style>
  .van-tab--active {
    font-size: 1rem;
    font-weight: bold;
  }
</style>