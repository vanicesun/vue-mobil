<template>
  <div class="detail">
    <Top :back="true">新增页面</Top>
    <i class="el-icon-back" v-if="back" @click="goBack"></i>
    <div class="content">
      <ul>

        <li>
          <el-input v-model="bookInfo.bookCover" id="bookCover">
            <template slot="prepend">封面</template>
          </el-input>
        </li>

        <li>
          <el-input v-model="bookInfo.bookName" id="bookName">
            <template slot="prepend">书名</template>
          </el-input>
        </li>

        <li>
          <el-input v-model="bookInfo.Author" id="Author">
            <template slot="prepend">作者</template>
          </el-input>
        </li>

        <li>
          <el-input v-model.number="bookInfo.price" id="price">
            <template slot="prepend">价格</template>
          </el-input>
        </li>

        <li>
          <el-input v-model="bookInfo.Date" id="Date">
            <template slot="prepend">日期</template>
          </el-input>
        </li>
        <li>
          <el-button type="primary" size="mini" icon="el-icon-plus" @click="add">确认添加</el-button>
        </li>
      </ul>

    </div>
  </div>
</template>

<script>
  import Top from '../base/Top.vue'
  import {addBookInfo} from '../api'

  export default {
    components: {
      Top
    },
    methods:{
      goBack(){
        this.$router.go(-1);
      },
      async add(){
        await  addBookInfo(this.bookInfo);
        this.$router.push('/list');
      }
    },
    data(){
      return{
        bookInfo:{}
      }
    },
    name: "Add"
  }
</script>

<style scoped>
  .detail {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: #fff;
    z-index: 100;
  }
  .content ul{
    padding: 15px;
    margin-top: 20px;
  }
  .content ul li{
    display: flex;
    padding: 5px 0;
    padding-bottom: 10px;
  }
  p{
    color: red;
    padding: 3px;
  }
  h4{
    padding: 3px;
  }
  .container{
    padding-top: 15px;
  }
  .pho{
    padding-left: 90px;
  }

</style>
