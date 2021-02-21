<template>
  <amplify-authenticator>
    <div>
      <Display v-for="post in posts" :key="post.id" :post="post" />
    </div>
    <amplify-sign-out></amplify-sign-out>
  </amplify-authenticator>
</template>

<script>
import { API } from 'aws-amplify'
import Display from '../../components/writeBlog/index'
import { listBlogs } from '../../graphql/queries'

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
