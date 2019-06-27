<template>
    <div class="notice">

        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span class="c-topic">任务列表</span>
            </div>
            <div class="n-content">
                <h3>所有买手都要注意在接受任务必须严格控制好以下两点：</h3>
                <p>1、请买手遵守平台规则，按照任务步骤中的提示完成任务，不得违规操作；如有违反，我们有权 利对买手进行处罚</p>
                <p>2、接受任务后，请2个小时内完成任务，超过时间则取消任务扣除一个虚拟币（考虑清楚后再接）</p>
            </div>
        </el-card>


        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span class="c-topic">第一步：选择任务类型</span>
            </div>
            <div class="n-content">
                <div>
                    <el-radio-group v-model="radio1">
                        <el-radio-button label="垫付任务"></el-radio-button>
                        <el-radio-button label="浏览任务"></el-radio-button>
                    </el-radio-group>
                </div>
                <div class="margin-top">
                    <h3>请选择平台</h3>
                    <el-radio-group v-model="radio2">
                        <el-radio-button label="淘宝"></el-radio-button>
                        <el-radio-button label="拼多多"></el-radio-button>
                    </el-radio-group>
                </div>
                <div class="margin-top">
                    <h3>请选择平台</h3>
                    <el-radio-group v-model="radio3">
                        <el-radio-button label="淘宝任务"></el-radio-button>
                        <el-radio-button label="淘口令任务"></el-radio-button>
                        <el-radio-button label="预售任务"></el-radio-button>
                    </el-radio-group>
                </div>
            </div>
        </el-card>


        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span class="c-topic">第二步：请选择账号</span>
            </div>
            <div class="n-content">
                <div>
                    <el-radio-group v-model="radio">
                        <el-radio :label="3">14725283690</el-radio>
                        <el-radio :label="6">12345678910</el-radio>
                    </el-radio-group>

                    <div class="addAccount">
                        <i class="el-icon-plus"></i>
                        添加账号
                    </div>
                </div>
            </div>
        </el-card>

        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span class="c-topic">第三步：请选择任务</span>
            </div>
            <div>
                <ul class="nav-list">
                    <li>商家</li>
                    <li>购买件数</li>
                    <li>买手需垫付资金</li>
                    <li>佣金</li>
                    <li>任务总数</li>
                    <li>已完成（%）</li>
                    <li>接手状态</li>
                </ul>
                <ul v-for="item of 5" class="nav-list-item">
                    <li>12345678910</li>
                    <li>2件</li>
                    <li>500元</li>
                    <li>20元</li>
                    <li>5单</li>
                    <li class="color">20%</li>
                    <li><el-button type="text" @click="open">接受此任务</el-button></li>
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
                radio: 3,
                radio1: '垫付任务',
                radio2: '淘宝',
                radio3: '淘宝任务',
            }
        },
        computed: {
            noMore() {
                return this.count >= 20
            }
        },
        methods: {
            load() {
                if (!this.noMore) {

                    this.loading = true
                    setTimeout(() => {
                        this.count += 2
                        this.loading = false
                    }, 2000)
                }
            },
            open() {
                this.$confirm('一个刷手一个淘宝账号一星期只能接4单。拼多多\n' +
                    '\n' +
                    '一个账号一星期可以接5单，浏览任务不限，是否\n' +
                    '\n' +
                    '接受此单？', '是否接受此单', {
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

<style lang="less" scoped>

    .margin-top {
        margin-top: 30px;
    }

    .box-card {
        margin-bottom: 2rem;
    }

    .loading-lw {
        text-align: center;

    }

    .addAccount{
        margin-top: 10px;
        line-height: 30px;
        color: #409EFF;
        cursor: pointer;
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
        p {
            padding: 5px 0;
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
    }
</style>