<template>
    <div class="detail">
        <el-card>
            <div slot="header">
                <div class="h-flex">

                    <span class="clearfix">
                        新版手机淘宝任务
                    </span>
                    <el-row type="flex" align="middle" justify="flex-end">
                        <el-breadcrumb separator="|">
                            <el-breadcrumb-item>木人子韦</el-breadcrumb-item>
                            <el-breadcrumb-item>任务编号：11323232</el-breadcrumb-item>
                            <el-breadcrumb-item>2019-06-19 18：00：00</el-breadcrumb-item>
                            <el-breadcrumb-item>状态：已完成</el-breadcrumb-item>
                        </el-breadcrumb>
                    </el-row>
                </div>
            </div>
            <div>
                <div>
                    <el-steps :active="1" simple  finish-status="success" >
                        <el-step title="提交任务等待付款"></el-step>
                        <el-step title="已付款，等候审核"></el-step>
                        <el-step title="任务审核通过，进行中"></el-step>
                        <el-step title="任务全部完成"></el-step>
                    </el-steps>
                </div>
                <el-divider></el-divider>
                <div>
                    <el-breadcrumb separator="|">
                        <el-breadcrumb-item>
                            任务生成订单总数：1单
                        </el-breadcrumb-item>
                        <el-breadcrumb-item>
                            待放出：0 单
                        </el-breadcrumb-item>
                        <el-breadcrumb-item>
                            未接单：0 单
                        </el-breadcrumb-item>
                        <el-breadcrumb-item>
                            未操作：0 单
                        </el-breadcrumb-item>
                        <el-breadcrumb-item>
                            待返款发货：0 单
                        </el-breadcrumb-item>
                        <el-breadcrumb-item>
                            待评价：0 单
                        </el-breadcrumb-item>
                        <el-breadcrumb-item>
                            待确认：0 单
                        </el-breadcrumb-item>
                        <el-breadcrumb-item>
                            已撤销：0 单
                        </el-breadcrumb-item>
                        <el-breadcrumb-item>
                            已完成：1 单
                        </el-breadcrumb-item>
                    </el-breadcrumb>
                </div>
                <el-divider></el-divider>
                <div>
                    <el-tabs type="border-card">
                        <el-tab-pane label="任务详情">
                            <el-card class="box-card">
                                <div slot="header">
                                    <el-row type="flex" align="middle">
                                        <el-col :span="12">
                                            <span class="b-font">任务商品基本信息</span>
                                        </el-col>
                                        <el-col :span="4">
                                            <span>展示价（元）</span>
                                        </el-col>
                                        <el-col :span="4">
                                            <span>成交价（元）</span>
                                        </el-col>
                                        <el-col :span="4">
                                            <span>每单拍下数量</span>
                                        </el-col>
                                    </el-row>
                                </div>
                                <div>
                                    <el-row type="flex" align="middle">
                                        <el-col :span="12">
                                            <div class="task-flex">
                                                <div class="tf-left">
                                                    <img class="t-l-img" :src="$store.state.urlimg" alt="" />
                                                </div>
                                                <div class="tf-right">
                                                    <p class="t-r-top">
                                                        <el-link class="trt-text" type="primary">蜂蜜洛神花茶自产土蜂蜜水果茶500g泡水喝的饮品花果养生蜂蜜茶</el-link>
                                                    </p>
                                                    <p class="t-r-bottom">
                                                        <span>商品链接:</span><el-link class="trt-link trt-text" type="primary" href="https://item.taobao.com/item.htm?spm=a1z10.3-c-s.w4002-">https://item.taobao.com/item.htm?spm=a1z10.3-c-s.w4002-</el-link>
                                                    </p>
                                                </div>
                                            </div>
                                        </el-col>
                                        <el-col :span="4">
                                            <span>￥324.00</span>
                                        </el-col>
                                        <el-col :span="4">
                                            <span>￥3321.00</span>
                                        </el-col>
                                        <el-col :span="4">
                                            <span>2</span>
                                        </el-col>
                                    </el-row>
                                    <el-divider></el-divider>

                                    <el-row type="flex" align="middle" justify="flex-end">
                                        <el-breadcrumb separator="|">
                                            <el-breadcrumb-item>
                                                <span class="trt-text">任务类型：</span>
                                                <el-link class="trt-text" type="primary" :underline="false">新版手机淘宝任务</el-link>
                                            </el-breadcrumb-item>
                                            <el-breadcrumb-item>

                                                <span class="trt-text">返款方式：</span>
                                                <el-link class="trt-text" type="primary" :underline="false">平台系统返款</el-link>
                                            </el-breadcrumb-item>
                                            <el-breadcrumb-item>

                                                <span class="trt-text">是否包邮：</span>
                                                <el-link class="trt-text" type="primary" :underline="false">是</el-link>
                                            </el-breadcrumb-item>
                                            <el-breadcrumb-item>状态：已完成</el-breadcrumb-item>
                                        </el-breadcrumb>
                                    </el-row>
                                    <el-divider></el-divider>

                                    <el-row type="flex" align="middle" justify="flex-end">
                                        <el-breadcrumb separator="|">
                                            <el-breadcrumb-item>
                                                <span class="trt-text">店铺名称：</span>
                                                <el-link class="trt-text" type="primary" :underline="false">木人子韦</el-link>
                                            </el-breadcrumb-item>
                                            <el-breadcrumb-item>

                                                <span class="trt-text">旺旺名称：</span>
                                                <el-link class="trt-text" type="primary" :underline="false">旺你眉笔</el-link>
                                            </el-breadcrumb-item>
                                        </el-breadcrumb>
                                    </el-row>
                                    <el-divider></el-divider>
                                    <el-row type="flex" align="middle" justify="flex-end">
                                        <el-breadcrumb separator="|">
                                            <el-breadcrumb-item>
                                                <span class="trt-text">价格区间：</span>
                                                <el-link class="trt-text" type="primary" :underline="false">0.00-1.00</el-link>
                                            </el-breadcrumb-item>
                                            <el-breadcrumb-item>

                                                <span class="trt-text">商品所在城市：</span>
                                                <el-link class="trt-text" type="primary" :underline="false">全国</el-link>
                                            </el-breadcrumb-item>
                                        </el-breadcrumb>
                                    </el-row>
                                    <el-divider></el-divider>
                                    <el-row type="flex" align="middle" justify="flex-end">
                                        <el-breadcrumb separator="|">
                                            <el-breadcrumb-item>

                                                <el-link class="trt-text" type="info" :underline="false"><span>包裹重量：</span>1.40公斤</el-link>
                                            </el-breadcrumb-item>
                                            <el-breadcrumb-item>
                                                <el-link class="trt-text" type="info" :underline="false"><span>快递：</span>菜鸟快递</el-link>

                                            </el-breadcrumb-item>
                                        </el-breadcrumb>
                                    </el-row>
                                    <el-divider></el-divider>
                                    <el-row type="flex" align="middle" justify="flex-end">
                                        <el-breadcrumb separator="|">
                                            <el-breadcrumb-item>
                                                <span>备注：无需假聊</span>
                                            </el-breadcrumb-item>
                                        </el-breadcrumb>
                                    </el-row>
                                    <el-divider></el-divider>
                                </div>
                            </el-card>

                            <el-card class="box-card">
                                <div slot="header">
                                    <el-row type="flex" align="middle">
                                        <el-col >
                                            <span class="b-font">普通好评：搜索关键词及单数</span>
                                        </el-col>
                                    </el-row>
                                </div>
                                <div>

                                    <el-row type="flex" align="middle" justify="flex-end">
                                        <el-col :span="7">
                                            <div>
                                                <span class="trt-text">搜索关键词</span><el-link class="trt-text" type="primary">蜂蜜洛神花茶自产养生蜂蜜茶</el-link>
                                            </div>
                                        </el-col>
                                        <el-col :span="7">
                                            <div>
                                                <span class="trt-text">任务单数</span><el-link class="trt-text" type="primary">1</el-link>
                                            </div>
                                        </el-col>
                                    </el-row>
                                    <el-divider></el-divider>
                                </div>
                            </el-card>

                            <el-card class="box-card">
                                <div slot="header">
                                    <el-row type="flex" align="middle">
                                        <el-col >
                                            <span class="b-font">放单计划设置</span>
                                        </el-col>
                                    </el-row>
                                </div>
                                <div>

                                    <el-row type="flex" align="middle" justify="flex-end">
                                        <el-col>
                                            <div>
                                                <span class="trt-text">放单计划</span>从<el-link class="trt-text" type="primary">2019-06-01 16:00:00</el-link>开始，每隔 <el-link type="danger">1</el-link>分钟放出1单，共放 <el-link type="danger">1</el-link>单
                                            </div>
                                        </el-col>
                                    </el-row>
                                    <el-divider></el-divider>
                                </div>
                            </el-card>
                            <el-card class="box-card">
                                <div slot="header">
                                    <el-row type="flex" align="middle">
                                        <el-col >
                                            <span class="b-font">接单用户淘宝帐号属性限制</span>
                                        </el-col>
                                    </el-row>
                                </div>
                                <div>

                                    <el-row>
                                        <el-col :span="12">
                                            <div class="it-div trt-text info-text">
                                                <span>地域限制：</span>
                                                <span>--</span>
                                            </div>
                                        </el-col>
                                        <el-col :span="12">
                                            <div class="it-div trt-text info-text">
                                                <span>年龄限制：</span>
                                                <span>--</span>
                                            </div>
                                        </el-col><el-col :span="12">
                                        <div class="it-div trt-text">
                                            <span >地域限制：</span>
                                            <span>--</span>
                                        </div>
                                    </el-col>
                                    </el-row>
                                    <el-divider></el-divider>
                                </div>
                            </el-card>
                        </el-tab-pane>
                        <el-tab-pane label="费用详情">
                            <el-table
                                    :data="tableData"
                                    :span-method="objectSpanMethod"
                                    border
                                    stripe
                                    style="width: 100%; margin-top: 20px">
                                <el-table-column
                                        prop="id"
                                        label="分类"
                                        width="180">
                                </el-table-column>
                                <el-table-column
                                        prop="name"
                                        label="费用明细">
                                </el-table-column>
                                <el-table-column
                                        prop="amount1"
                                        label="数量">
                                </el-table-column>
                                <el-table-column
                                        prop="amount2"
                                        label="小计">
                                </el-table-column>
                            </el-table>
                            <el-row >
                                <div class="t-r">
                                    <p>合计单数： <el-link type="primary">2</el-link>单</p>
                                    <p>合计支付： 本金<el-link type="danger">192.00</el-link>{{$store.state.mtext}},佣金<el-link type="danger">19</el-link>金</p>

                                </div>
                            </el-row>
                        </el-tab-pane>
                        <el-tab-pane label="进行中订单">

                            <el-table
                                    :data="loadOrder"
                                    border
                                    stripe
                                    style="width: 100%; margin-top: 20px">
                                <el-table-column
                                        prop="ordertime"
                                        label="接单时间"
                                        >
                                </el-table-column>
                                <el-table-column
                                        prop="orderid"
                                        label="订单ID"
                                >
                                </el-table-column>

                                <el-table-column
                                        prop="peopleid"
                                        label="买手ID"
                                >
                                </el-table-column>
                                <el-table-column
                                        prop="orderbank"
                                        label="接单账号"
                                >
                                </el-table-column>

                                <el-table-column
                                        prop="payment"
                                        label="垫付押金"
                                >
                                </el-table-column>
                                <el-table-column
                                        prop="payback"
                                        label="返款金额"
                                >
                                </el-table-column>
                                <el-table-column
                                        prop="orderstatus"
                                        label="订单状态"
                                >
                                </el-table-column>
                            </el-table>
                        </el-tab-pane>
                        <el-tab-pane label="已完成订单">

                            <el-table
                                    :data="doneOrder"
                                    border
                                    stripe
                                    style="width: 100%; margin-top: 20px">
                                <el-table-column
                                        prop="donetime"
                                        label="完成时间"
                                >
                                </el-table-column>
                                <el-table-column
                                        prop="orderid"
                                        label="订单ID"
                                >
                                </el-table-column>

                                <el-table-column
                                        prop="peopleid"
                                        label="买手ID"
                                >
                                </el-table-column>
                                <el-table-column
                                        prop="orderbank"
                                        label="接单账号"
                                >
                                </el-table-column>

                                <el-table-column
                                        prop="payment"
                                        label="垫付押金"
                                >
                                </el-table-column>
                                <el-table-column
                                        prop="payback"
                                        label="返款金额"
                                >
                                </el-table-column>
                            </el-table>
                        </el-tab-pane>
                        <el-tab-pane label="已撤销订单">

                            <el-table
                                    :data="annulOrder"
                                    border
                                    stripe
                                    style="width: 100%; margin-top: 20px">
                                <el-table-column
                                        prop="annultime"
                                        label="撤销时间"
                                >
                                </el-table-column>
                                <el-table-column
                                        prop="annulcount"
                                        label="撤销单号"
                                >
                                </el-table-column>

                                <el-table-column
                                        prop="paycash"
                                        label="垫付押金"
                                >
                                </el-table-column>
                                <el-table-column
                                        prop="orderbank"
                                        label="备注"
                                >
                                </el-table-column>

                                <el-table-column
                                        prop="remark"
                                        label="备注"
                                >
                                </el-table-column>
                            </el-table>
                        </el-tab-pane>

                        <el-tab-pane label="待接订单">

                            <el-table
                                    :data="waitOrder"
                                    border
                                    stripe
                                    style="width: 100%; margin-top: 20px">
                                <el-table-column
                                        prop="keyword"
                                        label="搜索关键词"
                                >
                                </el-table-column>
                                <el-table-column
                                        prop="cash"
                                        label="撤销单号"
                                >
                                </el-table-column>

                                <el-table-column
                                        prop="paycash"
                                        label="垫付押金"
                                >
                                </el-table-column>
                                <el-table-column
                                        prop="orderbank"
                                        label="备注"
                                >
                                </el-table-column>

                                <el-table-column
                                        prop="remark"
                                        label="备注"
                                >
                                </el-table-column>
                            </el-table>
                        </el-tab-pane>
                    </el-tabs>
                </div>
            </div>
        </el-card>
        <end></end>
    </div>
