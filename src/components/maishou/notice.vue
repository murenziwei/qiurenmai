<template>
    <div class="notice">

        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span class="c-topic">个人信息</span>
            </div>
            <div class="n-content">
                <div>
                    <p>账号：<span class="color">1231241342</span></p>
                    <p>会员等级：<span class="color">vip会员</span></p>
                    <p>到期时间：<span class="color">2017-20-12</span></p>
                    <el-button type="text" @click="dialogVisible = true">续费会员</el-button>

                    <el-dialog

                            title="提示"
                            :visible.sync="dialogVisible"
                            width="30%"
                            :before-close="handleClose"
                            class="el-alert-a"
                    >
                        <div class="alert-box">
                            <span>账号：123456789</span>
                            <span>当前为VIP会员</span>
                            <span>有效期剩余：30天</span>
                        </div>

                        <div class="radio">
                            <h5>选择开通时间</h5>
                            <div>
                                <el-radio-group v-model="radio" class="radio-box">
                                    <el-radio :label="3">3个月40金币</el-radio>
                                    <el-radio :label="6">6个月80金币</el-radio>
                                    <el-radio :label="9">12个月150金币</el-radio>
                                </el-radio-group>
                            </div>
                        </div>

                        <div>
                            <el-alert
                                    title="您已选择购买VIP  有效期至：2019-09-09（原VIP会员剩余4天）"
                                    type="warning">
                            </el-alert>
                        </div>
                        <div>
                            需支付：40金币
                        </div>
                        <span slot="footer" class="dialog-footer">
                            <el-button @click="dialogVisible = false">取 消</el-button>
                            <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
                        </span>
                    </el-dialog>


                </div>
                <div>
                    <p>当前本金余额为：<span class="color">200金币</span></p>
                    <p>当前佣金余额为：<span class="color">20金币</span></p>
                </div>
                <div>
                    <p>已冻结的本金：<span class="color">200金币</span></p>
                    <p>已冻结的佣金：<span class="color">20金币</span></p>
                </div>
                <div>
                    <p>待返还笔数：<span class="color">20 笔</span></p>
                    <p>待商家返款本金：<span class="color">20金币</span></p>
                    <p>待商家返款佣金：<span class="color">20金币</span></p>
                </div>
            </div>
        </el-card>


        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span class="c-topic">买手公告</span>
            </div>
            <div class="n-content">
                <p>
                    阿萨德阿萨德阿萨德阿萨德阿萨德阿萨德阿萨德阿萨德阿萨德阿萨德阿萨德阿萨德阿萨德阿萨德阿萨德阿萨德
                    阿萨德阿萨德阿萨德阿萨德阿萨德阿萨德阿萨德阿萨德阿萨德阿萨德阿萨德阿萨德阿萨德阿萨德阿萨德阿萨德
                </p>
            </div>
        </el-card>

        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span class="c-topic">任务管理</span>
            </div>
            <div>
                <ul class="nav-list">
                    <li>任务编号</li>
                    <li>接单账号</li>
                    <li>标题</li>
                    <li>主图</li>
                    <li>状态</li>
                    <li>佣金</li>
                    <li>操作</li>
                </ul>
                <ul v-for="item of 5" class="nav-list-item">
                    <li>123456789</li>
                    <li class="icon"><i><img src="./../../assets/bg-1.jpg" alt=""></i>123456789</li>
                    <li>这是个标题.....</li>
                    <li class="img"><img src="./../../assets/bg-1.jpg" alt=""></li>
                    <li>待完成</li>
                    <li class="color">¥20</li>
                    <li>
                        <el-button type="text">
                            <span>继续</span>&nbsp;
                            <span @click="open">放弃</span>
                        </el-button>
                    </li>
                </ul>
            </div>
        </el-card>
    </div>
</template>

<script>
    export default {
        name: "notice",
        data() {
            return {
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
        computed: {
            noMore() {
                return this.count >= 20
            }
        },
        methods: {
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
    .alert-box {
        span {
            margin: 0 5px;
        }
    }

    .el-alert-a{
        height:510px;
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