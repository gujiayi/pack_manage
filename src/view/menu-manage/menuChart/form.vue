<template>
  <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80" >
    <Row>
      <Col span="12">
        <FormItem label="Date">
          <Row>
              <Col span="11">
                  <FormItem >
                     <DatePicker :value="formValidate.startTime" @on-change="startTimeChange" format="yyyy-MM-dd" type="date" placeholder="Select date" style="width: 200px"></DatePicker>
                  </FormItem>
              </Col>
              <Col span="2" style="text-align: center">-</Col>
              <Col span="11">
                  <FormItem >
                     <DatePicker :value="formValidate.endTime" @on-change="endTimeChange" format="yyyy-MM-dd" type="date" placeholder="Select date" style="width: 200px"></DatePicker>
                  </FormItem>
              </Col>
          </Row>
        </FormItem>
      </Col>
      <Col span="8">
        <FormItem label="名称" prop="route">
          <Input v-model="formValidate.route" placeholder="Enter your route"></Input>
        </FormItem>
      </Col>
      <Col span="4">
        <FormItem>
            <Button type="primary" @click="handleSubmit('formValidate')">查找</Button>
        </FormItem>
      </Col>
    </Row>
  </Form>
</template>
<script>
import {getDate} from '@/libs/tools'
export default {
  name:'vform',
  data(){
    return {
      startTimeOptions: {}, //开始日期设置
      endTimeOptions: {} ,//结束日期设置
      formValidate: {
        route: '/admin/login/index',
        startTime:'',
        endTime:'',
      },
      ruleValidate: {
        route: [
            { required: true, message: 'The route cannot be empty', trigger: 'blur' }
        ]
       }
    }
  },
  created(){
   this.getCurrentDate()
  this.$emit('submit',this.formValidate)
  },
  methods:{
    startTimeChange: function(e) { //设置开始时间
      this.formValidate.startTime=e
    },
      endTimeChange: function(e) { //设置结束时间
        this.formValidate.endTime=e
      },
    getCurrentDate(){
      var myDate = new Date();//获取系统当前时间
      let month='',date='';
      if(myDate.getMonth()<10){
        month='0'+(myDate.getMonth()+1)
      }else{
         month=myDate.getMonth()+1
      }
      if(myDate.getDate()<10){
        date='0'+myDate.getDate()
      }else{
         date=myDate.getDate()
      }
      this.formValidate.endTime=this.formValidate.startTime= (myDate.getFullYear()+'-'+ month +'-'+date)
    },
   handleSubmit(){
     this.$refs.formValidate.validate(valid => {
       if(valid){
        this.$emit('submit',this.formValidate)
       }
     })
   }
  }
}
</script>

