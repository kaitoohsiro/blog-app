<template>
  <v-container>
    <v-row>
      <v-col col="12">
        <img class="image" :src="blog.image_url" alt="test" />
      </v-col>
    </v-row>
    <v-row>
      <v-col col="12">
        <h2>{{ blog.title }}</h2>
      </v-col>
    </v-row>
    <v-row>
      <v-col col="12">
        <div class="mavonEditor">
          <no-ssr>
            <mavon-editor
              v-model="content"
              language="ja"
              :subfield="false"
              defaultOpen="preview"
              :toolbars="false"
            />
          </no-ssr>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'DetailCard',
  props: ['blog'],
  data() {
    return {
      content: '',
    }
  },
  created() {
    this.data()
  },
  methods: {
    data() {
      this.content = this.blog.content
    },
  },
}
</script>

<style scoped>
.image {
  width: 100%;
  height: 300px;
}
</style>
