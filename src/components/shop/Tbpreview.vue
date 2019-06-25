<template>
    <div>
        <el-alert
                class="info-con"
                :title="bull.title"
                type="error"
        >
            <div>
                <p v-for="(item,index) in bull.list" :key="index">{{index+1}}.{{item}}</p>
            </div>
        </el-alert>

        <el-form label-width="auto" ref="taskForm" :rules="taskRules" :model="taskForm">
            <el-alert title="注意：带红色*是必填项！" type="info" class="info-title"></el-alert>
            <div>
                <div>

                    <el-divider content-position="center">第一步：填写商品信息</el-divider>
                    <div v-for="(fitem,findex) in taskForm.fval">
                        <div style="text-align:right;" v-if="findex>=1">
                            <i class="el-icon-circle-close c-i-close" @click="nsClose(findex)"></i>
                        </div>
                        <el-form-item label="商品名称" prop="fval">
                            <el-input v-model="fitem.name" type="fval"></el-input>
                        </el-form-item>
                        <el-form-item label="商品链接" prop="fval">
                            <el-input v-model="fitem.link" type="fval"></el-input>
                        </el-form-item>
                        <el-form-item label="商品主图" prop="fval">
                            <div @click="uploadfn('imgCount',findex)">

                                <el-upload
                                        action="/api/Other/upload"
                                        :data="{access_token:token}"
                                        list-type="picture-card"
                                        accept="image/*"
                                        :on-preview="handlePictureCardPreview"
                                        :on-success="imgSuccess" :on-remove="imgRemove">
                                    <i class="el-icon-plus"></i>
                                </el-upload>
                                <el-dialog :visible.sync="dialogVisible">
                                    <img width="100%" :src="dialogImageUrl" alt="">
                                </el-dialog>
                            </div>
                            <p class="danger-text">上传“商品主图”，确保与搜索页面展示的图片一致。</p>
                        </el-form-item>

                        <el-form-item label="单品实际成交价格" prop="fval">
                            <el-row type="flex" justify="center" align="midle" :gutter="20">
                                <el-col :span="5"><el-input v-model="fitem.aprice" type="fval"></el-input></el-col>
                                <el-col :span="2"><span>{{$store.state.mtext}}</span></el-col>
                                <el-col>用户拍下时的付款价格，如不同等级买号看到商品价格不同，取最大值</el-col>

                            </el-row>
                        </el-form-item>

                        <el-form-item label="每单拍" prop="fval">
                            <el-row type="flex" justify="center" align="midle" :gutter="20">
                                <el-col :span="5"><el-input v-model="fitem.beat" type="fval"></el-input></el-col>
                                <el-col :span="2"><span>个</span></el-col>
                                <el-col>每单总金额 {{$store.state.mtext}} <span class="info-text">【不含运费】</span></el-col>

                            </el-row>
                        </el-form-item>
                        <el-form-item label="手机搜索页面展示价格" prop="fval">
                            <el-row type="flex" justify="center" align="midle" :gutter="20">
                                <el-col :span="5"><el-input v-model="fitem.bprice" type="fval"></el-input></el-col>
                                <el-col :span="2"><span>{{$store.state.mtext}}</span></el-col>
                                <el-col><span class="info-text">务必亲自在手机端搜索，确认价格准确</span></el-col>

                            </el-row>
                        </el-form-item>
                        <el-divider></el-divider>
                    </div>
                    <!--<div>-->
                    <!--<el-button type="text" @click="addNS(3)">+增加附加商品</el-button>-->
                    <!--<span>(最多可增加{{3-taskForm.fval.length}}个商品)</span>-->
                    <!--</div>-->
                    <!--<el-divider></el-divider>-->
                    <el-form-item label="商品是否包邮" prop="postage">
                        <el-radio-group v-model="taskForm.postage" class="tr-ul" type="postage">
                            <div class="tr-li">
                                <el-radio :label="0" class="w-sp">
                                    商品不包邮 <span class="ws-name">商家每单额外支出10元作为运费押金，任务完成后剩余运费押金将全部退还给商家</span>
                                </el-radio>
                            </div>
                            <div class="tr-li">
                                <el-radio :label="1" class="w-sp">
                                    商品包邮
                                </el-radio>
                            </div>
                        </el-radio-group>

                    </el-form-item>

                </div>

                <div>
                    <el-divider content-position="center">第二步：设置如何找到商品</el-divider>
                    <div>

                        <el-form-item label="商品现有收货人数或付款人数约" prop="sell_num">
                            <el-row type="flex" justify="center" align="middle" :gutter="20">
                                <el-col :span="5"><el-input v-model="taskForm.sell_num" type="sell_num"></el-input> </el-col>
                                <el-col :span="2"><span>人</span></el-col>
                                <el-col><span class="info-text">此处为手机淘宝销量优先搜索列表页显示的收货人数</span></el-col>

                            </el-row>
                        </el-form-item>
                    </div>
                    <el-form-item label="价格区间" prop="search_price">
                        <el-row type="flex" justify="center" align="middle" :gutter="20">
                            <el-col :span="14">
                                <el-row type="flex" align="middle">
                                    <el-input v-model="taskForm.search_price.start" type="search_price"></el-input>
                                    <i class="el-icon-minus"></i>
                                    <el-input v-model="taskForm.search_price.end" type="search_end"></el-input>
                                </el-row>
                            </el-col>
                            <el-col :span="2"><span>{{$store.state.mtext}}</span></el-col>
                            <el-col><span class="info-text">务必亲自在手机端搜索，确认价格准确</span></el-col>

                        </el-row>
                    </el-form-item>
                    <el-form-item label="商品所在地" prop="cityvalue">
                        <el-select v-model="taskForm.cityvalue" placeholder="请选择" type="cityvalue">
                            <el-option
                                    v-for="item in cityoptions"
                                    :key="item.value"
                                    :label="item.text"
                                    :value="item.text">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="订单留言" prop="order_message">
                        <el-row type="flex" justify="center" align="middle" :gutter="20">
                            <el-col :span="10"><el-input v-model="taskForm.order_message" type="order_message"></el-input></el-col>
                            <el-col >
                                <el-row type="flex" align="middle">

                                    <el-popover
                                            placement="top-start"
                                            title="订单留言"
                                            width="200"
                                            trigger="click"
                                            content="如非必须建议不指定订单备注留言！因淘宝现在人工审核申诉订单时，会排查买家的订单留言内容及发货方式 是否匹配，出于安全性考虑，大家尽量通过订单号和买号来区分推广订单。">
                                        <el-button type="text" slot="reference" icon="el-icon-info" class="info-btn"></el-button>
                                    </el-popover><span class="info-text">用户拍下商品所需要填写的买家留言；出于安全考虑不建议大批量使用</span>
                                </el-row>
                            </el-col>

                        </el-row>
                    </el-form-item>
                </div>

                <div>
                    <el-divider content-position="center">第三步：选择任务类型和单数</el-divider>

                    <el-row>

                        <div>


                            <div class="box-card b-c-box">
                                <div slot="header">
                                    <el-row type="flex" align="middle">
                                        <el-alert :closable="false" title="选择添加推广任务类型"
                                                  type="success"
                                                  description="浏览任务关键词浏览数设置"
                                                  show-icon>

                                        </el-alert>
                                    </el-row>
                                </div>
                                <el-row type="flex" align="middle" class="b-c-box">

                                    <el-col>
                                        <el-row type="flex" align="middle">
                                            <el-row type="flex" align="middle">
                                                <span>开始日期</span>
                                                <div class="i-padding">
                                                    <el-date-picker type="date"
                                                                    placeholder="选择日期" v-model="preview.start"></el-date-picker>
                                                </div>
                                            </el-row>

                                            <el-row type="flex" align="middle">
                                                <span>任务天数</span>
                                                <div class="i-padding">
                                                    <el-input v-model.number="preview.days"></el-input>
                                                </div>
                                            </el-row>

                                        </el-row>
                                    </el-col>

                                    <el-col :span="5" class="danger-text" style="text-align:right;">总单量：{{previewAll}}</el-col>

                                </el-row>
                                <div>
                                    <div v-for="(item,index) in previewArr" class="c-item">
                                        <div style="text-align:right;" v-if="index>=1">
                                            <i class="el-icon-close c-i-close" @click="cClose('previewArr',index)"></i>
                                        </div>
                                        <el-row class="time-row">
                                            <el-col class="t-r-li" :lg="2" :sm="4" :xs="6" v-for="(jit,fin) in item.hours">
                                                <div class="trl-topic">
                                                    {{fin}}时
                                                </div>
                                                <div class="trl-frame">
                                                    <input class="ti-input" v-model.number="item.hours[fin]" @input="pAll(index)" />
                                                </div>
                                            </el-col>
                                        </el-row>
                                        <el-row :gutter="20" type="flex" align="middle">
                                            <el-col>
                                                <p>搜索关键词{{index+1}}</p>
                                                <el-input v-model="item.keyword" ></el-input>
                                            </el-col>

                                            <el-col>
                                                <p>添加预览{{index+1}}</p>
                                                <el-input :value="item.prevA" disabled></el-input>
                                            </el-col>
                                        </el-row>
                                        <el-divider></el-divider>
                                    </div>
                                    <div>
                                        <el-button type="text" @click="cAdd('previewArr',3)">+增加搜索关键词</el-button>
                                    </div>
                                    <el-row type="flex" align="middle">
                                        <el-checkbox v-model="preview.collect">收藏商品</el-checkbox>
                                        <el-checkbox v-model="preview.gocar">加购物车</el-checkbox>
                                        <div>
                                            <span class="danger-text">(0.8金/个)</span>
                                        </div>
                                    </el-row>
                                </div>
                            </div>
                        </div>
                    </el-row>

                </div>


                <div>
                    <el-row type="flex" align="middle" justify="center" :gutter="30" class="b-c-box">

                        <el-button type="primary" @click="nextfn(-1)">上一步</el-button>
                        <el-button type="primary" @click="submitNext('taskForm')">下一步</el-button>
                    </el-row>
                </div>
            </div>


        </el-form>
    </div>
