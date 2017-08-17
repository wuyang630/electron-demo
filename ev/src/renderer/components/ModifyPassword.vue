<template>
    <div>
        <MHeader :show=true></MHeader>
        <Form ref="formCustom" :model="formCustom" :rules="ruleCustom" :label-width="80">
            <Form-item label="请输入旧密码" prop="oldpasswd">
                <Input type="password" v-model="formCustom.oldpasswd"></Input>
            </Form-item>
            <Form-item label="请输入新密码" prop="passwd">
                <Input type="password" v-model="formCustom.passwd"></Input>
            </Form-item>
            <Form-item label="请确认密码" prop="passwdCheck">
                <Input type="password" v-model="formCustom.passwdCheck"></Input>
            </Form-item>
            <Form-item>
                <Button id="modify-btn" type="primary" @click="handleSubmit('formCustom')">提交</Button>
            </Form-item>
        </Form>
    </div>
</template>
<script>
import MHeader from './Common/MHeader'
import { ipcRenderer } from 'electron'
export default {
    components: {
        MHeader
    },
    data() {
        const validatePass = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请输入密码'));
            } else {
                if (this.formCustom.passwdCheck !== '') {
                    // 对第二个密码框单独验证
                    this.$refs.formCustom.validateField('passwdCheck');
                }
                callback();
            }
        };
        const validatePassCheck = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请再次输入密码'));
            } else if (value !== this.formCustom.passwd) {
                callback(new Error('两次输入密码不一致!'));
            } else {
                callback();
            }
        };
        return {
            formCustom: {
                oldpasswd: '',
                passwd: '',
                passwdCheck: '',
            },
            ruleCustom: {
                passwd: [
                    { validator: validatePass, trigger: 'blur' }
                ],
                passwdCheck: [
                    { validator: validatePassCheck, trigger: 'blur' }
                ]
            }
        }
    },
    methods: {
        handleSubmit(name) {
            this.$refs[name].validate((valid) => {
                if (valid) {
                    ipcRenderer.send('chk-login', { 'password': this.formCustom.oldpasswd })
                    ipcRenderer.on('chk-login-result', (e, p) => {
                        if (p === 'OK') {
                            // 密码正确
                            ipcRenderer.send('modify-password', { 'password': this.formCustom.passwd })
                            ipcRenderer.on('modify-result', (e, p) => {
                                if (p === 'OK') {
                                    // 修改成功
                                    this.$Message.success('修改成功!');
                                    this.$router.push('/login')
                                } else {
                                    this.$Message.error('修改失败!');
                                }
                            })
                        } else {
                            this.$Message.error('旧密码填写有误!');
                        }
                    })
                } else {
                    // this.$Message.error('填写有误!');
                }
            })
        }
    }
}
</script>