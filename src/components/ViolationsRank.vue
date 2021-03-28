<template>
  <div style="height: 100%; width: 100%; position: relative;border-radius:10px;z-index:1">
    <div style="position: absolute; left: 70%; top: 5%;border: 1px solid #DCDCDC;">
      <select
        v-model="selectOrder"
        style="position:relative; z-index:2;outline: none;border: none;"
      >
        <option
          v-for="orderItem in orderItems"
          :key="orderItem.value"
          :value="orderItem.value"
        >{{orderItem.label}}</option>
      </select>
    </div>
    <div ref="myEchart" style="height:100%;width:100%;"></div>
    <el-input v-model="txtSelectProvince" type="text" style="display:none;"></el-input>
  </div>
</template>
<script>
import echarts from 'echarts'
export default {
  name: 'ViolationsRank',
  data () {
    return {
      orderItems: [{
        value: 'thisMonthAsc',
        label: '本月升序'
      }, {
        value: 'thisMonthDesc',
        label: '本月降序'
      }],
      selectOrder: 'thisMonthAsc'
    }
  },
  computed: {
    txtSelectProvince: {
      get () {
        if (this.$store.state.allChartsModule.selectProvince === '') {
          return '全国'
        } else {
          this.Violations()
          return this.$store.state.allChartsModule.selectProvince
        }
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
      let province = ['山东', '安徽', '云南', '重庆', '海南', '吉林', '上海', '广西', '浙江', '四川', '甘肃', '台湾', '黑龙江', '青海', '新疆', '江西', '香港', '辽宁', '河北', '宁夏', '河南', '天津', '广东', '福建', '湖南', '西藏', '江苏', '澳门', '陕西', '北京', '内蒙古', '贵州', '湖北', '山西', '全国']
      let thisMonth = [234, 330, 374, 446, 650, 670, 714, 907, 959, 1119, 1143, 1163, 1303, 1419, 1451, 1516, 1720, 1784, 1804, 1900, 1912, 1920, 1944, 1952, 2048, 2080, 2317, 2329, 2337, 2376, 2509, 2605, 2637, 2913, 53485]
      let preMonth = [1218, 1843, 1750, 140, 2421, 664, 1989, 1296, 2115, 1290, 190, 612, 910, 2190, 1170, 1949, 2683, 1326, 2155, 1700, 794, 1457, 2614, 1166, 1001, 2336, 1975, 2249, 173, 841, 1080, 793, 2951, 1151, 50192]
      let indexPrince = province.indexOf(this.$store.state.allChartsModule.selectProvince)
      let currentProvinceName = []
      let currentThisMonProvinceData = []
      let currentPreMonProvinceData = []
      if (this.selectOrder === 'thisMonthDesc') {
        currentProvinceName = ['山东', '安徽', '云南', '重庆', '海南', '全国']
        currentThisMonProvinceData = [234, 330, 374, 446, 650, 53485]
        currentPreMonProvinceData = [1218, 1843, 1750, 140, 2421, 50192]
        if (currentProvinceName.indexOf(this.$store.state.allChartsModule.selectProvince) === -1) {
          currentProvinceName.unshift({value: province[indexPrince], textStyle: { color: '#BBAD04' }})
          currentThisMonProvinceData.unshift({ value: thisMonth[indexPrince], label: { show: true, formatter: function (params) { return params.value + '（第' + (34 - indexPrince) + '位）' }, position: 'right', color: '#BBAD04' } })
          currentPreMonProvinceData.unshift(preMonth[indexPrince])
        }
      } else if (this.selectOrder === 'thisMonthAsc') {
        currentProvinceName = ['北京', '内蒙古', '贵州', '湖北', '山西', '全国']
        currentThisMonProvinceData = [2376, 2509, 2605, 2637, 2913, 53485]
        currentPreMonProvinceData = [841, 1080, 793, 2951, 1151, 50192]
        if (currentProvinceName.indexOf(this.$store.state.allChartsModule.selectProvince) === -1) {
          currentProvinceName.unshift({value: province[indexPrince], textStyle: { color: '#BBAD04' }})
          currentThisMonProvinceData.unshift({ value: thisMonth[indexPrince], label: { show: true, formatter: function (params) { return params.value + '（第' + (34 - indexPrince) + '位）' }, position: 'right', color: '#BBAD04' } })
          currentPreMonProvinceData.unshift(preMonth[indexPrince])
        }
      }
      if (this.$refs.myEchart !== undefined) {
        let myChart = echarts.init(this.$refs.myEchart)
        window.onresize = myChart.resize
        myChart.setOption({
          title: [{
            text: '违规统计',
            top: 15,
            left: 15,
            width: 20
          },
          {
            text: 'TOP5',
            top: 15,
            left: 90,
            textStyle: {
              color: '#E6833F'
            }
          }],
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'shadow'
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
                                    color + ';"></span>' + seriesName + '&nbsp;&nbsp;' + value
              }
              return htmlStr
            }
          },
          legend: {
            data: ['本月', '上月'],
            top: '18%',
            itemGap: 40,
            itemWidth: 12,
            itemHeight: 12,
            icon: 'roundRect'
          },
          grid: {
            x: '5%',
            y: '28%',
            x2: '8%',
            y2: '5%',
            containLabel: true
          },
          xAxis: {
            splitLine: {show: false},
            axisLabel: {show: false},
            axisTick: {show: false},
            axisLine: {show: false}
          },
          yAxis: {
            type: 'category',
            axisLine: {show: false},
            axisTick: {show: false},
            data: currentProvinceName
          },
          series: [
            {
              name: '本月',
              type: 'bar',
              barMaxWidth: 6,
              label: {
                show: true,
                position: 'right',
                color: '#B5B5B5'
              },
              data: currentThisMonProvinceData,
              itemStyle: {
                color: '#33A8D1'
              }
            },
            {
              name: '上月',
              type: 'bar',
              barMaxWidth: 6,
              data: currentPreMonProvinceData,
              itemStyle: {
                color: '#17CB8F'
              }
            }
          ]
        })
      }
    }
  }
}
</script>
