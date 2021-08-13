<template>
  <!-- 关于我们 -->
  <div class="relative pt-14 bg-white">
    <muzi-header :title="title" />
    <div v-show="showLoading" class="text-center py-5">
      <van-loading size="30">加载中,请稍后...</van-loading>
    </div>
    <div
      v-show="!showLoading" 
      v-html="content" 
      class="overflow-x-hidden px-4 text-center space-y-3 flex flex-col items-center justify-center"
    />
  </div>
</template>

<script>
import { ref } from 'vue'
import api from '../../../api/index.js'
import { useRoute } from 'vue-router'
import MuziHeader from '/src/components/MuziHeader.vue'
export default {
  components: {
    MuziHeader
  },
  setup() {
    const route = useRoute()
    const showLoading = ref(true)
    const title = route.query.title
    const content = ref('')
    api.get('/open/article/get', {salias: route.query.content}).then((res) => {
      content.value = res.data.data.scontent
      showLoading.value = false
    })
    return {
      showLoading,
      title,
      content
    }
  }
}
</script>
