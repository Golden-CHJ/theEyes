<template>
<div>
  <div class="icon">
      the EYEs
  </div>
  <div class="word">
    灵魂拷问：你是什么垃圾？
  </div>
  <div class="wrapper">
    <el-button type="primary" round  @change="predict($event)">
   </el-button>
  </div>
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
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.icon{
  background-color: #fff;
  font-size: 1.6rem;
   width: 8rem;
  height: 5rem;
  text-align: center;
  font-weight: bold;
  /* color: #000; */
  position: relative;
  top:50%;
  margin-top: -2.5rem;
  margin: 0 auto;
}
.word{
   background-color: yellow;
  width:12rem;
  height: 2.5rem;
  position: relative;
  text-align: center;
  font-size: 1rem;
  top:20%;
  margin: 0 auto;
  font-weight: bolder;
}
.wrapper{
  display: inline-block;
  overflow: hidden;
}
</style>
