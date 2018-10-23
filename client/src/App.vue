<template>
  <div id="app">
    <!-- Navigation -->
    <navbar></navbar>
    <!-- Content -->
    <router-view :islogin="islogin"></router-view>
  </div>
</template>
<style>
/* @import "~vue-wysiwyg/dist/vueWysiwyg.css"; */
</style>

<script>
import Navbar from '@/components/Navbar'

export default {
  name: 'app',
  components: {
    Navbar
  }
}

</script>

