<template>
  <div id="app">
    <el-container>
  <el-header>垃圾在线识别</el-header>
  <el-main>
    <img alt="Vue logo" src="./assets/logo.png">
    <index></index>
    </el-main>
  <el-footer>Footer</el-footer>
</el-container>
    
    
  </div>
</template>

<script>
import index from './components/index.vue'

export default {
  name: 'App',
  components: {
    index
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
