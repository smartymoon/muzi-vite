<template>
  <div class="relative pt-12 bg-white">
    <!-- header -->
    <muzi-header title="登录" />
    <!-- content -->
    <main class="px-8 pt-20 text-center">
      <!-- logo -->
      <van-image width="70" height="70" src="/src/assets/images/logo.png" lazy-load>
        <template v-slot:loading>
          <van-loading type="spinner" size="20" />
        </template>
      </van-image>
      <!-- login -->
      <van-tabs 
        v-model:active="active"
        line-width="50%"
        duration="0.05"
        class="mt-20" 
        @change="changeTab"
      >
        <!-- 手机号密码登录 -->
        <van-tab title="账号密码登录" class="w-full pt-8 space-y-4">
          <!-- 输入手机号，调起手机号键盘 -->
          <div class="border-b border-gray-300">
            <van-field 
              v-model="state.tel" 
              type="digit"
              maxlength="11"
              center
              clearable 
              label-width="4rem" 
              label="账号" 
              placeholder="请输入您的手机号" 
              @update:model-value="changeTel"
            />
          </div>
          <!-- 输入密码 -->
          <form class="border-b border-gray-300">
            <van-field 
              v-model="state.pwd" 
              type="password"
              center
              clearable 
              label-width="4rem" 
              label="密码"
              maxlength="15" 
              autocomplete=“off” 
              placeholder="请输入您的密码" 
            />
          </form>
        </van-tab>
        <!-- 验证码登录 -->
        <van-tab title="验证码登录" class="w-full pt-8 space-y-4">
          <!-- 输入手机号，调起手机号键盘 -->
          <div class="border-b border-gray-300">
            <van-field 
              v-model="state2.tel" 
              type="digit"
              center
              clearable 
              label-width="4rem" 
              label="手机号" 
              maxlength="11" 
              placeholder="请输入您的手机号"
              @update:model-value="changeTel2" 
            />
          </div>
          <!-- 验证码输入 -->
          <div class="border-b border-gray-300 flex items-center">
            <van-field
              v-model="state2.sms"
              type="digit"
              center
              maxlength="4"
              label-width="4rem"
              label="验证码"
              placeholder="请输入短信验证码"
            >
            </van-field>
            <sms-button :tel="state2.tel" />
          </div>
        </van-tab>
      </van-tabs>
      <!-- 注册， 忘记密码 -->
      <div class="w-full text-sm flex items-center justify-between mb-7">
        <router-link to="/login/register" class="w-20 text-left py-4">注册</router-link>
        <router-link to="/login/forgetpwd" class="w-20 text-right py-4">忘记密码</router-link>
      </div>
      <!-- loginButton -->
      <van-button block round color="#F23030" :loading="loginLoading" @click="login">登录</van-button>
    </main>
  </div>
</template>

<script>
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import api from '../../api/index.js'
import { checkPhone } from '/src/until/index.js'
import { Toast } from 'vant'
import MuziHeader from '../../components/MuziHeader.vue'
import SmsButton from './component/SmsButton.vue'
export default {
  components: {
    MuziHeader,
    SmsButton
  },
  setup() {
    const router = useRouter()
    const active = ref(0)
    const changeTab = function(index){
      if(index === 0) {
        state2.sms = ''
        localStorage.getItem('phone') ? state.tel = localStorage.getItem('phone')  : state2.tel = ''
      } else {
        state.pwd = ''
        localStorage.getItem('phone') ? state2.tel = localStorage.getItem('phone')  : state.tel = ''
      }
    }

    const state = reactive({ 
      tel:localStorage.getItem('phone') ? localStorage.getItem('phone'):'', 
      pwd:'' 
    })

    const state2 = reactive({ 
      tel:localStorage.getItem('phone') ? localStorage.getItem('phone'):'', 
      sms:'' 
    })
    const storagePhone = function(value) {
      if(value.length === 11) {
        localStorage.setItem('phone',value)
      } else {
        if (localStorage.getItem('phone')) { localStorage.removeItem('phone') }
      }
    }
    const loginLoading = ref(false)
    return {
      active,
      changeTab,
      state,
      state2,
      changeTel(value) { storagePhone(value) },
      changeTel2(value) { storagePhone(value) },
      loginLoading,
      // 登录
      login() {
        loginLoading.value = true
        let postData = {}
        // 账号密码登录
        if(active.value === 0) {
          if (state.tel.length === 0 || state.pwd.length === 0) { Toast.fail('账号密码不能为空'); setTimeout( () => { loginLoading.value = false }, 500 ); return }
          if (!checkPhone(state.tel)) { Toast.fail('手机号格式不正确'); setTimeout( () => { loginLoading.value = false }, 500 ); return }
          Object.assign(postData,{ captcha: '', loginType: true, password: state.pwd, phone: state.tel })
        }
        // 手机号验证码登录
        if(active.value === 1) {
          if (state2.tel.length === 0 || state2.sms.length === 0) { Toast.fail('手机号验证码不能为空'); setTimeout( () => { loginLoading.value = false }, 500 ); return }
          if (!checkPhone(state2.tel)) { Toast.fail('手机号格式不正确'); setTimeout( () => { loginLoading.value = false }, 1000 ); return }
          Object.assign(postData, { captcha: state2.sms, loginType: false, password: '', phone: state2.tel })
        }
        // 发起post登录请求
        api.post("/open/login", postData).then((res) => {
          console.log(res.data)
          if(res.data.code === 20000 && res.data.msg === '成功') {
            sessionStorage.setItem('token', res.data.data.token)
            sessionStorage.setItem("id", res.data.data.user.id)
            api.get("/myidcard/get",{ userid: res.data.data.user.id }).then((res)=>{
              res.data.code === 20000 ? sessionStorage.setItem('shiming', 1) : sessionStorage.setItem('shiming', 0)
            })
            Toast.success('登录成功')
            if(sessionStorage.getItem('loginFrom')) {
              router.replace(sessionStorage.getItem('loginFrom'))
              router.go(-1)
            } else {
              router.push({ path: '/'})
            }
          } else {
            Toast.fail(res.data.msg)
            if(res.data.msg === '用户不存在') { localStorage.removeItem('phone'); state.tel = state2.tel = '' }
          } 
        })
        setTimeout( () => { loginLoading.value = false }, 500 )
      }
    }
  }
}
</script>

<style>
  .van-tab {
    font-size: 1rem;
    padding-bottom: 8px;
    border-bottom: solid 1px #E6E6E6;
  }
</style>