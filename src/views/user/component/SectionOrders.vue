<template>
  <section class="w-full h-20 bg-white rounded-xl flex items-center justify-around">

     <!-- 全部订单 -->
    <router-link to="/myorder?status=0" class="w-1/5 text-center">
      <van-image width="30" height="28" :src="allOrderImg" lazy-load class="relative"></van-image>
      <p class="text-xs">全部订单</p>
    </router-link>
     <div class="w-px h-5 bg-gray-300" />

    <!-- 待付款 -->
    <router-link to="/myorder?status=1" class="w-1/5 text-center">
      <van-badge :content="waitPayCount">
        <van-image width="30" height="26" :src="waitPayImg" lazy-load></van-image>
      </van-badge>
      <p class="text-xs">待付款</p>
    </router-link>
    <div class="w-px h-5 bg-gray-300" />

    <!-- 待发货 -->
    <router-link to="/myorder?status=2" class="w-1/5 text-center">
      <van-badge :content="waitSendCount">
        <van-image width="30" height="30" :src="waitSendImg" lazy-load />
      </van-badge>
      <p class="text-xs">待发货</p>
    </router-link>
    <div class="w-px h-5 bg-gray-300" />

    <!-- 待收货 -->
    <router-link to="/myorder?status=3" class="w-1/5 text-center">
      <van-badge :content="waitReceiptCount">
        <van-image width="30" height="27" :src="waitReceiptImg" lazy-load />
      </van-badge>
      <p class="text-xs">待收货</p>
    </router-link>
    <div class="w-px h-5 bg-gray-300" />

    <!-- 待评价 -->
    <router-link to="/myorder?status=5" class="w-1/5 text-center">
      <van-badge :content="waitCommentsCount">
        <van-image width="27" height="23" :src="waitCommentsImg" lazy-load />
      </van-badge>
      <p class="text-xs">待评价</p>
    </router-link>

  </section>
</template>

<script>
import waitPayImg from '../../../assets/images/user/待付款.jpg'
import waitSendImg from '../../../assets/images/user/待发货.jpg'
import waitReceiptImg from '../../../assets/images/user/待收货.jpg'
import waitCommentsImg from '../../../assets/images/user/待评价.jpg'
import waitRefundCountImg from '../../../assets/images/user/售后.jpg'
import allOrderImg from '../../../assets/images/user/全部订单.jpg'
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
    AllCount: {
      type: Number,
      defalut: 0
    }
  },
  setup() {
    return {
      waitPayImg,
      waitSendImg,
      waitReceiptImg,
      waitCommentsImg,
      waitRefundCountImg,
      allOrderImg
    }
  }
}
</script>
