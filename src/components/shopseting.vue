<template>
    <div>

        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span class="c-topic">基本信息</span>
            </div>
            <div>
                <el-row type="flex" justify="space-between">
                    <p>{{member.ue_account|filstr}}</p>
                    <p>
                        注册时间：{{member.create_at|filstr}}
                    </p>
                </el-row>
                <!--<div>-->
                    <!--<el-tag type="danger">免</el-tag><span class="ml1">免审商家</span>-->
                <!--</div>-->
                <div>
                    <p>
                        <el-link type="primary">ID：{{member.id|filstr}}</el-link>
                    </p>
                </div>
                <div>
                    <p class="ss-title">
                        联系方式
                    </p>
                    <div>
                        QQ：{{member.qq_no|filstr}}
                    </div>
                </div>
            </div>
            <el-divider></el-divider>
            <div>
                <el-row>
                    <el-col>
                        <span class="ss-title">绑定店铺</span>
                        <el-popover
                                placement="top"
                                width="300"
                                v-model="shopformStatus"
                                >
                            <el-form style="height:70vh;overflow-y:scroll;" :model="shopform" ref="shopform" :rules="shoprule">
                                <el-form-item label="请选择平台" prop="type">

                                    <el-select placeholder="请选择" v-model="shopform.type" type="type">
                                        <el-option
                                                v-for="item in typeFilters"
                                                :key="item.value"
                                                :label="item.text"
                                                :value="item.value">
                                        </el-option>
                                    </el-select>
                                </el-form-item>

                                <el-form-item label="店铺名称" prop="shopname">
                                    <el-row>
                                        <div>
                                            <el-input v-model="shopform.shopname" type="shopname"></el-input>
                                        </div>
                                        <el-link type="info">(务必跟手机端宝贝页显示的店铺名一致)</el-link>
                                    </el-row>
                                </el-form-item>

                                <el-form-item label="店铺首页网址" prop="shopurl">

                                    <div>
                                        <el-input v-model="shopform.shopurl" type="shopurl"></el-input>
                                    </div>
                                    <el-link type="info">(店铺地址绑定后无法修改,拼多多平台可分享店铺到微信复制链接)</el-link>
                                </el-form-item>

                                <el-form-item label="店铺主旺旺ID" prop="wwid">
                                    <el-row>
                                        <div>
                                            <el-input v-model="shopform.wwid" type="wwid"></el-input>
                                        </div>
                                        <el-link type="info">(店铺主旺旺ID绑定后无法修改)</el-link>
                                    </el-row>
                                </el-form-item>
                                <el-form-item label="发货地" prop="address">

                                    <el-select v-model="shopform.pdata" placeholder="请选择省" class="ml1" type="address" @change="pdatafn">
                                        <el-option v-for="(item,index) in provs_data" :key="item.value"
                                                    :label="item.text"
                                                    :value="item"></el-option>
                                    </el-select>

                                    <el-select v-model="shopform.cdata" placeholder="请选择市" class="ml1">
                                        <el-option v-for="(item,index) in citys_data[shopform.pdata.value]" :key="item.value"
                                                   :label="item.text"
                                                   :value="item"></el-option>
                                    </el-select>

                                    <el-select v-model="shopform.ddata" placeholder="请选择区" class="ml1">
                                        <el-option v-for="(item,index) in dists_data[shopform.cdata.value]" :key="item.value"
                                                   :label="item.text"
                                                   :value="item"></el-option>
                                    </el-select>
                                </el-form-item>
                                <el-form-item label="街道地址" prop="detailed_address">

                                    <el-input v-model="shopform.detailed_address" type="detailed_address"></el-input>
                                </el-form-item>

                                <el-form-item label="发货电话" prop="phone">

                                    <div>
                                        <el-input v-model.number="shopform.phone" type="phone"></el-input>
                                    </div>
                                    <el-link type="info">(若无法选择请按Ctrl+F5键强制刷新页面，或者选用Chrome浏览器重试)</el-link>
                                </el-form-item>
                                <el-divider></el-divider>
                                <el-row>
                                    <el-button type="success" icon="el-icon-circle-check" @click="submitShop('shopform')">确认提交</el-button>
                                    <el-button type="danger" icon="el-icon-circle-close" @click="sfsfn(false)">取消退出</el-button>
                                </el-row>
                            </el-form>
                            <el-button slot="reference" type="text" class="ml1">+增加绑定店铺</el-button>
                        </el-popover>
                    </el-col>
                    <el-col>
                        <el-link type="info">温馨提示 :店铺请填写自己店铺首页地址，不可绑定其他卖家的地址，否则会被处罚</el-link>
                    </el-col>
                </el-row>
                <el-table class="mt1" border ref="filterTable" :data="shopData" style="width:100%;">
                    <el-table-column width="200" label="全部" prop="type" :filters="typeFilters" :filter-method="filterType">
                        <template slot-scope="scope">
                            {{scope.row.type|shops}}
                        </template>
                    </el-table-column>
                    <el-table-column width="200"  label="店铺名称" prop="shopname"></el-table-column>
                    <el-table-column width="200"  label="旺旺名称" prop="wwname"></el-table-column>
                    <el-table-column width="200" label="店铺地址" prop="link">
                        <template slot-scope="scope">
                            <el-row>
                                <el-tooltip :content="scope.row.link" placement="top">
                                    <el-button size="mini" v-clipboard:copy="scope.row.link" v-clipboard:success="copySuccess"
                                               v-clipboard:error="copyError">复制店铺地址</el-button>
                                </el-tooltip>
                            </el-row>
                        </template>
                    </el-table-column>
                    <el-table-column width="200"  label="发货信息">
                        <template slot-scope="scope">
                            <el-row>
                                {{scope.row.shipper}}
                            </el-row>
                        </template>
                    </el-table-column>

                    <el-table-column width="200"  label="接单间隔设置" prop="interval">
                        <template slot-scope="scope">
                            <el-row>

                                <el-popover
                                        placement="left"
                                        width="400"
                                >
                                    <el-form>
                                        <el-row>
                                            <div style="margin:24px 0;font-size:1rem;font-weight: bold;">
                                                <span class="">接单间隔时间限制设置</span>
                                            </div>

                                            <div>
                                                <el-alert
                                                        class="mt1"
                                                        type="info"
                                                        description="限制时间指用户第一次接任务与第二次接任务之间的时间间隔，不同类目的商家，用户的平均回购时间都不同，适当比例的用户回购对店铺和商品权重有很大好处，所以我们开放了商家店铺对用户的间隔时间设置，大家可以根据自己类目和店铺的需要在规定区间内设置：
