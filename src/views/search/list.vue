<template>
  <div v-if="!showSearch" class="relative py-12 min-h-screen">
    <!-- header -->
    <muzi-header showBack @search="toSearch" />
    <!-- list -->
    <div class="mt-3 px-4">
      <base-pagination
        url="/open/home/search"
        :params="params"
        size="10"
        emptyImg="search"
        descriptionTips="暂无内容"
      >
        <template v-slot:default="slotProps">
          <div class="w-full grid grid-cols-2 gap-x-4 gap-y-3">
            <div v-for="(msg,idx) in slotProps.list" :key="idx">
              <muzi-card :msg="msg" />
            </div>
          </div>
        </template>
      </base-pagination>
    </div>
  </div>
  <muzi-search v-else @back="toBack" @confirm="confirm" />
</template>

<script>
import { ref } from 'vue';
import BasePagination from '../../components/global/BasePagination.vue'
import MuziHeader from '../../components/MuziHeader.vue'
import MuziSearch from '../../components/MuziSearch.vue'
import MuziCard from '../../components/MuziCard.vue'
import { useRoute,useRouter } from 'vue-router'
export default {
  components: {
    BasePagination,
    MuziHeader,
    MuziSearch,
    MuziCard
  },
  setup() {
    console.log('sss',useRoute().query.drug)
    const showSearch = ref(false)
    const params = ref({
      searchContent: useRoute().query.drug,
      countryCode: useRoute().query.countryId
    })
    console.log(params.value)
    return {
      showSearch,
      params,
      toSearch() { showSearch.value = true },
      toBack() { showSearch.value = false }
    }
  }
}
</script>