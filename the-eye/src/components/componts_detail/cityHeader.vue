<template>
  <div class="header">
    <router-link to="/">
    <div class="iconfont header-back">←</div>
    </router-link>
  分类垃圾查询
  </div>
</template>

<script>
export default {
  name: 'CityHeader'
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" scoped>
.header
    position relative
    overflow hidden
    height :1rem
    line-height :1rem
    text-align: center
    color :#fff
    font-size :1rem
    top:0.2rem
    .header-back
      position absolute
      top:0
      left :0
      width :1.1rem
      text-align :center
      font-size :0.8rem
      color #fff
</style>
