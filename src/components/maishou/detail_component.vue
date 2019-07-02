<template>
    <div class="container">
        <component :is="chooseC[type]" :id="id"></component>
    </div>
</template>

<script>


    //拼多多
    import Pin from './details/Pin';

    export default {
        name: "detail_component",
        props:['id','type'],
        data() {
            return {
                chooseC:{
                    "1":'Pin',
                    "2":'Pin',
                    "3":'Pin',
                    "4":'Pin',
                    "5":'Pin'
                }
            }
        },
        created(){
            console.log(this.id,this.type,'id和type');
        },
        components: {
            Pin
        },
        methods: {

        }
    }
</script>

<style lang="less" scoped>
    .container {

    }
</style>