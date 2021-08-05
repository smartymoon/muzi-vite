<template>
  <div class="relative pt-12 pb-16 min-h-screen">
    <!-- header -->
    <muzi-header title="收货地址" />
    <van-address-list
      v-model="chosenAddressId"
      :list="list"
      default-tag-text="默认"
      @add="onAdd"
      @edit="onEdit"
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
    const chosenAddressId = ref('1');
    const list = [
      {
        id: '1',
        name: '张三',
        tel: '13000000000',
        address: '浙江省杭州市西湖区文三路 138 号东方通信大厦 7 楼 501 室',
        isDefault: true,
      },
      {
        id: '2',
        name: '李四',
        tel: '1310000000',
        address: '浙江省杭州市拱墅区莫干山路 50 号',
      },
    ]
    const onAdd = () => router.push({ path: '/address/edit', query: { operation: 'creat' } });
    const onEdit = (item, index) => router.push({ path: '/address/edit', query: { operation: 'edit' } });
    return {
      chosenAddressId,
      list,
      onAdd,
      onEdit
    }
  }
}
</script>