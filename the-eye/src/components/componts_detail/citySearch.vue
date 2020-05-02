<template>
<div>
  <div class="search">
<input  v-model="keyWord" class="search-input" type="text" placeholder="查询垃圾名"/>
  </div>
  <div class="search-content"
        v-show="keyWord" ref="search">
      <ul>
          <li class="search-item border-bottom" v-for="item of list" :key="item.id"
          @click="handleCityClick(item.name)">{{item.name}}</li>
          <li class="search-item border-bottom" v-show="hasNoData">没有找到匹配项</li>
      </ul>
  </div>
</div>
</template>

<script>
// import Bscroll from 'better-scroll'
export default {
  name: 'CitySearch',
  props: {
    cities: Object
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
        for (let i in this.cities) {
          this.cities[i].forEach((value) => {
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
    // this.scroll = new Bscroll(this.$refs.search)
  },
  methods: {
    handleCityClick (city) {
      this.$store.dispatch('changeCity', city)
      this.$router.push('/')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" scoped>
.search
    height 1.72rem
    padding 0 .1rem
    background :#fff
    .search-input
        box-sizing border-box
        width :100%
        height :0.95rem
        line-height :.92rem
        text-align center
        border-radius 0.65rem
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
    background: #eee
    .search-item
        line-height :1.1rem
        padding-left :.2rem
        color :#666
        background-color :#fff
</style>
