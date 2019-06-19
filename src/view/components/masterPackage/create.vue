<template>
<span>
  <Button @click="handelCreate" class="search-btn" type="default">
    <Icon type="add"/>&nbsp;&nbsp;添加
  </Button>
  <vform @cancelForm="cancel" ref='form' @submitForm="submit" :modal='modal'></vform>
  </span>
</template>
<script>
import {createMasterPackage} from "@/api/data";
import vform from "./form.vue"
export default {
  components:{
    vform
  },
  data(){
    return{
      modal:false,
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
    submit(modal,data){
        createMasterPackage(data).then(res=>{
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

