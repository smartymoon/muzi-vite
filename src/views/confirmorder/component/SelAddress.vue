<template>
  <router-link to="/address">
    <section class="py-4 pl-4 pr-11 bg-white rounded-b-2xl relative"> 
      <div v-if="hasAddress">
        <div class="flex items-center mb-2">
          <p>{{ addressMsg.slinkman }} {{ addressMsg.smobile }}</p>
          <button v-show="addressMsg.itype === 2" class="ml-2 block bg-red-400 rounded-full text-xs px-1 text-white -mt-0.5">默认</button>
        </div>
        <div 
          class="max-h-9 overflow-hidden overflow-ellipsis" 
          style="display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; font-size:13px; line-height:18px"
        >
          {{ addressMsg.saddressname }} {{ addressMsg.sdetail }} 
        </div>
      </div>
      <p v-else class="ml-1">请先填写收货地址</p>
      <div class="absolute text-xl" style="top:50%; right:16px; transform: translate(0, -50%);">
        <van-icon name="arrow" color="#969799" />
      </div>
    </section>
  </router-link>
</template>

<script>
import { ref } from 'vue'
import api from '/src/api/index.js'
export default {
  emits:['show'],
  setup(props, { slots, attrs, emit }) {
    const hasAddress = ref(false)
    const addressMsg = ref({})
    let addressObj = { 
      url: '/useraddress/getdefault', 
      data: { userid: sessionStorage.getItem('id') }
    }
    if (sessionStorage.getItem('addressId')) { 
      addressObj.url = '/useraddress/get', 
      addressObj.data = { addressid:sessionStorage.getItem('addressId')}
    }
    api.get(addressObj.url, addressObj.data ).then((res) => {
      if(res.data.code === 20000) {
        hasAddress.value = true
        Object.assign(addressMsg.value, res.data.data)
        sessionStorage.setItem('addressId',res.data.data.id)
      }
      if(res.data.code === 20001) { emit('show')}
    })
    return {
      hasAddress,
      addressMsg
    }
  }
}
</script>
