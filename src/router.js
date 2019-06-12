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
