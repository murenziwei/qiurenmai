<template>
    <div class="info">
        <div class="info-border">
            <div v-for="(item,index) in $store.state.infodata" :key="index">
                <div class="list-topic">{{item.title}}</div>
                <el-row class="list-flex" type="flex" justify="space-between">
                    <el-col v-for="(child,cindex) in item.arr" :key="cindex" class="list-item" :xs="24" :sm="7" :lg="5">
                        <div class="list-frame">
                            <p class="li-name">
                                {{child.name}}
                            </p>
                            <div v-for="(cit,cin) in child.arr" :key="cin" class="info-text">
                                {{cit}}
                            </div>
                            <el-link type="primary" class="blue-link" :href="'#/help?index='+cindex">点我进入</el-link>
                        </div>
                    </el-col>

                </el-row>
            </div>
            <div>
                <end />
            </div>
        </div>
    </div>
</template>

<script>
    import end from './end.vue';
    export default {
        name: "shophelp",
        data(){
            return {
            }
        },
        components:{
            end
        }
    }
</script>

<style lang="less" scoped>
    .blue-link{
        color:#5bc0de;
    }
    .info-text{
        color:#999;
    }
    .info-border{
        text-align:left;
        width:100%;
        box-sizing:border-box;
        padding:0 4rem;
    }
    .list-flex{
        flex-wrap:wrap;
    }
    .list-topic{
        text-align:left;
        color:#000;
        font-weight:bold;
        padding:2rem 0;
        border-bottom:1px dashed #999;
    }
    .list-item{
        margin:2rem 0;
        .li-top{
            width:100%;
            background-position:0 0;
            background-size:100% 100%;
            background-repeat:no-repeat;
            .lt-img{
                width:6rem;
                height:6rem;
                border-radius:10px;
            }
        }
        .li-name{
            font-weight:bold;
            font-size:1rem;
        }
        .li-bottom{
            font-size:1rem;
            height:15rem;
            width:90%;
            margin:auto;
            overflow:auto;
        }
    }
    .list-frame{
        display:flex;
        align-items:flex-start;
        flex-direction: column;
        padding:2rem 1rem;
        text-align:center;
        box-shadow:0 0 1px rgba(0,0,0,.3);
        background-color:#f0f9f8;
    }
</style>