<template>
  <div class="relative pt-12 pb-16 min-h-screen">
    <!-- header -->
    <muzi-header title="确认订单" />
    <main class="space-y-3.5">
      <!-- address -->
      <router-link to="/address">
        <section class="py-4 pl-4 pr-11 bg-white rounded-b-2xl relative"> 
          <div v-if="false">
            <div class="flex items-center mb-2">
              <p>安昊程 170****8695</p>
              <button class="ml-2 block bg-red-400 rounded-full text-xs px-1 text-white -mt-0.5">默认</button>
            </div>
            <div style="font-size:13px; line-height:18px">浙江省杭州市西湖区文三路 138 号东方通信大厦 7 楼 501 室</div>
          </div>
          <p class="ml-1">请先填写收货地址</p>
          <div class="absolute text-xl" style="top:50%; right:16px; transform: translate(0, -50%);">
            <van-icon name="arrow" color="#969799" />
          </div>
        </section>
      </router-link>
      <!-- order -->
      <section v-for="(item, index) in orderList.carts" :key="index" class="p-4 bg-white rounded-2xl">
        <p class="text-sm">{{ item.storename }}</p>
         <div class="mt-4 space-y-4">
          <div v-for="(card, idx) in item.productMain" :key="idx">
            <div class="flex items-stretch">
              <van-image width="100" height="100" :src="card.simage1" radius="5" lazy-load class="flex-shrink-0" @click="toDetail(card.proid)">
                <template v-slot:loading>
                  <van-loading type="spinner" size="20" />
                </template>
              </van-image>
              <div class="ml-2.5">
                <p
                  class="h-10 overflow-hidden overflow-ellipsis text-sm" 
                  style="display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical;"
                  @click="toDetail(card.proid)"
                >
                  {{ card.stitle }}
                </p>
                <p class="mt-1 text-red-400"  @click="toDetail(card.proid)"> HK$ {{ card.iprice }}</p>
                <van-stepper v-model="card.icount" button-size="25" max="999" class="mt-2" @change="changeStepper(card.id, card.icount)" />
              </div>
            </div>
          </div>
        </div>
      </section>
      <!-- price -->
      <section class="p-4 bg-white rounded-2xl space-y-3 text-sm">
        <div class="flex justify-between">
          <p>商品金额</p>
          <p>HK$ 112</p>
        </div>
        <div class="flex justify-between">
          <p>运费</p>
          <p>HK$ 112</p>
        </div>
        <div class="flex justify-between">
          <p>税费</p>
          <p>HK$ 112</p>
        </div>
        <div class="flex justify-between">
          <p>优惠券</p>
          <p>请选择优惠券<van-icon name="arrow" /></p>
        </div>
        <div class="flex justify-between">
          <p>会员优惠</p>
          <p>-HK$ 112</p>
        </div>
        <div class="flex justify-end">
          <van-checkbox v-model="checkedProxy" icon-size="14px" checked-color="#f23030">
            <p class="text-xs tracking-tighter">本人同意并接受 <span class="text-red-400">《进口个人申报委托》</span></p>
          </van-checkbox>
        </div>
      </section>
    </main>
    <van-submit-bar
      class="border-t max-w-md" 
      currency="HK$"
      :price="2000" 
      button-text="提交订单" 
      @submit="onSubmit"
    />
  </div>
  <van-dialog v-model:show="showAddressDialog" message="您还未设置收货地址，请设置收货地址" @confirm="confirmDialog" />
</template>

<script>
import { ref } from 'vue'
import api from '../../api/index.js'
import { useRouter, useRoute } from 'vue-router'
import { Dialog } from 'vant'
import MuziHeader from '../../components/MuziHeader.vue'
export default {
  components: {
    MuziHeader
  },
  setup() {
    const router = useRouter()
    const route = useRoute()
    const addressMsg = ref([])
    const showAddressDialog = ref(false)
    api.get("/useraddress/getdefault", { userid: sessionStorage.getItem('id')} ).then((res)=>{ 
      if(res.data.code === 20000) {
        addressMsg.value = res.data.data
      }
      if(res.data.code === 20001) {
        showAddressDialog.value = true
      }
    })

    const orderList = ref([])
    // from detail
    if(sessionStorage.getItem('drugId')) {
      api.get("/pay/buynow", { userid: sessionStorage.getItem('id'), pid: sessionStorage.getItem('drugId') }).then((res)=>{ 
        if(res.data.code === 20000) {
          orderList.value = res.data.data
          console.log(res.data.data)
        }
      })
    }
    // from cart
    if(sessionStorage.getItem('orderList')) {
      api.get("/pay/confirmorder", { userid: sessionStorage.getItem('id'), cartids: sessionStorage.getItem('orderList') }).then((res)=>{ 
        if(res.data.code === 20000) {
          orderList.value = res.data.data
          console.log(res.data.data)
        }
      })
    }

    // 勾选委托书
    const checkedProxy = ref(true)
    return {
      addressMsg,
      showAddressDialog,
      orderList,
      checkedProxy,
      onSubmit() {

      },
      confirmDialog() {
        router.push({ path: '/address/creat' })
      },
    }
  }
}
</script>

<style>
.van-submit-bar {
  left: auto;
}
</style>