<template>
  <div class="relative min-h-screen pt-12">
    <muzi-header title="商品评价" />
    <main class="space-y-3.5">
      <section class="bg-white py-5 px-1 rounded-b-2xl flex items-center">
        <div class="px-10 py-5 border-r border-gray-300 text-center flex-shrink-0">
          <p class="text-5xl font-bold text-red-400">{{ avg.toFixed(2) }}</p>
          <van-rate v-model="avg" :size="10" allow-half />
        </div>
        <div class="flex-grow px-4 py-2.5 space-y-4 text-sm">
          <div v-for="(item, index) in score" :key="index" class="flex items-center space-x-2.5">
            <p class="flex-shrink-0">{{ item.title }}</p>
            <div class="w-full h-3.5 border rounded-sm border-gray-300" style="max-width:130px">
              <div class="h-full bg-red-400" :style="{width: item.value + '%'}" />
            </div>
            <p class="flex-shrink-0 w-10">{{ item.value }}%</p>
          </div>
        </div>
      </section>
      <section-cmt :list="list" showAll />
    </main>
  </div>
</template>

<script>
import { ref } from 'vue'
import api from '../../api/index.js'
import { useRoute, useRouter } from 'vue-router'
import { Rate } from 'vant'
import MuziHeader from '../../components/MuziHeader.vue'
import SectionCmt from './component/SectionCmt.vue'
export default {
  components: {
    'van-rate':Rate,
    MuziHeader,
    SectionCmt
  },
  setup() {
    const router = useRouter()
    const route = useRoute()
    const avg = ref(0)
    const list = ref([])
    const score = ref([
      { title: '好评', value: 0},
      { title: '一般', value: 0},
      { title: '差评', value: 0}
    ])
    api.get("/open/product_detail/get_productdetail_comment",{ id: route.params.id }).then((res)=>{ 
      if ( res.data.code === 20000 ) {
        console.log(res.data.data)
        list.value = res.data.data
        avg.value = res.data.data.reduce((sum, item) => sum + item.irank, 0) / res.data.data.length
        score.value[0].value = (res.data.data.filter(item => item.irank > 3).length / res.data.data.length).toFixed(2) * 100
        score.value[1].value = (res.data.data.filter(item => item.irank === 3).length / res.data.data.length).toFixed(2) * 100
        score.value[2].value = (res.data.data.filter(item => item.irank < 3).length / res.data.data.length).toFixed(2) * 100
      }
    })
    return {
      avg,
      list,
      score
    }
  }
}
</script>