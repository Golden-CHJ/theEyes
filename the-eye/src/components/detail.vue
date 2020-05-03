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
      axios.get('/static/mock/laji.json').then(this.handleCityInfoSucc)
    },
    handleCityInfoSucc (res) {
      res = res.data
      console.log(res)
      if (res.ret && res.data) {
        const data = res.data
        this.detail = data.detail
        this.rubbish_classify = data.rubbish_classify
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
