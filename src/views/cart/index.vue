<template>
  <div class="relative pb-28">
    <!-- header -->
    <div class="bg-white h-12 px-4 flex items-center justify-between z-50 rounded-b-2xl">
      <h1 class="text-lg font-bold">购物车</h1>
      <p class="text-sm text-gray-600">管理</p>
    </div>
    <!-- main -->
    <main class="mt-3.5 space-y-3.5">
      <div v-for="(item, index) in carList" :key="index" class="bg-white rounded-2xl p-4">
        <van-checkbox-group v-model="checked" ref="checkboxGroup">
          <van-checkbox :name="'shop' + index"><p class="text-sm ml-2">{{ item.storename }}</p></van-checkbox>
          <div class="mt-4 space-y-4">
            <div v-for="(card, idx) in item.productMain" :key="idx">
              <van-checkbox :name="'card' + index">
                <div class="ml-2 flex items-stretch">
                  <van-image width="100" height="100" :src="card.simage1" radius="5" lazy-load class="flex-shrink-0">
                    <template v-slot:loading>
                      <van-loading type="spinner" size="20" />
                    </template>
                  </van-image>
                  <div class="ml-2.5">
                    <p
                      class="h-10 overflow-hidden overflow-ellipsis text-sm" 
                      style="display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical;"
                    >
                      {{ card.stitle }}
                    </p>
                    <p class="mt-1 text-red-400"> HK$ {{ card.iprice }}</p>
                     <van-stepper v-model="card.icount" class="mt-2" />
                  </div>
                </div>
              </van-checkbox>
            </div>
          </div>
          <!-- 
            <van-checkbox name="b">复选框 b</van-checkbox>
            <van-checkbox name="c">复选框 c</van-checkbox>
          -->          
        </van-checkbox-group>
      </div>
    </main>
    <!-- submit -->
    <van-submit-bar class="mb-12 border-t border-b" currency="HK$" :price="3050" button-text="去结算" @submit="onSubmit">
      <van-checkbox v-model="checked">全选</van-checkbox>
    </van-submit-bar>
    <!-- footer -->
    <muzi-footer :footerIndex="2" />
  </div>
</template>

<script>
import { ref } from 'vue';
import api from '../../api/index.js'
import MuziHeader from '../../components/MuziHeader.vue'
import MuziFooter from '../../components/MuziFooter.vue'
export default {
  components: {
    MuziHeader,
    MuziFooter
  },
  setup() {
    const carList = ref([])
    api.get("/cart/getList",{ userid: localStorage.getItem('id') }).then((res)=>{
      console.log(res.data.data)
      carList.value = res.data.data
    })
    return {
      carList,
      onSubmit() {

      }
    }
  }
}
</script>