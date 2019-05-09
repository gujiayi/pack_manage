<template>
<span>
  <Button @click="handelCreate" class="search-btn" type="default">
    <Icon type="add"/>&nbsp;&nbsp;添加
  </Button>
   <vform @cancelForm="cancel" ref='form' @submitForm="submit" :modal='modal' :roles="roles" :currentForm="formValidate">
     <template slot="form">
      <FormItem label="密码" prop="password">
        <Input type="password" v-model="formValidate.password" placeholder="Enter your password"></Input>
      </FormItem>
      <FormItem label="重复密码" prop="re_password">
        <Input type="password" v-model="formValidate.re_password" placeholder="Enter your re_password"></Input>
      </FormItem>
    </template>
   </vform>
  </span>
</template>
<script>
import {createUser} from "@/api/data";
import vform from "./form"
export default {
  props:{
    roles:{
      type:Array
    }
  },
  components:{
    vform
  },
  data(){
    return{
      modal:false,
      formValidate: {
      },
    }
  },
  methods:{
    handelCreate(){
      this.modal=!this.modal;
    },
    submit(modal,data){
      createUser(data).then(res=>{
        if(res.data.code===0){
          this.modal = modal;
          this.$Message.success('新增成功');
          this.$refs.form.$refs.formValidate.resetFields();
          this.$emit("okSubmit")
        }else{
          this.$Message.error(res.data.msg);
        }
      })
    },
    cancel(modal){
      this.modal = modal;
    },
  }
}
</script>

