<template>
  <div class="relative py-12 bg-white">
    <!-- header -->
    <type-header />
    <!-- loading -->
    <div v-if="showLoading" class="text-center py-4">
      <van-loading size="30">加载中,请稍后...</van-loading>
    </div>
    <div v-if="!showLoading && content.length > 0" class="flex">
      <!-- nav -->
      <div class="h-screen relative" style="width:30%">
        <div class="py-4 space-y-8 fixed w-full" style="max-width:120px">
          <div v-for="i in content.length" :key="i" class="flex items-center justify-center">
            <img v-if="i-1 === sIndex" :src="selImg" class="w-6 h-6">
            <p
              class="text-center text-sm"
              :class="i-1 === sIndex ? 'font-bold -ml-2' : 'font-medium'"
              @click="sIndex = i-1"
            >
              {{content[i-1].sname}}
            </p>
          </div>
        </div>
      </div>
      <div class="w-1 min-h-screen flex-shrink-0" style="background: linear-gradient(90deg, rgba(230, 230, 230, 0.5) 0%, rgba(245, 245, 245, 0) 100%);" />
      <!-- content -->
      <div class="p-4 ml-auto" style="width:70%">
        <base-square ar="39">
          <van-image width="100%" height="100%" :src="countryImg[content[sIndex].scountry]" radius="7" lazy-load>
            <template v-slot:loading>
              <van-loading type="spinner" size="20" />
            </template>
          </van-image>
        </base-square>
        <div v-for="(item,index) in content[sIndex].navClassSecModuleVOList" :key="index" class="mt-4 border-b border-gray-400 last:border-white">
          <div class="pb-5">
            <h2 class="text-sm font-bold">{{ item.title }}</h2>
            <div class="mt-2 grid grid-cols-3 gap-x-2 gap-y-3">
              <div v-for="(msg,idx) in item.content" :key="idx">
                <div @click="toList(content[sIndex].scountry,msg.sfuncid)">
                  <base-square>
                    <van-image width="100%" height="100%" :src="msg.simage" radius="7" fit="cover" lazy-load>
                      <template v-slot:loading>
                        <van-loading type="spinner" size="20" />
                      </template>
                    </van-image>
                  </base-square>
                  <p
                    class="mt-1 h-8 overflow-hidden overflow-ellipsis text-xs" 
                    style="display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical;"
                  >
                    {{ msg.sname }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- footer -->
    <muzi-footer :footerIndex="1" />
  </div>
</template>

<script>
import { ref } from 'vue';
import api from '../../api/index.js'
import { useRouter } from 'vue-router'
import BaseSquare from '../../components/global/BaseSquare.vue'
import japanImg from '../../assets/images/country/01.jpg'
import koreaImg from '../../assets/images/country/02.jpg'
import IndiaImg from '../../assets/images/country/03.jpg'
import thailandImg from '../../assets/images/country/05.jpg'
import singaporeImg from '../../assets/images/country/06.jpg'
import selImg from '../../assets/images/sel.png'
import TypeHeader from './component/TypeHeader.vue'
import MuziHeader from '../../components/MuziHeader.vue'
import MuziFooter from '../../components/MuziFooter.vue'
export default {
  components: {
    BaseSquare,
    MuziHeader,
    TypeHeader,
    MuziFooter
  },
  setup() {
    const router = useRouter()
    const showLoading = ref(true)
    const sIndex = ref(0)
    const content = ref([])
    api.get("/open/home/get_nav_class").then((res)=>{
      console.log(res.data.data)
      content.value = res.data.data
      showLoading.value = false
    })
    const countryImg = {
      '01': japanImg,
      '02': koreaImg,
      '03': IndiaImg,
      '05': thailandImg,
      '06': singaporeImg
    }
    return {
      showLoading,
      countryImg,
      selImg,
      sIndex,
      content,
      toList(countryId,sfuncid) {
        sessionStorage.setItem('searchFrom','/type')
        router.push({ path:'/search/list', query: { countryCode: countryId, secondClass: sfuncid } })
      }
    }
  }
}
</script>