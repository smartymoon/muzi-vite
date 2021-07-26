<template>
  <div class="relative py-12 min-h-screen">
    <!-- header/search -->
    <div class="fixed top-0 max-w-md w-full px-4 flex items-center z-50 bg-red-400">
      <div @click="$emit('back')">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
        </svg>
      </div>
      <van-search
        v-model="searchValue"
        show-action
        placeholder="请输入您要搜索的药品、品牌"
        class="w-full"
        shape="round"
        background="#f23030"
        autofocus
        @focus="getFocus"
        @search="onSearch"
      >
        <template #action>
          <div @click="onSearch(searchValue)" class="text-white">搜索</div>
        </template>
      </van-search>
    </div>
    <!-- main -->
    <div class="py-5 px-4">
      <!-- 历史搜索 -->
      <div v-if="historyList.length > 0 && showHistory">
        <div class="flex items-center">
          <p class="text-sm font-bold">历史搜索</p>
          <div class="ml-auto px-1" @click="deleteHistory">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </div>
        </div>
        <div class="mt-1 flex flex-wrap items-center">
          <template v-for="(item,index) in historyList" :key="index" >
            <button
              v-if="item.length > 0"
              class="mt-3 mr-3.5 py-1 px-3 bg-gray-300 text-gray-500 rounded-2xl text-xs" 
              @click="clickHistory(item)"
            >
              {{ item }}
            </button>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import { Dialog } from 'vant'
import { useRouter,useRoute } from 'vue-router'
export default {
  emits:['back'],
  setup(props,{ attrs, slots, emit }) {
    const showHistory = ref(sessionStorage.getItem('history')? true:false)
    const router = useRouter()
    const searchValue = ref('')
    const historyList =  ref(sessionStorage.getItem('history') ? sessionStorage.getItem('history').split(',').reverse() : [])
    return {
      showHistory,
      searchValue,
      historyList,
      // 获取焦点
      getFocus() { searchValue.value = '' },
      // 搜索
      onSearch(value) {
        historyList.value.push(value) 
        sessionStorage.setItem('history',historyList.value)
        router.push({ path: '/search', query: { drug: value } })
      },
      // 点击历史标签
      clickHistory(item) {
        this.onSearch(item)
      },
      // 清空历史记录
      deleteHistory() {
        Dialog.confirm({
          message:'确认删除全部历史记录？'
        }).then(() => {
          sessionStorage.removeItem('history')
          showHistory.value = false
        }).catch(() => { 
        })
      }
    }
  }
}
</script>
<style>
  .van-search{
    padding-top: 7px;
    padding-bottom: 7px;
  }
</style>