<template>
    <div class="service">

        <div class="home">
            <el-button @click.stop="navfn()" class="h-icon" icon="el-icon-s-home" circle></el-button>
        </div>
        <div class="kefu">
            <div class="kf-frame">
                <img src="../assets/kefu.png" alt="" class="kf-img" />
            </div>

            <img src="https://murenziwei.github.io/qiurenmai/active_wx.jpg" alt="" class="kf-code" />
        </div>
        
    </div>
</template>

<script>
    export default {
        name: "service",
        methods:{
            navfn(){
                this.$router.push("about");
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
        bottom:6rem;
        right:2rem;
        .kf-frame{
            .kf-img{
                width:4rem;
            }
        }
        .kf-code{

            top:-3rem;
            position:absolute;
            width:10rem;
            height:10rem;
            right:-14rem;
            opacity:0;
            z-index:-1;
            transition:all .5s;
        }
        &:hover .kf-code{
            opacity:1;
            right:5rem;
            z-index:2;
        }
    }
</style>