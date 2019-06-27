<template>
    <div class="notice">
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
                            <span @click="open">继续</span>&nbsp;
                            <span @click="amend">放弃</span>
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
            return {}
        },
        computed: {},
        methods: {
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