<template>
  <div class="home" v-loading="lwload">

    <div :class="{'h-header':true,'active':scrollBol}">

      <el-col class="wow bounceInDown hh-frame hidden-xs-only" data-wow-delay=".1s"   :xs="0" :sm="24">
        <div class="hh-left">
          <div class="h-l-btns">
            <div class="hlb hlb-login" @click="loginnav">登录</div>
            <div class="hlb hlb-register" @click="registernav">注册</div>
          </div>
          <ul class="h-l-ul">

            <li class="h-l-li" v-for="(item) in headnav">
              <a :href="item.nav" class="hll-text">{{item.text}}</a>
            </li>
          </ul>

        </div>
        <div class="hh-right">
          <div class="h-r-select">
            <div class="h-r-option">
              <div class="hro-li">CN</div>
              <div class="hro-li">
                <i class="el-icon-caret-bottom
"></i>
              </div>

            </div>
          </div>
        </div>
      </el-col>

      <el-col class="wow bounceInDown hidden-sm-only" data-wow-delay=".1s"   :xs="24" :sm="0">
        <div  @click="controlfn" class="hh-frame h-icon-list">
          <i class="hi-ico el-icon-s-fold" ></i>
        </div>
      </el-col>
      <div class="h-drop ani">
        <transition type="animation">
          <div :class="{bounceInLeft:!isCollapse,bounceOutLeft:isCollapse}" v-show="!isCollapse">
            <div class="h-d-zhe" @click="controlfn"></div>
            <ul class="h-d-ul">
              <li class="hdu-li" v-for="(item) in headnav">
                <a :href="item.nav" class="h-l-text">
                  {{item.text}}
                </a>
              </li>
            </ul>
          </div>
        </transition>
      </div>
    </div>
    <div class="h-body">
      <!--http://s.zhuan.net/v1/themes/zh-cn/dist/images/bg-9.jpg-->
      <div id="indexT" class="h-item hb-top" :style="{backgroundImage:'url('+$store.state.bg9+')'}">
        <div class="h-b-frame">
          <div class="hbf-top wow bounceInLeft" data-wow-delay=".2s"  >

            <el-row>
              <el-col class="hbf-text">
                <p>Join Us</p>
                <p>让天下没有难刷的单</p>
              </el-col>
            </el-row>
          </div>
          <div>

            <el-row class="wow bounceInRight" data-wow-delay=".3s"  >
              <el-col :xs="24" :sm="12">
                <div class="h-login h-btn" @click="loginnav">
                  登录
                  <div class="hb-icon"></div>
                </div>
              </el-col>
              <el-col :xs="24" :sm="12">
                <div class="h-register h-btn" @click="registernav">
                  注册
                  <div class="hb-icon"></div>
                </div>
              </el-col>
            </el-row>
            <el-row class="wow bounceInUp" data-wow-delay=".4s"  >
              <a href="#coreT" class="nav-more">
                了解更多
                <br />
                <i class="el-icon-bottom"></i>
              </a>
            </el-row>
          </div>
        </div>
      </div>
      <div id="coreT" class="hb-core" :style="{backgroundImage:'url('+$store.state.bg1+')'}">
        <div class="wow bounceInLeft hc-topic">
          核心
        </div>
        <el-row class="h-t-content">
          <el-col class="wow bounceInUp htc-list"  data-wow-delay=".2s"  :xs="24" :sm="8">
            <div class="h-l-flex">
              <div class="hlf-left">
                <div class="hl-item">
                  <div class="hl-item1"><i class="el-icon-help h-i-icon"></i></div>
                </div>
              </div>
              <div class="hlf-right">
                <p class="hr-p">全国各地</p>
                <p class="hr-p">真实用户</p>
              </div>
            </div>
          </el-col>
          <el-col class="wow bounceInUp htc-list" data-wow-delay=".3s"  :xs="24" :sm="8">
            <div class="h-l-flex">
              <div class="hlf-left">
                <div class="hl-item">
                  <div class="hl-item1"><i class="el-icon-files h-i-icon"></i></div>
                  <div class="max-sha"></div>
                </div>
              </div>
              <div class="hlf-right">
                <p class="hr-p">多平台</p>
                <p class="hr-p">多类型 任务</p>
              </div>
            </div>
          </el-col>

          <el-col class="wow bounceInUp htc-list" data-wow-delay=".4s" :xs="24" :sm="8">
            <div class="h-l-flex">
              <div class="hlf-left">
                <div class="hl-item">
                  <div class="hl-item1"><i class="el-icon-attract h-i-icon"></i></div>
                </div>
              </div>
              <div class="hlf-right">
                <p class="hr-p">资金安全担保</p>
                <p class="hr-p">全额赔付</p>
              </div>
            </div>
          </el-col>
        </el-row>
        <div class="h-t-info">
          <p class="hti-list wow bounceIn" data-wow-delay=".1s"  >销量110平台紧跟淘宝发展趋势,专注搜索研究</p>
          <p class="hti-list wow bounceIn" data-wow-delay=".2s"  >实现全网首家黑科技系列搜索模型,注重有效提权</p>
        </div>
        <div  :style="{backgroundImage:'url('+$store.state.bg2+')'}" class="core-footer  wow fadeIn">
          <el-image class="c-f-zhan" :src="$store.state.bg2" ></el-image>
        </div>


      </div>
      <div id="advantageT" class="hb-advantage">
        <div class="hc-topic wow flipInX">
          优势
        </div>
        <div class="ha-info">
          <p class="h-i-list wow flipInX"  data-wow-delay=".1s"  >销量110平台是电商服务众包平台,针对电商平台搜索排名优化推广效果显著</p>
          <p class="h-i-list wow flipInX"  data-wow-delay=".2s"  >选择使用我们服务的七大理由</p>
        </div>
        <div class="advantage-body">
          <el-row class="ab-row">
            <el-col :xs="24">
              <div class="ab-item wow fadeInDown"  data-wow-delay=".5s">
                <div class="ab-item-in">
                  <i class="el-icon-help ai-icon"></i>
                </div>
              </div>
            </el-col>
            <div class="ab-xs left wow bounceInLeft" data-wow-duration=".5s" data-wow-delay="0s">
              <div>
                <div>
                  <p class="a-x-title"><b>H</b>一人一号</p>
                  <p class="a-x-con">平台独创 <i>1：1：1：1：1</i>用户认证结构，即一个用户对应本人的身份认证，账号认证，锁定设备，支付宝信息吻合，综合信息吻合。最大范围给予商家安全保障。</p>
                </div>
              </div>
            </div>
          </el-row>

          <el-row class="ab-row">
            <el-col :xs="24">
              <div class="ab-item wow fadeInDown"  data-wow-delay=".5s">
                <div class="ab-item-in">
                  <i class="el-icon-collection ai-icon"></i>
                </div>
              </div>
            </el-col>
            <div class="ab-xs right wow bounceInRight" data-wow-duration=".5s" data-wow-delay="0s">
              <div>
                <div>
                  <p class="a-x-title"><b>H</b>打标签</p>
                  <p class="a-x-con">所有用户根据自身购物行为习惯，对年龄，性别，账号等级，花呗（白条），常购物类目等数据维度完善个人购物行为，最大范围给予商家效果保障。</p>
                </div>
              </div>
            </div>
          </el-row>
          <el-row class="ab-row">
            <el-col :xs="24">
              <div class="ab-item wow fadeInDown"  data-wow-delay=".5s">
                <div class="ab-item-in">
                  <i class="el-icon-help ai-icon"></i>
                </div>
              </div>
            </el-col>
            <div class="ab-xs left wow bounceInLeft" data-wow-duration=".5s" data-wow-delay="0s">
              <div>
                <div>
                  <p class="a-x-title"><b>H</b>一人一号</p>
                  <p class="a-x-con">平台独创 <i>1：1：1：1：1</i>用户认证结构，即一个用户对应本人的身份认证，账号认证，锁定设备，支付宝信息吻合，综合信息吻合。最大范围给予商家安全保障。</p>
                </div>
              </div>
            </div>
          </el-row>

          <el-row class="ab-row">
            <el-col :xs="24">
              <div class="ab-item wow fadeInDown"  data-wow-delay=".5s">
                <div class="ab-item-in">
                  <i class="el-icon-collection ai-icon"></i>
                </div>
              </div>
            </el-col>
            <div class="ab-xs right wow bounceInRight" data-wow-duration=".5s" data-wow-delay="0s">
              <div>
                <div>
                  <p class="a-x-title"><b>H</b>打标签</p>
                  <p class="a-x-con">所有用户根据自身购物行为习惯，对年龄，性别，账号等级，花呗（白条），常购物类目等数据维度完善个人购物行为，最大范围给予商家效果保障。</p>
                </div>
              </div>
            </div>
          </el-row>
        </div>
      </div>

      <div id="sanT" class="hb-core banner-san">
        <div class="hc-topic white wow flipInX">
          开发线路图
        </div>
        <div class="block wow rollIn">

          <el-carousel :interval="4000" indicator-position="none" type="card">
            <el-carousel-item v-for="item in 6" :key="item">
              <div class="c-b-in" :style="{backgroundImage:'url('+$store.state.icon5+')'}" >
                <div class="cbi-top">
                  <div class="ct-title">
                    Q3 2017
                  </div>
                  <div class="ct-type">
                    黑科技
                  </div>
                  <div class="ct-bottom">
                    <div class="ct-img" />
                  </div>
                </div>
                <div class="cbi-bottom">
                  完善所有任务类型，千人千面，标签功能，新增黑科技系列搜索玩法
                </div>
              </div>
            </el-carousel-item>
          </el-carousel>
        </div>
      </div>
      <div id="caseT" class="hb-core" :style="'background-image:url('+$store.state.bg9+')'">
        <div class="hc-topic white wow flipInX">
          案例
        </div>
        <el-row class="h-t-content">
          <el-col :xs="24" :sm="12" :md="8" >
            <div class="ju-flex wow bounceInUp">
              <div class="j-f-top red">
                <div class="jft-in">
                  <img src="@/assets/logo.png" alt="" class="jft-i-img" />
                  <div class="jft-i-name">伟哥**万岁</div>
                </div>

              </div>
              <div class="j-f-bottom">
                <div class="j-f-con">
                  我们主要是家电产品，客单价高，销量110平台帮我们解决了资金的安全性问题，不用担心资金，用的比较多的几种任务是：预售任务，活动任务，退款任务。满足官方的活动kpi以及日常的操作需求。销量110平台用户质量很好，能够支撑我们日常推广需求，平时我们的京东单量比较大，评价不过滤是我们选择销量110平台的主要，天猫就以活动单为主。
                </div>
              </div>
            </div>
          </el-col>
          <el-col :xs="24" :sm="12" :md="8" >
            <div class="ju-flex wow bounceInUp">
              <div class="j-f-top blue">
                <div class="jft-in">
                  <img src="@/assets/logo.png" alt="" class="jft-i-img" />
                  <div class="jft-i-name">伟哥**万岁</div>
                </div>

              </div>
              <div class="j-f-bottom">
                <div class="j-f-con">
                  我们主要是家电产品，客单价高，销量110平台帮我们解决了资金的安全性问题，不用担心资金，用的比较多的几种任务是：预售任务，活动任务，退款任务。满足官方的活动kpi以及日常的操作需求。销量110平台用户质量很好，能够支撑我们日常推广需求，平时我们的京东单量比较大，评价不过滤是我们选择销量110平台的主要，天猫就以活动单为主。
                </div>
              </div>
            </div>
          </el-col>
          <el-col :xs="24" :sm="12" :md="8" >
            <div class="ju-flex wow bounceInUp">
              <div class="j-f-top black">
                <div class="jft-in">
                  <img src="@/assets/logo.png" alt="" class="jft-i-img" />
                  <div class="jft-i-name">伟哥**万岁</div>
                </div>

              </div>
              <div class="j-f-bottom">
                <div class="j-f-con">
                  我们主要是家电产品，客单价高，销量110平台帮我们解决了资金的安全性问题，不用担心资金，用的比较多的几种任务是：预售任务，活动任务，退款任务。满足官方的活动kpi以及日常的操作需求。销量110平台用户质量很好，能够支撑我们日常推广需求，平时我们的京东单量比较大，评价不过滤是我们选择销量110平台的主要，天猫就以活动单为主。
                </div>
              </div>
            </div>
          </el-col>
        </el-row>


      </div>

      <div id="noticeT" class="hb-core">
        <div class="hc-topic wow flipInX">
          公告
        </div>
        <el-row class="h-t-content affiche  wow flipInX">

            <el-col>
              <div class="h-login h-btn find-all">
                查看全部
                <div class="hb-icon"></div>
              </div>
            </el-col>
        </el-row>


      </div>
      <div id="contactT" class="hb-core" :style="{backgroundAttachment:'unset',backgroundImage:'url('+this.$store.state.bg9+')'}">
        <div class="hc-topic white wow flipInX">
          联系方式
        </div>
        <el-row class="h-t-content">
          <el-row class="call-ul" type="flex" justify="center" align="middle">
            <el-col class="cu-li wow rotateInDownLeft" :xs="8">
              <div class="cl-out">
                <div class="cl-in">
                  <div class="c-i-top">
                    <img class="c-i-code" src="https://murenziwei.github.io/qiurenmai/active_wx.jpg"></img>
                  </div>


                  <img class="c-i-img" src="@/assets/wx_icon.png" />
                </div>
              </div>
            </el-col>
            <el-col class="cu-li wow rotateInDownRight" :xs="8">
              <div class="cl-out">
                <div class="cl-in">
                  <div class="c-i-top">
                    <img class="c-i-code" src="https://murenziwei.github.io/qiurenmai/active_wx.jpg"></img>
                  </div>


                  <img class="c-i-img" src="@/assets/qq_icon1.png" />
                </div>
              </div>
            </el-col>
          </el-row>

        </el-row>
        <el-row class="touch-footer" type="flex" justify="center">
          <el-breadcrumb separator="|" class="wow bounceInUp">
            <el-breadcrumb-item>Copyright © 2019 murenziwei</el-breadcrumb-item>
            <el-breadcrumb-item>All Rights Reserved</el-breadcrumb-item>
          </el-breadcrumb>
        </el-row>

      </div>

    </div>
  </div>
