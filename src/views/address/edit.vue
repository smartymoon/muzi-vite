<template>
  <div class="relative pt-12 pb-16 min-h-screen">
    <!-- header -->
    <muzi-header title="新建收货地址" />
    <van-address-edit
      :area-list="areaList"
      show-set-default
      :show-delete="isEdit"
      tel-maxlength="11"
      :area-columns-placeholder="['请选择', '请选择', '请选择']"
      @change-area="changeArea"
      @save="onSave"
      @delete="onDelete"
    >
      <div class="bg-white">
        <!-- 输入身份证号 -->
        <van-field 
          v-model="id" 
          maxlength="18"
          clearable 
          label-width="3.5rem" 
          label="身份证号" 
          placeholder="请输入您的身份证号"
          :error-message="showIdError ? '请输入正确的身份证号' : ''"
          @focus="getIdFocus" 
        />
        <van-number-keyboard
          v-model="id" 
          :show="showIdKeyboard"
          extra-key="X"
          close-button-text="完成"
          @blur="showIdKeyboard = false"
        />
      </div>
    </van-address-edit>
  </div>
</template>

<script>
import { reactive, ref } from 'vue'
import { areaList } from '@vant/area-data'
// import api from '../../api/index.js'
import { useRoute, useRouter } from 'vue-router'
// import { Toast } from 'vant'
import MuziHeader from '../../components/MuziHeader.vue'
export default {
  components: {
    MuziHeader
  },
  setup() {
    const router = useRouter()
    const route = useRoute()
    const isEdit = !!(route.query.operation === 'edit')
    const id = ref('')
    const showIdError = ref(false)
    const showIdKeyboard = ref(false)
    // 身份证校验
    const checkId = function(id) {
      let phonereg = /^[1-9]\d{5}(18|19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/
      return !!phonereg.test(id)
    }
    return {
      areaList,
      isEdit,
      id,
      showIdError,
      changeArea(values) {
        console.log(values)
      },
      showIdKeyboard,
      getIdFocus() {
        showIdKeyboard.value = true
        showIdError.value = false
      },
      onSave() {
        if(!id.value || !checkId(id.value)) { showIdError.value  = true }
      },
      onDelete() {
        // 删除 
      }
    }
  }
}
</script>
<style>
  .van-switch--on {
    background-color:#f23030;
  }
</style>