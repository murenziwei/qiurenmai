<template>
    <div class="login">
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
                        <el-form>
                            <el-form-item class="lf-topic">
                                <span class="l-t-span">登录求人脉</span>
                            </el-form-item>
                            <el-form-item>
                                <el-input placeholder="用户名" v-model="user"></el-input>
                            </el-form-item>
                            <el-form-item>
                                <el-input placeholder="密码" show-password v-model="password"></el-input>
                            </el-form-item>

                            <el-form-item>
                                <el-row type="flex" justify="space-between" align="middle">
                                    <el-button type="warning">登录</el-button>

                                    <el-link type="primary" href="#/forget" >忘记密码</el-link>
                                </el-row>
                            </el-form-item>

                        </el-form>
                    </el-card>
                </el-col>
            </el-row>
        </el-main>
    </div>
</template>

<script>
    export default {
        name: 'login',
        data: function () {
            return {
                user:'',
                password:''
            }
        }
    }
</script>

<style scoped>
    .lf-topic{
        text-align: left;

    }
    .l-t-span{
        font-size:1.2rem;
        color:#000;
        font-weight: bold;
        opacity:0.7;
    }
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
