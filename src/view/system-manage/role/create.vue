<template>
<span>
  <Button @click="handelCreate" class="search-btn" type="default">
    <Icon type="add"/>&nbsp;&nbsp;添加
  </Button>
  <Modal v-model="modal" title="添加" @on-ok="okSubmit('form')" @on-cancel="cancel('form')">
  <Form ref="form" :model="formValidate" :rules="ruleValidate" :label-width="80" >
    <FormItem label="角色名" prop="name">
      <Input v-model="formValidate.name" placeholder="Enter your name"></Input>
    </FormItem>
    <FormItem label="排序" prop="ordid">
      <Input  v-model="formValidate.ordid" placeholder="Enter your ordid"></Input>
    </FormItem>
    <FormItem label="状态" >
      <Switch v-model="formValidate.status" @on-change="changeStatus()" />
    </FormItem>
   <FormItem label="搜索">
      <Tree :data="data2" show-checkbox></Tree>
    </FormItem>
    <FormItem label="列表" >
      <Tree :data="data2" show-checkbox></Tree>
    </FormItem>
     <FormItem label="新增" >
      <Tree :data="data2" show-checkbox></Tree>
    </FormItem>
    <FormItem label="修改" >
      <Tree :data="data2" show-checkbox></Tree>
    </FormItem>
    <FormItem label="删除" >
       <Tree :data="data2" show-checkbox></Tree>
    </FormItem>
  </Form>
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
    return{
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
    okSubmit(name){
       this.$refs.form.validate((valid) => {
        if (valid) {
          let data={
            username: this.formValidate.username,
            realname:this.formValidate.realname,
            status:this.formValidate.status,
            password:this.formValidate.password,
            re_password:this.formValidate.re_password,
            email:this.formValidate.email,
            roles:this.formValidate.role,
          }
          createUser(data).then(res=>{
            if(res.code===1){
              this.$Message.success('新增成功');
            }
          })
        }
        this.$refs.form.resetFields();
       })
      
    },
    cancel(name){
      this.$refs.form.resetFields();
    },
  }
}
</script>

