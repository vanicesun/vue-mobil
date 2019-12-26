<template>
    <div class="footer">
      <router-link to="/home">
        <i class="el-icon-s-home"></i>
        <span>首页</span>
      </router-link>
      <router-link to="/list">
        <i class="el-icon-s-order"></i>
        <span>列表</span>
      </router-link>
      <router-link to="/add">
        <i class="el-icon-plus"></i>
        <span>新增</span>
      </router-link>
      <router-link to="/collect">
        <i class="el-icon-star-off"></i>
        <span>收藏</span>
      </router-link>

    </div>
</template>


<style scoped lang="less">
  .footer{
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 50px;
    display: flex;
    border-top: 1px solid;
    a{
      display: flex;
      color: #0000FF;
      flex-direction: column;
      flex:1;
      align-items: center;
      justify-content: center;
    }
    a.router-link-active{
      color:red;
    }
  }
</style>
