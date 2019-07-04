<template>
    <div class="service">

        <div class="home" v-if="ishome">
            <el-button @click.stop="navfn()" class="h-icon" icon="el-icon-s-home" circle></el-button>
        </div>
        <div class="kefu">
            <div class="kf-frame">
                <img src="../assets/kefu.png" alt="" class="kf-img" />
            </div>
            <div class="kf-code">
                <img src="https://murenziwei.github.io/qiurenmai/active_wx.jpg" alt="" class="img" />
                <img src="https://murenziwei.github.io/qiurenmai/active_wx.jpg" alt="" class="img" />
            </div>
        </div>
        
    </div>
</template>

<script>
    export default {
        name: "service",
        props:['url','ishome'],
        methods:{
            navfn(){
                console.log(this.url,'wei');
                this.$router.push(this.url||'/login');
            }
        }
    }
</script>

<style lang="less" scoped>
    .home{
        position:fixed;
        left:2rem;
        bottom:5rem;
    }
    .h-icon{
        font-size:2rem;
    }
    .kefu{
        position:fixed;
        bottom:8rem;
        right:2rem;
        .kf-frame{
            .kf-img{
                width:4rem;
            }
        }
        .kf-code{

            top:-12rem;
            position:absolute;
            width:10rem;
            height:10rem;
            right:-14rem;
            opacity:0;
            z-index:-1;
            transition:all .5s;
        }
        .img{
            width:10rem;
            height:10rem;
        }
        &:hover .kf-code{
            opacity:1;
            right:5rem;
            z-index:2;
        }
    }
</style>