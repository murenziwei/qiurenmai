<template>
    <div class="virtual">
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span class="c-topic">任务列表</span>
            </div>
            <div class="n-content">
                <p>您当前可提现本金：200金币</p>
                <p>可提现佣金：200金币</p>
            </div>
            <div class="color1">银行卡： 预计48小时到账</div>

            <div class="input-text">
                <p>本金提现金额:</p>
                <p><el-input v-model="input" type="number" placeholder="请输入金额"></el-input></p>
                <p><el-button>申请提现</el-button></p>
            </div>
            <p class="color1">
                本金满10金币方可提现，会员提现免手续费，非会员提现扣取0.1%手续费
            </p>

            <div class="input-text">
                <p>佣金提现金额:</p>
                <p><el-input v-model="input" type="number" placeholder="请输入金额"></el-input></p>
                <p><el-button>申请提现</el-button></p>
            </div>
            <p class="color1">
                佣金满100金币方可提现，会员提现免手续费，非会员提现扣取10%手续费
            </p>
        </el-card>


        <el-card class="box-card">

            <div>
                <ul class="nav-list">
                    <li>申请时间</li>
                    <li>转账银行</li>
                    <li>开户名</li>
                    <li>金额</li>
                    <li>审核状态</li>
                    <li>审核时间</li>
                </ul>
                <ul v-for="item of 5" class="nav-list-item">
                    <li>2019-06-06 20:20:20</li>
                    <li>中国银行</li>
                    <li>小红</li>
                    <li>¥120</li>
                    <li>已通过</li>
                    <li>2019-06-06 20:20:20</li>
                </ul>
            </div>
        </el-card>
    </div>
</template>

<script>
    export default {
        name: 'virtual',
        data(){
            return {
                input: ''
            }
        }
    }
</script>

<style scoped lang="less">
    .virtual{

    }
    .color1{
        color: #ccc;
        font-size: 14px;
        margin-bottom: 20px;
        line-height: 30px;
    }
    .n-content{
        display: flex;
        line-height: 40px;
        p{
            margin-right: 20px;
        }
    }
    .input-text{
        display: flex;
        align-items: center;
        p{
            margin-right: 20px;
        }
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