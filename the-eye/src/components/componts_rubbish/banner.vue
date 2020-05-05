<template>
<div class="wrapper"  >
<div class="banner" @click.prevent="handleClickShowGallary">
    <img class="banner-img" :src="bannerImg">
    <div class="banner-info">
        <!-- <div class="banner-title">{{this.sightName}}</div> -->
        <div class="banner-number"> <span class="iconfont"><i class="el-icon-picture"></i></span>{{this.bannerImgs.length}}</div>
    </div>
</div>
<fade>
<common-gallary :imgs='bannerImgs'
v-show="showGallary" @close="handleClickCloseGallary"></common-gallary>
</fade>
</div>
</template>
<script>
import CommonGallary from '../../common/gallary/Gallary'
import Fade from '../../common/fade/Fade'
export default {
  name: 'DetailBanner',
  components: {
    CommonGallary,
    Fade
  },
  props: {
    sightName: String,
    bannerImg: String,
    bannerImgs: Array
  },
  data () {
    return {
      showGallary: false
    }
  },
  methods: {
    handleClickShowGallary () {
      this.showGallary = true
      console.log('关掉没有' + this.showGallary)
    },
    handleClickCloseGallary () {
      this.showGallary = false
      console.log('关掉没有' + this.showGallary)
    }
  }
}
</script>

 <style lang="stylus" scoped>
 .wrapper
  z-index -999
  .banner
    position relative
     overflow :hidden
    height: 0
    padding-bottom: 55%
    z-index -999
      height 10rem
    .banner-img
        width : 100%
        z-index -999
    .banner-info
        position :absolute
        top 25%
        right : 0
        left:0
        bottom: 2rem
        line-height: .6rem
        // display: flex
        color #fff
        .banner-title
            // flex :1
            font-size .32rem
            padding : 0 .2rem
        .banner-number
            float right
            line-height .4rem
            padding : 0 .4rem
            height: 1rem
            border-radius: .2rem
 </style>
