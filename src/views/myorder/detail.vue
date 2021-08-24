<template>
  <div class="relative py-12 min-h-screen">
    <muzi-header title="订单详情" />

    <!-- top -->
    <div class="w-full h-24 bg-red-400 px-4 flex items-center space-x-4">
      <van-image width="45" height="45" :src="carImg" lazy-load class="flex-shrink-0">
        <template v-slot:loading>
          <van-loading type="spinner" size="20" />
        </template>
      </van-image>
      <div class="text-white space-y-1">
        <p>{{ title }}</p>
        <p class="text-xs">{{ text }}</p>
      </div>
    </div>

    <main class="space-y-3.5">
      <!-- address -->
      <section class="p-4 bg-white rounded-b-2xl">
        <div class="flex items-center mb-2">
          <p>{{ list.name }} {{ list.telephone }}</p>
        </div>
        <div 
          class="max-h-9 overflow-hidden overflow-ellipsis" 
          style="display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; font-size:13px; line-height: 18px"
        >
          {{ list.address }} {{ list.sdetail }}
        </div>
      </section>

      <!-- card -->
      <section v-for="(item, index) in list.carts" :key="index" class="bg-white rounded-2xl p-4">
        <div class="flex items-center text-xs">
          <p>订单号：{{ id }}</p>
          <p class="text-red-400 ml-auto">订单状态：{{ list.orderstate }}</p>
        </div>
        <div v-for="(msg, idx) in item.productMain" :key="idx" class="mt-4 space-y-4">
          <div class="flex items-stretch space-x-2.5">
            <van-image width="100" height="100" radius="7" :src="msg.simage1" lazy-load class="flex-shrink-0">
              <template v-slot:loading>
                <van-loading type="spinner" size="20" />
              </template>
            </van-image>
            <div class="flex-grow text-xs flex flex-col justify-between py-1 relative">
              <p
                class="mt-1 h-8 overflow-hidden overflow-ellipsis text-xs" 
                style="display
                : -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical;"
              >
                {{ msg.stitle }}
              </p>
              <p class="text-gray-500">x{{ msg.icount }}</p>
              <p class="text-lg text-red-400">{{ msg.iprice }} <span class="text-xs">港币</span> <span class="text-xs text-gray-500">约{{ (msg.iprice * 0.83).toFixed(1) }}元</span></p>
              <button
                v-if="list.orderstate === '待评价'"
                class="absolute right-0 border text-xs rounded-2xl" 
                :class="msg.evaluated ? 'text-gray-500 border-gray-500':'border-red-400 text-red-400'"
                style="width: 70px; height: 22px; bottom: 7px"
                :disabled="payDisabled"
                @click="comment(msg.evaluated, msg.proid, msg.stitle, msg.simage1, id)"
              >
                {{ msg.evaluated ? '已评价' : '去评价' }}
              </button>
            </div>
          </div>
        </div>
        <!-- button -->
        <div class="mt-4 flex items-center justify-end space-x-2.5">
          <!-- 取消订单 -->
          <button
            v-if="list.orderstate === '待付款'"
            class="text-gray-600 border border-gray-500 text-xs rounded-2xl"
            style="width: 70px; height: 22px"
            :disabled="cancelDisabled"
            @click="cancelOrders()"
          >
            取消订单
          </button>
          <!-- 去支付 -->
          <button 
            v-if="list.orderstate === '待付款'"
            class="text-red-400 border border-red-400 text-xs rounded-2xl" 
            style="width: 70px; height: 22px"
            :disabled="payDisabled"
            @click="toPay()"
          >
            去支付
          </button>
          <!-- 查看物流 -->
          <button
            v-if="list.orderstate === '待发货' || list.orderstate === '待收货'"
            class="text-red-400 border border-red-400 text-xs rounded-2xl"
            style="width: 70px; height: 22px"
            :disabled="cancelDisabled"
            @click="ship(id,item.productMain[0].simage1, item.productMain.length, list.name, list.telephone, list.address, list.sdetail)"
          >
            查看物流
          </button>
        </div>   
        <p class="mt-4 text-right text-xs text-gray-600">{{ item.productMain.length }}件商品 共{{ list.totalprice }}元</p>
      </section>

      <!-- 订单信息 -->
      <section class="p-4 bg-white rounded-b-2xl">
        <p class="text-sm">订单信息</p>
        <div class="mt-4 space-y-4 text-xs text-gray-600">
          <p>订单编号：{{ id }}</p>
        </div>
      </section>
    </main>

  </div>
</template>

<script>
import { computed, ref } from 'vue'
import api from '/src/api/index.js'
import { Dialog, Toast } from 'vant'
import { useRouter, useRoute } from 'vue-router'
import carImg from '../../assets/images/user/car.png'
import MuziHeader from '../../components/MuziHeader.vue'
export default {
  components: {
    MuziHeader
  },
  setup() {
    const router = useRouter()
    const route = useRoute()
    const list = ref([])
    const id = route.query.id
    api.get("/order/get",{ orderid: id }).then((res) => {
      if(res.data.code === 20000) {
        list.value = res.data.data
      }
    })
    const title = computed(() => {
      if(list.value.orderstate === '待付款') { return '待付款' }
      if(list.value.orderstate === '待发货') { return '待发货' }
      if(list.value.orderstate === '待收货') { return '待收货' }
      if(list.value.orderstate === '待评价') { return '交易成功啦' }
    })
    const text = computed(() => {
      if(list.value.orderstate === '待付款') { return '订单有效期为24小时，请尽快完成订单' }
      if(list.value.orderstate === '待发货') { return '包裹正在揽收' }
      if(list.value.orderstate === '待收货') { return '请留意电话或短信以便及时接收快递' }
      if(list.value.orderstate === '待评价') { return '写评价分享你的购物心情吧' }
    })
    const cancelDisabled = ref(false)
    const payDisabled = ref(false)
    return {
      id,
      carImg,
      list,
      title,
      text,
      cancelDisabled,
      payDisabled,
      // 去评价
      comment(evaluated,id,title,img,orderId) {
        if(!evaluated) {
          router.push({ path:'/comments/' + id, query:{ title: title, img: img, orderId: orderId } })
        }
      },
      // 取消订单
      cancelOrders() {
        cancelDisabled.value = true
        Dialog.confirm({ title: '确定要取消该订单吗?', confirmButtonText: '确定取消', cancelButtonText: '暂不取消'}).then(() => {
          api.delete("/order/delete",{ orderid: id }).then((res)=>{  
            if(res.data.code === 20000) {
              Toast.success('取消成功') 
              router.go(-1)  
            }
          })
        }).catch(() => { cancelDisabled.value = false })
      },
      // 去支付
      toPay() {
        payDisabled.value = true
        api.post("/pay/orderinfo",{ orderid: id }, true).then((res) => {
          window.location.href = res.data.data.alipayurl
          payDisabled.value = false
        })
      },
      // 查看物流 list.name, list.telephone, list.address, list.sdetail
      ship(id, img, sum, name, tel, address, sdetail) {
        router.push({ path:'/ship/' + id, query:{ img: img, sum: sum, name: name, tel: tel, address: address, sdetail: sdetail } })
      }
    }
  }
}
</script>
