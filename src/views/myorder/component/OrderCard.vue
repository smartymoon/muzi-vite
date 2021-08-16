<template>
  <div v-for="(item, index) in list" :key="index" class="bg-white rounded-2xl p-4">
    <div class="flex items-center text-xs">
      <p>订单号：{{ item.id }}</p>
      <p class="text-red-400 ml-auto">订单状态：{{ item.orderstate }}</p>
    </div>
    <div v-for="(msg, idx) in item.orderproducts" :key="idx" class="mt-4 space-y-4">
      <div class="flex items-stretch space-x-2.5">
        <van-image width="100" height="100" radius="7" :src="msg.productimage" lazy-load class="flex-shrink-0">
          <template v-slot:loading>
            <van-loading type="spinner" size="20" />
          </template>
        </van-image>
        <div class="text-xs flex flex-col justify-between py-1">
          <p
            class="mt-1 h-8 overflow-hidden overflow-ellipsis text-xs" 
            style="display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical;"
          >
            {{ msg.productname }}
          </p>
          <p class="text-gray-500">x{{ msg.icount }}</p>
          <p class="text-lg text-red-400">{{ msg.iprice }} <span class="text-xs">港币</span> <span class="text-xs text-gray-500">约{{ (msg.iprice * 0.83).toFixed(1) }}元</span> </p>
        </div>
      </div>
    </div>          
  </div>
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

</style>