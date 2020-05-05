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
    <el-badge   style="float: right" :value="list.like" class="item">
     <el-popover
    placement="top"
    width="20"
    trigger="click"
    content="点赞成功">
<el-button slot="reference" type="warning" icon="el-icon-star-off" circle @click="like(list.id)"></el-button>
  </el-popover>
   </el-badge>
    <!-- <el-badge  style="float: right" :value="likeNum" class="item">
<el-button  type="warning" icon="el-icon-star-off" circle @click="like(list.id)"></el-button>
        </el-badge> -->
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
  data () {
    return {
      likeNum: 1
    }
  },
  props: {
    list: Object
  },
  mounted () {
    this.likeNum = this.list.like
  },
  methods: {
    like (id) {
      console.log('点赞成功' + this.list.like)
      this.list.like++ // bug
    }
  }
}
</script>
 <style lang="stylus" scoped>
 .wrapper
   //  background #fff !important
   z-index 998
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
      position absolute
      top 30%
      left 0
      right 0
      bottom 0
    width: 90%;
    margin 0 auto
    // margin-top -2rem
    // z-index 3
  }
   .box-card1 {
    position absolute
    width: 90%;
    top 110%
    left 0
    right 0
    bottom 0
    margin 0 auto
    height 150%
   // z-index 3
  }
 </style>
