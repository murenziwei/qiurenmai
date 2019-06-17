import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)


const about={
  name:'about',
  val:[
    {
      path:'',
      component:()=>import('./components/notice.vue'),
      data:{
        name:'商家公告',
        icon:'el-icon-picture-outline-round'
      }
    },
    {
      path:'issue',
      component:()=>import('./components/issue.vue'),
      data:{
        name:'发布任务',
        icon:'el-icon-plus'
      }
    },
    {
      path:'pricetable',
      component:()=>import('./components/pricetable.vue'),
      data:{
        name:'价格表',
        icon:'el-icon-s-grid'
      }
    },
    {
      path:'shopseting',
      component:()=>import('./components/shopseting.vue'),
      data:{
        name:'店铺设置',
        icon:'el-icon-setting'
      }
    },
   {
      path:'paytask',
      component:()=>import('./components/paytask.vue'),
      data:{
          name:'垫付任务管理',
          icon:'el-icon-c-scale-to-original'
      }
   },
  {
      path:'previewtask',
      component:()=>import('./components/previewtask.vue'),
      data:{
          name:'浏览任务管理',
          icon:'el-icon-camera-solid'
      }
  },
  {
      path:'noorder',
      component:()=>import('./components/noorder.vue'),
      data:{
          name:'待接订单',
          icon:'el-icon-s-operation'
      }
  }
  ]
};

export default new Router({
  // mode:'history',
  about,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/'+about.name,
      name: about.name,
      component: () => import( './views/About.vue'),
      children:about.val
    },
    {
      //登录
      path: '/login',
      name: 'login',
      component: ()=>import('./views/Login.vue')
    },
    {
      //注册
      path: '/register',
      name: 'register',
      component: ()=>import('./views/Register.vue')
    },
    {
      //忘记密码
      path: '/forget',
      name: 'forget',
      component: ()=>import('./views/Forget.vue')
    },
    {
      //404
      path:'*',
      name:'notfound',
      component:()=>import('./components/NotFound.vue')
    }
  ]
})
