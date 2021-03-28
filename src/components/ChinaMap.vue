<template>
  <div
    style="
      height: 100%;
      width: 100%;
      position: relative;
      border-radius: 10px;
      z-index: 1;
    "
  >
    <div style="position: absolute; left: 77%; top: 3%;border: 1px solid #dcdcdc;">
      <select
        v-model="selectZoom"
        style="position: relative; z-index: 2; outline: none; border: none;"
        @change="onChangeSelectZoom"
      >
        <option
          v-for="zoomItem in zoomItems"
          :key="zoomItem.value"
          :value="zoomItem.value"
        >{{ zoomItem.label }}</option>
      </select>
    </div>
    <div ref="myEchart" style="height: 100%; width: 100%;">
      <el-input v-model="txtChinaMapDisplayMode" type="text" style="display:none;"></el-input>
    </div>
  </div>
</template>
<script>
import echarts from 'echarts'
//   import '../../node_modules/echarts/map/js/world.js'
import 'echarts/map/js/china.js' // 引入中国地图数据
export default {
  name: 'ChinaMap',
  // eslint-disable-next-line vue/require-prop-types
  props: ['userJson'],
  data () {
    return {
      zoomItems: [
        {
          value: '1',
          label: '100%倍率显示'
        },
        {
          value: '1.5',
          label: '150%倍率显示'
        },
        {
          value: '2',
          label: '200%倍率显示'
        }
      ],
      selectZoom: '1'
    }
  },
  computed: {
    txtChinaMapDisplayMode: {
      get () {
        if (this.$store.state.allChartsModule.chinaMapDisplayMode === '') {
          // alert('Nothing is selected.')
          // return '全国'
        } else {
          this.chinaConfigure(this.selectZoom, [{name: this.$store.state.allChartsModule.selectProvince, selected: true}])
          if (this.$store.state.allChartsModule.componetResizeCount === 1) {
            var myEvent = new Event('resize')
            window.dispatchEvent(myEvent)
            this.$store.commit('allChartsModule/updateComponetResizeCount', 2)
          }
        }
        return this.$store.state.allChartsModule.chinaMapDisplayMode
      }
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.chinaConfigure(this.selectZoom, [{name: this.$store.state.allChartsModule.selectProvince, selected: true}])
    })
  },
  beforeDestroy () {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  },
  created () {},
  methods: {
    onChangeSelectZoom: function (e) {
      this.chinaConfigure(this.selectZoom, [{name: this.$store.state.allChartsModule.selectProvince, selected: true}])
    },
    chinaConfigure (paramZoom, paramSelectedObject) {
      let vm = this
      let provinceData = [
        { name: '北京', value: 882 },
        { name: '天津', value: 785 },
        { name: '上海', value: 2754 },
        { name: '重庆', value: 856 },
        { name: '河北', value: 778 },
        { name: '山西', value: 1687 },
        { name: '辽宁', value: 2180 },
        { name: '吉林', value: 811 },
        { name: '黑龙江', value: 1808 },
        { name: '江苏', value: 2745 },
        { name: '浙江', value: 2421 },
        { name: '安徽', value: 2773 },
        { name: '福建', value: 1214 },
        { name: '江西', value: 573 },
        { name: '山东', value: 3626 },
        { name: '河南', value: 1938 },
        { name: '湖北', value: 1625 },
        { name: '湖南', value: 376 },
        { name: '广东', value: 816 },
        { name: '海南', value: 955 },
        { name: '四川', value: 337 },
        { name: '贵州', value: 2764 },
        { name: '云南', value: 1368 },
        { name: '陕西', value: 274 },
        { name: '甘肃', value: 983 },
        { name: '青海', value: 1717 },
        { name: '台湾', value: 1228 },
        { name: '内蒙古', value: 850 },
        { name: '广西', value: 159 },
        { name: '西藏', value: 844 },
        { name: '宁夏', value: 770 },
        { name: '新疆', value: 1680 },
        { name: '香港', value: 793 },
        { name: '澳门', value: 1267 },
        { name: '南海诸岛', value: 589 }
      ]
      if (this.$refs.myEchart !== undefined) {
        // console.log(this.userJson)
        let myChart = echarts.init(this.$refs.myEchart) // 这里是为了获得容器所在位置
        window.onresize = () => {
          // 基于准备好的dom，初始化echarts实例
          myChart.resize()
          // console.log('changeChartSize：' + myChart)
        }
        var geoCoordMap = {
          海门: [121.15, 31.89],
          鄂尔多斯: [109.781327, 39.608266],
          招远: [120.38, 37.35],
          舟山: [122.207216, 29.985295],
          齐齐哈尔: [123.97, 47.33],
          盐城: [120.13, 33.38],
          赤峰: [118.87, 42.28],
          青岛: [120.33, 36.07],
          乳山: [121.52, 36.89],
          金昌: [102.188043, 38.520089],
          泉州: [118.58, 24.93],
          莱西: [120.53, 36.86],
          日照: [119.46, 35.42],
          胶南: [119.97, 35.88],
          南通: [121.05, 32.08],
          拉萨: [91.11, 29.97],
          云浮: [112.02, 22.93],
          梅州: [116.1, 24.55],
          文登: [122.05, 37.2],
          上海: [121.48, 31.22],
          攀枝花: [101.718637, 26.582347],
          威海: [122.1, 37.5],
          承德: [117.93, 40.97],
          厦门: [118.1, 24.46],
          汕尾: [115.375279, 22.786211],
          潮州: [116.63, 23.68],
          丹东: [124.37, 40.13],
          太仓: [121.1, 31.45],
          曲靖: [103.79, 25.51],
          烟台: [121.39, 37.52],
          福州: [119.3, 26.08],
          瓦房店: [121.979603, 39.627114],
          即墨: [120.45, 36.38],
          抚顺: [123.97, 41.97],
          玉溪: [102.52, 24.35],
          张家口: [114.87, 40.82],
          阳泉: [113.57, 37.85],
          莱州: [119.942327, 37.177017],
          湖州: [120.1, 30.86],
          汕头: [116.69, 23.39],
          昆山: [120.95, 31.39],
          宁波: [121.56, 29.86],
          湛江: [110.359377, 21.270708],
          揭阳: [116.35, 23.55],
          荣成: [122.41, 37.16],
          连云港: [119.16, 34.59],
          葫芦岛: [120.836932, 40.711052],
          常熟: [120.74, 31.64],
          东莞: [113.75, 23.04],
          河源: [114.68, 23.73],
          淮安: [119.15, 33.5],
          泰州: [119.9, 32.49],
          南宁: [108.33, 22.84],
          营口: [122.18, 40.65],
          惠州: [114.4, 23.09],
          江阴: [120.26, 31.91],
          蓬莱: [120.75, 37.8],
          韶关: [113.62, 24.84],
          嘉峪关: [98.289152, 39.77313],
          广州: [113.23, 23.16],
          延安: [109.47, 36.6],
          太原: [112.53, 37.87],
          清远: [113.01, 23.7],
          中山: [113.38, 22.52],
          昆明: [102.73, 25.04],
          寿光: [118.73, 36.86],
          盘锦: [122.070714, 41.119997],
          长治: [113.08, 36.18],
          深圳: [114.07, 22.62],
          珠海: [113.52, 22.3],
          宿迁: [118.3, 33.96],
          咸阳: [108.72, 34.36],
          铜川: [109.11, 35.09],
          平度: [119.97, 36.77],
          佛山: [113.11, 23.05],
          海口: [110.35, 20.02],
          江门: [113.06, 22.61],
          章丘: [117.53, 36.72],
          肇庆: [112.44, 23.05],
          大连: [121.62, 38.92],
          临汾: [111.5, 36.08],
          吴江: [120.63, 31.16],
          石嘴山: [106.39, 39.04],
          沈阳: [123.38, 41.8],
          苏州: [120.62, 31.32],
          茂名: [110.88, 21.68],
          嘉兴: [120.76, 30.77],
          长春: [125.35, 43.88],
          胶州: [120.03336, 36.264622],
          银川: [106.27, 38.47],
          张家港: [120.555821, 31.875428],
          三门峡: [111.19, 34.76],
          锦州: [121.15, 41.13],
          南昌: [115.89, 28.68],
          柳州: [109.4, 24.33],
          三亚: [109.511909, 18.252847],
          自贡: [104.778442, 29.33903],
          吉林: [126.57, 43.87],
          阳江: [111.95, 21.85],
          泸州: [105.39, 28.91],
          西宁: [101.74, 36.56],
          宜宾: [104.56, 29.77],
          呼和浩特: [111.65, 40.82],
          成都: [104.06, 30.67],
          大同: [113.3, 40.12],
          镇江: [119.44, 32.2],
          桂林: [110.28, 25.29],
          张家界: [110.479191, 29.117096],
          宜兴: [119.82, 31.36],
          北海: [109.12, 21.49],
          西安: [108.95, 34.27],
          金坛: [119.56, 31.74],
          东营: [118.49, 37.46],
          牡丹江: [129.58, 44.6],
          遵义: [106.9, 27.7],
          绍兴: [120.58, 30.01],
          扬州: [119.42, 32.39],
          常州: [119.95, 31.79],
          潍坊: [119.1, 36.62],
          重庆: [106.54, 29.59],
          台州: [121.420757, 28.656386],
          南京: [118.78, 32.04],
          滨州: [118.03, 37.36],
          贵阳: [106.71, 26.57],
          无锡: [120.29, 31.59],
          本溪: [123.73, 41.3]
        }
        // 拼接对象数组
        var convertData = function (data) {
          // console.log(data)
          var res = []
          for (var i = 0; i < data.length; i++) {
            var geoCoord = geoCoordMap[data[i].name] // 获取坐标
            if (geoCoord) {
              // 如果有坐标
              res.push({
                // 创建对象数组，
                name: data[i].name,
                value: geoCoord.concat(data[i].value) // 用连接数组的形式将value值加入
              })
              // res.push(geoCoord.concat(data[i].value));
              // res.push(geoCoord.concat(data[i].name));
            }
          }
          return res
        }
        // 1、清除画布
        myChart.clear()
        myChart.setOption({
          // 进行相关配置
          title: {
            text: '地图',
            top: 15,
            left: 15
          },
          tooltip: { backgroundColor: 'rgba(50,50,50,0.8)' }, // 鼠标移到图里面的浮动提示框
          // toolbox: {
          //   top: '3%',
          //   left: '95%',
          //   feature: {
          //     myTool1: {
          //       show: true,
          //       title: '模式切换',
          //       icon: 'path://M432.45,595.444c0,2.177-4.661,6.82-11.305,6.82c-6.475,0-11.306-4.567-11.306-6.82s4.852-6.812,11.306-6.812C427.841,588.632,432.452,593.191,432.45,595.444L432.45,595.444z M421.155,589.876c-3.009,0-5.448,2.495-5.448,5.572s2.439,5.572,5.448,5.572c3.01,0,5.449-2.495,5.449-5.572C426.604,592.371,424.165,589.876,421.155,589.876L421.155,589.876z M421.146,591.891c-1.916,0-3.47,1.589-3.47,3.549c0,1.959,1.554,3.548,3.47,3.548s3.469-1.589,3.469-3.548C424.614,593.479,423.062,591.891,421.146,591.891L421.146,591.891zM421.146,591.891',
          //       onclick: function () {
          //           alert('myToolHandler1')
          //         }
          //       }
          //     }
          // },
          visualMap: {
            pieces: [
              { min: 2001, label: '2000次以上' },
              { min: 1000, max: 2000, label: '1000-2000次' },
              { min: 500, max: 999, label: '500-1000次' },
              { max: 499, label: '<500次' }
            ],
            type: 'piecewise',
            top: '45%',
            right: '5%',
            bottom: 20,
            inRange: {
              color: ['#A9D2E4', '#44BBE5', '#01A0E2', '#03668F'],
              symbolSize: [30, 100]
            },
            seriesIndex: [1],
            orient: 'vertical',
            align: 'left',
            itemWidth: 12,
            itemHeight: 12,
            itemGap: 20,
            icon: 'roundRect'
          },
          geo: {
            // 这个是重点配置区
            selectedMode: 'single',
            roam: true,
            zoom: paramZoom,
            map: 'china', // 表示中国地图
            left: '2%',
            right: '12%',
            top: '3%',
            bottom: '3%',
            label: {
              normal: {
                show: true, // 是否显示对应地名
                textStyle: {
                  color: 'rgba(0,0,0,0.6)'
                },
                fontSize: 12
              }
            },
            itemStyle: {
              normal: {
                borderColor: '#FFFFFF'
              },
              emphasis: {
                areaColor: null,
                shadowOffsetX: 0,
                shadowOffsetY: 0,
                shadowBlur: 20,
                borderWidth: 3,
                shadowColor: 'BBAD04',
                areaStyle: { color: 'rgba(255,215,0,0.8)' }
              }
            },
            regions: paramSelectedObject
          },
          series: [
            {
              type: 'scatter',
              coordinateSystem: 'geo' // 对应上方配置
            },
            {
              name: '人数', // 浮动框的标题
              type: 'map',
              geoIndex: 0,
              data: provinceData
            },
            {
              name: '站点信息',
              type: 'scatter',
              coordinateSystem: 'geo',
              data: convertData([
                { name: '海门', value: 9 },
                { name: '鄂尔多斯', value: 12 },
                { name: '招远', value: 12 },
                { name: '舟山', value: 12 },
                { name: '齐齐哈尔', value: 14 },
                { name: '盐城', value: 15 },
                { name: '赤峰', value: 16 },
                { name: '青岛', value: 18 },
                { name: '乳山', value: 18 },
                { name: '金昌', value: 19 },
                { name: '泉州', value: 21 },
                { name: '莱西', value: 21 },
                { name: '日照', value: 21 },
                { name: '胶南', value: 22 },
                { name: '南通', value: 23 },
                { name: '拉萨', value: 24 },
                { name: '云浮', value: 24 },
                { name: '梅州', value: 25 },
                { name: '文登', value: 25 },
                { name: '上海', value: 25 },
                { name: '攀枝花', value: 25 },
                { name: '威海', value: 25 },
                { name: '承德', value: 25 },
                { name: '厦门', value: 26 },
                { name: '汕尾', value: 26 },
                { name: '潮州', value: 26 },
                { name: '丹东', value: 27 },
                { name: '太仓', value: 27 },
                { name: '曲靖', value: 27 },
                { name: '烟台', value: 28 },
                { name: '福州', value: 29 },
                { name: '瓦房店', value: 30 },
                { name: '即墨', value: 30 },
                { name: '抚顺', value: 31 },
                { name: '玉溪', value: 31 },
                { name: '张家口', value: 31 },
                { name: '阳泉', value: 31 },
                { name: '莱州', value: 32 },
                { name: '湖州', value: 32 },
                { name: '汕头', value: 32 },
                { name: '昆山', value: 33 },
                { name: '宁波', value: 33 },
                { name: '湛江', value: 33 },
                { name: '揭阳', value: 34 },
                { name: '荣成', value: 34 },
                { name: '连云港', value: 35 },
                { name: '葫芦岛', value: 35 },
                { name: '常熟', value: 36 },
                { name: '东莞', value: 36 },
                { name: '河源', value: 36 },
                { name: '淮安', value: 36 },
                { name: '泰州', value: 36 },
                { name: '南宁', value: 37 },
                { name: '营口', value: 37 }
              ]),
              symbolSize: 5,
              // 直接在点上显示标签
              label: {
                show: false,
                formatter: '{b}',
                offset: [15, -15] // 文字的相对偏移
              },
              // 标签的样式
              itemStyle: {
                emphasis: {
                  borderColor: '#fff',
                  borderWidth: 1
                },
                color: '#FFFFFF'
              }
            },
            {
              name: '站点信息',
              type: 'scatter',
              coordinateSystem: 'geo',
              data: convertData([
                { name: '惠州', value: 108 },
                { name: '江阴', value: 123 },
                { name: '蓬莱', value: 137 },
                { name: '韶关', value: 138 },
                { name: '嘉峪关', value: 138 },
                { name: '广州', value: 138 },
                { name: '延安', value: 138 },
                { name: '太原', value: 139 },
                { name: '清远', value: 139 },
                { name: '中山', value: 139 },
                { name: '昆明', value: 139 },
                { name: '寿光', value: 140 },
                { name: '盘锦', value: 140 },
                { name: '长治', value: 141 },
                { name: '深圳', value: 141 },
                { name: '珠海', value: 142 },
                { name: '宿迁', value: 143 },
                { name: '咸阳', value: 143 },
                { name: '铜川', value: 144 },
                { name: '平度', value: 144 },
                { name: '佛山', value: 144 },
                { name: '海口', value: 144 },
                { name: '江门', value: 145 },
                { name: '章丘', value: 145 },
                { name: '肇庆', value: 146 },
                { name: '大连', value: 147 },
                { name: '临汾', value: 147 },
                { name: '吴江', value: 147 },
                { name: '石嘴山', value: 149 },
                { name: '沈阳', value: 150 },
                { name: '苏州', value: 150 },
                { name: '茂名', value: 150 },
                { name: '嘉兴', value: 151 },
                { name: '长春', value: 151 },
                { name: '胶州', value: 152 },
                { name: '银川', value: 152 },
                { name: '张家港', value: 152 },
                { name: '三门峡', value: 153 },
                { name: '锦州', value: 154 },
                { name: '南昌', value: 154 },
                { name: '柳州', value: 154 },
                { name: '三亚', value: 154 },
                { name: '自贡', value: 156 },
                { name: '吉林', value: 156 },
                { name: '阳江', value: 157 },
                { name: '泸州', value: 157 },
                { name: '西宁', value: 157 },
                { name: '宜宾', value: 158 },
                { name: '呼和浩特', value: 158 },
                { name: '成都', value: 158 },
                { name: '大同', value: 158 },
                { name: '镇江', value: 159 },
                { name: '桂林', value: 159 },
                { name: '张家界', value: 159 },
                { name: '宜兴', value: 159 },
                { name: '北海', value: 160 },
                { name: '西安', value: 161 },
                { name: '金坛', value: 162 },
                { name: '东营', value: 162 },
                { name: '牡丹江', value: 163 },
                { name: '遵义', value: 163 },
                { name: '绍兴', value: 163 },
                { name: '扬州', value: 164 },
                { name: '常州', value: 164 },
                { name: '潍坊', value: 165 },
                { name: '重庆', value: 166 },
                { name: '台州', value: 167 },
                { name: '南京', value: 167 },
                { name: '滨州', value: 170 },
                { name: '贵阳', value: 171 },
                { name: '无锡', value: 171 },
                { name: '本溪', value: 171 }
              ]),
              symbolSize: 5,
              // 直接在点上显示标签
              label: {
                show: false,
                formatter: '{b}',
                offset: [15, -15] // 文字的相对偏移
              },
              // 标签的样式
              itemStyle: {
                emphasis: {
                  borderColor: '#000000',
                  borderWidth: 1
                },
                color: '#F2314C'
              }
            }
          ]
        })
        // 3、在渲染点击事件之前先清除点击事件
        myChart.off('click')
        // 处理点击事件并且弹出数据名称
        myChart.on('click', function (params) {
          // console.log(params)
          if ((vm.$store.state.allChartsModule.isSingleSelected === false && vm.$store.state.allChartsModule.selectProvince === params.name) ||
              vm.$store.state.allChartsModule.selectProvince !== params.name) {
            let provinces = [
              '北京',
              '天津',
              '上海',
              '重庆',
              '河北',
              '山西',
              '辽宁',
              '吉林',
              '黑龙江',
              '江苏',
              '浙江',
              '安徽',
              '福建',
              '江西',
              '山东',
              '河南',
              '湖北',
              '湖南',
              '广东',
              '海南',
              '四川',
              '贵州',
              '云南',
              '陕西',
              '甘肃',
              '青海',
              '台湾',
              '内蒙古',
              '广西',
              '西藏',
              '宁夏',
              '新疆',
              '香港',
              '澳门',
              '全国'
            ]
            if (provinces.indexOf(params.name) === -1) {
              return '全国'
            }
            // window.localStorage.setItem('selectId', params.name)
            vm.$store.commit('allChartsModule/updateSelectProvince', params.name)
            vm.$store.commit('allChartsModule/updateSelectMonth', 'thisMonth')
            vm.$store.commit('allChartsModule/updateIsSingleSelected', true)
          } else if (vm.$store.state.allChartsModule.isSingleSelected === true) {
            vm.$store.commit('allChartsModule/updateSelectProvince', '全国')
            vm.$store.commit('allChartsModule/updateSelectMonth', 'thisMonth')
            vm.$store.commit('allChartsModule/updateIsSingleSelected', false)
          }
        })
      }
    }
  }
}
</script>
