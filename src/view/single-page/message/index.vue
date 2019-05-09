<template>
  <Card shadow>
    <h2>修改密码</h2>
    <Form  ref="loginForm" :model="formCustom" :rules="ruleCustom" @keydown.enter.native="handleSubmit">
      <FormItem label="请输入原密码"  prop="old_password">
        <Input type="password" v-model="formCustom.old_password"></Input>
      </FormItem>
      <FormItem label="请输入新密码"  prop="new_password">
        <Input type="password" v-model="formCustom.new_password"></Input>
      </FormItem>
      <FormItem label="再次输入新密码"  prop="re_password">
        <Input type="password" v-model="formCustom.re_password"></Input>
      </FormItem>
      <FormItem>
      <Button @click="handleSubmit" type="primary" long>修改</Button>
    </FormItem>
    <p clsaa="error" style="color:red">{{formCustom.error}}</p>
    </Form>
  </Card>
</template>

<script>
import { modify_password } from "@/api/user";
export default {
  name: "message_page",
   props: {
  },
  data() {
     const validatePass = (rule, value, callback) => {
      if (value === '') {
          callback(new Error('请输入你的密码'));
      }else if(value.length<6){
        callback(new Error('请输入6位以上密码'));
      } else {
          if (this.formCustom.re_password !== '') {
              // 对第二个密码框单独验证
              this.$refs.loginForm.validateField('re_password');
          }
          callback();
      }
      };
      const validatePassCheck = (rule, value, callback) => {
      if (value === '') {
          callback(new Error('请再次输入你的密码'));
      } else if (value !== this.formCustom.new_password) {
          callback(new Error('两次密码不一致!'));
      } else {
          callback();
      }
  };
    return {
     formCustom: {
        old_password: "", 
        new_password: "", 
        re_password: "" ,
        error:'',
      },
      ruleCustom: {
         new_password: [
          { validator: validatePass, trigger: 'blur', required: true, }
        ],
        re_password: [
          { validator: validatePassCheck, trigger: 'blur' , required: true,}
        ],
        old_password: [
          { required: true, message: "请输入旧密码", trigger: "blur" }
        ]
      }
    }
  },
  methods: {
    handleSubmit () {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          let data={ 
            old_password:this.formCustom.old_password,
            new_password:this.formCustom.new_password,
            re_password:this.formCustom.re_password
          }
          modify_password(data).then(res=>{
            if(res.data.code!==0){
              this.formCustom.error=res.data.msg
            }else{
              this.formCustom.error='';
              this.$Message.success('修改成功');
              setTimeout(() => {
                this.$router.push({
                  name: this.$config.homeName
                })
              }, 500);
            }
          })
        }
      })
    }
  }
}
</script>

<style lang="less">
</style>
