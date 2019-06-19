<template>
<span>
  <Button @click="handelCreate" class="search-btn" type="default">
    <Icon type="add"/>&nbsp;&nbsp;添加
  </Button>
   <vform @cancelForm="cancel"  :taskType="taskType" :MasterData="MasterData" ref='form' @submitForm="submit" :modal='modal' :currentForm="formValidate">
   </vform>
  </span>
</template>
<script>
import {createTask,createUser} from "@/api/data";
import vform from "./form"
export default {
  components:{
    vform
  },
  props:{
    taskType:{
      type:Array
    },
     MasterData:{
      type:Array
    },
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
      createTask(data).then(res=>{
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

