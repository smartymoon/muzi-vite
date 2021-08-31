<template>
  <div class="min-h-screen relative pb-12">

    <!-- back -->
    <div class="fixed top-0 z-50 p-4" @click="back">
      <div class="w-8 h-8 rounded-full flex items-center justify-center" style="background-color:rgba(0,0,0,0.6)">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
        </svg>
      </div>
    </div>

    <!-- 轮播图 -->
    <base-square>
      <div class="w-full h-full bg-white">
        <van-swipe ref="swipeRef" class="w-full h-full bg-gray-400" :autoplay="3000" indicator-color="#f23030" lazy-render>
          <van-swipe-item v-for="(image, index) in msg.banners" :key="index" class="w-full h-full">
            <img :src="image" class="w-full h-full" @click="showPreview(index)" />
          </van-swipe-item>
        </van-swipe>
      </div>
    </base-square>

    <!-- main -->
    <main class="space-y-3">
      <!-- info -->
      <section-info :info="msg.info" />
      <!-- cmt -->
      <section-cmt :list="msg.comments" />
      <!-- more -->
      <section-more :list="msg.moreList" />
      <!-- detailImg -->
      <section-dtl :img="msg.detailImg" />
    </main>

    <van-action-bar class="pl-2 pr-1" style="box-shadow: 0px -1px 0px 0px #E6E6E6;">
      <router-link to="/cart">
        <van-action-bar-icon icon="cart-o" text="购物车" />
      </router-link>
      <van-action-bar-icon 
        :icon="msg.info.iscollect ? 'star' : 'star-o'" 
        :text="msg.info.iscollect ? '已收藏' : '收藏'" 
        :color="msg.info.iscollect ? '#ff5000':'' "
        @click="collect" 
      />
      <van-action-bar-button type="warning" text="加入购物车" :disabled="cartDisabled" @click="addCart" />
      <van-action-bar-button type="danger" text="立即购买" :disabled="buyDisabled" @click="buy" />
    </van-action-bar>
  </div>
</template>

<script>
import { reactive, ref, watch, onMounted } from 'vue';
import api from '../../api/index.js'
import { Toast, ImagePreview, Swipe, SwipeItem, Dialog, ActionBar, ActionBarIcon, ActionBarButton } from 'vant'
import { useRoute, useRouter } from 'vue-router'
import BaseSquare from '../../components/global/BaseSquare.vue'
import SectionInfo from './component/SectionInfo.vue'
import SectionCmt from './component/SectionCmt.vue'
import SectionMore from './component/SectionMore.vue'
import SectionDtl from './component/SectionDtl.vue'
import DtlFooter from './component/DtlFooter.vue'
export default {
  components: {
    [Swipe.name]:Swipe,
    [SwipeItem.name]:SwipeItem,
    [ActionBar.name]:ActionBar,
    [ActionBarIcon.name]:ActionBarIcon,
    [ActionBarButton.name]:ActionBarButton,
    BaseSquare,
    SectionInfo,
    SectionCmt,
    SectionMore,
    SectionDtl,
    DtlFooter
  },
  setup() {
    const swipeRef = ref(null)
    const router = useRouter()
    const route = useRoute()
    onMounted(() => { sessionStorage.removeItem('addressId') })
    watch(() => route.params, async newParams => {
      if(newParams.id) {
        getDetail()
        swipeRef.value.swipeTo(0)
      } 
    })
    // 获取轮播图,详情信息,评论,更多推荐,详情图
    const msg = reactive({
      banners: [],
      info: {},
      comments: [],
      moreList: [],
      detailImg: '',
    })

    const cartDisabled = ref(false)
    const buyDisabled = ref(true)
    const collectedLoading = ref(false)

    const getDetail = function() {
      api.get("/open/product_detail/get_product_images", { id: route.params.id }).then((res) => {
        console.log('banners', res.data) 
        msg.banners = res.data.data 
      })
      api.get("/open/product_detail/get_product_info", { id: route.params.id }).then((res) => {
        console.log('info', res.data)  
        if (res.data.data.icount === 0) { Toast.fail('库存为0') }
        msg.info = res.data.data
        buyDisabled.value = (res.data.data.icount === 0)
      })
      api.get("/open/product_detail/get_productdetail_comment",{ id: route.params.id }).then((res) => {
        console.log('comments', res.data) 
        msg.comments = res.data.data 
      })
      api.get("/open/product_detail/get_product_comment",{ id: route.params.id }).then((res) => {
        console.log('moreList', res.data)
        msg.moreList = res.data.data 
      })
      api.get("/open/product_detail/get_product_detail_image",{ productId: route.params.id }).then((res)=>{
        console.log('dtlImg', res.data)
        msg.detailImg = res.data.data.simage 
      })
    }
    // 获取详情页所有信息
    getDetail()
    // 登录提示
    const loginDialog = function() {
      Dialog.alert({
        message: '您还未登录，请先登录'
      }).then(() => {
        sessionStorage.setItem('loginFrom',route.path)
        cartDisabled.value = false
        router.push({ path:'/login' })
      });
    }
    

    return {
      swipeRef,
      back() { router.go(-1) },
      msg,
      showPreview(index) { ImagePreview({ images: data.banners, startPosition: index }) },
      collectedLoading,
      cartDisabled,
      buyDisabled,
      loginDialog,

      // 收藏，取消收藏
      collect() {
        if (!sessionStorage.getItem('token')) {
          loginDialog()
        } else {
          let data = { userid: sessionStorage.getItem('id'), productid: route.params.id }
          if (!collectedLoading.value) {
            collectedLoading.value = true
            if (!msg.info.iscollect) {
              api.post("/myfavorite/postCollect", data, true).then((res) => {
                if(res.data.code === 20000) {
                  Toast.success('收藏成功')
                  msg.info.iscollect = true
                } else { Toast.fail('添加收藏失败')}
                setTimeout( () => { collectedLoading.value = false }, 500 )
              })
            } else {
              api.delete("/myfavorite/deleteCollect",data).then((res) => { 
                if(res.data.code === 20000) {
                  Toast.success('取消收藏成功')
                  msg.info.iscollect = false
                } else { Toast.fail('取消收藏失败')}
                setTimeout( () => { collectedLoading.value = false }, 500 )
              })
            }
          } 
        }
      },
      // 加入购物车
      addCart() {
        cartDisabled.value = true
        if(!sessionStorage.getItem('token')) {
          loginDialog()
        } else {
          let data = {userid: sessionStorage.getItem('id'), productid: route.params.id} 
          api.post("/cart/post", data, true).then((res) => {
            if(res.data.code === 20000) { 
              Toast.success('加入成功') 
              setTimeout( () => { cartDisabled.value = false }, 500 )
            } else {
              Toast.fail('加入购物车失败')
              setTimeout( () => { cartDisabled.value = false }, 500 )
            }
          })
        }
      },
      // 立即购买
      buy() {
        buyDisabled.value = true
        if(!sessionStorage.getItem('token')) {
          loginDialog()
        } else {
          if(sessionStorage.getItem('shiming') === '0') {
            Dialog.alert({ message: '您还未实名认证，请先认证喲~' }).then(() => {
              sessionStorage.setItem('shimingFrom', route.path) 
              buyDisabled.value = false
              router.push({ path:'/shiming' }) 
            })
          } else {
            sessionStorage.setItem('drugId', route.params.id)
            setTimeout( () => { buyDisabled.value = false }, 300 )
            router.push({ path:'/confirmorder', query: { from: 'detail' } })
          }
        }
      }
    }
  }
}
</script>