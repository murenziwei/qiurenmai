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
                    <el-form-item label="商品名称" prop="name">
                        <el-input v-model="taskForm.name" type="name"></el-input>
                    </el-form-item>
                    <el-form-item label="商品链接" prop="link">
                        <el-input v-model="taskForm.link" type="link"></el-input>
                    </el-form-item>
                    <el-form-item label="商品主图" prop="pic">
                        <div>

                            <el-upload
                                    action="/src/assets"
                                    list-type="picture-card"
                                    :on-preview="handlePictureCardPreview"
                                    :on-remove="handleRemove">
                                <i class="el-icon-plus"></i>
                            </el-upload>
                            <el-dialog :visible.sync="dialogVisible">
                                <img width="100%" :src="dialogImageUrl" alt="">
                            </el-dialog>
                        </div>
                        <p class="danger-text">
                            上传“商品主图”，确保与搜索页面展示的图片一致。
                        </p>
                    </el-form-item>
                    <el-form-item label="手机搜索页面展示价格">
                        <el-row type="flex" justify="center" align="midle" :gutter="20">
                            <el-col :span="5"><el-input></el-input></el-col>
                            <el-col :span="2"><span>{{$store.state.mtext}}</span></el-col>
                            <el-col><span class="info-text">务必亲自在手机端搜索，确认价格准确</span></el-col>

                        </el-row>
                    </el-form-item>
                </div>
                <div>
                    <el-divider content-position="center">第二步：设置如何找到商品</el-divider>
                    <div>

                        <el-form-item label="商品现有收货人数或付款人数约">
                            <el-row type="flex" justify="center" align="middle" :gutter="20">
                                <el-col :span="5"><el-input></el-input> </el-col>
                                <el-col :span="2"><span>人</span></el-col>
                                <el-col><span class="info-text">此处为手机淘宝销量优先搜索列表页显示的收货人数</span></el-col>

                            </el-row>
                        </el-form-item>
                    </div>
                    <el-form-item label="价格区间">
                        <el-row type="flex" justify="center" align="middle" :gutter="20">
                            <el-col :span="14"><el-row type="flex" align="middle"><el-input></el-input><i class="el-icon-minus"></i><el-input></el-input></el-row> </el-col>
                            <el-col :span="2"><span>{{$store.state.mtext}}</span></el-col>
                            <el-col><span class="info-text">务必亲自在手机端搜索，确认价格准确</span></el-col>

                        </el-row>
                    </el-form-item>
                    <el-form-item label="商品所在地">
                        <el-select v-model="cityvalue" placeholder="请选择">
                            <el-option
                                    v-for="item in cityoptions"
                                    :key="item.value"
                                    :label="item.text"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="订单留言">
                        <el-row type="flex" justify="center" align="middle" :gutter="20">
                            <el-col :span="10"><el-input></el-input></el-col>
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
                        <el-button type="primary" @click="nextfn(1)">下一步</el-button>
                    </el-row>
                </div>
            </div>


        </el-form>
    </div>
</template>

<script>
    import {provs_data} from 'lwarea';
    export default {
        name: "Tbpreview",

        data(){
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
                stepS:1,
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