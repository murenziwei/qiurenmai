<template>
    <div class="notice">
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span class="c-topic">任务管理</span>
            </div>

            <div>
                <el-row v-for="(tval,tind) in task.data">
                    <el-col :xs="24" :sm="12" :lg="6">

                        <span>任务编号：</span>
                        <span>{{tval.id||'**'}}</span>
                    </el-col>
                    <el-col :xs="24" :sm="12" :lg="6">

                        <span>接单账号：</span>
                        <span>{{tval.wangwang_id||'**'}}</span>
                    </el-col>
                    <el-col :xs="24" :sm="12" :lg="6">

                        <span>状态：</span>
                        <span>{{tval.status|statusfn}}</span>
                    </el-col>
                    <el-col :xs="24" :sm="12" :lg="6">

                        <span>佣金：</span>
                        <span>{{tval.real_commission||'**'}}</span>
                    </el-col>
                    <el-col :xs="24" :sm="12" :lg="6">

                        <span>标题：</span>
                        <span>{{tval.goods_name||'**'}}</span>
                    </el-col>
                    <el-col :xs="24" :sm="12" :lg="6">

                        <p>主图：</p>

                        <div>
                            <lw-img v-for="(gval,gind) in (tval.goods_img)?(tval.goods_img).split(','):[tval,goods_img]" :src-data="gval"></lw-img>
                        </div>
                    </el-col>
                    <el-col :xs="24" :sm="12" :lg="6">

                        <span>平台类型：</span>
                        <span>{{tval.platform_type|shops}}</span>

                    </el-col>

                    <el-col :xs="24">
                        <el-button type="primary">继续</el-button>
                        <el-button type="danger">放弃</el-button>
                    </el-col>
                </el-row>
                <p style="text-align:center;" v-if="task.data.length===0"><el-link type="info" :underline="false">没有更多数据了</el-link></p>
            </div>

            <div class="mt-cen" style="text-align:center;">
                <el-pagination
                        :current-page.sync="task.current_page"
                        @current-change="bschange"
                        background
                        layout="prev, pager, next"
                        :total="task.last_page*10">
                </el-pagination>
            </div>
        </el-card>
    </div>
</template>

<script>
    import ajax from 'axios';
    export default {
        name: "notice",
        data() {
            return {

                task:{
                    current_page: 0,
                    data: [],
                    last_page: 0,
                    per_page: 0,
                    total: 0
                },


            }
        },
        created(){
            ajax.all([this.go_task()]);
        },
        computed: {},
        filters:{

            filters:{

                shops:function(value){
                    var del='**';
                    switch (value){
                        case 1:del='淘宝';break;
                        case 3:del='拼多多';break;
                    }
                    return del;
                },
                statusfn:function(value){

                    var del='--';
                    switch (value){
                        case 1:del='未接单';break;
                        case 2:del='待操作';break;
                        case 3:del='待返款发货';break;
                        case 4:del='待评价';break;
                        case 5:del='待确认';break;
                        case 6:del='已完成';break;
                    }
                    return del;
                },
            },
        },
        methods: {


            //分页
            bschange(page){
                this.go_task(page);
            },

            //任务列表
            go_task(page){
                return this.$api.ports.waitTaskList(page).then((res)=>{
                    if(res.code){
                        console.log(res,'waitTaskList');
                        this.task=res.data[0];
                    }else{
                        this.$notify.error(res.message);
                    }
                })
            },

            open() {
                this.$confirm('是否放弃？', '放弃', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {

                }).catch(() => {

                });
            },
            amend() {

            }
        }
    }
</script>

<style lang="less" scoped>
    .binding {
        display: flex;
        div {
            margin-right: 20px;
        }
    }

    .margin-top {
        margin-top: 30px;
    }

    .box-card {
        margin-bottom: 2rem;
    }

    .loading-lw {
        text-align: center;

    }

    .addAccount {
        margin-top: 10px;
        line-height: 30px;
        color: #409EFF;
        cursor: pointer;
    }

    .clearfix {
        text-align: left;
        .c-topic {
            font-size: 1.5rem;
            color: #000;
            font-weight: bold;
            opacity: .8;
        }
    }

    .n-content {
        div {
            margin: 10px 0;
        }
    }

    .color {
        color: #ccc;
    }

    .nav-list {
        background: #ccc;
        display: flex;
        text-align: center;
        list-style: none;
        li {
            flex: 1;
            padding: 10px 0;
        }
    }

    .nav-list-item {
        display: flex;
        text-align: center;
        list-style: none;
        align-items: center;
        font-size: 14px;
        li {
            flex: 1;
            padding: 10px 0;
        }
        .icon {
            display: flex;
            align-items: center;
            i {
                width: 20%;
                height: 20%;
                overflow: hidden;
                img {
                    width: 100%;
                }
            }
        }
        .img {
            img {
                width: 70%;
            }
        }
    }

</style>