</template>

<script>
    import end from '../components/end'
    export default {
        name: "detail",
        data(){
            return {
                loadOrder:[],
                doneOrder:[],
                annulOrder:[],
                waitOrder:[],
                tableData: [{
                    id: '12987122',
                    name: '王小虎',
                    amount1: '234',
                    amount2: '3.2',
                    amount3: 10
                }, {
                    id: '12987123',
                    name: '王小虎',
                    amount1: '165',
                    amount2: '4.43',
                    amount3: 12
                }, {
                    id: '12987124',
                    name: '王小虎',
                    amount1: '324',
                    amount2: '1.9',
                    amount3: 9
                }, {
                    id: '12987125',
                    name: '王小虎',
                    amount1: '621',
                    amount2: '2.2',
                    amount3: 17
                }, {
                    id: '12987126',
                    name: '王小虎',
                    amount1: '539',
                    amount2: '4.1',
                    amount3: 15
                }]
            }
        },
        methods:{

            objectSpanMethod({ row, column, rowIndex, columnIndex }) {
                if (columnIndex === 0) {
                    if (rowIndex % 2 === 0) {
                        return {
                            rowspan: 2,
                            colspan: 1
                        };
                    } else {
                        return {
                            rowspan: 0,
                            colspan: 0
                        };
                    }
                }
            }
        },
        components:{
            end
        }
    }
</script>

<style lang="less" scoped>
.t-r{
    text-align:right;
}
.detail{
    text-align:left;
}
.box-card,.it-div{
    margin:1rem 0;
}
.info-text{
    color:#999;
}
.b-font{
    font-weight:bold;
}
.trt-link{
    margin-left:.5rem;
}
.trt-text{
    font-size:1rem;
}
.task-flex{

    .flex(center,flex-start,row);
    .t-l-img{
        width:6rem;
        height:6rem;

    }
    .t-r-bottom{
        .flex(center,flex-start,row);
    }
}
.h-flex{
    display:flex;
    align-items:center;
    justify-content:space-between;
}
.clearfix{
    font-size:1.5rem;
    font-weight: bold;
}

.flex(@ai,@jc,@fd){
    display:flex;
    align-items:@ai;
    justify-content:@jc;
    flex-direction:@fd;
}
</style>