<template>
  <div class="relative pt-12 pb-16 min-h-screen">
    <!-- header -->
    <muzi-header :title="isEdit ? '编辑收货地址' : '新建收货地址'" />
    <div v-show="showLoading && isEdit" class="text-center py-5">
      <van-loading size="30">加载中,请稍后...</van-loading>
    </div>
    <van-address-edit
      v-show="!showLoading || !isEdit"
      :show-set-default="!!(addressFrom !== '/confirmorder') && !!(addressLength !== 1)"
      :show-delete="isEdit && addressLength !== 1 && showDelete"
      tel-maxlength="11"
      :tel-validator="telValidator"
      :show-area="false"
      :show-detail="false"
      :address-info="info"
      :is-saving="saving"
      @save="onSave"
      @delete="onDelete"
      @change-default="changeDefault"
    >
      <div class="bg-white">
        <!-- 输入身份证号 -->
        <van-field
          v-model="msg.id"
          maxlength="18"
          clearable
          readonly
          label-width="3.5rem"
          :right-icon="msg.id ? 'clear' : ''"
          label="身份证号" 
          placeholder="请输入您的身份证号"
          :error-message="msg.showIdError ? '请输入正确的身份证号' : ''"
          @click-right-icon="msg.id = ''"
          @focus="getIdFocus"
        />
        <van-number-keyboard
          v-model="msg.id"
          :show="showIdKeyboard"
          extra-key="X"
          close-button-text="完成"
          @blur="showIdKeyboard = false"
        />
        <!-- 地区 -->
        <van-field
          v-model="msg.area"
          label-width="3.5rem"
          label="地区"
          readonly
          is-link
          placeholder="选择 省 / 市"
          :error-message="msg.showAreaError ? '请选择地区' : ''"
          @click="msg.showArea = true"
        />
        <van-popup v-model:show="msg.showArea" position="bottom" round>
          <van-picker 
            title="选择地区" 
            :columns="msg.areaList" 
            :columns-field-names="{ text: 'label', values: 'values', children: 'children' }" 
            @confirm="confirmArea" 
            @cancel="msg.showArea = false" 
          />
        </van-popup>
        <!-- 详细地址 -->
        <van-field
          v-model="msg.dtl"
          clearable
          label-width="3.5rem"
          label="详细地址" 
          placeholder="城市区域、街道门牌等信息"
          :error-message="msg.showDtlError ? '请输入详细地址' : ''"
          @focus="msg.showDtlError = false"
        />
      </div>
    </van-address-edit>
  </div>
</template>

<script>
import { reactive, ref } from 'vue'
import { checkId, checkPhone } from '/src/until/index.js'
import api from '../../api/index.js'
import { useRoute, useRouter } from 'vue-router'
import { NumberKeyboard, AddressEdit, Picker, Popup } from 'vant'
import MuziHeader from '../../components/MuziHeader.vue'
export default {
  components: {
   [NumberKeyboard.name]:NumberKeyboard,
   [AddressEdit.name]:AddressEdit,
   [Picker.name]:Picker,
   [Popup.name]:Popup,
    MuziHeader
  },
  setup() {
    const router = useRouter()
    const route = useRoute() 
    const showLoading = ref(true)
    const addressFrom = route.query.from
    const addressLength = +route.query.addressLength
    const showDelete = ref(true)
    const isEdit = !!(route.query.operation === 'edit')
    const itype = ref(2)
    const info = reactive({
      name: '',
      tel: '',
      isDefault: true,
    })
    const msg = reactive({
      id: '',
      showIdError: false,
      area: '',
      areaList: [],
      provincescode:'',
      cityscode:'',
      showArea: false,
      showAreaError: false,
      dtl: '',
      showDtlError: false
    })
    const telValidator = (tel) => { return checkPhone(tel) }
    api.get("/open/common/get_address_select" ).then((res)=>{ msg.areaList = res.data.data })
    if(isEdit) {
      api.get('/useraddress/get', { addressid: route.query.addressId} ).then((res) => {
        if(res.data.code === 20000) {
          info.name = res.data.data.slinkman
          info.tel = res.data.data.smobile
          msg.id = res.data.data.scardno
          msg.area = res.data.data.saddressname
          msg.provincescode = res.data.data.provincescode
          msg.cityscode = res.data.data.saddresscode
          msg.dtl = res.data.data.sdetail
          itype.value = res.data.data.itype
          info.isDefault = !!(res.data.data.itype === 2)
          if(res.data.data.itype === 2) {
            showDelete.value = false
          }
        }
        showLoading.value = false
      })
    }
    const showIdKeyboard = ref(false)
    const saving = ref(false)
    return {
      showLoading,
      addressFrom,
      addressLength,
      showDelete,
      isEdit,
      info,
      msg,
      showIdKeyboard,
      itype,
      saving,
      getIdFocus() {
        showIdKeyboard.value = true
        msg.showIdError = false
      },
      confirmArea(value) {
        msg.showAreaError = false
        msg.area = '中国 '+ value[0].label + ' ' + value[1].label
        msg.provincescode = value[0].value
        msg.cityscode = value[1].value
        msg.showArea = false
      },
      // 切换默认地址
      changeDefault(value) { value ? itype.value = 2 : itype.value = 1 },
      onDelete() {
        api.delete("/useraddress/delete",{ addressid: route.query.addressId }).then((res) => {
          if(sessionStorage.getItem('addressId') === route.query.addressId ) {
            sessionStorage.removeItem('addressId')
          }
          router.go(-1)
        })
      },
      telValidator,
      onSave(e) {
        saving.value = true
        if(!msg.id || !checkId(msg.id)) { saving.value = false; msg.showIdError = true; return }
        if(!msg.area) { saving.value = false; msg.showAreaError = true; return }
        if(!msg.dtl) { saving.value = false; msg.showDtlError = true; return }
        let data = {
          itype: itype.value,
          iuserid: sessionStorage.getItem('id'),
          cityscode: msg.cityscode,
          provincescode: msg.provincescode,
          scardno: msg.id,
          sdetail: msg.dtl,
          slinkman: e.name,
          smobile:  e.tel,
        }
        if(isEdit) {
          data.id = route.query.addressId
          api.post("/useraddress/put", data).then((res) => {
            router.replace(addressFrom)
            router.go(-1)
          })
        } else {
          api.post("/useraddress/post", data).then((res) => {
            if(res.data.code === 20000) {
              router.replace(addressFrom)
              router.go(-1)
            }
          })
        }
        setTimeout( () => { saving.value = false }, 500 )
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