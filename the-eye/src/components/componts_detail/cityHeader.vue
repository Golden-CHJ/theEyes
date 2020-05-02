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
    height :.86rem
    line-height :.86rem
    text-align: center
    color :#fff
    font-size :.32rem
    .header-back
      position absolute
      top:0
      left :0
      width :.64rem
      text-align :center
      font-size :.4rem
      color #fff
</style>
