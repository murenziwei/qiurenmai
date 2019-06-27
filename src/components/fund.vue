<template>
    <div class="fund">

        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span class="c-topic">账户明细</span>
                <div class="c-right">
                    <el-button type="success">提现佣金</el-button>
                    <el-popover
                            placement="left"
                            width="400"
                    >
                        <el-form :model="moneyForm">
                            <div class="mbottom1">
                                <span class="box-clear">本金转佣金</span>
                            </div>
                            <el-alert
                                    title="1个金币=1.00元，10起充"
                                    type="info"
                                    show-icon class="mt1">
                            </el-alert>
                            <el-form-item label="充值金币">
                                <el-row type="flex" align="middle">
                                    <div><el-input v-model="moneyForm.money"></el-input></div>
                                    <span>
                                        金
                                    </span>
                                </el-row>
                            </el-form-item>

                            <el-alert type="error">
                                <p>
                                    {{xieyi.title}}
                                </p>
                                <p class="didi" v-for="(item,index) in xieyi.arr" :key="index">{{index+1}}.{{item}}</p>
                            </el-alert>
                            <el-divider></el-divider>
                            <el-row>
                                <el-button type="success" icon="el-icon-circle-check">确认提交</el-button>
                                <el-button type="danger" icon="el-icon-circle-close">取消退出</el-button>
                            </el-row>
                        </el-form>
                        <el-button slot="reference" type="primary" class="ml1">佣金充值</el-button>
                    </el-popover>
                </div>
            </div>
            <div class="body">
                <div>
                    <el-breadcrumb separator="/">
                        <el-breadcrumb-item>
                            本金账户： <el-link type="primary">0.00</el-link> 金  => <el-link type="primary">明细</el-link>
                        </el-breadcrumb-item>
                        <el-breadcrumb-item>
                            拥金账户： <el-link type="primary" class="number-nav">0.00</el-link> 金  => <el-link type="primary" class="number-nav">明细</el-link>
                        </el-breadcrumb-item>
                    </el-breadcrumb>
                </div>
                <div class="mt1">
                    <el-form :inline="true" :model="formInline" class="demo-form-inline">
                        <el-form-item label="时间设置">

                            <el-date-picker
                                    v-model="formInline.time"
                                    type="daterange"
                                    range-separator="至"
                                    start-placeholder="开始日期"
                                    end-placeholder="结束日期">
                            </el-date-picker>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="onSubmit">查询</el-button>
                        </el-form-item>
                    </el-form>
                </div>
                <div>

                    <el-table
                            :data="tableData.data"
                            border
                            style="width: 100%">
                        <el-table-column
                                prop="date"
                                label="时间"
                                >
                            <template slot-scope="scope">
                                {{new Date(scope.row.created_at*1000).toLocaleString()}}
                            </template>
                        </el-table-column>
                        <el-table-column
                                prop="note"
                                label="备注">
                        </el-table-column>

                        <el-table-column

                                label="交易金额">

                            <template slot-scope="scope">
                                {{scope.row.from|fromfil}}：{{scope.row.num}}
                            </template>
                        </el-table-column>
                        <el-table-column
                                prop="after_num"
                                label="余额">
                        </el-table-column>
                    </el-table>

                    <div class="mt-cen" style="text-align:center;">
                        <el-pagination
                                @current-change="bschange"
                                background
                                layout="prev, pager, next"
                                :total="tableData.last_page*10">
                        </el-pagination>
                    </div>
                </div>
            </div>
        </el-card>
    </div>
</template>

<script>
    import ajax from 'axios';
    export default {
        name: "fund",
        data(){
            return {
                xieyi:{
                    title:'佣金充值方式',
                    arr:[
                        '输入充入金币数量，自动从本金扣除相应金额得到对应金币（提前保持本金有足够余额），佣金不予退还。',
                        '直接消费形式，每次放单直接从本金扣除相应佣金，1.00按每金折算。'
                    ]
                },
                moneyForm:{
                    money:''
                },
                tableData:[
                    {
                      date:'2019-6-18',remark:'fe',account:'23',money:'3232',commission:'323',balance:'2323'
                    }
                ],
                formInline:{
                    time:''
                }
            }
        },
        created(){
            ajax.all([this.go_money()]);
        },
        filters:{
            fromfil:function(val){
                var del='/';
                switch (val){
                    case 1:del='本金';break;

                    case 2:del='佣金';break;
                }
                return del;
            }
        },
        methods:{

            //资金分页
            bschange(ee){
                console.log();
                this.go_money(ee);
            },
            //资金流水记录
            go_money(page){
                return this.$api.ports.jinList(page).then((res)=>{
                    if(res.code){
                        console.log(res,'jinList');
                        this.tableData=res.data[0];
                    }else{
                        this.$notify.error(res.message);
                    }
                })
            },
            onSubmit(){}
        }
    }
</script>

<style lang="less" scoped>
    .mbottom1{
        margin-bottom:1rem;
    }
    .box-clear{
        font-weight:bold;
    }
    .number-nav{
        color:#409EFF!important;
    }
    .mt1{
        margin:1rem 0;
    }
    .ml1{
        margin:0 1rem;
    }
    .c-topic{
        float:left;
    }
    .c-right{
        text-align:right;
    }
</style>