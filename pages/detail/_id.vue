<template>
  <DetailCard :key="blog.id" :blog="blog" />
</template>

<script>
import { API } from 'aws-amplify'
import { getBlog } from '../../graphql/queries'
import DetailCard from '../../components/readBlog/detail'

export default {
  components: {
    DetailCard,
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
      // eslint-disable-next-line no-undef
      const detailBlog = await API.graphql({
        query: getBlog,
        variables: {
          id: this.$route.params.id,
        },
      })
      this.blog = detailBlog.data.getBlog
    },
  },
}
</script>
