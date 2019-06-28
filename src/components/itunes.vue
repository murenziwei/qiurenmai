<template>
    <div class="itunes">
        <el-card class="box-card">

            <div slot="header" class="clearfix">
                <span class="c-topic">账户充值</span>
                <div class="c-right">
                    当前账户本金余额：<span class="bold-red">{{Number(ue_jin).toFixed(2)||'**'}}</span>金
                </div>
            </div>
            <div>

                <el-alert
                        title="充值注意事项"
                        type="warning" class="mt1">
                    <ul>
                        <li v-for="(item,index) in infolist" :key="index">
                            {{item}}
                        </li>
                    </ul>
                </el-alert>
                <el-tabs v-model="activeName" type="card">
                    <el-tab-pane label="银行卡转账" name="first">
                        <el-timeline>
                            <el-timeline-item timestamp="转账到平台官方指定收款账号" placement="top">
                                <div>
                                    <el-link type="danger" class="mt1">转账备注： 请勿备注刷单等敏感词汇，备注填写货款或其他，由于央行监管，单笔转账不要超过5万</el-link>
                                    <div>
                                        <el-form>

                                            <el-form-item label="转账途径">
                                                网银、手机银行  <el-link type="danger">注意：请勿通过支付宝转账</el-link>
                                            </el-form-item>
                                            <el-form-item label="转账途径">
                                                网银、手机银行
                                            </el-form-item>
                                        </el-form>
                                    </div>
                                </div>
                            </el-timeline-item>
                            <el-timeline-item timestamp="提交转账信息" placement="top">
                                <div>
                                    <p>
                                        <el-link type="info">转账至平台指定账号后，点击下方按钮提交转账信息
                                        </el-link>
                                    </p>
                                    <div class="mt1">
                                        <el-popover
                                                placement="top"
                                                width="600"
                                        >
                                            <el-form :model="moneyForm" :rules="moneyRule" ref="moneyForm">
                                                <div class="mt1">
                                                    <span class="box-clear">提交转账信息</span><el-link type="danger">（请勿通过支付宝转账）</el-link>
                                                </div>
                                                <el-divider></el-divider>

                                                <el-form-item label="转账银行名称" prop="bank">
                                                    <el-select v-model="moneyForm.bank" type="bank">
                                                        <el-option v-for="(item,index) in banks" :label="item.name" :key="index" :value="item.name"></el-option>
                                                    </el-select>
                                                </el-form-item>
                                                <el-form-item label="转账银行卡号" prop="card_no">
                                                    <el-input v-model="moneyForm.card_no" type="card_no"></el-input>
                                                </el-form-item>

                                                <el-form-item label="转账银行名字"  prop="card_name">
                                                    <el-input v-model="moneyForm.card_name"  type="card_name"></el-input>
                                                    <el-link type="info">填写你转出银行卡开户账号的姓名，方便财务核对，不要填手机号</el-link>
                                                </el-form-item>
                                                <el-form-item label="转账金额（元）"  prop="money">
                                                    <el-input v-model="moneyForm.money"  type="money"></el-input>
                                                    <el-link type="danger">（每次最低充值1元，充值1次提交1次，恶意提交将处罚或封号）</el-link>
                                                </el-form-item>
                                                <el-divider></el-divider>
                                                <el-row>
                                                    <el-button type="success" icon="el-icon-circle-check" @click="moneySubmit('moneyForm')">确认提交</el-button>
                                                </el-row>
                                                <el-alert type="error" class="mt1">

                                                    请先手动通过 网银/手机银行 转账到平台指定收款账户,再如实按照转账金额

                                                    提交充值申请。没有转账就提交充值申请，视为恶意提交。
                                                </el-alert>
                                            </el-form>
                                            <el-button slot="reference">提交转账信息</el-button>
                                        </el-popover>
                                    </div>
                                </div>
                            </el-timeline-item>
                            <el-timeline-item timestamp="人工审核" placement="top">
                                <div>
                                    <el-link type="danger">早上9:00到晚上9:00审核</el-link>
                                </div>
                            </el-timeline-item>
                        </el-timeline>
                        <el-divider></el-divider>
                        <div>

                            <el-table
                                    :data="tableData"
                                    border
                                    style="width: 100%">
                                <el-table-column
                                        prop="time"
                                        label="提交时间"
                                        >
                                </el-table-column>
                                <el-table-column
                                        prop="bank"
                                        label="转账银行"
                                        >
                                </el-table-column>
                                <el-table-column
                                        prop="name"
                                        label="开户名">
                                </el-table-column>
                                <el-table-column
                                        prop="money"
                                        label="金额">
                                </el-table-column>

                                <el-table-column
                                        prop="status"
                                        label="审核状态">
                                </el-table-column>

                                <el-table-column
                                        prop="shtime"
                                        label="审核时间">
                                </el-table-column>
                            </el-table>
                            <div class="mt1" style="text-align:center;">
                                <el-pagination
                                        background
                                        layout="prev, pager, next"
                                        :total="100">
                                </el-pagination>
                            </div>
                        </div>
                    </el-tab-pane>
                </el-tabs>
            </div>
        </el-card>
    </div>
</template>

<script>
    import ajax from 'axios';
    export default {
        name: "itunes",
        data(){
            return {
                ue_jin:'',

                tableData:[],
                banks:[
                    {
                        name:"招商银行"
                    }
                ],
                moneyForm:{
                    bank:'',
                    card_name:'',
                    card_no:'',
                    money:''
                },
                moneyRule: {
                    bank:[
                        {
                            required:true,message:'转账银行名称不能为空',trigger:'change'
                        }
                    ],
                    card_no:[
                        {
                            required:true,message:'转账银行卡号不能为空',trigger:'change'
                        }
                    ],
                    card_name:[
                        {
                            required:true,message:'转账银行名称不能为空',trigger:'change'
                        }
                    ],
                    money:[
                        {
                            required:true,message:'转账金额不能为空',trigger:'change'
                        }
                    ]
                },
                infolist:[
                    '禁止使用财付通转账，禁止通过银行柜台、ATM机转账',
                    '要求先转账再提交转账信息',
                    '转账时仔细核对收款人姓名、银行卡号（农行转账相较于其他银行较慢）',
                    '提交转账信息前仔细核对转账金额、姓名及银行卡号，禁止重复提交转账信息如发现恶意重复提交，将罚款甚至封号',
                    '及时提交转账信息，未及时提交者（超过一天）联系充值客服说明充值时间'
                ],
                activeName:'first'
            }
        },
        created(){
            ajax.all([this.go_money()]);
        },
        methods:{

            go_money(){
                console.log("是否知心");
                return this.$api.ports.getMoney().then((res)=>{
                    if(res.code){
                        console.log(res,'getMoney');
                        this.ue_jin=(res.data[0].ue_jin);
                    }else{
                        this.$notify.error(res.message);
                    }
                })
            },
            moneySubmit(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        var getR=this.moneyForm;
                        console.log(getR,'getR');
                        this.$api.ports.topUpPost(getR).then((res)=>{
                            if(res.code){
                                this.$alert('充值成功','温馨提示',{
                                    confirmButtonText: '确定',
                                    callback: action => {
                                        this.$router.go(0);
                                    }
                                })

                            }else{
                                this.$notify.error(res.message);
                            }
                        })


                    } else {
                        return false;
                    }
                });
            },
        }
    }
</script>

<style scoped>
    .mt1{
        margin:1rem 0;
    }
    .c-right{
        text-align:right;
    }
    .clearfix{
        margin-bottom:1rem;
    }
    .bold-red{
        color:red;
    }
    .c-topic{
        float:left;
    }
</style>