<template>
    <div class="issue">

        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span class="c-topic">发布任务</span>
            </div>
            <div>
                <el-steps :active="$store.state.count" finish-status="success" simple style="margin-top: 20px">

                    <el-step v-for="(item,index) in steparr" :title="item.val" :key="index" >
                    </el-step>
                </el-steps>
                <ul class="step-content">
                    <li v-if="$store.state.count==1">
                        <el-form>

                            <el-alert
                                    class="info-con"
                                    :title="bull.title"
                                    type="error"
                            >
                                <div>
                                    <p v-for="(item,index) in bull.list" :key="index" v-show="index<3">{{index+1}}.{{item}}</p>
                                </div>
                            </el-alert>
                            <el-timeline class="step-form">
                                <el-timeline-item timestamp="选择任务类型" placement="top">
                                    <div class="b-c-box"><el-link href="#/about/pricetable" type="primary">查看价格表</el-link></div>
                                    <el-card>
                                        <div>
                                            <el-radio-group v-model="taskR">
                                                <el-radio :label="1">垫付任务</el-radio>
                                                <el-radio :label="2">浏览任务</el-radio>
                                            </el-radio-group>

                                            <el-divider></el-divider>
                                            <div>
                                                <div v-if="taskR===1">
                                                    <el-radio-group v-model="trC" class="tr-ul">
                                                        <div class="tr-li">
                                                            <el-radio label="Tbsearch" class="w-sp">
                                                                新版手机淘宝任务v2.1
                                                                <span class="info-text">重构核心算法，操作模式不再单一，高权重，高安全性，<span class="danger-text">最低发布5单</span></span>
                                                                <el-popover
                                                                        placement="top-start"
                                                                        title="新版手机淘宝任务"
                                                                        width="200"
                                                                        trigger="click"
                                                                        content="产品上升期的推广方式，安全性和效果为主，适合有一定销量的产品操作。">
                                                                    <el-button type="text" slot="reference" icon="el-icon-info" class="info-btn"></el-button>
                                                                </el-popover>
                                                            </el-radio>
                                                        </div>
                                                        <div class="tr-li">
                                                            <el-radio label="Tbpresell" class="w-sp">
                                                                淘宝预售任务
                                                                <span class="info-text">（当天加购物车，指定日期付款）</span>
                                                                <el-popover
                                                                        placement="top-start"
                                                                        title="淘宝预售任务"
                                                                        width="200"
                                                                        trigger="click"
                                                                        content="新品推广，销量破0。适合新上产品，建议结合手机淘宝任务一起使用。严格控制转化率。">
                                                                    <el-button type="text" slot="reference" icon="el-icon-info" class="info-btn"></el-button>
                                                                </el-popover>
                                                            </el-radio>
                                                        </div>
                                                        <div class="tr-li">
                                                            <el-radio label="Tbword" class="w-sp">
                                                                黑科技-淘口令裂变任务
                                                                <span class="info-text">（用户通过淘口令付款，并分享出自己的淘口令给下一个用户接单）</span>
                                                                <el-popover
                                                                        placement="top-start"
                                                                        title="黑科技-淘口令裂变任务"
                                                                        width="200"
                                                                        trigger="click"
                                                                        content="配合以上任务的一种入口，适合流量在快速上升期间使用。">
                                                                    <el-button type="text" slot="reference" icon="el-icon-info" class="info-btn"></el-button>
                                                                </el-popover>
                                                            </el-radio>
                                                        </div>
                                                        <div class="tr-li">
                                                            <el-radio label="Pinduoduo" class="w-sp">
                                                                手机拼多多任务
                                                                <span class="info-text">（用户在手机拼多多app下单）</span>
                                                                <el-popover
                                                                        placement="top-start"
                                                                        title="手机拼多多任务"
                                                                        width="200"
                                                                        trigger="click"
                                                                        content="常规推广方式，通用与拼多多目前的推广。">
                                                                    <el-button type="text" slot="reference" icon="el-icon-info" class="info-btn"></el-button>
                                                                </el-popover>
                                                            </el-radio>
                                                        </div>
                                                    </el-radio-group>
                                                </div>

                                                <div v-if="taskR===2">
                                                    <el-radio-group v-model="trC" class="tr-ul">
                                                        <div class="tr-li">
                                                            <el-radio label="Tbpreview" class="w-sp">
                                                                <b>手机淘宝</b>浏览、收藏、加购物车、直通车（<span>全真人加购，不被屏蔽不降权。</span>）
                                                            </el-radio>
                                                        </div>
                                                    </el-radio-group>
                                                </div>
                                            </div>
                                        </div>

                                    </el-card>
                                </el-timeline-item>
                                <el-timeline-item timestamp="选择店铺" placement="top">
                                    <el-card>

                                        <el-radio-group v-model="chooseS" class="tr-ul">
                                            <div class="tr-li" v-for="(sit,sin) in shops" :key="sin">
                                                <el-radio :label="sin" class="w-sp" :disabled="!RegExp('^'+sit.jude,'i').test(trC)">
                                                    <el-tag>{{sit.type}}</el-tag><span class="ws-name">{{sit.name}}</span>
                                                </el-radio>
                                            </div>
                                        </el-radio-group>
                                        <el-link v-if="shops.length==0" href="#/about/shopseting" type="primary" class="b-c-box">添加绑定店铺</el-link>
                                    </el-card>
                                </el-timeline-item>
                                <el-timeline-item timestamp="选择平台返款模式" placement="top">
                                    <el-card>
                                        <el-radio-group v-model="chooseP" class="tr-ul">
                                            <div class="tr-li">
                                                <el-radio :label="1" class="w-sp">
                                                    平台系统返款（收取服务费 <span class="danger-text">1</span> 元/单）
                                                    <p>
                                                        <span class="danger-text">优先展示给用户</span>商家押商品本金到平台，只需在“返款管理”中确认返款金额，一键返款给用户( <span class="danger-text">24</span>小时内)，商家无需耗费时间、人力处理退款。
                                                    </p>
                                                </el-radio>
                                            </div>
                                        </el-radio-group>
                                    </el-card>
                                </el-timeline-item>
                            </el-timeline>
                            <el-form-item>
                                <el-button @click="submitForm('ruleForm',1)">下一步</el-button>
                            </el-form-item>
                        </el-form>

                    </li>

                    <li v-if="$store.state.count==2">
                        <component :is="trC"></component>
                    </li>
                    <li v-if="$store.state.count==3">
                        <div>
                            <el-row>
                                <p>
                                    本次任务费用详情
                                </p>
                                <el-table
                                        :data="tableData"
                                        :span-method="objectSpanMethod"
                                        border
                                        style="width: 100%; margin-top: 20px">
                                    <el-table-column
                                            prop="id"
                                            label="ID"
                                            width="180">
                                    </el-table-column>
                                    <el-table-column
                                            prop="name"
                                            label="姓名">
                                    </el-table-column>
                                    <el-table-column
                                            prop="amount1"
                                            label="数值 1（元）">
                                    </el-table-column>
                                    <el-table-column
                                            prop="amount2"
                                            label="数值 2（元）">
                                    </el-table-column>
                                    <el-table-column
                                            prop="amount3"
                                            label="数值 3（元）">
                                    </el-table-column>
                                </el-table>
                                <div style="text-align:right;">
                                    <p>
                                        合计单数： <span class="success-text">1</span>单
                                    </p>

                                    <p>
                                        合计支付： 佣金<span class="danger-text">1.60</span>金
                                    </p>
                                </div>
                            </el-row>
                            <el-divider></el-divider>
                            <div>
                                <p>选择支付方式</p>
                                <el-radio-group v-model="paytype">
                                    <el-radio :label="1">
                                        使用账户余额支付（可用本金 <span class="danger-text">3.70</span>{{$store.state.mtext}},可用金币 <span class="danger-text">0.00</span>，充值成功后请 <span class="success-text">刷新本页面</span>）
                                    </el-radio>
                                </el-radio-group>
                            </div>

                            <div>
                                <el-row type="flex" align="middle" justify="center" :gutter="30" class="b-c-box">

                                    <el-button type="primary" @click="nextfn(-1)">上一步</el-button>
                                    <el-button type="primary" @click="nextfn(1)">付款并发布任务</el-button>
                                </el-row>
                            </div>
                        </div>
                    </li>
                    <li v-if="$store.state.count==4">
                        <div>
                            <el-alert
                                    title="发布状态"
                                    type="success"
                                    description="恭喜你发布成功"
                                    show-icon>
                            </el-alert>
                        </div>

                        <div>
                            <el-row type="flex" align="middle" justify="center" :gutter="30" class="b-c-box">

                                <el-button type="primary" @click="nextfn(-1)">上一步</el-button>
                                <el-button type="primary" @click="setfn(1)">再次发布任务</el-button>
                            </el-row>
                        </div>
                    </li>
                </ul>
            </div>
        </el-card>
    </div>
