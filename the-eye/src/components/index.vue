<template>
<div class="wrapper">
  <div class="icon">
      the EYEs
  </div>
  <div class="word">
    灵魂拷问：你是什么垃圾？
  </div>
  <el-row class="wrapper1">
    <input class="se2" id="f_file" type="file" name="image"  @change="predict($event)"/>
        <label for="f_file">
            <input class="se1" type="button" value="更换头像" />
        </label>
<!--
     <input type="file"  @change="predict($event)"/> -->
  </el-row>
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
   text-align: center;
  font-weight: bold;
  /* color: #000; */
  position: absolute;
  width: 100%;
  top:50%;
}
.word{
   background-color: yellow;
  width:100%;
  height: 2.5rem;
  position: absolute;
  text-align: center;
  font-size: 1rem;
  top:30%;
  margin: 0 auto;
  font-weight: bolder;
}
.wrapper1{
  position: absolute;
  top:90%;
  width: 40%;
  margin: 0 auto;
  text-align:center;
}
.se2{
    width:10rem;
    height:2rem;
    position:absolute;
    /* top:338px;
    left:942px; */
    z-index: 1;
    opacity: 0;
}
.se1{
    width:10rem;
    height:2rem;
    color:#fff;
    background: #28abde;
    border-radius:5px;
    position:absolute;
    /* top:338px;
    left:942px; */
}
.se1:hover{
    cursor: pointer;
}
</style>
