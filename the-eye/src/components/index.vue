<template>
  <div>
    <el-container>
  <el-header><eye-header/></el-header>
  <el-main>
    <img alt="Vue logo" src="../assets/logo.png">
    <el-upload
  class="upload-demo"
  action="http://localhost:3000/uploadfile"
  :on-preview="handlePreview"
  :on-remove="handleRemove"
  :on-success="handleFileSuccess"
  :on-error="handleFileError"
  :on-progress="handleFileProgress"
  :file-list="fileList"
  :auto-upload ="autoUpload"
  list-type="picture"
  :accept="accept">
  <el-button size="small" type="primary">点击上传</el-button>
  <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
</el-upload>

    </el-main>
  <el-footer><eye-footer/></el-footer>
</el-container>
  </div>
</template>

<script>
import eyeHeader from './eyeHeader.vue'
import eyeFooter from './eyeFooter.vue'

export default {
  name: 'index',
  components: {
    eyeHeader,
    eyeFooter
  },
  data () {
    return {
      fileList: [],
      autoUpload: true,
      accept: 'jpg' || 'JPG' || 'png' || 'PNG'
    }
  },
  methods: {
    handleRemove (file, fileList) {
      console.log(file, fileList)
    },
    handlePreview (file) {
      console.log(file)
      console.log('HANDLEpREVIEW')
    },
    handleFileSuccess (response, file, fileList) {
      console.log('success')
      console.log(response, file, fileList)
      this.$router.push({path: '/detail'})
      alert('跳转啊')
    },
    handleFileError (err, file, fileList) {
      console.log('err')
      console.log(err, file, fileList)
    },
    handleFileProgress (event, file, fileList) {
      console.log('event')
      console.log(event, file, fileList)
    }
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
