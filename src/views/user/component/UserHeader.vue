<template>
  <header class="bg-red-400 h-12 px-4 py-2 flex items-center z-50">
    <p class="text-lg text-white">我的</p>
    <div class="ml-auto flex items-center space-x-4">
      <!-- 消息 -->
      <router-link to="/user/msg">
        <van-image src="/src/assets/images/user/notice.png" width="19" height="22" lazy-load fit="cover" class="flex-shrink-0" />
      </router-link>
      <!-- 设置 -->
      <router-link to="/user/set">
        <van-image src="/src/assets/images/user/set.png" width="22" height="20" lazy-load fit="cover" class="flex-shrink-0" />
      </router-link>
    </div>
  </header>
</template>
