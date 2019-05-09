<template>
<span>
  <Button @click="handelCreate" class="search-btn" type="default">
    <Icon type="add"/>&nbsp;&nbsp;添加
  </Button>
   <vform @cancelForm="cancel" :title="title" ref='form' @submitForm="submit" :modal='modal' :routes="routes" :currentForm="formValidate">
   </vform>
  </span>
</template>
<script>
import {createRole} from "@/api/data";
import vform from './form'
export default {
  props:{
    routes:{
      type:Array
    }
  },
  components:{
    vform
  },
  data(){
    return{
      title:'添加',
      data2: [
          {
              title: 'parent 1',
              expand: true,
              children: [
                  {
                      title: 'parent 1-1',
                      expand: true,
                      children: [
                          {
                              title: 'leaf 1-1-1'
                          },
                          {
                              title: 'leaf 1-1-2'
                          }
                      ]
                  },
                  {
                      title: 'parent 1-2',
                      expand: true,
                      children: [
                          {
                              title: 'leaf 1-2-1'
                          },
                          {
                              title: 'leaf 1-2-1'
                          }
                      ]
                  }
              ]
          }
      ],
      read:[],
      select:[],
      create:[],
      update:[],
      delete:[],
      modal:false,
      formValidate: {
        name: "",
        ordid: "",
        status:false,
        read:'',
        select:'',
        create:'',
        update:'',
        delete:'',
      },
      ruleValidate: {
        name: [
          {
            required: true,
            message: "The name cannot be empty",
            trigger: "blur"
          }
        ]
      },
    }
  },
  methods:{
    handelCreate(){
      this.modal=true;
    },
    submit(modal,data){
      createRole(data).then(res=>{
        console.log(res.data)
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
    cancel(){
      this.modal = !this.modal;
    },
  }
}
</script>