</template>

<script>

export default {
  name: 'home',
  data(){
      return {
        lwload:true,

        visible:false,
        headnav:[
          {text:'首页',nav:'#indexT'},
          {text:'产品',nav:'#coreT'},
          {text:'联系方式',nav:'#contactT'},
        ],
        isCollapse:true,
        scrolly:0,
        scrollBol:false
      }
  },
  mounted(){
    //数据、dom渲染完毕
    var that=this;
    this.lwload=false;
    document.addEventListener('scroll',function(){
      that.scrolly=window.scrollY;
    })
  },
  methods:{
    loginnav(){
      console.log(this.$router);
      this.$router.push({ path: 'login' })
    },
    registernav(){
        this.$router.push({ path: 'register' })
    },
    controlfn(){
      this.isCollapse=!this.isCollapse;
    },
    handleOpen(key, keyPath) {
      console.log(key, keyPath,1);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath,0);
    },
    changeScr(e){
      if(e!=0){this.scrollBol=true}else{this.scrollBol=false;}
    }
  },
  watch:{
    'scrolly':'changeScr'
  }
}


</script>
<style lang="less" scoped>
.j-f-con::-webkit-scrollbar{
  /*滚动条整体*/
  width:3px;
  float:right;
}
.j-f-con::-webkit-scrollbar-track{
  width:10px;
}
.j-f-con::-webkit-scrollbar-thumb{
  width:10px;
  /*滚动条轨道里面的方块*/
  background-color: gray;
  background-image: -webkit-linear-gradient(45deg, rgba(255, 255, 255, .2) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, .2) 50%, rgba(255, 255, 255, .2) 75%, transparent 75%, transparent);
  background-image: -moz-linear-gradient(45deg, rgba(255, 255, 255, .2) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, .2) 50%, rgba(255, 255, 255, .2) 75%, transparent 75%, transparent);
  background-image: -o-linear-gradient(45deg, rgba(255, 255, 255, .2) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, .2) 50%, rgba(255, 255, 255, .2) 75%, transparent 75%, transparent);
  background-image: linear-gradient(45deg, rgba(255, 255, 255, .2) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, .2) 50%, rgba(255, 255, 255, .2) 75%, transparent 75%, transparent);

}
.cu-li{
  &:nth-child(even){
    .cl-in:after{
      background: #6FB0EA;
    }
  }
  &:nth-child(odd){
    .cl-in:after{
      background: #58689F;
    }
  }
}
.cl-out{
  &:hover .cl-in:after{
    background: -webkit-linear-gradient(left, #F7BC02, #D85C2F, #7F3AAF);
  }
}
.cl-in{
  line-height:6;
  position:relative;
  &:after{
    .an03;
    content:"";
    display:block;
    position:absolute;
    bottom:0;
    left:0;
    right:0;
    height:10px;
    background-color:#eee;
  }

  .c-i-top{
    text-align:center;
    position:absolute;
    left:0;
    right:0;
    top:-7rem;
    z-index:2;
  }
  .c-i-code{
    width:6rem;
    height:6rem;
    opacity:0;
    will-change:opacity;
    .an03;
  }
  &:hover .c-i-code{opacity:1}
  .c-i-img{
    width:3rem;
  }
}
.c-b-in{
  text-align:center;
  background-position:center 0;
  background-repeat:no-repeat;
  .cbi-top{
    margin-top:2rem;
  }
  .ct-title{
    display:inline-block;
    color:#FFF;
    line-height:2rem;
    font-size:1.3rem;
    border-bottom:2px solid #fff;
  }
  .ct-type{
    text-align:center;
    line-height:2rem;
    color:#fff;
  }
  .ct-img{
    width:2rem;
    height:2rem;
    border-radius:100%;
    border:2px solid #fff;
    margin:1rem auto;
    .flex(center,center,row);

    &:after{
      content:"";
      display:block;
      width:50%;
      height:50%;
      border-radius:100%;
      background-color:#fff;
    }

  }
  .cbi-bottom{
    color:#fff;
    font-size:1rem;
    padding:0 1rem;
  }
}
.el-carousel__item{.an03;}
.el-carousel__item:nth-child(2n) {
  background: linear-gradient(135deg,  #56428E,#B11270);
}

.el-carousel__item:nth-child(2n+1) {
  background: linear-gradient(135deg, #B11270, #56428E);
}
.banner-san{
  background: linear-gradient(135deg, #B11270, #56428E);
  padding-bottom:2rem;
}
.cul-text{
  color:#fff;
}
.cul-name:after{
  content:"："
}
.cul-name{
  width:30%;
  text-align:right;
  text-overflow:ellipsis;
  overflow: hidden;
  white-space:nowrap;
}
.call-ul{
  padding:0;
  margin-bottom:1rem;
  list-style:none;
  .c-u-li{
    .cul-flex{
      font-size:1.3rem;
      .flex(center,flex-start,row);
    }
  }
}
.touch-footer{
  text-align:center;
  padding:1rem 0;
}
.affiche{
  padding-bottom:1rem;
}
.ju-flex{
  width:90%;
  margin:auto;
  padding:1rem 0;
  position:relative;
  padding-top:3rem;
  margin-bottom:2rem;
  .j-f-top{
    border-top-left-radius:50px;
    border-top-right-radius:50px;
    &.red{
      background:#B11270;
    }
    &.blue{
      background:#56428E;
    }
    &.black{
      background:#252121;
    }

    .jft-in{
      text-align:center;
      position:relative;
      top:-4rem;
      .jft-i-img{
        width:8rem;
        height:8rem;
        border-radius:100%;
        background-color:#fff;
      }
      .jft-i-name{
        font-size:1.2rem;
        color:#fff;
        font-weight:bold;
      }
    }
  }
  .j-f-bottom{
    border-bottom-left-radius:50px;
    border-bottom-right-radius:50px;
    background-color:#fff;
    position:relative;
    padding-bottom:1rem;
    &:before{
      content:'';
      display:block;
      width:100%;
      height:2rem;
      position:absolute;
      top:-2rem;
      border-top-left-radius:100%;
      border-top-right-radius:100%;
      background-color:#fff;
    }
    .j-f-con{
      height:8rem;
      overflow-y:scroll;
      margin:1rem;
    }

  }
}
.a-x-title{color:#56428e;font-size:1.2rem;}
.ab-row{width:95%;margin:1rem auto;position:relative}
@media only screen and (min-width:767px){
  .ab-xs{
    position:absolute;
    width:40%;

  }

  .ab-xs.left{
    left:0;
    text-align:right;
  }
  .ab-xs.right{
    right:0;
    text-align:left;
  }
}
.ab-item{
  margin:1rem auto;
  width:7rem;
  height:7rem;
  background-color:#fff;
  border-radius:100%;
  box-shadow:0 0 60px rgba(86, 66, 142, .14);
  .flex(center,center,row);
  .ab-item-in{
    width:6rem;
    height:6rem;
    border-radius:100%;
    border:1px solid rgba(86, 66, 142, .14);

    .flex(center,center,row);
    .ai-icon{

      font-size:4rem;
      color:rgba(86, 66, 142, .8);
    }
  }
}
.core-footer{
  background-size:100% 100%;
  .c-f-zhan{width: 100%;opacity:0;}
}
.ha-info{
  padding-bottom:1rem;
}
.h-i-list{
  font-size:1.2rem;
  text-align:center;
  color:#1a1a35;
  margin:1rem auto;
  width:95%;
}
.okf{
  position:fixed;
  top:0;
  left:0;
  right:0;
  bottom:0;
  background-size:100% 100%;
  background-position:0 0;
  z-index:-1;
  background-repeat:no-repeat;
}
.h-body{
  background-size:100% 100%;
}
.h-t-info{
  padding:1rem 0;
}
.hti-list{
  font-size:1.2rem;
  text-align:center;
  color:#fff;
  margin:1rem auto;
  width:95%;
}
.hlf-right{
  margin-left:1rem;
  .an03;
}
@media only screen and (max-width: 767px){
  .hlf-right{
    margin-left:0;
  }
  .htc-list{

    .h-l-flex{
      justify-content:flex-start;
    }
  }
}
.hr-p{
  text-align:left;
}
.h-l-flex{
  &:hover .hl-item{
    &:before{
      transform:scale(1.4);
    }
    &:after{
      transform:scale(1.6);

    }
  }
}
.hl-item{
  position:relative;
  .max-sha{
    .an03;
    position:absolute;
    width:4rem;
    height:4rem;
    border-radius:100%;

    box-shadow:0 0 50px rgba(86, 66, 142, .14);
    transform:scale(1.6);

    left: 0;
    right: 0;
    bottom: 0;
    top:0;
  }
  &:before{
    .an03;
    content:'';
    position:absolute;
    width:4rem;
    height:4rem;
    box-shadow:0 0 50px rgba(86, 66, 142, .14);
    transform:scale(1.2);

    left: 0;
    right: 0;
    bottom: 0;
    top:0;
    border-radius:100%;
  }

  &:after{
    .an03;
    content:'';
    position:absolute;
    width:4rem;
    height:4rem;
    box-shadow:0 0 50px rgba(86, 66, 142, .14);
    transform:scale(1.4);
    left: 0;
    right: 0;
    bottom: 0;
    top:0;
    border-radius:100%;

  }

  .hl-item1{
    background: -webkit-linear-gradient(top, #9D1D77, #56428E);
    width:4rem;
    height:4rem;
    overflow:hidden;
    border-radius:100%;
    .flex(center,center,col);
    .h-i-icon{
      font-size:2.5rem;
      color:#fff;
    }
  }
}
.hb-core{
  background-size:100% 100%;
  background-repeat: no-repeat;
  background-attachment:fixed;
}
.hc-topic{
  &.white{color:#fff;}
  font-size:2rem;
  line-height:8rem;
  color:#1a1a35;
}
.flex(@ai,@jc,@fd){
  display:flex;
  align-items:@ai;
  justify-content:@jc;
  flex-direction:@fd;
}
.htc-list{margin:1rem 0;}
.h-l-flex{
  .flex(center,center,row);

  padding:0 1rem;
  box-sizing:border-box;
  .hlf-left{
    margin:0 1rem;
  }

}
.hbf-top{
  width:90%;
  margin:auto;
}

.hbf-text{
  color:#fff;
  font-size:2rem;
  font-weight:bold;
  line-height:2rem;
  text-align:right;
  width:100%;
}
.nav-more{
  display:block;
  text-decoration:none;
  text-align:center;
  color:#fff;
  font-size:.8rem;
  line-height:2rem;
  .an03;
  &:hover{
    color:#56428e;
  }
}
.h-b-frame{.flex(center,space-around,column);height:100%;}
.h-btn{
  position:relative;
  display:inline-block;
  height:2.5rem;
  line-height:2.5rem;
  margin:.5rem;
  padding:0 6rem;
  border:2px solid #56428e;
  color:#fff;
  font-size:1rem;
  overflow:hidden;
  white-space:nowrap;
  border-radius:40px;
  border-bottom-left-radius:0;
  &.find-all{
    color:#56428e;
  }
  .an03;
  &:hover{
    color:#fff;
    background-color:#56428e;
    .hb-icon:after{
      background-color:#fff;
      transform:rotateZ(45deg)
    }
  }

  .hb-icon{
    position:absolute;
    right:3rem;
    top:0;
    bottom:0;
    border:0;
    height:2.4rem;
    display: flex;
    align-items: center;
    &:after{
      content:"";
      display:block;
      height:4rem;
      width:1px;
      background-color:#56428e;
      .an03;
    }

  }
}
.ani{
  .bounceInLeft{
    animation:bounceInLeft .5s;
  }

  .bounceOutLeft{
    animation:bounceOutLeft .5s;
  }
}
.h-d-zhe{
  position:fixed;
  left:0;
  right:0;
  bottom:0;
  top:0;
}
.text_shen{
  overflow:hidden;
  text-overflow:ellipsis;
  white-space:nowrap;
}
.hll-text{
    text-decoration:none;
    color:#fff;
}
.h-l-text{
  display:block;
  .text_shen;
  .hll-text;
}
.h-d-ul{
  width:50%;
  text-align:left;
  user-select:none;
  position:fixed;
  left:0;
  top:0;
  bottom:0;
  list-style: none;
  margin:0;
  background-color: rgba(0,0,0,.2);
  padding:0;
  .an03;
  .hdu-li{

    cursor: pointer;
    line-height:3rem;
    background-color:rgba(0,0,0,.2);
    border-bottom:1px solid rgba(255,255,255,.1);
    .text_shen;
    .an03;
    &:hover,&:active{
      background-color:rgba(0,0,0,.8);
    }
    padding:0 1rem;
    color:#fff;
  }
}
.h-icon-list{

  text-align:right;
  .hi-ico{
    padding:.5rem;
    font-size:2rem;
    color:#fff;
  }
}
.an03{transition:all .3s;}
.h-item{
  height:100vh;
  width:100%;
  background-size:100% 100%;
  background-repeat:no-repeat;
}

.h-header{
  position:fixed;
  top:0;
  left:0;
  right:0;

  z-index:3;
  .hh-frame{.an03;padding:0 0.5rem;border-bottom:1px solid rgba(255,255,255,.1);display:flex;justify-content: flex-end;}
  .h-l-ul{
    margin:0;
    list-style:none;
    display:flex;
    justify-content: flex-end;
    .an03;
    .h-l-li{
      margin:0 2rem;
      height:3rem;
      line-height:3rem;
      color:#fff;
      font-size:1rem;
      opacity:.7;
      cursor:pointer;
      transition:all .3s;
      will-change:opacity;
      &:hover{opacity:1;}
    }
  }
  .h-l-btns{
    padding:.5rem 0;
    text-align:right;
    .an03;
    .hlb{
      display:inline-block;
      padding:.2rem .8rem;
      border:2px solid;
      color:#fff;
      font-size:.7rem;
      border-radius:50px;
      border-bottom-left-radius:0 ;
      .an03;
      margin:.4rem .8rem;
      cursor:pointer;

    }
    .hlb-login{

      border-color:#56428e;
      &:hover{
        background-color: #56428e;
      }

    }

    .hlb-register{

      border-color:#c81471;
      &:hover{
        background-color: #c81471;
      }

    }
  }
  &.active{
    .hh-frame{background-color:rgba(0,0,0,.4);}
    .hh-left{
      display:flex;
      align-items:center;
      flex-direction:row-reverse;
      .h-l-ul{
        .h-l-li{
          margin:0 1.5rem;
        }
      }
      .h-l-btns{
        .hlb{
          margin:.4rem .2rem;
        }
      }
    }
    .hh-right{
      .h-r-select{
        padding-top:.5rem;
      }
    }

  }
  .hh-right{
    .h-r-select{
      .an03;
      display:inline-block;
      border:2px solid #5e596a;
      transition:all .3s;
      overflow:hidden;
      border-bottom-left-radius:30px;
      border-bottom-right-radius:30px;
      &:hover{background:#5e596a;}
      .h-r-option{
        color:#fff;
        .hro-li{
          font-size:.7rem;
          padding:.5rem .4rem;
        }
      }
    }

  }
}
.h-body{height:600px;}
</style>
