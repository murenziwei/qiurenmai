<template>
    <div>

        <el-card>

            <el-tabs v-model="activeName">
                <el-tab-pane label="垫付任务管理" name="first">
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
                                            <el-link href="#/about?tagcount=-1" target="_blank">[查看详情]</el-link>
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
                <el-tab-pane label="垫付任务返款管理" name="second">
                        <el-form :inline="true" :model="formOutline" class="demo-form-inline">

                            <el-form-item label="店铺">
                                <el-select v-model="formOutline.region">
                                    <el-option v-for="(item,index) in shops" :key="index" :label="item.name" :value="item.name"></el-option>

                                </el-select>
                            </el-form-item>
                            <el-form-item label="买手ID">
                                <el-input v-model="formOutline.id"></el-input>
                            </el-form-item>
                            <el-form-item label="任务ID">
                                <el-input v-model="formOutline.taskid"></el-input>
                            </el-form-item>
                            <el-form-item label="订单ID">
                                <el-input v-model="formOutline.orderid"></el-input>
                            </el-form-item>
                            <el-form-item label="旺旺号">
                                <el-input v-model="formOutline.ww"></el-input>
                            </el-form-item>

                            <el-form-item label="旺旺ID">
                                <el-input v-model="formOutline.wwid"></el-input>
                            </el-form-item>
                            <el-form-item>
                                <el-button type="primary" @click="onSubmit">查询</el-button>
                            </el-form-item>
                        </el-form>

                        <el-alert
                                class="an-item"
                                title="消息提示"
                                type="info"
                                description="平台返款任务确认后垫资直接到达用户的本金账户，商家核对订单后及时确认订单；手动返款确认后需商家往用户的平台账户返款，返款时前请仔细核对用户的任务信息和返款金额，因为手动返款造成的失误平台只能尽力协助，造成的后果由商家自己承担。"
                                show-icon>
                        </el-alert>
                        <el-table
                                :data="outData"
                                border
                                style="width: 100%">
                            <el-table-column
                                    fixed
                                    prop="orderinfo"
                                    label="订单信息"
                                    >
                            </el-table-column>
                            <el-table-column
                                    prop="userinfo"
                                    label="用户信息"
                                    >
                            </el-table-column>
                            <el-table-column
                                    label="付款时间与截图"
                                    >
                                <template slot-scope="scope">
                                    <p>付款时间</p>
                                    <p>截图</p>
                                </template>
                            </el-table-column>
                            <el-table-column
                                    prop="payless"
                                    label="返款信息"
                                    >
                            </el-table-column>
                            <el-table-column
                                    fixed="right"
                                    label="操作"
                                    width="100">
                                <template slot-scope="scope">
                                    <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
                                    <el-button type="text" size="small">编辑</el-button>
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
                <el-tab-pane label="快递单号管理" name="third">
                    <el-form :inline="true" :model="expressform" class="demo-form-inline">

                        <el-form-item label="店铺">
                            <el-select v-model="expressform.region">
                                <el-option v-for="(item,index) in shops" :key="index" :label="item.name" :value="item.name"></el-option>

                            </el-select>
                        </el-form-item>
                        <el-form-item label="订单状态">
                            <el-select v-model="expressform.status">
                                <el-option v-for="(item,index) in orderstatus" :key="index" :label="item.name" :value="item.name"></el-option>

                            </el-select>
                        </el-form-item>

                        <el-form-item label="接单时间">
                            <el-date-picker
                                    v-model="expressform.issuetime"
                                    type="daterange"
                                    range-separator="至"
                                    start-placeholder="开始日期"
                                    end-placeholder="结束日期">
                            </el-date-picker>
                        </el-form-item>
                        <el-form-item label="任务ID">
                            <el-input v-model="expressform.taskid"></el-input>
                        </el-form-item>
                        <el-form-item label="订单ID">
                            <el-input v-model="expressform.orderid"></el-input>
                        </el-form-item>
                        <el-form-item label="第三方订单ID">
                            <el-input v-model="expressform.wwid" placeholder="淘宝/拼多多等ID"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="onSubmit">查询</el-button>
                        </el-form-item>
                    </el-form>

                    <el-alert
                            class="an-item"
                            type="error"
                            description="获取单号前务必核对下单号，收发货信息与下单地址是否一致（如需导出，请在任务订单管理处批量导出信息）"
                            >
                    </el-alert>
                    <div class="mt-cen" style="text-align:center;">
                        <el-pagination
                                background
                                layout="prev, pager, next"
                                :total="100">
                        </el-pagination>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="垫付进行中订单" name="fourth">

                    <el-form :inline="true" :model="payplay" class="demo-form-inline">

                        <el-form-item label="店铺">
                            <el-select v-model="payplay.region">
                                <el-option v-for="(item,index) in shops" :key="index" :label="item.name" :value="item.name"></el-option>

                            </el-select>
                        </el-form-item>
                        <el-form-item label="类型">
                            <el-select v-model="payplay.type">
                                <el-option v-for="(item,index) in tasks" :key="index" :label="item.name" :value="index"></el-option>

                            </el-select>
                        </el-form-item>

                        <el-form-item label="状态">
                            <el-select v-model="payplay.status">
                                <el-option v-for="(item,index) in paystatus" :key="index" :label="item.name" :value="index"></el-option>

                            </el-select>
                        </el-form-item>

                        <el-form-item label="接单时间">
                            <el-date-picker
                                    v-model="payplay.issuetime"
                                    type="daterange"
                                    range-separator="至"
                                    start-placeholder="开始日期"
                                    end-placeholder="结束日期">
                            </el-date-picker>
                        </el-form-item>
                        <el-form-item label="买手ID">
                            <el-input v-model="payplay.id"></el-input>
                        </el-form-item>
                        <el-form-item label="任务ID">
                            <el-input v-model="payplay.taskid"></el-input>
                        </el-form-item>
                        <el-form-item label="订单ID">
                            <el-input v-model="payplay.orderid"></el-input>
                        </el-form-item>
                        <el-form-item label="旺旺号">
                            <el-input v-model="payplay.ww"></el-input>
                        </el-form-item>

                        <el-form-item label="淘宝订单ID">
                            <el-input v-model="payplay.tbid"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="onSubmit">查询</el-button>
                            <el-button type="primary" @click="onSubmit">导出订单</el-button>
                        </el-form-item>
                    </el-form>

                    <el-table
                            :data="payplayData"
                            border
                            style="width: 100%">
                        <el-table-column
                                fixed
                                prop="ordertime"
                                label="接单时间"
                        >
                        </el-table-column>
                        <el-table-column
                                prop="orderiid"
                                label="订单id"
                        >
                            <template slot-scope="scope">
                                <el-link href="#/about?tagcount=-2" type="primary" target="_blank">{{scope.row.orderid}}</el-link>
                            </template>
                        </el-table-column>
                        <el-table-column

                                prop="taskid"
                                label="任务id"
                        >
                        </el-table-column>
                        <el-table-column
                                prop="id"
                                label="买手id"
                        >
                        </el-table-column>
                        <el-table-column
                                prop="bank"
                                label="接单账号"
                        >
                        </el-table-column>
                        <el-table-column
                                prop="orderstatus"
                                label="订单状态"
                        >
                        </el-table-column>
                        <el-table-column
                                prop="shopsize"
                                label="商品规格"
                        >
                        </el-table-column>
                        <el-table-column
                                prop="tasktype"
                                label="任务类型"
                        >
                        </el-table-column>
                        <el-table-column
                                prop="shop"
                                label="商品"
                        >
                        </el-table-column>
                        <el-table-column
                                prop="isc"
                                label="确认完成"
                        >
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
                <el-tab-pane label="垫付历史订单" name="fifth">

                    <el-form :inline="true" :model="payhistory" class="demo-form-inline">

                        <el-form-item label="店铺">
                            <el-select v-model="payhistory.region">
                                <el-option v-for="(item,index) in shops" :key="index" :label="item.name" :value="item.name"></el-option>

                            </el-select>
                        </el-form-item>
                        <el-form-item label="类型">
                            <el-select v-model="payhistory.type">
                                <el-option v-for="(item,index) in tasks" :key="index" :label="item.name" :value="index"></el-option>

                            </el-select>
                        </el-form-item>

                        <el-form-item label="状态">
                            <el-select v-model="payhistory.status">
                                <el-option v-for="(item,index) in paystatus" :key="index" :label="item.name" :value="index"></el-option>

                            </el-select>
                        </el-form-item>

                        <el-form-item>

                            <el-select v-model="payhistory.seltime">
                                <el-option label="接单时间" value="1"></el-option>
                                <el-option label="完成时间" value="2"></el-option>
                            </el-select>
                            <span>:</span>
                            <el-date-picker
                                    v-model="payhistory.issuetime"
                                    type="daterange"
                                    range-separator="至"
                                    start-placeholder="开始日期"
                                    end-placeholder="结束日期">
                            </el-date-picker>
                        </el-form-item>
                        <el-form-item label="买手ID">
                            <el-input v-model="payhistory.id"></el-input>
                        </el-form-item>
                        <el-form-item label="任务ID">
                            <el-input v-model="payhistory.taskid"></el-input>
                        </el-form-item>
                        <el-form-item label="订单ID">
                            <el-input v-model="payhistory.orderid"></el-input>
                        </el-form-item>
                        <el-form-item label="旺旺号">
                            <el-input v-model="payhistory.ww"></el-input>
                        </el-form-item>

                        <el-form-item label="淘宝订单ID">
                            <el-input v-model="payhistory.tbid"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="onSubmit">查询</el-button>
                            <el-button type="primary" @click="onSubmit">导出订单</el-button>
                        </el-form-item>
                    </el-form>

                    <el-table
                            :data="payhistoryData"
                            border
                            style="width: 100%">
                        <el-table-column

                                prop="ordertime"
                                label="完成时间"
                        >
                        </el-table-column>
                        <el-table-column
                                label="订单id"
                        >
                            <template slot-scope="scope">
                                <el-link href="#/about?tagcount=-2" type="primary" target="_blank">{{scope.row.orderid}}</el-link>
                            </template>
                        </el-table-column>
                        <el-table-column

                                prop="taskid"
                                label="任务id"
                        >
                        </el-table-column>
                        <el-table-column
                                prop="id"
                                label="买手id"
                        >
                        </el-table-column>
                        <el-table-column
                                prop="bank"
                                label="接单账号"
                        >
                        </el-table-column>
                        <el-table-column
                                prop="orderstatus"
                                label="订单状态"
                        >
                        </el-table-column>
                        <el-table-column
                                prop="shopsize"
                                label="商品规格"
                        >
                        </el-table-column>
                        <el-table-column
                                prop="shop"
                                label="商品"
                                width="150"
                        >
                            <template slot-scope="scope">
                                <el-link type="primary" :href="scope.row.nav">{{scope.row.name}}</el-link>
                            </template>
                        </el-table-column>
                        <el-table-column
                                prop="typetask"
                                label="任务类型"
                        >
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
    import ajax from 'axios';
    export default {
        name: "paytask",
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
            ajax.all([this.go_bs()]);
        },
        methods:{
            go_bs(){
                return this.$api.ports.browseIndex().then((res)=>{
                    console.log(res,'bs');
                })
            },

            onSubmit(f){
                console.log(f);
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