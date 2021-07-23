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
    <van-empty v-show="localList.length === 0" :description="descriptionTips" class="mt-36" />
  </div>
</template>

<script>
import mitt from 'mitt'
import { onMounted, ref, watch } from 'vue'
import VanList from 'vant/lib/list'
import 'vant/lib/list/style'
import { pickBy } from 'lodash'
import { get } from '@/Api/methods'
export default {
  components: {
    VanList
  },
  props: {
    offset: {
      type: Number,
      default: 600
    },
    descriptionTips: {
      type: String,
      default: '列表为空'
    },
    url: {
      type: String,
      required: true
    },
    listName: {
      type: String,
      default: ''
    },
    params: {
      type: Object,
      required: true
    }
  },
  emits: ['get-list', 'finished', 'on-success'],
  setup(props, { slots, attrs, emit }) {
    const BasePaginationMitt = mitt()
    const page = ref(1)
    const localList = ref([])
    const loading = ref(false)
    const finished = ref(false)

    // askApi 设置翻页规则
    const askApi = function(more = true) {
      const newParams = {}
      loading.value = true
      if (!more) {
        page.value = 1
      }
      Object.assign(newParams, props.params, { page: page.value })

      get(props.url, pickBy(newParams)).then(({ list, hasMorePages }) => {
        if (more) {
          localList.value.push(...list)
        } else {
          localList.value = list
          emit('on-success')
        }
        // 加载状态结束
        loading.value = false
        if (hasMorePages === false) {
          finished.value = true
        }
      })
    }

    // 设置加载中的状态
    const onLoad = function() {
      page.value++
      askApi()
    }

    onMounted(() => {
      askApi(false)
    })

    watch(props.params, (old, now) => {
      finished.value = false
      askApi(false)
    }, {
      deep: true
    })

    return {
      BasePaginationMitt,
      localList,
      page,
      loading,
      finished,
      onLoad
    }
  }
}
</script>
