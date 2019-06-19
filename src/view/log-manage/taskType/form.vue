<template>
  <Modal :value="modal" title="添加"   :closable="false" :mask-closable="false">
  <Form ref="formValidate" :model="formValidate" :label-width="80" >
    <FormItem label="任务类型">
      <Input v-model="formValidate.type_id" placeholder="Enter your type_id" disabled readonly></Input>
    </FormItem>
    <FormItem label="任务名称">
      <Input v-model="formValidate.master_package_id" placeholder="Enter your master_package_id" disabled readonly></Input>
    </FormItem>
    <FormItem label="母包">
      <Input v-model="formValidate.name" placeholder="Enter your name" disabled readonly></Input>
    </FormItem>
    <FormItem label="任务内容" >
      <Input v-model="formValidate.data" placeholder="Enter your data" disabled readonly></Input>
    </FormItem>
    <FormItem label="status" >
      <Input v-model="formValidate.status" placeholder="Enter your status" disabled readonly></Input>
    </FormItem>
    <FormItem label="add_time" >
      <Input v-model="formValidate.add_time" placeholder="Enter your add_time" disabled readonly></Input>
    </FormItem>
    <FormItem label="comp_time" >
      <Input v-model="formValidate.comp_time" placeholder="Enter your comp_time" disabled readonly></Input>
    </FormItem>
     <FormItem label="exec_time" >
      <Input v-model="formValidate.exec_time" placeholder="Enter your exec_time" disabled readonly></Input>
    </FormItem>
  </Form>
  <div slot="footer">
    <Button type="text" size="large" @click="cancel()">取消</Button>
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
        type_id:'',
        master_package_id:'',
        name: '',
        data: '',
        status:1,
        add_time:'',
        comp_time:'',
        exec_time:''
      },
    }
  },
  watch:{
    currentForm(){
      this.formValidate=this.currentForm;
      switch(this.formValidate.status){
        case 0 :
          this.formValidate.status="未分配"
          break;
        case 1 :
          this.formValidate.status= "已分配"
          break;
        case 2 :
          this.formValidate.status= "已完成"
          break;
      }
    }
  },
  methods:{
    cancel(){
      this.$emit("cancelForm",this.v_modal)
      this.$refs.formValidate.resetFields();
    },
  }
}
</script>

