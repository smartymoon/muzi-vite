<template>
  <section class="p-4 rounded-2xl bg-white">
    <!-- title -->
    <div class="flex items-center space-x-1.5">
      <div class="w-1 h-4 rounded bg-red-400"/>
      <h2 class="font-bold">产品详情</h2>
    </div>
    <!-- content -->
    <div class="mt-4">
      <van-image width="100%" height="100%" :src="img" lazy-load>
        <template v-slot:loading>
          <van-loading type="spinner" size="20" />
        </template>
      </van-image>
    </div>
  </section>
</template>

<script>
export default {
  props: {
    img: {
      type: String,
      default: ''
    }
  }
}
</script>
