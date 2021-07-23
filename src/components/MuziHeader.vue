<template>
  <header class="fixed top-0 max-w-md w-full bg-red-400 h-12 px-4 py-2 flex items-center z-50">
    <img src="/src/assets/images/logo.png" class="w-1/4 h-full">
    <!-- search -->
    <div class="ml-5 w-4/6 h-full">
      <router-link to="/search">
        <div class="w-full h-full flex items-center px-3 bg-white rounded-2xl">
          <p class="text-xs">搜索药品、品牌</p>
          <img src="/src/assets/images/search.png" class="w-4 h-4 ml-auto text-gray-500">
        </div>
      </router-link>
    </div>
  </header>
</template>

<script>
export default {

}
</script>
