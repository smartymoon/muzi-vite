<template>
  <div class="relative py-12 min-h-screen">
    <!-- header/search -->
    <div class="fixed top-0 max-w-md w-full h-12 px-4 py-2 flex items-center z-50">
      333
    </div>
    <!-- footer -->
    <muzi-footer :footerIndex="1" />
  </div>
</template>

<script>
// import { ref } from 'vue';
// import api from '../../api/index.js'
import MuziHeader from '../../components/MuziHeader.vue'
import MuziFooter from '../../components/MuziFooter.vue'
export default {
  components: {
    MuziHeader,
    MuziFooter
  },
  setup() {
  }
}
</script>