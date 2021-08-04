<template>
  <van-button 
    size="small" 
    round 
    :disabled="smsDisabled" 
    :loading="smsLoading"
    color="#F23030"
    class="flex-shrink-0 w-20"  
    @click="getSms"
  >
    {{ smsText }}
  </van-button>
</template>

<script>
import { ref } from 'vue'
import api from '../../../api/index.js'
import { Toast } from 'vant'
export default {
  props: {
    tel: {
      type: String,
      required: true
    }
  },
  setup( props ) {
    const smsText = ref('发送验证码')
    const smsDisabled = ref(false)
    const smsLoading = ref(false)
    const checkPhone = function(tel) {
      let phonereg = 11 && /^((13|14|15|16|17|18|19)[0-9]{1}\d{8})$/
      return !!phonereg.test(tel)
    }
    return {
      smsText,
      smsDisabled,
      smsLoading,
      // 获取验证码
      getSms() {
        smsDisabled.value = smsLoading.value = true
        if(props.tel.length === 0) {
          Toast.fail('手机号不能为空')
          setTimeout( () => { smsDisabled.value = smsLoading.value = false }, 500 )
          return 
        }
        if(!checkPhone(props.tel)) { 
          Toast.fail('手机号格式不正确')
          setTimeout( () => { smsDisabled.value = smsLoading.value = false }, 500 )
          return 
        }
        api.get("/open/common/send_captcha",{phone: props.tel}).then((res)=>{
          if(res.data.code === 20000) {
            setTimeout( () => { smsLoading.value = false }, 300 )
            let i = 30
            smsText.value = i + 's'
            let timer = setInterval(() => {
              i -= 1
              smsText.value = i + 's'
              if(i === 0) {
                smsDisabled.value = false
                smsText.value = '发送验证码'
                clearInterval(timer)
              }
            },1000)
          } else {
            Toast.fail('发送失败，请重新获取验证码')
            setTimeout( () => { smsDisabled.value = smsLoading.value = false }, 500 )
            return
          }
        })
      },
    }
  }
}
</script>