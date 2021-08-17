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
          <p class="text-lg text-red-400">{{ msg.iprice }} <span class="text-xs">港币</span> <span class="text-xs text-gray-500">约{{ (msg.iprice * 0.83).toFixed(1) }}元</span></p>
        </div>
      </div>
    </div>
    <!-- button -->  
    <div class="mt-4 flex items-center justify-end space-x-2.5">
      <!-- 取消订单 -->
      <button
        v-if="item.orderstate === '待付款'" 
        class="text-gray-600 border border-gray-500 text-xs rounded-2xl" 
        style="width: 70px; height: 22px"
        :disabled="cancelDisabled"
        @click="cancelOrders(item.id)"
      >
        取消订单
      </button>
      <!-- 查看订单 -->
      <button
        class="text-red-400 border border-red-400 text-xs rounded-2xl" 
        style="width: 70px; height: 22px"
        @click="toOrderDetail(item.id)"
      >
        查看订单
      </button>
      <!-- 去支付 -->
      <button 
        v-if="item.orderstate === '待付款'" 
        class="text-red-400 border border-red-400 text-xs rounded-2xl" 
        style="width: 70px; height: 22px"
        :disabled="payDisabled"
        @click="toPay(item.id)"
      >
        去支付
      </button>
    </div>    
  </div>
</template>

<script>
import { ref } from 'vue'
import api from '/src/api/index.js'
import { useRouter, useRoute } from 'vue-router'
import { Dialog, Toast } from 'vant'
export default {
  props: {
    list: {
      type: Array,
      required: true
    }
  },
  setup() {
    const router = useRouter()
    // const route = useRoute()
    const cancelDisabled = ref(false)
    const payDisabled = ref(false)
    return {
      // 取消订单
      cancelDisabled,
      cancelOrders(id) {
        cancelDisabled.value = true
        Dialog.confirm({ 
          title: '确定要取消该订单吗?',
          confirmButtonText: '确定取消', 
          cancelButtonText: '暂不取消'
        }).then(() => {
          api.delete("/order/delete",{ orderid: id }).then((res)=>{  
            if(res.data.code === 20000) {
              Toast.success('取消成功') 
              router.go(0)  
            }
          })
        }).catch(() => {cancelDisabled.value = false })
      },
      // 查看订单
      toOrderDetail(id) {
        router.push({ path: '/myorder/detail', query: { id: id } })
      },
      // 去支付 
      payDisabled,
      toPay(id) {
        payDisabled.value = true
        api.post("/pay/orderinfo",{ orderid: id }, true).then((res) => {
          window.location.href = res.data.data.alipayurl
          payDisabled.value = false
        })
      }
    }
  }
}
</script>

<style>

</style>