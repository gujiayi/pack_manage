<template>
  <!--  @input="data => $emit('input', data)" -->
  <Modal :value="modal" title="添加" :closable="false" :mask-closable="false">
     <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80" >
        <FormItem label="route" prop="route">
          <Input v-model="formValidate.route" placeholder="Enter your route"></Input>
        </FormItem>
        <FormItem label="名称" prop="name">
          <Input v-model="formValidate.name" placeholder="Enter your name"></Input>
        </FormItem>
      </Form>
      <div slot="footer">
        <Button type="text" size="large" @click="cancel()">取消</Button>
        <Button type="primary" size="large"  @click="ok_Submit()" >确定</Button>
      </div>
  </Modal>
</template>
<script>
import { log } from 'util';
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
    return{
      v_modal:this.modal,
      formValidate: {
        route: "",
        name: "",
      },
      ruleValidate: {
        route: [
          { required: true, trigger: 'blur', required: true, }
        ],
        name: [
          { required: true, trigger: 'blur' , required: true,}
        ],
        
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
    ok_Submit(){
      this.$refs.formValidate.validate((valid) => {
        if (valid) {
          let data={}
          if(!this.currentForm.menu_id){
            data={
              route:this.formValidate.route,
              name:this.formValidate.name,
            }
          }else{
            data={
              menu_id:this.formValidate.menu_id ,
              route:this.formValidate.route,
              name:this.formValidate.name,
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

