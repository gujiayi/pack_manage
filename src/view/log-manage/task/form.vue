<template>
  <Modal :value="modal" title="添加"   :closable="false" :mask-closable="false">
  <Form ref="formValidate" :model="formValidate" :label-width="80" >
    <FormItem label="任务类型">
      <Select v-model="formValidate.type_id" >
        <Option v-for="item in taskType" :value="item.id" :key="item.id">{{ item.name }}</Option>
      </Select>
    </FormItem>
    <FormItem label="母包">
      <Select v-model="formValidate.master_package_id" >
        <Option v-for="item in MasterData" :value="item.id" :key="item.id">{{ item.name }}</Option>
      </Select>
    </FormItem>
    <FormItem label="任务名称">
      <Input v-model="formValidate.name" placeholder="Enter your name" :disabled="disabled" :readonly="readonly"></Input>
    </FormItem>
   
    <FormItem label="任务内容" >
      <Input type="textarea" :rows="10" v-model="formValidate.data" placeholder="Enter your data" :disabled="disabled" :readonly="readonly"></Input>
    </FormItem>
    <slot name="form"></slot>
  </Form>
  <div slot="footer">
    <Button type="text" size="large" @click="cancel()"  v-if="showCancle">取消</Button>
    <Button type="primary" size="large"  @click="ok_Submit()">确定</Button>
  </div>
  </Modal>
</template>
<script>
export default {
  props:{
    MasterData:{
      type:Array
    },
    taskType:{
      type:Array
    },
    showCancle:{
      type:Boolean,
      default:true
    },
    disabled:{
      type:Boolean
    },
    readonly:{
      type:Boolean
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
      data:'',
      v_modal:this.modal,
      status:true,
      formValidate:{
        type_id:0,
        master_package_id:0,
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
     ok_Submit(){
       if(this.showCancle){
        let data={
          master_package_id:this.formValidate.master_package_id,
          task_data:this.formValidate.data,
          name:this.formValidate.name,
          type_id:this.formValidate.type_id
        }
          this.$emit("submitForm",this.v_modal,data)
       }else{
       this.cancel()
       }
      
    },
  }
}
</script>

