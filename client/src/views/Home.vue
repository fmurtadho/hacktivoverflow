<template>
  <!-- Page Content -->
    <div class="container">

      <div class="row">

        <!-- Blog Entries Column -->
        <div class="col-md-8">

          <h1 class="card my-4">
            <small class="card-header text-justify">Question List</small>
          </h1>

          <!-- Blog Post -->
          <all-article :searchresult="searchresult" :categoryresult="categoryresult"></all-article>

          <!-- Pagination -->
          <!-- <pagination></pagination> -->

        </div>

        <!-- Sidebar Widgets Column -->
        <sidebar @search-result="searchResult" @category-result="categoryResult"></sidebar>

      </div>
      <!-- /.row -->

    </div>
    <!-- /.container -->
</template>

<script>
// @ is an alias to /src
import AllArticle from '@/components/AllArticle.vue'
import Pagination from '@/components/Pagination.vue'
import Sidebar from '@/components/Sidebar.vue'

export default {
  name: 'home',
  components: {
    AllArticle,
    Pagination,
    Sidebar
  },
  data () {
    return {
      searchresult: '',
      categoryresult: ''
    }
  },
  methods: {
    searchResult (val) {
      // console.log('val in home from sidebar',val)
      this.searchresult = val
    },
    categoryResult (val) {
      this.categoryresult = val
    }
  }
}
</script>