间隔设置区间要求“大于等于15天，小于等于45天”，系统默认是33天。"
                                                        show-icon>
                                                </el-alert>

                                                <el-alert
                                                        class="mt1"
                                                        type="info"
                                                        description="注意：商家一定要根据自己的类目特点来设置，比如食品类正常回购时间就很短，大家电类就会很长。如果设置了过短且不符合类目特性间隔时间，可能会触发淘宝“重复购买”的降权处罚，大家慎重设置！"
                                                        show-icon>
                                                </el-alert>
                                            </div>
                                            <el-row type="flex" align="middle" class="mt1">
                                                <span>接单间隔</span>
                                                <div class="ml1">
                                                    <el-input v-model.number="scope.row.isCount"></el-input>
                                                </div>
                                               <span>天</span>

                                            </el-row>
                                        </el-row>
                                        <el-divider></el-divider>
                                        <el-row>
                                            <el-button type="success" icon="el-icon-circle-check" @click="submitShopT(scope.row.id,scope.row.setCount,scope.row.index,scope.row.isCount)">确认提交</el-button>
                                            <el-button type="danger" icon="el-icon-circle-close">取消退出</el-button>
                                        </el-row>
                                    </el-form>
                                    <el-button slot="reference" type="text" size="mini" class="ml1">{{scope.row.interval}}天</el-button>
                                </el-popover>

                            </el-row>
                        </template>
                    </el-table-column>
                    <el-table-column width="200"  label="审核状态" prop="status">
                        <template slot-scope="scope">
                            <el-link :type="scope.row.status.type" :underline="false">{{scope.row.status.text}}</el-link>
                        </template>
                    </el-table-column>

                    <el-table-column fixed="right" width="200"  label="修改" prop="set">
                        <template slot-scope="scope">
                            <el-row>

                                <el-popover
                                        placement="left"
                                        width="300"
                                        v-model="scope.row.change"
                                >

                                    <el-form style="height:70vh;overflow-y:auto;" :model="shop_table" :ref="'shop_table'+scope.row.index" :rules="shoprule">
                                        <el-form-item label="请选择平台" prop="type">

                                            <el-select placeholder="请选择" v-model="shop_table.type" type="type">
                                                <el-option
                                                        v-for="item in typeFilters"
                                                        :key="item.value"
                                                        :label="item.text"
                                                        :value="item.value">
                                                </el-option>
                                            </el-select>
                                        </el-form-item>

                                        <el-form-item label="店铺名称" prop="shopname">
                                            <el-row>
                                                <div>
                                                    <el-input v-model="shop_table.shopname" type="shopname"></el-input>
                                                </div>
                                                <el-link type="info">(务必跟手机端宝贝页显示的店铺名一致)</el-link>
                                            </el-row>
                                        </el-form-item>

                                        <el-form-item label="店铺首页网址" prop="shopurl">

                                            <div>
                                                <el-input v-model="shop_table.shopurl" type="shopurl"></el-input>
                                            </div>
                                            <el-link type="info">(店铺地址绑定后无法修改,拼多多平台可分享店铺到微信复制链接)</el-link>
                                        </el-form-item>

                                        <el-form-item label="店铺主旺旺ID" prop="wwid">
                                            <el-row>
                                                <div>
                                                    <el-input v-model="shop_table.wwid" type="wwid"></el-input>
                                                </div>
                                                <el-link type="info">(店铺主旺旺ID绑定后无法修改)</el-link>
                                            </el-row>
                                        </el-form-item>
                                        <el-form-item label="发货地" prop="address_1">

                                            <el-input v-model="shop_table.address_1" type="address_1"></el-input>
                                        </el-form-item>
                                        <el-form-item label="街道地址" prop="detailed_address">

                                            <el-input v-model="shop_table.detailed_address" type="detailed_address"></el-input>
                                        </el-form-item>

                                        <el-form-item label="发货电话" prop="phone">

                                            <div>
                                                <el-input v-model.number="shop_table.phone" type="phone"></el-input>
                                            </div>
                                            <el-link type="info">(若无法选择请按Ctrl+F5键强制刷新页面，或者选用Chrome浏览器重试)</el-link>
                                        </el-form-item>
                                        <el-divider></el-divider>
                                        <el-row>
                                            <el-button type="success" icon="el-icon-circle-check" @click="submitShopO('shop_table'+scope.row.index,scope.row.index)">确认提交</el-button>
                                            <el-button type="danger" icon="el-icon-circle-close" @click="popfalse(scope.row.index)">取消退出</el-button>
                                        </el-row>
                                    </el-form>

                                    <el-button slot="reference" type="primary" size="mini" class="ml1" @click="popchnage(scope.row.id,scope.row.change,scope.row.index)">修改</el-button>
                                </el-popover>
                            </el-row>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </el-card>
    </div>
