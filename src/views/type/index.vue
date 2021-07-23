<template>
  <div class="relative py-12 bg-white">
    <!-- header -->
    <muzi-header />
    <!-- nav -->
    <div v-if="content.length > 0" class="fixed left-0 bg-gray-200 h-full overflow-y-hidden" style="width:30%">
      <div v-for="i in content.length" :key="i">
        <div 
          class="w-full h-12 flex items-center justify-center text-sm"
          :class="i-1 === sIndex ? 'font-bold bg-white' : 'font-medium'"
          @click="sIndex = i-1"
        >
          {{content[i-1].sname}}
        </div>
      </div>
    </div>
    <!-- content -->
    <div v-if="content.length > 0" class="p-4 ml-auto" style="width:70%">
      <base-square ar="39">
        <van-image width="100%" height="100%" :src="'/src/assets/images/country/'+content[sIndex].scountry+'.png'" radius="7" lazy-load>
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
              <base-square>
                <van-image width="100%" height="100%" :src="msg.simage" radius="7" lazy-load>
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
    <!-- footer -->
    <muzi-footer :footerIndex="1" />
  </div>
</template>

<script>
import { ref } from 'vue';
import api from '../../api/index.js'
import BaseSquare from '../../components/global/BaseSquare.vue'
import MuziHeader from '../../components/MuziHeader.vue'
import MuziFooter from '../../components/MuziFooter.vue'
export default {
  components: {
    BaseSquare,
    MuziHeader,
    MuziFooter
  },
  setup() {
    const sIndex = ref(0)
    const content = ref([])
    api.get("/open/home/get_nav_class").then((res)=>{
      console.log(res.data.data)
      content.value = res.data.data
    })
    return {
      sIndex,
      content
    }
  }
}
</script>