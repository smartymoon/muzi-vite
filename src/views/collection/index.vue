<template>
  <div class="relative pt-12 min-h-screen">
    <muzi-header title="我的收藏" />
    <div v-show="showLoading" class="text-center py-5">
      <van-loading size="30">加载中,请稍后...</van-loading>
    </div>
    <div v-show="!showLoading && list.length > 0" class="p-4">
      <div class="w-full grid grid-cols-2 gap-x-4 gap-y-3">
        <div v-for="(item, index) in list" :key="index">
          <muzi-card :msg="item.product" @click="toDetail(item.itargetid)" />
        </div>
      </div>
    </div>
    <!-- empty -->
    <van-empty v-show="!showLoading && list.length === 0" description="收藏列表为空" class="mt-36" />
  </div>
</template>

<script>
import { ref } from 'vue'
import api from '/src/api/index.js'
import { useRouter } from 'vue-router'
import MuziHeader from '/src/components/MuziHeader.vue'
import MuziCard from '../../components/MuziCard.vue'
export default {
  components: {
    MuziHeader,
    MuziCard
  },
  setup() {
    const router = useRouter()
    const showLoading = ref(true)
    const list = ref([])
    api.get("/myfavorite/getListCollect",{ userid: sessionStorage.getItem('id') }).then((res)=>{
      list.value = res.data.data
      showLoading.value = false
    })
    return {
      showLoading,
      list,
      toDetail(id) { router.push({ path: '/detail/'+ id }) }
    }
  }
}
</script>