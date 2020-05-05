<template>
<div>
   <detail-banner
   :sightName="sightName"
   :bannerImg="bannerImg"
   :bannerImgs="gallaryImgs"></detail-banner>
   <detail-header></detail-header>
    <div class="container">
   <detail-list :list="list"></detail-list>
    </div>
</div>
</template>
<script>
import DetailBanner from './componts_rubbish/banner.vue'
import DetailHeader from './componts_rubbish/Header'
import DetailList from './componts_rubbish/List'
import axios from 'axios'
export default {
  name: 'rubbish',
  components: {
    DetailBanner,
    DetailHeader,
    DetailList
  },
  methods: {
    getDetailInfo () {
      axios.get(`/static/mock/rubbish${this.$route.params.id}.json`).then(this.handleGetDataSucc)
    },
    handleGetDataSucc (res) {
      res = res.data
      if (res.ret && res.data) {
        const data = res.data
        this.sightName = data.sightName
        this.bannerImg = data.bannerImg
        this.gallaryImgs = data.gallaryImgs
        this.list = data.categoryList
      }
    }
  },
  mounted () {
    this.getDetailInfo()
  },
  data () {
    return {
      sightName: '',
      bannerImg: '',
      gallaryImgs: [],
      list: {}
    }
  }
}
</script>
 <style lang="stylus" scoped>

.container
    // height :50rem
    // background-color #fff
 </style>
