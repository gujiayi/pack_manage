<template>
    <div ref="dom" click="drowChart()"></div>
</template>

<script>
import echarts from 'echarts'
import { on, off } from '@/libs/tools'
export default {
  name: 'serviceRequests',
  props:{
    formData:{},
  },
  data () {
    return {
      dom: null,
      time_stats:[],
      times:[],
      user_max:[]
    }
  },
  watch:{
    formData(){
      this.times=[]; this.user_max=[];this.time_stats=[];
      this.formData.access.forEach(item => {
        this.time_stats.push(item.time_stats)
        this.times.push(item.times)
      });
      this.formData.usetime.forEach(item => {
        this.user_max.push(item.max)
      });
      this.drowChart();
    }
  },
  methods: {
    resize () {
      this.dom.resize()
    },
    drowChart(){
     const  option = {
          title: {
            text: '接口数据访问',
            subtext: '访问量'
          },
          tooltip: {
              trigger: 'axis'
          },
          legend: {
              data:['最大数','最小数']
          },
          toolbox: {
            show: true,
            feature: {
                dataZoom: {
                    yAxisIndex: 'none'
                },
                dataView: {readOnly: false},
                magicType: {type: ['line', 'bar']},
                restore: {},
                saveAsImage: {}
            }
          },
          xAxis:  {
              type: 'category',
              boundaryGap: false,
              data:this.time_stats
          },
          yAxis: {
              type: 'value',
              axisLabel: {
                  formatter: this.times
              }
          },
          series: [
            {
            name:'times',
            type:'line',
            data:this.times,
            markPoint: {
                data: [
                    {type: 'max', name: '最大数'},
                    {type: 'min', name: '最小数'}
                ]
            },
            markLine: {
                data: [
                    {type: 'average', name: '平均值'}
                ]
            }
          },
          {
              name:'max',
              type:'line',
              data:this.user_max,
          }
        ]
      };
      this.$nextTick(() => {
        this.dom = echarts.init(this.$refs.dom)
        this.dom.setOption(option,true)
        on(window, 'resize', this.resize)
      })
    }
  },
  mounted () {
   this.drowChart();
  },
  beforeDestroy () {
    off(window, 'resize', this.resize)
  }
}
</script>
