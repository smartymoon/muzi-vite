<template>
  <div class="relative pt-12 bg-white">
    <!-- header -->
    <muzi-header title="确认订单" />
  </div>
</template>

<script>
import { ref } from 'vue'
import api from '../../api/index.js'
// import { Toast } from 'vant'
import MuziHeader from '../../components/MuziHeader.vue'
export default {
  components: {
    MuziHeader
  },
  setup() {
    const orderList = ref([])
    // from detail
    if(sessionStorage.getItem('drugId')) {
      api.get("/pay/buynow", { userid: sessionStorage.getItem('id'), pid: sessionStorage.getItem('drugId') }).then((res)=>{ 
        if(res.data.code === 20000) orderList.value = res.data.data
      })
    }
    // from cart
    if(sessionStorage.getItem('orderList')) {
      api.get("/pay/confirmorder", { userid: sessionStorage.getItem('id'), cartids: sessionStorage.getItem('orderList') }).then((res)=>{ 
        if(res.data.code === 20000) orderList.value = res.data.data
      })
    }
    return {
      orderList,
    }
  }
}
</script>

<style>

</style>