</template>

<script>
    import {provs_data, citys_data, dists_data} from 'lwarea';
    import ajax from 'axios';
    export default {
        name: "shopseting",
        data(){
            var validateType=(rule, value, callback) => {
                if (value=='') {
                    callback(new Error('平台不能为空'));
                } else {
                    callback();
                }
            };

            var validateName=(rule, value, callback) => {
                if (value=='') {
                    callback(new Error('店铺名称不能为空'));
                } else {
                    callback();
                }
            };


            var validateUrl=(rule, value, callback) => {
                if (value=='') {
                    callback(new Error('店铺链接不能为空'));
                } else {
                    callback();
                }
            };


            var validateWwid=(rule, value, callback) => {
                if (value=='') {
                    callback(new Error('旺旺ID不能为空'));
                } else {
                    callback();
                }
            };

            var validateAddress=(rule, value, callback) => {
                var sf=this.shopform;
                if(sf.pdata==''){
                    callback(new Error('发货地选择省不能为空'));
                }else if(sf.cdata==''){

                    callback(new Error('发货地选择市不能为空'));
                }else if(sf.ddata==''){

                    callback(new Error('发货地选择区不能为空'));
                }else{
                    this.shopform.address=sf.pdata.text+sf.cdata.text+sf.ddata.text;
                    callback();
                }
            };

            var validateDaddress=(rule, value, callback) => {
                if (value=='') {
                    callback(new Error('街道地址不能为空'));
                } else {
                    callback();
                }
            };


            var checkPhone = (rule, value, callback) => {
                if (!value) {
                    return callback(new Error('手机号不能为空'));
                }
                setTimeout(() => {
                    if (!Number.isInteger(value)) {
                        callback(new Error('请输入手机号'));
                    } else if(value.toString().length<11){
                        callback(new Error('请输入11位数的手机号码'));
                    }
                    else {
                        callback();
                    }
                }, 100);
            };


            return {
                member:{

                },
                shoprule:{
                    type:[
                        {
                            required:true,validator:validateType, trigger: 'blur'
                        }
                    ],

                    shopname:[
                        {
                            required:true,validator:validateName, trigger: 'blur'
                        }
                    ],
                    shopurl:[
                        {
                            required:true,validator:validateUrl, trigger: 'blur'
                        }
                    ],

                    wwid:[
                        {
                            required:true,validator:validateWwid, trigger: 'blur'
                        }
                    ],

                    address:[
                        {
                            required:true,validator:validateAddress, trigger: 'blur'
                        }
                    ],

                    detailed_address:[
                        {
                            required:true,validator:validateDaddress, trigger: 'blur'
                        }
                    ],
                    phone:[
                        {required:true,validator:checkPhone,trigger:'blur'}
                    ],
                    address_1:[
                        {
                            required:true,message:'发货地不能为空',trigger:'blur'
                        }
                    ]
                },
                bindshop:{},
                provs_data, citys_data, dists_data,
                shopformStatus:false,
                shop_table:{
                    detailed_address:'',
                    type:'',
                    shopname:'',
                    shopurl:'',
                    wwid:'',
                    address_1:'',
                    wwname:'',
                    link:'',
                    pdata:'',
                    cdata:'',
                    ddata:'',
                    interval:'',
                    status:'',
                    set:'',
                    phone:''
                },
                shopform:{
                    detailed_address:'',
                    type:'',
                    shopname:'',
                    shopurl:'',
                    wwid:'',
                    address:'',
                    wwname:'',
                    link:'',
                    pdata:'',
                    cdata:'',
                    ddata:'',
                    interval:'',
                    status:'',
                    set:'',
                    phone:''
                },
                visible:false,
                typeFilters:[
                    {
                        text:'淘宝',
                        value:1
                    },

                    {
                        text:'拼多多',
                        value:3
                    }
                ],
                shopData:[
                    {
                        type:'淘宝',
                        shopname:'小仙女也分',
                        wwname:'pdd212323232',
                        link:'www.baidu.com',
                        pdata:'江苏省',
                        cdata:'泰州市',
                        ddata:'海陵区',
                        shipper:'江苏省-泰州市-海陵区',
                        interval:33,
                        status:'已通过',
                        set:''
                    },
                    {
                        type:'拼多多',
                        shopname:'小仙女也分',
                        wwname:'pdd212323232',
                        link:'www.baidu.com',
                        shipper:'江苏省-泰州市-海陵区',
                        interval:33,
                        status:'已通过',
                        set:''
                    }
                ],
                shopInd:-1
            }
        },

        filters:{
            shops:function(value){
                var del='/';
                switch (value){
                    case 1:del='淘宝';break;
                    case 3:del='拼多多';break;
                }
                return del;
            },
            filstr:function(value){
                if(value){
                    return value;
                }else{
                    return '***'
                }
            },
            strno:function(value){
                if(typeof value=='string'&&value.length>4){
                    var arr=value.split('');
                    arr.splice(-4);
                    value=arr.join('');
                    value+='***';
                    return value;
                }else{
                    return '***'
                }
            }
        },
        created(){

            this.$notify.info({title:'消息',duration:0,showClose:true,message:'任务期间请务必保持店铺名与淘宝平台一致，勿随意修改店铺名称，否则用户提交不了任务就会去退款！'});

            //并发请求
            ajax.all([this.go_shops()]);
        },
        methods:{
            popchnage(id,change,index){

                var obj={id};

                this.$api.ports.editShop(obj).then((res)=>{
                    if(res.code){
                        this.shopData[index].change=true;
                        var getD=res.data[0];
                        this.shop_table={
                            id:getD.id,
                            detailed_address:getD.detailed_address,
                            type:getD.platform_type,
                            shopname:getD.shop_name,
                            shopurl:getD.shop_url,
                            wwid:getD.wangwang_id,
                            address_1:getD.address,
                            wwname:getD.wangwang_id,
                            set:'',
                            phone:parseInt(getD.phone)
                        };
                    }else{
                        this.shopData[index].change=false;
                        this.$notify.error(res.message);
                    }

                });
            },
            popfalse(index){
                this.shopData[index].change=false;
            },
            pdatafn(e){
                console.log(e,'change');
            },
            sfsfn(jude){
                this.shopformStatus=jude
            },

            submitShop(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        var getR=this.shopform;
                        console.log(getR,'getR');
                        var obj={
                            platform_type:getR.type,
                            shop_name:getR.shopname,
                            shop_url:getR.shopurl,
                            wangwang_id:getR.wwid,
                            address:getR.address,
                            detailed_address:getR.detailed_address,
                            phone:getR.phone
                        }
                        this.$api.ports.bindShop(obj).then((res)=>{
                            if(res.code){
                                this.$alert('提交成功，待1~3天平台审核', '温馨提示', {
                                    confirmButtonText: '确定',
                                    callback: () => {

                                        this.go_shops();
                                        //this.sfsfn(false);
                                    }
                                });
                            }else{
                                this.$message.error(res.message);
                            }
                        }).catch((err)=>{
                            console.log(err,'失败');
                        })
                    } else {
                        return false;
                    }
                });
            },

            submitShopO(formName,index) {
                console.log(index,'index');

                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        var getR=this.shop_table;
                        console.log(getR,'getR');
                        var obj={
                            id:getR.id,
                            platform_type:getR.type,
                            shop_name:getR.shopname,
                            shop_url:getR.shopurl,
                            wangwang_id:getR.wwid,
                            address:getR.address_1,
                            detailed_address:getR.detailed_address,
                            phone:getR.phone
                        }
                        this.$api.ports.doEditShop(obj).then((res)=>{
                            if(res.code){
                                this.$alert('提交成功，待1~3天平台审核', '温馨提示', {
                                    confirmButtonText: '确定',
                                    callback: action => {this.popfalse(index);this.go_shops()}
                                });
                            }else{
                                this.$message.error(res.message);
                            }
                        }).catch((err)=>{
                            console.log(err,'失败');
                        })
                    } else {
                        return false;
                    }
                });
            },
            intervalfalse(index,count){
                this.shopData[index].setCount=false;
                if(count){
                    this.shopData[index].interval=count;
                }
            },
            submitShopT(id,change,index,take_interval){
                if(take_interval>=15&&take_interval<=45){
                    var obj={
                        take_interval,id
                    }
                    console.log(obj);
                    this.$api.ports.editInterval(obj).then((res)=>{
                        console.log(res,'ss');
                        if(res.code){

                            this.$alert('修改成功', '温馨提示', {
                                confirmButtonText: '确定',
                                callback: action => {this.intervalfalse(index,take_interval)}
                            });

                        }else{
                            this.$message.error(res.message);
                        }
                    }).catch((err)=>{
                        console.log(err,'失败');
                    })
                }else{
                    this.$notify.error('注意：取值在15~45之间！');
                   return false;
                }

            },
            go_shops(){
                return this.$api.ports.bindShopList().then((res)=>{
                    console.log(res,'res');
                    if(res.code){

                        var clearArr=res.data[0].list.map((v,i)=>{
                            return {
                                isCount:33,
                                index:i,
                                change:false,
                                setCount:false,
                                id:v.id,
                                type:v.platform_type,
                                wwname:v.wangwang_id,
                                shopname:v.shop_name,
                                link:v.shop_url,
                                shipper:v.address,
                                interval:v.take_interval,
                                status:(()=>{
                                    var del={type:'',text:'/'};
                                    switch(v.status){
                                        case 0:del={type:'info',text:'未审核'};break;
                                        case 1:del={type:'success',text:'通过'};break;
                                        case 2:del={type:'error',text:'未通过'};break;
                                    }
                                    return del;
                                })(),
                                set:''
                            }
                        });
                        console.log(clearArr,'ca');

                        this.member=res.data[0].member;
                        this.shopData=clearArr;
                    }else{
                        this.$notify.error({
                            title: '错误',
                            message: res.message
                        });
                    }

                })
            },
            copy(ev){

            },
            copySuccess(){
                this.$message.success('复制成功');
            },

            copyError(){
                this.$message.error('复制失败');
            },

            changeInter(count){
                this.shopInd=count;
            },
            filterType(value, row, column) {
                const property = column['property'];
                return row[property] === value;
            }
        },
        watch:{
            "shopform.pdata"(to){
                this.shopform.cdata='';
                this.shopform.ddata='';
            },
            "shopform.cdata"(to){
                this.shopform.ddata='';
            }
        }
    }
</script>

<style lang="less" scoped>
    .ss-title{
        font-weight:bold;
    }
    .ml1{
        margin:0 1rem;
    }
    .mt1{
        margin:1rem 0;
    }
</style>