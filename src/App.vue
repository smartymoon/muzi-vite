<template>
  <div class="min-h-screen">
    <div class="container max-w-md mx-auto bg-gray-200 text-black font-medium">
      <router-view v-slot="{ Component }">
        <keep-alive>
          <component
            :is="Component"
            v-if="$route.meta.keepAlive"
            key="sss"
            name="abc"
          />
        </keep-alive>
        <component 
          :is="Component"
          v-if="!$route.meta.keepAlive"
        />
      </router-view>
    </div>
  </div>
</template>


<script>
export default {
    setup () {
      console.log(
            'what ever'
        );
  }
}
</script>
