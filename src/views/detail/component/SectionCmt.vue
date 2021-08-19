<template>
  <section class="p-4 rounded-2xl bg-white">
    <!-- title -->
    <div class="flex items-center space-x-1.5">
      <div class="w-1 h-4 rounded bg-red-400"/>
      <h2 class="font-bold">评价</h2>
      <p v-if="list.length > 0" class="text-xs text-gray-600">({{list.length}}条)</p>
    </div>
    <!-- content -->
    <div class="mt-4">
      <div v-if="list.length > 0" class="space-y-4">
        <div v-for="(item, index) in list" :key="index">
          <div class="flex items-center space-x-2">
            <van-image width="35" height="35" :src="avatar" round lazy-load />
            <div>
              <p class="text-sm">用户{{ item.userName }}</p>
              <span class="text-xs text-gray-600 mr-1.5">{{ item.time }}</span>
              <van-rate v-model="item.irank" :size="10" color="##f23030" />
            </div>
          </div>
          <p
             v-if="item.smemo"
            class="mt-2 h-10 overflow-hidden overflow-ellipsis text-sm" 
            style="display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical;"
          >
            {{ item.smemo }}  
          </p>
          <div v-else class="mt-2 text-sm">非常满意的一次购物，开心！</div>
        </div>
      </div>
      <div v-else class="text-sm">当前商品暂无评价</div>
    </div>
  </section>
</template>

<script>
import avatar from '../../../assets/images/avatar.png'
export default {
  props: {
    list: {
      type: Array,
      required: true
    }
  },
  setup() {
    return {
      avatar
    }
  }
}
</script>