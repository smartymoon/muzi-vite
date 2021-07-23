<template>
  <div class="relative h-screen py-12">
    <!-- header -->
    <muzi-header />
    <!-- footer -->
    <muzi-footer :footerIndex="2" />
  </div>
</template>

<script>
import { ref } from 'vue';
import api from '../../api/index.js'
import MuziHeader from '../../components/MuziHeader.vue'
import MuziFooter from '../../components/MuziFooter.vue'
export default {
  components: {
    MuziHeader,
    MuziFooter
  },
  setup() {
    return {

    }
  }
}
</script>