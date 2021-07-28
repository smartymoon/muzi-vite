<template>
  <div class="relative pt-12 bg-white">
    <!-- header -->
    <muzi-header title="登录" backUrl="/" />
    <!-- content -->
    <div class="px-8 pt-20 text-center">
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
        duration="0.1"
        class="mt-20" 
      >
        <!-- 手机号密码登录 -->
        <van-tab title="账号密码登录" class="w-full pt-8 space-y-5">
          <!-- 输入手机号，调起手机号键盘 -->
          <div class="border-b border-gray-300">
            <van-field v-model="state.tel" type="tel" label="手机号" placeholder="请输入您的手机号" />
          </div>
          <!-- 输入密码 -->
          <form class="border-b border-gray-300">
            <van-field v-model="state.pwd" type="password" label="密码" autocomplete=“off” placeholder="请输入您的密码" />
          </form>
        </van-tab>
        <!-- 验证码登录 -->
        <van-tab title="验证码登录" class="w-full pt-8 space-y-4">
          <!-- 输入手机号，调起手机号键盘 -->
          <div class="border-b border-gray-300">
            <van-field v-model="state2.tel" type="tel" label="手机号" placeholder="请输入您的手机号" />
          </div>
          <!-- 验证码输入 -->
          <div class="border-b border-gray-300">
            <van-field
              v-model="state2.sms"
              center
              clearable
              label="验证码"
              placeholder="请输入短信验证码"
            >
              <template #button>
                <van-button size="mini" type="primary" round color="#F23030">发送验证码</van-button>
              </template>
            </van-field>
          </div>
        </van-tab>
      </van-tabs>
      <!-- 注册， 忘记密码 -->
      <div class="w-full text-sm flex items-center justify-between mb-7">
        <p class="w-20 text-left py-4">注册</p>
        <p class="w-20 text-right py-4">忘记密码</p>
      </div>
      <!-- loginButton -->
      <van-button block round color="#F23030" @click="login">登录</van-button>
    </div>
  </div>
</template>

<script>
import { reactive, ref } from 'vue'
import { Toast } from 'vant'
import MuziHeader from '../../components/MuziHeader.vue'
export default {
  components: {
    MuziHeader
  },
  setup() {
    const active = ref(0)
    const state = reactive({ tel:'', pwd:'' })
    const state2 = reactive({ tel:'', sms:'' })
    const transform = function(phone){
      let phonereg = 11 && /^((13|14|15|16|17|18|19)[0-9]{1}\d{8})$/
      if(!phonereg.test(phone)) {
        Toast.fail('手机号格式不正确')
        return false
      }else {
        return true
      }
    }
    return {
      active,
      state,
      state2,
      transform,
      login() {
        if(active.value === 0) {
          transform(state.tel)
          if (transform(state.tel)) { console.log('sdfg') }
        } else {
          transform(state2.tel)
          if (transform(state.tel)) { console.log('sdfg') }
        }
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