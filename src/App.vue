<template>
  <div id="app">
    <transition :name='tName'>
      <router-view class='child-view' />
    </transition>

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
<style>
body{border:0;margin:0;padding:0;}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.child-view {
  transition: all .4s cubic-bezier(.55,0,.1,1);
}
.slide-left-enter, .slide-right-leave-active {
  opacity: 0;
  -webkit-transform: translate(100px, 0);
  transform: translate(100px, 0);
}
.slide-left-leave-active, .slide-right-enter {
  opacity: 0;
  -webkit-transform: translate(-100px, 0);
  transform: translate(-100px, 0);
}
</style>
