<template>
  <div class="relative py-12 min-h-screen">
    <!-- header -->
    <header 
      class="fixed top-0 max-w-md w-full h-12 bg-white z-50 flex items-center pr-4 py-2"
      style="box-shadow: 0px 1px 0px 0px #E6E6E6;"  
    >
      <!-- back -->
      <div class="px-4" @click="back">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
        </svg>
      </div>
      <!-- search -->
      <div class="flex-grow h-full">
        <div class="h-full flex items-center space-x-2.5 px-3 bg-gray-200 rounded-2xl" @click="search">
          <van-image 
            :src="searchImg" 
            width="18" 
            height="18" 
            lazy-load
            class="flex-shrink-0" 
          />
          <p class="text-xs text-gray-500">{{ params.searchContent ? params.searchContent : '请输入您要搜索的药品、品牌' }}</p>
        </div>
      </div>
      <p class="ml-3 text-sm flex-shrink-0">搜索</p>
    </header>
    <!-- list -->
    <div class="mt-3 px-4">
      <base-pagination
        url="/open/home/search"
        :params="params"
        size="10"
        emptyImg="search"
        descriptionTips="暂无内容"
      >
        <template v-slot:default="slotProps">
          <div class="w-full grid grid-cols-2 gap-x-4 gap-y-3">
            <div v-for="(msg,idx) in slotProps.list" :key="idx">
              <muzi-card :msg="msg"  @click="toDetail(msg.id)" />
            </div>
          </div>
        </template>
      </base-pagination>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import BasePagination from '../../components/global/BasePagination.vue'
import MuziHeader from '../../components/MuziHeader.vue'
import MuziCard from '../../components/MuziCard.vue'
import searchImg from '../../assets/images/search.png'
import { useRoute,useRouter } from 'vue-router'
export default {
  components: {
    BasePagination,
    MuziHeader,
    MuziCard
  },
  setup() {
    const router = useRouter()
    const route = useRoute()
    const params = ref({
      searchContent: route.query.drug,
      sclass: route.query.id,
      countryCode: route.query.countryCode,
      onefunctioncategory:route.query.secondClass
    })
    return {
      searchImg,
      params,
      back() { router.push({ path: sessionStorage.getItem('searchFrom') }) },
      toDetail(id) { router.push({ path: '/detail/'+ id }) },
      search() { router.push({ path:'/search' })}
    }
  }
}
</script>