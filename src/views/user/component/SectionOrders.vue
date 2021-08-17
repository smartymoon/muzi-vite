<template>
  <section class="w-full h-20 bg-white rounded-xl flex items-center justify-around">

    <!-- 待付款 -->
    <router-link to="/myorder?status=1" class="w-1/5 text-center">
      <van-image width="30" height="26" :src="waitPayCountImg" lazy-load class="relative">
        <div
          v-if="waitPayCount" 
          class="absolute right-0 top-0 -mt-1.5 -mr-2.5 px-0.5 rounded-full bg-red-400 text-xs text-white leading-3"
          style="min-width: 0.75rem"
        >
          {{ waitPayCount }}
        </div>
      </van-image>
      <p class="text-xs">待付款</p>
    </router-link>
    <div class="w-px h-5 bg-gray-300" />

    <!-- 待发货 -->
    <router-link to="/myorder?status=2" class="w-1/5 text-center">
      <van-image width="30" height="30" :src="waitSendCountImg" lazy-load class="relative">
        <div
          v-if="waitSendCount" 
          class="absolute right-0 top-0 -mt-1.5 -mr-2.5 px-0.5 rounded-full bg-red-400 text-xs text-white leading-3"
          style="min-width: 0.75rem"
        >
          {{ waitSendCount }}
        </div>
      </van-image>
      <p class="text-xs">待发货</p>
    </router-link>
    <div class="w-px h-5 bg-gray-300" />

    <!-- 待收货 -->
    <router-link to="/myorder?status=3" class="w-1/5 text-center">
      <van-image width="30" height="27" :src="waitReceiptCountImg" lazy-load class="relative">
        <div
          v-if="waitReceiptCount" 
          class="absolute right-0 top-0 -mt-1.5 -mr-2.5 px-0.5 rounded-full bg-red-400 text-xs text-white leading-3"
          style="min-width: 0.75rem"
        >
          {{ waitReceiptCount }}
        </div>
      </van-image>
      <p class="text-xs">待收货</p>
    </router-link>
    <div class="w-px h-5 bg-gray-300" />

    <!-- 待评价 -->
    <router-link to="/myorder?status=5" class="w-1/5 text-center">
      <van-image width="27" height="23" :src="waitCommentsCountImg" lazy-load class="relative">
        <div
          v-if="waitCommentsCount" 
          class="absolute right-0 top-0 -mt-1.5 -mr-2.5 px-0.5 rounded-full bg-red-400 text-xs text-white leading-3"
          style="min-width: 0.75rem"
        >
          {{ waitCommentsCount }}
        </div>
      </van-image>
      <p class="text-xs">待评价</p>
    </router-link>
    <div class="w-px h-5 bg-gray-300" />

    <!-- 退款/售后 -->
    <router-link to="/myorder?status=0" class="w-1/5 text-center">
      <van-image width="28" height="26" :src="waitRefundCountImg" lazy-load class="relative">
        <div
          v-if="waitRefundCount" 
          class="absolute right-0 top-0 -mt-1.5 -mr-2.5 px-0.5 rounded-full bg-red-400 text-xs text-white leading-3"
          style="min-width: 0.75rem"
        >
          {{ waitRefundCount }}
        </div>
      </van-image>
      <p class="text-xs">退款/售后</p>
    </router-link>
  </section>
</template>

<script>
import waitPayCountImg from '../../../assets/images/user/待付款.jpg'
import waitSendCountImg from '../../../assets/images/user/待发货.jpg'
import waitReceiptCountImg from '../../../assets/images/user/待收货.jpg'
import waitCommentsCountImg from '../../../assets/images/user/待评价.jpg'
import waitRefundCountImg from '../../../assets/images/user/售后.jpg'
export default {
  props: {
    waitPayCount: {
      type: Number,
      defalut: 0
    },
    waitSendCount: {
      type: Number,
      defalut: 0
    },
    waitReceiptCount: {
      type: Number,
      defalut: 0
    },
    waitCommentsCount: {
      type: Number,
      defalut: 0
    },
    waitRefundCount: {
      type: Number,
      defalut: 0
    }
  },
  setup() {
    return {
      waitPayCountImg,
      waitSendCountImg,
      waitReceiptCountImg,
      waitCommentsCountImg,
      waitRefundCountImg
    }
  }
}
</script>
