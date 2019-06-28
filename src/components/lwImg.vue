<template>
    <div style="text-align:center;">
        <template>
            <el-image
                 style="width:6rem;height:6rem;margin:.5rem;"
                 :src="srcData"
                 id="contract_url"
                 @click="enlargePic" :class="classData"  />
            <el-dialog
                    :visible.sync="centerDialogVisible"
                    modal
                    close-on-click-modal
                    custom-class="dialog"
            >
                <div>
                    <el-image :src="srcData"></el-image>
                </div>
            </el-dialog>
        </template>
    </div>
</template>

<script>
    export default {
        name: "lw-img",
        props: ["srcData",'classData'],
        data(){
            return{
                centerDialogVisible: false
            }
        },
        methods: {
            // 放大图片
            enlargePic(e){
                this.centerDialogVisible = true;

            },
        }
    }
</script>

<style lang="less">

</style>
