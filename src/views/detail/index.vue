<template>
  <div class="min-h-screen relative">
    <!-- 轮播图 -->
    <base-square>
      <div class="w-full h-full bg-white">
        <van-swipe class="w-full h-full bg-gray-400" :autoplay="3000" indicator-color="#f23030" lazy-render>
          <van-swipe-item v-for="image in banners" :key="image" class="w-full h-full">
            <img :src="image" class="w-full h-full" />
          </van-swipe-item>
        </van-swipe>
      </div>
    </base-square>
    <!-- main -->
    <main class="space-y-3.5">
      <!-- info -->
      <section class="p-4 rounded-b-2xl bg-white">
        <div class="py-0.5">
          <h1 class="font-bold">{{ info.stitle }}</h1>
        </div>
      </section>
    </main>
  </div>
</template>

<script>
import { ref } from 'vue';
import api from '../../api/index.js'
import { useRoute } from 'vue-router'
import BaseSquare from '../../components/global/BaseSquare.vue'
export default {
  components: {
    BaseSquare
  },
  setup() {
    // 获取轮播图
    const banners = ref([])
    api.get("/open/product_detail/get_product_images",{ id: useRoute().query.id }).then((res)=>{ 
      banners.value = res.data.data
    })
    
    // 获取详情信息
    const info = ref({})
    api.get("/open/product_detail/get_product_info",{ id: useRoute().query.id }).then((res)=>{ 
      info.value = res.data.data
    })

    // 获取详情图
    const detailImg = ref(null)
    api.get("/open/product_detail/get_product_detail_image",{ productId: useRoute().query.id }).then((res)=>{ 
      detailImg.value = res.data.data.simage
    })

    return {
      banners,
      info,
      detailImg
    }
  }
}
</script>

<style>

</style>