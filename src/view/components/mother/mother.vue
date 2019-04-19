<template>
  <div>
    <Card>
      <tables ref="tables" editable searchable search-place="top" v-model="tableData" :columns="columns" @on-delete="handleDelete">
        <template slot="add">
          <Button @click="handelAdd" class="search-btn" type="default"><Icon type="search"/>&nbsp;&nbsp;添加</Button>
        </template>
      </tables>
      <Button style="margin: 10px 0;" type="primary" @click="exportExcel">导出为Csv文件</Button>
      <Modal
        v-model="modal1"
        title="添加或修改"
        @on-ok="ok"
        @on-cancel="cancel">
        <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
          <FormItem label="游戏" prop="game">
            <Select v-model="formValidate.game" placeholder="Select your game">
              <Option value="beijing">New York</Option>
              <Option value="shanghai">London</Option>
              <Option value="shenzhen">Sydney</Option>
            </Select>
          </FormItem>
          <FormItem label="母包名称" prop="mainName">
            <Input v-model="formValidate.mainName" placeholder="Enter your mainName"></Input>
          </FormItem>
          <FormItem label="包名" prop="packName">
            <Input v-model="formValidate.packName" placeholder="Enter your packName"></Input>
          </FormItem>
          <FormItem label="备注" prop="remark">
            <Input v-model="formValidate.remark" placeholder="Enter your remark"></Input>
          </FormItem>
      </Form>
    </Modal>
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
      columns: [
        { title: '序号', type:'index', key: 'number', },
        { title: '包名', key: 'name', sortable: true },
        { title: '母包路径', key: 'url', editable: true },
        { title: '添加时间', key: 'createTime' },
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
                             this.show()
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
        mainName: '',
        remark: '',
        game: '',
        packName:''
      },
      ruleValidate: {
          mainName: [
              { required: true, message: 'The mainName cannot be empty', trigger: 'blur' }
          ],
          remark: [
              { required: true, message: 'remark cannot be empty', trigger: 'blur' }
          ],
          game: [
              { required: true, message: 'Please select the game', trigger: 'change' }
          ],
           packName: [
              { required: true, message: 'The packName cannot be empty', trigger: 'blur' }
          ],
      },
      tableData: []
      }
  },
  methods: {
    show () {
      this.modal1=true;
    },
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
    },
     handleSubmit (name) {
      this.$refs[name].validate((valid) => {
          if (valid) {
              this.$Message.success('Success!');
          } else {
              this.$Message.error('Fail!');
              }
          })
      },
      handleReset (name) {
          this.$refs[name].resetFields();
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
