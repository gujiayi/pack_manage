<template>
  <div>
    <Card>
      <tables
        ref="tables"
        v-model="tableData"
        :columns="columns"
      >
        <template slot="add">
         <create :roles="roles"  @okSubmit="ok_Sub()">添加</create>
        </template>
      </tables>
      <vform @cancelForm="cancel" ref='form' @submitForm="submit" :modal='modal' :roles="roles" :currentForm="formValidate">
      </vform>
    </Card>
  </div>
</template>

<script>
import Tables from "_c/tables";
import { getUserData,getRolesData,DeleteUser,updataUser,readUser} from "@/api/data"
import create from "./create.vue"
import vform from "./form.vue"
export default {
  name: "tables_page",
  components: {
    Tables,
    create,
    vform
  },
  data() {
    return {
      searchKey: "",
      modal:false,
      tableData: [],
      roles:[],
      currentUserId:'',
      formValidate: {
      },
      columns: [
        { title:'ID',key:'user_id' },
        { title: "用户名", key: "username" },
        { title: "真实名称", key: "realname" },
        { title: "ip", key: "ip" },
        { title: "email", key: "email" },
        { title: "角色",key: "roles" , },
        {
          title: "状态",
          key: "status",
          render: (h, params) => {
            return h("i-switch", {
              props: {
                type: "primary",
                value: params.row.status===1,  
                disabled:true                    
              }
            });
          }
        },
        { title: "最后登录时间", key: "update_time" },
        {
          title: '操作',
          key: 'action',
          width: 150,
          render: (h, params) => {
              let data=params;
              return h('div', [
                  h('Button', {
                      props: {
                          type: 'primary',
                          size: 'small',
                      },
                      style: {
                          marginRight: '5px'
                      },
                      on: {
                          click: () => {
                             this.handleUpdata(params.index)
                          }
                      }
                  }, '修改'),
                  h('Poptip', {
                      props:{
                          title:'您确定要删除吗',
                          confirm:true
                      },
                      on:{
                          'on-ok': ()=>{
                            this.handelDeleteOk()
                          }
                      }
                  },[
                      h('Button', {
                          props: {
                              type: 'error',
                              size: 'small'
                          },
                          style: {
                              marginRight: '5px'
                          },
                          on: {
                              click: () => {
                                  this.handleDelete(params.index)
                              }
                          }
                      }, '删除'),
                  ])
              ])
          }
        }
      ],
      
    }
  },
  methods: {
    ok_Sub(){
      this.getDataList();
    },
    handleUpdata(index) {
      this.modal = !this.modal;
      let user_id=this.tableData[index].user_id;
      readUser({user_id}).then(res=>{
        this.formValidate=res.data.data
        this.formValidate.status?this.formValidate.status=true:this.formValidate.status=false
      })
    },
   
    submit(modal,data){
      updataUser(data).then(res=>{
        if(res.data.code===0){
          this.modal = modal;
          this.$Message.success('修改成功');
          this.$refs.form.$refs.formValidate.resetFields();
          this.getDataList();
          this.$emit("okSubmit")
        }else{
           this.$Message.error(res.data.msg);
        }
      })
    },
   
    cancel(modal){
      this.modal = modal;
    },
    handleDelete(index) {
      this.currentUserId=this.tableData[index].user_id
    },
    handelDeleteOk(){
      let user_id=this.currentUserId;
      DeleteUser({user_id}).then(res=>{
        if(res.data.code===0){
          this.$Message.success(res.data.msg)
          this.getDataList();
        }
      })
    },
    getDataList(){
      getUserData().then(res => {
        this.$nextTick(()=>{
        this.tableData = res.data.data;
      })
    });
    },
  },
  mounted() {
    this.getDataList();
    getRolesData().then(res=>{
      let data=res.data.data;
      if(res.data.data){
        let arr=[];
        data.map((item,index)=>{
          arr.push({"value":item.role_id,"label":item.name})
        })
        this.roles=arr;
      }
     })
   
  }
};
</script>

<style>
</style>
