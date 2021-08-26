<template>
  <div>
    <div class="flex justify-between">
      <p class="text-sm">优惠券</p>
      <p 
        :class="coupon.count > 0 ? 'text-sm':'text-gray-400 text-sm'" 
        @click="clickCoupon"
      >
        {{ couponText }} <van-icon v-show="coupon.count > 0" name="arrow" />
      </p>
    </div>
    <van-popup
      v-model:show="showCoupon"
      round
      position="bottom"
    >
      <van-coupon-list
        :coupons="coupon.list"
        :disabled-coupons="coupon.noList"
        :chosen-coupon="coupon.chosenCoupon"
        :show-exchange-bar="false"
        @change="onChange"
      />
    </van-popup>
  </div>
</template>

<script>
import { ref, reactive } from 'vue'
import api from '/src/api/index.js'
import { Popup } from 'vant'
export default {
  components: {
    [Popup.name]:Popup
  },
  emits:['change', 'cancel'],
  setup(props, { slots, attrs, emit }) {
    // 优惠券
    const showCoupon = ref(false)
    const coupon = reactive({
      count: 0,
      chosenCoupon: -1,
      list: [],
      noList: []
    })
    const couponText = ref('暂无可用优惠券')
    api.get('/quan/getcount_Canuse', {userid: sessionStorage.getItem('id')}).then((res) => {
      coupon.count = res.data.data
      if(res.data.data > 0) {
        couponText.value = res.data.data + '张可用'
      }
    })
    return {
      showCoupon,
      coupon,
      couponText,
      clickCoupon() {
        if(coupon.count > 0) {
          showCoupon.value = true
          // 获取可用优惠券列表
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
          // 获取不可用优惠券列表
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
        }
      },
      onChange(index) {
        if(index === -1) {
          emit('cancel')
          couponText.value = coupon.count + '张可用'
        } else {
          emit('change', coupon.list[index].value / 100, coupon.list[index].id)
          couponText.value = coupon.list[index].name
        }
        showCoupon.value = false
        coupon.chosenCoupon = index
      }
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