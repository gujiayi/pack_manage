<template>
<span>
  <Button @click="handelCreate" class="search-btn" type="default">
    <Icon type="add"/>&nbsp;&nbsp;添加
  </Button>
  <Modal v-model="modal" title="添加">
  <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80" >
    <FormItem label="用户名" prop="username">
      <Input v-model="formValidate.username" placeholder="Enter your username"></Input>
    </FormItem>
    <FormItem label="密码" prop="password">
      <Input type="password" v-model="formValidate.password" placeholder="Enter your password"></Input>
    </FormItem>
    <FormItem label="再次输入密码" prop="re_password">
      <Input type="password" v-model="formValidate.re_password" placeholder="Enter your re_password"></Input>
    </FormItem>
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
      <FormItem label="状态">
      <i-switch v-model="status" @on-change="changeStatus(status)" />
    </FormItem>
  </Form>
  <div slot="footer">
    <Button type="text" size="large" @click="cancel()">取消</Button>
    <Button type="primary" size="large"  @click="ok_Submit()" >确定</Button>
  </div>
  </Modal>
  </span>
</template>
<script>
import {createUser} from "@/api/data";
export default {
  props:{
    roles:{
      type:Array
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
      modal:false,
      status:true,
      formValidate: {
        username: "",
        realname: "",
        status:1,
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
        ],
        //  roles: [
        //   { type: 'array', required: true, message: 'Please select the roles' }
        // ],
      },
    }
  },
  methods:{
    handelCreate(){
      this.modal=!this.modal;
    },
    
     changeStatus(status){
     this.status=status;
     this.formValidate.status=this.status?1:0
    },
    ok_Submit(){
        this.$refs.formValidate.validate((valid) => {
        if (valid) {
         let data={
            username: this.formValidate.username,
            realname:this.formValidate.realname,
            status:this.formValidate.status,
            password:this.formValidate.password,
            re_password:this.formValidate.re_password,
            email:this.formValidate.email,
            roles:this.formValidate.roles
          }
        createUser(data).then(res=>{
          if(res.data.code===0){
            this.$Message.success('新增成功');
            this.modal = !this.modal;
            this.$refs.formValidate.resetFields();
            this.$emit("okSubmit")
          }
        })
        }
       })
      
    },
    cancel(){
      this.modal = !this.modal;
      this.$refs.formValidate.resetFields();
    },
  }
}
</script>

