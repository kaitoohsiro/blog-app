<template>
  <v-container>
    <v-row>
      <v-col col="12">
        <p>Title</p>
        <input class="text" v-model="title" type="text" />
      </v-col>
    </v-row>
    <v-row>
      <v-col col="6">
        <input class="image" type="file" @change="confirmImage" />
      </v-col>
      <v-col col="6">
        <span v-if="confirmedImage">
          <img class="c-image" :src="confirmedImage" alt />
        </span>
      </v-col>
    </v-row>
    <v-row>
      <v-col col="12">
        <p>Contents</p>
        <div class="mavonEditor">
          <no-ssr>
            <mavon-editor
              v-model="handbook"
              :toolbars="markdownOption"
              language="en"
            />
          </no-ssr>
        </div>
      </v-col>
    </v-row>
    <v-row>
      <v-col class="btn-box" col="12">
        <input class="btn" type="button" @click="submit" value="投稿" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { API, Storage } from 'aws-amplify'
import awsmobile from '../../aws-exports'
import { updateBlog } from '../../graphql/mutations'

export default {
  props: ['blog'],
  data() {
    return {
      markdownOption: {
        bold: true, // 粗体
        italic: true, // 斜体
        header: true, // hello
        underline: true, // 下划线
        strikethrough: true, // 中划线
        mark: true, // 标记
        superscript: true, // 上角标
        subscript: true, // 下角标
        quote: true, // 引用
        ol: true, // 有序列表
        ul: true, // 无序列表
        link: true, // hi
        // imagelink: true, // 图片链接
        code: true, // code
        table: true, // 表格
        fullscreen: true, // 全屏编辑
        readmodel: true, // 沉浸式阅读
        htmlcode: true, // 展示html源码
        help: true, // 帮助
        /* 1.3.5 */
        undo: true, // 上一步
        redo: true, // 下一步
        trash: true, // 清空
        // save: true, // 保存（触发events中的save事件）
        /* 1.4.2 */
        navigation: true, // 导航目录
        /* 2.1.8 */
        alignleft: true, // 左对齐
        aligncenter: true, // 居中
        alignright: true, // 右对齐
        /* 2.2.1 */
        subfield: true, // 单双栏模式
        preview: true, // 预览
      },
      title: this.blog.title,
      handbook: this.blog.content,
      imageData: '',
      confirmedImage: this.blog.image_url,
      // imageUrl: '',
      message: '',
      changeImage: 0,
    }
  },
  methods: {
    confirmImage(event) {
      this.message = ''
      this.imageData = event.target.files[0]
      if (!this.imageData.type.match('image.*')) {
        this.message = '画像ファイルを選択して下さい'
        this.confirmedImage = ''
        return
      }
      this.createImage(this.imageData)
    },
    createImage(file) {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = (e) => {
        this.confirmedImage = e.target.result
      }
      this.changeImage = 1
    },
    async submit() {
      const filePath = `blog/${this.imageData.name}`
      const imageUrlDefault =
        'https://' +
        awsmobile.aws_user_files_s3_bucket +
        '.s3-' +
        awsmobile.aws_user_files_s3_bucket_region +
        '.amazonaws.com/public/'
      if (this.changeImage === 1) {
        await Storage.put(filePath, this.imageData).then((result) => {
          this.imageUrl = imageUrlDefault + filePath
        })
      }
      if (this.changeImage === 0) {
        this.imageUrl = this.blog.image_url
      }
      const contents = this.handbook
      const createBlogInfo = {
        id: this.blog.id,
        title: this.title,
        image_url: this.imageUrl,
        content: contents,
      }
      await API.graphql({
        query: updateBlog,
        variables: { input: createBlogInfo },
      })
      window.location.href = '/detail/' + this.blog.id
    },
  },
}
</script>

<style scoped>
.mavonEditor {
  width: 100%;
  height: 100%;
}
.text {
  color: white;
  padding: 0px 10px;
  font-size: 30px;
  border: 1px solid #424242;
  border-radius: 20px;
  height: 40px;
  width: 100%;
}
.image {
  height: 150px;
}
.c-image {
  width: 300px;
  height: 150px;
}
.btn-box {
  text-align: center;
}
.btn {
  border: 1px solid #000000;
  background-color: white;
  color: #424242;
  width: 90px;
  height: 30px;
  border-radius: 10px;
}
</style>
