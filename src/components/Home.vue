<template>
  <div>
    <Top>首页</Top>
    <div class="content">
      <Loading v-if="loading" class="load"></Loading>
      <template v-else>
        <Swiper :swiperSlides="sliders"></Swiper>
        <div class="container">
          <h3>热门图书</h3>
          <ul>
            <li v-for="hot in hotBooks">
              <img v-lazy="hot.bookCover" alt="">
              <b>价格:{{hot.price}}元</b>
            </li>
          </ul>
        </div>
      </template>
    </div>
  </div>

</template>


<script>

  import Top from '../base/Top.vue';
  //引入轮播图组件
  import Swiper from '../base/Swiper.vue'
  import Loading from '../base/Loading.vue'
  import {getSliders, getHotBook} from '../api'
  // import {getAll} from '../api'

  export default {
    created() {
      // this.getData();
      this.getSlider();
      this.getHot();
    },
    data() {
      return {
        sliders: [],
        hotBooks: [],
        loading: true
      }
    },
    methods: {
      // async getData() {
      //   let [sliders, hotBooks] = await getAll();
      //   this.sliders = sliders;
      //   this.hotBooks = hotBooks;
      //   this.loading = false;
      //   //轮播图和热门图书获取完成
      // }
      async getHot() {
        let {data} = await getHotBook();
        this.hotBooks = data;
        this.loading = false;
      },
      async getSlider() {
        //给对象取别名
        let {data: sliders} = await getSliders();
        this.sliders = sliders;
      }
    },
    components: {
      Top, Swiper,Loading
    },
    name: "Home"
  }
</script>

<style scoped lang="less">
  h3 {
    color: #999;
    padding: 5px 0;
  }

  .load{
    margin-top: 120px;
  }

  .container {
    width: 90%;
    margin: 0 auto;
    ul {
      display: flex;
      flex-wrap: wrap; /*默认不换行*/
      padding-bottom: 10px;
      li {
        width: 50%;
        text-align: center;
        margin: 5px 0;
        img {
          width: 100%;
        }
      }
    }
  }

</style>
