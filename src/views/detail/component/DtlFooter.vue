<template>
  <van-action-bar class="pl-2 pr-1" style="box-shadow: 0px -1px 0px 0px #E6E6E6;">
    <router-link to="/cart">
      <van-action-bar-icon icon="cart-o" text="购物车" />
    </router-link>
    <van-action-bar-icon 
      :icon="collected ? 'star' : 'star-o'" 
      :text="collected ? '已收藏' : '收藏'" 
      :color="collected ? '#ff5000':'' "
      @click="collect" 
    />
    <van-action-bar-button type="warning" text="加入购物车" :loading="cartLoading" @click="addCart" />
    <van-action-bar-button type="danger" text="立即购买" @click="buy" />
  </van-action-bar>
</template>

<script>
import { ref, watch } from 'vue'
import { Dialog,Toast } from 'vant'
import api from '/src/api/index.js'
import { useRouter, useRoute } from 'vue-router'
export default {
  props: {
    iscollect: {
      type: Boolean,
      default: false
    }
  },
  setup(props) {
    const router = useRouter()
    const route = useRoute()
    const collected = ref(props.iscollect)
    watch(() => props.iscollect,(value) => {
      collected.value = value
    })
    const collectedLoading = ref(false)
    const cartLoading = ref(false)
    return {
      collected,
      // 收藏
      collect() {
        let data = {userid: sessionStorage.getItem('id'), productid: route.params.id} 
        if (!collectedLoading.value) {
          collectedLoading.value = true
          if (!collected.value) {
            api.post("/myfavorite/postCollect", data, true).then((res) => { 
              if(res.data.code === 20000) { 
                collected.value = true
                Toast.success('收藏成功')
              } else { Toast.fail('添加收藏失败')}
              setTimeout( () => { collectedLoading.value = false }, 500 )
            })
          } else {
            api.delete("/myfavorite/deleteCollect",data).then((res)=>{ 
              if(res.data.code === 20000) {
                collected.value = false
                Toast.success('取消收藏成功') 
              } else { Toast.fail('取消收藏失败')}
              setTimeout( () => { collectedLoading.value = false }, 500 )
            })
          }
        }
      },

      // 加入购物车
      cartLoading,
      addCart() {
        cartLoading.value = true
        if(!sessionStorage.getItem('token')) {
          Dialog.alert({
            message: '您还未登录，请先登录'
          }).then(() => {
            sessionStorage.setItem('loginFrom',route.path)
            setTimeout( () => { cartLoading.value = false }, 500 )
            router.push({ path:'/login' })
          });
        } else {
          let data = {userid: sessionStorage.getItem('id'), productid: route.params.id} 
          api.post("/cart/post", data, true).then((res) => {
            if(res.data.code === 20000) { 
              Toast.success('加入成功') 
              setTimeout( () => { cartLoading.value = false }, 500 )
            } else {
              Toast.fail('加入购物车失败')
              setTimeout( () => { cartLoading.value = false }, 500 )
            }
          })
        }
      },
      buy() {
        if(!sessionStorage.getItem('token')) {
          Dialog.alert({
            message: '您还未登录，请先登录'
          }).then(() => {
            sessionStorage.setItem('loginFrom',route.path)
            setTimeout( () => { cartLoading.value = false }, 500 )
            router.push({ path:'/login' })
          });
        } else {
          if(sessionStorage.getItem('shiming') === '0') {
            Dialog.alert({ message: '您还未实名认证，请先认证喲~' }).then(() => {
              sessionStorage.setItem('shimingFrom', route.path) 
              router.push({ path:'/shiming' }) 
            })
          } else {
            sessionStorage.setItem('drugId', route.params.id)
            router.push({ path:'/confirmorder' })
          }
        }
      }
    }
  }
}
</script>
