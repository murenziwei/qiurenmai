<template>
    <div>

        <el-card>

            <el-tabs v-model="activeName">
                <el-tab-pane label="浏览任务管理" name="first">
                    <el-form :inline="true" :model="formInline" class="demo-form-inline">
                        <el-form-item label="任务ID">
                            <el-input v-model="formInline.id"></el-input>
                        </el-form-item>
                        <el-form-item label="店铺">
                            <el-select v-model="formInline.region">
                                <el-option v-for="(item,index) in shops" :key="index" :label="item.name" :value="item.name"></el-option>

                            </el-select>
                        </el-form-item>
                        <el-form-item label="类型">
                            <el-select v-model="formInline.type">
                                <el-option v-for="(item,index) in tasks" :key="index" :label="item.name" :value="index"></el-option>

                            </el-select>
                        </el-form-item>
                        <el-form-item label="状态">
                            <el-select v-model="formInline.status">
                                <el-option v-for="(item,index) in status" :key="index" :label="item.name" :value="index"></el-option>

                            </el-select>
                        </el-form-item>
                        <el-form-item label="发布时间">
                            <el-date-picker
                                    v-model="formInline.issuetime"
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
                    <el-divider></el-divider>
                    <div>
                        <div class="an-item" v-for="(item,index) in 3" :key="index">
                            <el-row class="t-i-header" type="flex" align="middle" justify="space-between">

                                <div class="tih-type">木人子韦</div>
                                <div>
                                    <el-breadcrumb separator-class="el-icon-arrow-right">
                                        <el-breadcrumb-item :to="{ path: '/' }">新版手机淘宝任务</el-breadcrumb-item>
                                        <el-breadcrumb-item>总单数：1</el-breadcrumb-item>
                                        <el-breadcrumb-item>任务编号：1008611</el-breadcrumb-item>
                                        <el-breadcrumb-item>已置顶</el-breadcrumb-item>
                                        <el-breadcrumb-item>
                                            <el-link>[查看详情]</el-link>
                                            <el-link>[重新发布]</el-link>
                                        </el-breadcrumb-item>
                                        <el-breadcrumb-item>
                                            <el-link type="success">已完成</el-link>
                                        </el-breadcrumb-item>

                                    </el-breadcrumb>
                                </div>
                            </el-row>
                            <el-row class="t-i-bottom" type="flex" align="middle" :gutter="20">
                                <el-col class="tib-first tib-item" :span="9">
                                    <el-row type="flex" align="middle">
                                        <div>
                                            <el-image :src="$store.state.urlimg" class="tf-img"></el-image>
                                        </div>


                                        <el-col>
                                            <el-row class="tf-r-flex">
                                                <el-col class="trf-text">
                                                    蜂蜜洛神花茶自产土蜂蜜水果茶500g泡水喝的饮品花果养生蜂蜜茶
                                                </el-col>
                                                <el-col class="tf-b">
                                                    <div class="tf-b-r">
                                                        未接单：0
                                                    </div>
                                                    <div class="tf-b-l">
                                                        2019-06-01 16:55:49
                                                    </div>

                                                </el-col>
                                            </el-row>
                                        </el-col>
                                    </el-row>
                                </el-col>
                                <el-col class="tib-first tib-item" :span="3">
                                    <el-link type="info">待操作</el-link>
                                </el-col>

                                <el-col class="tib-first tib-item" :span="3">
                                    <el-link type="danger">待返款发货</el-link>
                                </el-col>

                                <el-col class="tib-first tib-item" :span="3">
                                    <el-link type="info">待评价</el-link>
                                </el-col>
                                <el-col class="tib-first tib-item" :span="3">
                                    <el-link type="info">待确认</el-link>
                                </el-col>

                                <el-col class="tib-first tib-item" :span="3">
                                    <el-link type="info">已完成：1</el-link>
                                </el-col>
                            </el-row>
                        </div>
                    </div>
                    <div class="mt-cen" style="text-align:center;">
                        <el-pagination
                                background
                                layout="prev, pager, next"
                                :total="100">
                        </el-pagination>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="浏览撤销订单" name="second">
                        <el-form :inline="true" :model="formOutline" class="demo-form-inline">

                            <el-form-item label="店铺">
                                <el-select v-model="formOutline.region">
                                    <el-option v-for="(item,index) in shops" :key="index" :label="item.name" :value="item.name"></el-option>

                                </el-select>
                            </el-form-item>

                            <el-form-item label="类型">
                                <el-select v-model="formOutline.type">
                                    <el-option v-for="(item,index) in tasks" :key="index" :label="item.name" :value="index"></el-option>

                                </el-select>
                            </el-form-item>
                            <el-form-item label="任务ID">
                                <el-input v-model="formOutline.taskid"></el-input>
                            </el-form-item>
                            <el-form-item>
                                <el-button type="primary" @click="onSubmit">查询</el-button>
                            </el-form-item>
                        </el-form>

                        <el-table
                                :data="outData"
                                border
                                style="width: 100%">
                            <el-table-column
                                    label="商品"
                                    >
                                <template slot-scope="scope">
                                    <div class="ptl-list">
                                        <div class="pl-left">
                                            <el-image class="pl-img" :src="$store.state.urlimg"></el-image>
                                        </div>
                                        <div class="pl-right">
                                            <p class="pr-top">蜂蜜洛神花茶自产土蜂蜜水果茶500g泡水喝的饮品花果养生蜂蜜茶</p>
                                            <div class="pr-bottom">
                                                <el-tag type="danger" class="pb-tag">淘</el-tag>
                                                <span class="pb-span">木人子韦</span>
                                            </div>
                                        </div>
                                    </div>
                                </template>
                            </el-table-column>
                            <el-table-column
                                    label="撤销信息"
                                    >
                                <template slot-scope="scope">
                                    <p>
                                        撤销原因：{{scope.row.payless}}
                                    </p>
                                </template>
                            </el-table-column>
                        </el-table>
                        <div class="mt-cen" style="text-align:center;">
                            <el-pagination
                                    background
                                    layout="prev, pager, next"
                                    :total="100">
                            </el-pagination>
                        </div>
                </el-tab-pane>

            </el-tabs>
        </el-card>
    </div>
