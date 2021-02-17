<template>
  <v-card class="mx-auto" max-width="344">
    <v-img :src="post.image_url" height="200px"></v-img>

    <v-card-title>{{ post.title }}</v-card-title>

    <v-card-subtitle>{{ post.createdAt }}</v-card-subtitle>

    <v-card-actions>
      <v-btn color="orange lighten-2" text :to="'/detail/' + post.id">
        Explore
      </v-btn>
      <v-spacer></v-spacer>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: 'PostCard',
  props: ['post'],
}
</script>
