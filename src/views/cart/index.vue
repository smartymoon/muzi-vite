<template>
  <div class="relative pb-28 min-h-screen">
    <!-- header -->
    <div class="bg-white h-12 pr-4 pl-2 z-50 rounded-b-2xl">
      <div class="w-full h-full flex items-center justify-between">
        <div class="flex items-center">
          <div class="p-2" @click="back">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
            </svg>
          </div>
          <h1 class="text-lg font-bold">购物车</h1>
        </div>
        <p class="text-sm" @click="edit">{{ editStatus ? '完成': cartList.length > 0 ? '编辑商品' : '' }}</p>
      </div>
    </div>
    <!-- loading -->
    <div v-show="showLoading" class="text-center mt-8">
      <van-loading size="30">加载中,请稍后...</van-loading>
    </div>
    <!-- main -->
    <main v-show="!showLoading" class="mt-3.5 space-y-3.5">
      <div v-for="(shop, index) in cartList" :key="index" class="bg-white rounded-2xl p-4">
        <div class="flex items-center">
          <van-checkbox 
            v-model="shop.checkcountry"
            checked-color="#f23030"
            class="flex-shrink-0"
            @click="checkShop(index,shop.checkcountry)" 
          />
          <p class="text-sm ml-4 truncate">{{ shop.storename }}</p>
        </div>
        <div class="mt-4 space-y-4">
          <div v-for="(card, idx) in shop.productMain" :key="idx">
            <div class="flex items-stretch">
              <van-checkbox
                v-model="card.check"
                :disabled="card.productMaintbl.icount === 0 && !editStatus"
                checked-color="#f23030"
                class="flex-shrink-0"
                @click="checkDrug(index,card.check)" 
              />
              <van-image width="100" height="100" :src="card.simage1" radius="5" lazy-load class="flex-shrink-0 ml-4" @click="toDetail(card.proid)">
                <template v-slot:loading>
                  <van-loading type="spinner" size="20" />
                </template>
              </van-image>
              <div class="ml-2.5 flex-grow">
                <p
                  class="h-10 overflow-hidden overflow-ellipsis text-sm"
                  :class="card.productMaintbl.icount === 0 ? 'text-gray-500':''"
                  style="display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical;"
                  @click="toDetail(card.proid)"
                >
                  {{ card.stitle }}
                </p>
                <p 
                  class="mt-1 text-lg leading-5" 
                  :class="card.productMaintbl.icount === 0 ? 'text-red-300':'text-red-400'"
                  @click="toDetail(card.proid)"
                >
                  {{ card.iprice }} <span class="text-xs">港币</span><span class="text-xs ml-0.5 text-gray-500">约{{ (card.iprice * 0.83).toFixed(1) }}元</span>
                </p>
                <div class="flex items-center">
                  <van-stepper 
                    v-model="card.icount" 
                    button-size="25"
                    max="999" 
                    :disabled="card.productMaintbl.icount === 0"
                    class="mt-2"
                    :before-change="beforeChange"
                    @change="changeStepper(card.id, card.icount)"
                  />
                  <div v-if="card.productMaintbl.icount === 0" class="text-xs text-gray-600 mt-1.5 ml-auto">已售罄</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- empty -->
      <div v-if="cartList.length === 0" class="px-5 py-10 text-center">
        <img :src="emptyImg">
        <router-link to="/">
          <button class="mt-8 w-44 py-2.5 rounded-full bg-red-400 text-white text-sm">去逛逛 >></button>
        </router-link>
      </div>
    </main>
    <van-submit-bar
      v-show="cartList.length > 0" 
      class="mb-12 border-t border-b max-w-md" 
      currency="HK$"
      :disabled="editStatus ? false : totalNum === 0 ? true : false"
      :price="editStatus ? null : totalPrice"
      :button-text="editStatus ? '删除' : '去结算('+ totalNum +')'"
      :loading="submitLoading"
      @submit="onSubmit"
    >
      <van-checkbox v-show="editStatus" v-model="checked" checked-color="#f23030" @click="checkAll(checked)">全选</van-checkbox>
    </van-submit-bar>
    <!-- footer -->
    <muzi-footer :footerIndex="2" />
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue';
import { Dialog, Toast, Checkbox, Stepper } from 'vant'
import { useRouter, useRoute } from 'vue-router'
import api from '../../api/index.js'
import emptyImg from '../../assets/images/cart_empty.png'
import MuziHeader from '../../components/MuziHeader.vue'
import MuziFooter from '../../components/MuziFooter.vue'
export default {
  components: {
    [Checkbox.name]:Checkbox,
    [Stepper.name]:Stepper,
    MuziHeader,
    MuziFooter
  },
  setup() {
    const router = useRouter()
    const route = useRoute()
    onMounted(() => { sessionStorage.removeItem('addressId') })
    const showLoading = ref(true)
    const editStatus = ref(false)
    const cartList = ref([])
    const checked = ref(false)
    const submitLoading = ref(false)
    api.get("/cart/getList",{ userid: sessionStorage.getItem('id') }).then((res) => {
      showLoading.value = false
      if (res.data.code === 20000) {
        cartList.value = res.data.data 
      }
    })
    // 计算总价
    const totalPrice = computed(() => {
      let t = 0
      cartList.value.forEach((item) => {
        item.productMain.forEach((i) => {
          if(i.check) { t += i.iprice * i.icount }  
        })
      })
      return t * 100
    })
    // 计算总数
    const totalNum = computed(() => {
      let n = 0
      cartList.value.forEach((item) => {
        item.productMain.forEach((i) => {
          if(i.check) { n += i.icount }
        })
      })
      return n
    })

    return {
      back() { router.go(-1) },
      emptyImg,
      showLoading,
      editStatus,
      cartList,
      checked,
      totalNum,
      submitLoading,
      // 选择店铺
      checkShop(sIdx,sValue) {
        cartList.value[sIdx].productMain.forEach(item => {
          if(item.productMaintbl.icount > 0 || editStatus.value) { item.check = sValue }
        })
        let c = true
        cartList.value.forEach((item) => { if(!item.checkcountry) c = false })
        checked.value = c
      },
      // 选择药品
      checkDrug(sIdx,dValue) {
        if(!dValue) { 
          cartList.value[sIdx].checkcountry = false 
        } else {
          if (cartList.value[sIdx].productMain.every(item => item.check === true)) { cartList.value[sIdx].checkcountry = true }
        }
        let c = true
        cartList.value.forEach((item) => { if(!item.checkcountry) c = false })
        checked.value = c
      },
      edit() {
        editStatus.value = !editStatus.value
        if(!editStatus.value) {
          cartList.value.forEach(item => {
            item.checkcountry = false
            item.productMain.forEach(i => i.check = false)
          })
        }
      },
      // 全选
      checkAll(checked) {
        cartList.value.forEach(item => {
          item.checkcountry = checked
          item.productMain.forEach(i => i.check = checked)
        })
      },
      // 步进器
      beforeChange() {
        Toast.loading({ message: '修改中', forbidClick: true });
        return new Promise((resolve) => {
          setTimeout(() => {
            Toast.clear();
            resolve(true);
          }, 300);
        });
      },
      changeStepper(id,count) { api.put("/cart/putcount",{ cartid: id, count:count })},

      toDetail(id) { router.push({ path: '/detail/'+ id }) },
      // 去结算
      onSubmit() {
        submitLoading.value = true
        let choiceList = []
        let selCountry = new Set()
        cartList.value.forEach((item, index) => {
          item.productMain.forEach((i,idx) => {
            if(i.check) {
              choiceList.push(i.id)
              selCountry.add(item.countryname)
            }
          })
        })
        if(editStatus.value) {
          Dialog.confirm({
            title:'确认删除选中的商品吗？'
          }).then(() => {
            api.delete("/cart/deleteBatch",{ cartids: choiceList.toString() }).then((res)=>{  router.go(0) })
            setTimeout( () => { submitLoading.value = false }, 200 )
          }).catch(() => { submitLoading.value = false })
        } else {
          if(selCountry.size > 1) {
            Dialog.alert({ title: '不同国家的药品请分开结算哦' })
            submitLoading.value = false
            return
          }
          if(sessionStorage.getItem('shiming') === '0') {
            Dialog.alert({ title: '您还未实名认证，请先认证喲~' }).then(() => {
              submitLoading.value = false
              sessionStorage.setItem('shimingFrom', route.path)  
              router.push({ path:'/shiming' })
            })
          } else {
            sessionStorage.setItem('orderList', choiceList)
            setTimeout( () => { submitLoading.value = false }, 100 )
            router.push({ path:'/confirmorder', query:{ from:'cart' } })
          }
        }
      },
      totalPrice
    }
  }
}
</script>
<style>
.van-submit-bar {
  left: auto;
}
.van-submit-bar__bar {
  justify-content: space-between;
}
</style>