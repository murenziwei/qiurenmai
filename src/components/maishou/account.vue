<template>
    <div>
        <router-view></router-view>
        <el-card class="box-card" v-if="isChild">
            <div slot="header" class="clearfix">
                <span class="c-topic">账号管理</span>
            </div>

            <div>
                <el-row>
                    <el-col>
                        <span class="ss-title">绑定店铺</span>
                        <el-button type="text" class="ml1" @click="childfn">+增加绑定店铺</el-button>
                    </el-col>
                    <el-col>
                        <el-link type="info">温馨提示 :店铺请填写自己店铺首页地址，不可绑定其他卖家的地址，否则会被处罚</el-link>
                    </el-col>
                </el-row>
                <el-table class="mt1" border ref="filterTable" :data="shopData" style="width:100%;">
                    <el-table-column label="全部" prop="type" :filters="typeFilters" :filter-method="filterType" width="200">
                        <template slot-scope="scope">
                            {{scope.row.type|shops}}
                        </template>
                    </el-table-column>
                    <el-table-column label="ID" prop="id" width="200"></el-table-column>
                    <el-table-column label="旺旺名称" prop="wwname" width="200"></el-table-column>
                    <el-table-column label="常用登录地" prop="often_area" width="200"></el-table-column>

                    <el-table-column label="支付宝认证姓名" prop="zhifu_name" width="200"></el-table-column>
                    <el-table-column label="审核状态" prop="status" width="200">
                        <template slot-scope="scope">
                            <el-link :type="scope.row.status.type" :underline="false">{{scope.row.status.text}}</el-link>
                        </template>
                    </el-table-column>

                    <el-table-column label="修改" prop="set" width="100" fixed="right">
                        <template slot-scope="scope">
                            <el-row >
                                <el-link class="kz_item" type="success" :href="'#/maishou/account/shopchange?id='+scope.row.id">修改</el-link>
                                <el-link  class="kz_item" type="primary" :underline="false"  @click="deleteT(scope.row.id)">删除</el-link>
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
                isChild:true,

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
            ajax.all([this.go_route(this.$route)]);
        },
        methods:{
            deleteT(id){

                this.$confirm('再次确认是否删除？?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {

                    this.$api.ports.doDelBuyNo({id}).then((res)=>{
                        if(res.code){

                            this.$notify.success('删除成功');
                            this.go_shops();
                        }else{
                            this.$notify.error(res.message);
                        }
                    });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });

            },

            //跳转子页面绑定店铺
            childfn(){
                this.$router.push({
                    name:"binding"
                })
            },

            popchnage(id,change,index){

                var obj={id};

                this.$api.ports.editBuyNo(obj).then((res)=>{
                    console.log(res,'数据？');
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
                                    callback: action => {this.$router.go(0);
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
                                    callback: action => {this.popfalse(index);this.$router.go(0)}
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
                return this.$api.ports.buyNoList().then((res)=>{
                    console.log(res,'buyNoList');
                    if(res.code){

                        var clearArr=res.data.map((v,i)=>{
                            return {
                                isCount:33,
                                index:i,
                                change:false,
                                setCount:false,
                                id:v.id,
                                type:v.platform_type,
                                wwname:v.wang_id,
                                often_area:v.often_area,
                                zhifu_name:v.zhifu_name,
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
            go_route(to){
                if(to.name==="binding"||to.name==='shopchange'){
                    this.isChild=false;
                }else{
                    this.go_shops();
                    this.isChild=true;
                }
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
            "shopform.pdata"(){
                this.shopform.cdata='';
                this.shopform.ddata='';
            },
            "shopform.cdata"(){
                this.shopform.ddata='';
            },
            "$route"(to){
                this.go_route(to);
            }
        }
    }
</script>

<style lang="less" scoped>
    .kz_item{
        margin-right:.5rem;
    }
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