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
         <create>sffdf</create>
       </template>
      </tables>
       <Modal v-model="modal"  title="修改"> 
       <Form ref="currentForm" :model="currentForm" :rules="ruleValidate" :label-width="80">
        <FormItem label="用户名" prop="name">
          <Input v-model="currentForm.name" placeholder="Enter your name"></Input>
        </FormItem>
        <FormItem label="排序" prop="ordid">
          <Input v-model="currentForm.ordid" placeholder="Enter your ordid"></Input>
        </FormItem>
        <FormItem label="状态" >
          <i-switch v-model="currentForm.status" @on-change="changeStatus" />
        </FormItem>
        <FormItem label="路由权限">
          <Tree :data="routes1"  multiple></Tree>
        </FormItem>
        <FormItem label="路由权限">
          <Tree :data="routes1"  multiple></Tree>
        </FormItem>
      </Form>
      <div slot="footer">
        <Button type="text" size="large" @click="cancel('currentForm')">取消</Button>
        <Button type="primary" size="large"  @click="ok('currentForm')" >确定</Button>
      </div>
      </Modal>
    </Card>
  </div>
</template>

<script>
import create from "./create.vue"
import Tables from "_c/tables";
import { getRolesData,readRole ,getMenuData} from "@/api/data";
export default {
  components: {
    Tables,
    create
  },
  data() {
    return {
      searchKey: "",
      modal:false,
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
          title: "操作",
          key: "action",
          width: 100,
          render: (h, params) => {
            return h("div", [
              h(
                "Button",
                {
                  props: {
                    type: "primary",
                    size: "small"
                  },
                  style: {
                    marginRight: "5px"
                  },
                  on: {
                    click: () => {
                      this.show(params.index);
                    }
                  }
                },
                "修改"
              )
            ]);
          }
        }
      ],
      currentForm: {
        name: "",
        users_count: "",
        status:false,
        ordid:1
      },
      ruleValidate: {
        name: [
          {
            required: true,
            message: "The roleName cannot be empty",
            trigger: "blur"
          }
        ],
         description: [
          {
            required: true,
            message: "The roleDesc cannot be empty",
            trigger: "blur"
          }
        ],
        users_count: [
          { required: true, message: "roleCount cannot be empty", trigger: "blur" }
        ]
      },
      
      tableData: [],
      routes1: [
                    {
                        title: 'parent 1',
                        selected: true,
                        children: [
                            {
                                title: 'parent 1-1',
                                children: [
                                    {
                                        title: 'leaf 1-1-1',
                                        disabled: true
                                    },
                                    {
                                        title: 'leaf 1-1-2'
                                    }
                                ]
                            },
                            {
                                title: 'parent 1-2',
                                children: [
                                    {
                                        title: 'leaf 1-2-1',
                                        checked: true
                                    },
                                    {
                                        title: 'leaf 1-2-1'
                                    }
                                ]
                            }
                        ]
                    }
                ]
    };
  },
  methods: {
     ok_Sub(){
      this.getDataList();
    },
    show(index) {
      this.modal = !this.modal;
      let role_id=this.tableData[index].role_id;
      readRole({role_id}).then(res=>{
        this.currentForm=res.data.data
        this.currentForm.status?this.currentForm.status=true:this.currentForm.status=false
      })
    },
    changeStatus(status){
      this.currentForm.status=status
    },
    ok(name){
       this.$refs[name].validate((valid) => {
        if (valid) {
          let data={
            user_id:this.currentForm.user_id ,
            username: this.currentForm.username,
            realname:this.currentForm.realname,
            status:this.currentForm.status?"1":0,
            email:this.currentForm.email,
            roles:this.currentForm.roles,
          }
          updataUser(data).then(res=>{
            if(res.data.code===0){
              this.getDataList();
              this.$Message.success('修改成功');
              this.modal = !this.modal;
              this.$refs[name].resetFields();
            }
          })
        }
      
       })
    },
    cancel(name){
     this.$refs[name].resetFields();
      this.modal = !this.modal;
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
    searchRole(){},
    getDataList(){
      getRolesData().then(res => {
        this.$nextTick(()=>{
        this.tableData = res.data.data;
      })
    });
    },
  },
  mounted() {
    this.getDataList();
    getMenuData().then(res=>{
      console.log(res)
      let data=res.data.data;
      let arr=[];
      data.map((item,index)=>{
        arr.push({"value":item.role_id,"label":item.name})
      })
      this.roles=arr;
     })
   
  }
};
</script>

<style>
</style>
