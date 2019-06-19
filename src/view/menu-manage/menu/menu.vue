<template>
  <div>
    <Card>
      <tables
        ref="tables"
        v-model="tableData"
        :columns="columns"
      >
        <template slot="add">
         <create   @okSubmit="ok_Sub()">添加</create>
        </template>
      </tables>
      <vform @cancelForm="cancel" ref='form' @submitForm="submit" :modal='modal'  :currentForm="formValidate">
      </vform>
    </Card>
  </div>
</template>

<script>
import Tables from "_c/tables";
import { getMenuData,DeleteMenu,updataMenu,readMenu} from "@/api/data"
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
      currentUserId:'',
      formValidate: {
      },
      columns: [
        { title:'ID',key:'menu_id' },
        { title: "route", key: "route" },
        { title: "name", key: "name" },
        { title: "description", key: "description" },
        { title: "document", key: "document" },
        { title: "parent_id", key: "parent_id" },
        { title: "access_count", key: "access_count" },
        { title: "max_usetime", key: "max_usetime" },
        { title: "users_count", key: "users_count" },
        { title: "public", key: "public" },
        
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
        {
          title: '操作',
          key: 'action',
          width: 180,
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
                            this.handleShow(params.index)
                          }
                      }
                  }, '查看'),
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
      let menu_id=this.tableData[index].menu_id;
      readMenu({menu_id}).then(res=>{
        this.formValidate=res.data.data
      })
    },
    handleShow(index){
      let menu_id=this.tableData[index].menu_id;
      readMenu({menu_id}).then(res=>{
        
        this.startTime=res.data.data.create_time
        this.endTime=res.data.data.end_time
        this.router=res.data.data.router
      })
      this.$router.push({
        name: 'menuChart'
      })
    },
   
   
    submit(modal,data){
      updataMenu(data).then(res=>{
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
      this.currentUserId=this.tableData[index].menu_id
    },
    handelDeleteOk(){
      let menu_id=this.currentUserId;
      DeleteMenu({menu_id}).then(res=>{
        if(res.data.code===0){
          this.$Message.success(res.data.msg)
          this.getDataList();
        }
      })
    },
    getDataList(){
      getMenuData().then(res => {
        this.$nextTick(()=>{
        this.tableData = res.data.data;
      })
    });
    },
  },
  mounted() {
    this.getDataList();
  }
};
</script>

<style>
</style>
