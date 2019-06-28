<template>
    <div class="detail">
        <el-card>
            <div slot="header">
                <div class="h-flex">

                    <span class="clearfix">
                       {{detaildata.task_type|shoptype}}
                    </span>
                    <el-row type="flex" align="middle" justify="flex-end">
                        <el-breadcrumb separator="|">
                            <el-breadcrumb-item>{{headdata.shop_name||'**'}}</el-breadcrumb-item>
                            <el-breadcrumb-item>任务编号：{{headdata.id||'**'}}</el-breadcrumb-item>
                            <el-breadcrumb-item>{{new Date(headdata.create_at*1000).toLocaleString()||'**'}}</el-breadcrumb-item>
                            <el-breadcrumb-item>状态：{{headdata.status|statusfilter}}</el-breadcrumb-item>
                        </el-breadcrumb>
                    </el-row>
                </div>
            </div>
            <div>
                <div>
                    <el-steps :active="headdata.status" simple  finish-status="success" >
                        <el-step title="提交任务等待付款"></el-step>
                        <!--<el-step title="已付款，等候审核"></el-step>-->
                        <el-step title="任务进行中"></el-step>
                        <el-step title="任务全部完成"></el-step>
                    </el-steps>
                </div>
                <el-divider></el-divider>
                <div>
                    <el-breadcrumb separator="|">
                        <el-breadcrumb-item>
                            任务生成订单总数：{{headdata.task_num||'**'}}单
                        </el-breadcrumb-item>
                        <el-breadcrumb-item>
                            待放出：{{headdata.status0||'**'}} 单
                        </el-breadcrumb-item>
                        <el-breadcrumb-item>
                            未接单：{{headdata.status1||'**'}} 单
                        </el-breadcrumb-item>
                        <el-breadcrumb-item>
                            未操作：{{headdata.status2||'**'}} 单
                        </el-breadcrumb-item>
                        <el-breadcrumb-item>
                            待返款发货：{{headdata.status3||'**'}} 单
                        </el-breadcrumb-item>
                        <el-breadcrumb-item>
                            待评价：{{headdata.status4||'**'}} 单
                        </el-breadcrumb-item>
                        <el-breadcrumb-item>
                            待确认：{{headdata.status5||'**'}} 单
                        </el-breadcrumb-item>
                        <el-breadcrumb-item>
                            已完成：{{headdata.status6||'**'}} 单
                        </el-breadcrumb-item>
                        <el-breadcrumb-item>
                            已撤销：{{headdata.status7||'**'}} 单
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
                                                    <lw-img class-data="t-l-img" :src-data="detaildata.goods_img" alt="" />
                                                </div>
                                                <div class="tf-right">
                                                    <p class="t-r-top">
                                                        <el-link class="trt-text" type="primary">{{detaildata.goods_name}}</el-link>
                                                    </p>
                                                    <p class="t-r-bottom">
                                                        <span>商品链接:</span>
                                                        <el-link class="trt-link trt-text" type="primary" :href="detaildata.goods_link">
                                                            {{detaildata.goods_link}}
                                                        </el-link>
                                                    </p>
                                                </div>
                                            </div>
                                        </el-col>
                                        <el-col :span="4">
                                            <span>￥{{detaildata.show_price}}</span>
                                        </el-col>
                                        <el-col :span="4">
                                            <span>￥{{detaildata.real_price}}</span>
                                        </el-col>
                                        <el-col :span="4">
                                            <span>{{detaildata.goods_count}}</span>
                                        </el-col>
                                    </el-row>
                                    <el-divider></el-divider>

                                    <el-row type="flex" align="middle" justify="flex-end">
                                        <el-breadcrumb separator="|">
                                            <el-breadcrumb-item>
                                                <span class="trt-text">任务类型：</span>
                                                <el-link class="trt-text" type="primary" :underline="false">{{detaildata.task_type|shoptype}}</el-link>
                                            </el-breadcrumb-item>
                                            <el-breadcrumb-item>

                                                <span class="trt-text">返款方式：</span>
                                                <el-link class="trt-text" type="primary" :underline="false">平台系统返款</el-link>
                                            </el-breadcrumb-item>
                                            <el-breadcrumb-item>

                                                <span class="trt-text">是否包邮：</span>
                                                <el-link class="trt-text" type="primary" :underline="false">{{detaildata.is_post?'包邮':'不包邮'}}</el-link>
                                            </el-breadcrumb-item>
                                            <!--<el-breadcrumb-item>状态：已完成</el-breadcrumb-item>-->
                                        </el-breadcrumb>
                                    </el-row>
                                    <el-divider></el-divider>

                                    <el-row type="flex" align="middle" justify="flex-end">
                                        <el-breadcrumb separator="|">
                                            <el-breadcrumb-item>
                                                <span class="trt-text">店铺名称：</span>
                                                <el-link class="trt-text" type="primary" :underline="false">{{detaildata.shop_name}}</el-link>
                                            </el-breadcrumb-item>
                                            <el-breadcrumb-item>

                                                <span class="trt-text">旺旺名称：</span>
                                                <el-link class="trt-text" type="primary" :underline="false">{{detaildata.shop_wang_id}}</el-link>
                                            </el-breadcrumb-item>
                                        </el-breadcrumb>
                                    </el-row>
                                    <el-divider></el-divider>
                                    <el-row type="flex" align="middle" justify="flex-end">
                                        <el-breadcrumb separator="|">
                                            <el-breadcrumb-item>
                                                <span class="trt-text">价格区间：</span>
                                                <el-link class="trt-text" type="primary" :underline="false">{{detaildata.searh_start_price}}-{{detaildata.searh_end_price}}</el-link>
                                            </el-breadcrumb-item>
                                            <el-breadcrumb-item>

                                                <span class="trt-text">商品所在城市：</span>
                                                <el-link class="trt-text" type="primary" :underline="false">{{detaildata.goods_location	}}</el-link>
                                            </el-breadcrumb-item>
                                        </el-breadcrumb>
                                    </el-row>
                                    <el-divider></el-divider>
                                    <el-row type="flex" align="middle" justify="flex-end">
                                        <el-breadcrumb separator="|">
                                            <el-breadcrumb-item>

                                                <el-link class="trt-text" type="info" :underline="false"><span>包裹重量：</span>{{detaildata.empty_parcel?(detaildata.empty_parcel["parcel_weight"]||0)+'公斤':'/'}}</el-link>
                                            </el-breadcrumb-item>
                                            <el-breadcrumb-item>
                                                <el-link class="trt-text" type="info" :underline="false"><span>快递：</span>{{detaildata.empty_parcel?(detaildata.empty_parcel["post_type"]||0)+'公斤':'/'}}</el-link>

                                            </el-breadcrumb-item>
                                        </el-breadcrumb>
                                    </el-row>
                                    <el-divider></el-divider>
                                    <el-row type="flex" align="middle" justify="flex-end">
                                        <el-breadcrumb separator="|">
                                            <el-breadcrumb-item>
                                                <span>备注：{{detaildata.explain||'无需假聊'}}</span>
                                            </el-breadcrumb-item>
                                        </el-breadcrumb>
                                    </el-row>
                                    <el-divider></el-divider>
                                </div>
                            </el-card>

                            <el-card class="box-card" v-if="judgeObj[1]">
                                <div slot="header">
                                    <el-row type="flex" align="middle">
                                        <el-col >
                                            <span class="b-font">普通好评：搜索关键词及单数</span>
                                        </el-col>
                                    </el-row>
                                </div>
                                <div v-for="(cval) in filterarr(judgeObj[1])">

                                    <el-row type="flex" align="middle" justify="flex-end">
                                        <el-col :span="7">
                                            <div>
                                                <span class="trt-text">搜索关键词：</span><el-link class="trt-text" type="primary">{{cval.text}}</el-link>
                                            </div>
                                        </el-col>
                                        <el-col :span="7">
                                            <div>
                                                <span class="trt-text">任务单数：</span><el-link class="trt-text" type="primary">{{cval.count}}</el-link>
                                            </div>
                                        </el-col>
                                    </el-row>
                                    <el-divider></el-divider>
                                </div>

                                <p>
                                    <el-link type="info" v-show="!(detaildata.comment_info?detaildata.comment_info.length:false)">没有更多数据了</el-link>
                                </p>
                            </el-card>


                            <el-card class="box-card" v-if="judgeObj[2]">
                                <div slot="header">
                                    <el-row type="flex" align="middle">
                                        <el-col >
                                            <span class="b-font">指定文字好评</span>
                                        </el-col>
                                    </el-row>
                                </div>
                                <div v-for="(cval) in filterarr(judgeObj[2])">

                                    <el-row type="flex" align="middle" justify="flex-end">
                                        <el-col :span="7">
                                            <div>
                                                <span class="trt-text">搜索关键词：</span><el-link class="trt-text" type="primary">{{cval.text}}</el-link>
                                            </div>
                                        </el-col>
                                        <el-col :span="7">
                                            <div>
                                                <span class="trt-text">任务单数：</span><el-link class="trt-text" type="primary">{{cval.count}}</el-link>
                                            </div>
                                        </el-col>
                                    </el-row>
                                    <el-divider></el-divider>
                                </div>

                                <p>
                                    <el-link type="info" v-show="!(detaildata.comment_info?detaildata.comment_info.length:false)">没有更多数据了</el-link>
                                </p>
                            </el-card>

                            <el-card class="box-card" v-if="judgeObj[3]">
                                <div slot="header">
                                    <el-row type="flex" align="middle">
                                        <el-col >
                                            <span class="b-font">图片好评</span>
                                        </el-col>
                                    </el-row>
                                </div>
                                <div v-for="(cval) in judgeObj[3]">

                                    <el-row type="flex" align="middle" justify="flex-end">
                                        <el-col :span="7">
                                            <div>
                                                <span class="trt-text">搜索关键词：</span><el-link class="trt-text" type="primary">{{cval.search_word}}</el-link>
                                            </div>
                                        </el-col>
                                    </el-row>
                                    <p>图片列表</p>
                                    <el-row class="task-flex">

                                            <lw-img alt=""  v-for="ev in (cval.imgs).split(',')" :src-data="ev" />


                                    </el-row>
                                    <el-divider></el-divider>
                                </div>

                                <p>
                                    <el-link type="info" v-show="!(detaildata.comment_info?detaildata.comment_info.length:false)">没有更多数据了</el-link>
                                </p>
                            </el-card>

                            <el-card class="box-card" v-if="judgeObj[4]">
                                <div slot="header">
                                    <el-row type="flex" align="middle">
                                        <el-col >
                                            <span class="b-font">视频好评</span>
                                        </el-col>
                                    </el-row>
                                </div>
                                <div v-for="(cval) in judgeObj[4]">

                                    <el-row type="flex" align="middle" justify="flex-end">
                                        <el-col :span="7">
                                            <div>
                                                <span class="trt-text">搜索关键词：</span><el-link class="trt-text" type="primary">{{cval.search_word}}</el-link>
                                            </div>
                                        </el-col>
                                    </el-row>
                                    <p>图片列表</p>
                                    <el-row class="task-flex">

                                        <lw-img alt=""  v-for="ev in (cval.imgs).split(',')" :src-data="ev" />


                                    </el-row>

                                    <p>视频列表</p>
                                    <el-row class="task-flex">
                                        <video controls class="v-w1"  v-for="ev in (cval.video).split(',')" :src="ev" ></video>
                                    </el-row>
                                    <el-divider></el-divider>
                                </div>

                                <p>
                                    <el-link type="info" v-show="!(detaildata.comment_info?detaildata.comment_info.length:false)">没有更多数据了</el-link>
                                </p>
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

                                    <div v-for="(sval,sind) in detaildata.send_plan" :key="sind">

                                        <el-row type="flex" align="middle" justify="flex-end">
                                            <el-col>
                                                <div>
                                                    <span class="trt-text">放单计划</span>从<el-link class="trt-text" type="primary">{{new Date(sval.start_at*1000).toLocaleString()}}</el-link>开始，每隔 <el-link type="danger">{{sval.time_interval}}</el-link>分钟放出1单，共放 <el-link type="danger">{{sval.task_num}}</el-link>单
                                                </div>
                                            </el-col>
                                        </el-row>
                                        <el-divider></el-divider>
                                    </div>
                                    <p>
                                        <el-link type="info" v-show="!(detaildata.send_plan?detaildata.send_plan.length:false)">没有更多数据了</el-link>
                                    </p>
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
                                            <div class="it-div trt-text">
                                                <span>地域限制：</span>
                                                <span>{{detaildata.restrict_area||'--'}}</span>
                                            </div>
                                        </el-col>
                                        <el-col :span="12">
                                            <div class="it-div trt-text">
                                                <span>性别限制：</span>
                                                <span>{{detaildata.restrict_sex|sexs}}</span>
                                            </div>
                                        </el-col>

                                        <el-col :span="12">
                                            <div class="it-div trt-text">
                                                <span>性别限制：</span>
                                                <span>{{detaildata.restrict_level?'钻级别以上':'--'}}</span>
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

                                    border
                                    style="width: 100%; margin-top: 20px">
                                <el-table-column
                                        label="返款本金"
                                >
                                    <template slot-scope="scope">
                                        {{scope.row.every_cash_pledge||'/'}}
                                    </template>
                                </el-table-column>

                                <el-table-column
                                        label="基础佣金"
                                >
                                    <template slot-scope="scope">
                                        {{scope.row.every_commission||'/'}}
                                    </template>
                                </el-table-column>
                                <el-table-column
                                        label="数量"
                                >
                                    <template slot-scope="scope">
                                        {{scope.row.task_num||'/'}}
                                    </template>
                                </el-table-column>
                                <el-table-column
                                        label="千人千面"
                                >
                                    <template slot-scope="scope">
                                        {{scope.row.platform_fee||'/'}}
                                    </template>
                                </el-table-column>
                                <el-table-column
                                        label="空包服务费"
                                >
                                    <template slot-scope="scope">
                                        {{scope.row.empty_parcel_fee||'/'}}
                                    </template>
                                </el-table-column>
                                <el-table-column
                                        label="收藏加购服务费"
                                >
                                    <template slot-scope="scope">
                                        {{scope.row.favorites_fee||'/'}}
                                    </template>
                                </el-table-column>
                                <el-table-column
                                        label="置顶"
                                >
                                    <template slot-scope="scope">
                                        {{scope.row.top_fee||'/'}}
                                    </template>
                                </el-table-column>
                                <el-table-column
                                        label="加赏佣金（每单）"
                                >
                                    <template slot-scope="scope">
                                        {{scope.row.add_fee||'/'}}
                                    </template>
                                </el-table-column>
                                <el-table-column
                                        label="评论需求"
                                >
                                    <template slot-scope="scope">
                                        {{scope.row.comment_fee||'/'}}
                                    </template>
                                </el-table-column>
                            </el-table>
                            <div style="text-align:right;">
                                <p>
                                    合计单数： <span class="success-text">{{allm.yn||0}}</span>单
                                </p>

                                <p>
                                    合计支付： 佣金<span class="danger-text">{{(allm.ym).toFixed(2)}}</span>金
                                </p>
                            </div>
                            <div v-if="headdata.status==1">
                                <el-row type="flex" align="middle" justify="center" :gutter="30" class="b-c-box">

                                    <!--<el-button type="primary" @click="nextfn(-1)">上一步</el-button>-->
                                    <el-button type="primary" @click="payissue">付款并发布任务</el-button>
                                </el-row>
                            </div>
                        </el-tab-pane>
                        <el-tab-pane label="进行中订单">

                            <el-table
                                    :data="loadOrder"
                                    border
                                    stripe
                                    style="width: 100%; margin-top: 20px">
                                <el-table-column
                                        label="接单时间"
                                        >
                                    <template slot-scope="scope">
                                        {{new Date(scope.row.accept_at*1000).toLocaleString()}}
                                    </template>
                                </el-table-column>
                                <el-table-column
                                        prop="id"
                                        label="订单ID"
                                >
                                </el-table-column>

                                <el-table-column
                                        prop="user_id"
                                        label="买手ID"
                                >
                                </el-table-column>
                                <el-table-column
                                        prop="wangwang_id"
                                        label="接单账号"
                                >
                                </el-table-column>

                                <el-table-column
                                        prop="cash_pledge"
                                        label="垫付押金"
                                >
                                </el-table-column>
                                <el-table-column
                                        prop="real_pay"
                                        label="返款金额"
                                >
                                </el-table-column>
                                <el-table-column

                                        label="订单状态"
                                >

                                    <template slot-scope="scope">
                                        {{scope.row.status|statusfn}}
                                    </template>
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

                                        label="完成时间"
                                >
                                    <template slot-scope="scope">
                                        {{new Date(scope.row.finish_at*1000).toLocaleString()}}
                                    </template>
                                </el-table-column>
                                <el-table-column
                                        prop="id"
                                        label="订单ID"
                                >
                                </el-table-column>

                                <el-table-column
                                        prop="user_id"
                                        label="买手ID"
                                >
                                </el-table-column>
                                <el-table-column
                                        prop="wangwang_id"
                                        label="接单账号"
                                >
                                </el-table-column>

                                <el-table-column
                                        prop="cash_pledge"
                                        label="垫付押金"
                                >
                                </el-table-column>
                                <el-table-column
                                        prop="real_pay"
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
                                        label="撤销时间"
                                >
                                    <template slot-scope="scope">
                                        {{new Date(scope.row.recall_at*1000).toLocaleString()}}
                                    </template>
                                </el-table-column>
                                <el-table-column
                                        prop="id"
                                        label="撤销单号"
                                >
                                </el-table-column>

                                <el-table-column
                                        prop="cash_pledge"
                                        label="垫付押金"
                                >
                                </el-table-column>
                                <el-table-column
                                        prop="note"
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
                                        fixed="right"
                                        label="操作"
                                        width="100">
                                    <template slot-scope="scope">
                                        <el-button type="text" size="small" @click="go_dr({id:scope.row.id})">撤销</el-button>
                                    </template>
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
    import ajax from 'axios';
    import end from '../components/end'
    export default {
        name: "detail",
        props:['id'],
        data(){
            return {
                judgeObj:{},

                allm:{
                    ym:0,
                    yn:0
                },

                //头部信息
                headdata:{},

                detaildata:{},

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
        filters:{
            statusfn:function(value){

                var del='--';
                switch (value){
                    case 1:del='未接单';break;
                    case 2:del='待操作';break;
                    case 3:del='待返款发货';break;
                    case 4:del='待评价';break;
                    case 5:del='待确认';break;
                    case 6:del='已完成';break;
                }
                return del;
            },
            statusfilter:function(value){

                var del='--';
                switch (value){
                    case 1:del='提交任务等待付款';break;
                    case 2:del='进行中';break;
                    case 3:del='任务全部完成';break;
                }
                return del;
            },

            sexs:function(value){
                var del='--';
                switch (value){
                    case 1:del='男';break;
                    case 2:del='女';break;
                }
                return del;
            },
            shoptype:function(value){
                var del='/';
                switch (value){
                    case 1:del='淘宝任务';break;
                    case 2:del='淘口令任务';break;
                    case 3:del='预售任务';break;
                    case 4:del='拼多多任务';break;
                    case 5:del='浏览任务';break;
                }
                return del;
            }
        },
        created(){
            //任务详情、详情头部、任务详情费用、进行中订单、已完成订单、已撤销订单、待接订单
            ajax.all([
                this.go_detail(this.id),
                this.go_head(this.id),
                this.go_fi(this.id),
                this.go_fu(this.id),
                this.go_ff(this.id),
                this.go_rt(this.id),
                this.go_fw(this.id)
            ])
        },
        methods:{

            go_dr(obj){

                this.$confirm('此撤销操作是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'error'
                }).then(() => {

                    this.$api.ports.doRecallTask(obj).then((res)=>{
                        console.log(res,'db');
                        if(res.code){
                            this.$message({
                                type: 'success',
                                message: '撤销成功!'
                            });

                        }else{
                            this.$notify.error(res.message);
                        }

                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消撤销'
                    });
                });
            },

            payissue(){
                var id=this.id;
                this.$confirm('再次确认是否付款？?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {

                    this.$api.ports.payTask({id}).then((res)=>{
                        if(res.code){

                            this.$notify.success('付款成功');
                            setTimeout(()=>{

                                this.$router.go(0);
                            },500)
                        }else{
                            this.$notify.error(res.message);
                        }
                    });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消付款'
                    });
                });
            },


            filterarr:function(val){

                if(typeof val=='object'){


                    var sar=[],duijiao=[],tarr=[];
                    val.forEach((v)=>{
                        duijiao.push(v.search_word);
                        if(sar.indexOf(v.search_word)<=-1){
                            sar.push(v.search_word)
                        }
                    });
                    console.log(duijiao,val)

                    duijiao.forEach((v,i)=>{
                        var dind=sar.indexOf(v);

                        if(dind>-1){
                            if(tarr[dind]){
                                tarr[dind].count++;
                            }else{
                                tarr[dind]={
                                    text:v,
                                    count:1
                                }
                            }

                        }
                    })

                    return tarr;
                }else{
                    return [];
                }
            },

            go_bs(){
                return this.$api.ports.taskIndex().then((res)=>{
                    if(res.code){
                        this.payTaskArr=res.data[0].list;
                    }else{
                        this.$notify.error(res.message);
                    }
                })
            },
            go_detail(id){
                return this.$api.ports.taskInfo({id}).then((res)=>{
                    console.log(res,'go_detail')
                    if(res.code){


                        var judgeObj={};

                        var fenarr=res.data[0].comment_info;

                        fenarr.forEach((v,i)=>{

                            if(judgeObj[v.type]){
                                judgeObj[v.type].push(v);
                            }else{
                                judgeObj[v.type]=[v]
                            }
                        })

                        this.detaildata=res.data[0];

                        this.judgeObj=judgeObj;


                        console.log(judgeObj,'judgeObj');
                    }else{
                        this.$notify.error(res.message);
                    }
                })
            },

            go_head(id){
                return this.$api.ports.taskInfoHead({id}).then((res)=>{
                    console.log(res,'提交人数');
                    if(res.code){
                        this.headdata=res.data[0];
                    }else{
                        this.$notify.error(res.message);
                    }
                })
            },

            go_fi(id){
                return this.$api.ports.feeInfo({id}).then((res)=>{
                    if(res.code){
                        console.log(res,'333');
                        this.tableData=res.data;
                        var ap=0,np=0;
                        res.data.forEach((v)=>{
                            //总单数
                            np+=Number(v.task_num)||0;

                            //总金额
                            ap+=((Number(v.every_cash_pledge)||0)+(Number(v.every_commission)||0)+(Number(v.thousand_fee)||0)+(Number(v.empty_parcel_fee)||0)+(Number(v.favorites_fee)||0)+(Number(v.add_fee)||0))*(Number(v.task_num)||1)

                            ap+=(Number(v.platform_fee)||0)+(Number(v.top_fee)||0)+(Number(v.comment_fee)||0);
                        });
                        this.allm.ym=ap;
                        this.allm.yn=np;
                    }else{
                        this.$notify.error(res.message);
                    }
                });
            },
            //进行中
            go_fu(id){
                return this.$api.ports.feeUnderway({id}).then((res)=>{
                    if(res.code){
                        console.log(res,'loadOrder');
                        this.loadOrder=res.data;

                    }else{
                        this.$notify.error(res.message);
                    }
                });
            },

            //已完成
            go_ff(id){
                return this.$api.ports.feeFinish({id}).then((res)=>{
                    if(res.code){
                        console.log(res,'doneOrder');
                        this.doneOrder=res.data;

                    }else{
                        this.$notify.error(res.message);
                    }
                });
            },

            //已撤销
            go_rt(id){
                return this.$api.ports.recallTask({id}).then((res)=>{
                    if(res.code){
                        console.log(res,'annulOrder');
                        this.annulOrder=res.data;

                    }else{
                        this.$notify.error(res.message);
                    }
                });
            },
            //待接订单
            go_fw(id){
                return this.$api.ports.feeWait({id}).then((res)=>{
                    if(res.code){
                        console.log(res,'waitOrder');
                        this.waitOrder=res.data;

                    }else{
                        this.$notify.error(res.message);
                    }
                });
            },
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
.v-w1{
    width:100%;
}

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
        margin:.5rem;
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