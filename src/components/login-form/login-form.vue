<template>
  <Form ref="loginForm" :model="form" :rules="rules" @keydown.enter.native="handleSubmit">
    <FormItem prop="username">
      <Input v-model="form.username" placeholder="请输入用户名">
        <span slot="prepend">
          <Icon :size="16" type="ios-person"></Icon>
        </span>
      </Input>
    </FormItem>
    <FormItem prop="password">
      <Input type="password" v-model="form.password" placeholder="请输入密码">
        <span slot="prepend">
          <Icon :size="14" type="md-lock"></Icon>
        </span>
      </Input>
    </FormItem>
    <FormItem prop="captcha">
      <Input  v-model="form.captcha" placeholder="请输入验证码"  >
       <span slot="prepend">
          <Icon type="ios-barcode" :size="14"></Icon>
        </span>
        <span slot="append">
          <img  :src="form.imgUrl" maxlength="4" style="width:80px;" @click="getCaptcha">
        </span>
      </Input>
    </FormItem>
    <FormItem>
      <Button @click="handleSubmit" type="primary" long>登录</Button>
    </FormItem>
  </Form>
</template>
<script>
import {getCodeImg} from '@/api/user'
export default {
  name: 'LoginForm',
  props: {
    userNameRules: {
      type: Array,
      default: () => {
        return [
          { required: true, message: '账号不能为空', trigger: 'blur' }
        ]
      }
    },
    passwordRules: {
      type: Array,
      default: () => {
        return [
          { required: true, message: '密码不能为空', trigger: 'blur' }
        ]
      }
    },
    captchaRules: {
      type: Array,
      default: () => {
        return [
          { required: true, message: '验证码不能为空', trigger: 'blur' }
        ]
      }
    }
  },
  data () {
    return {
      form: {
        username: 'admin',
        password: 'admin123',
        captcha:'',
        imgUrl:'',
      }
    }
  },
  computed: {
    rules () {
      return {
        username: this.userNameRules,
        password: this.passwordRules,
        captcha:this.captcha
      }
    }
  },
  created(){
    this.getCaptcha();
  },
  methods: {
    getCaptcha(){
      getCodeImg().then(res=>{
        //二进制乱码转为图片
         this.form.imgUrl=  'data:image/png;base64,' + btoa(
         new Uint8Array(res.data).reduce((data, byte) => data + String.fromCharCode(byte), ''))
      })
    },
    handleSubmit () {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          this.$emit('on-success-valid', {
            username: this.form.username,
            password: this.form.password,
            captcha:this.form.captcha
          })
        }
      })
    }
  }
}
</script>
<style>
.ivu-input{
  height:40px;
}
</style>
