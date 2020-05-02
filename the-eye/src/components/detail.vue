<template>
  <div>
<city-header></city-header>
<city-search
    :cities="cities"></city-search>
<city-list
     :cities="cities"
     :hot="hotCities"
     :letter="letter"></city-list>
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
      cities: {},
      hotCities: [],
      letter: ''
    }
  },
  methods: {
    getCityInfo () {
      axios.get('/static/mock/city.json').then(this.handleCityInfoSucc)
    },
    handleCityInfoSucc (res) {
      res = res.data
      console.log(res)
      if (res.ret && res.data) {
        const data = res.data
        this.cities = data.cities
        this.hotCities = data.hotCities
        // alert(data.hotCities[0].name)
      }
    },
    handleLetterChange (letter) {
      this.letter = letter
      // console.log(letter)
    }
  },
  mounted () {
    this.getCityInfo()
  }
}
</script>

<style>

</style>
