<template>
  <div class="about">
    <!--低于767px显示-->
    <div class="mn-father">
      <div class="mobile-nav">
        <div class="m-n-people">
          <i :class="{'el-icon-user-solid':isPeople,'el-icon-close':!isPeople,'mnl-people':true}" @click="peoplefn"></i>
        </div>
        <div class="m-n-list">
          <i :class="{'el-icon-more':isAside,'el-icon-circle-close':!isAside,'mnl-more':true}" @click="asidefn"></i>
        </div>
      </div>
    </div>
    <!--顶部-->
    <div class="ani">
      <transition type="animation">
        <div :class="{'a-top':true,bounceInRight:!isPeople,bounceOutRight:isPeople}" v-show="!isPeople">
          <div class="at-xs">
            <!--<span>LV 0</span>-->
            <el-link  @click="peoplecontrol('shopseting')" class="recharge"> {{userinfo.user.ue_account|strno}}</el-link>
          </div>
          <div class="at-xs">
            佣金：<span class="money">{{ue_money['commission']|strno}}</span>金<el-link type="primary" @click="peoplecontrol('itunes')" class="recharge">充值</el-link>
          </div>

          <div class="at-xs">
            <el-link type="primary" href="#/">退出</el-link>
          </div>

          <div class="at-xs">
            <el-popover
                    placement="left"
                    width="300"
                    trigger="click" v-model="passstatus">
              <el-form ref="passform" :model="passform" :rules="passRule">
                <el-row class="mt1">
                  手机号：{{userinfo.user.ue_account|strno}}
                </el-row>
                <el-form-item prop="old_pwd">

                  <el-row class="mt1">
                    <el-input placeholder="输入旧密码" v-model="passform.old_pwd" show-password>
                      <template slot="prepend">
                        <i class="el-icon-s-goods"></i>
                      </template>
                    </el-input>
                  </el-row>
                </el-form-item>
                <el-form-item prop="new_pwd">

                  <el-row class="mt1">
                    <el-input placeholder="设置新密码" v-model="passform.new_pwd" show-password>
                      <template slot="prepend">
                        <i class="el-icon-s-goods"></i>
                      </template>
                    </el-input>
                  </el-row>
                </el-form-item>
                <el-form-item prop="conf_pwd">

                  <el-row class="mt1">
                    <el-input placeholder="确认新密码" v-model="passform.conf_pwd" show-password>
                      <template slot="prepend">
                        <i class="el-icon-s-goods"></i>
                      </template>
                    </el-input>
                  </el-row>
                </el-form-item>
                <el-divider></el-divider>
                <el-row class="mt-c">
                  <el-button icon="el-icon-circle-check" @click="passfn('passform')">确认提交</el-button>
                </el-row>
              </el-form>
              <el-button slot="reference" type="text" @click="resetform('passform')">修改密码</el-button>
            </el-popover>
          </div>
        </div>
      </transition>
    </div>
    <div class="a-tags ani">
      <div class="at-left">
        <i :class="{'el-icon-menu':isTag,'el-icon-close':!isTag}" alt="" class="a-l-png" @click="tagfn" />
      </div>
      <transition type="animation">
        <div :class="{'at-right':true,fadeIn:!isTag,fadeOut:isTag}" v-show="!isTag">
          <div :class="{'a-r-list':true,'active':tagCount==0}">
            <div class="arl-link" @click.stop="tagcontrol(0)">
              <span class="a-l-text">买手中心</span>
            </div>
          </div>
        </div>
      </transition>
    </div>
    <div>

      <div v-if="tagCount==-1">
        <div class="pa1">
          <detail_component :id="$route.query.id" :type="$route.query.type" :status="$route.query.status"></detail_component>
        </div>
      </div>
      <div v-if="tagCount==0">

        <div class="ani as">
          <transition type="animation">
            <div :class="{'a-slide':true,bounceInLeft:!isAside,bounceOutLeft:isAside}" v-show="!isAside">
              <div class="as-items" v-for="(item,index) in asideTag.val" :key="index">
                <router-link :to="'/'+asideTag.name+'/'+item.path" :class="{'a-i-nav':true,'active':nowrou==('/'+asideTag.name+'/'+item.path)}">
                  <i :class="item.data.icon+' ain-icon'"></i>
                  <span class="ain-text">{{item.data.name}}</span>
                </router-link>
              </div>
            </div>
          </transition>
        </div>
        <div class="a-content">
          <router-view></router-view>
        </div>
      </div>
      <template v-for="(item,index) in tags" >
        <div v-if="tagCount==(index+1)">
            <component :is="item.template"></component>
        </div>
      </template>

    </div>


    <!--联系客服-->
    <service></service>
  </div>
