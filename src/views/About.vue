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
            <span>LV 0</span><el-link type="primary" href="#/"> 1577083****</el-link>
          </div>
          <div class="at-xs">
            本金：<span>0</span>元<el-link type="primary" href="#/">充值</el-link>
          </div>

          <div class="at-xs">
            <el-link type="primary" href="#/">退出</el-link>
          </div>

          <div class="at-xs">
            <el-link type="primary" href="#/">修改密码</el-link>
          </div>
        </div>
      </transition>
    </div>
    <div class="a-tags">
      <div class="at-left">
        <img :src="this.$store.state.urlimg" alt="" class="a-l-png">
      </div>
      <div class="at-right">
        <div class="a-r-list">
          <router-link to="/forget" class="arl-link">
            <span class="a-l-text">商家中心</span>
          </router-link>
        </div>
        <div class="a-r-list active">
          <router-link to="/forget" class="arl-link">
            <span class="a-l-text">商家介绍</span>
          </router-link>
        </div>
      </div>
    </div>
    <div class="ani">
      <transition type="animation">
        <div :class="{'a-slide':true,bounceInLeft:!isAside,bounceOutLeft:isAside}" v-show="!isAside">
          <div class="as-items">
            <router-link to="/" class="a-i-nav">
              <i class="el-icon-picture-outline-round ain-icon"></i>
              <span class="ain-text">商家公告</span>
            </router-link>
          </div>
          <div class="as-items">
            <router-link to="/" class="a-i-nav">
              <i class="el-icon-plus ain-icon"></i>
              <span class="ain-text">发布任务</span>
            </router-link>
          </div>
        </div>
      </transition>
    </div>
    <div class="a-content">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>卡片名称</span>
          <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
        </div>
        <div v-for="o in 4" :key="o" class="text item">
          {{'列表内容 ' + o }}
        </div>
      </el-card>
    </div>
  </div>
</template>
<script>

  export default {
    data() {
      return {
        isAside:true,
        isPeople:true
      };
    },
    methods: {
      peoplefn(){
        this.isPeople=!this.isPeople;
      },
      asidefn(){
        this.isAside=!this.isAside;
      },
      handleClick(tab, event) {
        console.log(tab, event);
      }
    }
  };
</script>
<style lang="less" scoped>
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
  width:30%;
  float:left;
  border:1px solid #eee;

  background-color:#fff;
}
.a-content{
  position:relative;
  width:70%;
  float:right;
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
    &.active .arl-link{
      color:#0098e1;
    }
  }
}
.a-tags{
  .flex(center,space-between,row);
}
.a-l-png{
  width:3rem;
}
@media only screen and (max-width:767px){
 .a-tags{
   position:fixed;
   bottom:2rem;
   right:2rem;
   .at-left{
     width:3rem;
     height:3rem;
     border-radius:100%;
     background-color:#fff;
     overflow:hidden;
     .flex(center,center,row);
     .a-l-png{
       width:2rem;
     }
   }
   .at-right{
     position:absolute;
     right:0;
     bottom:4rem;
     .flex(flex-start,flex-end,column);
     .a-l-text{
       white-space:nowrap;
     }
   }
 }
}

.a-top{
  .flex(center,flex-end,row);
  border: 1px solid #EBEEF5;
  box-sizing:border-box;
  padding:0 1rem;
}
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