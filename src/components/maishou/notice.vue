<template>
    <div class="notice">

        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span class="c-topic">个人信息</span>
            </div>
            <div class="n-content">
                <div>
                    <p>账号：<span class="color">{{consumer.member.ue_account||'***'}}</span></p>
                    <p>会员等级：<span class="color">{{consumer.member.is_vip?'VIP会员':'非会员'}}</span></p>
                    <p>到期时间：<span class="color">{{new Date(consumer.member.vip*1000).toLocaleString()||'***'}}</span></p>
                    <div>

                        <el-popover
                            placement="bottom"
                            width="300"
                            trigger="manual"

                            v-model="dialogVisible">
                            <div>
                                <div class="alert-box">
                                    <p>账号：{{consumer.member.ue_account||'***'}}</p>
                                    <p>当前为{{consumer.member.is_vip?'VIP':'非'}}会员</p>
                                    <p>到期时间：<span class="color">{{new Date(consumer.member.vip*1000).toLocaleString()||'***'}}</span></p>
                                </div>

                                <div class="radio">
                                    <h5>选择开通时间</h5>
                                    <div class="s-h">

                                        <el-radio-group v-model="vipValue">
                                            <div class="r-childs" v-for="(vipV) in vdata">

                                                <el-radio :label="vipV">
                                                    续费{{vipV.month||'**'}}月，价格：{{vipV.price||'**'}}{{$store.state.mtext}}，介绍：<el-link :underline="false" type="danger">{{vipV.discount||'**'}}</el-link>
                                                </el-radio>
                                            </div>
                                        </el-radio-group>
                                    </div>
                                </div>

                                <p>
                                    需支付：{{vipValue.price||'**'}}金币
                                </p>
                                <div slot="footer" class="dialog-footer">
                                    <el-button @click="dialogVisible = false">取 消</el-button>
                                    <el-button type="primary" @click="payissue(vipValue.id)">确 定</el-button>
                                </div>
                            </div>
                            <el-button class="pa1" type="text" slot="reference" @click="vipdata">续费会员</el-button>
                    </el-popover>
                    </div>
                </div>
                <div>
                    <p>当前本金余额为：<span class="color">{{consumer.member?consumer.member.ue_jin:'***'}}金币</span></p>
                    <p>当前佣金余额为：<span class="color">{{consumer.member?consumer.member.commission:'***'}}金币</span></p>
                </div>
                <div>
                    <p>已冻结的本金：<span class="color">{{consumer.freeze_jin[0]?consumer.freeze_jin[0]["freeze_cash_pledge"]:'***'}}金币</span></p>
                    <p>已冻结的佣金：<span class="color">{{consumer.freeze_jin[0]?consumer.freeze_jin[0]["freeze_commission"]:'***'}}金币</span></p>
                </div>
                <div>
                    <p>待返还笔数：<span class="color">{{consumer.wait_jin[0]?consumer.wait_jin[0]["wait_count"]:'***'}} 笔</span></p>
                    <p>待商家返款本金：<span class="color">{{consumer.wait_jin[0]?consumer.wait_jin[0]["wait_commission"]:'***'}}金币</span></p>
                    <p>待商家返款佣金：<span class="color">{{consumer.wait_jin[0]?consumer.wait_jin[0]["wait_cash_pledge"]:'***'}}金币</span></p>
                </div>
            </div>
        </el-card>


        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span class="c-topic">买手公告</span>
            </div>
            <div class="n-content" v-html="consumer.note"></div>
        </el-card>

        <!--<el-card class="box-card">-->
            <!--<div slot="header" class="clearfix">-->
                <!--<span class="c-topic">任务管理</span>-->
            <!--</div>-->

            <!--<div>-->
                <!--<el-row v-for="(tval,tind) in task.data">-->
                    <!--<el-col :xs="24" :sm="12" :lg="6">-->

                        <!--<span>任务编号：</span>-->
                        <!--<span>{{tval.id||'**'}}</span>-->
                    <!--</el-col>-->
                    <!--<el-col :xs="24" :sm="12" :lg="6">-->

                        <!--<span>接单账号：</span>-->
                        <!--<span>{{tval.wangwang_id||'**'}}</span>-->
                    <!--</el-col>-->
                    <!--<el-col :xs="24" :sm="12" :lg="6">-->

                        <!--<span>状态：</span>-->
                        <!--<span>{{tval.status|statusfn}}</span>-->
                    <!--</el-col>-->
                    <!--<el-col :xs="24" :sm="12" :lg="6">-->

                        <!--<span>佣金：</span>-->
                        <!--<span>{{tval.real_commission||'**'}}</span>-->
                    <!--</el-col>-->
                    <!--<el-col :xs="24" :sm="12" :lg="6">-->

                        <!--<span>标题：</span>-->
                        <!--<span>{{tval.goods_name||'**'}}</span>-->
                    <!--</el-col>-->
                    <!--<el-col :xs="24" :sm="12" :lg="6">-->

                        <!--<p>主图：</p>-->

                        <!--<div>-->
                            <!--<lw-img v-for="(gval,gind) in (tval.goods_img)?(tval.goods_img).split(','):[tval,goods_img]" :src-data="gval"></lw-img>-->
                        <!--</div>-->
                    <!--</el-col>-->
                    <!--<el-col :xs="24" :sm="12" :lg="6">-->

                        <!--<span>平台类型：</span>-->
                        <!--<span>{{tval.platform_type|shops}}</span>-->

                    <!--</el-col>-->

                    <!--<el-col :xs="24">-->
                        <!--<el-button type="primary">继续</el-button>-->
                        <!--<el-button type="danger">放弃</el-button>-->
                    <!--</el-col>-->
                <!--</el-row>-->
                <!--<p style="text-align:center;" v-if="task.data.length===0"><el-link type="info" :underline="false">没有更多数据了</el-link></p>-->
            <!--</div>-->

            <!--<div class="mt-cen" style="text-align:center;">-->
                <!--<el-pagination-->
                        <!--:current-page.sync="task.current_page"-->
                        <!--@current-change="bschange"-->
                        <!--background-->
                        <!--layout="prev, pager, next"-->
                        <!--:total="task.last_page*10">-->
                <!--</el-pagination>-->
            <!--</div>-->
        <!--</el-card>-->
    </div>
