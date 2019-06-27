<template>
    <div class="notice">
        <router-view></router-view>
        <div v-if="!flag">
            <el-card class="box-card">
                <div slot="header" class="clearfix">
                    <span class="c-topic">账号管理</span>
                </div>
                <div class="n-content">
                    <h3>您还没有绑定账号，请先绑定买号及对应的收货信息，才可以接手任务</h3>
                    <div @click="addAccount('tb')" class="addAccount">
                        <i class="el-icon-plus"></i>
                        添加淘宝账号 <span class="color">（最多允许绑定3个买号）</span>
                    </div>
                    <div @click="addAccount('pdd')" class="addAccount">
                        <i class="el-icon-plus"></i>
                        添加拼多多账号 <span class="color">（最多允许绑定3个买号）</span>
                    </div>
                    <div>
                        <el-alert
                                title="提示：买号提交审核后，平台预计在24小时内完成审核操作，只有通过的买号才能接手任务"
                                type="info">
                        </el-alert>
                    </div>

                    <div>
                        <h4>请注意</h4>
                        <p>1.xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx</p>
                        <p>2.xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx</p>
                        <p>3.xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx</p>
                        <p>4.xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx</p>
                    </div>
                </div>
            </el-card>
        </div>

        <div v-if="flag">
            <el-card class="box-card">
                <div slot="header" class="clearfix">
                    <span class="c-topic">绑定账号</span>

                    <div class="binding">
                        <div @click="addAccount('tb')" class="addAccount">
                            <i class="el-icon-plus"></i>
                            增加淘宝绑定账号
                        </div>
                        <div @click="addAccount('pdd')" class="addAccount">
                            <i class="el-icon-plus"></i>
                            增加拼多多绑定账号
                        </div>
                    </div>
                </div>
                <div>
                    <ul class="nav-list">
                        <li>全部</li>
                        <li>ID</li>
                        <li>支付宝认证姓名</li>
                        <li>常用登陆地</li>
                        <li>审核状态</li>
                        <li>操作</li>
                    </ul>
                    <ul v-for="item of 5" class="nav-list-item">
                        <li>123456789</li>
                        <li>Red</li>
                        <li>小红</li>
                        <li>广东省 - 广州市</li>
                        <li>已通过</li>
                        <li>
                            <el-button type="text">
                                <span @click="open">删除</span>&nbsp;
                                <span @click="amend">修改</span>
                            </el-button>
                        </li>
                    </ul>
                </div>
            </el-card>
        </div>
    </div>
</template>

<script>
    export default {
        name: "notice",
        data() {
            return {
                flag: true
            }
        },
        computed: {},
        methods: {
            open() {
                this.$confirm('是否删除账号？', '删除账号', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {

                }).catch(() => {

                });
            },
            addAccount() {
                this.$router.push({
                    name: 'binding'
                })
            },
            amend() {
                this.$router.push({
                    name: 'binding'
                })
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
    }

</style>