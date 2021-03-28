<template>
  <div ref="myEchart" style="height:100%;width:100%;border-radius:10px;">
    <el-input v-model="txtSelectProvince" type="text" style="display:none;"></el-input>
    <el-input v-model="txtChinaMapDisplayMode" type="text" style="display:none;"></el-input>
  </div>
</template>
<script>
import echarts from 'echarts'
export default {
  name: 'ViolationsProportion',
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
          if (this.$store.state.allChartsModule.componetResizeCount === 2) {
            var myEvent = new Event('resize')
            window.dispatchEvent(myEvent)
            this.$store.commit('allChartsModule/updateComponetResizeCount', 3)
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
    Violations: function () {
      let provinces = ['北京', '天津', '上海', '重庆', '河北', '河北', '山西', '辽宁', '吉林', '黑龙江', '江苏', '江苏', '浙江', '安徽', '福建', '江西', '山东', '河南', '湖北', '湖南', '广东', '海南', '四川', '贵州', '云南', '陕西', '甘肃', '青海', '台湾', '内蒙古', '广西', '西藏', '宁夏', '新疆', '香港', '澳门', '全国']
      let preMonth = [[14, 14, 4, 6, 3, 14, 6, 9, 12, 6, 2, 10], [7, 12, 3, 4, 5, 10, 1, 8, 13, 2, 10, 25], [4, 1, 8, 14, 1, 14, 14, 7, 12, 9, 9, 7], [14, 2, 1, 7, 4, 12, 6, 14, 10, 14, 14, 2], [1, 11, 12, 8, 7, 6, 11, 8, 13, 14, 5, 4], [1, 11, 12, 8, 7, 6, 11, 8, 13, 14, 5, 4], [12, 9, 3, 4, 13, 9, 2, 4, 12, 11, 12, 9], [7, 9, 13, 6, 3, 1, 11, 9, 8, 1, 8, 24], [5, 14, 13, 7, 5, 12, 6, 1, 13, 3, 7, 14], [5, 10, 2, 10, 10, 1, 8, 11, 9, 8, 11, 15], [14, 1, 4, 8, 6, 12, 6, 9, 8, 3, 5, 24], [14, 1, 4, 8, 6, 12, 6, 9, 8, 3, 5, 24], [11, 11, 4, 3, 3, 2, 14, 6, 4, 11, 15, 16], [13, 15, 11, 1, 1, 11, 2, 9, 10, 11, 15, 1], [10, 12, 2, 2, 11, 14, 6, 15, 6, 3, 5, 14], [13, 8, 6, 3, 14, 6, 5, 3, 8, 7, 3, 24], [15, 4, 9, 4, 2, 10, 6, 10, 10, 13, 13, 4], [8, 11, 2, 11, 10, 11, 9, 5, 9, 12, 4, 8], [11, 2, 14, 9, 4, 9, 6, 9, 12, 2, 7, 15], [6, 13, 4, 2, 1, 8, 18, 10, 3, 14, 1, 20], [12, 10, 10, 7, 10, 4, 6, 4, 7, 3, 5, 22], [3, 9, 1, 10, 15, 15, 2, 7, 9, 8, 1, 20], [6, 15, 9, 6, 5, 8, 2, 3, 15, 12, 11, 8], [15, 7, 12, 1, 7, 8, 6, 6, 6, 15, 8, 9], [3, 3, 9, 3, 13, 2, 12, 14, 1, 15, 5, 20], [13, 9, 4, 14, 8, 1, 8, 9, 7, 9, 3, 15], [8, 14, 8, 8, 14, 8, 4, 9, 12, 2, 8, 5], [3, 13, 9, 6, 12, 6, 1, 3, 6, 14, 5, 22], [2, 9, 9, 10, 2, 3, 9, 3, 14, 14, 14, 11], [11, 5, 11, 4, 10, 9, 7, 5, 8, 6, 9, 15], [13, 11, 12, 15, 4, 1, 6, 7, 15, 7, 7, 2], [3, 8, 11, 3, 9, 15, 15, 9, 2, 11, 9, 5], [13, 7, 13, 7, 4, 10, 6, 4, 3, 2, 8, 23], [3, 9, 7, 6, 10, 10, 6, 6, 16, 4, 2, 21], [4, 1, 6, 14, 13, 7, 13, 8, 7, 8, 4, 15], [10, 8, 2, 9, 10, 9, 4, 1, 15, 15, 9, 8], [8, 8, 7, 6, 7, 8, 7, 7, 9, 8, 7, 18]]
      let thisMonth = [[9, 9, 9, 11, 14, 6, 7, 2, 10, 10, 12, 1], [7, 2, 8, 11, 14, 5, 4, 14, 1, 5, 8, 21], [14, 2, 5, 10, 12, 8, 13, 4, 14, 3, 2, 13], [14, 2, 3, 10, 13, 6, 14, 1, 9, 4, 10, 14], [4, 11, 6, 11, 13, 8, 4, 8, 3, 9, 9, 14], [4, 11, 6, 11, 13, 8, 4, 8, 3, 9, 9, 14], [1, 15, 8, 5, 6, 14, 5, 1, 15, 4, 1, 25], [11, 1, 13, 8, 9, 12, 1, 9, 8, 15, 9, 4], [4, 3, 10, 4, 6, 12, 4, 13, 3, 15, 7, 19], [12, 2, 1, 7, 15, 6, 1, 2, 14, 12, 9, 19], [1, 4, 9, 15, 11, 12, 4, 8, 14, 8, 8, 6], [1, 4, 9, 15, 11, 12, 4, 8, 14, 8, 8, 6], [1, 13, 12, 14, 7, 12, 9, 3, 11, 8, 6, 4], [1, 12, 10, 4, 5, 4, 9, 10, 1, 10, 8, 26], [14, 8, 5, 4, 10, 10, 2, 11, 4, 15, 10, 7], [11, 4, 9, 4, 15, 6, 11, 4, 10, 13, 10, 3], [2, 15, 7, 6, 15, 6, 6, 2, 10, 9, 1, 21], [5, 6, 12, 8, 6, 1, 6, 7, 10, 14, 4, 21], [12, 5, 6, 6, 7, 15, 2, 11, 9, 7, 11, 9], [9, 12, 1, 9, 8, 5, 11, 1, 8, 9, 3, 24], [2, 2, 9, 3, 10, 11, 13, 2, 1, 11, 15, 21], [11, 6, 6, 12, 9, 2, 14, 9, 6, 3, 9, 13], [8, 2, 6, 13, 4, 14, 8, 15, 9, 3, 7, 11], [13, 12, 7, 3, 7, 13, 15, 3, 2, 7, 2, 16], [2, 9, 13, 1, 11, 10, 2, 6, 11, 13, 13, 9], [13, 10, 3, 11, 12, 5, 5, 6, 9, 13, 10, 3], [6, 4, 3, 9, 8, 13, 6, 5, 13, 7, 1, 25], [2, 1, 1, 13, 11, 14, 9, 10, 14, 6, 13, 6], [11, 6, 8, 7, 1, 10, 14, 1, 3, 10, 8, 21], [10, 15, 12, 10, 3, 12, 9, 7, 1, 8, 8, 5], [4, 10, 14, 7, 6, 2, 7, 14, 10, 7, 12, 7], [1, 11, 7, 16, 12, 1, 8, 6, 15, 1, 5, 17], [4, 7, 8, 13, 6, 14, 5, 11, 2, 10, 15, 5], [7, 9, 8, 2, 9, 8, 14, 6, 14, 11, 8, 4], [8, 7, 15, 7, 11, 7, 12, 2, 5, 14, 5, 7], [4, 9, 9, 12, 12, 7, 1, 11, 14, 5, 1, 15], [7, 7, 7, 8, 9, 8, 7, 6, 8, 8, 7, 18]]
      let indexPrince = provinces.indexOf(this.$store.state.allChartsModule.selectProvince)
      let currentProvincePreMonth = []
      currentProvincePreMonth = preMonth[indexPrince]
      let currentProvinceThisMonth = []
      currentProvinceThisMonth = thisMonth[indexPrince]
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
            text: '违规比例',
            left: 15,
            top: 15
          },
          tooltip: {
            trigger: 'axis',
            formatter: '{a0}: {c0}%<br />{a1}: {c1}%',
            backgroundColor: 'rgba(50,50,50,0.8)'
          },
          grid: {
            x: '8.5%',
            y: '35%',
            x2: '5%',
            y2: '15%'
          },
          legend: {
            data: ['本月', '上月'],
            top: '15%',
            itemGap: 40,
            itemWidth: 12,
            itemHeight: 12,
            icon: 'roundRect'
          },
          xAxis: {
            type: 'category',
            data: ['表情', '领带', '上装', '下装', '鞋子', '靠椅', '写字', '探头', '趴桌', '转笔', '转椅', '举手'],
            axisPointer: {
              type: 'shadow'
            },
            axisLabel: {
              color: '#6E6E6E'
            },
            splitLine: {show: false},
            // axisLabel: {show: false},
            axisTick: {show: false},
            axisLine: {show: false}
          },
          yAxis: [
            {
              type: 'value',
              min: 0,
              max: 25,
              interval: 5,
              axisLabel: {
                formatter: '{value} %',
                color: '#6E6E6E'
              },
              axisLine: {lineStyle: {color: '#C1C1C1'}},
              axisTick: {show: false}
            }
          ],
          series: [
            {
              name: '本月',
              type: 'bar',
              data: currentProvinceThisMonth,
              barMaxWidth: 16,
              label: {
                show: true,
                position: 'top',
                color: '#6E6E6E',
                formatter: '{c}%'
              },
              itemStyle: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                  offset: 0,
                  color: '#2ABBC2'
                }, {
                  offset: 1,
                  color: '#3C98BA'
                }])
              }
            },
            {
              name: '上月',
              type: 'line',
              data: currentProvincePreMonth,
              symbolSize: 0,
              itemStyle: {
                color: '#E4A600'
              },
              showSymbol: false
            }
          ]
        })
      }
    }
  }
}
</script>
