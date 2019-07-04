import Vue from 'vue'
import Vuex from 'vuex'

import ajax from 'axios';

import base from './untils/base'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
      user:{
          account:'',
          password:''
      },

      token:localStorage.getItem('token'),

      taskid:-1,

      url:'http://localhost/#/',
      uesrinfo:{
          user:'',
          password:''
      },
      infodata:[{
          title:'自助服务',
          arr:[
              {
                  name:'账户问题',
                  arr:['商家账户问题'],
                  template:'account',
                  list:[
                      {
                          name:"查看商家ID",
                          html:`打开商户中心左侧导航栏“店铺管理”即可查看商家ID。`
                      },

                      {
                          name:"忘记密码",
                          html:`答：点击登录界面右下方的“密码找回”按钮，即可重新设置密码。`
                      },

                      {
                          name:"绑定店铺数量",
                          html:`一个商家账户可以绑定30个店铺。`
                      }
                  ]
              },
              {
                  name:'操作问题',
                  arr:['商家操作问题'],
                  link:'',
                  list:[
                      {
                          name:"删除店铺",
                          html:`联系平台工作人员进行手工删除。`
                      },

                      {
                          name:"打开网站失败",
                          html:`首先检查网络正常，其次检查网址是否正确。如果都正常，建议清理下浏览器，推荐使用谷歌浏览器，刷新后重新登录。`
                      },

                      {
                          name:"绑定店铺",
                          html:`答：打开商户中心左侧导航栏中的店铺管理，点击“增加绑定店铺”按钮，进行添加。`
                      },

                      {
                          name:"删除店铺",
                          html:`联系平台工作人员进行手工删除。`
                      },

                      {
                          name:"打开网站失败",
                          html:`首先检查网络正常，其次检查网址是否正确。如果都正常，建议清理下浏览器，推荐使用谷歌浏览器，刷新后重新登录。`
                      },

                      {
                          name:"充值",
                          html:`①：线下打款到平台官方银行账户
                          ②：提交打款信息
                          `
                      },

                      {
                          name:"遇到商家不要截图的怎么办？",
                          html:`部分商家有特殊要求，会要求买手不要截图

遇到这样的可以直接不截图，正常浏览购买，

软件上传图以其他的图片代替上传`
                      },

                      {
                          name:"店铺发货地址",
                          html:`进入店铺管理界面，点击右侧“修改”按钮即可修改店铺信息。`
                      }
                  ]
              },

              {
                  name:'资金问题',
                  arr:['商家资金问题'],
                  link:'',
                  list:[
                      {
                          name:"本金返款",
                          html:`答：用户提交任务后24小时内商家须完成本金返款操作，超过24小时系统默认商家认可此单并自动给用户返还本金。


①如果用户填写金额和实际付款金额不符怎么办？

点击“返款确认”按钮进入返款修改界面后可修改返款金额，然后点击“确认提交”按钮就可以了。
②平台遵守多退少补原则：

当用户提交金额小于商家发布任务金额，多余的钱会自动退回到商家的本金账户

当用户提交金额大于商家发布任务金额，商家须确认用户操作是否有误，如果有误联系平台客服出，确认无误返款时系统会主动从商家本金账户扣除相应的差价进行返款。


`
                      },

                      {
                          name:"佣金充值",
                          html:`1.输入充入金币数量，自动从本金扣除相应金额得到对应金币（确保本金账户有足够余额），佣金一旦充值不予提现，只可用来发布任务使用。

2.直接消费形式，每次放单直接从本金扣除相应佣金。`
                      },

                      {
                          name:"商家提现",
                          html:`联系平台客服进行提现，商家须提供：①平台注册手机号码 ②收款银行卡号 ③银行卡姓名

工作人员会在72小时内进行打款。`
                      },

                      {
                          name:"充值失败",
                          html:`充值失败分为两种情况：①打开失败未到账  ②打款信息提交有误


第一步：核对打款时填写的银行卡号和姓名是否正确。


第二步：核对提交信息时打款人姓名（打款卡号实名认证的姓名）是否正确。



如果核对后确保无误，请联系平台工作人员处理。`
                      },

                      {
                          name:"想更改提现的银行卡怎么办？",
                          html:`联系平台客服提供姓名,有收入软件id，正确的银行和银行卡号即可更改`
                      }
                  ]
              },
              {
                  name:'其它问题',
                  arr:['商家其它问题'],
                  template:'orderP',
                  list:[
                      {
                          name:'免审',
                          html:`免审商家24小时内随时可以发布任务，并且优先审核任务。`
                      },
                      {
                          name:'店铺审核',
                          html:`店铺绑定后，平台的工作人员会在10分钟内审核通过。`
                      },
                      {
                          name:'假聊',
                          html:`鉴于真实用户实际购物时并不是每单都聊天，平台尊重用户的购物习惯，过多的假聊对于店铺静默转化率有不良影响，平台为了全局考虑，设置了假聊环节，但是平台不提倡也不反对假聊。如果商家需要假聊，建议在备注里强调说明。`
                      },
                      {
                          name:'用户退款',
                          html:`答：首先商家电话联系买家问明情况，尽量协商取消退款；协调不了联系平台工作人员。

①没有返款，联系平台工作人员取消任务，本佣金自动退回；

②已经返款，第一时间电话联系买家沟通让买家取消退款，如果误操作退款，让买家补拍，若协商未果联系平台工作人员处理。平台全程担保全程赔付，保障商家资金安全！`
                      },
                      {
                          name:'用户退款',
                          html:`①用户没有及时评价

用户不评价将无法获取任务佣金，商家应该尊重用户的购物习惯这样更加安全，若用户长时间不评价再联系用户进行评价，实在联系不到可求助于平台客服人员。

②用户没有按照要求评价

用户没有按照商家的要求进行评价可联系用户进行沟通，沟通不了联系平台工作人员处理。`
                      },
                      {
                          name:'评价',
                          html:`①用户没有及时评价

用户不评价将无法获取任务佣金，商家应该尊重用户的购物习惯这样更加安全，若用户长时间不评价再联系用户进行评价，实在联系不到可求助于平台客服人员。

②用户没有按照要求评价

用户没有按照商家的要求进行评价可联系用户进行沟通，沟通不了联系平台工作人员处理。`
                      }
                  ]
              }
          ]
      }
      ],
      mtext:'元',
      count:1,//添加任务的步骤
      qq_img:'https://murenziwei.github.io/qiurenmai/src/assets/20190704173604.jpg',
      icon5:"https://murenziwei.github.io/qiurenmai/src/assets/icon5-02.png",
      bg9:"https://murenziwei.github.io/qiurenmai/src/assets/bg-9.jpg",
      bg2:"https://murenziwei.github.io/qiurenmai/src/assets/bg-2.png",
      bg1:"https://murenziwei.github.io/qiurenmai/src/assets/bg-1.jpg",
      urlimg:"data:image/png;base64,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"
  },
  getters:{
  },
  mutations: {
      addfn(state){
          state.count++
      },
      lessfn(state){
          state.count--
      },
      controlfn(state,obj){
          state.count+=obj.val;
      },

      setfn(state,obj){
          state.count=obj.val;
      },

      settidfn(state,obj){
          state.taskid=obj.id;
      },

      loginfn(state){
          ajax.post(`${base.api}/login/userLogin`,state.user).then((res)=>{
              res=res.data;
              if(res.code){
                  console.log(res,'res,sfefe');
                  localStorage.setItem("login",JSON.stringify(res.data))
                  localStorage.setItem("token",res.data.access_token);
              }
          })

      },
      setuserfn(state,val){
          state.user=val;
      }
  },
  actions: {
      loginco:function(context,user){
          context.commit('loginfn',user);
      },

      setTid:function(context,val){
          context.commit('settidfn',val);
      },
      setuser:function(context,val){
          context.commit('setuserfn',val);
      },
      setco:function(context,val){
        context.commit('setfn',val);
      },
      addco:function(context){
          context.commit('addfn');
      },
      lessco:function(context){
          context.commit('lessfn');
      },
      controlco:function(context,val){
          context.commit('controlfn',val);
      }
  }
})
