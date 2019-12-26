<template>
  <swiper :options="swiperOption">
    <swiper-slide v-for="(slide, index) in swiperSlides" :key="index">
      <img :src="slide" alt="轮播图">
    </swiper-slide>
    <div class="swiper-pagination" slot="pagination"></div>
  </swiper>
</template>

<script>
  export default {
    name: 'carousel',
    props:['swiperSlides'],
    data() {
      return {
        swiperOption: {
          autoplay:1200,
          pagination: '.swiper-pagination',
          mousewheelControl : true
        },
      }
    }
  }
</script>

<style scoped lang="less">
  img{
    width: 100%;
    height: 200px;
  }
</style>
