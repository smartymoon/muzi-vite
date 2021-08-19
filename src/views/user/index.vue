<template>
  <div class="relative min-h-screen pb-16">
    <!-- header -->
    <user-header />
    <!-- top -->
    <div class="w-full h-48 bg-red-400 rounded-b-2xl p-4 text-white">
      <!-- avatar，id，phone，vip -->
      <div class="flex items-center mb-1.5">
        <van-image width="60" height="60" round :src="logoImg" lazy-load>
          <template v-slot:loading>
            <van-loading type="spinner" size="20" />
          </template>
        </van-image>
        <div class="ml-2.5 space-y-0.5">
          <div class="flex items-center space-x-2.5">
            <p class="text-sm text-white">{{ user.userMaintbl.iname }}</p>
            <van-image 
              width="60" 
              height="16" 
              radius="2"
              fit="cover"
              :src="user.userMaintbl.ilevel === 1 ? vipYueImg : vipZunImg" 
              lazy-load 
            />
          </div>
          <p class="text-sm text-white">{{ user.userMaintbl.imobile }}</p>
        </div>
        <div class="ml-auto">
          <van-icon name="arrow" />
        </div>
      </div>
      <div class="py-4 flex items-center justify-around">
        <router-link to="/collection" class="w-1/4 text-center space-y-1">
          <p class="text-xl font-bold truncate">{{ user.collectcount }}</p>
          <p class="text-xs">收藏</p>
        </router-link>
        <div class="w-px h-5 bg-white" />
        <div class="w-1/4 text-center space-y-1">
          <p class="text-xl font-bold truncate">{{ user.brandcount }}</p>
          <p class="text-xs">关注品牌</p>
        </div>
        <div class="w-px h-5 bg-white" />
        <div class="w-1/4 text-center space-y-1">
          <p class="text-xl font-bold truncate">0</p>
          <p class="text-xs">足迹</p>
        </div>
        <div class="w-px h-5 bg-white" />
        <router-link to="/coupon" class="w-1/4 text-center space-y-1">
          <p class="text-xl font-bold truncate">{{ user.quancount }}</p>
          <p class="text-xs">优惠券</p>
        </router-link>
      </div>
    </div>
    <!-- main -->
    <main class="px-4 space-y-3.5">
      <!-- 积分余额 -->
      <section-asset :jifen="user.jifen" :money="user.money" />
      <!-- 订单状态 -->
      <section-orders 
        :waitPayCount="user.daifukuancount"
        :waitSendCount="user.daifahuocount"
        :waitReceiptCount="user.daishouhuocount"
        :waitCommentsCount="user.daipingjiacount"
      />
      <!-- 菜单区域 -->
      <section-menu />
    </main>
    <!-- footer -->
    <muzi-footer :footerIndex="3" />
  </div>
</template>

<script>
import { reactive } from 'vue';
import api from '../../api/index.js'
import logoImg from '../../assets/images/logo.png'
import vipZunImg from '../../assets/images/user/vip_zun.png'
import vipYueImg from '../../assets/images/user/vip_yue.png'
import UserHeader from './component/UserHeader.vue'
import SectionAsset from './component/SectionAsset.vue'
import SectionOrders from './component/SectionOrders.vue'
import SectionMenu from './component/SectionMenu.vue'
import MuziFooter from '../../components/MuziFooter.vue'
export default {
  components: {
    UserHeader,
    SectionAsset,
    SectionOrders,
    SectionMenu,
    MuziFooter
  },
  setup() {
    const user = reactive({ userMaintbl: {} })
    api.get('/myhome/get', { userid: sessionStorage.getItem('id') }).then((res) => {
      console.log('res',res.data.data)
      Object.assign(user, res.data.data)
    })
    return {
      logoImg,
      vipZunImg,
      vipYueImg,
      user
    }
  }
}
</script>