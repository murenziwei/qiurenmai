<template>
    <div class="notice">

        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span class="c-topic">今日必读</span>
            </div>
            <div>
                <el-tag><el-link type="danger">商业公告</el-link></el-tag>
            </div>
        </el-card>

        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span class="c-topic">商家公告</span>
            </div>
            <div v-html="notice.note">
                <!--<el-tabs v-model="activeName" type="card" @tab-click="handleClick">-->
                    <!--<el-tab-pane label="待返款订单" name="first">-->
                        <!--<div class="infinite-list-wrapper">-->
                            <!--<ul-->
                                    <!--class="list"-->
                                    <!--v-infinite-scroll="load"-->
                                     <!--:style="{height:2*6+'rem'}"-->

                            <!--&gt;-->
                                <!--<li v-for="i in count" class="list-item"><el-alert-->
                                        <!--type="success">-->
                                    <!--{{i}}-->
                                <!--</el-alert></li>-->
                                <!--<p v-if="loading&&!noMore" class="loading-lw">加载中<i class="el-icon-loading"></i></p>-->
                                <!--<p v-if="noMore" class="loading-lw">没有更多了</p>-->
                            <!--</ul>-->
                        <!--</div>-->
                    <!--</el-tab-pane>-->
                    <!--<el-tab-pane label="待完成订单" name="second">-->
                    <!--</el-tab-pane>-->
                <!--</el-tabs>-->
            </div>
        </el-card>
    </div>
</template>

<script>
    import ajax from 'axios';
    export default {
        name: "notice",
        data(){
            return {
                notice:'',
                count: 10,
                loading: false,
                activeName:'first',
                arr:[
                    {name:'first',val:[]},
                    {name:'first',val:[]},
                ]
            }
        },
        computed: {
            noMore () {
                return this.count >= 20
            }
        },
        created(){
            ajax.all([this.go_notice()])
        },

        methods:{
            go_notice(){
                return this.$api.ports.oNotice().then((res)=>{

                    if(res.code){
                        this.notice=res.data[0];

                    }else{
                        this.$notify.error(res.message);
                    }
                })
            },

            load () {
                if(!this.noMore){

                    this.loading = true
                    setTimeout(() => {
                        this.count += 2
                        this.loading = false
                    }, 2000)
                }
            },
            handleClick(tab, event) {

            }
        }
    }
</script>

<style lang="less" scoped>
    .box-card{
        margin-bottom:2rem;
    }

    .loading-lw{
        text-align:center;

    }

    .list{
        list-style:none;
        overflow-y:scroll;
        margin:0;
        padding:0;
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
</style>