</template>
<script>
  import ajax from 'axios';

  import service from '../components/service.vue';


  // 查看详情
  import detail_component from '../components/maishou/detail_component';

  // 垫付详情
  import paydetail from '../components/paydetail.vue';

  import shopinfo from '../components/shopinfo.vue';
  import shophelp from '../components/shophelp.vue';
  export default {
    data() {

      var validatePass2 = (rule, value, callback) => {
          if (value === '') {
              callback(new Error('请再次输入密码'));
          } else if (value !== this.passform.new_pwd) {
              callback(new Error('两次输入密码不一致!'));
          } else {
              callback();
          }
      };
      return {

        passRule:{
              old_pwd:[
                  {
                      required:true,
                      message:'旧密码不能为空',
                      trigger:'blur'
                  }
              ],
              new_pwd:[
                  {required: true, message:'新密码不能为空', trigger: 'blur' }
              ],
              conf_pwd:[
                  {required: true, validator: validatePass2, trigger: 'blur' }
              ]
          },

        ue_money:{
            ue_jin: "554161.70"
        },

        userinfo:{},
        passstatus:false,
        passform:{
            new_pwd:'',
            old_pwd:'',
            conf_pwd:''
        },
        tagCount:0,
        tags:[
          {
            text:'商家介绍',
            template:'shopinfo'
          },
          {
            text:'常见问题',
            template:'shophelp'
          }
        ],
        asideTag:{},
        isAside:false,
        isPeople:true,
        isTag:true,
        nowrou:''
      };
    },
    created(){
      this.tagCount=this.$route.query.tagcount||0;
      this.asideTag=this.$router.options.maishou;
      this.nowrou=this.$router.currentRoute.path;

      ajax.all([this.go_user(),this.go_money()]);
    },
    filters:{
        strno:function(value){
             if(typeof value=='string'&&value.length>4){
                 var arr=value.split('');
                 arr.splice(-4);
                 value=arr.join('');
                 value+='***';
                 return value;
             }else{
                 return '***'
             }
        }
    },
    methods: {

      resetform(formName){

          this.$refs[formName].resetFields();
      },
      go_money(){
          return this.$api.ports.getMoney().then((res)=>{
              if(res.code){
                  console.log(res,'getMoney');
                  this.ue_money=res.data[0];
              }else{
                  this.$notify.error(res.message);
              }
          })
      },

      go_user(){
          this.userinfo=JSON.parse(localStorage.getItem('login'));
      },
      passfn(formName){

          this.$refs[formName].validate((valid) => {
              if (valid) {
                  var getR=this.passform;

                  //请求注册后台
                  this.$api.ports.editPwd(getR).then((res)=>{
                      if(res.code){
                          this.passstatus=false;
                          this.$message.success('修改成功');

                      }else{
                          this.$message.error(res.message);
                      }
                  }).catch((err)=>{
                      console.log(err,'错误');
                  })

              } else {
                  return false;
              }
          });
      },
      peoplecontrol(n){
        this.tagCount=0;
        if(window.innerWidth<767){
          this.isPeople=true;
        }
        this.$router.push("/maishou/"+n)
      },
      tagcontrol(n){
        console.log(n,'你好');
        this.tagCount=n;
        if(n==0){
          this.$router.push("/maishou/")
        }
      },
      nowrouter(to){

        if(!to.query.tagcount){
            this.tagCount=0;
        }else{
            this.tagCount=to.query.tagcount;
        }
        this.nowrou=to.path;
        this.isAside=true;
      },
      tagfn(){
        this.isTag=!this.isTag;
      },
      peoplefn(){
        this.isPeople=!this.isPeople;
      },
      asidefn(){
        this.isAside=!this.isAside;
      },
      handleClick(tab, event) {

      }
    },
    watch:{
      '$route':'nowrouter'
    },
    components:{
        service,
        detail_component,
        paydetail,
        shopinfo,
        shophelp
    }
  };
</script>
<style lang="less">
.el-dialog{
  width:80%!important;
}
.el-message-box{
  width:unset;
  max-width:420px;
}

.pa1{
  padding:1rem;
}
.mt1{
  margin:1rem 0;
}
.mt-c{
  margin:1rem 0;
  text-align:center;
}
.clearfix{
  text-align:left;
  .c-topic{
    font-size:1.5rem;
    color:#000;
    font-weight:bold;
    opacity:.8;
  }
}

.mn-father{
  height:3rem;
  display:none;
}
.mobile-nav{
  position:fixed;
  top:0;
  left:0;
  right:0;
  .flex(center,flex-end,row);
  z-index:2;
  width:100%;
  box-sizing:border-box;
  box-shadow:0 2px 12px 0 rgba(0,0,0,.1);
  height: 3rem;
  background-color:rgba(255,255,255,.8);
  .mnl-people,.mnl-more{
    font-size:1.5rem;
    padding:0 1rem;
    color:#1989fa;
  }
  .m-n-list{
    flex:1;
    .flex(center,flex-end,row);
    text-align:right;

  }
}
@media only screen and (max-width:767px){
  .mn-father{
    display:block;
  }
}


