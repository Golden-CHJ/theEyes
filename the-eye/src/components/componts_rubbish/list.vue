<template>
<div class="wrapper">
   <!-- <div class="item">
    <div class="item-title border-bottom">
        <span class="item-title-icon"></span>
        {{list.name}}
    </div>
    <div>
        <p>{{list.f_name}}</p>
        <p>{{list.classify}}</p>
        <p>{{list.defination}}</p>
    </div>
    <div   v-for="(item,index) in list.include" :key="index" class="item-childern">
        {{item}}
        </div>
    </div> -->
    <el-card class="box-card">
  <div slot="header" class="clearfix">
    <span style="font-size: 2rem">{{list.name}}</span>
    <el-badge  style="float: right" :value="12" class="item">
<el-button  type="warning" icon="el-icon-star-off" circle></el-button>
        </el-badge>
  </div>
     <div class="text item">
        外文名：<p>{{list.f_name}}</p>
        类别：<p>{{list.classify}}</p>
        定义：<p>{{list.defination}}</p>
    </div>
     <!-- <div   v-for="(item,index) in list.include" :key="index" class="item-childern">
        {{item}}
        </div> -->
</el-card>

 <el-card class="box-card1">
  <div slot="header" class="clearfix">
    <span>范围</span>
  </div>
     <div   v-for="(item,index) in list.include" :key="index" class="item-childern">
        {{"     " +  item}}
        </div>
</el-card>
</div>
</template>
<script>

export default {
  name: 'DetailList',
  props: {
    list: Object
  }
}
</script>
 <style lang="stylus" scoped>
 .wrapper
   //  background #fff !important
.item-title-icon
    position: relative
    left :.6rem
    top: .6rem
    display :inline-block
    width : 2rem
    height : 2rem
    margin-right :.8rem
    font-size 1.4rem
    line-height : 1.7rem
    padding :0 .2rem
    color #fff
.item-childern
    padding :0 .2rem

.text {
    font-size: 14px;
  }

  .item {
    margin-bottom: 18px;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }

  .box-card {
    //   position absolute
    //   top 9rem
    //   left 0
    //   right 0
    //   bottom 0
    width: 90%;
     margin 0 auto
     margin-top -2rem
    z-index 999
  }
   .box-card1 {
      // position absolute
    width: 90%;
    margin 0 auto
    margin-top 1rem
    z-index 999
  }
 </style>
