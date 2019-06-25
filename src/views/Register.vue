<template>
    <div class="register">
        <el-card :body-style="{padding:'0',borderRadius:0}">
            <el-row type="flex" justify="space-between" align="middle" >
                <el-col :span="18">
                    <el-row type="flex" align="middle">
                        <el-col>
                            <el-image :src="this.$store.state.urlimg" class="lo-left-img"></el-image>
                        </el-col>
                        <el-col class="lo-left-text">
                            最正规的兼职平台
                        </el-col>
                    </el-row>

                </el-col>
                <el-col :span="6">
                    <el-link type="primary" href="#/login" class="lo-right-nav">登录</el-link>
                </el-col>
            </el-row>
        </el-card>
        <el-main class="lw-main">
            <el-row type="flex" justify="end">
                <el-col :xs="24">
                    <el-card class="box-card">

                        <div slot="header" class="clearfix">
                            <span class="cf-left">注册</span>
                        </div>
                        <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="auto" class="demo-ruleForm">

                            <!--<el-form-item label="用户名" prop="user">-->
                                <!--<el-input v-model="ruleForm.user" placeholder="请输入用户名"></el-input>-->
                            <!--</el-form-item>-->

                            <el-form-item label="手机号" prop="phone">
                                <el-input v-model.number="ruleForm.phone" placeholder="请输入手机号"></el-input>
                            </el-form-item>
                            <el-form-item label="密码" prop="pass">
                                <el-input type="password" v-model="ruleForm.pass" autocomplete="off"  placeholder="请输入密码"></el-input>
                            </el-form-item>
                            <el-form-item label="确认密码" prop="checkPass">
                                <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"  placeholder="请再次确认密码"></el-input>
                            </el-form-item>

                            <el-form-item label="邮箱" prop="email">
                                <el-input v-model="ruleForm.email" placeholder="请输入邮箱"></el-input>
                            </el-form-item>
                            <el-form-item label="QQ号" prop="qq">
                                <el-input v-model.number="ruleForm.qq" placeholder="请输入QQ号"></el-input>
                            </el-form-item>

                            <el-form-item label="验证码" prop="verification">
                                <el-row >
                                    <el-col :span="12"><el-input v-model="ruleForm.verification" type="verification" autocomplete="off"></el-input></el-col>
                                    <el-col :span="12">
                                        <el-button @click="makeCode" type="danger" class="mch" :loading="!send"><i class="el-icon-message" v-if="send"></i><span v-else>{{second}}</span></el-button>
                                    </el-col>
                                </el-row>
                            </el-form-item>

                            <el-form-item label="选择角色" prop="resource">
                                <el-radio-group v-model="ruleForm.resource">
                                    <el-radio :label="1">商家</el-radio>
                                    <el-radio :label="2">买手</el-radio>
                                </el-radio-group>
                            </el-form-item>
                            <el-form-item label="邀请码" prop="user">
                                <el-input v-model="ruleForm.user" placeholder="请输入邀请码"></el-input>
                            </el-form-item>

                            <el-alert
                                    class="info-con" v-if="ruleForm.resource=='买手'"
                                    :title="bull.title"
                                    type="error"
                                    >
                                <div>
                                    <p v-for="(item,index) in bull.list">{{index+1}}、{{item}}</p>
                                </div>
                            </el-alert>
                            <el-form-item prop="deal">

                                <el-row type="flex" align="middle" class="deal-row">
                                    <el-checkbox-group v-model="ruleForm.deal">
                                        <el-checkbox label="我同意" type="deal"></el-checkbox>
                                    </el-checkbox-group>
                                    <el-link type='info' class="deal-nav" >XXX服务</el-link>
                                </el-row>
                            </el-form-item>
                            <el-row>
                                <el-button type="warning" @click="submitForm('ruleForm')">注册</el-button>
                                <el-button @click="resetForm('ruleForm')">重置</el-button>
                            </el-row>
                            <el-row class="info-con">
                                <el-alert
                                        :title="info.title"
                                        type="warning"
                                        :description="info.content">
                                </el-alert>
                            </el-row>
                        </el-form>
                    </el-card>
                </el-col>
            </el-row>
        </el-main>
    </div>
</template>

