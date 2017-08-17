<template>
  <div>
    <MHeader :show="false"></MHeader>
    <Row id="login">
      <Col :xs="{span:8,offset:8}">
    <Form ref="formInline" :model="formInline" inline>
      <Form-item prop="password">
        <!-- <Input size="large" type="password" v-model="formInline.password" placeholder="请输入密码" @on-keyup="enterSubmit" :autofocus="true"> -->
        <Input size="large" type="password" v-model="formInline.password" placeholder="请输入密码" @on-enter="handleSubmit" :autofocus="true">
        <Icon size="large" type="ios-locked-outline" slot="prepend"></Icon>
        </Input>
      </Form-item>
      <Form-item>
        <Button size="large" id="login-btn" type="primary" @click="handleSubmit">登录</Button>
      </Form-item>
    </Form>
    </Col>
    </Row>
  </div>
</template>
<script>
import { ipcRenderer } from 'electron'
import MHeader from './Common/MHeader'
export default {
  components:{
    MHeader
  },
  data() {
    return {
      formInline: {
        password: ''
      },
      ruleInline: {
        password: [
          { required: true, message: '请填写密码', trigger: 'blur' },
          // { type: 'string', min: 6, message: '密码长度不能小于6位', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    handleSubmit: function () {
      ipcRenderer.send('login', { 'password': this.formInline.password })
      ipcRenderer.on('login-result', (e, p) => {
        if (p === 'OK') {
          this.loginOk()
        } else {
          this.$Message.error('密码错误!');
        }
      })
    },
    loginOk: function () {
      this.$router.push('/main')
    }
  }
}
</script>
<style>
#login {
  margin-top: 40%
}
</style>