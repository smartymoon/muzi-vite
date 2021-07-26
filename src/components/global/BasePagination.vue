<template>
  <div>
    <van-list
      v-show="localList.length > 0"
      v-model:loading="loading"
      :finished="finished"
      finished-text="没有更多了"
      :offset="offset"
      @load="onLoad"
    >
      <slot :list="localList" />
    </van-list>
    <van-empty :image="emptyImg" v-show="localList.length === 0" :description="descriptionTips" class="mt-36" />
  </div>
</template>

<script>
import mitt from 'mitt'
import { onMounted, ref, watch } from 'vue'
import { pickBy } from 'lodash'
import api from '../../api/index.js'
export default {
  props: {
    offset: {
      type: Number,
      default: 600
    },
    descriptionTips: {
      type: String,
      default: '列表为空'
    },
    emptyImg: {
      type: String,
      default:'default'
    },
    url: {
      type: String,
      required: true
    },
    size: {
      type: String,
      default:'6'
    },
    params: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const BasePaginationMitt = mitt()
    const currentPage = ref(1)
    const size = ref(props.size)
    const localList = ref([])
    const loading = ref(false)
    const finished = ref(false)

    // askApi 设置翻页规则
    const askApi = function(more = true) {
      const newParams = {}
      loading.value = true
      if (!more) {
        currentPage.value = 1
      }
      Object.assign(newParams, props.params, { currentPage: currentPage.value, size:size.value })

      api.get(props.url, pickBy(newParams)).then((res)=>{
        console.log(res.data.data)
        if (more) {
          localList.value.push(...res.data.data.records)
        } else {
          localList.value = res.data.data.records
        }
        loading.value = false
        if (res.data.data.current*res.data.data.size >= res.data.data.total) {
          finished.value = true
        }
      })
    }

    // 设置加载中的状态
    const onLoad = function() {
      currentPage.value++
      askApi()
    }

    onMounted(() => { askApi(false) })

    BasePaginationMitt.on('refresh',()=>{askApi(false)})

    watch(props.params, (old, now) => {
      finished.value = false
      askApi(false)
    }, {
      deep: true
    })

    return {
      BasePaginationMitt,
      localList,
      currentPage,
      loading,
      finished,
      onLoad
    }
  }
}
</script>
