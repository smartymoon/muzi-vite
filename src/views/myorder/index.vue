<template>
  <div class="relative pt-12">
    <muzi-header title="我的订单" />
    <van-tabs v-model:active="active" @change="onChange">
      <van-tab v-for="(item, index) in tabTitles" :name="item.id" :key="index" :title="item.title">
        <base-pagination
          url="/order/getpages"
          :params="params"
          size="10"
        >
          <template v-slot:default="slotProps">
            <div>{{ slotProps.list }}</div>
          </template>
        </base-pagination>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import { ref, watch } from 'vue'
// import api from '/src/api/index.js'
import { useRouter, useRoute } from 'vue-router'
import MuziHeader from '/src/components/MuziHeader.vue'
import BasePagination from '/src/components/global/BasePagination.vue'
export default {
  components: {
    MuziHeader,
    BasePagination
  },
  setup() {
    const router = useRouter()
    const route = useRoute()
    const active = ref(route.query.status === '5' ? '4' : route.query.status)
    const params = {
      userid: sessionStorage.getItem('id'),
      state: 0
    }
    const tabTitles = [
      { title: '全部', id: '0' },
      { title: '待付款', id: '1' },
      { title: '待发货', id: '2' },
      { title: '待收货', id: '3' },
      { title: '待评价', id: '5' }
    ]
    return {
      tabTitles,
      params,
      active,
      onChange(value) {
        params.state = value
      }
    }
  }
}
</script>