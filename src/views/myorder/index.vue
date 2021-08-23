<template>
  <div class="relative py-12 min-h-screen">
    <muzi-header title="我的订单" />
    <van-tabs v-model:active="active" @change="onChange">
      <van-tab v-for="(item, index) in tabTitles" :name="item.id" :key="index" :title="item.title">
        <div v-if="showLoading" class="text-center py-4">
          <van-loading size="30">加载中,请稍后...</van-loading>
        </div>
        <div v-if="list.length > 0" class="mt-3.5 space-y-3.5">
          <order-card :list="list" />
        </div>
        <div v-if="list.length === 0 && !showLoading" class="mt-36">
          <van-empty description="暂无订单" />
        </div>
        <p v-if="!showLoading && list.length !== 0" class="text-sm text-center py-4 text-gray-500">没有更多了~</p>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import { reactive, ref, watch } from 'vue'
import api from '/src/api/index.js'
import { useRouter, useRoute } from 'vue-router'
import MuziHeader from '/src/components/MuziHeader.vue'
import OrderCard from './component/OrderCard.vue'
export default {
  components: {
    MuziHeader,
    OrderCard
  },
  setup() {
    const router = useRouter()
    const route = useRoute()
    const showLoading = ref(true)
    const active = ref(route.query.status)
    const list = ref([])
    const getList = () => {
      api.get('/order/getpages',{ userid: sessionStorage.getItem('id'), state: route.query.status }).then((res) => {
        if(res.data.code === 20000) { 
          list.value = res.data.data
        }
        showLoading.value = false
      })
    }
    getList()
    watch(() => route.query.status,(value) => {
      showLoading.value = true
      getList()
    })
    const tabTitles = [
      { title: '全部', id: '0' },
      { title: '待付款', id: '1' },
      { title: '待发货', id: '2' },
      { title: '待收货', id: '3' },
      { title: '待评价', id: '5' }
    ]
    
    return {
      showLoading,
      tabTitles,
      list,
      getList,
      active,
      onChange(value) {
        // router.push({ path: '/myorder', query: { status: value } })
        router.replace('/myorder?status=' + value)
      }
    }
  }
}
</script>