</template>

<script>

    //淘宝预售
    import Tbpresell from './shop/Tbpresell.vue'

    //淘宝口令
    import Tbsearch from './shop/Tbsearch.vue'

    //淘宝精瘦
    import Tbpreview from './shop/Tbpreview.vue'
    //淘宝预览
    import Tbword from "./shop/Tbword.vue";
    //拼多多
    import Pinduoduo from "./shop/Pinduoduo.vue";
    import {provs_data} from 'lwarea';
    export default {
        name: "issue",
        data(){
            return {
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
                }],

                //支付方式
                paytype:1,

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
                //备注内容
                remark:'',

                courier:'',
                courierP:['3.60','3.60'],
                // 快递方式
                courierO:[
                    {
                        label:'申通快递',
                        value:'0'
                    },
                    {
                        label:'韵达淘宝快递',
                        value:'1'
                    }
                ],
                // 任务置顶
                istop:false,

                common:true,
                commonArr:[
                    {
                        keyword:'',
                        payment:1,
                        currency:''
                    }
                ],
                character:false,
                characterArr:[
                    {
                        keyword:'',
                        payment:'',
                        textarea:'',
                        currency:''
                    }
                ],

                picture:false,
                pictureArr:[
                    {
                        keyword:'',
                        payment:'',
                        textarea:'',
                        currency:'',
                        fileList:[]
                    }
                ],
                video:false,
                videoArr:[
                    {
                        keyword:'',
                        payment:'',
                        textarea:'',
                        currency:'',
                        fileList:[]
                    }
                ],
                cityoptions: provs_data,
                cityvalue: '',
                // 商品主图
                dialogImageUrl: '',
                dialogVisible: false,
                taskForm:{
                    name:'',
                    link:'',
                    postage:-1
                },
                taskRules:{
                    name: [
                        { required: true, message: '请输入商品名称', trigger: 'blur' }
                    ],

                    link: [
                        { required: true, message: '注意：选择的店铺名核对准确，不要填错链接', trigger: 'blur' }
                    ],
                    postage: [
                        { required: true, message: '请选择是否包邮', trigger: 'blur' }
                    ]
                },
                stepS:1,
                chooseP:1,
                chooseS:-1,
                taskR:1,
                trC:'Tbsearch',
                trCT:1,
                bull:{
                    title:'所有商家都要注意在销量110推广务必严格控制好以下几点：',
                    list:['物流一定要有真实物流记录，一定要有全程重量并且重量跟真实商品一致！一定不要网上买那些小快递的，便宜的空包（稽查系统在不断升级，有些以前没出事不代表现在或以后没事）；目前可以选用平台提供的空包（不要信当地快递网点手动输入的重量，当地网点无法控制包裹在中转站和到达点的重量统计）',
                        '推广比例一定不要过高，最高最高不能超过40%',
                        '移动端搜索转化率务必不要过高，保持在行业平均转化率的1.5倍左右最佳',
                        '推广期间请务必关掉商品淘客佣金，推广过程有诸多不确定因素可能导致产生佣金可能造成您的损失。'
                    ]
                },
                steparr:[
                    {
                        val:'选择任务类型'
                    },
                    {
                        val:'填写任务信息'
                    },
                    {
                        val:'支付'
                    },
                    {
                        val:'发布成功'
                    }
                ]
            }
        },
        created(){
            console.log(this.$options)
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
            },
            picChange(file,fileList){
                if(file){

                    var le=fileList.length,valO={
                        name:file.name,
                        url:file.url
                    },max=3;
                    if(le<max){

                        if(le){
                            if(fileList[le-1].name!=file.name){

                                fileList.push(valO);
                            }

                        }else{
                            fileList.push(valO);
                        }
                    }else{
                        this.$alert('最多只能添加'+max+'张', '提示', {
                            confirmButtonText: '确定',
                            callback:()=>{}
                        });
                    }
                }
            },
            picRemove(file,fileList){
                console.log('remove',file,fileList);
            },
            picPreview(file,fileList){
                console.log('picPreview');
            },
            cAdd(arrn,arrc,keyc){
                var arr=this[arrn];
                if(arr){
                    if(arr.length<arrc){
                        switch (keyc) {
                            case 'video':arr.push({
                                keyword:'',
                                payment:1,
                                textarea:'',
                                currency:'',
                                fileList:[]
                            })
                            ;break;
                            case 'picture':arr.push({
                                keyword:'',
                                payment:1,
                                textarea:'',
                                currency:'',
                                fileList:[]
                            })
                            ;break;
                            case 'character':arr.push({
                                    keyword:'',
                                    payment:1,
                                    textarea:'',
                                    currency:''
                            })
                                ;break;
                            default:arr.push({
                                keyword:'',
                                payment:1,
                                currency:''
                            });
                        }

                    }else{
                        this.$alert('最多只能添加'+arrc+'条', '提示', {
                            confirmButtonText: '确定',
                            callback:()=>{}
                        });
                    }
                }
            },
            cClose(arrn,arri){
                var arr=this[arrn];
                if(arr){
                    this.$confirm('此操作将删除该选项, 是否继续?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'error'
                    }).then(() => {
                        arr.splice(arri,1);
                        this.$message({
                            type: 'success',
                            message: '删除成功!'
                        });
                    }).catch(() => {
                        this.$message({
                            type: 'info',
                            message: '已取消删除'
                        });
                    });
                }
            },
            //商品主图
            handleRemove(file, fileList) {
                console.log(file, fileList);
            },
            handlePictureCardPreview(file) {
                this.dialogImageUrl = file.url;
                this.dialogVisible = true;
            },

            taskSub(form){
                this.$refs[form].validate((valid) => {
                    if (valid) {
                        this.$message.success('验证成功，进入下一步')


                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            submitForm(n,t){
                this.nextfn(t);
            },
            nextfn(val){
                this.$store.dispatch('controlco',{val});
            },

            setfn(val){
                this.$store.dispatch('setco',{val});
            }
        },
        watch:{
            trC:function(){
                this.chooseS=-1;
            },
            '$store.state.count':function(to){
                console.log(to);
                if(to==2){
                    this.$message.info({duration:0,showClose:true,message:'任务期间请关闭淘宝客、村淘、分享有赏等淘客活动，若因淘客引起的佣金支出由商家自己承担'});
                }
            }
        },
        components:{
            Tbword,
            Tbpreview,
            Tbsearch,
            Tbpresell,
            Pinduoduo

        }
    }
</script>

<style lang="less" scoped>
.i-padding{margin:0 .5rem;}
.bcb-span{white-space:nowrap;text-overflow:ellipsis;overflow:hidden;}
.success-text{color:#5bc0de;}
.c-i-close{
    transition:color .3s;
    will-change:color;
    &:hover{color:#5bc0de;}

}

.b-c-box{
    margin:1rem 0;;
}

.info-title{
    margin:1rem 0;
}
.ws-name{
    margin:0 .5rem;
}
.info-text{
    color:#909399;
}
.danger-text{
    color:#d9534f;
}
.info-btn{
    font-size:1.5rem;
}
.w-sp{
    white-space:normal;
}
.tr-li{
    margin:1rem 0;
}
.step-form,.step-content{
    list-style:none;
    margin:1rem 0;
    padding:0;
}
</style>