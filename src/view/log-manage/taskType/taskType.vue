<template>
  <div>
    <Card>
      <tables ref="tables" v-model="tableData" :columns="columns">
      </tables>
    </Card>
    <vform :modal="modal" :currentForm="formValidate" @cancelForm='handleCancle'></vform>
  </div>
</template>

<script>
import Tables from '_c/tables'
import { getTaskTypeData} from '@/api/data'
import vform from './form'
export default {
  name: 'task',
  components: {
    Tables,
    vform
  },
  data () {
    return {
      modal: false,
      columns: [
        {title:'渠道包',key:'name'},
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
      // readTask({id}).then(res=>{
      //   this.formValidate=res.data.data
      // })
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
      getTaskTypeData().then(res => {
        this.tableData = res.data.data
      })
    },
  }
}
</script>

<style>

</style>
