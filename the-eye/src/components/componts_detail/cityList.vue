<template>
<div class="list" ref="wrapper">
    <div>
<div class="area">
    <div class="title border-topbottom">分类</div>
    <div class="button-list">
        <div class="button-wrapper" v-for="item of classify" :key="item.id"
        @click="handleCityClick(item.name)">
        <div class="button">{{item.name}}</div>
        </div>
    </div>
</div>
<div class="area" v-for="(item,key) of detail"
:key="key"
:ref="key">
    <div class="title border-topbottom" >{{key}}</div>
    <div class="item-list">
        <div class="item border-bottom"
        v-for="innerItem of item"
        :key="innerItem.id"
        @click="handleCityClick(innerItem.name)">{{innerItem.name }}</div>
    </div>

</div>
    </div>
</div>
</template>

<script>
import Bscroll from 'better-scroll'
export default {
  name: 'CityList',
  props: {
    classify: Array,
    detail: Object
  },
  methods: {
    handleCityClick (name) {
      console.log(name)
    }
  },
  mounted () {
    const option = {
      click: true,
      tap: true
    }
    // bug betterscroll的 点击失效问题
    this.scroll = new Bscroll(this.$refs.wrapper, option)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" scoped>
.border-topbottom
    &:before
        border-color :#ccc
    &:after
        border-color :#ccc
.border-bottom
    &:before
        border-color :#ccc
.list
    overflow hidden
    position absolute
    top 2.95rem
    left 0
    right 0
    bottom 0
    .title
        line-height 1.2rem
        background-color #eee
        padding-left .5rem
        color #666
    .button-list
        overflow hidden
        padding : .1rem .6rem .1rem .1rem
        .button-wrapper
            width :33.33%
            float left
            .button
                color #fff
                padding :.1rem 0
                margin :.1rem
                text-align :center
                border: .02rem solid  #ccc
                border-radius :.06
                font-size .65rem
    .item-list
        .item
            color #fff
            line-height 1.2rem
            padding-left .5rem

</style>
