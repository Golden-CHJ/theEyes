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
      // axios.get(`/static/mock/rubbish${this.$route.params.id}.json`).then(this.handleGetDataSucc)
    //   axios.post('http://localhost:3000/getDetail', {
    //     id: this.$route.params.id
    //   }).then(this.handleGetDataSucc)
    // },
      axios.post('http://192.168.1.8:3000/getDetail', {
        id: this.$route.params.id
      }).then(this.handleGetDataSucc)
    },
    handleGetDataSucc (res) {
      const data = res.data.results[0].data.data
      console.log(data)
      // if (data) {
      //   const data = res.results
      //   // for (const key in data) {
      //   //   if (data.hasOwnProperty(key)) {
      //   //     console.log(key.value)
      //   //   }
      //   // }
      //   // console.log(data[0].data)
      //   this.detail = data[0].data.detail
      //   // console.log(this.detail)
      //   this.rubbish_classify = data[0].data.rubbish_classify
      //   // console.log(data.rubbish_classify)
      //   // alert(data.hotCities[0].name)
      // }
      this.sightName = data.sightName
      this.bannerImg = data.bannerImg
      this.gallaryImgs = data.gallaryImgs
      this.list = data.categoryList
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
     height :50rem
    // background-color #fff
 </style>
