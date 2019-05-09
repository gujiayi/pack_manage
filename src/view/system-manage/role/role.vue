<template>
  <div>
    <Card>
      <tables
        ref="tables"
        editable
        v-model="tableData"
        :columns="columns"
      >
       <template slot='add'>
        <create :routes="routes" ref="form"  @okSubmit="ok_Sub()">添加</create>
       </template>
      </tables>
       <vform @cancelForm="cancel" :title="title" ref='form' :modal='modal' :routes="routes" :currentForm="formValidate" @submitForm="submit">
      </vform>
    </Card>
  </div>
</template>

<script>
import create from "./create.vue"
import Tables from "_c/tables";
import vform from "./form"
import { getRolesData,readRole ,updataRole,getMenuTreeData,DeleteRole} from "@/api/data";
export default {
  components: {
    Tables,
    create,
    vform
  },
  data() {
    return {
      searchKey: "",
      modal:false,
      title:"修改",
      columns: [
        {
          title:'roleId',
          width:150,
          key:'role_id'
        },
        { title: "角色名称", key: "name" },
        { title: "角色描述", key: "description" },
        { title: "角色用户数", key: "users_count" },
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
        { title: "排序", key: "ordid" ,sortable: true},
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
      formValidate: {
        name: "",
        users_count: "",
        status:false,
        ordid:1
      },
      tableData: [],
      routes: []
    };
  },
  methods: {
     ok_Sub(){
      this.getDataList();
    },
     handleUpdata(index) {
      this.modal = !this.modal;
      let role_id=this.tableData[index].role_id;
      readRole({role_id}).then(res=>{
        this.formValidate=res.data.data
        this.formValidate.status?this.formValidate.status=true:this.formValidate.status=false
      })
    },
    submit(modal,data){
      updataRole(data).then(res=>{
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
      this.currentUserId=this.tableData[index].role_id
    },
    handelDeleteOk(){
      let role_id=this.currentUserId;
      DeleteRole({role_id}).then(res=>{
        if(res.data.code===0){
          this.$Message.success(res.data.msg)
          this.getDataList();
        }
      })
    },
    getRouterlist(){
      getMenuTreeData().then(res=>{
        this.routes=res.data.data
        console.log(this.routes)
      })    
    },
    getDataList(){
      getRolesData().then(res => {
        this.$nextTick(()=>{
        this.tableData = res.data.data;
      })
    });
    },
  },
  created() {
    this.getRouterlist();
    this.getDataList();
  }
};
</script>

<style>
</style>
