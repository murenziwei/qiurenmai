<template>
        <div class="bank">
            <el-card class="box-card" v-if="!isrouter">
                <div slot="header" class="clearfix">
                    <span class="c-topic">体现设置</span>
                </div>
                <div class="n-content">
                    <el-breadcrumb separator="/">
                        <el-breadcrumb-item>银行卡</el-breadcrumb-item>
                        <el-breadcrumb-item>
                            <span @click="bindBank" :class="flag?'color1':'color'">{{flag?'去修改':'去绑定'}}</span>
                        </el-breadcrumb-item>
                    </el-breadcrumb>
                </div>

                <p v-if="!flag" class="text">为确保您的资金安全，绑定后提现信息不可修改 即便账号被盗，您账号里的资金也不会转移到他人的账户中</p>

                <div v-if="flag" class="text lw-left">
                    <p>姓名： {{bankdata.name}}</p>
                    <p>银行卡卡号： {{bankdata.card_no}}</p>
                    <p>银行名称： {{bankdata.bank}}</p>
                    <p>银行支行名称： {{bankdata.open_branch_name}}</p>
                    <p>开户行城市： {{bankdata.open_city}}</p>
                    <p>到账短信提醒手机号：{{bankdata.phone}}</p>
                </div>
            </el-card>
            <router-view v-if="isrouter"></router-view>
        </div>
</template>

<script>
    import ajax from 'axios';
    export default {
        name: 'bank',
        data() {
            return {
                bankdata:{
                    bank: "",
                    card_no: "",
                    id: '',
                    name: "",
                    open_branch_name: "",
                    open_city: "",
                    phone: ""
                },
                isrouter:false,
                flag: false
            }
        },
        created(){
            ajax.all([this.go_bank()]);
        },
        methods: {
            go_bank(){
                this.$api.ports.bindBankCard().then((res)=>{
                    if(res.code){
                        if(res.data.length){
                            this.flag=true;
                            this.bankdata=res.data[0];
                        }else{
                            this.flag=false;
                        }

                        console.log(res,'res,罪域');
                    }

                })
            },

            bindBank() {
                this.isrouter=true;
                this.$router.push({
                    name: 'bank'
                })
            }
        },
        watch:{
            "$route":function(to){
                console.log(to);
                if(to.name=='bank'){
                    this.isrouter=true;
                }else{
                    this.go_bank();
                    this.isrouter=false;
                }
            }
        }
    }
</script>

<style scoped>
    .lw-left>p{text-align:left;text-indent:20px;}
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

        cursor: pointer;
    }

    .text {
        line-height: 30px;
        margin-top: 20px;
        font-size: 14px;
        text-align: center;
    }
</style>