<template>
<div class="wrapper">
  <div class="icon"
  id="icon"
  @before-enter="beforeEnter"
  @enter="enter"
  @after-enter="afterEnter">
      手机垃圾识别分类
  </div>
  <div class="word"
  id='word'>
    部署于浏览器的TensorFlowJS模型
  </div>
<div v-show='hasShow' class="detailWrapper">
<div class="imgDiv" id="imgDiv"></div>
<div class="classify"><strong>{{cap}}</strong>{{classify}}</div>
<div class="detail">{{detail}}</div>
</div>

<!-- <div class="info" v-show="isInfo">
  {{info}}
</div> -->
<div class="tool">
  <router-link to='/detail'><i class="el-icon-search"></i></router-link>
</div>
  <el-row class="wrapper1" id="button_wrapper">
    <input class="se2" id="f_file" type="file" name="image"  @change="predict($event)"/>
        <label for="f_file">
            <input class="se1" type="button" :value="info" />
        </label>
<!--
     <input type="file"  @change="predict($event)"/> -->
  </el-row>

  <el-row   class="wrapper2" id="button_wrapper2" >
  <el-button   class="wrapper3" id="back_button" type="danger" round disabled @click="back()">返回首页</el-button>
</el-row>
</div>

</template>

<script>
import Velocity from 'velocity-animate'
import eyeHeader from './eyeHeader.vue'
import eyeFooter from './eyeFooter.vue'
import * as tf from '@tensorflow/tfjs'
import { img2x, file2img } from '../brand-predict/utils'
import detail from './detail.vue'
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
      isflash: false,
      isInfo: false,
      info: '识别',
      cap: '',
      classify: '这啥',
      detail: '可回收垃圾好啊',
      fileURL: '',
      fileList: [],
      hasShow: false,
      autoUpload: true,
      accept: 'jpg' || 'JPG' || 'png' || 'PNG'
    }
  },
  methods: {
    back () {
      alert(1)
      this.$router.go(0)
    },
    async  predict (e) {
      document.getElementById('f_file').disabled = true
      this.isInfo = true
      // const detail = document.getElementById('detailWrapper')
      const file = e.target.files[0]
      this.info = '5% 获取图片成功'
      const imgDiv = document.getElementById('imgDiv')
      // const MODEL_PATH = 'http://127.0.0.1:8080'
      const BRAND_CLASSES = ['O', 'R']
      const mobilenet = await tf.loadLayersModel('http://localhost:8080/static/mobilenet/web_model/model.json')
      this.info = '11% 载入mobilenet模型成功'
      // mobilenet.summary()
      const layer = mobilenet.getLayer('conv_pw_13_relu')
      this.info = '13% layer：conv_pw_13_relu'
      const truncatedMobilenet = tf.model({
        inputs: mobilenet.inputs,
        outputs: layer.output
      })

      this.info = '17% 截断层加载成功'
      const model = await tf.loadLayersModel('http://localhost:8080/static/mobilenet/web_model/model1.json')
      this.info = '45% 训练模型加载成功'
      const img = await file2img(file)
      this.info = '77% 图片处理成功'
      while (imgDiv.hasChildNodes()) { // 当div下还存在子节点时 循环继续
        imgDiv.removeChild(imgDiv.firstChild)
      }
      const text = imgDiv.appendChild(img)
      text.style.width = '100%'
      text.style.hight = '100%'
      const pred = tf.tidy(() => {
        const x = img2x(img)
        const input = truncatedMobilenet.predict(x)
        return model.predict(input)
      })
      this.info = '89% 预测功能tidy性能优化'
      const index = pred.argMax(1).dataSync()[0]
      setTimeout(() => {
        // alert(`预测结果：${BRAND_CLASSES[index]}`)
        Velocity(document.getElementById('button_wrapper'), {opacity: 0}, {duration: 700})
      }, 0)
      setTimeout(() => {
        // alert(`预测结果：${BRAND_CLASSES[index]}`)
        Velocity(document.getElementById('button_wrapper2'), {opacity: 1}, {duration: 1500})
        document.getElementById('back_button').disabled = false
      }, 750)
      let res = BRAND_CLASSES[index]
      this.hasShow = true
      this.info = '100% 加载完成！'
      this.isInfo = false
      if (res === 'R') {
        this.detail = '可回收物就是可以再生循环的垃圾。本身或材质可再利用的纸类、硬纸板、玻璃、塑料、金属、塑料包装，与这些材质有关的如：报纸、杂志、广告单及其它干净的纸类等皆可回收。'
        this.classify = 'ecyclable'
        this.cap = 'R'
      } else {
        this.detail = '不可回收垃圾指可回收垃圾之外的垃圾，常见的有在自然条件下易分解的垃圾，如果皮、菜叶、剩菜剩饭、花草树枝树叶等。此外，有害的，有污染的，不能进行二次分解再造的都属于不可回收垃圾。'
        this.classify = 'recyclable'
        this.cap = 'UN'
      }
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
.info{
  /* background-color: #fff; */
  color: white;
  font-size: 1.2rem;
   text-align: center;
  font-weight: bold;
  /* color: #000; */
  position: absolute;
  width: 100%;
  top:75%;
}
.detailWrapper{
  color: #fff;
  position: absolute;
   top: 0; left: 0; bottom: 0; right: 0;
  /* top:30%; */
  width: 90%;
  height: 30% ;
  margin:  auto;
}
.tool{
  color: white;
  font-size: 1.2rem;
   text-align: center;
  font-weight: bold;
  /* color: #000; */
  position: absolute;
  top:3%;
  right: 3%;
}
.imgDiv{
  float: right;;
  height: 100%;
  width:30%;;
}
.classify{
  float: left;
  height: 30%;
  width: 60%;
}
.detail{
  float: left;
  height: 70%;
  width: 60%;
  font-size: 0.65rem;
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
.wrapper2{
  opacity: 0;
  position: absolute;
  top:90%;
  margin: 0 auto;
   width: 100%;
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
