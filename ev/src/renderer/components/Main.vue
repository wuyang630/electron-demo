<template>
    <div>
        <MHeader :show=false></MHeader>
        <Row id="main-page">
            <Col :sm="{span:8 , offset:8}">
            <Button icon="upload" type="primary" @click="handleSubmit()">上传文件</Button>
            <Button icon="ios-list-outline" type="primary" @click="handleHistory()">查看历史</Button>
            <Button icon="key" type="primary" @click="handleModifyPw()">修改密码</Button>
            </Col>
        </Row>
    </div>
</template>
<script>
import MHeader from './Common/MHeader'
export default {
    components:{
        MHeader
    },
    methods: {
        handleSubmit: function () {
            this.$router.push('/file')
        },
        handleModifyPw: function () {
            this.$router.push('/modifyPw')
        },
        handleHistory: function () {
            this.$router.push('/history')
        }
    }
}
</script>
<style>
#main-page {
    margin-top: 40%
}
</style>