<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="290">
      <template v-slot:activator="{ on, attrs }">
        <v-btn color="red lighten-2" text dark v-bind="attrs" v-on="on">
          DELETE
        </v-btn>
      </template>
      <v-card>
        <v-card-title class="headline">本当に削除しますか? </v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" text @click="dialog = false">
            いいえ
          </v-btn>
          <v-btn color="green darken-1" text @click="deleteBtn">
            削除する
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import { API } from 'aws-amplify'
import { deleteBlog } from '../../graphql/mutations'

export default {
  name: 'DeleteCard',
  props: ['cardId'],
  data() {
    return {
      dialog: false,
    }
  },
  methods: {
    async deleteBtn() {
      const deleteData = {
        id: this.cardId,
      }
      await API.graphql({
        query: deleteBlog,
        variables: { input: deleteData },
      })
      this.dialog = false
      window.location.href = '/write/'
    },
  },
}
</script>
