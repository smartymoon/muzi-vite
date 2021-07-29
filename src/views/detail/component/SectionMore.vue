<template>
  <section v-if="list.length > 0" class="p-4 rounded-2xl bg-white">
    <!-- title -->
    <div class="flex items-center space-x-1.5">
      <div class="w-1 h-4 rounded bg-red-400"/>
      <h2 class="font-bold">更多推荐</h2>
    </div>
    <!-- content -->
    <div class="mt-4 overflow-x-scroll flex items-center space-x-3">
      <div v-for="(item, index) in list" :key="index" class="flex-shrink-0 rounded-md border w-32">
        <router-link :to="'/detail/' + item.id">
          <van-image width="127" height="128" :src="item.simage1" lazy-load>
            <template v-slot:loading>
              <van-loading type="spinner" size="20" />
            </template>
          </van-image>
          <div class="px-2 pb-2">
            <p
              class="h-9 overflow-hidden overflow-ellipsis text-xs" 
              style="display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; line-height:19px"
            >
              {{ item.stitle }}
            </p>
            <p class="text-red-400">HK${{ item.iprice }}</p>
            <div class="flex items-center justify-between text-xs text-gray-600">
              <p>{{ item.country }}</p>
              <p>已售{{ item.icountsale }}</p>
            </div>
          </div>
        </router-link>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  props: {
    list: {
      type: Array,
      required: true
    }
  }
}
</script>
<style>
  .van-image__img{
    border-top-left-radius: 7px;
    border-top-right-radius: 7px;
  }
</style>
