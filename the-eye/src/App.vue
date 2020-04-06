<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
@import './common/font/font.css';
html body{
  font-family: "SYYH";
  font-size: 25px;
  background-color: rgb(219,59,95);
  height: 100%; /**全屏 */
  margin: 0;
  padding: 0;
}
</style>
