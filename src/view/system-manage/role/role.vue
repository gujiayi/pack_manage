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
          <FormItem label="角色名称" prop="roleName">
            <Input v-model="formValidate.roleName" placeholder="Enter your roleName"></Input>
          </FormItem>
          <FormItem label="角色描述" prop="roleDesc">
            <Input v-model="formValidate.roleDesc" placeholder="Enter your roleDesc"></Input>
          </FormItem>
          <FormItem label="角色用户数" prop="roleCount">
            <InputNumber  :min="1" v-model="formValidate.roleCount"></InputNumber>
          </FormItem>
           <FormItem label="状态" prop="status">
             <Switch v-model="formValidate.status" @on-change="changeStatus" />
          </FormItem>
          <FormItem label="排序" prop="sort">
              <InputNumber  :min="1" v-model="formValidate.sort"></InputNumber>
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
         { title: "角色名称", key: "roleName" ,editable: true },
        // { title: "角色名称", key: "roleName" },
        // { title: "角色描述", key: "roleDesc" },
        // { title: "角色用户数", key: "roleCount" },
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
        // { title: "排序", key: "sort" },
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
        roleName: "",
        roleDesc: "",
        roleCount: "",
        status:false,
        sort:1
      },
      ruleValidate: {
        roleName: [
          {
            required: true,
            message: "The roleName cannot be empty",
            trigger: "blur"
          }
        ],
         roleDesc: [
          {
            required: true,
            message: "The roleDesc cannot be empty",
            trigger: "blur"
          }
        ],
        roleCount: [
          { required: true, message: "roleCount cannot be empty", trigger: "blur" }
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
