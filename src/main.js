
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import VueAwesomeSwiper from 'vue-awesome-swiper'   //轮播图插件
import 'swiper/dist/css/swiper.css'

//实现图片懒加载
import VueLazyload from 'vue-lazyload'
Vue.use(VueLazyload,{
  preLoad:1.3,
  error:'http://bpic.588ku.com/element_origin_min_pic/00/56/29/4556d9f8022935e.jpg',
  loading:'http://www.17qq.com/img_qqtouxiang/79912467.jpeg',
  attempt:1
});

Vue.config.productionTip = false
Vue.use(ElementUI);
Vue.use(VueAwesomeSwiper);


new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
