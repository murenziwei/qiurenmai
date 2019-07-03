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

                        <div style="display:flex;">
                            <div>
                                <lw-img v-for="(gval,gind) in (tval.goods_img)?(tval.goods_img).split(','):[tval,goods_img]" :src-data="gval"></lw-img>
                            </div>
                        </div>
                    </el-col>
                    <el-col :xs="24" :sm="12" :lg="6">

                        <span>平台类型：</span>
                        <span>{{tval.platform_type|shops}}</span>

                    </el-col>

                    <el-col :xs="24" class="margin-top">
                        <el-link class="m-r-1" type="success" :href="'#/maishou?tagcount=-1&id='+tval.id+'&status='+tval.status+'&type='+tval.platform_type" target="_blank">继续</el-link>
                        <el-link class="m-r-1" type="danger" @click="forgetfn(tval.id)">放弃</el-link>
                        <el-link class="m-r-1" type="info" @click="commentfn(tval.id)">评论</el-link>

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
        <el-dialog :visible.sync="dialogVisible">
            <el-form style="height:60vh;width:100%;overflow-y:scroll;" :model="commentform" ref="commentform" label-position="top">
                <p>
                    任务编号：{{commentform.id||'**'}}
                </p>
                <p>
                    接单账号：{{commentform.wangwang_id||'**'}}
                </p>
                <p>
                    状态：{{commentform.status|statusfn}}
                </p>
                <p>
                    评论类别： {{commentform.type|commenF}}
                </p>
                <el-form-item label="评论文字" >
                    <el-input v-model="commentform.comment_ask||'**'" :disabled="true" type="textarea" rows="5"></el-input>
                </el-form-item>

                <el-form-item label="图片" >
                    <el-row>
                        <el-col v-for="(imgval) in commentform.imgs">
                            <lw-img :src-data="imgval"></lw-img>
                        </el-col>
                    </el-row>

                    <p style="text-align:center;" v-if="commentform.imgs.length==0"><el-link type="info" :underline="false">没有更多数据了</el-link></p>
                </el-form-item>

                <el-form-item label="视频" >
                    <video controls :src="commentform.video"  v-if="commentform.video"></video>
                    <p style="text-align:center;" v-else><el-link type="info" :underline="false">没有更多数据了</el-link></p>
                </el-form-item>

                <el-form-item >
                    <el-button @click="submitCom(commentform.id)">确认评论</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
    </div>
</template>

<script>
    import ajax from 'axios';
    export default {
        name: "notice",
        data() {
            return {
                commentform:{
                    imgs:[]
                },
                dialogVisible:false,

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
            commenF:function(value){

                var del='--';
                switch (value){
                    case 1:del='普通好评';break;
                    case 2:del='指定文字好评';break;
                    case 3:del='置顶图片好评';break;
                    case 4:del='指定视频好评';break;
                }
                return del;
            },
        },
        methods: {
            commentfn(id){

                this.$api.ports.doComment({id}).then((res)=>{
                    console.log(res,'放弃');
                    if(res.code){
                        this.commentform = res.data[0];
                        this.commentform.id=id;
                        this.dialogVisible=true;
                    }else{
                        this.dialogVisible=false;
                        this.$notify.error(res.message);
                    }
                });
            },
            submitCom(id){

                this.$confirm('再次确认是否提交？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {


                    this.$api.ports.confComment({id}).then((res)=>{

                        if(res.code){
                            this.$notify.success(res.message);
                        }else{
                            this.dialogVisible=false;
                            this.$notify.error(res.message);
                        }
                    });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消提交'
                    });
                });
            },
            forgetfn(id){
                this.$confirm('再次确认是否放弃？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {

                    this.$api.ports.abandonTask({id}).then((res)=>{
                        console.log(res,'放弃');
                        if(res.code){

                            this.$notify.success('放弃成功');
                            this.go_task();
                        }else{
                            this.$notify.error(res.message);
                        }
                    });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消放弃'
                    });
                });
            },


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
            }

        }
    }
</script>
<style>
    .el-dialog{
        width:80%!important;
    }
</style>
<style lang="less" scoped>
    .m-r-1{margin:0 1rem;}
    .binding {
        display: flex;
        div {
            margin-right: 20px;
        }
    }

    .margin-top {
        margin: 1rem 0;
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