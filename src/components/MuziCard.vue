<template>
  <div class="w-full rounded-md">
    <base-square>
      <van-image width="100%" height="100%" :src="msg.simage1" lazy-load>
        <template v-slot:loading>
          <van-loading type="spinner" size="20" />
        </template>
      </van-image>
    </base-square>
    <div class="w-full bg-white px-2.5 pt-2 pb-3 rounded-b-md space-y-0.5">
      <p 
        class="h-9 overflow-hidden overflow-ellipsis text-sm" 
        style="display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; line-height:19px"
      >
        {{ msg.stitle }}
      </p>
      <p class="text-red-400 text-lg">
        {{ msg.iprice }}<span class="text-xs ml-0.5">港币</span>
        <span class="text-xs text-gray-500 ml-0.5">约{{ Math.round(msg.iprice * 0.83)  }}元</span>
      </p>
      <div class="flex items-center justify-between text-gray-600 text-xs">
        <p>{{ msg.country }}</p>
        <p>已售{{msg.icountsale}}</p>
      </div>
    </div>
  </div>
</template>

<script>
import BaseSquare from '/src/components/global/BaseSquare.vue'
export default {
  BaseSquare,
  props: {
    msg: {
      type: Object,
      resquired: true
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