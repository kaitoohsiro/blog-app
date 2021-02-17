<template>
  <amplify-authenticator>
    <CreateBlog />
    <amplify-sign-out></amplify-sign-out>
  </amplify-authenticator>
</template>

<script>
import CreateBlog from '../components/writeBlog/create'

export default {
  name: 'Create',
  components: {
    CreateBlog,
  },
}
</script>