.a-slide{
  width:100%;
  float:left;
  border:1px solid #eee;
  box-sizing:border-box;
  background-color:#fff;

}
.a-content{
  position:relative;
  width:75%;
  float:right;
  box-sizing:border-box;
  text-align:left;

}
.a-i-nav{
  .an03;
  &.active,&:hover{
    background-color:#1989fa;
    color:#fff;
  }
  .flex(center,flex-start,row);
  text-decoration:none;
  height:2.5rem;
  border-bottom:1px solid #eee;
  color:#737272;
  .ain-icon{
    padding:0 1rem;
    font-size:1rem;
  }
  .ain-text{
    font-size:.8rem;
    flex:1;
    white-space:nowrap;
    text-overflow:ellipsis;
    overflow:hidden;
    text-align:left;
  }
}
@media only screen and (min-width:767px){
  .at-right{
    padding:0 2rem;
  }
  .ani.as{
    padding:0 1rem;
    box-sizing:border-box;
    width:25%;
  }
  .a-slide{
    display:block!important;
    .a-i-nav{height:3rem;}
  }
  .a-content{
    padding:0 1rem;
  }
  .a-i-nav{
    .ain-icon{
      font-size:1.2rem;
    }
    .ain-text{font-size:1rem;}
  }
}
@media only screen and (max-width:767px){
  .a-slide{
    position:fixed;
    left:0;
    top:0;
    bottom:0;
    width:50%;
    z-index:1000;
  }
  .a-content{
    width:100%;
  }
}


.at-right{
  .flex(center,flex-start,row);
  .a-r-list{
    margin:1rem;
    .arl-link{
      text-decoration:none;
      color:#000;
    }
    &.active .arl-link{
      color:#0098e1;
    }
  }
}
.a-tags{
  .flex(center,flex-end,row);
  padding:1rem 0;
}
.at-left{
  margin:0 1rem;
}
.a-l-png{
  width:3rem;
}
@media only screen and (min-width:767px){
  .a-top{
    padding:0 3rem!important;
  }
  .at-left{display:none!important;}
  .at-right{display:flex!important;}
  .a-tags{
    border-bottom:4px solid #0098e1;
    margin-bottom:2rem;
  }
}
@media only screen and (max-width:767px){
 .a-tags{
   position:fixed;
   bottom:2rem;
   right:2rem;
   z-index:1000;
   .at-left{
     width:3rem;
     height:3rem;
     border-radius:100%;
     background-color:#fff;
     overflow:hidden;
     box-shadow:0 0 1px rgba(0, 0, 0, 0.7);
     .flex(center,center,row);
     .a-l-png{
       width:2rem;
     }
   }
   .at-right{
     background-color:#fff;
     position:absolute;
     right:0;
     bottom:6rem;
     .flex(flex-start,flex-end,column);
     .a-l-text{
       white-space:nowrap;
       cursor:pointer;
     }
   }
 }
}
.a-l-text{
  cursor:pointer;
}

.a-top{
  .flex(center,flex-end,row);
  border: 1px solid #EBEEF5;
  box-sizing:border-box;
  padding:0 1rem;
}
.money{
  color:#f56c6c;
}
.recharge{margin-left:.5rem;}
.at-xs{
  .flex(center,center,row);
  line-height:3;
  &:after{
    content:"|";
    padding:0 1rem;
  }
  &:last-child:after{
    display:none;
  }
}

@media only screen and (min-width:767px){
  .a-top{
    display:flex!important;
    .at-xs{line-height:4;}
  }
}
@media only screen and (max-width:767px){
  .a-top{
    position:fixed;top:0;bottom:0;right:0;width:50%;.flex(flex-start,flex-start,column);
    z-index:1000;
    background-color:#fff;
  }
  .at-xs:after{
    display:none;
  }
}

.ani{
  .bounceInLeft{
    animation:bounceInLeft .5s;
  }

  .bounceOutLeft{
    animation:bounceOutLeft .5s;
  }
  .bounceInRight{
    animation:bounceInRight .5s;
  }

  .bounceOutRight{
    animation:bounceOutRight .5s;
  }

  .fadeIn{
    animation:fadeIn .5s;
  }

  .fadeOut{
    animation:fadeOut .5s;
  }


}
.zhe{
  position:fixed;
  top:0;
  left:0;
  right:0;
  bottom:0;
  z-index:999;
}

.flex(@ai,@jc,@fd){
  display:flex;
  align-items:@ai;
  justify-content:@jc;
  flex-direction:@fd;
}
.an03{
  transition:all .3s;
}
</style>