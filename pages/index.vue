<template>
  <div>
    <Display v-for="post in posts" :key="post.id" :post="post" />
  </div>
</template>

<script>
import { API } from 'aws-amplify'
import Display from '../components/readBlog/index'
import { listBlogs } from '../graphql/queries'

export default {
  components: {
    Display,
  },
  data() {
    return {
      posts: [],
    }
  },
  created() {
    this.getBlog()
  },
  methods: {
    async getBlog() {
      const posts = await API.graphql({
        query: listBlogs,
      })
      this.posts = posts.data.listBlogs.items
    },
  },
}
</script>
