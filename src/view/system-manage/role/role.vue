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
      >
        <template slot="select">
          <!-- <Select v-model="searchKey" class="search-col" placeholder="角色">
            <Option
            ></Option>
          </Select> -->
        </template>
       <template slot='add'>
         <create>sffdf</create>
       </template>
      </tables>
    </Card>
  </div>
</template>

<script>
import create from "./create.vue"
import Tables from "_c/tables";
import { getRolesData } from "@/api/data";
export default {
  components: {
    Tables,
    create
  },
  data() {
    return {
      searchKey: "",
      columns: [
        // {
        //   title:'roleId',
        //   width:150,
        //   key:'role_id'
        // },
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
                      this.show();
                    }
                  }
                },
                "修改"
              )
            ]);
          }
        }
      ],
      formValidate: {
        name: "",
        description: "",
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
    }
  },
  mounted() {
    getRolesData().then(res => {
      this.tableData = res.data.data;
      console.log(res)
    });
  }
};
</script>

<style>
</style>
