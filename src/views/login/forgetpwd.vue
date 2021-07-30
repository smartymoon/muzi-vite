<template>
  <div class="relative pt-12 bg-white">
    <!-- header -->
    <muzi-header title="忘记密码" />
    <!-- main -->
    <main class="p-4 space-y-1.5">
      <!-- 输入手机号，调起手机号键盘 -->
      <div class="border-b border-gray-300">
        <van-field 
          v-model="state.tel" 
          type="digit"
          maxlength="11"
          center
          clearable 
          label-width="4rem" 
          label="手机号" 
          placeholder="请输入您的手机号" 
          @update:model-value="changeTel"
        />
      </div>
      <!-- 验证码输入 -->
      <div class="border-b border-gray-300 flex items-center">
        <van-field
          v-model="state.sms"
          type="digit"
          center
          maxlength="4"
          label-width="4rem"
          label="验证码"
          placeholder="请输入短信验证码"
        >
        </van-field>
        <sms-button :tel="state.tel" />
      </div>
      <!-- 输入密码 -->
      <form class="border-b border-gray-300">
        <van-field 
          v-model="state.pwd" 
          type="password"
          center
          clearable 
          label-width="4rem" 
          label="新密码"
          maxlength="15" 
          autocomplete=“off” 
          placeholder="请输入新密码" 
        />
      </form>
      <!-- 输入密码 -->
      <form class="border-b border-gray-300">
        <van-field 
          v-model="state.pwd2" 
          type="password"
          center
          clearable 
          label-width="4rem" 
          label="新密码"
          maxlength="15" 
          autocomplete=“off” 
          placeholder="请再次输入新密码" 
        />
      </form>
      <!-- loginButton -->
      <div class="p-12">
        <van-button block round color="#F23030" :loading="loading" @click="confirm">确认修改</van-button>
      </div>
    </main>
  </div>
</template>

<script>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import api from '../../api/index.js'
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
    const state = reactive({
      tel: localStorage.getItem('phone') ? localStorage.getItem('phone'):'',
      sms:'' , 
      pwd:'',
      pwd2:''
    })
    const storagePhone = function(value) {
      if(value.length === 11) {
        localStorage.setItem('phone',value)
      } else {
        if (localStorage.getItem('phone')) { localStorage.removeItem('phone') }
      }
    }
    // 手机号校验
    const checkPhone = function(tel) {
      let phonereg = 11 && /^((13|14|15|16|17|18|19)[0-9]{1}\d{8})$/
      return !!phonereg.test(tel)
    }
    const loading = ref(false)
    return {
      state,
      changeTel(value) { storagePhone(value) },
      loading,
      // 注册
      confirm() {
        loading.value = true
        if(!state.tel || !state.sms) { Toast.fail('手机号验证码不能为空'); setTimeout( () => { loading.value = false }, 1000 ); return }
        if(!state.pwd || !state.pwd2 ) { Toast.fail('密码不能为空'); setTimeout( () => { loading.value = false }, 1000 ); return }
        if (!checkPhone(state.tel)) { Toast.fail('手机号格式不正确'); setTimeout( () => { loading.value = false }, 1000 ); return }
        if(state.pwd !== state.pwd2 ) { Toast.fail('两次密码输入不一致'); setTimeout( () => { loading.value = false }, 1000 ); return }
        api.get("/open/resetpassword",{ mobile: state.tel, captcha: state.sms, password: state.pwd }).then((res)=>{ 
          if(res.data.code === 20000) {
            Toast.success(res.data.msg)
            router.go(-1)
          } else {
            Toast.fail(res.data.msg)
          }
          setTimeout( () => { loading.value = false }, 1000 )
        })
      }
    }
  }
}
</script>