</template>

<script>
    import ajax from 'axios';
    export default {
        name: "notice",
        data() {
            return {
                vipValue:{},

                vdata:[],

                task:{
                    current_page: 0,
                    data: [],
                    last_page: 0,
                    per_page: 0,
                    total: 0
                },
                consumer:{
                    freeze_jin:{

                    },
                    member: {
                        commission:'',
                        is_vip: '',
                        ue_account: "15770830356",
                        ue_jin: '',
                        vip: ''
                    },
                    note:``,
                    wait_jin:[]
                },
                count: 10,
                loading: false,
                arr: [
                    {name: 'first', val: []},
                    {name: 'first', val: []},
                ],
                dialogVisible: false,
                radio: 3
            }
        },
        created(){
            ajax.all([this.go_consumer()]);//,this.go_task()
        },
        computed: {
            noMore() {
                return this.count >= 20
            }
        },
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
        methods: {

            payissue(id){
                if(id){
                    this.$confirm('再次确认是否续费？', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'success'
                    }).then(() => {

                        this.$api.ports.buyVip({id}).then((res)=>{
                            if(res.code){

                                this.$notify.success('续费成功');
                                setTimeout(()=>{

                                    this.$router.go(0);
                                },500)
                            }else{
                                this.$notify.error(res.message);
                            }
                        });
                    }).catch(() => {
                        this.$message({
                            type: 'info',
                            message: '已取消续费'
                        });
                    });
                }else{
                    this.$notify.error('请你选择开通时间！');
                }
            },

            vipdata(){
                if(!this.dialogVisible){
                    return this.$api.ports.vipUI().then((res)=>{
                        if(res.code){
                            console.log(res,'vip');
                            this.dialogVisible=true;
                            this.vdata=res.data;
                        }else{
                            this.$notify.error(res.message);
                        }
                    })
                }
            },

            //分页
            bschange(page){
                this.go_task(page);
            },

            //任务列表
            go_task(page){
                return this.$api.ports.consumerTask(page).then((res)=>{
                    if(res.code){
                        console.log(res,'task');
                        this.task=res.data[0];
                    }else{
                        this.$notify.error(res.message);
                    }
                })
            },


            go_consumer(){
                return this.$api.ports.consumerIndex().then((res)=>{
                    if(res.code){
                        console.log(res,'gsney');
                        this.consumer=res.data[0];
                    }else{
                        this.$notify.error(res.message);
                    }
                })
            },

            open() {
                this.$confirm('确定放弃？', '放弃', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {

                }).catch(() => {

                });
            },
            load() {
                if (!this.noMore) {

                    this.loading = true
                    setTimeout(() => {
                        this.count += 2
                        this.loading = false
                    }, 2000)
                }
            },
            handleClose(done) {
                this.$confirm('确认关闭？')
                    .then((_) => {
                        done();
                    })
                    .catch(_ => {
                    });
            }
        }
    }
</script>

<style lang="less" scoped>
    .s-h{
        max-height:200px;
        overflow-y:scroll;
    }

    .r-childs{
        margin:1rem;
        display:inline-block;
        .el-radio{
            white-space:normal;
            line-height:2;
        }
    }

    .alert-box {
        span {
            margin: 0 5px;
        }
    }

    .el-alert-a{

        div{
            margin: 5px 0;
        }
    }
    .box-card {
        margin-bottom: 2rem;
    }

    .loading-lw {
        text-align: center;

    }
    .radio{
        display: flex;
        flex-direction: column;
        .radio-box{
            display: flex;
        }
    }

    .list {
        list-style: none;
        overflow-y: scroll;
        margin: 0;
        padding: 0;
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
            display: flex;
            flex-wrap: wrap;
            align-items:center;
            p {
                padding: 5px 10px;
                border-right: 1px solid #ccc;
            }
            P:last-child {
                border: none;
            }
        }
    }

    .color {
        color: red;
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