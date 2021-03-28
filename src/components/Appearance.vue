<template>
  <div ref="myEchart" style="height:100%;width:100%;border-radius:10px;">
    <el-input v-model="txtSelectProvince" type="text" style="display:none;"></el-input>
    <el-input v-model="txtChinaMapDisplayMode" type="text" style="display:none;"></el-input>
  </div>
</template>
<script>
import echarts from 'echarts'
export default {
  name: 'Appearance',
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
          if (this.$store.state.allChartsModule.componetResizeCount === 4) {
            var myEvent = new Event('resize')
            window.dispatchEvent(myEvent)
            this.$store.commit('allChartsModule/updateComponetResizeCount', 5)
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
      let expressionData = [[146, 156, 245, 174, 15, 234], [222, 91, 107, 198, 245, 83], [200, 47, 66, 30, 208, 49], [175, 5, 148, 62, 94, 10], [16, 28, 26, 91, 163, 11], [26, 232, 38, 50, 126, 186], [203, 54, 164, 95, 99, 79], [71, 66, 236, 76, 38, 38], [195, 247, 5, 173, 247, 1], [55, 90, 166, 179, 198, 30], [217, 36, 162, 203, 114, 189], [92, 31, 128, 178, 19, 133], [47, 120, 21, 226, 241, 119], [178, 7, 141, 62, 135, 4], [212, 198, 206, 107, 52, 131], [65, 29, 246, 225, 50, 208], [10, 39, 48, 227, 97, 130], [233, 108, 25, 133, 51, 149], [175, 232, 121, 11, 242, 234], [140, 17, 32, 247, 26, 42], [178, 213, 110, 197, 9, 196], [247, 31, 238, 86, 125, 60], [43, 200, 85, 58, 73, 108], [119, 70, 155, 136, 106, 153], [242, 124, 239, 104, 212, 72], [214, 32, 211, 66, 175, 204], [230, 116, 156, 47, 204, 75], [127, 92, 177, 223, 165, 62], [101, 219, 234, 114, 227, 79], [151, 56, 128, 82, 157, 135], [236, 239, 80, 242, 33, 12], [158, 192, 241, 83, 193, 61], [153, 192, 185, 134, 46, 110], [134, 197, 22, 43, 131, 76], [147, 111, 135, 128, 126, 101]]
      let necktieData = [[236, 22, 220, 125, 154, 73], [111, 37, 92, 82, 48, 219], [174, 171, 205, 132, 199, 239], [242, 83, 37, 114, 233, 159], [4, 62, 92, 183, 33, 27], [178, 26, 32, 219, 193, 34], [172, 50, 15, 41, 54, 43], [43, 132, 168, 236, 160, 9], [131, 230, 122, 116, 111, 172], [86, 189, 67, 239, 213, 78], [140, 137, 189, 23, 3, 181], [153, 103, 149, 243, 39, 192], [126, 98, 10, 84, 91, 18], [53, 187, 232, 27, 249, 98], [64, 98, 166, 12, 89, 207], [146, 237, 127, 126, 96, 97], [210, 58, 173, 221, 240, 220], [242, 222, 197, 71, 238, 154], [181, 186, 130, 67, 64, 83], [2, 18, 143, 245, 216, 94], [210, 216, 208, 118, 115, 187], [234, 62, 60, 72, 33, 70], [73, 240, 8, 77, 160, 179], [206, 129, 88, 103, 202, 26], [127, 180, 114, 150, 103, 32], [239, 8, 149, 24, 3, 172], [111, 55, 144, 194, 170, 52], [179, 17, 47, 155, 85, 63], [107, 10, 178, 209, 233, 6], [186, 3, 49, 25, 226, 218], [14, 156, 184, 109, 242, 173], [224, 191, 120, 60, 57, 216], [123, 181, 44, 54, 227, 82], [58, 205, 88, 117, 149, 234], [140, 117, 119, 119, 139, 120]]
      let jacketData = [[213, 205, 104, 34, 176, 117], [143, 5, 153, 158, 104, 110], [162, 82, 85, 85, 9, 15], [56, 100, 91, 11, 28, 199], [10, 3, 229, 46, 204, 125], [147, 155, 104, 133, 86, 85], [190, 59, 214, 190, 173, 227], [43, 64, 189, 247, 41, 205], [201, 240, 179, 86, 236, 182], [133, 108, 5, 116, 194, 107], [168, 52, 154, 227, 137, 5], [189, 123, 244, 106, 175, 163], [48, 106, 125, 233, 179, 32], [33, 125, 123, 68, 60, 176], [172, 17, 42, 232, 65, 238], [145, 70, 29, 52, 117, 89], [209, 20, 2, 249, 136, 46], [92, 201, 241, 93, 169, 248], [248, 17, 130, 40, 109, 200], [42, 200, 100, 196, 216, 193], [66, 188, 230, 69, 85, 60], [143, 130, 206, 68, 159, 5], [212, 171, 237, 72, 120, 95], [11, 36, 202, 21, 15, 80], [70, 41, 111, 143, 229, 55], [52, 146, 214, 56, 145, 250], [167, 193, 67, 75, 71, 5], [191, 80, 130, 215, 82, 188], [154, 249, 213, 174, 233, 236], [168, 40, 10, 185, 234, 202], [232, 160, 104, 23, 244, 121], [250, 122, 102, 102, 40, 124], [32, 73, 192, 137, 114, 45], [186, 103, 246, 180, 236, 152], [134, 108, 141, 121, 135, 128]]
      let bottomsData = [[207, 191, 105, 147, 129, 161], [118, 51, 12, 128, 85, 170], [40, 81, 60, 59, 33, 145], [116, 122, 226, 139, 2, 2], [103, 192, 223, 229, 228, 39], [115, 134, 156, 9, 45, 18], [117, 185, 173, 127, 45, 103], [19, 237, 188, 219, 65, 105], [95, 220, 194, 77, 184, 70], [201, 28, 129, 169, 199, 246], [143, 129, 185, 193, 230, 184], [53, 181, 158, 150, 200, 240], [197, 201, 74, 223, 173, 23], [248, 74, 218, 137, 228, 139], [246, 118, 184, 73, 239, 73], [7, 207, 249, 60, 120, 121], [59, 195, 16, 133, 185, 69], [139, 236, 137, 109, 113, 105], [249, 8, 48, 244, 140, 234], [10, 57, 225, 90, 150, 187], [169, 214, 30, 164, 128, 105], [148, 91, 93, 235, 246, 189], [23, 191, 181, 204, 199, 7], [82, 190, 202, 127, 159, 133], [109, 23, 2, 217, 65, 63], [134, 156, 136, 215, 221, 61], [246, 173, 75, 6, 164, 224], [224, 20, 96, 30, 145, 107], [31, 118, 154, 35, 197, 137], [18, 7, 46, 231, 32, 233], [6, 179, 195, 29, 244, 43], [198, 57, 27, 206, 236, 50], [226, 224, 97, 243, 48, 234], [241, 53, 14, 74, 32, 62], [127, 133, 126, 139, 144, 120]]
      let shoesData = [[23, 92, 151, 4, 217, 216], [231, 140, 224, 236, 75, 17], [21, 106, 246, 172, 245, 7], [54, 202, 207, 42, 195, 158], [11, 194, 142, 27, 143, 228], [80, 118, 4, 164, 90, 209], [142, 59, 48, 47, 194, 43], [202, 131, 110, 100, 132, 161], [100, 243, 49, 225, 91, 154], [28, 170, 48, 211, 229, 3], [28, 203, 56, 21, 19, 216], [80, 50, 129, 29, 84, 223], [215, 190, 181, 249, 229, 141], [121, 44, 46, 216, 31, 14], [250, 105, 136, 66, 61, 10], [144, 9, 21, 79, 34, 87], [56, 126, 165, 194, 43, 102], [243, 176, 1, 171, 52, 208], [82, 41, 193, 159, 45, 192], [174, 18, 56, 227, 203, 3], [13, 129, 248, 119, 217, 163], [71, 53, 110, 239, 183, 219], [108, 45, 79, 68, 72, 182], [56, 28, 222, 152, 22, 83], [107, 247, 163, 49, 84, 9], [245, 249, 182, 176, 20, 71], [147, 89, 108, 185, 111, 39], [8, 166, 189, 117, 38, 121], [250, 207, 36, 108, 122, 211], [231, 243, 234, 241, 130, 50], [104, 248, 81, 233, 5, 92], [9, 157, 185, 13, 182, 90], [169, 71, 24, 86, 38, 212], [171, 78, 217, 226, 75, 199], [116, 130, 126, 136, 109, 121]]
      let indexPrince = provinces.indexOf(this.$store.state.allChartsModule.selectProvince)
      let currentExpression = []
      currentExpression = expressionData[indexPrince]
      let currentNecktie = []
      currentNecktie = necktieData[indexPrince]
      let currentJacket = []
      currentJacket = jacketData[indexPrince]
      let currentBottoms = []
      currentBottoms = bottomsData[indexPrince]
      let currentShoes = []
      currentShoes = shoesData[indexPrince]
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
            text: '仪容仪表',
            top: 15,
            left: 15
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'line',
              lineStyle: {
                width: 3,
                color: {
                  x: 0,
                  y: 0,
                  x2: 0,
                  y2: 1,
                  colorStops: [{
                    offset: 0, color: 'rgba(255,255,255,0.6)' // 0% 处的颜色
                  }, {
                    offset: 1, color: 'rgba(56,142,174,1)' // 100% 处的颜色
                  }]
                }
              }
            },
            padding: [10, 5, 10, 5],
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
                if (i === 2 || i === 4) {
                  htmlStr += '<div style="clear:both;float:left;width:100px;" align="left">'
                } else {
                  htmlStr += '<div style="float:left;width:100px;"  align="left">'
                }

                // 为了保证和原来的效果一样，这里自己实现了一个点的效果
                htmlStr += '<span style="margin-right:5px;display:inline-block;width:10px;height:10px;border-radius:1.5px;background-color:' + color + ';"></span>'

                // 圆点后面显示的文本
                htmlStr += seriesName + '&nbsp;&nbsp;' + value

                htmlStr += '</div>'
              }
              return htmlStr
            }
          },
          legend: {
            data: ['表情', '领带', '上装', '下装', '鞋子'],
            top: '20%',
            left: '5%',
            itemGap: 13,
            itemWidth: 12,
            itemHeight: 12,
            icon: 'roundRect'
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
            show: true,
            type: 'value',
            min: 0,
            max: 250,
            interval: 50,
            axisTick: {show: false},
            axisLine: {show: false}
          },
          series: [
            {
              name: '表情',
              type: 'line',
              data: currentExpression,
              symbolSize: 0,
              itemStyle: {
                color: '#EBA000'
              },
              showSymbol: false
            },
            {
              name: '领带',
              type: 'line',
              data: currentNecktie,
              symbolSize: 0,
              itemStyle: {
                color: '#0083C7'
              },
              showSymbol: false
            },
            {
              name: '上装',
              type: 'line',
              data: currentJacket,
              symbolSize: 0,
              itemStyle: {
                color: '#8076D7'
              },
              showSymbol: false
            },
            {
              name: '下装',
              type: 'line',
              data: currentBottoms,
              symbolSize: 0,
              itemStyle: {
                color: '#26C58C'
              },
              showSymbol: false
            },
            {
              name: '鞋子',
              type: 'line',
              data: currentShoes,
              symbolSize: 0,
              itemStyle: {
                color: '#FE436C'
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
