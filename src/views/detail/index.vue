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
          <van-swipe-item v-for="image in banners" :key="image" class="w-full h-full">
            <img :src="image" class="w-full h-full" />
          </van-swipe-item>
        </van-swipe>
      </div>
    </base-square>

    <!-- main -->
    <main class="space-y-3">
      <!-- info -->
      <section-info :info="info" />
      <!-- cmt -->
      <section-cmt :list="comments" />    
      <!-- more -->
      <section-more :list="moreList" />
      <!-- detailImg -->
      <section-dtl :img="detailImg" />
    </main>

    <!-- footer -->
    <dtl-footer />
  </div>
</template>

<script>
import { ref,watch } from 'vue';
import api from '../../api/index.js'
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
    sessionStorage.removeItem('orderList')
    sessionStorage.setItem('drugId', route.params.id)
    watch(() => route.params, async newParams => { 
      if(newParams.id){
        getDetail()
        swipeRef.value.swipeTo(0)
        window.scrollTo(0,0)
      } 
    })
    // 获取轮播图,详情信息,评论,更多推荐,详情图
    const banners = ref([])
    const info = ref({})
    const comments = ref([])
    const moreList = ref([])
    const detailImg = ref('')

    const getDetail = function() {
      api.get("/open/product_detail/get_product_images",{ id: route.params.id }).then((res)=>{ 
        banners.value = res.data.data
      })
      api.get("/open/product_detail/get_product_info",{ id: route.params.id }).then((res)=>{ 
        info.value = res.data.data
      })
      api.get("/open/product_detail/get_productdetail_comment",{ id: route.params.id }).then((res)=>{ 
        comments.value = res.data.data
      })
      api.get("/open/product_detail/get_product_comment",{ id: route.params.id }).then((res)=>{ 
        moreList.value = res.data.data
      })
      api.get("/open/product_detail/get_product_detail_image",{ productId: route.params.id }).then((res)=>{ 
        detailImg.value = res.data.data.simage
      })
    }
    getDetail()

    return {
      swipeRef,
      back() { router.go(-1) },
      banners,
      info,
      comments,
      moreList,
      detailImg
    }
  }
}
</script>