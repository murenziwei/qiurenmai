<template>
    <div v-loading="loadstatus">
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
                <el-col :xs="0" :sm="16">
                    <el-image :src="this.$store.state.urlimg"></el-image>
                </el-col>
                <el-col :xs="24" :sm="8" >
                    <el-card class="box-card">
                        <div slot="header" class="clearfix">
                            <span class="cf-left">找回登录密码</span>
                            <el-link class="cf-right" type="primary" href="#/login">返回登录</el-link>
                        </div>

                        <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="auto" class="demo-ruleForm">

                            <el-form-item label="手机号" prop="phone">
                                <el-input v-model.number="ruleForm.phone" placeholder="请输入手机号"></el-input>
                            </el-form-item>
                            <el-form-item label="密码" prop="pass">
                                <el-input type="password" v-model="ruleForm.pass" autocomplete="off"  placeholder="请输入密码"></el-input>
                            </el-form-item>
                            <el-form-item label="确认密码" prop="checkPass">
                                <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"  placeholder="请再次确认密码"></el-input>
                            </el-form-item>

                            <el-form-item label="验证码" prop="verification">
                                <el-row >
                                    <el-col :span="12"><el-input v-model="ruleForm.verification"  ></el-input></el-col>
                                    <el-col :span="12">
                                        <el-button @click="makeCode" type="danger" class="mch" :loading="!send"><i class="el-icon-message" v-if="send"></i><span v-else>{{second}}</span></el-button>
                                    </el-col>
                                </el-row>
                            </el-form-item>


                            <div class="clearfix">
                                <el-button type="primary" @click="submitForm('ruleForm')">确认</el-button>
                                <el-button @click="resetForm('ruleForm')">重置</el-button>
                            </div>
                        </el-form>
                        <!--<el-form :hide-required-asterisk="true" label-position="left" :model="ruleForm" :rules="rules" ref="ruleForm" label-width="auto">-->
                            <!--<el-form-item label="手机号码" prop="mobile">-->
                                <!--<el-input v-model="ruleForm.mobile" type="mobile" placeholder="输入手机号码"></el-input>-->
                            <!--</el-form-item>-->
                            <!--<el-form-item label="验证码" prop="verification">-->
                                <!--<el-row >-->
                                    <!--<el-col :span="12"><el-input v-model="ruleForm.verification" type="verification" placeholder="输入验证码" autocomplete="off"></el-input></el-col>-->
                                    <!--<el-col :span="12"><div @click="makeCode" class="mch"><s-identify :identifyCode="identifyCode"></s-identify></div></el-col>-->
                                <!--</el-row>-->
                            <!--</el-form-item>-->
                            <!--<div class="clearfix">-->
                                <!--<el-button type="primary" @click="submitForm('ruleForm')">确认</el-button>-->
                                <!--<el-button @click="resetForm('ruleForm')">重置</el-button>-->
                            <!--</div>-->
                        <!--</el-form>-->
                    </el-card>
                </el-col>
            </el-row>

        </el-main>
    </div>
</template>

<script>
    import SIdentify from '../components/indentify.vue'
    export default {
        name: 'forget',
        data () {

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
                    }else {
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
                second:0,
                send:true,
                loadstatus:false,
                identifyCode:'',
                ruleForm: {

                    verification:'',
                    phone:'',
                    pass:'',
                    checkPass:''
                },

                rules: {

                    pass: [
                        {required: true, validator: validatePass, trigger: 'blur' }
                    ],
                    checkPass: [
                        {required: true, validator: validatePass2, trigger: 'blur' }
                    ],
                    phone:[
                        {required: true,validator:checkPhone,trigger:'blur'}
                    ],
                    verification:[
                        { required:true,validator: validatecode, trigger: 'blur' }
                    ]
                }
            }
        },
        mounted(){
        },
        methods: {
            go_phone_code(phone){
                return this.$api.ports.getCode(phone).then((res)=>{
                    console.log(res,'手机验证码');
                    if(res.code){

                    }
                });
            },
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
                        // var code=1000+Math.floor(Math.random()*8999);
                        //
                        // this.identifyCode=code.toString();
                        //开始发送手机验证码
                        this.go_phone_code(phone);

                        // this.$notify.success(code.toString())
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
            // makeCode(){
            //     var code=1000+Math.floor(Math.random()*8999);
            //     console.log(code);
            //     this.identifyCode=code.toString();
            // },
            submitForm(formName) {
                console.log(this.$refs.verif);
                this.$refs[formName].validate((valid) => {
                    if (valid) {

                        var getR=this.ruleForm;
                        var obj={
                            phone:getR.phone,
                            code:getR.verification,
                            new_pwd:getR.pass,
                            conf_pwd:getR.checkPass
                        }
                        //请求注册后台
                        this.$api.ports.forGetPwd(obj).then((res)=>{
                            if(res.code){

                                this.passstatus=false;
                                this.$message.success('找回成功');
                                this.$router.replace('/login');

                            }else{
                                this.$message.error(res.message);
                            }
                        }).catch((err)=>{
                            console.log(err,'错误');
                        })

                        // this.$message.success('验证成功，进入下一步')


                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            }
        },
        components:{
            SIdentify
        }
    }
</script>

<style scoped>
    .mch{height:40px;overflow:hidden;}
    .verification-img{
        width:100%;
        height:40px;
    }
    .clearfix{
        text-align:left;
    }
    .cf-left{color:#e6a23c;font-size:1.2rem;}
    .cf-right{float: right; padding: 3px 0}

    .lw-main{margin:3rem 0;}
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
