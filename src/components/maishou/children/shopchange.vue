<template>
    <div>

        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span class="c-topic">绑定账号</span>
            </div>

            <el-form :model="shopform" ref="shopform" :rules="shoprule">
                <el-divider content-position="left">第一步：填写淘宝买号信息</el-divider>
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

                <el-form-item label="收货人姓名" prop="shopname">
                    <el-row>
                        <div>
                            <el-input v-model="shopform.shopname" type="shopname"></el-input>
                        </div>
                        <el-link type="info">(务必跟手机端宝贝页显示的店铺名一致)</el-link>
                    </el-row>
                </el-form-item>
                <el-form-item label="性别" prop="sex">

                    <el-radio-group v-model="shopform.sex">
                        <div>
                            <el-radio :label="1">
                                男
                            </el-radio>

                            <el-radio :label="2">
                                女
                            </el-radio>
                        </div>
                    </el-radio-group>
                </el-form-item>

                <el-form-item label="IP所在地截图" prop="ipimgs">
                    <div>

                        <el-upload
                                class="upload-demo"
                                action="/api/Other/upload"
                                accept="image/*"
                                :data="{access_token:token}"

                                :file-list="shopform.ipimgs"

                                :on-success="ipSuccess"
                                :on-remove="ipRemove"

                                list-type="picture" :limit="5">
                            <el-button size="small" type="primary">点击上传</el-button>
                            <div slot="tip" class="el-upload__tip danger-text">
                                进入 <el-link href="http://www.baidu.com" type="primary" target="_blank">www.baidu.com</el-link> 搜索关键词：IP，并将搜索结果截图上传
                            </div>
                        </el-upload>
                    </div>
                </el-form-item>
                <el-form-item label="旺旺个人档案截图" prop="wwimgs">
                    <div>

                        <el-upload
                                class="upload-demo"
                                action="/api/Other/upload"
                                accept="image/*"
                                :data="{access_token:token}"

                                :file-list="shopform.wwimgs"

                                :on-success="wwSuccess"
                                :on-remove="wwRemove"


                                list-type="picture" :limit="5">
                            <el-button size="small" type="primary">点击上传</el-button>
                            <div slot="tip" class="el-upload__tip danger-text">
                                进入进入 "我的淘宝" 点击 "我的评价" 后，再点击个人信息中的 "会员名" 上传 "个人档案" 截图
                            </div>
                        </el-upload>
                    </div>
                </el-form-item>


                <el-form-item label="旺旺ID" prop="wwid">
                    <el-row>
                        <div>
                            <el-input v-model="shopform.wwid" ></el-input>
                        </div>
                        <el-link type="info">(店铺主旺旺ID绑定后无法修改)</el-link>
                    </el-row>
                </el-form-item>

                <el-form-item label="旺旺常用登录地" prop="wsitestr">
                    <el-input v-model="shopform.wsitestr" ></el-input>
                </el-form-item>
                <el-form-item label="所在地区" prop="address">

                    <el-input v-model="shopform.address" ></el-input>
                    <p>
                        <el-link type="danger" :underline="false">注意：必须带有“-”字段</el-link>
                    </p>
                </el-form-item>
                <el-form-item label="街道地址" prop="detailed_address">

                    <el-input v-model="shopform.detailed_address" type="textarea" rows="5"></el-input>
                </el-form-item>

                <el-form-item label="收货人手机" prop="phone">

                    <div>
                        <el-input v-model.number="shopform.phone" type="phone"></el-input>
                    </div>
                    <el-link type="info">(若无法选择请按Ctrl+F5键强制刷新页面，或者选用Chrome浏览器重试)</el-link>
                </el-form-item>

                <el-divider content-position="left">第二步：上传支付宝基本信息截图</el-divider>

                <el-form-item label="支付宝认证姓名" prop="shopurl">

                    <div>
                        <el-input v-model="shopform.shopurl" type="shopurl"></el-input>
                    </div>
                    <el-link type="info">绑定多个买号必须使用不同身份认证的支付宝账号，支付宝认证姓名只允许输入4个字以内的中文</el-link>
                </el-form-item>

                <el-form-item prop="zfbimgs">
                    <p><el-link type="danger" :underline="false">*</el-link>支付宝实名认证截图</p>
                    <div>
                        <el-upload
                                action="/api/Other/upload"
                                :data="{access_token:token}"
                                list-type="picture-card"
                                accept="image/*"
                                :on-success="zfbSuccess"
                                :on-remove="zfbRemove"

                                :file-list="shopform.zfbimgs"
                        >
                            <i class="el-icon-plus"></i>
                        </el-upload>
                        <el-dialog :visible.sync="dialogVisible">
                            <img width="100%" :src="dialogImageUrl" alt="">
                        </el-dialog>
                    </div>
                    <el-link type="info" :underline="false">请登录您的"支付宝"，点击"账户设置"，截取您的支付宝"基本信息"作为审核凭证，截图中的姓名必须和您填写的支付宝姓名保持一致</el-link>
                </el-form-item>
                <el-divider></el-divider>
                <el-row>
                    <el-button type="success" icon="el-icon-circle-check" @click="submitShop('shopform')">确认提交</el-button>
                    <el-button type="danger" icon="el-icon-circle-close" @click="sfsfn(false)">取消退出</el-button>
                </el-row>
            </el-form>


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
                    callback(new Error('支付宝认证姓名不能为空'));
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
                if(value==''){
                    callback(new Error('所在地区不能为空'));
                }else{
                    callback();
                }
            };

            var validateWsite=(rule, value, callback) => {
                if(value==''){
                    callback(new Error('旺旺常住地不能为空'));
                }else{

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

            var validateIp=(rule, value, callback) => {
                if (value.length===0) {
                    callback(new Error('IP所在地截图不能为空！'));
                } else {
                    callback();
                }
            };

            var validateWwimgs=(rule, value, callback) => {
                if (value.length===0) {
                    callback(new Error('旺旺个人档案截图不能为空！'));
                } else {
                    callback();
                }
            };


            var validateZfb=(rule, value, callback) => {
                if (value.length===0) {
                    callback(new Error('支付宝实名认证截图不能为空！'));
                } else {
                    callback();
                }
            };

            var checkPhone = (rule, value, callback) => {
                if (!value) {
                    return callback(new Error('手机号不能为空'));
                }
                setTimeout(() => {
                    if (!Number(value)) {
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

                dialogImageUrl:'',
                dialogVisible:false,



                wsite:{
                    pdata:'',
                    cdata:''
                },

                token:localStorage.getItem('token')||(()=>{this.$route.replace('/login')})(),
                member:{

                },
                shoprule:{
                    sex:[{required:true,message:'性别不能为空',trigger:'change'}],
                    zfbimgs:[
                        {
                            required:true,validator:validateZfb, trigger: 'change'
                        }
                    ],

                    wwimgs:[
                        {
                            required:true,validator:validateWwimgs, trigger: 'change'
                        }
                    ],
                    ipimgs:[
                        {
                            required:true,validator:validateIp, trigger: 'change'
                        }
                    ],
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

                    wsitestr:[
                        {
                            required:true,validator:validateWsite, trigger: 'change'
                        }
                    ],

                    address:[
                        {
                            required:true,validator:validateAddress, trigger: 'change'
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
                    sex:1,
                    wsite:'',


                    zfbimgs:[],

                    wwimgs:[],

                    ipimgs:[],

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
            console.log(this.$route,'路由最好的');
            var id=this.$route.query.id;
            if(id){
                this.popchnage(id);
            }

        },
        methods:{
            popchnage(id){

                var obj={id};

                this.$api.ports.editBuyNo(obj).then((res)=>{
                    console.log(res,'数据？');
                    if(res.code){


                        var getD=res.data[0];

                        var ipimgs=getD.ip_img.split(',').map((v,i)=>{
                            var name=v.slice(v.lastIndexOf('/')+1),url=v;
                            return {name,url}
                        });


                        var wwimgs=getD.wang_img.split(',').map((v,i)=>{
                            var name=v.slice(v.lastIndexOf('/')+1),url=v;
                            return {name,url}
                        });

                        var zfbimgs=getD.zhifu_img.split(',').map((v,i)=>{
                            var name=v.slice(v.lastIndexOf('/')+1),url=v;
                            return {name,url}
                        });

                        this.shopform={
                            detailed_address:getD.street,
                            sex:getD.sex,
                            type:getD.platform_type,
                            phone:getD.phone,
                            shopname:getD.name,
                            shopurl:getD.zhifu_name,
                            address:getD.location,
                            wsitestr:getD.often_area,
                            wwid:getD.wang_id,
                            id:getD.id,
                            ipimgs,wwimgs,zfbimgs
                        };

                    }else{

                        this.$notify.error(res.message);
                    }

                });
            },

            //ip所在截图
            ipSuccess(response, file, fileList){

                this.shopform.ipimgs=fileList;
            },
            ipRemove(file, fileList){
                this.shopform.ipimgs=fileList;
            },

            //旺旺个人档案截图
            wwSuccess(response, file, fileList){

                this.shopform.wwimgs=fileList;
            },
            wwRemove(file, fileList){
                this.shopform.wwimgs=fileList;
            },

            //支付宝实名认证截图
            zfbSuccess(response, file, fileList){

                this.shopform.zfbimgs=fileList;
            },
            zfbRemove(file, fileList){
                this.shopform.zfbimgs=fileList;
            },



            popfalse(index){
                this.shopData[index].change=false;
            },
            pdatafn(e){
                console.log(e,'change');
            },
            sfsfn(){
                this.$router.go(-1);
            },

            submitShop(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        var getR=this.shopform;

                        console.log(getR,'确认过');


                        //IP所在地截图
                        var ip_img=getR.ipimgs.map((cv,ci)=>{
                            return (cv.response?cv.response.data[0].filePath:cv.url)
                        }).join(',');

                        //旺旺截图
                        var wang_img=getR.wwimgs.map((cv,ci)=>{
                            return (cv.response?cv.response.data[0].filePath:cv.url)
                        }).join(',');

                        //支付宝截图
                        var zhifu_img=getR.zfbimgs.map((cv,ci)=>{
                            return (cv.response?cv.response.data[0].filePath:cv.url)
                        }).join(',');



                        var obj={
                            id:getR.id,
                            //平台类型
                            platform_type:getR.type,
                            //收货人姓名
                            name:getR.shopname,
                            //旺旺常用登录地
                            often_area:getR.wsitestr,
                            //支付宝姓名
                            zhifu_name:getR.shopurl,
                            //旺旺id
                            wang_id:getR.wwid,
                            //所在地区
                            location:getR.address,
                            //街道地址
                            street:getR.detailed_address,
                            //收货人手机
                            phone:getR.phone,
                            //性别
                            sex:getR.sex,

                            ip_img,wang_img,zhifu_img
                        }
                        console.log(obj,'参数');

                        this.$api.ports.doEditbuyNo(obj).then((res)=>{
                            if(res.code){
                                this.$alert('提交成功，待1~3天平台审核', '温馨提示', {
                                    confirmButtonText: '确定',
                                    callback: () => {
                                        this.$router.push("/maishou/account/");
                                    }
                                });
                            }else{
                                this.$message.error(res.message);
                            }
                        }).catch((err)=>{
                            console.log(err,'失败');
                        })
                    } else {
                        this.$notify.error('注意：带红色*都是必选项！');
                        return false;
                    }
                });
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


            //监听旺旺常用登录地
            "wsite.pdata"(){
                this.wsite.cdata='';
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