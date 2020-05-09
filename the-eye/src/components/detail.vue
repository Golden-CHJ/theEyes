<template>
  <div>
<city-header></city-header>
<city-search
    :detail="detail"></city-search>
<city-list
     :detail="detail"
     :classify="rubbish_classify"
></city-list>
  </div>
</template>

<script>
import axios from 'axios'
import cityHeader from './componts_detail/cityHeader.vue'
import citySearch from './componts_detail/citySearch.vue'
import cityList from './componts_detail/cityList.vue'
export default {
  name: 'detail',
  components: {
    cityHeader,
    citySearch,
    cityList
  },
  data () {
    return {
      detail: {},
      rubbish_classify: []
    }
  },
  methods: {
    getCityInfo () {
      // axios.get('/static/mock/laji.json').then(this.handleCityInfoSucc)
      axios.get('http://localhost:3000/getRubbishes').then(this.handleCityInfoSucc)
    },
    handleCityInfoSucc (res) { // 5.8
      res = res.data
      // console.log(res.data)
      if (res.results) {
        const data = res.results
        // for (const key in data) {
        //   if (data.hasOwnProperty(key)) {
        //     console.log(key.value)
        //   }
        // }
        console.log(data[0].data)
        this.detail = data[0].data.detail
        console.log(this.detail)
        this.rubbish_classify = data[0].data.rubbish_classify
        console.log(data.rubbish_classify)
        // alert(data.hotCities[0].name)
      }
    }
  },
  mounted () {
    this.getCityInfo()
  }
}
</script>

<style>

</style>
