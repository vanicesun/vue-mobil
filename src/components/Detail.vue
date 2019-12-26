<template>
  <div class="detail">

    <Top :back="true">图书详情</Top>
    <i class="el-icon-back" v-if="back" @click="goBack"></i>
    <div class="content">
      <ul>

        <li v-show="bookInfo.bookCover">
          <img :src="bookInfo.bookCover" alt="图片" class="pho">
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
          <el-button type="primary" size="mini" icon="el-icon-edit" @click="edit">确认编辑</el-button>
        </li>
      </ul>

    </div>
  </div>
</template>

<script>
  import Top from '../base/Top.vue'
  import {findBookInfoById,editBookInfo} from '../api'
  export default {
    watch:{
      $route(){ //只要路径发生变化就重新获取数据
        this.getBookById(this.bid);
      }
    },
    created(){
      this.getBookById(this.bid);
    },
    components: {
      Top
    },
    computed:{
      bid(){
        return this.$route.params.bid
      }
    },
    data(){
      return{
        bookInfo:{}
      }
    },
    methods:{
      goBack(){
        this.$router.go(-1);
      },
      async getBookById() {
        let {data} = await findBookInfoById(this.bid);
        this.bookInfo = data;
        //如果是空对象就返回列表页
        Object.keys(this.bookInfo).length >0?void 0:this.$router.push('/list')    //把对象转为数组看是否是空对象
      },
      async edit(){  //修改图书信息
        await editBookInfo(this.bid,this.bookInfo);
        this.$router.push('/list'); //修改成功后跳转到列表页面
      }
    }
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
