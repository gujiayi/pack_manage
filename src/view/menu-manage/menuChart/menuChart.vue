<template>
  <div>
    <Card shadow>
      <vform  @submit="handleSubmit"></vform>
      <chart  ref='chart' style="height: 310px;" :formData="formData" ></chart>
    </Card >
  </div>
</template>
<script>
import vform from './form'
import chart from './chart'
import { ChartPie, ChartBar } from '_c/charts'
import {getChart} from '@/api/data.js'
export default {
  name:"menuChart",
  components:{
    vform,
    chart,
    ChartBar,
  },
  data(){
    return {
      formData:{},
    }
  },
  methods:{
    getChartList(data1){
      let data={
        route:data1.route,
        start_date:data1.startTime,
        end_date:data1.endTime       
      }
      getChart(data).then(res=>{
        this.formData=res.data.data
        this.formData.random=Math.random();
      })
    },
    handleSubmit(data){
      this.getChartList(data)
      
    },
  }
}
</script>

