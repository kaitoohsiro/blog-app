<template>
  <amplify-authenticator>
    <EditCard :key="blog.id" :blog="blog" />
    <amplify-sign-out></amplify-sign-out>
  </amplify-authenticator>
</template>

<script>
import { API } from 'aws-amplify'
import { getBlog } from '../../../graphql/queries'
import EditCard from '../../../components/writeBlog/edit'

export default {
  name: 'Edit',
  components: {
    EditCard,
  },
  data() {
    return {
      blog: [],
    }
  },
  created() {
    this.getCuisineDetail()
  },
  methods: {
    async getCuisineDetail() {
      const detailBlog = await API.graphql({
        query: getBlog,
        variables: {
          id: this.$route.params.id,
        },
      })
      this.blog = detailBlog.data.getBlog
      console.log(this.blog)
    },
  },
}
</script>
