<template>
  <div class="relative pt-12 pb-16 min-h-screen">
    <!-- header -->
    <muzi-header title="新建收货地址" />
    <van-address-edit
      :area-list="areaList"
      show-set-default
      :area-columns-placeholder="['请选择', '请选择', '请选择']"
      @save="onSave"
    />
  </div>
</template>

<script>
import { ref } from 'vue'
// import api from '../../api/index.js'
import { useRoute, useRouter } from 'vue-router'
// import { Toast } from 'vant'
import MuziHeader from '../../components/MuziHeader.vue'
export default {
  components: {
    MuziHeader
  },
  setup() {
    const router = useRouter()
    const route = useRoute()
    return {
      areaList
    }
  }
}
</script>