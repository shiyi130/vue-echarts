<template>
  <div ref="myEchart" style="height:100%;width:100%;border-radius:10px;">
    <el-input v-model="txtSelectProvince" type="text" style="display:none;"></el-input>
    <el-input v-model="txtChinaMapDisplayMode" type="text" style="display:none;"></el-input>
  </div>
</template>
<script>
import echarts from 'echarts'
export default {
  name: 'ViolationsStatistics',
  data () {
    return {
      chart: null
    }
  },
  computed: {
    txtSelectProvince: {
      get () {
        if (this.$store.state.allChartsModule.selectProvince === '') {
          // alert('Nothing is selected.')
          // return '全国'
        } else {
          this.Violations()
        }
        return this.$store.state.allChartsModule.selectProvince
      }
    },
    txtChinaMapDisplayMode: {
      get () {
        if (this.$store.state.allChartsModule.chinaMapDisplayMode === '') {
          // alert('Nothing is selected.')
          // return '全国'
        } else {
          this.Violations()
          if (this.$store.state.allChartsModule.componetResizeCount === 3) {
            var myEvent = new Event('resize')
            window.dispatchEvent(myEvent)
            this.$store.commit('allChartsModule/updateComponetResizeCount', 4)
          }
        }
        return this.$store.state.allChartsModule.chinaMapDisplayMode
      }
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.Violations()
    })
  },
  beforeDestroy () {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    Violations () {
      let provinces = ['北京', '天津', '上海', '重庆', '河北', '山西', '辽宁', '吉林', '黑龙江', '江苏', '浙江', '安徽', '福建', '江西', '山东', '河南', '湖北', '湖南', '广东', '海南', '四川', '贵州', '云南', '陕西', '甘肃', '青海', '台湾', '内蒙古', '广西', '西藏', '宁夏', '新疆', '香港', '澳门', '全国']
      let monthData = [[100, 215, 12, 47, 58, 47], [224, 153, 44, 158, 153, 50], [194, 226, 71, 229, 222, 142], [15, 19, 240, 231, 34, 197], [152, 96, 6, 200, 43, 102], [204, 156, 179, 245, 32, 140], [146, 114, 173, 19, 177, 179], [4, 144, 202, 108, 165, 143], [70, 43, 195, 172, 209, 193], [141, 186, 63, 143, 14, 182], [199, 76, 140, 224, 121, 54], [54, 201, 53, 167, 188, 166], [18, 68, 38, 218, 213, 57], [193, 119, 82, 144, 58, 75], [218, 220, 248, 241, 54, 6], [206, 165, 11, 183, 76, 159], [108, 63, 75, 12, 159, 103], [203, 63, 120, 89, 138, 108], [94, 72, 221, 94, 247, 244], [105, 159, 91, 248, 38, 226], [82, 186, 16, 144, 190, 40], [129, 173, 215, 5, 30, 71], [101, 39, 19, 206, 56, 111], [106, 246, 115, 87, 182, 1], [12, 95, 218, 62, 191, 92], [145, 148, 109, 49, 25, 243], [53, 146, 65, 225, 72, 197], [51, 249, 110, 225, 34, 220], [242, 132, 206, 187, 137, 35], [210, 94, 27, 195, 147, 148], [42, 120, 2, 4, 204, 228], [217, 225, 233, 3, 184, 42], [179, 206, 73, 193, 52, 160], [49, 250, 178, 11, 57, 77], [125, 143, 113, 140, 116, 124]]
      let indexPrince = provinces.indexOf(this.$store.state.allChartsModule.selectProvince)
      let currentMonthData = []
      currentMonthData = monthData[indexPrince]
      if (this.$refs.myEchart !== undefined) {
        let myChart = echarts.init(this.$refs.myEchart)
        window.onresize = myChart.resize
        myChart.setOption({
          graphic: [
            {
              type: 'group',
              right: '10',
              top: 20,
              children: [
                {
                  type: 'text',
                  z: 100,
                  left: 'right',
                  top: 'top',
                  style: {
                    fill: '#C1B974',
                    text: [
                      this.$store.state.allChartsModule.selectProvince + ' '
                    ].join('\n'),
                    textFont: 'bold 20px verdana'
                  }
                }
              ]
            }
          ],
          title: {
            text: '违规统计',
            top: 15,
            left: 15
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'none'
            },
            backgroundColor: 'rgba(50,50,50,0.8)',
            formatter: function (params, ticket, callback) {
              var htmlStr = ''
              for (var i = 0; i < params.length; i++) {
                var param = params[i]
                var xName = param.name// x轴的名称
                var seriesName = param.seriesName// 图例名称
                var value = param.value// y轴值
                var color = param.color// 图例颜色
                if (i === 0) {
                  htmlStr += xName + '<br/>'// x轴的名称
                }
                htmlStr += '<div align="left">' +
                                    '<span style="margin-right:5px;display:inline-block;width:10px;height:10px;border-radius:1.5px;background-color:' +
                                    color + ';"></span>' + seriesName + '&nbsp;&nbsp;' + value + '次'
              }
              return htmlStr
            }
          },
          legend: {
            data: ['违规数'],
            show: false
          },
          grid: {
            x: '10%',
            y: '35%',
            x2: '8%',
            y2: '15%'
          },
          xAxis: {
            type: 'category',
            boundaryGap: false,
            data: ['20.01', '20.02', '20.03', '20.04', '20.05', '20.06'],
            axisTick: {show: false},
            axisLine: {show: false}
          },
          yAxis: {
            type: 'value',
            min: 0,
            max: 250,
            interval: 50,
            axisTick: {show: false},
            axisLine: {show: false}
          },
          series: [
            {
              name: '违规数',
              type: 'line',
              stack: '总量',
              itemStyle: {
                color: '#33A8D1'
              },
              showSymbol: false,
              data: currentMonthData,
              areaStyle: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                  offset: 0.2,
                  color: '#E4F0F2'
                }, {
                  offset: 1,
                  color: '#FFFFFF'
                }])
              }
            }
          ]
        })
      }
    }
  }
}
</script>
