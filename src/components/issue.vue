<template>
    <div class="issue">

        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span class="c-topic">发布任务</span>
            </div>
            <div>
                <el-steps :active="stepS" finish-status="success" simple style="margin-top: 20px">

                    <el-step  v-for="(item,index) in steparr" :title="item.val" :key="index" >
                    </el-step>
                </el-steps>
                <ul class="step-content">
                    <li v-if="stepS==1">
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
                                                            <el-radio :label="1" class="w-sp">
                                                                手机淘宝任务无截图版任务
                                                                <span>用户在手机淘宝app下单，无需截图</span>
                                                                <el-popover
                                                                        placement="top-start"
                                                                        title="手机淘宝无图任务"
                                                                        width="200"
                                                                        trigger="click"
                                                                        content="常规推广方式，适合有基础销量的产品操作。建议多个关键词入口进行推广计划。严格控制入口转化率。">
                                                                    <el-button type="text" slot="reference" icon="el-icon-info" class="info-btn"></el-button>
                                                                </el-popover>
                                                            </el-radio>
                                                        </div>
                                                        <div class="tr-li">
                                                            <el-radio :label="2" class="w-sp">
                                                                <b>手机淘宝</b>浏览、收藏、加购物车、直通车
                                                            </el-radio>
                                                        </div>
                                                    </el-radio-group>
                                                </div>

                                                <div v-if="taskR===2">
                                                    <el-radio-group v-model="trCT" class="tr-ul">
                                                        <div class="tr-li">
                                                            <el-radio :label="1" class="w-sp">
                                                                <b>手机淘宝</b>浏览、收藏、加购物车、直通车（<span>全真人加购，不被屏蔽不降权。</span>）
                                                            </el-radio>
                                                        </div>
                                                        <div class="tr-li">
                                                            <el-radio :label="2" class="w-sp">
                                                                <b>手机京东</b>浏览、收藏、加购物车（<span class="danger-text">用户通过京东app浏览商品</span>）
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
                                            <div class="tr-li">
                                                <el-radio :label="1" class="w-sp">
                                                    <el-tag>淘宝</el-tag><span class="ws-name">木人子韦</span>
                                                </el-radio>
                                            </div>
                                            <div class="tr-li">
                                                <el-radio :label="2" class="w-sp">
                                                    <el-tag>拼多多</el-tag><span class="ws-name">瞧你咋地</span>
                                                </el-radio>
                                            </div>
                                        </el-radio-group>
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
                                            <div class="tr-li">
                                                <el-radio :label="2" class="w-sp">
                                                    <el-tag>拼多多</el-tag><span class="ws-name">瞧你咋地</span>

                                                </el-radio>
                                            </div>
                                        </el-radio-group>
                                    </el-card>
                                </el-timeline-item>
                            </el-timeline>
                            <el-form-item>
                                <el-button @click="submitForm('ruleForm')">下一步</el-button>
                            </el-form-item>
                        </el-form>

                    </li>

                    <li v-if="stepS==2">
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
                                <el-divider content-position="center">填写商品信息</el-divider>
                                <el-form-item label="商品名称" prop="name">
                                    <el-input v-model="taskForm.name" type="name"></el-input>
                                </el-form-item>
                                <el-form-item label="商品链接" prop="link">
                                    <el-input v-model="taskForm.link" type="link"></el-input>
                                </el-form-item>
                                <el-form-item label="商品主图" prop="pic">
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
                                </el-form-item>
                                <el-alert title="上传“商品主图”，确保与搜索页面展示的图片一致。" type="error" class="info-title"></el-alert>

                                <el-form-item label="单品实际成交价格">
                                    <el-row type="flex" justify="center">

                                        <el-input></el-input><span>元</span>
                                    </el-row>
                                </el-form-item>
                                <el-alert title="用户拍下时的付款价格，如不同等级买号看到商品价格不同，取最大值" type="error" class="info-title"></el-alert>
                                <el-divider></el-divider>
                                <el-form-item label="商品是否包邮">
                                    <el-radio-group v-model="taskForm.postage" class="tr-ul">
                                        <div class="tr-li">
                                            <el-radio :label="1" class="w-sp">
                                                商品不包邮 <span class="ws-name">商家每单额外支出10元作为运费押金，任务完成后剩余运费押金将全部退还给商家</span>
                                            </el-radio>
                                        </div>
                                        <div class="tr-li">
                                            <el-radio :label="2" class="w-sp">
                                                商品包邮
                                            </el-radio>
                                        </div>
                                    </el-radio-group>
                                </el-form-item>
                                <div>
                                    <el-button type="primary" @click="taskSub('taskForm')">下一步</el-button>
                                </div>
                            </div>


                        </el-form>
                    </li>
                </ul>
            </div>
        </el-card>
    </div>
</template>

<script>
    export default {
        name: "issue",
        data(){
            return {
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
        methods:{
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
            submitForm(){
                this.nextfn();
            },
            nextfn(){
                this.stepS++;

            }
        },
        watch:{
            stepS:function(to){
                if(to==2){
                    this.$message.info({duration:0,showClose:true,message:'任务期间请关闭淘宝客、村淘、分享有赏等淘客活动，若因淘客引起的佣金支出由商家自己承担'});
                }
            }
        }
    }
</script>

<style lang="less" scoped>
.info-title{
    margin:1rem 0;
}
.ws-name{
    margin:0 .5rem;
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