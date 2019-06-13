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
            <span>LV 0</span><el-link href="#/" class="recharge"> 1577083****</el-link>
          </div>
          <div class="at-xs">
            本金：<span class="money">0</span>元<el-link type="primary" href="#/" class="recharge">充值</el-link>
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
    <div class="a-tags ani">
      <div class="at-left">
        <i :class="{'el-icon-menu':isTag,'el-icon-close':!isTag}" alt="" class="a-l-png" @click="tagfn" />
      </div>
      <transition type="animation">
        <div class="at-right" :class="{'at-right':true,fadeIn:!isTag,fadeOut:isTag}" v-show="!isTag">
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
      </transition>
    </div>
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
</template>
<script>
  export default {
    data() {
      return {
        asideTag:{},
        isAside:true,
        isPeople:true,
        isTag:true,
        nowrou:''
      };
    },
    created(){
      this.asideTag=this.$router.options.about;
      this.nowrou=this.$router.currentRoute.path;
    },
    methods: {
      nowrouter(to){
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
    }
  };
</script>
<style lang="less">
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