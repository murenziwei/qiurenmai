<template>
        <div class="bank">
            <el-card class="box-card">
                <div slot="header" class="clearfix">
                    <span class="c-topic">体现设置</span>
                </div>
                <div class="n-content">
                    <el-breadcrumb separator="/">
                        <el-breadcrumb-item>银行卡</el-breadcrumb-item>
                        <el-breadcrumb-item>
                            <span @click="bindBank" :class="flag?'color1':'color'">{{flag?'绑定了':'未绑定'}}</span>
                        </el-breadcrumb-item>
                    </el-breadcrumb>
                </div>

                <p v-if="!flag" class="text">为确保您的资金安全，绑定后提现信息不可修改 即便账号被盗，您账号里的资金也不会转移到他人的账户中</p>

                <div v-if="flag" class="text">
                    <p>姓名： 小红</p>
                    <p>银行卡卡号： 6214 8327 2785 8131</p>
                    <p>银行名称： 招商银行</p>
                    <p>银行支行名称： 武汉分行光谷支行</p>
                    <p>开户行城市： 广东省广州市</p>
                    <p>到账短信提醒手机号：12345678910</p>
                </div>
            </el-card>
            <router-view></router-view>
        </div>
</template>

<script>
    export default {
        name: 'bank',
        data() {
            return {
                flag: false
            }
        },
        methods: {
            bindBank() {
                console.log(this.flag)
                if (!this.flag) {
                    this.$router.push({
                        name: 'bank'
                    })
                }
            }
        }
    }
</script>

<style scoped>
    .bank {
        position: relative;
        background: red;
        height: 100%;
    }

    .color {
        color: red;
        cursor: pointer;
    }

    .color1 {
        color: green;
    }

    .text {
        line-height: 30px;
        margin-top: 20px;
        font-size: 14px;
        text-align: center;
    }
</style>