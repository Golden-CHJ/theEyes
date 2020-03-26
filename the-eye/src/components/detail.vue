<template>
  <div>
     <el-container>
  <el-header>
    <a is='router-link' to='/'>
      返回
    </a>
    Header
    </el-header>
  <el-container>
    <el-aside width="200px">相似：{{similar}}</el-aside>
    <el-container>
      <el-main>
        <div class="wrapper">
        <img :src="pic" alt="这是你拍的垃圾" class="imgStyle"/>
        </div>
        </el-main>
      <el-footer>{{classification}}</el-footer>
    </el-container>

  </el-container>

  <el-container>
      <el-main>
        相关：{{news}}
      </el-main>
    </el-container>
</el-container>

  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'detail',
  data () {
    return {
      classification: ' ',
      pic: ' ',
      similar: [],
      news: ''

    }
  },
  mounted () {
    axios.get('http://localhost:3000/data').then((res) => {
      console.log(res)
      let data = res.data
      this.classification = data.classification
      this.news = data.news
      this.pic = data.pic
      this.similar = data.similar.join(' ')
    })
  }
}
</script>

<style>
  .el-header, .el-footer {
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 60px;
  }
.imgStyle{
  width:100% ,

}
  .el-aside {
    background-color: #D3DCE6;
    color: #333;
    text-align: center;
    line-height: 3.5rem;
    font-size: 0.8rem;
  }

  .el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
    line-height: 1.5rem;
    font-size: 0.6rem;
  }
</style>
