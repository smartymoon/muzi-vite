<template>
  <div class="relative py-12">
    <!-- header -->
    <home-header />
    <!-- swiper -->
    <div class="absolute z-20 w-full" style="top:6.5rem">
      <div class="px-4">
        <!-- banner -->
        <van-swipe class="w-full h-40 rounded-md" :autoplay="3000" indicator-color="#f23030" lazy-render>
          <van-swipe-item v-for="image in data.banners" :key="image" class="w-full h-full">
            <img :src="image" class="w-full h-full" />
          </van-swipe-item>
        </van-swipe>
      </div>
    </div>
    <!-- tab -->
    <van-tabs
      v-model:active="active"
      background="#f23030" 
      color="#FFFFFF"
      line-width="50"
      title-inactive-color="#FFFFFF"
      title-active-color="#FFFFFF"
      sticky
      offset-top='47'
      @change="changeTab"
    >
      <van-tab v-for="(item,index) in tabTitles" :key="index" :title="item.title" :name="item.id" class="relative">
        <div v-if="index === 0" class="absolute top-0 w-full bg-red-400" style="height:6.25rem; border-radius: 0 0 48px 48px" />
        <div class="px-4 pt-44">
          <!-- kingkong -->
          <div v-if="index === 0" class="mt-2 w-full bg-white rounded-md p-3">
            <div class="grid grid-cols-5 gap-x-4 gap-y-3 text-center">
              <div v-for="(area,idx) in data.kingkong" :key="idx">
                <div @click="clickNav(area.scode)">
                  <base-square>
                    <van-image width="100%" height="100%" :src="area.image" lazy-load />
                  </base-square>
                  <p class="text-xs mt-1.5">{{area.sname}}</p>
                </div>
              </div>
            </div>
          </div>
          <!-- 热品套餐，自有品牌 -->
          <div v-if="index === 0" class="mt-3 w-full bg-white rounded-md p-3">
            <div class="grid grid-cols-4 gap-3">
              <div class="col-span-2 leading-4 flex items-center">
                <h2>热品套餐</h2>
                <div class="text-xs text-gray-500 ml-auto" @click="clickNav(10)">查看更多></div>
              </div>
              <div class="col-span-2 leading-4 flex items-center">
                <h2>自有品牌</h2>
                <div class="text-xs text-gray-500 ml-auto"  @click="clickNav(2)">查看更多></div>
              </div>
              <div v-for="(msg, idx) in data.hotList" :key="idx">
                <base-square>
                  <van-image width="100%" height="100%" :src="msg.simage1" lazy-load radius="7" @click="toDetail(msg.id)" />
                </base-square>
              </div>
              <div v-for="(msg, idx) in data.brandList" :key="idx">
                <base-square>
                  <van-image width="100%" height="100%" :src="msg.simage1" lazy-load radius="7" @click="toDetail(msg.id)" />
                </base-square>
              </div>
            </div>
          </div>
          <!-- 药品列表 -->
          <div class="mt-3">
            <base-pagination
              :url="url"
              :params="params"
              size="10"
            >
              <template v-slot:default="slotProps">
                <div class="w-full grid grid-cols-2 gap-x-3 gap-y-3">
                  <div v-for="(msg,idx) in slotProps.list" :key="idx">
                    <muzi-card :msg="msg" @click="toDetail(msg.id)" />
                  </div>
                </div>
              </template>
            </base-pagination>
          </div>
        </div>
      </van-tab>
    </van-tabs>
    <!-- toTop -->
    <div
      v-if="showTopIcon"
      class="fixed h-11 w-11 rounded-full text-gray-200 p-2" 
      style="bottom:6rem; right:1rem; background-color:rgba(0,0,0,0.6)"
      @click="toTop"
    >
      <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 11l7-7 7 7M5 19l7-7 7 7" />
      </svg>
    </div>
    <!-- footer -->
    <muzi-footer/>
  </div>
</template>

<script>
import { onMounted, onUnmounted, reactive, ref } from 'vue';
import api from '../../api/index.js'
import { useRouter } from 'vue-router'
import { Swipe, SwipeItem } from 'vant'
import BaseSquare from '../../components/global/BaseSquare.vue'
import BasePagination from '../../components/global/BasePagination.vue'
import HomeHeader from './component/HomeHeader.vue'
import MuziCard from '../../components/MuziCard.vue'
import MuziFooter from '../../components/MuziFooter.vue'
export default {
  components: {
    BaseSquare,
    BasePagination,
    HomeHeader,
    [Swipe.name]:Swipe,
    [SwipeItem.name]:SwipeItem,
    MuziCard,
    MuziFooter
  },
  setup() {
    const router = useRouter()
    const active = ref(0)
    const showTopIcon = ref(false)
    const tabTitles = [
      { title: '首页', id: '00' },
      { title: '日本药品馆', id: '01' },
      { title: '韩国药品馆', id: '02' },
      { title: '泰国药品馆', id: '05' },
      { title: '新加坡药品馆', id: '06' },
      { title: '印度药品馆', id: '03' },
    ]
    const url = ref('/open/home/guess_like')
    const params = ref({})
    const data = reactive({
      banners: [],
      kingkong: [],
      hotList: [],
      brandList: []
    })

    const scrollHandle = function () {
      showTopIcon.value = (window.scrollY > 1000) 
    }

    onMounted(() => {
      //组件挂载时，添加scroll监听
      window.addEventListener("scroll", scrollHandle, false);
    })
    onUnmounted(() => {
      //组件卸载时，停止监听
      window.removeEventListener("scroll", scrollHandle, false);
    })

    // 获取banners
    api.get("/open/home/get_banner").then((res)=>{ data.banners = res.data.data })

    // 获取金刚区
    api.get("/open/home/get_product_class").then((res)=>{ data.kingkong = res.data.data })

    // 获取热品套餐
    api.get("/open/home/get_repin_taocan",{num:2}).then((res)=>{ data.hotList = res.data.data })

    // 获取自有品牌
    api.get("/open/home/get_ziyou_pinpai",{num:2}).then((res)=>{ data.brandList = res.data.data})
    return {
      active,
      tabTitles,
      url,
      params,
      data,
      showTopIcon,
      toTop() { window.scrollTo(0, 0)},
      changeTab(name){
        if (name === '00') {
          url.value = '/open/home/guess_like'
          params.value = {}
        } else {
          url.value = '/open/home/search'
          params.value = { countryCode: name }
        }
      },
      clickNav(scode) {
        sessionStorage.setItem('searchFrom','/')
        router.push({ path: '/search/list', query: { id: scode }})
      },
      toDetail(id) { 
        router.push({ path: '/detail/'+ id }) 
      }
    }
  }
}
</script>

<style>
  .van-tab--active {
    font-size: 1rem;
    font-weight: bold;
  }
</style>