<template>
  <div>
    <Card>
      <tables
        ref="tables"
        editable
        searchable
        search-place="top"
        v-model="tableData"
        :columns="columns"
        @on-delete="handleDelete"
      >
        <template slot="select">
          <Select v-model="searchKey" class="search-col" placeholder="角色">
            <Option
              v-for="item in columns"
              v-if="item.key !== 'handle'"
              :value="item.key"
              :key="`search-col-${item.key}`"
            >{{ item.title }}</Option>
          </Select>
        </template>
      </tables>
      <Modal v-model="modal1" title="详情" @on-ok="ok" @on-cancel="cancel">
       
      </Modal>
      <Button style="margin: 10px 0;" type="primary" @click="exportExcel">导出为Csv文件</Button>
    </Card>
  </div>
</template>

<script>
import Tables from "_c/tables";
import { getTableData } from "@/api/data";
export default {
  name: "tables_page",
  components: {
    Tables
  },
  data() {
    return {
      modal1: false,
      searchKey: "",
      columns: [
        // {
        //   title:'id',
        //   key:'number',
        //   width:150,
        //   render:(h,params)=>{
        //     console.log(params)
        //     return h('span',params.index)
        //   }
        // },
         { title: "任务名称", key: "name" ,editable: true },
        // { title: "母包", key: "main" },
        { title: "添加时间", key: "createTime" },
        { title: "添加人", key: "person" },
        // {
        //   title: "操作",
        //   key: "action",
        //   width: 150,
        //   render: (h, params) => {
        //     return h("div", [
        //       h(
        //         "Button",
        //         {
        //           props: {
        //             type: "primary",
        //             size: "small"
        //           },
        //           style: {
        //             marginRight: "5px"
        //           },
        //           on: {
        //             click: () => {
        //               this.show();
        //             }
        //           }
        //         },
        //         "详情"
        //       )
        //     ]);
        //   }
        // }
      ],
      tableData: []
    };
  },
  methods: {
    show() {
      this.modal1 = true;
    },
    ok() {},
    cancel() {},
    exportExcel() {
      this.$refs.tables.exportCsv({
        filename: `table-${new Date().valueOf()}.csv`
      });
    }
  },
  mounted() {
    getTableData().then(res => {
      this.tableData = res.data;
    });
  }
};
</script>

<style>
</style>
