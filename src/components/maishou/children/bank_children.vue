<template>
    <el-card class="binding">
        <div>
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>银行卡绑定</el-breadcrumb-item>

            </el-breadcrumb>
        </div>
        <div class="b-content">
            <el-form ref="form" :model="form" :rules="formRule" label-position="top">
                <el-form-item label="姓名" prop="name">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="银行类型" prop="bank">
                    <el-input v-model="form.bank" placeholder="例如：农业银行、建设银行等等"></el-input>
                </el-form-item>

                <el-form-item label="开户行城市" prop="open_city">
                    <el-input v-model="form.open_city"></el-input>
                </el-form-item>
                <el-form-item label="开户行支行名称" prop="open_branch_name">
                    <el-input v-model="form.open_branch_name"></el-input>
                </el-form-item>
                <el-form-item label="短信提醒手机" prop="phone">
                    <el-input v-model="form.phone" type="number"></el-input>
                </el-form-item>

                <el-form-item label="银行卡号" prop="card_no">
                    <el-input v-model.number="form.card_no" ></el-input>
                </el-form-item>

                <el-form-item>
                    <el-button type="primary" @click="onSubmit('form')">完成</el-button>
                    <el-button @click="cancel">取消</el-button>
                </el-form-item>
            </el-form>
        </div>
    </el-card>
</template>

<script>
    export default {
        name: 'bindingBank',
        data() {

            var validateBank=(rule, value, callback) => {
                if (!(/\d{15}|\d{19}/).test(value)) {
                    callback(new Error('银行卡格式不正确,确保15~19位！'));
                } else {
                    callback();
                }
            };

            return {
                formRule:{
                    name:[
                        {
                            required:true,message:'姓名不能为空',trigger:'blur'
                        }
                    ],
                    bank:[
                        {
                            required:true,message:'请填写银行类型',trigger:'change'
                        }
                    ],
                    open_city:[
                        {
                            required:true,message:'开户行城市不能为空',trigger:'blur'
                        }
                    ],
                    open_branch_name:[
                        {
                            required:true,message:'开户行支行名称不能为空',trigger:'blur'
                        }
                    ],
                    phone:[
                        {
                            required:true,message:'到账短信提醒手机号不能为空',trigger:'blur'
                        }
                    ],
                    card_no:[
                        {
                            required:true,message:'银行卡号不能为空',trigger:'blur'
                        },
                        {
                            validator:validateBank,trigger:'blur'
                        }
                    ]
                },

                value1: '',
                form: {
                    name: '',
                    bank:'',
                    open_city:'',
                    open_branch_name:'',
                    phone:'',
                    card_no:''
                },
                dialogImageUrl: '',
                dialogVisible: false,
            }
        },
        created(){
            this.go_bank();
        },
        methods: {
            go_bank(){
                this.$api.ports.bindBankCard().then((res)=>{
                    if(res.code){
                        if(res.data.length){
                            this.form=res.data[0];
                        }
                    }

                })
            },

            onSubmit(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        var obj=this.form;
                        this.$api.ports.doBindBankCard(obj).then((res)=>{
                            if(res.code){
                                this.$notify.success(res.message);
                                setTimeout(()=>{
                                    this.$router.go(-1);
                                },500)
                            }else{
                                this.$notify.error({
                                    title: '错误',
                                    message: res.message
                                });
                            }

                        })
                    } else {
                        return false;
                    }
                });
            },
            handleRemove(file, fileList) {
                console.log(file, fileList);
            },
            handlePictureCardPreview(file) {
                this.dialogImageUrl = file.url;
                this.dialogVisible = true;
            },
            cancel() {
                this.$router.go(-1)
            }
        }
    }
</script>
<style scoped>
    .binding {
        z-index: 99;
        /*position: absolute;*/
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background: white;
        display: flex;
        flex-direction: column;
    }

    .b-content {
        margin-top: 20px;
    }
</style>