<template>
  <div>
    <Card>
      <tables ref="tables" editable searchable search-place="top" v-model="tableData" :columns="columns" @on-delete="handleDelete">
        <template slot="select">
          <Select v-model="searchKey" class="search-col" placeholder="母包">
            <Option v-for="item in columns" v-if="item.key !== 'handle'" :value="item.key" :key="`search-col-${item.key}`">{{ item.title }}</Option>
          </Select>
        </template>
        <template slot="add">
          <Button @click="handelAdd" class="search-btn" type="default"><Icon type="search"/>&nbsp;&nbsp;添加</Button>
        </template>
      </tables>
       <Modal
        v-model="modal1"
        title="添加"
        @on-ok="ok"
        @on-cancel="cancel">
        <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
          <FormItem label="任务名称" prop="taskName">
            <Input v-model="formValidate.taskName" placeholder="Enter your taskName"></Input>
          </FormItem>
          <FormItem label="母包" prop="main">
            <Input v-model="formValidate.main" placeholder="Enter your main"></Input>
          </FormItem>
          <FormItem label="渠道包进度" prop="progress">
            <Input v-model="formValidate.progress" placeholder="Enter your progress"></Input>
          </FormItem>
      </Form>
    </Modal>
      <Button style="margin: 10px 0;" type="primary" @click="exportExcel">导出为Csv文件</Button>
      <Page :total="100" show-elevator />
    </Card>
  </div>
</template>

<script>
import Tables from '_c/tables'
import { getTableData } from '@/api/data'
export default {
  name: 'tables_page',
  components: {
    Tables
  },
  data () {
    return {
      modal1: false,
      searchValue: '',
      searchKey: '',
      columns: [
        { title: '序号', type:'index', key: 'number', },
        { title: '任务名称', key: 'taskName', sortable: true },
        { title: '母包', key: 'main', editable: true },
        { title: '添加时间', key: 'createTime' },
        { title: '渠道包进度', key: 'progress' }
      ],
       formValidate: {
        taskName: '',
        main: '',
        progress: ''
      },
      ruleValidate: {
          taskName: [
              { required: true, message: 'The taskName cannot be empty', trigger: 'blur' }
          ],
          main: [
              { required: true, message: 'main cannot be empty', trigger: 'blur' }
          ],
          progress: [
              { required: true, message: 'Please select the progress', trigger: 'change' }
          ]
      },
      tableData: []
    }
  },
  methods: {
    ok(){},
    cancel(){},
    handelAdd(){
      this.modal1=true;
    },
    handleDelete (params) {
      console.log(params)
    },
    exportExcel () {
      this.$refs.tables.exportCsv({
        filename: `table-${(new Date()).valueOf()}.csv`
      })
    }
  },
  mounted () {
    getTableData().then(res => {
      this.tableData = res.data
    })
  }
}
</script>

<style>

</style>
