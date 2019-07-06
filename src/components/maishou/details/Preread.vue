<template>
    <div class="container">

        <el-card class="box-card">
            <div slot="header" class="clearfix xs-hidden-up">
                <span>{{steps[selectA]}}</span>
            </div>
            <div>
                <div class="xs-hidden-down">

                    <el-steps :active="selectA" finish-status="success" simple style="margin-top: 20px">
                        <el-step v-for="(sv) in steps" :title="sv" ></el-step>
                    </el-steps>
                    <el-divider></el-divider>
                </div>
                <div>
                    <el-alert type="info">
                        <p>
                            任务信息（模拟正常购物刘成，通过搜索商品关键字，锁定商品大致范围）
                        </p>
                        <p>
                            你当前接手任务的<el-link type="danger">{{detail.data.task_type|shoptype}}</el-link>
                            买号为 “<el-link type="danger">{{detail.data.wangwang_id||'**'}}</el-link>”

                        </p>
                        <p>
                            任务计时：00:00
                        </p>

                        <ul>

                            <li>
                                任务编号：<el-link type="danger">{{detail.data.id||'**'}}</el-link>
                            </li>
                            <li>
                                接受任务的买号：<el-link type="danger">{{detail.data.wangwang_id||'**'}}</el-link>
                            </li>
                            <li>
                                本次1个任务完成后台将获得：<el-link type="danger">{{detail.data.real_commission||'**'}}佣金</el-link>
                            </li>
                            <li>
                                <p>
                                    商家备注说明：{{detail.data.explain||'**'}}
                                </p>
                            </li>
                        </ul>
                    </el-alert>
                    <div v-if="selectA==1">

                        <div>
                            <el-divider content-position="center">
                                第一步、搜索类目词
                            </el-divider>
                            <el-row :gutter="20">
                                <el-col :xs="24" :sm="12">
                                    <ul>
                                        <li>
                                            打开【 <el-link type="danger" :underline="false">手机淘宝</el-link> 】APP
                                        </li>
                                        <li>
                                            登录买家账号：<el-link type="danger" :underline="false">{{detail.data.wangwang_id||'**'}}</el-link>
                                        </li>
                                        <li>
                                            在APP顶部搜索框搜索关键字：

                                            <el-link type="danger" :underline="false">{{detail.comment_info?detail.comment_info.search_word:'**'}}</el-link>
                                        </li>
                                    </ul>
                                </el-col>
                                <el-col :xs="24" :sm="12">
                                    <div>
                                        <el-image :src="$store.state.urlimg"></el-image>
                                    </div>
                                </el-col>
                            </el-row>

                            <el-divider content-position="center">
                                第二步、浏览商品+货比一家
                            </el-divider>
                            <el-row :gutter="20">
                                <el-col :xs="24" :sm="12">
                                    <p>
                                        货币1家商品（各浏览30秒以上）
                                    </p>
                                    <p>
                                        浏览店铺主商品，浏览1分钟以上（主图、详情页、评论、视频）
                                    </p>
                                    <p>
                                        是否加入收藏夹：{{detail.data.is_favorites?'是':'否'}}
                                    </p>
                                    <p>
                                        是否加入购物车：{{detail.data.is_shopping_trolley?'是':'否'}}
                                    </p>
                                </el-col>
                                <el-col :xs="24" :sm="12">
                                    <div>
                                        <el-image :src="detail.data.goods_img"></el-image>
                                    </div>
                                </el-col>
                            </el-row>
                            <el-divider></el-divider>

                            <el-alert title="注意" type="info" :closable="false">
                                <ul>
                                    <li>
                                        若你在拼多多使用的不是“账号{{detail.data.wangwang_id||'**'}}”接手当前任务，本次任务佣金将全部扣除，并处罚1点虚拟币；账号封禁7天不可接手任务
                                    </li>
                                    <li>
                                        接手任务后放弃任务则扣除1个虚拟币
                                    </li>
                                    <li>
                                        买手接手手机单任务时，在未到最好一步（去支付）之前，不要着急将购物车中的商品下单付款，对比商家信息是否正确
                                        <p>
                                            以免发生拍错、漏拍等情状，若商家投诉第一次扣除2个点点或是冻结账号2天；第二次扣除2和点点冻结账号5天；
                                            第三次扣除2个卖点冻结账号10天
                                        </p>
                                    </li>
                                </ul>
                            </el-alert>

                            <el-divider></el-divider>
                            <el-row>
                                <el-button type="primary" @click="nextfn(1)">下一步</el-button>
                            </el-row>

                        </div>
                    </div>

                    <div v-if="selectA==2">

                        <div>
                            <el-divider content-position="center">
                                第三步、联系客服
                            </el-divider>
                            <el-row :gutter="20">
                                <el-col :xs="24" :sm="12">
                                    <ul>
                                        <li>
                                           浏览完成后请使用旺旺：联系卖家在线客服，至少问1个问题
                                            <p>然后 <el-link type="danger" :underline="false">收藏+加购+关注店铺（需要截图），（如备注说明无需假聊则可以省略）</el-link></p>
                                            <p>
                                                加购规格型号：{{detail.comment_info?detail.comment_info["specification"]:'**'}}
                                            </p>
                                            <p>
                                                成交金额：{{detail.data.real_price||'**'}}
                                            </p>
                                            （如果没有，则按照商品单排实际成交价格的SKU下单）
                                        </li>
                                    </ul>
                                </el-col>
                                <el-col :xs="24" :sm="12">
                                    <div>
                                        <el-image :src="$store.state.urlimg"></el-image>
                                    </div>
                                </el-col>
                            </el-row>
                            <el-divider></el-divider>

                            <el-alert title="注意" type="info" :closable="false">
                                <ul>
                                    <li>
                                        若你在拼多多使用的不是“账号{{detail.data.wangwang_id||'**'}}”接手当前任务，本次任务佣金将全部扣除，并处罚1点虚拟币；账号封禁7天不可接手任务
                                    </li>
                                    <li>
                                        接手任务后放弃任务则扣除1个虚拟币
                                    </li>
                                </ul>
                            </el-alert>

                            <el-divider></el-divider>
                            <el-row>

                                <el-button type="primary" @click="nextfn(-1)">上一步</el-button>
                                <el-button type="primary" @click="nextfn(1)">下一步</el-button>
                            </el-row>

                        </div>
                    </div>

                    <div v-if="selectA==3">

                        <div>
                            <el-divider content-position="center">
                                第四步、下单上传截图
                            </el-divider>
                            <el-form label-position="top" ref="form" :rules="formRule" :model="form">
                                <p>下单需在留言处留言</p>
                                <p>
                                    订单留言：<el-link type="danger">订单留言</el-link>
                                </p>
                                <el-form-item label="订单号" prop="order_no">
                                    <el-input v-model="form.order_no"></el-input>
                                </el-form-item>
                                <el-form-item label="用户垫付金额" prop="real_pay">
                                    <el-input v-model.number="form.real_pay"></el-input>
                                </el-form-item>

                                <el-row>
                                    <el-col :xs="24" :sm="12">
                                        <el-form-item label="搜索框截图" prop="search_img">
                                            <div>

                                                <el-upload
                                                        class="upload-demo"
                                                        action="/api/Other/upload"
                                                        accept="image/*"
                                                        :data="{access_token:token}"
                                                        list-type="picture-card"
                                                        :on-success="searchSuccess"
                                                        :on-remove="searchRemove"

                                                >
                                                    <i class="el-icon-plus"></i>

                                                    <div slot="tip" class="el-upload__tip">上传“商品主图”，确保与搜索页面展示的图片一致</div>
                                                </el-upload>
                                                <el-dialog :visible.sync="dialogVisible">
                                                    <img width="100%" :src="dialogImageUrl" alt="">
                                                </el-dialog>
                                            </div>
                                        </el-form-item>
                                    </el-col>

                                    <el-col :xs="24" :sm="12">
                                        <el-form-item label="足迹截图" prop="record_img">
                                            <div>

                                                <el-upload
                                                        class="upload-demo"
                                                        action="/api/Other/upload"
                                                        accept="image/*"
                                                        :data="{access_token:token}"
                                                        list-type="picture-card"
                                                        :on-success="recordSuccess"
                                                        :on-remove="recordRemove"

                                                >
                                                    <i class="el-icon-plus"></i>

                                                    <div slot="tip" class="el-upload__tip">上传“商品主图”，确保与搜索页面展示的图片一致</div>
                                                </el-upload>
                                                <el-dialog :visible.sync="dialogVisible">
                                                    <img width="100%" :src="dialogImageUrl" alt="">
                                                </el-dialog>
                                            </div>
                                        </el-form-item>
                                    </el-col>

                                    <el-col :xs="24" :sm="12" v-if="detail.data.is_shopping_trolley">
                                        <el-form-item label="购物车截图" prop="follow_img">
                                            <div>

                                                <el-upload
                                                        class="upload-demo"
                                                        action="/api/Other/upload"
                                                        accept="image/*"
                                                        :data="{access_token:token}"
                                                        list-type="picture-card"
                                                        :on-success="followSuccess"
                                                        :on-remove="followRemove"

                                                >
                                                    <i class="el-icon-plus"></i>

                                                    <div slot="tip" class="el-upload__tip">上传“商品主图”，确保与搜索页面展示的图片一致</div>
                                                </el-upload>
                                                <el-dialog :visible.sync="dialogVisible">
                                                    <img width="100%" :src="dialogImageUrl" alt="">
                                                </el-dialog>
                                            </div>
                                        </el-form-item>
                                    </el-col>

                                    <el-col :xs="24" :sm="12" v-if="detail.data.is_favorites">
                                        <el-form-item label="收藏夹截图" prop="favorites_img">
                                            <div>

                                                <el-upload
                                                        class="upload-demo"
                                                        action="/api/Other/upload"
                                                        accept="image/*"
                                                        :data="{access_token:token}"
                                                        list-type="picture-card"
                                                        :on-success="favoritesSuccess"
                                                        :on-remove="favoritesRemove"

                                                >
                                                    <i class="el-icon-plus"></i>

                                                    <div slot="tip" class="el-upload__tip">上传“商品主图”，确保与搜索页面展示的图片一致</div>
                                                </el-upload>
                                                <el-dialog :visible.sync="dialogVisible">
                                                    <img width="100%" :src="dialogImageUrl" alt="">
                                                </el-dialog>
                                            </div>
                                        </el-form-item>
                                    </el-col>

                                </el-row>
                            </el-form>

                            <el-divider></el-divider>
                            <el-alert title="注意" type="info" :closable="false">
                                <ul>
                                    <li>
                                        若你在拼多多使用的不是“账号{{detail.data.wangwang_id||'**'}}”接手当前任务，本次任务佣金将全部扣除，并处罚1点虚拟币；账号封禁7天不可接手任务
                                    </li>
                                    <li>
                                        接手任务后放弃任务则扣除1个虚拟币
                                    </li>
                                    <li>
                                        买手接手手机单任务时，在未到最好一步（去支付）之前，不要着急将购物车中的商品下单付款，对比商家信息是否正确
                                        <p>
                                            以免发生拍错、漏拍等情状，若商家投诉第一次扣除2个点点或是冻结账号2天；第二次扣除2和点点冻结账号5天；
                                            第三次扣除2个卖点冻结账号10天
                                        </p>
                                    </li>
                                </ul>
                            </el-alert>

                            <el-divider></el-divider>
                            <el-row>

                                <el-button type="primary" @click="nextfn(-1)">上一步</el-button>

                                <el-button type="primary" @click="submitThree('form')">下一步</el-button>
                            </el-row>

                        </div>
                    </div>
                    <div v-if="selectA==4">

                        <el-alert
                                style="margin:1rem 0;"
                                title="温馨提示"
                                type="success"
                                description="恭喜你完成了任务！待商家确认！"
                                show-icon>
                        </el-alert>

                        <el-link href="#/maishou/" target="_blank" class="retM" :underline="false">返回买手</el-link>
                    </div>
                </div>
            </div>
        </el-card>

    </div>
