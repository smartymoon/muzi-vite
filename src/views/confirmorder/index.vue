<template>
  <div class="relative pt-12 pb-16 min-h-screen">
    <!-- header -->
    <muzi-header title="确认订单" customBack @back="back" />
    <main class="space-y-3.5">
      <!-- address -->
      <sel-address @show="showAddressDialog" />

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
                <p 
                  class="mt-1 text-red-400 text-lg leading-5" 
                  @click="toDetail(card.proid)"
                > 
                  {{ card.iprice }}<span class="text-xs ml-0.5">港币</span>
                  <span class="text-xs ml-0.5 text-gray-500">约{{ (card.iprice * 0.83).toFixed(1) }}元</span>
                </p>
                <van-stepper v-model="card.icount" button-size="25" max="999" class="mt-2" @change="changeStepper(card.id, card.icount)" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- price -->
      <section class="p-4 bg-white rounded-2xl space-y-3.5">
        <!-- 商品金额 -->
        <div class="flex justify-between text-sm">
          <p>商品金额</p>
          <p>{{ price }}港币</p>
        </div>
        <!-- 运费 -->
        <div v-show="freight !== 0" class="flex justify-between text-sm">
          <p>运费</p>
          <p>{{ freight }}港币</p>
        </div>
        <!-- 税费 -->
        <div class="flex justify-between text-sm">
          <p>税费</p>
          <p>{{ tax }}港币</p>
        </div>
        <!-- 优惠券列表 -->
        <coupon-list @change="changeCoupon" @cancel="cancelCoupon" />
        <!-- 会员优惠 -->
        <div v-show="vipOffers !== 0" class="flex justify-between text-sm">
          <p>会员优惠</p>
          <p>-{{ vipOffers }}港币</p>
        </div>
        <!-- 同意委托 -->
        <div class="flex justify-end items-center text-xs">
          <van-checkbox v-model="checkedProxy" icon-size="14px" checked-color="#f23030">
            <p class="tracking-tighter">本人同意并接受</p>
          </van-checkbox>
          <p class="text-red-400" @click="showProxy">《进口个人申报委托》</p>
        </div>
      </section>

      <!-- 支付方式 -->
      <section class="p-4 bg-white rounded-2xl flex items-center justify-between">
        <p class="text-sm">支付方式</p>
        <van-image width="90" height="35" src="http://www.muzimed.com/images/base/zhifu-alipay.png" fit="cover" round lazy-load />
      </section>
    </main>

    <!-- 提交订单 -->
    <van-submit-bar
      class="border-t max-w-md" 
      currency="HK$"
      :price="totalPrice"
      :disabled="submitDisbled"
      button-text="去结算"
      @submit="onSubmit"
    />
    <van-dialog v-model:show="hasAddressDialog" message="您还未设置收货地址，请填写收货地址" @confirm="confirmDialog" />
  </div>
</template>