</template>

<script>
    export default {
        name: "previewtask",
        data(){
            return {
                paystatus:[
                    {name:'全部进行中'},
                    {name:'待操作'},
                    {name:'待返款发货'},
                    {name:'待评价'},
                    {name:'待确认'},
                ],
                orderstatus:[
                    {name:'未完成订单'},
                    {name:'已完成订单'}
                ],

                payhistoryData:[
                    {
                        ordertime:'2019-06-11 14:55:11',
                        orderid:'68000434',
                        taskid:'13300941',
                        id:'369800',
                        bank:'开心小猪洋洋828555689',
                        orderstatus:'已完成',
                        typetask:'普通好评任务',
                        name:'蜂蜜洛神花茶自产土蜂蜜水果茶500g泡水喝的饮品花果养生蜂蜜茶',
                        shopsize:'大',
                        confirm:'',
                        isc:'',
                        nav:'https://item.taobao.com/item.htm?spm=a1z10.3-c-s.w4002-18627633031.14.76da53ddmdVGyD&id=574073090470'
                    }
                ],
                payplayData:[
                    {
                        ordertime:'',
                        orderid:'',
                        taskid:'',
                        id:'',
                        bank:'',
                        orderstatus:'',
                        typetask:'',
                        shop:'',
                        shopsize:'',
                        confirm:'',
                        isc:''
                    }
                ],
                outData:[{
                    orderinfo:'',
                    userinfo:'',
                    payandpic:{},
                    payless:'我是马云'
                }],
                activeName:'first',
                // 选择状态
                status:[
                    {
                        name:'全部'
                    },
                    {
                        name:'待支付'
                    },

                    {
                        name:'待审核'
                    },

                    {
                        name:'进行中'
                    },


                    {
                        name:'审核不通过'
                    },

                    {
                        name:'已完成'
                    }
                ],
                // 选择类型
                tasks:[
                    {
                        name:'全部'
                    },
                    {
                        name:'手机淘宝任务'
                    }
                ],
                //选择店铺
                shops:[
                    {
                        type:'淘宝',
                        name:'木人子韦',
                        jude:'Tb'
                    },
                    {
                        type:'拼多多',
                        name:'瞧你咋滴',
                        jude:'Pin'
                    }
                ],
                payhistory:{
                    issuetime:'',
                    region:'',
                    taskid:'',
                    orderid:'',
                    wwid:'',
                    id:'',
                    tbid:'',
                    type:'',
                    status:''
                },
                payplay:{
                    issuetime:'',
                    region:'',
                    taskid:'',
                    orderid:'',
                    wwid:'',
                    id:'',
                    tbid:'',
                    type:'',
                    status:''
                },
                expressform:{
                    issuetime:'',
                    region:'',
                    taskid:'',
                    orderid:'',
                    wwid:'',
                },
                formOutline:{
                    region:'',
                    id:'',
                    taskid:'',
                    orderid:'',
                    wwid:'',
                    tbid:'',
                    ww:''
                },
                formInline: {
                    id: '',
                    region: '',
                    status:'',
                    type:'',
                    issuetime:''
                }
            }
        },
        methods:{
            onSubmit(f){
                console.log(f);
            }
        }
    }
</script>

<style lang="less" scoped>
.ptl-list{
    .pl-img{
        width:7rem;
        height:7rem;
    }
    .flex(center,flex-start,row);
    .pl-right{
        margin-left:5px;
        .flex(flex-start,space-between,column);
        .pr-bottom{
            width:100%;
            .pb-span{margin-left:5px;}
            .flex(center,flex-end,row);
        }
    }
}


 .an-item{
     margin:1rem 0;
 }
 .mt-cen{
     margin:1rem auto;
     text-align:center;
 }

.trf-text{
    font-size:.7rem;
}
.tf-r-flex{
    padding:0 .2rem;
    height:7rem;
    .flex(flex-start,space-between,column);
}
.t-i-header{
    margin-top:24px;
    padding-bottom:24px;
    border-bottom:1px dashed #eee;
    .tih-type{
        font-size:1rem;
        font-weight: bold;
    }
}
.tf-b{
    font-size:.7rem;
}
.tf-b-r{
    float:right;
}
.tf-img{
    width:7rem;
    height:7rem;
}




.istop{
    &:after{
        content:'置顶';
    }
    &.active:after{
         content:'已置顶';
         color:#D85C2F;
    }
}


.flex(@ai,@jc,@fd){
    display:flex;
    align-items:@ai;
    justify-content:@jc;
    flex-direction:@fd;
}
</style>