<template>
  <Modal :value="modal" title="添加"   :closable="false" :mask-closable="false">
  <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80" >
    <FormItem label="用户名" prop="name">
      <Input v-model="formValidate.name" placeholder="Enter your name"></Input>
    </FormItem>
    <FormItem label="apk_name" prop="apk_name">
      <Input v-model="formValidate.apk_name" placeholder="Enter your apk_name"></Input>
    </FormItem>
    <FormItem label="path" prop="path">
      <Input v-model="formValidate.path" placeholder="Enter your path"></Input>
    </FormItem>
    <slot name="form"></slot>
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
      status:true,
      formValidate:{
        name: "",
        apk_name: "",
        path:"",
        status:1
      },
      ruleValidate: {
        name: [
          {  message: 'name cannot be empty', trigger: 'blur', required: true, }
        ],
         apk_name: [
          {  message: 'apk_name cannot be empty', trigger: 'blur', required: true, }
        ],
         path: [
          {  message: 'path cannot be empty', trigger: 'blur', required: true, }
        ]
      },
    }
  },
  watch:{
    currentForm(){
      this.formValidate=this.currentForm;
    }
  },
  methods:{
    handelCreate(){
      this. v_modal=!this. v_modal;
    },
    
     changeStatus(status){
     this.status=status;
     this.formValidate.status=this.status?1:0
    },
    ok_Submit(){
      this.$refs.formValidate.validate((valid) => {
        if (valid) {
          //  let data={
          //     name: this.formValidate.name,
          //     apk_name:this.formValidate.apk_name,
          //     path:this.formValidate.path
          //   }
          //  this.$emit("submitForm",this.v_modal,data)
          let data={}
          if(!this.currentForm){
            data={
              name: this.formValidate.name,
              apk_name:this.formValidate.apk_name,
              path:this.formValidate.path
            }
          }else{
            data={
              id:this.formValidate.id ,
              name: this.formValidate.name,
              apk_name:this.formValidate.apk_name,
              status:this.formValidate.status?1:0,
              path:this.formValidate.path
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

