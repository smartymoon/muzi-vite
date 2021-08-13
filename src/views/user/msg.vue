<template>
  <div class="relative min-h-screen flex items-center justify-center">
    <muzi-header title="我的消息" />
    <van-empty description="暂无消息" />
  </div>
</template>

<script>
import MuziHeader from '/src/components/MuziHeader.vue'
export default {
  components: {
    MuziHeader
  }
}
</script>

<style>

</style>