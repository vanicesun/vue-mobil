<template>
  <div>
    <Top>列表页</Top>
    <div class="content">
      <ul>
        <router-link v-for="(book,index) in books" :to="{name:'detail',params:{bid:book.id}}" :key="index" tag="li">
          <img v-lazy="book.bookCover" alt="图片">
          <div class="container">
            <h4>书名: {{book.bookName}}</h4>
            <h4>作者: {{book.Author}}</h4>
            <p>价格: {{book.price}}元</p>
            <br>
            <el-button @click.stop="remove(book.id)" type="danger" size="mini" icon="el-icon-delete">删除</el-button>
          </div>
        </router-link>
      </ul>
      <div @click="more" class="more">加载更多</div>
    </div>
  </div>
</template>

<script>
  import Top from '../base/Top.vue'
  import {getAllBook, removeBook,moreData} from '../api'

  export default {
    created() {
      this.getAll();   //获取所有图书
      this.pageForData();
    },
    mounted(){
    },
    data() {
      return {
        books: [],
        pageBooks:[],
        offset: 0,
        hasMore:true
      }
    },
    methods: {
      more(){
        this.pageForData();
      },
      async getAll() {
        let {data} = await getAllBook();
        this.books = data;
      },
      async remove(id) {
        await removeBook(id);   //根据id删除数据
        this.getAll(); //删除后刷新前台数据
        //或者这样写
        // books = books.filter(item=>item.id !== id);
      },
      async pageForData(){
        if(this.hasMore){
          let {hasMore,books} = await moreData(this.offset);
          this.pageBooks = [...this.pageBooks,...books];
          this.hasMore = hasMore;
          this.offset = this.pageBooks.length;
        }
      }
    },
    components: {
      Top
    },
    name: "List"
  }
</script>

<style scoped>
  .content ul {
    padding: 10px;
  }

  .content ul li {
    display: flex;
    padding: 5px 0;
    padding-bottom: 10px;
    border-bottom: 1px solid #f1f1f1;
  }

  .container {
    text-align: center;
    padding-top: 10px;
    padding-left: 20px;
  }
  img{
    padding-left: 25px;
  }
  .more{
    margin: 10px;
    background: #00C1DE;
    height: 30px;
    text-align: center;
    line-height: 30px;
    font-weight: bold;
  }

  .content h4 {
    font-size: 17px;
    line-height: 20px;
    padding: 3px;
  }

  .content ul li img {
    width: 120px;
    height: 120px;
    line-height: 25px;
  }

  .content p {
    color: red;
  }
</style>
