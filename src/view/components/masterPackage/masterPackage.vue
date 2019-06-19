<template>
  <div>
    <Card>
      <tables ref="tables"  v-model="tableData" :columns="columns" @on-delete="handleDelete">
         <template slot="add">
         <create   @okSubmit="ok_Sub()"></create>
        </template>
      </tables>
      <vform @cancelForm="cancel" ref='form' @submitForm="submit" :modal='modal' :currentForm="formValidate">
        <template slot="form"> 
          <FormItem label="状态" >
            <i-switch v-model="formValidate.status" @on-change="changeStatus" />
          </FormItem>
        </template>
      </vform>
     <Page :total="100" show-elevator />
    </Card>
  </div>
</template>

<script>
import Tables from '_c/tables'
import { getMasterPackageData ,updataMasterPackage,DeleteMasterPackage ,readMasterPackage} from '@/api/data'
import create from './create'
import vform from './form'
export default {
  name: 'masterPackage',
  components: {
    Tables,
    create,
    vform
  },
  data () {
    return {
      modal: false,
      columns: [
        { title: 'ID',  key: 'id', },
        { title: '包名', key: 'name'},
        { title: 'apk', key: 'apk_name'},
        {title:'游戏ID',key:'game_id'},
        {title:'母包路径',key:'path'},
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
        { title: '添加时间', key: 'add_time' },
        { title: '修改时间', key: 'update_time' },
        {
          title: '操作',
          key: 'action',
          width: 150,
          render: (h, params) => {
              return h('div', [
                  h('Button', {
                      props: {
                          type: 'primary',
                          size: 'small'
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
      },
      tableData: [],
      }
  },
  created(){
    this.getDataList();
  },
  methods:{
    ok_Sub(){
      this.getDataList();
    },
    handleUpdata(index) {
      this.modal = !this.modal;
      let id=this.tableData[index].id;
      readMasterPackage({id}).then(res=>{
        this.formValidate=res.data.data
        this.formValidate.status?this.formValidate.status=true:this.formValidate.status=false
      })
    },
    changeStatus(status){
      this.formValidate.status=status
    },
     handleDelete(index) {
      this.currentId=this.tableData[index].id
    },
    handelDeleteOk(){
      let id=this.currentId;
      DeleteMasterPackage({id}).then(res=>{
        console.log(res.data.code)
        if(res.data.code===0){
          this.$Message.success(res.data.msg)
          this.getDataList();
        }
      })
    },
     getDataList(){
      getMasterPackageData().then(res => {
        this.tableData = res.data.data
      })
    },
     submit(modal,data){
        updataMasterPackage(data).then(res=>{
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
  }
}
</script>

<style>

</style>
