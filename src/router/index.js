import Vue from 'vue'
import Router from 'vue-router'

//
// import Home from '@/components/Home'
// import Add from '@/components/Add'
// import Collect from '@/components/Collect'
// import Detail from '@/components/Detail'
// import List from '@/components/List'

Vue.use(Router)

export default new Router({
  mode:'history',
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '*',
      redirect: '/home'
    },
    {
      path: '/add',
      name: 'Add',
      component: ()=>import('../components/Add.vue')
    },
    {
      path: '/home',
      name: 'Home',
      component: ()=>import('../components/Home.vue'),
      meta:{keepAlive: true}   //是否需要缓存   取得时候:this.$route.meta.keepAlive
    },
    {
      path: '/detail/:bid',
      name: 'detail',
      component: ()=>import('../components/Detail.vue')
    },
    {
      path: '/list',
      name: 'List',
      component: ()=>import('../components/List.vue')
    },
    {
      path: '/collect',
      name: 'Collect',
      //将组件按照函数的方法进行动态加载组件
      component:()=>import('../components/Collect.vue')
    }
  ]
})
