<template>
  <div>
    <Card>
      <create  :taskType="taskType" :MasterData="MasterData" ></create>
      <tables ref="tables"  v-model="tableData" :columns="columns">
      </tables>
    </Card>
    <vform :modal="modal" :taskType="taskType" :MasterData="MasterData" :currentForm="formValidate" :disabled="true" @cancelForm='handleCancle' :showCancle='false'>
      <div slot="form">
       <FormItem label="status" >
          <Input v-model="formValidate.status" placeholder="Enter your status" disabled readonly ></Input>
        </FormItem>
        <FormItem label="add_time" >
          <Input v-model="formValidate.add_time" placeholder="Enter your add_time" disabled readonly></Input>
        </FormItem>
        <FormItem label="comp_time" >
          <Input v-model="formValidate.comp_time" placeholder="Enter your comp_time" disabled readonly></Input>
        </FormItem>
        <FormItem label="exec_time" >
          <Input v-model="formValidate.exec_time" placeholder="Enter your exec_time" disabled readonly></Input>
        </FormItem>
    </div>
    </vform>
  </div>
</template>

<script>
import Tables from '_c/tables'
import { getTaskData,readTask,getTaskTypeData ,getMasterPackageData} from '@/api/data'
import vform from './form'
import create from './create'
export default {
  name: 'task',
  components: {
    Tables,
    vform,
    create
  },
  data () {
    return {
      modal: false,
      taskType:[],
      MasterData:[],
      columns: [
        {title: 'id',key:'id'},
        {title: 'typeId',key:'type_id'},
        {title:'master_package_id',key:'master_package_id'},
        {title:'母包名',key:'name'},
        {title:'母包路径',key:'path'},
        {
          title: "状态",
          key: "status",
          render: (h, params) => {
            return h("span", {},this.showStatus(params.row.status));
          }
        },
        { title: '任务完成数',
          key :'comp',
          render:(h,params)=>{
            return h("span",{},params.row.comp.toString())
          }
        },
        { title: '总任务数',
          key :'all',
          render:(h,params)=>{
            return h("span",{},params.row.all.toString())
          }
        },
        { title: '执行时间', key: 'exec_time' },
        { title: '添加时间', key: 'add_time' },
        { title: '完成时间', key: 'comp_time' },
         {
          title: '操作',
          key: 'action',
          width: 100,
          render: (h, params) => {
            return h("Button",{
              props: {
                type: 'primary',
                size: 'small'
              },
              style: {
                marginRight: '5px'
              },
              on: {
                click: () => {
                  this.handleShow(params.index)
                }
              }
            },'显示')
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
    this.geTaskType();
    this.getMasterList();
  },
  methods:{
    showStatus(status){
     if(status===0){
       return "未分配"
     }else if(status===1){
       return "已分配"
     }else{
        return "已完成"
     }
    },
    handleShow(index){
      this.modal=!this.modal
      let id=this.tableData[index].id;
      readTask({id}).then(res=>{
        this.formValidate=res.data.data
      })
    },
    ok_Sub(){
      this.getDataList();
    },
    handleCancle(modal){
      this.modal=modal
    },
    changeStatus(status){
      this.formValidate.status=status
    },
     getDataList(){
      getTaskData().then(res => {
        this.tableData = res.data.data
      })
    },
     geTaskType(){
      getTaskTypeData().then(res => {
        this.taskType = res.data.data
      })
    },
     getMasterList(){
      getMasterPackageData().then(res => {
        this.MasterData = res.data.data
      })
    },
  }
}
</script>

<style>

</style>
