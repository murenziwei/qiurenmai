<template>
    <div>

        <el-card>

            <el-tabs v-model="activeName">
                <el-tab-pane label="垫付任务管理" name="first">
                    <!--<el-form :inline="true" :model="formInline" class="demo-form-inline">-->
                        <!--<el-form-item label="任务ID">-->
                            <!--<el-input v-model="formInline.id"></el-input>-->
                        <!--</el-form-item>-->
                        <!--<el-form-item label="店铺">-->
                            <!--<el-select v-model="formInline.region">-->
                                <!--<el-option v-for="(item,index) in shops" :key="index" :label="item.name" :value="item.name"></el-option>-->

                            <!--</el-select>-->
                        <!--</el-form-item>-->
                        <!--<el-form-item label="类型">-->
                            <!--<el-select v-model="formInline.type">-->
                                <!--<el-option v-for="(item,index) in tasks" :key="index" :label="item.name" :value="index"></el-option>-->

                            <!--</el-select>-->
                        <!--</el-form-item>-->
                        <!--<el-form-item label="状态">-->
                            <!--<el-select v-model="formInline.status">-->
                                <!--<el-option v-for="(item,index) in status" :key="index" :label="item.name" :value="index"></el-option>-->

                            <!--</el-select>-->
                        <!--</el-form-item>-->
                        <!--<el-form-item label="发布时间">-->
                            <!--<el-date-picker-->
                                    <!--v-model="formInline.issuetime"-->
                                    <!--type="daterange"-->
                                    <!--range-separator="至"-->
                                    <!--start-placeholder="开始日期"-->
                                    <!--end-placeholder="结束日期">-->
                            <!--</el-date-picker>-->
                        <!--</el-form-item>-->
                        <!--<el-form-item>-->
                            <!--<el-button type="primary" >查询</el-button>-->
                        <!--</el-form-item>-->
                    <!--</el-form>-->
                    <el-divider></el-divider>
                    <div>
                        <div class="an-item" v-for="(item,index) in payTaskArr.data" :key="index">
                            <el-row class="t-i-header" type="flex" align="middle" justify="space-between">

                                <div class="tih-type">{{item.shop_name}}</div>
                                <div>
                                    <el-breadcrumb separator-class="el-icon-arrow-right">
                                        <el-breadcrumb-item>{{item.platform_type|shops}}</el-breadcrumb-item>
                                        <el-breadcrumb-item>总单数：{{item.task_num}}</el-breadcrumb-item>
                                        <el-breadcrumb-item>任务编号：{{item.id}}</el-breadcrumb-item>
                                        <el-breadcrumb-item><el-link :type="(item.is_top?'success':'info')" :underline="false">{{(item.is_top?'已置顶':'未置顶')}}</el-link></el-breadcrumb-item>
                                        <el-breadcrumb-item>
                                            <el-link :href="'#/about?tagcount=-1&id='+item.id" target="_blank">[查看详情]</el-link>
                                            <!--<el-link  @click="revokefn(item.id)">[撤销]</el-link>-->
                                        </el-breadcrumb-item>
                                        <el-breadcrumb-item>
                                            <el-link :type="(item.is_finish?'success':'error')" :underline="false">{{(item.is_finish?'已完成':'未完成')}}</el-link>
                                        </el-breadcrumb-item>

                                    </el-breadcrumb>
                                </div>
                            </el-row>
                            <el-row class="t-i-bottom" type="flex" align="middle" :gutter="20">
                                <el-col class="tib-first tib-item" :span="9">
                                    <el-row type="flex" align="middle">
                                        <div>
                                            <el-image :src="item.goods_img" class="tf-img"></el-image>
                                        </div>


                                        <el-col>
                                            <el-row class="tf-r-flex">
                                                <el-col class="trf-text">
                                                    {{item.goods_name}}
                                                </el-col>
                                                <el-col class="tf-b">
                                                    <div class="tf-b-r">
                                                        未接单：{{item.goods_status1||0}}
                                                    </div>
                                                    <div class="tf-b-l">
                                                        {{item.create_at}}
                                                    </div>

                                                </el-col>
                                            </el-row>
                                        </el-col>
                                    </el-row>
                                </el-col>
                                <!--<el-col class="tib-first tib-item" :span="3">-->
                                    <!--<el-link type="info">待操作:{{item.status2||0}}</el-link>-->
                                <!--</el-col>-->

                                <el-col class="tib-first tib-item" :span="4">
                                    <el-link type="danger" @click="tabName('second')">待返款发货:{{item.status3||0}}</el-link>
                                </el-col>

                                <el-col class="tib-first tib-item" :span="4">
                                    <el-link type="info" @click="tabName('third')">待评价:{{item.status4||0}}</el-link>
                                </el-col>
                                <el-col class="tib-first tib-item" :span="4">
                                    <el-link type="info" @click="tabName('fourth')">待确认:{{item.status5||0}}</el-link>
                                </el-col>

                                <el-col class="tib-first tib-item" :span="4">
                                    <el-link type="info" @click="tabName('fifth')">已完成：{{item.status6||0}}</el-link>
                                </el-col>
                            </el-row>
                            <el-divider></el-divider>
                        </div>
                        <p v-if="!(payTaskArr.data?payTaskArr.data.length:false)" style="text-align:center">
                            <el-link :underline="false" >没有更多数据了</el-link>
                        </p>
                    </div>
                    <div class="mt-cen" style="text-align:center;">
                        <el-pagination
                                :current-page.sync="payTaskArr.current_page"
                                @current-change="bschange"
                                background
                                layout="prev, pager, next"
                                :total="payTaskArr.last_page*10">
                        </el-pagination>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="垫付任务返款管理" name="second">
                        <!--<el-form :inline="true" :model="formOutline" class="demo-form-inline">-->

                            <!--<el-form-item label="店铺">-->
                                <!--<el-select v-model="formOutline.region">-->
                                    <!--<el-option v-for="(item,index) in shops" :key="index" :label="item.name" :value="item.name"></el-option>-->

                                <!--</el-select>-->
                            <!--</el-form-item>-->
                            <!--<el-form-item label="买手ID">-->
                                <!--<el-input v-model="formOutline.id"></el-input>-->
                            <!--</el-form-item>-->
                            <!--<el-form-item label="任务ID">-->
                                <!--<el-input v-model="formOutline.taskid"></el-input>-->
                            <!--</el-form-item>-->
                            <!--<el-form-item label="订单ID">-->
                                <!--<el-input v-model="formOutline.orderid"></el-input>-->
                            <!--</el-form-item>-->
                            <!--<el-form-item label="旺旺号">-->
                                <!--<el-input v-model="formOutline.ww"></el-input>-->
                            <!--</el-form-item>-->

                            <!--<el-form-item label="旺旺ID">-->
                                <!--<el-input v-model="formOutline.wwid"></el-input>-->
                            <!--</el-form-item>-->
                            <!--<el-form-item>-->
                                <!--<el-button type="primary" @click="onSubmit">查询</el-button>-->
                            <!--</el-form-item>-->
                        <!--</el-form>-->

                        <el-alert
                                class="an-item"
                                title="消息提示"
                                type="info"
                                description="平台返款任务确认后垫资直接到达用户的本金账户，商家核对订单后及时确认订单；手动返款确认后需商家往用户的平台账户返款，返款时前请仔细核对用户的任务信息和返款金额，因为手动返款造成的失误平台只能尽力协助，造成的后果由商家自己承担。"
                                show-icon>
                        </el-alert>
                        <el-table
                                :data="outData.data"
                                border
                                style="width: 100%">
                            <el-table-column

                                    width="200"
                                    prop="shop_wang_id"
                                    label="商家店铺ID"
                                    >
                            </el-table-column>
                            <el-table-column
                                    width="200"
                                    prop="id"
                                    label="子任务ID"
                                    >
                            </el-table-column>
                            <el-table-column
                                    width="200"
                                    label="付款时间"
                                    >
                                <template slot-scope="scope">

                                    {{new Date(scope.row.accept_at*1000).toLocaleString()}}
                                </template>
                            </el-table-column>
                            <el-table-column

                                    width="200"
                                    label="截图一"
                                    >
                                <template slot-scope="scope">
                                    <el-image :src="scope.row.search_img" class="tf-img"></el-image>
                                </template>
                            </el-table-column>
                            <el-table-column

                                    width="200"
                                    label="截图二"
                            >
                                <template slot-scope="scope">
                                    <el-image :src="scope.row.order_img" class="tf-img"></el-image>
                                </template>
                            </el-table-column>
                            <el-table-column
                                    width="200"
                                    prop="cash_pledge"
                                    label="商家押金"
                            >
                            </el-table-column>
                            <el-table-column
                                    width="200"
                                    prop="real_pay"
                                    label="用户付款"
                            >
                            </el-table-column>
                            <el-table-column
                                    width="200"
                                    prop="qq_no"
                                    label="QQ"
                            >
                            </el-table-column>
                            <el-table-column
                                    width="200"
                                    prop="ue_account"
                                    label="手机号"
                            >
                            </el-table-column>
                            <el-table-column
                                    width="200"
                                    prop="task_type"
                                    label="任务类型"
                            >
                                <template slot-scope="scope">
                                    {{scope.row.task_type|shoptype}}
                                </template>
                            </el-table-column>
                            <el-table-column
                                    width="200"
                                    prop="wangwang_id"
                                    label="淘宝账号"
                            >
                            </el-table-column>
                            <el-table-column
                                    width="200"
                                    prop="user_id"
                                    label="用户ID"
                            >
                            </el-table-column>
                            <el-table-column
                                    width="200"
                                    prop="order_id"
                                    label="订单ID"
                            >
                            </el-table-column>
                            <el-table-column
                                    width="200"
                                    prop="tao_order_no"
                                    label="买手提交单号"
                            >
                            </el-table-column>

                            <el-table-column
                                    fixed="right"
                                    label="操作"
                                    width="100">
                                <template slot-scope="scope">
                                    <el-button type="text" size="small" @click="confirm_pay({id:scope.row.id})">返款管理</el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                        <div class="mt-cen" style="text-align:center;">
                            <el-pagination
                                    :current-page.sync="outData.current_page"
                                    @current-change="bschange"
                                    background
                                    layout="prev, pager, next"
                                    :total="outData.last_page*10">
                            </el-pagination>
                        </div>
                </el-tab-pane>
                <el-tab-pane label="快递单号管理" name="third">
                    <!--<el-form :inline="true" :model="expressform" class="demo-form-inline">-->

                        <!--<el-form-item label="店铺">-->
                            <!--<el-select v-model="expressform.region">-->
                                <!--<el-option v-for="(item,index) in shops" :key="index" :label="item.name" :value="item.name"></el-option>-->

                            <!--</el-select>-->
                        <!--</el-form-item>-->
                        <!--<el-form-item label="订单状态">-->
                            <!--<el-select v-model="expressform.status">-->
                                <!--<el-option v-for="(item,index) in orderstatus" :key="index" :label="item.name" :value="item.name"></el-option>-->

                            <!--</el-select>-->
                        <!--</el-form-item>-->

                        <!--<el-form-item label="接单时间">-->
                            <!--<el-date-picker-->
                                    <!--v-model="expressform.issuetime"-->
                                    <!--type="daterange"-->
                                    <!--range-separator="至"-->
                                    <!--start-placeholder="开始日期"-->
                                    <!--end-placeholder="结束日期">-->
                            <!--</el-date-picker>-->
                        <!--</el-form-item>-->
                        <!--<el-form-item label="任务ID">-->
                            <!--<el-input v-model="expressform.taskid"></el-input>-->
                        <!--</el-form-item>-->
                        <!--<el-form-item label="订单ID">-->
                            <!--<el-input v-model="expressform.orderid"></el-input>-->
                        <!--</el-form-item>-->
                        <!--<el-form-item label="第三方订单ID">-->
                            <!--<el-input v-model="expressform.wwid" placeholder="淘宝/拼多多等ID"></el-input>-->
                        <!--</el-form-item>-->
                        <!--<el-form-item>-->
                            <!--<el-button type="primary" @click="onSubmit">查询</el-button>-->
                        <!--</el-form-item>-->
                    <!--</el-form>-->


                    <el-table
                            :data="postNI.data"
                            border
                            style="width: 100%">
                        <el-table-column

                                width="200"
                                prop="son_task_id"
                                label="子任务ID"
                        >
                        </el-table-column>
                        <el-table-column

                                width="200"
                                prop="tao_order_no"
                                label="淘宝订单号"
                        >
                        </el-table-column>

                        <el-table-column
                                width="200"
                                prop="shop_name"
                                label="发件人/店铺"
                        >
                        </el-table-column>
                        <el-table-column
                                width="200"
                                prop="post_phone"
                                label="发货电话"
                        >
                        </el-table-column>
                        <el-table-column
                                width="200"
                                prop="post_street"
                                label="发货街道"
                        >
                        </el-table-column>
                        <el-table-column
                                width="200"
                                prop="ue_name"
                                label="收货人"
                        >
                        </el-table-column>
                        <el-table-column
                                width="200"
                                prop="ue_phone"
                                label="收货电话"
                        >
                        </el-table-column>

                        <el-table-column
                                width="200"
                                prop="ue_addr"
                                label="收货地址"
                        >
                        </el-table-column>
                        <el-table-column
                                width="200"
                                prop="ue_street"
                                label="收货街道"
                        >
                        </el-table-column>
                        <el-table-column
                                width="200"
                                prop="task_type"
                                label="任务类型"
                        >
                            <template slot-scope="scope">
                                {{scope.row.task_type|shoptype}}
                            </template>
                        </el-table-column>
                        <el-table-column
                                width="200"
                                prop="buy_id"
                                label="买手ID"
                        >
                        </el-table-column>
                        <el-table-column
                                fixed="right"
                                label="操作"
                                width="200">
                            <template slot-scope="scope">
                                <template v-if="!scope.row.post_no">

                                    <el-button @click="cdv('aform',scope.row.id)" type="primary" size="small">填写快递单号</el-button>
                                </template>
                                <template v-else>
                                    <p>
                                        快递号：{{scope.row.post_no||'**'}}
                                    </p>
                                    <el-button type="success" size="small" @click="sendId(scope.row.son_task_id,scope.row.post_no)">发货</el-button>

                                    <el-button @click="cdv('aform',scope.row.id)" type="primary" size="small">修改快递单号</el-button>
                                </template>
                            </template>
                        </el-table-column>
                    </el-table>
                    <el-alert
                            class="an-item"
                            type="error"
                            description="获取单号前务必核对下单号，收发货信息与下单地址是否一致（如需导出，请在任务订单管理处批量导出信息）"
                            >
                    </el-alert>
                    <div class="mt-cen" style="text-align:center;">
                        <el-pagination
                                :current-page.sync="postNI.current_page"
                                @current-change="bschange"
                                background
                                layout="prev, pager, next"
                                :total="postNI.last_page*10">
                        </el-pagination>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="垫付进行中订单" name="fourth">

                    <!--<el-form :inline="true" :model="payplay" class="demo-form-inline">-->

                        <!--<el-form-item label="店铺">-->
                            <!--<el-select v-model="payplay.region">-->
                                <!--<el-option v-for="(item,index) in shops" :key="index" :label="item.name" :value="item.name"></el-option>-->

                            <!--</el-select>-->
                        <!--</el-form-item>-->
                        <!--<el-form-item label="类型">-->
                            <!--<el-select v-model="payplay.type">-->
                                <!--<el-option v-for="(item,index) in tasks" :key="index" :label="item.name" :value="index"></el-option>-->

                            <!--</el-select>-->
                        <!--</el-form-item>-->

                        <!--<el-form-item label="状态">-->
                            <!--<el-select v-model="payplay.status">-->
                                <!--<el-option v-for="(item,index) in paystatus" :key="index" :label="item.name" :value="index"></el-option>-->

                            <!--</el-select>-->
                        <!--</el-form-item>-->

                        <!--<el-form-item label="接单时间">-->
                            <!--<el-date-picker-->
                                    <!--v-model="payplay.issuetime"-->
                                    <!--type="daterange"-->
                                    <!--range-separator="至"-->
                                    <!--start-placeholder="开始日期"-->
                                    <!--end-placeholder="结束日期">-->
                            <!--</el-date-picker>-->
                        <!--</el-form-item>-->
                        <!--<el-form-item label="买手ID">-->
                            <!--<el-input v-model="payplay.id"></el-input>-->
                        <!--</el-form-item>-->
                        <!--<el-form-item label="任务ID">-->
                            <!--<el-input v-model="payplay.taskid"></el-input>-->
                        <!--</el-form-item>-->
                        <!--<el-form-item label="订单ID">-->
                            <!--<el-input v-model="payplay.orderid"></el-input>-->
                        <!--</el-form-item>-->
                        <!--<el-form-item label="旺旺号">-->
                            <!--<el-input v-model="payplay.ww"></el-input>-->
                        <!--</el-form-item>-->

                        <!--<el-form-item label="淘宝订单ID">-->
                            <!--<el-input v-model="payplay.tbid"></el-input>-->
                        <!--</el-form-item>-->
                        <!--<el-form-item>-->
                            <!--<el-button type="primary" @click="onSubmit">查询</el-button>-->
                            <!--<el-button type="primary" @click="onSubmit">导出订单</el-button>-->
                        <!--</el-form-item>-->
                    <!--</el-form>-->

                    <el-table
                            :data="payplayData.data"
                            border
                            style="width: 100%">
                        <el-table-column

                                width="200"
                                prop="ordertime"
                                label="接单时间"
                        >
                            <template slot-scope="scope">
                                {{new Date(scope.row.accept_at*1000).toLocaleString()}}
                            </template>
                        </el-table-column>
                        <el-table-column

                                width="200"
                                label="订单id"
                        >
                            <template slot-scope="scope">
                                <el-link :href="'#/about?tagcount=-2&id='+scope.row.id" type="primary" target="_blank">{{scope.row.id}}</el-link>
                            </template>
                        </el-table-column>
                        <el-table-column

                                width="200"
                                prop="task_id"
                                label="任务id"
                        >
                        </el-table-column>
                        <el-table-column

                                width="200"
                                prop="user_id"
                                label="买手id"
                        >
                        </el-table-column>
                        <el-table-column

                                width="200"
                                prop="wangwang_id"
                                label="接单账号"
                        >
                        </el-table-column>
                        <el-table-column

                                width="200"
                                label="订单状态"
                        >
                            <template slot-scope="scope">
                                {{scope.row.status|statusfn}}
                            </template>
                        </el-table-column>
                        <el-table-column

                                width="200"
                                label="任务类型"
                        >
                            <template slot-scope="scope">
                                {{scope.row.task_type|shoptype}}
                            </template>
                        </el-table-column>
                        <el-table-column

                                width="200"
                                prop="goods_name"
                                label="商品名称"
                        >
                        </el-table-column>
                        <el-table-column
                                width="200"
                                label="商品链接"
                        >
                            <template slot-scope="scope">
                                <el-link :href="scope.row.goods_link">{{scope.row.goods_link}}</el-link>
                            </template>
                        </el-table-column>

                        <el-table-column
                                fixed="right"
                                label="操作"
                                width="200">
                            <template slot-scope="scope">

                                <el-button @click="handleClick(scope.row.id)" type="text" size="small" v-if="scope.row.status==5">确认完成</el-button>
                                <el-link type="info" :underline="false" v-else>待买家确认评论</el-link>
                            </template>
                        </el-table-column>
                    </el-table>
                    <div class="mt-cen" style="text-align:center;">

                        <el-pagination
                                :current-page.sync="payplayData.current_page"
                                @current-change="bschange"
                                background
                                layout="prev, pager, next"
                                :total="payplayData.last_page*10">
                        </el-pagination>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="垫付历史订单" name="fifth">

                    <!--<el-form :inline="true" :model="payhistory" class="demo-form-inline">-->

                        <!--<el-form-item label="店铺">-->
                            <!--<el-select v-model="payhistory.region">-->
                                <!--<el-option v-for="(item,index) in shops" :key="index" :label="item.name" :value="item.name"></el-option>-->

                            <!--</el-select>-->
                        <!--</el-form-item>-->
                        <!--<el-form-item label="类型">-->
                            <!--<el-select v-model="payhistory.type">-->
                                <!--<el-option v-for="(item,index) in tasks" :key="index" :label="item.name" :value="index"></el-option>-->

                            <!--</el-select>-->
                        <!--</el-form-item>-->

                        <!--<el-form-item label="状态">-->
                            <!--<el-select v-model="payhistory.status">-->
                                <!--<el-option v-for="(item,index) in paystatus" :key="index" :label="item.name" :value="index"></el-option>-->

                            <!--</el-select>-->
                        <!--</el-form-item>-->

                        <!--<el-form-item>-->

                            <!--<el-select v-model="payhistory.seltime">-->
                                <!--<el-option label="接单时间" value="1"></el-option>-->
                                <!--<el-option label="完成时间" value="2"></el-option>-->
                            <!--</el-select>-->
                            <!--<span>:</span>-->
                            <!--<el-date-picker-->
                                    <!--v-model="payhistory.issuetime"-->
                                    <!--type="daterange"-->
                                    <!--range-separator="至"-->
                                    <!--start-placeholder="开始日期"-->
                                    <!--end-placeholder="结束日期">-->
                            <!--</el-date-picker>-->
                        <!--</el-form-item>-->
                        <!--<el-form-item label="买手ID">-->
                            <!--<el-input v-model="payhistory.id"></el-input>-->
                        <!--</el-form-item>-->
                        <!--<el-form-item label="任务ID">-->
                            <!--<el-input v-model="payhistory.taskid"></el-input>-->
                        <!--</el-form-item>-->
                        <!--<el-form-item label="订单ID">-->
                            <!--<el-input v-model="payhistory.orderid"></el-input>-->
                        <!--</el-form-item>-->
                        <!--<el-form-item label="旺旺号">-->
                            <!--<el-input v-model="payhistory.ww"></el-input>-->
                        <!--</el-form-item>-->

                        <!--<el-form-item label="淘宝订单ID">-->
                            <!--<el-input v-model="payhistory.tbid"></el-input>-->
                        <!--</el-form-item>-->
                        <!--<el-form-item>-->
                            <!--<el-button type="primary" @click="onSubmit">查询</el-button>-->
                            <!--<el-button type="primary" @click="onSubmit">导出订单</el-button>-->
                        <!--</el-form-item>-->
                    <!--</el-form>-->

                    <el-table
                            :data="payhistoryData.data"
                            border
                            style="width: 100%">
                        <el-table-column

                                width="200"
                                prop="ordertime"
                                label="接单时间"
                        >
                            <template slot-scope="scope">
                                {{new Date(scope.row.accept_at*1000).toLocaleString()}}
                            </template>
                        </el-table-column>
                        <el-table-column

                                width="200"
                                label="订单id"
                        >
                            <template slot-scope="scope">
                                <el-link :href="'#/about?tagcount=-2&id='+scope.row.id" type="primary" target="_blank">{{scope.row.id}}</el-link>
                            </template>
                        </el-table-column>
                        <el-table-column

                                width="200"
                                prop="task_id"
                                label="任务id"
                        >
                        </el-table-column>
                        <el-table-column

                                width="200"
                                prop="user_id"
                                label="买手id"
                        >
                        </el-table-column>
                        <el-table-column

                                width="200"
                                prop="wangwang_id"
                                label="接单账号"
                        >
                        </el-table-column>
                        <el-table-column

                                width="200"

                                label="订单状态"
                        >

                            <template slot-scope="scope">
                                {{scope.row.status|statusfn}}
                            </template>
                        </el-table-column>
                        <el-table-column

                                width="200"
                                label="任务类型"
                        >
                            <template slot-scope="scope">
                                {{scope.row.task_type|shoptype}}
                            </template>
                        </el-table-column>
                        <el-table-column

                                width="200"
                                prop="goods_name"
                                label="商品名称"
                        >
                        </el-table-column>
                        <el-table-column

                                width="200"
                                label="商品链接"
                        >
                            <template slot-scope="scope">
                                <el-link :href="scope.row.goods_link">{{scope.row.goods_link}}</el-link>
                            </template>
                        </el-table-column>
                    </el-table>
                    <div class="mt-cen" style="text-align:center;">
                        <el-pagination
                                :current-page.sync="payhistoryData.current_page"
                                @current-change="bschange"
                                background
                                layout="prev, pager, next"
                                :total="payhistoryData.last_page*10">
                        </el-pagination>
                    </div>
                </el-tab-pane>
            </el-tabs>
        </el-card>

        <el-dialog :visible.sync="centerDialogVisible"
                   modal
                   close-on-click-modal
                   custom-class="dialog">
            <div>
                <el-form :model="aform" ref="aform" :rules="arules">
                    <el-form-item label="填写快递单号" prop="note">
                        <el-input
                                type="note"
                                placeholder="请输入快递单号"
                                v-model="aform.note">
                        </el-input>
                    </el-form-item>
                    <el-divider></el-divider>
                    <el-row style="text-align:right;">
                        <el-button type="success" icon="el-icon-circle-check" @click="onSubmitOne('aform')">确认提交</el-button>
                    </el-row>
                </el-form>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import ajax from 'axios';
    export default {
        name: "paytask",
        data(){
            return {
                kuaidi:-1,

                centerDialogVisible:false,

                aform:{
                    note:''
                },
                arules:{
                    note:[
                        {required:true,message:'快递单号不能为空！',trigger:'blur'}
                    ]
                },

                postNI:{},


                payTaskArr:{},

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
                    payless:''
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
        created(){

            ajax.all([this.tabChange()]);
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
            },
            shops:function(value){
                var del='/';
                switch (value){
                    case 1:del='淘宝';break;
                    case 3:del='拼多多';break;
                }
                return del;
            }
        },
        methods:{
            cdv(f,id){

                this.resetForm(f);
                this.kuaidi=id;
                this.centerDialogVisible=true;

            },
            //重置表单
            resetForm(formName) {
                setTimeout(()=>{if(this.$refs[formName]){this.$refs[formName].resetFields();}},200);

            },
            handleClick(id){

                this.$confirm('再次确认是否完成？?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {

                    this.$api.ports.confFinish({id}).then((res)=>{
                        if(res.code){

                            this.$notify.success('确认成功')
                            //this.go_ut_load();
                            this.activeName='fifth';


                        }else{
                            this.$notify.error(res.message);
                        }
                    });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消确认'
                    });
                });
            },

            tabChange(){
                var an=this.activeName;
                console.log('是否有变化',this.activeName);
                switch(an){
                    case 'first':this.go_bs(this.payTaskArr.current_page||1);break;
                    case 'second':this.go_rti(this.outData.current_page||1);break;
                    case 'third':this.go_pni(this.postNI.current_page||1);break;
                    case 'fourth':this.go_ut_load(this.payplayData.current_page||1);break;
                    case 'fifth':this.go_ut_done(this.payhistoryData.current_page||1);break;

                }
            },
            //垫付任务的分页
            bschange(ee){
                var an=this.activeName;
                console.log('是否有变化',this.activeName);
                switch(an){
                    case 'first':this.go_bs(ee);break;
                    case 'second':this.go_rb(ee);break;
                    case 'third':this.go_pni(ee);break;
                    case 'fourth':this.go_ut_load(ee);break;
                    case 'fifth':this.go_ut_done(ee);break;
                }
            },

            revokefn(id){
                console.log(id,'id');
                this.$confirm('此操作将撤销该文件, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then((rs) => {
                    console.log(rs);
                    this.go_dr({id});
                }).catch((ee) => {
                    console.log(ee);
                    this.$message({
                        type: 'error',
                        message: '撤销失败'
                    });
                });
            },

            go_dr(obj){
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
            },

            //垫付任务管理
            go_bs(page){
                return this.$api.ports.taskIndex(page).then((res)=>{
                    if(res.code){
                        console.log(res,'res');
                        this.payTaskArr=res.data[0];
                    }else{
                        this.$notify.error(res.message);
                    }
                })
            },

            tabName(active){
                this.activeName=active;
            },

            //垫付任务返款管理
            go_rti(page){
                return this.$api.ports.refTaskInfo(page).then((res)=>{
                    if(res.code){
                        console.log(res,'outData');
                        this.outData=res.data[0];
                    }else{
                        this.$notify.error(res.message);
                    }
                })
            },
            confirm_pay(obj){

                this.$confirm('此返款确认操作是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'error'
                }).then(() => {

                    this.$api.ports.confRefund(obj).then((res)=>{
                        console.log(res,'db');
                        this.go_rti();
                        if(res.code){
                            this.activeName='third';
                            this.$message({
                                type: 'success',
                                message: '确认成功!'
                            });

                        }else{
                            this.$notify.error(res.message);
                        }

                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消确认'
                    });
                });
            },

            //快递单号管理
            go_pni(page){
                return this.$api.ports.postNoInfo(page).then((res)=>{
                    if(res.code){
                        console.log(res,'postNI');
                        this.postNI=res.data[0];
                    }else{
                        this.$notify.error(res.message);
                    }
                })
            },

            //垫付进行中
            go_ut_load(page){

                return this.$api.ports.underwayTask({page,type:1}).then((res)=>{
                    if(res.code){
                        console.log(res,'payplayData');
                        this.payplayData=res.data[0];
                    }else{
                        this.$notify.error(res.message);
                    }
                })
            },


            //垫付历史
            go_ut_done(page){

                return this.$api.ports.underwayTask({page,type:2}).then((res)=>{
                    if(res.code){
                        console.log(res,'payhistoryData');
                        this.payhistoryData=res.data[0];
                    }else{
                        this.$notify.error(res.message);
                    }
                })
            },
            sendId(id,post_no){

                this.$confirm('再次确认是否发货？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$api.ports.confPost({id,post_no}).then((res)=>{
                        if(res.code){

                            this.$notify.success('发货成功！');
                            //this.tabChange();
                            this.activeName='fourth';
                            console.log(res,'发');
                        }else{
                            this.$notify.error(res.message);
                        }
                    });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消确认'
                    });
                });
            },
            go_apn(obj){
                return this.$api.ports.addPostNo(obj).then((res)=>{
                    if(res.code){
                        this.centerDialogVisible=false;
                        this.tabChange();
                        console.log(res,'addPostNo');
                    }else{
                        this.$notify.error(res.message);
                    }
                });
            },
            onSubmitOne(formName){
                console.log(this.aform,'aform');
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        var obj={
                            id:this.kuaidi||'-1',
                            post_no:this.aform.note||'**'
                        }
                        this.go_apn(obj);
                    } else {
                        return false;
                    }
                });
            }

        },
        //监听属性
        watch:{
            "activeName":function(){
                this.tabChange();
            }
        }
    }
</script>

<style lang="less" scoped>
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