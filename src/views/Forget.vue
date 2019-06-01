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
                        <el-form :hide-required-asterisk="true" label-position="left" :model="ruleForm" :rules="rules" ref="ruleForm" label-width="auto">
                            <el-form-item label="手机号码" prop="mobile">
                                <el-input v-model="ruleForm.mobile" type="mobile" placeholder="输入手机号码"></el-input>
                            </el-form-item>
                            <el-form-item label="验证码" prop="verification">
                                <el-row >
                                    <el-col :span="12"><el-input v-model="ruleForm.verification" type="verification" placeholder="输入验证码" autocomplete="off"></el-input></el-col>
                                    <el-col :span="12"><div @click="makeCode" class="mch"><s-identify :identifyCode="identifyCode"></s-identify></div></el-col>
                                </el-row>
                            </el-form-item>
                            <div class="clearfix">
                                <el-button type="primary" @click="submitForm('ruleForm')">确认</el-button>
                                <el-button @click="resetForm('ruleForm')">重置</el-button>
                            </div>
                        </el-form>
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
            var validatecode=(rule, value, callback) => {
                console.log(this);
                if (value === '') {
                    callback(new Error('请输入验证码'));
                } else if (value != this.identifyCode) {
                    callback(new Error('验证码错误'));
                } else {
                    callback();
                }
            };
            return {
                loadstatus:false,
                identifyCode:'',
                ruleForm: {
                    mobile: '',
                    verification:''
                },
                rules: {
                    mobile: [
                        { required: true, message: '请输入手机号码', trigger: 'blur' },
                        { min:10,max:20, message: '手机格式10位数以上', trigger: 'blur' }
                    ],
                    verification:[
                        { validator: validatecode, trigger: 'blur' }
                    ]
                }
            }
        },
        mounted(){
            //随机生成验证码
            this.makeCode();
        },
        methods: {
            makeCode(){
                var code=1000+Math.floor(Math.random()*8999);
                console.log(code);
                this.identifyCode=code.toString();
            },
            submitForm(formName) {
                console.log(this.$refs.verif);
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.loadstatus=true;
                        this.$message.success('验证成功，进入下一步')


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
