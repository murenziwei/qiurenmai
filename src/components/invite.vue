<template>
    <div class="invite">
        <el-card class="box-card">

            <el-form :model="formdata">
                <el-form-item label="复制链接发送邀请给好友">

                    <el-input placeholder="请输入链接" v-model="formdata.link">
                        <el-button slot="append"  v-clipboard:copy="formdata.link" v-clipboard:success="copySuccess"
                                  v-clipboard:error="copyError">复制链接</el-button>
                    </el-input>
                </el-form-item>
            </el-form>
        </el-card>
    </div>
</template>

<script>
    export default {
        name: "invite",
        data(){
            return {
                formdata:{
                    link:'http://xiaoliang110.com/register/10023527.html'
                }

            }
        },
        methods:{

            copySuccess(){
                this.$message.success('复制成功');
            },

            copyError(){
                this.$message.error('复制失败');
            }
        }
    }
</script>

<style scoped>

</style>