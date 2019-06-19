<template>
  <Modal :value="modal" :title="title" :closable="false" :mask-closable="false">
    <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
      <FormItem label="用户名" prop="name">
        <Input v-model="formValidate.name" placeholder="Enter your name"></Input>
      </FormItem>
      <FormItem label="排序" >
         <InputNumber :max="10000" :min="1" :step="1" v-model="formValidate.ordid"></InputNumber>
      </FormItem> 
      <FormItem label="状态">
        <i-switch v-model="formValidate.status" @on-change="changeStatus"/>
      </FormItem>
      <FormItem label="路由权限">
        <Tree :data="formValidate.menus" ref="tree" multiple show-checkbox @on-check-change="changeNodes"></Tree>
      </FormItem>
    </Form>
    <div slot="footer">
      <Button type="text" size="large" @click="cancel()">取消</Button>
      <Button type="primary" size="large" @click="ok_Submit()">确定</Button>
    </div>
  </Modal>
</template>
<script>
export default {
  props: {
    routes: {
      type: Array
    },
    modal: {
      type: Boolean
    },
    currentForm: {
      type: Object
    },
    title: ""
  },
  data() {
    return {
      v_modal: this.modal,
      status: true,
      menus:[],
      formValidate: {
        name: "",
        ordid: 1,
        status: true,
        menus: [],
      },
      ruleValidate: {
        name: [
                  { required: true, message: 'The name cannot be empty', trigger: 'blur' }
              ],
      }
    };
  },

  watch: {
    currentForm() {
      this.formValidate = this.currentForm;
    }
  },
  mounted(){
    setTimeout(() => {
       this.formValidate.menus=this.routes
    }, 500);
     
  },
  methods: {
    changeNodes(node) {
      this.menus = this.$refs.tree.getCheckedNodes();
      
    },

    handelCreate() {
      this.v_modal = !this.v_modal;
    },
    changeStatus(status) {
      this.formValidate.status = status;
    },
    ok_Submit() {
      this.$refs.formValidate.validate(valid => {
        if (valid) {
           let data={}
          if(this.currentForm.role_id){
            data={
              role_id: this.formValidate.role_id,
              name: this.formValidate.name,
              ordid: this.formValidate.ordid,
              status: this.formValidate.status ? 1 : 0,
              routes: this.menus
            }
          }else{
            data={
              name: this.formValidate.name,
              ordid: this.formValidate.ordid,
              status: this.formValidate.status ? 1 : 0,
              routes: this.menus
            }
          }  
          this.$emit("submitForm", this.v_modal, data);
        }
      });
    },
    cancel() {
      this.$emit("cancelForm", this.v_modal);
      this.$refs.formValidate.resetFields();
    }
  }
};
</script>

