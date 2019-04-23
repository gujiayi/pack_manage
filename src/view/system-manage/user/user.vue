<template>
  <div>
    <Card>
      <tables
        ref="tables"
        searchable
        search-place="top"
        v-model="tableData"
        :columns="columns"
      >
        <template slot="select">
          <Select v-model="searchKey" class="search-col" placeholder="角色">
            <Option  v-for="item in roles" :value="item.value" :key="item.value" @on-change="searchRole">{{item.value}}</Option>
          </Select>
        </template>
        <template slot="add">
         <create :roles="roles"></create>
        </template>
      </tables>
      <Modal v-model="modal"  @on-ok="ok('form')" @on-cancel="cancel('form')" title="修改"> 
       <Form ref="currentForm" :model="currentForm" :rules="ruleValidate" :label-width="80">
        <FormItem label="用户名" prop="username">
          <Input v-model="currentForm.username" placeholder="Enter your username"></Input>
        </FormItem>
        <FormItem label="真实名称" prop="realname">
          <Input v-model="currentForm.realname" placeholder="Enter your realname"></Input>
        </FormItem>
        <FormItem label="email" prop="email">
          <Input v-model="currentForm.email" placeholder="Enter your email"></Input>
        </FormItem>
        <FormItem label="角色" prop="roles">
          <Select v-model="currentForm.roles" multiple  placeholder="Select your roles"  @on-change="selectRole(currentForm.roles)">
            <Option  v-for="item in roles" :value="item.value" :key="item.value">{{item.value}}</Option>
          </Select>
        </FormItem>
        <FormItem label="状态" prop="aa">
          <Switch v-model="currentForm.status" @on-change="changeStatus()" />
        </FormItem>
      </Form>
      </Modal>
    </Card>
  </div>
</template>

<script>
import Tables from "_c/tables";
import { getUserData,getRolesData,DeleteUser,updataUser} from "@/api/data";
import create from "./create.vue";
export default {
  name: "tables_page",
  components: {
    Tables,
    create
  },
  data() {
    return {
      searchKey: "",
      modal:false,
      tableData: [],
      roles:[],
      index:0,
      currentUserId:'',
      currentForm: {
        user_id:"",
        username: "",
        realname: "",
        roles:[],
        status:false,
        email:''
      },
      columns: [
        // {
        //   title:'ID',
        //   key:'user_id',
        //   width:50,
        // },
        { title: "用户名", key: "username" },
        { title: "真实名称", key: "realname" },
        { title: "ip", key: "ip" },
        { title: "email", key: "email" },
        { title: "角色", key: "roles" },
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
                             this.show(params.index)
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
      ruleValidate: {
        username: [
          {
            required: true,
            message: "The username cannot be empty",
            trigger: "blur"
          }
        ],
         realname: [
          {
            required: true,
            message: "The realname cannot be empty",
            trigger: "blur"
          }
        ],
        email: [
          { required: true, message: 'Mailbox cannot be empty', trigger: 'blur' },
          { type: 'email', message: 'Incorrect email format', trigger: 'blur' }
        ],
        roles: [
          { required: true, message: "roles cannot be empty", trigger: "blur" }
        ]
      },
    }
  },
  methods: {
    show(index) {
      this.modal = !this.modal;
      this.index=index;
      this.currentForm=this.tableData[this.index];
      this.currentForm.roles=this.currentForm.roles.split(',')
    },
    changeStatus(status){
      this.currentForm.status=value
    },
    selectRole(value){
      this.currentForm.roles.push(value)
    },
    ok(name){
      //  this.$refs.currentForm.validate((valid) => {
      //    console.log(valid)
      //   if (valid) {
          let data={
            user_id:this.currentForm.user_id ,
            username: this.currentForm.username,
            realname:this.currentForm.realname,
            status:this.currentForm.status,
            email:this.currentForm.email,
            roles:this.currentForm.roles,
          }
     
          updataUser(data).then(res=>{
            if(res.code===1){
              this.$Message.success('修改成功');
            }
          })
        // }
       this.$refs.currentForm.resetFields();
      //  })
    },
    cancel(name){
     this.$refs.currentForm.resetFields();
    },
    handleDelete(index) {
      this.currentUserId=this.tableData[index].user_id
      
    },
    handelDeleteOk(){
      let user_id=this.currentUserId;
      DeleteUser({user_id}).then(res=>{
        if(res.data.code===0){
          this.$Message.success(res.data.msg)
        }
        this.getDataList();
      })
    },
    searchRole(){},
    getDataList(){
       getUserData().then(res => {
      this.tableData = res.data.data;
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
          arr.push({"value":item.name,"label":item.description})
        })
        this.roles=arr;
      }
     })
   
  }
};
</script>

<style>
</style>
