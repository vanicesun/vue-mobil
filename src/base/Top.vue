<template>
    <div class="top">
      <slot></slot>
      <i class="el-icon-back" v-if="back" @click="goBack"></i>
    </div>
</template>

<script>
    export default {
      props:{
        back:{
          type:Boolean,
          default:false
        }
      },
      name: "Top",
      data(){
        return{

        }
      },
      methods:{
        goBack(){
          this.$router.go(-1);
        }
      }
    }
</script>

<style scoped lang="less">

  .top{
    position: fixed;
    top:0;
    left: 0;
    width: 100%;
    background-color: #00C1DE;
    height: 40px;
    text-align: center;
    line-height: 40px;
    font-weight: bold;
    i{
      position: absolute;
      left: 15px;
      top:10px;
      font-size: 20px;
    }

  }


</style>
