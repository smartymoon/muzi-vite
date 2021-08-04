<template>
  <div class="relative pt-12 bg-white">
    <!-- header -->
    <muzi-header title="实名认证" />
    <!-- content -->
    <div class="w-full space-y-1.5 p-4">

      <!-- 输入姓名 -->
      <div class="border-b border-gray-300">
        <van-field 
          v-model="state.name" 
          maxlength="8"
          center
          clearable 
          label-width="4rem" 
          label="真实姓名" 
          placeholder="请输入您的姓名" 
        />
      </div>

      <!-- 输入身份证号 -->
      <div class="border-b border-gray-300">
        <van-field 
          v-model="state.id" 
          maxlength="18"
          center
          clearable 
          label-width="4rem" 
          label="身份证号" 
          placeholder="请输入您的身份证号"
          @focus="getIdFocus" 
        />
        <van-number-keyboard
          v-model="state.id" 
          :show="showIdKeyboard"
          extra-key="X"
          close-button-text="完成"
          @blur="showIdKeyboard = false"
        />
      </div>

      <!-- 输入手机号 -->
      <div class="border-b border-gray-300">
        <van-field 
          v-model="state.tel" 
          type="digit"
          maxlength="11"
          center
          clearable 
          label-width="4rem" 
          label="手机号码" 
          placeholder="请输入您的手机号" 
        />
      </div>
    </div>
    <!-- loginButton -->
    <div class="p-12">
      <van-button block round color="#F23030" :loading="loading" @click="save">保存</van-button>
    </div>
  </div>
</template>

<script>
import { ref, reactive } from 'vue'
// import api from '../../api/index.js'
import { Toast } from 'vant'
import MuziHeader from '../../components/MuziHeader.vue'
export default {
  components: {
    MuziHeader
  },
  setup() {
    const state = reactive({ 
      name: '',
      id: '',
      tel:localStorage.getItem('phone') ? localStorage.getItem('phone'):''
    })
    const loading = ref(false)
    const showIdKeyboard = ref(false)
    // 身份证校验
    const checkId = function(id) {
      let phonereg = /^[1-9]\d{5}(18|19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/
      return !!phonereg.test(id)
    }
    // 手机号校验
    const checkPhone = function(tel) {
      let phonereg = 11 && /^((13|14|15|16|17|18|19)[0-9]{1}\d{8})$/
      return !!phonereg.test(tel)
    }
    return {
      state,
      loading,
      showIdKeyboard,
      getIdFocus() {
        showIdKeyboard.value = true
      },
      save() {
        loading.value = true
        if(!state.name || !state.id || !state.tel ) { Toast.fail('信息输入不全'); setTimeout( () => { loading.value = false }, 500 ); return }
        if (!checkId(state.id)) { Toast.fail('身份证号格式不正确'); setTimeout( () => { loading.value = false }, 500 ); return }
        if (!checkPhone(state.tel)) { Toast.fail('手机号格式不正确'); setTimeout( () => { loading.value = false }, 500 ); return }
        setTimeout( () => { loading.value = false }, 500 )
      }
    }
  }
}
</script>

<style>
.van-field__label {
  color: #333333;
  font-weight: 700;
}
</style>