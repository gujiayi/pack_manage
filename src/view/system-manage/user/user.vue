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
        <template slot="add">
          <Button @click="handelAdd" class="search-btn" type="default">
            <Icon type="search"/>&nbsp;&nbsp;添加
          </Button>
        </template>
      </tables>
      <Modal v-model="modal1" title="添加或修改" @on-ok="ok" @on-cancel="cancel">
        <!-- <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
          <FormItem label="游戏" prop="game">
            <Select v-model="formValidate.game" placeholder="Select your game">
              <Option value="beijing">New York</Option>
              <Option value="shanghai">London</Option>
              <Option value="shenzhen">Sydney</Option>
            </Select>
          </FormItem>
          <FormItem label="用户名" prop="userName">
            <Input v-model="formValidate.userName" placeholder="Enter your userName"></Input>
          </FormItem>
          <FormItem label="真实名称" prop="readName">
            <Input v-model="formValidate.readName" placeholder="Enter your readName"></Input>
          </FormItem>
          <FormItem label="角色" prop="role">
            <Input v-model="formValidate.role" placeholder="Enter your role"></Input>
          </FormItem>
           <FormItem label="状态" prop="status">
             <Switch v-model="formValidate.status" @on-change="changeStatus" />
          </FormItem>
        </Form> -->
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
         { title: "用户名", key: "name" ,editable: true },
        // { title: "用户名", key: "userName" },
        // { title: "真实名称", key: "readName" },
        // { title: "角色", key: "role" },
        // {
        //   title: "状态",
        //   key: "status",
        //   render: (h, params) => {
        //     return h("Switch", {
        //       props: {
        //         type: "primary",
        //         value: params.row.treatment === 1
        //       },
        //       on: {
        //         "on-change": value => {
        //           this.switch(params.index);
        //         }
        //       }
        //     });
        //   }
        // },
        // { title: "最后登录时间", key: "lastLoginTime" },
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
        //         "修改"
        //       )
        //     ]);
        //   }
        // }
      ],
      formValidate: {
        userName: "",
        readName: "",
        role: "",
        status:false
      },
      ruleValidate: {
        userName: [
          {
            required: true,
            message: "The userName cannot be empty",
            trigger: "blur"
          }
        ],
         readName: [
          {
            required: true,
            message: "The readName cannot be empty",
            trigger: "blur"
          }
        ],
        role: [
          { required: true, message: "role cannot be empty", trigger: "blur" }
        ]
      },
      tableData: []
    };
  },
  methods: {
    show() {
      this.modal1 = true;
    },
    ok() {},
    cancel() {},
    handelAdd() {
      this.modal1 = true;
    },
    handleDelete(params) {
      console.log(params);
    },
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
