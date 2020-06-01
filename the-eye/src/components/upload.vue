<template>
<div>
    <el-upload
  class="upload-demo"
  action="http://192.168.1.8:3000/upload/"
  :on-success = "handleSuccess"
  :file-list="fileList"
  :data= "upData"
  limit = 1
  list-type="picture">
  <div class="upButton">
  <el-button size="small" type="primary" >点击上传</el-button>
  </div>
  <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且一次只能上传一张</div>
   <div slot="tip" class="el-upload__tip">谢谢使用该功能帮助我们提高模型识别率，请选择上传图片的类别</div>
</el-upload>
<div >
    <el-radio-group v-model="upData.class" size="small">
      <el-radio-button label="R">可回收</el-radio-button>
      <el-radio-button label="O" >不可回收</el-radio-button>

    </el-radio-group>
  </div>
</div>
</template>

<script>
export default {
  name: 'upload',
  data () {
    return {
      upData: {
        class: 'O'
      },
      fileList: []
    }
  },
  methods: {
    handleSuccess () {
      this.$message('上传成功！')
    }
  }
}
</script>

<style>
.el-upload__tip{
    color: white;
}
.upButton{
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
    }
</style>