</template>

<script>

    import base from '../../untils/base';

    import {provs_data} from 'lwarea';
    export default {
        props:['shops'],
        name: "Tbword",
        data(){
            var validateFval=(rule,value,callback)=>{
                if(value){
                    var judge=false;
                    for(var vi in value){
                        if(judge){break};
                        var v=value[vi];
                        for(var ind in v){
                            if(ind=='imgs'){
                                v[ind].length===0&&(judge=true)
                            }else{
                                v[ind]||(judge=true);
                            }
                        }
                    }
                    if(judge){
                        callback(new Error('带红色*是必填项！'));
                    }else{
                        callback();
                    }
                }else{
                    callback(new Error('商品信息不能为空!'));
                }
            };


            var validateSp=(rule,value,callback)=>{
                if(value){
                    if(value.start!=''&&Number(value.start)){
                        if(value.end!=''&&Number(value.end)){
                            if(Number(value.end)>Number(value.start)){
                                callback();
                            }else{
                                callback(new Error('最小价格不能大于最大价格'));
                            }
                        }else{
                            callback(new Error('请填写最大价格'));
                        }
                    }else{
                        callback(new Error('请填写最小价格'));
                    }

                }else{
                    callback(new Error('价格区间不能为空!'));
                }
            };

            var validatePostage=(rule,value,callback)=>{
                if(value>-1){
                    callback();
                }else{
                    callback(new Error('此项不能为空'));
                }
            };



            return {

                previewAll:0,
                preview:{
                    collect:'',
                    gocar:'',
                    start:'',
                    days:''
                },
                previewArr:[{
                    hours:Array(24).fill(0),
                    keyword:'',
                    prevA:0
                }],

                imposeObj:{
                    //地域限制
                    area:{
                        sel:true,
                        selV:[]
                    },
                    //性别限制
                    sex:{
                        sel:true,
                        selV:1
                    },
                    //钻石级别限制
                    only:{
                        sel:false
                    }
                },
                //千人千面设置
                impose:true,

                timearr:[
                    {
                        date:'',
                        minute:0,
                        count:0
                    }
                ],

                imgCount:-1,

                token:localStorage.getItem('token')||(()=>{this.$route.replace('/login')})(),

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

                newR:false,

                common:true,
                commonArr:[
                    {
                        search_word:'',
                        // payment:1,
                        than_word:''
                    }
                ],
                character:false,
                characterArr:[
                    {
                        search_word:'',
                        // payment:1,
                        than_word:'',
                        comment_ask:''
                    }
                ],

                picture:false,
                pictureArr:[
                    {
                        search_word:'',
                        // payment:1,
                        than_word:'',
                        comment_ask:'',
                        specification:'',
                        fileList:[]
                    }
                ],
                video:false,
                videoArr:[
                    {
                        search_word:'',
                        // payment:1,
                        than_word:'',
                        comment_ask:'',
                        specification:'',
                        fileList:[],
                        videoList:[]
                    }
                ],
                cityoptions: provs_data,
                cityvalue: '',
                // 商品主图
                dialogImageUrl: '',
                dialogVisible: false,
                taskForm:{
                    fval:[
                        {name:'',link:'',aprice:'',bprice:'',beat:'',imgs:[]}
                    ],
                    name:'',
                    link:'',
                    postage:-1,
                    search_price:{
                        start:'',
                        end:''
                    },
                    "real_price": "",//单品实际成交价格
                    "goods_count": "1",//每单拍
                    "show_price": "",//手机搜索页面展示价格
                    "cityvalue": "",//商品所在地
                    "order_message": "",//订单留言
                    "sell_num": "",//商品现有收货人数或付款人数约,

                    addM:''

                },
                taskRules:{

                    cityvalue:[
                        {required:true,message:'商品所在地不能为空',trigger:'change'}
                    ],
                    postage:[
                        {required: true,validator:validatePostage,trigger:['blur','change']}
                    ],
                    fval: [
                        {required: true,validator:validateFval,trigger:['blur','change']}
                    ],
                    search_price:[
                        {required: true,validator:validateSp,trigger:['blur','change']}
                    ],
                    real_price:[
                        {required:true,message:'单品实际成交价格不能为空',trigger:'blur'}
                    ],

                    goods_count:[
                        {required:true,message:'每单拍不能为空',trigger:'blur'}
                    ],

                    show_price:[
                        {required:true,message:'手机搜索页面展示价格不能为空',trigger:'blur'}
                    ],

                    searh_start_price:[
                        {required:true,message:'价格最小区间不能为空',trigger:'blur'}
                    ],

                    searh_end_price:[
                        {required:true,message:'价格最大区间不能为空',trigger:'blur'}
                    ],

                    sell_num:[
                        {required:true,message:'此项不能为空',trigger:'blur'}
                    ],

                    order_message:[
                        {required:true,message:'订单留言不能为空',trigger:'blur'}
                    ],

                    link: [
                        { required: true, message: '注意：选择的店铺名核对准确，不要填错链接', trigger: 'blur' }
                    ]
                },

                "empty_parcel_serve": {//空包服务
                    "parcel_weight": '',//包裹重量
                    "post_type": ''//快递类型
                },


                chooseP:1,
                chooseS:-1,
                taskR:1,
                trC:1,
                trCT:1,
                bull:{
                    title:'所有商家都要注意在销量110推广务必严格控制好以下几点：',
                    list:['物流一定要有真实物流记录，一定要有全程重量并且重量跟真实商品一致！一定不要网上买那些小快递的，便宜的空包（稽查系统在不断升级，有些以前没出事不代表现在或以后没事）；目前可以选用平台提供的空包（不要信当地快递网点手动输入的重量，当地网点无法控制包裹在中转站和到达点的重量统计）',
                        '推广比例一定不要过高，最高最高不能超过40%',
                        '移动端搜索转化率务必不要过高，保持在行业平均转化率的1.5倍左右最佳',
                        '推广期间请务必关掉商品淘客佣金，推广过程有诸多不确定因素可能导致产生佣金可能造成您的损失。'
                    ]
                },
                stepS:2,
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
            console.log(this.shops,'shops');
        },
        methods:{

            pAll(selI){
                var to=this.previewArr,selA=to[selI],days=Number(this.preview.days)||0;


                if(selA){
                    //该选项的预览量
                    var selAll=0,all=0;
                    selA.hours.forEach((val,ind)=>{
                        selAll+=Number(val)||0;
                    })
                    selA.prevA=selAll;

                    //总单量
                    to.forEach((v,i)=>{

                        all+=(Number(v.prevA))*days;

                        this.previewAll=all;
                    })
                }
            },

            uploadfn(ind,val){
                this[ind]=val;
                console.log(this[ind],'index');
            },
            //图片
            cISuccess(response, file, fileList){
                if(this.pictureArr[this.imgCount]){
                    this.pictureArr[this.imgCount].fileList=fileList;
                }
            },
            cIRemove(file, fileList){
                if(this.pictureArr[this.imgCount]){
                    this.pictureArr[this.imgCount].fileList=fileList;
                }
            },

            //视频好评里的视频
            videoSuccess(response, file, fileList){
                if(this.videoArr[this.imgCount]){
                    this.videoArr[this.imgCount].videoList=fileList;
                }
            },
            videoRemove(file, fileList){
                if(this.videoArr[this.imgCount]){
                    this.videoArr[this.imgCount].videoList=fileList;
                }
            },
            //视频好评里的图片
            cIVSucc(response, file, fileList){
                if(this.videoArr[this.imgCount]){
                    this.videoArr[this.imgCount].fileList=fileList;
                }
            },
            cIVRemo(file, fileList){
                if(this.videoArr[this.imgCount]){
                    this.videoArr[this.imgCount].fileList=fileList;
                }
            },

            imgSuccess(response, file, fileList){
                if(this.taskForm.fval[this.imgCount]){
                    this.taskForm.fval[this.imgCount].imgs=fileList;
                }
                console.log(response, file, fileList,'上传');
            },
            imgRemove(file, fileList){

                if(this.taskForm.fval[this.imgCount]){
                    this.taskForm.fval[this.imgCount].imgs=fileList;
                }
                console.log(fileList,'移除');
            },

            submitNext(formName){

                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        var getD=this.taskForm,browse_calendar=[],task={
                            task_type:5,
                            explain:this.remark
                        };

                        //新版发布时间设置
                        if(this.newR){
                            var clearArr=[];

                            var cA=this.timearr,judge=false;
                            for(var vi in cA){
                                if(judge){break};
                                var v=cA[vi];
                                for(var ind in v){
                                    v[ind]||(judge=true);
                                }
                            }
                            if(judge){
                                this.$alert('亲，你所选择的新版发布时间设置信息请把它填满！', '温馨提示', {
                                    confirmButtonText: '确定',
                                    callback: action => {}
                                });
                                return false;
                            }
                            task.plan=cA.map((v)=>{
                                return {
                                    "start_at": (Date.parse(v.date)/1000),//开始时间
                                    "time_interval": v.minute,//每隔分钟
                                    "task_num": v.count// 共放几单
                                }
                            });

                        }else{
                            delete task.plan;
                        }

                        //任务置顶
                        if(this.istop){
                            task.is_top=1
                        }else{

                            delete task.istop;
                        }



                        //是否加赏任务佣金
                        if(this.taskForm.addM){
                            task.add=this.taskForm.addM
                        }else{

                            delete task.add;
                        }

                        //空包服务
                        var eps=this.empty_parcel_serve;
                        if(eps.parcel_weight&&eps.post_type){
                            task.empty_parcel_serve=eps;
                        }else{

                            delete task.empty_parcel_serve;
                        }

                        var io=this.imposeObj;

                        //地域限制
                        if(io.area.sel){
                            task.restrict_area=io.area.selV.join(',')

                        }else{
                            delete task.restrict_area;
                        }

                        //性别限制

                        if(io.sex.sel){
                            task.restrict_sex=io.sex.selV

                        }else{
                            delete task.restrict_sex;
                        }

                        //级别购买

                        if(io.only.sel){
                            task.restrict_level=io.sex.selV

                        }else{
                            delete task.restrict_level;
                        }

                        if(this.shops){
                            task.shop_wang_id=this.shops.wid;
                            task.platform_type=this.shops.type;
                        }else{

                            this.$notify.error('选择的店铺数据出现错误！');
                            return false;
                        }




                        console.log(this.previewAll,'previewAll',this.previewArr);



                        var pv=this.preview;

                        if(!pv.start){

                            this.$alert('开始日期不能为空', '提示', {
                                confirmButtonText: '确定',
                                callback: () => {
                                }
                            });
                            return false;
                        }else if(!pv.days){

                            this.$alert('选择天数不能为空', '提示', {
                                confirmButtonText: '确定',
                                callback: () => {
                                }
                            });
                            return false;
                        }

                        console.log(pv,'pv');



                        var cA=this.previewArr,judge=false;
                        for(var vi in cA){
                            if(judge){break};
                            var v=cA[vi];
                            for(var ind in v){
                                v[ind]||(judge=true);
                            }
                        }
                        if(judge){
                            this.$alert('亲，你所填写的任务时间信息请把它填满！', '温馨提示', {
                                confirmButtonText: '确定',
                                callback: action => {}
                            });
                            return false;
                        }
                        browse_calendar=cA.map((v)=>{
                            var clobj={};

                            v.hours.forEach((fv,fi)=>{
                                if(fv){
                                    clobj[fi]=fv;
                                }
                            });

                            return {
                                "start_day": (Date.parse(pv.start)/1000),//开始时间
                                "day_count":pv.days,
                                "search_word":v.keyword,
                                "calendar":clobj
                            }
                        });



                        //收藏商品
                        if(pv.collect){
                            task.is_favorites=1;
                        }else{
                            delete task.is_favorites;
                        }

                        //加购物车
                        if(pv.gocar){
                            task.gocar=1;
                        }else{
                            delete task.gocar;
                        }


                        var garr=getD.fval[0].imgs;

                        var gcarr=garr.map((cv)=>{
                            return (cv.response.data[0].filePath)
                        });



                        var obj={
                            "goods": {
                                "goods_name": getD.fval[0].name,
                                "goods_link": getD.fval[0].link,
                                "goods_img": gcarr.join(','),
                                "real_price": getD.fval[0].aprice,//单品实际成交价格
                                "goods_count": getD.fval[0].beat,//每单拍
                                "show_price": getD.fval[0].bprice,//手机搜索页面展示价格
                                "searh_start_price": getD.search_price.start,//价格区间
                                "searh_end_price": getD.search_price.end,//价格区间
                                "goods_location": getD.cityvalue,//商品所在地
                                "order_message": getD.order_message,//订单留言
                                "sell_num": getD.sell_num,//商品现有收货人数或付款人数约
                                "is_post": getD.postage//商品是否包邮(0否1是)
                            },
                            browse_calendar,
                            task
                        };


                        this.$api.ports.addTask({
                            data:JSON.stringify(obj)
                        }).then((res)=>{
                            if(res.code){
                                console.log(res,'你还');
                                this.$notify.success('添加成功');
                                this.$store.dispatch('setTid',{id:res.data[0].id});
                                this.nextfn(1);
                            }else{

                                this.$notify.error(res.message);
                            }

                        });
                        console.log(obj,'obj')
                    } else {
                        this.$message.error('注意：带红色*号都是必填项');
                        return false;
                    }
                });
            },
            //增加附加商品
            addNS(arrc,keyc){
                var arr=this.taskForm.fval;
                if(arr) {
                    if (arr.length < arrc) {
                        switch (keyc) {
                            default:
                                arr.push({
                                    name: '',
                                    link: ''
                                });
                        }

                    } else {
                        this.$alert('最多只能添加' + arrc + '条', '提示', {
                            confirmButtonText: '确定',
                            callback: () => {
                            }
                        });
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
                            default:arr.push({
                                hours:Array(24).fill(0),
                                keyword:'',
                                prevA:0
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
            nsClose(arri){
                var arr=this.taskForm.fval;
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
            }
        },
        watch:{

            "preview.days":function(to){this.pAll(0);},
            stepS:function(to){
                if(to==2){
                    this.$message.info({duration:0,showClose:true,message:'任务期间请关闭淘宝客、村淘、分享有赏等淘客活动，若因淘客引起的佣金支出由商家自己承担'});
                }
            }
        }
    }
</script>

<style lang="less" scoped>
    .t-r-li{
        border:1px solid #eee;
    }
    .trl-topic{
        line-height:4;
        background-color:#909399;
        width:100%;
        text-align:center;
        color:#fff;
        font-size:1rem;
    }
    .ti-input{


        border:none;
        outline:none;
        box-shadow:none;
        line-height:4;
        width:100%;
        text-align:center;
        font-size:1rem;
    }



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