<template>
  <div id="app">
      <router-view class='child-view' />
  </div>
</template>
<script>
  export default {
    data () {
      return {
        tName: 'slide-left',
        router:[],
      }
    },
    created (){

      this.routerAni();
    },
    methods:{
      fetchData(to,form){
         var rou=this.router;

         if(rou.indexOf(to.name)>rou.indexOf(form.name)){
             this.tName='slide-right'
         }else{
             this.tName='slide-left'
         }
      },

      routerAni (){

        var opt=this.$router.options.routes;
        console.log(opt,this.router);
        this.router=opt.map((a)=>{return a.name;})

      }
    },
    watch:{
      '$route':'fetchData'
    }
  }
</script>
<style lang="less">

.el-message-box{
    width:unset!important;
    max-width:420px!important;
    min-width:200px;
}

    body::-webkit-scrollbar{
    /*滚动条整体*/
    width:0px;
    float:right;
}
body::-webkit-scrollbar-track{
    width:10px;
    /*滚动条里面的轨道*/
    box-shadow:inset 0 0 1px;
}
body::-webkit-scrollbar-thumb{
    width:10px;
    /*滚动条轨道里面的方块*/
    border-radius:5px;
    background-color: gray;
    background-image: -webkit-linear-gradient(45deg, rgba(255, 255, 255, .2) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, .2) 50%, rgba(255, 255, 255, .2) 75%, transparent 75%, transparent);
    background-image: -moz-linear-gradient(45deg, rgba(255, 255, 255, .2) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, .2) 50%, rgba(255, 255, 255, .2) 75%, transparent 75%, transparent);
    background-image: -o-linear-gradient(45deg, rgba(255, 255, 255, .2) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, .2) 50%, rgba(255, 255, 255, .2) 75%, transparent 75%, transparent);
    background-image: linear-gradient(45deg, rgba(255, 255, 255, .2) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, .2) 50%, rgba(255, 255, 255, .2) 75%, transparent 75%, transparent);

}
body{border:0;margin:0;padding:0;}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
