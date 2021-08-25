<template>
  <div class="relative pt-12 min-h-screen">
    <muzi-header title="优惠券" />
    <van-coupon-list
      :coupons="coupon.list"
      enabled-title="可用优惠券"
      disabled-title="不可使用优惠券"
      :disabled-coupons="coupon.noList"
      :show-exchange-bar="false"
      :show-close-button="false"
    />
  </div>
</template>

<script>
import { reactive } from 'vue'
import api from '/src/api/index.js'
import MuziHeader from '/src/components/MuziHeader.vue'
export default {
  components: {
    MuziHeader
  },
  setup() {
    const coupon = reactive({
      count: 0,
      list: [],
      noList: []
    })
    api.get('/quan/getList_Canuse', {userid: sessionStorage.getItem('id')}).then((res) => {
      for(let i = 0; i < res.data.data.length; i++) {
        coupon.list[i] = {}
        coupon.list[i].id = res.data.data[i].id
        coupon.list[i].name = res.data.data[i].quanname
        coupon.list[i].value = res.data.data[i].quanvalue * 100
        coupon.list[i].valueDesc = String(res.data.data[i].quanvalue)
        coupon.list[i].unitDesc = 'HK$'
        coupon.list[i].description= '使用范围：全平台'
        coupon.list[i].startAt = Date.parse(res.data.data[i].dinserttime)/1000
        coupon.list[i].endAt = Date.parse(res.data.data[i].dendtime)/1000
      }
    })
    api.get('/quan/getList_Cannotuse', {userid: sessionStorage.getItem('id')}).then((res) => {
      for(let i = 0; i < res.data.data.length; i++) {
        coupon.noList[i] = {}
        coupon.noList[i].id = res.data.data[i].id
        coupon.noList[i].name = res.data.data[i].quanname
        coupon.noList[i].value = res.data.data[i].quanvalue * 100
        coupon.noList[i].valueDesc = String(res.data.data[i].quanvalue)
        coupon.noList[i].unitDesc = 'HK$'
        coupon.noList[i].description= '不可使用'
        coupon.noList[i].startAt = Date.parse(res.data.data[i].dinserttime)/1000
        coupon.noList[i].endAt = Date.parse(res.data.data[i].dendtime)/1000
      }
    })
    return {
      coupon
    }
  }
}
</script>

<style>
.van-coupon-list__empty img {
  margin-left: auto;
  margin-right: auto;
}
</style>