<template>
  <div class="relative py-12 min-h-screen">
    <!-- header -->
    <muzi-header :backUrl="searchFrom" />
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
</template>

<script>
import { ref } from 'vue';
import BasePagination from '../../components/global/BasePagination.vue'
import MuziHeader from '../../components/MuziHeader.vue'
import MuziCard from '../../components/MuziCard.vue'
import { useRoute,useRouter } from 'vue-router'
export default {
  components: {
    BasePagination,
    MuziHeader,
    MuziCard
  },
  setup() {
    const params = ref({
      searchContent: useRoute().query.drug,
      sclass: useRoute().query.id,
      countryCode: useRoute().query.countryCode,
      onefunctioncategory:useRoute().query.secondClass
    })
    const searchFrom = sessionStorage.getItem('searchFrom')
    return {
      params,
      searchFrom
    }
  }
}
</script>