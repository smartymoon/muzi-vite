<template>
  <div>
    test
    <van-button square type="primary" @click="clickButton">方形按钮</van-button>
  </div>
</template>

<script>
import api from '../../api/index.js'
export default {
  setup() {
    return {
      clickButton() {
        api({url: "/open/home/get_nav_class",method: "get"}).then((res)=>{
          console.log(res)
        })
      }
    }
  }
}
</script>

<style>

</style>