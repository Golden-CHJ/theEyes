<template>
<div>
    <router-link v-show="showAbs" tag="div" to="/" class="header-abs"><div class="iconfont header-abs-back"><i class="el-icon-back"></i></div></router-link>
    <div class="header-fixed" v-show="!showAbs" :style="opacityStyle">
            <router-link to="/">
            <div class="iconfont header-fixed-back">&#xe624;</div>
            </router-link>
            景点详细
    </div>
    <div class="container"></div>
</div>
</template>
<script>
export default {
  name: 'DetailHeader',
  data () {
    return {
      showAbs: true,
      opacityStyle: {
        opacity: 0
      }
    }
  },
  methods: {
    handleScroll () {
      const top = document.documentElement.scrollTop
      if (top > 60) {
        let opacity = top / 140
        opacity = opacity > 1 ? 1 : opacity // 最大为1 负责是自己
        this.opacityStyle = {opacity} // 赋值给这个属性
        this.showAbs = false
      } else {
        this.showAbs = true
      }
    }
  },
  activated () {
    window.addEventListener('scroll', this.handleScroll) // 这是全局事件绑定
  },
  deactivated () {
    window.removeEventListener('scroll', this.handleScroll)
  }

}
</script>
 <style lang="stylus" scoped>
.header-abs
    position absolute
    left: .2rem
    top: .2rem
    width: 1.2rem
    height: 1.2rem
    border-radius: 1.2rem
    line-height :1.2rem
    background: rgba(0, 0, 0, .8)
    text-align :center
    .header-abs-back
        color : #fff
        font-size : .4rem
.header-fixed
    z-index :2
    position fixed
    top: 0
    left :0
    right :0
    height :.86rem
    line-height :.86rem
    text-align: center
    color :#fff
    // background-color  :$bgColor
    font-size : .32rem
    .header-fixed-back
        position :absolute
        top:0
        left:0
        width: .64rem
        text-align :center
        font-size : .4rem
        color :#fff
 </style>