<script>
    import ajax from 'axios';
    import base from '../untils/base';
    export default {
        name: 'register',
        data() {
            var checkQq = (rule, value, callback) => {
                if (!value) {
                    return callback(new Error('qq不能为空'));
                }
                setTimeout(() => {
                    if (!Number.isInteger(value)) {
                        callback(new Error('请输入数字值'));
                    } else {

                        callback();
                    }
                }, 1000);
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
                }, 1000);
            };
            var validatePass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入密码'));
                } else {
                    if (this.ruleForm.checkPass !== '') {
                        this.$refs.ruleForm.validateField('checkPass');
                    }
                    callback();
                }
            };

            var validateUser = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入邀请码'));
                } else {
                    callback();
                }
            };

            var validatePass2 = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请再次输入密码'));
                } else if (value !== this.ruleForm.pass) {
                    callback(new Error('两次输入密码不一致!'));
                } else {
                    callback();
                }
            };

            var validatecode=(rule, value, callback) => {
                var phone=this.ruleForm.phone;
                if (!Number.isInteger(phone)||phone.toString().length<11) {
                    callback(new Error('手机号无效，请你重填'));
                } else {
                    if (value === '') {
                        callback(new Error('请输入短信码'));
                    } else if (value != this.identifyCode) {
                        callback(new Error('短信码错误'));
                    } else {
                        callback();
                    }
                }
            };

            var validatesel=(rule,value,callback)=>{
                if(value){
                    callback();
                }else{
                    callback(new Error('请选择协议!'));
                }
            }

            return {

                bull:{
                    title:'温馨提示',
                    list:['每个买手只能注册一个账号，多注册账号者封号，不返还会员费',
                        ' 严禁同一台电脑登录多个求人脉买手账号接任务、做任务。违规操作者，封禁求人脉ID账户求人，脉点余额不予提现，VIP会员费不退',
                    '新买手福利，首次注册成功赠送3个月会员时间和4脉点'
                    ]
                },
                info:{
                    title:'求人脉是一个担保式安全刷单平台，支持淘宝，天猫等各大平台',
                    content:'这是一句绕口令：黑灰化肥会挥发发灰黑化肥挥发；灰黑化肥会挥发发黑灰化肥发挥。 黑灰化肥会挥发发灰黑化肥黑灰挥发化为灰……'
                },
                send:true,
                second:0,
                identifyCode:'',
                ruleForm: {
                    user:'',
                    pass: '',
                    checkPass: '',
                    qq: '',
                    email:'',
                    phone:'',
                    verification:'',
                    resource:1,
                    deal:false
                },
                rules: {

                    user:[
                        {required: true,validator:validateUser,trigger:'blur'}
                    ],
                    deal:[
                        {
                            validator:validatesel,
                            trigger:'change'
                        }
                    ],
                    qq:[
                        {required: true,validator:checkQq,trigger:'blur'}
                    ],
                    pass: [
                        {required: true, validator: validatePass, trigger: 'blur' }
                    ],
                    checkPass: [
                        {required: true, validator: validatePass2, trigger: 'blur' }
                    ],
                    email: [
                        { required: true, message: '请输入邮箱地址', trigger: 'blur' },
                        { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
                    ],
                    phone:[
                        {required: true,validator:checkPhone,trigger:'blur'}
                    ],
                    verification:[
                        { validator: validatecode, trigger: 'blur' }
                    ]
                }
            };
        },
        created(){
            this.go_code();
        },
        methods: {
            go_code(){
                var code=this.$route.query.code
                if(code){
                    this.ruleForm.user=code;
                }
            },
            makeCode(){
                var phone=this.ruleForm.phone;
                if (!Number.isInteger(phone)||phone.toString().length<11) {
                    this.$message.error('手机号无效，请你重填');
                } else {
                    if(this.send){
                        this.$message.success('发送成功，请注意查收消息');

                        this.send=false,this.second=30;
                        var code=1000+Math.floor(Math.random()*8999);

                        this.identifyCode=code.toString();

                        this.$notify.success(code.toString())
                        var sendInter=setInterval(()=>{
                            this.second--;
                            if(this.second<=0) {
                                this.second = 0;
                                this.send = true;
                                clearInterval(sendInter);
                            }
                        },1000)
                    }
                }

            },
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        var getR=this.ruleForm;
                        var obj={
                            ue_account:getR.phone,
                            ue_password:getR.pass,
                            phone_code:getR.verification,
                            confirm_password:getR.checkPass,
                            qq_no:getR.qq,
                            pcode:'',
                            type:getR.resource
                        }
                        console.log(obj);
                        //请求注册后台
                        ajax.post(`${base.api}/login/register`,obj).then((res)=>{
                            res=res.data;
                            if(res.code){
                                this.$message.success('注册成功，请稍等···');
                                setTimeout(()=>{
                                    this.$router.replace('/login');
                                },2000)
                            }else{
                                this.$message.error(res.message);
                            }
                        }).catch((err)=>{
                            console.log(err,'错误');
                        })
                        // this.$message.success('注册成功，请稍等···')
                    } else {
                        return false;
                    }
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            }
        }
    }
</script>

<style lang="less" scoped>
    .lw-main{
        max-width:800px;
        margin:auto;
    }

    .info-con{
        margin:1rem 0;
        text-align:left;
    }
    .deal-row{
        height:2rem;
        .deal-nav{
            margin-left:.5rem;
        }
    }

    .lo-left-img{
        height:4rem;
    }
    .lo-left-text{
        padding-left:.5rem;
        line-height:1.5rem;
        border-left:1px solid #999;
        font-size:0.8rem;
        color:#999;
        text-align: left;
    }
    .lo-right-nav{
        font-size:1.2rem;
        white-space:nowrap;
    }
</style>
