<template>
  <div>
    <el-container>
  <el-header><eye-header/></el-header>
  <el-main>
    <img alt="Vue logo" src="../assets/logo.png">
    <!-- <el-upload
  class="upload-demo"
  action="https://jsonplaceholder.typicode.com/posts/"
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
</el-upload> -->
<input type="file" @change="predict($event)">
    </el-main>
  <el-footer><eye-footer/></el-footer>
</el-container>
  </div>
</template>

<script>
import eyeHeader from './eyeHeader.vue'
import eyeFooter from './eyeFooter.vue'
import * as tf from '@tensorflow/tfjs'
import { img2x, file2img } from '../brand-predict/utils'
// import fun from '../brand-predict/script.js'

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
    async  predict (e) {
      const file = e.target.files[0]
      const MODEL_PATH = 'http://127.0.0.1:8081'
      const BRAND_CLASSES = ['O', 'R']
      const mobilenet = await tf.loadLayersModel(MODEL_PATH + '/mobilenet/web_model/model.json')
      mobilenet.summary()
      const layer = mobilenet.getLayer('conv_pw_13_relu')
      const truncatedMobilenet = tf.model({
        inputs: mobilenet.inputs,
        outputs: layer.output
      })

      console.log(1)
      const model = await tf.loadLayersModel(MODEL_PATH + '/mobilenet/web_model/model1.json')
      console.log(2)

      console.log(3)
      console.log(file)
      const img = await file2img(file)
      console.log(4)
      document.body.appendChild(img)
      const pred = tf.tidy(() => {
        console.log(5)
        const x = img2x(img)
        const input = truncatedMobilenet.predict(x)
        return model.predict(input)
      })
      console.log(6)
      const index = pred.argMax(1).dataSync()[0]
      setTimeout(() => {
        alert(`预测结果：${BRAND_CLASSES[index]}`)
      }, 0)
    }
  //   handleRemove (file, fileList) {
  //   // console.log(file, fileList)
  //   },
  //   handlePreview (file) {
  //     // console.log(file)
  //     // console.log('HANDLEpREVIEW')
  //   },
  //   handleFileSuccess (response, file, fileList) {
  //     console.log('success')
  //     // console.log(response, file, fileList)
  //     fun.load(file)
  //     // this.$router.push({path: '/detail'})
  //     alert('跳转啊')
  //   },
  //   handleFileError (err, file, fileList) {
  //     console.log('err')
  //     console.log(err, file, fileList)
  //   },
  //   handleFileProgress (event, file, fileList) {
  //     // console.log('event')
  //     // console.log(event, file, fileList)
  //   }
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
