<template>
  <div class="min-h-screen">
    <div class="container max-w-md mx-auto bg-gray-200 text-black font-medium">
      <router-view v-slot="{ Component }">
        <keep-alive>
          <component :is="Component"  v-if="$route.meta.keepAlive"/>
        </keep-alive>
        <component :is="Component"  v-if="!$route.meta.keepAlive"/>
      </router-view>
    </div>
  </div>
</template>
