<template>
<div class="wrapper">
  <div class="icon"
  id="icon"
  @before-enter="beforeEnter"
  @enter="enter"
  @after-enter="afterEnter">
      The Eyes
  </div>
  <div class="word"
  id='word'>
    灵魂拷问：你是什么垃圾？
  </div>
  <div class="detailWrapper">
    <detail class="detail">
    </detail>
  </div>
  <el-row class="wrapper1" id="button_wrapper">
    <input class="se2" id="f_file" type="file" name="image"  @change="predict($event)"/>
        <label for="f_file">
            <input class="se1" type="button" value="识别" />
        </label>
<!--
     <input type="file"  @change="predict($event)"/> -->
  </el-row>
</div>

</template>

<script>
import detail from './detail.vue'
import Velocity from 'velocity-animate'
import eyeHeader from './eyeHeader.vue'
import eyeFooter from './eyeFooter.vue'
import * as tf from '@tensorflow/tfjs'
import { img2x, file2img } from '../brand-predict/utils'
// import fun from '../brand-predict/script.js'

export default {
  name: 'index',
  components: {
    eyeHeader,
    eyeFooter,
    detail
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
      // document.body.appendChild(img)
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
    },
    beforeEnter (el) {
      console.log(1)
      el.style.color = 'red'
    },
    enter (el, done) {
      console.log(2)
      Velocity(el, {opacity: 0}, {duration: 1000}, {complete: done})
    },
    afterEnter (el) {
      console.log(3)
      el.style.color = 'yellow'
    }
  },
  mounted () {
    const icon = document.getElementById('icon')
    const word = document.getElementById('word')
    const buttonWrapper = document.getElementById('button_wrapper')
    setTimeout(function () {
      Velocity(icon, {top: '10%', 'font-size': '0.8rem'}, {duration: 2000})
    }, 1500)
    setTimeout(function () {
      Velocity(word, {opacity: 1}, {duration: 1500})
      Velocity(buttonWrapper, {opacity: 1}, {duration: 1500})
    }, 3500)
    // 这里设置定时器方式页面加载未完成时动画就开始执行了
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.icon{
  /* background-color: #fff; */
  color: white;
  font-size: 1.2rem;
   text-align: center;
  font-weight: bold;
  /* color: #000; */
  position: absolute;
  width: 100%;
  top:50%;
}
.word{
  color: white;
  opacity: 0;
   /* background-color: yellow; */
  width:100%;
  height: 2.5rem;
  position: absolute;
  text-align: center;
  font-size: 1rem;
  top:15%;
  margin: 0 auto;
}
.wrapper1{
  opacity: 0;
  position: absolute;
  top:90%;
  right: 50%;
  width: 80%;
  margin: 0 auto;
  text-align:center;
}
.se2{
    width:10rem;
    height:2rem;
    position:absolute;
    width: 100%;
    margin: 0 auto;
    /* top:338px;
    left:942px; */
    z-index: 1;
    opacity: 0;
}
.se1{
    width:10rem;
    height:2rem;
    width: 100%;
    margin: 0 auto;
    color: rgb(219,59,95);;
    background: #fff;
    border-radius:20px;
    position:absolute;
    /* top:338px;
    left:942px; */
}
.se1:hover{
    cursor: pointer;
}
</style>