</template>

<script>
    import ajax from 'axios';
    export default {
        name: 'preread',
        props:['id','status'],
        data() {
            function often(message){

                return (rule, value, callback) => {
                    if (value.length===0) {
                        callback(new Error(message));
                    } else {
                        callback();
                    }
                };

            }
            return {

                token:localStorage.getItem('token')||(()=>{this.$route.replace('/login')})(),

                //第三步表单字符
                form:{
                    //拼多多订单号
                    order_no:'',
                    //用户垫付金额
                    real_pay:'',
                    //搜索框截图
                    search_img:[],
                    //店铺关注截图
                    follow_img:[],
                    //足迹截图
                    record_img:[],
                    //收藏夹截图
                    favorites_img:[]
                },
                formRule:{
                    order_no:[
                        {
                            required:true,message:'订单号不能为空',trigger:'blur'
                        }
                    ],
                    real_pay:[
                        {
                            required:true,message:'用户垫付金额不能为空',trigger:'blur'
                        },
                        {
                            type:'number',message:'用户垫付金额格式错误！',trigger:'blur'
                        }
                    ],
                    search_img:[
                        {
                            required:true,validator:often('搜索框截图不能为空'), trigger: 'change'
                        }
                    ],
                    order_img:[
                        {
                            required:true,validator:often('订单截图不能为空'), trigger: 'change'
                        }
                    ],
                    follow_img:[
                        {
                            required:true,validator:often('购物车截图不能为空'), trigger: 'change'
                        }
                    ],
                    record_img:[
                        {
                            required:true,validator:often('足迹截图不能为空'), trigger: 'change'
                        }
                    ],
                    favorites_img:[
                        {
                            required:true,validator:often('收藏夹截图不能为空'), trigger: 'change'
                        }
                    ]
                },

                dialogImageUrl: '',
                dialogVisible: false,

                selectA:1,
                steps:[
                    "货比商品",
                    "主商品浏览",
                    "下单上传截图",
                    "待商家确认"
                ],
                detail:{
                    shop_name:'',
                    comment_info:{},
                    data:{}
                }
            }
        },
        filters:{

            strno:function(value){
                if(typeof value=='string'&&value.length>4){
                    var arr=value.split('');
                    var newarr=arr.splice(3);
                    value=newarr.join('');
                    value='***'+value;
                    return value;
                }else{
                    return '***'
                }
            },

            shoptype:function(value){
                var del='**';
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
                var del='**';
                switch (value){
                    case 1:del='淘宝';break;
                    case 3:del='拼多多';break;
                }
                return del;
            }
        },
        created(){

            ajax.all([this.go_detail()]);
        },
        components: {
        },
        methods: {

            //搜索截图
            searchSuccess(response, file, fileList){

                this.form.search_img=fileList;
            },
            searchRemove(file, fileList){
                this.form.search_img=fileList;
            },
            //订单截图
            orderSuccess(response, file, fileList){

                this.form.order_img=fileList;
            },
            orderRemove(file, fileList){
                this.form.order_img=fileList;
            },
            //店铺关注截图
            followSuccess(response, file, fileList){

                this.form.follow_img=fileList;
            },
            followRemove(file, fileList){
                this.form.follow_img=fileList;
            },
            //足迹截图
            recordSuccess(response, file, fileList){

                this.form.record_img=fileList;
            },
            recordRemove(file, fileList){
                this.form.record_img=fileList;
            },
            //收藏夹截图
            favoritesSuccess(response, file, fileList){

                this.form.favorites_img=fileList;
            },
            favoritesRemove(file, fileList){
                this.form.favorites_img=fileList;
            },



            submitThree(formName){
                console.log(this.form,'form');
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        var getR=this.form;
                        console.log(getR,'getR');
                        //搜索框截图
                        var search_img=getR.search_img.map((cv)=>{
                            return (cv.response?cv.response.data[0].filePath:cv.url)
                        }).join(',');


                        //足迹截图
                        var record_img=getR.record_img.map((cv)=>{
                            return (cv.response?cv.response.data[0].filePath:cv.url)
                        }).join(',');

                        //店铺关注截图
                        var follow_img=getR.follow_img.map((cv)=>{
                            return (cv.response?cv.response.data[0].filePath:cv.url)
                        }).join(',');


                        //收藏夹截图
                        var favorites_img=getR.favorites_img.map((cv)=>{
                            return (cv.response?cv.response.data[0].filePath:cv.url)
                        }).join(',');

                        var obj={
                            task_id:Number(this.id),
                            order_no:getR['order_no'],
                            real_pay:getR.real_pay,
                            search_img,
                            record_img
                        }
                        if(this.detail.data.is_favorites){
                            //收藏夹截图
                            var favorites_img=getR.favorites_img.map((cv)=>{
                                return (cv.response?cv.response.data[0].filePath:cv.url)
                            }).join(',');
                            obj.favorites_img=favorites_img;
                        }
                        if(this.detail.data.is_shopping_trolley){

                            //购物车截图
                            var follow_img=getR.follow_img.map((cv)=>{
                                return (cv.response?cv.response.data[0].filePath:cv.url)
                            }).join(',');
                            obj.shopping_trolley_img=follow_img;
                        }



                        console.log(obj,'obj');
                        this.$api.ports.uploadImgs(obj).then((res)=>{

                            console.log(res,'是佛');
                            if(res.code){

                                this.$alert('提交成功，待1~3天平台审核', '温馨提示', {
                                    confirmButtonText: '确定',
                                    callback: () => {this.nextfn(1);
                                    }
                                });
                            }else{
                                this.$message.error(res.message);
                            }
                        }).catch((err)=>{
                            console.log(err,'失败');
                        })
                    } else {
                        this.$notify.error("注意：带红色*是必填项！");
                        return false;
                    }
                });
            },
            statusFn(val){
                var f=-1;
                switch (val){
                    case 1:;
                    case 2:f=1;break;
                    case 3:;
                    case 4:;
                    case 5:;
                    case 6:f=4;break;
                }
                this.selectA=Number(f);
            },
            go_detail(){
                return this.$api.ports.taskData({id:this.id}).then((res)=>{


                    if(res.code){

                        this.statusFn(res.data[0].data.status);
                        this.detail=res.data[0];
                    }else{
                        this.$notify.error(res.message);
                    }
                });
            },

            nextfn(i){
                this.selectA+=i;
            },

            handleRemove(file, fileList) {
                console.log(file, fileList);
            },
            handlePictureCardPreview(file) {
                this.dialogImageUrl = file.url;
                this.dialogVisible = true;
            }
        }
    }
</script>

<style lang="less" scoped>
    .retM{
        font-size:3rem;
        margin:1rem auto;
    }
    .danger-text{
        color:#f78989;
    }
    @media screen and (min-width:767px){
        .xs-hidden-up{
            display:none;
        }
    }

    @media screen and (max-width:767px){
        .xs-hidden-down{
            display:none;
        }
    }

    .container {
        text-align:left;
        ul{
            padding-left:1rem;
            list-style:cjk-ideographic;
            margin-left:0rem;
        }
    }
</style>