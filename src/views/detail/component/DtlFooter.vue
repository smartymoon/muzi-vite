<template>
  <van-action-bar class="pl-2 pr-1" style="box-shadow: 0px -1px 0px 0px #E6E6E6;">
    <van-action-bar-icon icon="cart-o" text="购物车" />
    <van-action-bar-icon 
      :icon="collected ? 'star' : 'star-o'" 
      :text="collected ? '已收藏' : '收藏'" 
      :color="collected ? '#ff5000':'' "
      @click="collect" 
    />
    <van-action-bar-button type="warning" text="加入购物车" />
    <van-action-bar-button type="danger" text="立即购买" />
  </van-action-bar>
</template>

<script>
import { ref } from 'vue'
export default {
  setup() {
    const collected = ref(false)
    return {
      collected,
      collect() { collected.value = !collected.value }
    }
  }
}
</script>
