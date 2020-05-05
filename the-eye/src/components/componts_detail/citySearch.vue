<template>
<div>
  <div class="search">
<input  v-model="keyWord" class="search-input" type="text" placeholder="查询垃圾名"/>
  </div>
  <div class="search-content"
        v-show="keyWord" ref="search">
      <ul>
          <li class="search-item border-bottom" v-for="item of list" :key="item.id"
          @click="handleRubbishClick(item.id)">{{item.name}}</li>
          <li class="search-item border-bottom" v-show="hasNoData">没有找到匹配项</li>
      </ul>
  </div>
</div>
</template>

<script>
import Bscroll from 'better-scroll'
export default {
  name: 'CitySearch',
  props: {
    detail: Object
  },
  data () {
    return {
      keyWord: '',
      list: [],
      timer: null
    }
  },
  computed: {
    hasNoData () {
      return !this.list.length
    }
  },
  watch: {
    keyWord () {
      if (this.timer) {
        clearTimeout(this.timer)
      }
      if (!this.keyWord) {
        this.list = []
      }
      this.timer = setTimeout(() => {
        const result = []
        for (let i in this.detail) {
          this.detail[i].forEach((value) => {
            if (value.spell.indexOf(this.keyWord) > -1 ||
                      value.name.indexOf(this.keyWord) > -1) {
              result.push(value)
            }
          })
        }
        this.list = result
      }, 100)
    }
  },
  mounted () {
    const option = {
      click: true,
      tap: true
    }
    this.scroll = new Bscroll(this.$refs.search, option)
  },
  methods: {
    handleRubbishClick (id) {
      let _id
      if (id > 6 && id <= 39) {
        _id = 6
      } else if (id > 39 && id <= 67) {
        _id = 2
      } else if (id > 67 && id <= 85) {
        _id = 3
      } else if (id > 85 && id <= 105) {
        _id = 5
      } else if (id > 105 && id <= 112) {
        _id = 1
      } else if (id > 112 && id <= 115) {
        _id = 4
      }
      this.$router.push(`/rubbish/${_id}`)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" scoped>
.search
    height 1.72rem
    padding .2rem .5rem
    .search-input
        box-sizing border-box
        width :100%
        height :1.1rem
        line-height :1.1rem
        text-align center
        border-radius 0.8rem
        color :#666
        padding 0 .1rem
.search-content
    z-index :1
    overflow: hidden
    position: absolute
    top: 2.55rem
    left: 0
    right: 0
    bottom: 0
    background: #fff
    .search-item
        list-style-type none
        line-height :1.3rem
        padding-left :.2rem
        color :#666
        background-color :#fff
</style>
