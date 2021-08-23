<template>
  <div class="min-h-screen relative pb-12">

    <!-- back -->
    <div class="fixed top-0 z-50 p-4" @click="back">
      <div class="w-8 h-8 rounded-full flex items-center justify-center" style="background-color:rgba(0,0,0,0.6)">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
        </svg>
      </div>
    </div>

    <!-- 轮播图 -->
    <base-square>
      <div class="w-full h-full bg-white">
        <van-swipe ref="swipeRef" class="w-full h-full bg-gray-400" :autoplay="3000" indicator-color="#f23030" lazy-render>
          <van-swipe-item v-for="(image, index) in data.banners" :key="index" class="w-full h-full">
            <img :src="image" class="w-full h-full" @click="showPreview(index)" />
          </van-swipe-item>
        </van-swipe>
      </div>
    </base-square>

    <!-- main -->
    <main class="space-y-3">
      <!-- info -->
      <section-info :info="data.info" />
      <!-- cmt -->
      <section-cmt :list="data.comments" />
      <!-- more -->
      <section-more :list="data.moreList" />
      <!-- detailImg -->
      <section-dtl :img="data.detailImg" />
    </main>

    <!-- footer -->
    <dtl-footer :iscollect="data.info.iscollect" :icount="data.info.icount" @collect="collect" />

  </div>
</template>

<script>
import { reactive, ref, watch, onMounted } from 'vue';
import api from '../../api/index.js'
import { Toast, ImagePreview } from 'vant'
import { useRoute, useRouter } from 'vue-router'
import BaseSquare from '../../components/global/BaseSquare.vue'
import SectionInfo from './component/SectionInfo.vue'
import SectionCmt from './component/SectionCmt.vue'
import SectionMore from './component/SectionMore.vue'
import SectionDtl from './component/SectionDtl.vue'
import DtlFooter from './component/DtlFooter.vue'
export default {
  components: {
    BaseSquare,
    SectionInfo,
    SectionCmt,
    SectionMore,
    SectionDtl,
    DtlFooter
  },
  setup() {
    const swipeRef = ref(null)
    const router = useRouter()
    const route = useRoute()
    onMounted(() => { sessionStorage.removeItem('addressId') })
    watch(() => route.params, async newParams => {
      if(newParams.id) {
        getDetail()
        swipeRef.value.swipeTo(0)
      } 
    })
    // 获取轮播图,详情信息,评论,更多推荐,详情图
    const data = reactive({
      banners: [],
      info: {},
      comments: [],
      moreList: [],
      detailImg: '',
    })

    const getDetail = function() {
      api.get("/open/product_detail/get_product_images", { id: route.params.id }).then((res)=>{ data.banners = res.data.data })
      api.get("/open/product_detail/get_product_info", { id: route.params.id }).then((res)=>{ 
        if (res.data.data.icount === 0) { Toast.fail('暂无库存') }
        data.info = res.data.data 
      })
      api.get("/open/product_detail/get_productdetail_comment",{ id: route.params.id }).then((res)=>{ data.comments = res.data.data })
      api.get("/open/product_detail/get_product_comment",{ id: route.params.id }).then((res)=>{ data.moreList = res.data.data })
      api.get("/open/product_detail/get_product_detail_image",{ productId: route.params.id }).then((res)=>{ data.detailImg = res.data.data.simage })
    }

    getDetail()
    

    return {
      swipeRef,
      back() { router.go(-1) },
      data,
      showPreview(index) {
        ImagePreview({
          images: data.banners,
          startPosition: index
        })
      },
      collect(value) {
        data.info.iscollect = value
      }
    }
  }
}
</script>