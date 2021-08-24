<template>
  <div class="relative pt-12 pb-16 min-h-screen">
    <!-- header -->
    <muzi-header title="收货地址" customBack @back="back" />
    <div v-show="showLoading" class="text-center py-5">
      <van-loading size="30">加载中,请稍后...</van-loading>
    </div>
    <van-address-list
      v-show="!showLoading"
      v-model="chosenAddressId"
      :list="list"
      default-tag-text="默认"
      :switchable="switchable"
      @select="onSelect"
      @add="onAdd"
      @edit="onEdit"
    />
  </div>
</template>

<script>
import { ref, watch } from 'vue'
import api from '../../api/index.js'
import { Dialog, AddressList } from 'vant'
import { useRoute, useRouter } from 'vue-router'
import MuziHeader from '../../components/MuziHeader.vue'
export default {
  components: {
    MuziHeader,
    'van-address-list': AddressList
  },
  setup() {
    const router = useRouter()
    const route = useRoute()
    const switchable = ref(!!!route.query.switchable)
    watch(() => route.query.switchable,(value) => {
      switchable.value = !!!value
    })
    const showLoading = ref(true)
    const list = ref([]) 
    const chosenAddressId = ref(sessionStorage.getItem('addressId') ? +sessionStorage.getItem('addressId') : null);
    api.get("useraddress/getList",{ userid: sessionStorage.getItem('id') }).then((res) => {
      console.log(res.data)
      if(res.data.code === 20000) {
        console.log(res.data)
        for(let i = 0; i < res.data.data.length; i++) {
          list.value[i] = {}
          list.value[i].id = res.data.data[i].id
          list.value[i].name = res.data.data[i].slinkman
          list.value[i].tel = res.data.data[i].smobile
          list.value[i].address = res.data.data[i].saddressname + res.data.data[i].sdetail
          if(res.data.data[i].itype === 2) {
            list.value[i].isDefault = true
            if(!sessionStorage.getItem('addressId')) chosenAddressId.value = res.data.data[i].id
          }
        }
      }
      showLoading.value = false
    })
    const onAdd = () => {
      sessionStorage.setItem('addressFrom', route.path)
      router.push({ path: '/address/edit', query: { operation: 'creat' } })
    }
    const onEdit = (item, index) => {
      sessionStorage.setItem('addressFrom', route.path)
      router.push({ path: '/address/edit', query: { operation: 'edit', addressId: item.id, addressLength: list.value.length } })
    }
    const onSelect = (item, index) => {
      chosenAddressId.value = item.id
      sessionStorage.setItem('addressId',item.id)
      router.replace('/confirmorder')
      router.go(-1)
    }
    return {
      switchable,
      showLoading,
      chosenAddressId,
      list,
      back() {
        if(!chosenAddressId.value && switchable.value) {
          Dialog.alert({ message: '请选择一个收货地址' })
        } else {
          router.go(-1)
        }
      },
      onAdd,
      onEdit,
      onSelect,
    }
  }
}
</script>