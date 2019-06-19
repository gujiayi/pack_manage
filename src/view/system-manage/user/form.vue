<template>
  <!--  @input="data => $emit('input', data)" -->
  <Modal :value="modal" title="添加" :closable="false" :mask-closable="false">
     <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80" >
        <FormItem label="用户名" prop="username">
          <Input v-model="formValidate.username" placeholder="Enter your username"></Input>
        </FormItem>
         <slot name="form"></slot>
        <FormItem label="真实名称" prop="realname">
          <Input v-model="formValidate.realname" placeholder="Enter your realname"></Input>
        </FormItem>
        <FormItem label="email" prop="email">
          <Input v-model="formValidate.email" placeholder="Enter your email"></Input>
        </FormItem>
        <FormItem label="角色" >
          <Select v-model="formValidate.roles" multiple  placeholder="Select your roles" >
            <Option  v-for="item in roles" :value="item.value" :key="item.value">{{item.label}}</Option>
          </Select>
        </FormItem>
        <FormItem label="状态" >
          <i-switch v-model="formValidate.status" @on-change="changeStatus" />
        </FormItem>
      </Form>
      
      <div slot="footer">
        <Button type="text" size="large" @click="cancel()">取消</Button>
        <Button type="primary" size="large"  @click="ok_Submit()" >确定</Button>
      </div>
  </Modal>
</template>
<script>
export default {
  props:{
    roles:{
      type:Array
    },
    modal:{
      type:Boolean
    },
    currentForm:{
      type:Object,
    }
  },
  data(){
      const validatePass = (rule, value, callback) => {
      if (value === '') {
          callback(new Error('请输入你的密码'));
      }else if(value.length<6){
          callback(new Error('请输入6位以上密码'));
      }else {
        if (this.formValidate.re_password !== '') {
            // 对第二个密码框单独验证
            this.$refs.formValidate.validateField('re_password');
        }
        callback();
      }
      };
      const validatePassCheck = (rule, value, callback) => {
        if (value === '') {
            callback(new Error('请再次输入你的密码'));
        } else if (value !== this.formValidate.password) {
            callback(new Error('两次密码不一致!'));
        } else {
            callback();
        }
      }
    return{
      v_modal:this.modal,
      status:true,
      formValidate: {
        username: "",
        realname: "",
        status:true,
        password:'',
        re_password:'',
        email:'',
        roles:[],
      },
      ruleValidate: {
        username: [
          {
            required: true,
            message: "The username cannot be empty",
            trigger: "blur"
          }
        ],
         realname: [
          {
            required: true,
            message: "The realname cannot be empty",
            trigger: "blur"
          }
        ],
        password: [
          { validator: validatePass, trigger: 'blur', required: true, }
        ],
        re_password: [
          { validator: validatePassCheck, trigger: 'blur' , required: true,}
        ],
        email: [
          { required: true, message: 'Mailbox cannot be empty', trigger: 'blur' },
          { type: 'email', message: 'Incorrect email format', trigger: 'blur' }
        ]
      }
    }
  },
  watch:{
    currentForm(){
      this.formValidate=this.currentForm;
    }
  },
  methods:{
    handelCreate(){
      this.v_modal=!this.v_modal;
    },
     changeStatus(status){
     this.formValidate.status=status
    },
    ok_Submit(){
      this.$refs.formValidate.validate((valid) => {
        if (valid) {
          let data={}
          if(this.currentForm.password){
            data={
              password: this.formValidate.password,
              re_password:this.formValidate.re_password,
              username: this.formValidate.username,
              realname:this.formValidate.realname,
              status:this.formValidate.status?1:0,
              email:this.formValidate.email,
              roles:this.formValidate.roles,
            }
          }else{
            data={
              user_id:this.formValidate.user_id ,
              username: this.formValidate.username,
              realname:this.formValidate.realname,
              status:this.formValidate.status?1:0,
              email:this.formValidate.email,
              roles:this.formValidate.roles,
            }
          }
        this.$emit("submitForm",this.v_modal,data)
      }
    })
      
    },
    cancel(){
      this.$emit("cancelForm",this.v_modal)
      this.$refs.formValidate.resetFields();
    },
  }
}
</script>