<script>
import { computed, reactive, ref } from 'vue'
import api from '../../api/index.js'
import { Dialog } from 'vant'
import { useRouter, useRoute } from 'vue-router'
import MuziHeader from '../../components/MuziHeader.vue'
import SelAddress from './component/SelAddress.vue'
import CouponList from "./component/CouponList.vue"
export default {
  components: {
    MuziHeader,
    SelAddress,
    CouponList
  },
  setup() {
    const router = useRouter()
    const route = useRoute()
    console.log(sessionStorage.getItem('orderList'))
    const submitDisbled = ref(true)
    setTimeout( () => { submitDisbled.value = false }, 200 )
    
    // 订单详情
    const orderList = ref({carts:[]})
    let orderObj = { url: '/pay/buynow', data: { userid: sessionStorage.getItem('id'), pid: sessionStorage.getItem('drugId') } }
    if (sessionStorage.getItem('orderList')) {
      orderObj.url = '/pay/confirmorder'
      orderObj.data = { userid: sessionStorage.getItem('id'), cartids: sessionStorage.getItem('orderList') }
    }
    api.get(orderObj.url, orderObj.data).then((res) => {
      console.log(res.data) 
      if(res.data.code === 20000) {
        orderList.value = Object.assign(orderList.value, res.data.data)
      }
    })

    // 价格
    const price = computed(() => {
      let p = 0
      orderList.value.carts.forEach((item) => {
        item.productMain.forEach((i) => {
          p += i.iprice * i.icount
        })
      })
      return p
    })

    // 运费
    const freight = computed(() => {
      if(orderList.value.vip === 2) { 
        return 0
      } else {
        if(price.value < 500) {
          return 65
        } else if  (price.value > 700) {
          return 0
        } else {
          return 20
        }
      }
    })

    // 税费
    const tax = computed(() => { return Math.ceil(price.value * 0.5) / 10 })

    // 优惠券
    const coupon = ref(0)
    const couponId = ref(null)
    const changeCoupon = (price, id) => { 
      coupon.value = price
      couponId.value = id 
    }
    const cancelCoupon = () => { 
      coupon.value = 0 
      couponId.value = null  
    }

    // 会员优惠
    const vipOffers = computed(() => {
      if (orderList.value.vip) {
        return ( price.value * ( orderList.value.vip / 10 ) ).toFixed(1)
      } else { return 0 }
    })

    // 总价
    const totalPrice = computed(() => {
      return (price.value + freight.value + tax.value - coupon.value - vipOffers.value) * 100
    })

    // 勾选委托书
    const checkedProxy = ref(true)

    const hasAddressDialog = ref(false)

    return {
      submitDisbled,
      back() {
        Dialog.confirm({ 
          confirmButtonText: '继续支付', 
          cancelButtonText: '暂时放弃', 
          title: '确定要放弃付款吗?' 
        }).then(() => {
          // ……
        }).catch(() => {
          router.go(-1)
        })
      },
      orderList,
      toDetail(id) { router.push({ path: '/detail/'+ id }) },
      // 增减数量
      changeStepper(id, count) {
        if (sessionStorage.getItem('orderList')) {
          api.put("/cart/putcount",{ cartid: id, count:count })
        } else {
          api.get("/pay/buynowchange",{ 
            userid: sessionStorage.getItem('id'),
            pid: sessionStorage.getItem('drugId'),
            count: count
          }).then((res) => { 
            console.log('cartRes',res)
          })
        }
      },
      price,
      freight,
      tax,
      coupon,
      couponId,
      changeCoupon,
      cancelCoupon,
      vipOffers,
      totalPrice,
      checkedProxy,
      hasAddressDialog,
      showAddressDialog() { hasAddressDialog.value = true },
      confirmDialog() {
        sessionStorage.setItem('addressFrom', route.path)
        router.push({ path: '/address/edit', query: { operation: 'creat' } }) 
      },
      showProxy() {
        Dialog({ confirmButtonText: '关闭', title: '进口个人申报委托', message: '本人承诺所购买商品系个人合理自用，不会进行二次销售，针对境外（包括保税区等特殊监管区域）发货的各种商品，现委托商家或其委托的物流商代理申报、代缴税款等通关事宜，本人保证遵守《海关法》和国家相关法律法规，保证所提供的收件人身份信息和收货信息真实完整，无侵犯他人权益的行为，并督促保证代缴义务人足额支付应缴税款。以上委托关系系如实填写，本人愿意接受海关及其他监管部门的监管，并承担相应法律责任。' })
      },
      onSubmit() {
        submitDisbled.value = true
        if (!checkedProxy.value) {
          submitDisbled.value = false
          Dialog({ title: '请选择同意进口个人申报委托' })
        } else {
          let data = {
            userid: sessionStorage.getItem('id'),
            addressinfo: sessionStorage.getItem('addressId'),
            quaninfo:  couponId.value,
            jifenused: 0,
            cartinfo: orderList.value.cartinfo,
            tprice: totalPrice.value/100
          }
          api.post("/pay/submitorder", data, true).then((res) => { 
            if(res.data.code === 20000) {
              api.post("/pay/orderinfo",{ orderid: res.data.data.orderid }, true).then((res) => {
                window.location.href = res.data.data.alipayurl
              })
            }
          })
        }
      },
    }
  }
}
</script>