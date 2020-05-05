<template>
<div class="container" @click="handleCilckGallaryClose">
    <div class="wrapper" >
        <swiper :options="swiperOptions">
    <!-- slides -->
            <swiper-slide
            v-for="(item, index) in imgs" :key="index"><img class="gallary-img" :src="item"></swiper-slide>
    <!-- Optional controls -->
    <!-- Optional controls -->
            <div class="swiper-pagination"  slot="pagination"></div>
     </swiper>
    </div>
</div>
</template>
<script>

export default {
  name: 'CommonGallary',
  data () {
    return {
      swiperOptions: {
        pagination: '.swiper-pagination',
        paginationType: 'fraction',
        observeParents: true,
        observer: true
      }
    }
  },
  props: {
    imgs: {
      type: Array,
      default () {
        return []
      }
    }
  },
  methods: {
    handleCilckGallaryClose () {
      this.$emit('close')
    }
  }

}
</script>
 <style lang="stylus" scoped>
.container >>> .swiper-pagination
    overflow :inherit
.container
    display flex
    flex-direction :column
    justify-content :center
    /*********/
    position fixed
    left 0
    right 0
    top 0
    bottom 0
    background :#000
    .wrapper
        width :100%
        height 0
        padding-bottom:55%
        .gallary-img
            width :100%
        .swiper-pagination
            color :#fff
           // bottom : -1rem
 </style>
