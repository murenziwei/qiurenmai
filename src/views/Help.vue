<template>
  <div class="about">
    <!--低于767px显示-->
    <div class="mn-father">
      <div class="mobile-nav">
        <div class="m-n-list">
          <i :class="{'el-icon-more':isAside,'el-icon-circle-close':!isAside,'mnl-more':true}" @click="asidefn"></i>
        </div>
      </div>
    </div>
    <div class="p-header">

      <el-page-header @back="goBack" content="常见问题">
      </el-page-header>
    </div>
    <div class="ani as">
      <transition type="animation">
        <div :class="{'a-slide':true,bounceInLeft:!isAside,bounceOutLeft:isAside}" v-show="!isAside">
          <div class="as-items" v-for="(item,index) in $store.state.infodata[0].arr" :key="index" @click="tagcontrol(index)">
            <div :class="{'a-i-nav':true,'active':(tagCount==index)}">
              <span class="ain-text">{{item.name}}</span>
            </div>
          </div>
        </div>
      </transition>
    </div>
    <div>
      <div class="iframe">
        <orderP :dataarr="$store.state.infodata[0].arr[tagCount]"></orderP>
      </div>
    </div>

    <!--联系客服-->
    <service></service>
  </div>
</template>
<script>

  import service from '../components/service.vue';
  import orderP from '../components/help/orderP.vue';
  export default {
    data() {
      return {
        tagCount:-1,

        asideTag:{},
        isAside:false,
        isPeople:true,
        isTag:true,
        nowrou:''
      };
    },
    created(){
      this.tagCount=this.$route.query.index||0;
      this.asideTag=this.$router.options.about;
      this.nowrou=this.$router.currentRoute.path;
    },
    methods: {
      goBack(){
        this.$router.go(-1);
      },
      tagcontrol(n){

        if(window.innerWidth<767){
          this.isAside=true;
          console.log(window.innerWidth,'你好');
        }
        this.tagCount=n;
      },
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
    },
    components:{
      orderP,
      service
    }
  };
</script>
<style lang="less" scoped>
.p-header{
  display:none;
  padding:0 0 2rem 3rem;
}
@media only screen and (min-width:767px){
  .p-header{
    display:block;
  }

}
.about{
  position:absolute;
  top:0;
  left:0;
  right:0;
  bottom:0;
  width:100%;
  height:100%;
  background-color:#eee;
  padding:2rem 0;
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
    padding-left:1rem;
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
    margin:0 2rem;
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