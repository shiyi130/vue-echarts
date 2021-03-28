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
    <div style="position: absolute; left: 28%; top: 15%;">
      <span id="labelMonth" style="position: relative; z-index: 2; font-size: 1.5vmin;">2020年06月</span>
    </div>
    <div
      style="
        position: absolute;
        left: 53%;
        top: 15%;
        border: 1px solid #dcdcdc;
      "
    >
      <select
        id="selectMonth"
        v-model="selectMonth"
        style="position: relative; z-index: 2; outline: none; border: none; font-size: 1.5vmin;"
        @change="onChangeSelectMonth"
      >
        <option
          v-for="monthItem in monthItems"
          :key="monthItem.value"
          :value="monthItem.value"
        >{{ monthItem.label }}</option>
      </select>
    </div>
    <div ref="myEchart" style="height: 75%; width: 100%;"></div>
    <div style="height: 25%; width: 100%;">
      <ViolationsPeople></ViolationsPeople>
    </div>
    <el-input v-model="txtSelectProvince" type="text" style="display: none;"></el-input>
  </div>
</template>
<script>
import echarts from 'echarts'
import ViolationsPeople from './ViolationsPeople'
export default {
  name: 'ViolationsDistribution',
  components: { ViolationsPeople },
  data () {
    return {
      monthItems: [
        {
          value: 'thisMonth',
          label: '本月'
        },
        {
          value: 'preMonth',
          label: '上月'
        }
      ],
      selectMonth: 'thisMonth'
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
    onChangeSelectMonth: function (e) {
      if (this.selectMonth === 'thisMonth') {
        document.getElementById('labelMonth').innerText = '2020年06月'
        this.$store.commit('allChartsModule/updateSelectMonth', 'thisMonth')
      } else if (this.selectMonth === 'preMonth') {
        document.getElementById('labelMonth').innerText = '2020年05月'
        this.$store.commit('allChartsModule/updateSelectMonth', 'preMonth')
      }
    },
    Violations () {
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
      let thisMonthData = [
        [
          { value: 16, name: '<100次', itemStyle: { color: '#0987BA' } },
          { value: 41, name: '100~200次', itemStyle: { color: '#16AAB8' } },
          { value: 32, name: '200~400次', itemStyle: { color: '#E3A205' } },
          { value: 11, name: '400次以上', itemStyle: { color: '#375697' } }
        ],
        [
          { value: 33, name: '<100次', itemStyle: { color: '#0987BA' } },
          { value: 14, name: '100~200次', itemStyle: { color: '#16AAB8' } },
          { value: 5, name: '200~400次', itemStyle: { color: '#E3A205' } },
          { value: 48, name: '400次以上', itemStyle: { color: '#375697' } }
        ],
        [
          { value: 15, name: '<100次', itemStyle: { color: '#0987BA' } },
          { value: 48, name: '100~200次', itemStyle: { color: '#16AAB8' } },
          { value: 30, name: '200~400次', itemStyle: { color: '#E3A205' } },
          { value: 7, name: '400次以上', itemStyle: { color: '#375697' } }
        ],
        [
          { value: 2, name: '<100次', itemStyle: { color: '#0987BA' } },
          { value: 36, name: '100~200次', itemStyle: { color: '#16AAB8' } },
          { value: 50, name: '200~400次', itemStyle: { color: '#E3A205' } },
          { value: 12, name: '400次以上', itemStyle: { color: '#375697' } }
        ],
        [
          { value: 22, name: '<100次', itemStyle: { color: '#0987BA' } },
          { value: 40, name: '100~200次', itemStyle: { color: '#16AAB8' } },
          { value: 30, name: '200~400次', itemStyle: { color: '#E3A205' } },
          { value: 8, name: '400次以上', itemStyle: { color: '#375697' } }
        ],
        [
          { value: 37, name: '<100次', itemStyle: { color: '#0987BA' } },
          { value: 34, name: '100~200次', itemStyle: { color: '#16AAB8' } },
          { value: 14, name: '200~400次', itemStyle: { color: '#E3A205' } },
          { value: 15, name: '400次以上', itemStyle: { color: '#375697' } }
        ],
        [
          { value: 20, name: '<100次', itemStyle: { color: '#0987BA' } },
          { value: 24, name: '100~200次', itemStyle: { color: '#16AAB8' } },
          { value: 31, name: '200~400次', itemStyle: { color: '#E3A205' } },
          { value: 25, name: '400次以上', itemStyle: { color: '#375697' } }
        ],
        [
          { value: 28, name: '<100次', itemStyle: { color: '#0987BA' } },
          { value: 40, name: '100~200次', itemStyle: { color: '#16AAB8' } },
          { value: 25, name: '200~400次', itemStyle: { color: '#E3A205' } },
          { value: 7, name: '400次以上', itemStyle: { color: '#375697' } }
        ],
        [
          { value: 26, name: '<100次', itemStyle: { color: '#0987BA' } },
          { value: 18, name: '100~200次', itemStyle: { color: '#16AAB8' } },
          { value: 3, name: '200~400次', itemStyle: { color: '#E3A205' } },
          { value: 53, name: '400次以上', itemStyle: { color: '#375697' } }
        ],
        [
          { value: 36, name: '<100次', itemStyle: { color: '#0987BA' } },
          { value: 34, name: '100~200次', itemStyle: { color: '#16AAB8' } },
          { value: 14, name: '200~400次', itemStyle: { color: '#E3A205' } },
          { value: 16, name: '400次以上', itemStyle: { color: '#375697' } }
        ],
        [
          { value: 20, name: '<100次', itemStyle: { color: '#0987BA' } },
          { value: 16, name: '100~200次', itemStyle: { color: '#16AAB8' } },
          { value: 49, name: '200~400次', itemStyle: { color: '#E3A205' } },
          { value: 15, name: '400次以上', itemStyle: { color: '#375697' } }
        ],
        [
          { value: 21, name: '<100次', itemStyle: { color: '#0987BA' } },
          { value: 22, name: '100~200次', itemStyle: { color: '#16AAB8' } },
          { value: 39, name: '200~400次', itemStyle: { color: '#E3A205' } },
          { value: 18, name: '400次以上', itemStyle: { color: '#375697' } }
        ],
        [
          { value: 42, name: '<100次', itemStyle: { color: '#0987BA' } },
          { value: 11, name: '100~200次', itemStyle: { color: '#16AAB8' } },
          { value: 15, name: '200~400次', itemStyle: { color: '#E3A205' } },
          { value: 32, name: '400次以上', itemStyle: { color: '#375697' } }
        ],
        [
          { value: 26, name: '<100次', itemStyle: { color: '#0987BA' } },
          { value: 36, name: '100~200次', itemStyle: { color: '#16AAB8' } },
          { value: 23, name: '200~400次', itemStyle: { color: '#E3A205' } },
          { value: 15, name: '400次以上', itemStyle: { color: '#375697' } }
        ],
        [
          { value: 19, name: '<100次', itemStyle: { color: '#0987BA' } },
          { value: 11, name: '100~200次', itemStyle: { color: '#16AAB8' } },
          { value: 23, name: '200~400次', itemStyle: { color: '#E3A205' } },
          { value: 47, name: '400次以上', itemStyle: { color: '#375697' } }
        ],
        [
          { value: 13, name: '<100次', itemStyle: { color: '#0987BA' } },
          { value: 44, name: '100~200次', itemStyle: { color: '#16AAB8' } },
          { value: 32, name: '200~400次', itemStyle: { color: '#E3A205' } },
          { value: 11, name: '400次以上', itemStyle: { color: '#375697' } }
        ],
        [
          { value: 27, name: '<100次', itemStyle: { color: '#0987BA' } },
          { value: 21, name: '100~200次', itemStyle: { color: '#16AAB8' } },
          { value: 20, name: '200~400次', itemStyle: { color: '#E3A205' } },
          { value: 32, name: '400次以上', itemStyle: { color: '#375697' } }
        ],
        [
          { value: 22, name: '<100次', itemStyle: { color: '#0987BA' } },
          { value: 41, name: '100~200次', itemStyle: { color: '#16AAB8' } },
          { value: 17, name: '200~400次', itemStyle: { color: '#E3A205' } },
          { value: 20, name: '400次以上', itemStyle: { color: '#375697' } }
        ],
        [
          { value: 24, name: '<100次', itemStyle: { color: '#0987BA' } },
          { value: 22, name: '100~200次', itemStyle: { color: '#16AAB8' } },
          { value: 41, name: '200~400次', itemStyle: { color: '#E3A205' } },
          { value: 13, name: '400次以上', itemStyle: { color: '#375697' } }
        ],
        [
          { value: 23, name: '<100次', itemStyle: { color: '#0987BA' } },
          { value: 45, name: '100~200次', itemStyle: { color: '#16AAB8' } },
          { value: 1, name: '200~400次', itemStyle: { color: '#E3A205' } },
          { value: 31, name: '400次以上', itemStyle: { color: '#375697' } }
        ],
        [
          { value: 28, name: '<100次', itemStyle: { color: '#0987BA' } },
          { value: 33, name: '100~200次', itemStyle: { color: '#16AAB8' } },
          { value: 2, name: '200~400次', itemStyle: { color: '#E3A205' } },
          { value: 37, name: '400次以上', itemStyle: { color: '#375697' } }
        ],
        [
          { value: 47, name: '<100次', itemStyle: { color: '#0987BA' } },
          { value: 25, name: '100~200次', itemStyle: { color: '#16AAB8' } },
          { value: 10, name: '200~400次', itemStyle: { color: '#E3A205' } },
          { value: 18, name: '400次以上', itemStyle: { color: '#375697' } }
        ],
        [
          { value: 8, name: '<100次', itemStyle: { color: '#0987BA' } },
          { value: 48, name: '100~200次', itemStyle: { color: '#16AAB8' } },
          { value: 10, name: '200~400次', itemStyle: { color: '#E3A205' } },
          { value: 34, name: '400次以上', itemStyle: { color: '#375697' } }
        ],
        [
          { value: 50, name: '<100次', itemStyle: { color: '#0987BA' } },
          { value: 15, name: '100~200次', itemStyle: { color: '#16AAB8' } },
          { value: 11, name: '200~400次', itemStyle: { color: '#E3A205' } },
          { value: 24, name: '400次以上', itemStyle: { color: '#375697' } }
        ],
        [
          { value: 31, name: '<100次', itemStyle: { color: '#0987BA' } },
          { value: 24, name: '100~200次', itemStyle: { color: '#16AAB8' } },
          { value: 3, name: '200~400次', itemStyle: { color: '#E3A205' } },
          { value: 42, name: '400次以上', itemStyle: { color: '#375697' } }
        ],
        [
          { value: 25, name: '<100次', itemStyle: { color: '#0987BA' } },
          { value: 11, name: '100~200次', itemStyle: { color: '#16AAB8' } },
          { value: 47, name: '200~400次', itemStyle: { color: '#E3A205' } },
          { value: 17, name: '400次以上', itemStyle: { color: '#375697' } }
        ],
        [
          { value: 44, name: '<100次', itemStyle: { color: '#0987BA' } },
          { value: 28, name: '100~200次', itemStyle: { color: '#16AAB8' } },
          { value: 24, name: '200~400次', itemStyle: { color: '#E3A205' } },
          { value: 4, name: '400次以上', itemStyle: { color: '#375697' } }
        ],
        [
          { value: 42, name: '<100次', itemStyle: { color: '#0987BA' } },
          { value: 31, name: '100~200次', itemStyle: { color: '#16AAB8' } },
          { value: 20, name: '200~400次', itemStyle: { color: '#E3A205' } },
          { value: 7, name: '400次以上', itemStyle: { color: '#375697' } }
        ],
        [
          { value: 14, name: '<100次', itemStyle: { color: '#0987BA' } },
          { value: 18, name: '100~200次', itemStyle: { color: '#16AAB8' } },
          { value: 21, name: '200~400次', itemStyle: { color: '#E3A205' } },
          { value: 47, name: '400次以上', itemStyle: { color: '#375697' } }
        ],
        [
          { value: 19, name: '<100次', itemStyle: { color: '#0987BA' } },
          { value: 13, name: '100~200次', itemStyle: { color: '#16AAB8' } },
          { value: 22, name: '200~400次', itemStyle: { color: '#E3A205' } },
          { value: 46, name: '400次以上', itemStyle: { color: '#375697' } }
        ],
        [
          { value: 18, name: '<100次', itemStyle: { color: '#0987BA' } },
          { value: 36, name: '100~200次', itemStyle: { color: '#16AAB8' } },
          { value: 21, name: '200~400次', itemStyle: { color: '#E3A205' } },
          { value: 25, name: '400次以上', itemStyle: { color: '#375697' } }
        ],
        [
          { value: 37, name: '<100次', itemStyle: { color: '#0987BA' } },
          { value: 16, name: '100~200次', itemStyle: { color: '#16AAB8' } },
          { value: 33, name: '200~400次', itemStyle: { color: '#E3A205' } },
          { value: 14, name: '400次以上', itemStyle: { color: '#375697' } }
        ],
        [
          { value: 36, name: '<100次', itemStyle: { color: '#0987BA' } },
          { value: 14, name: '100~200次', itemStyle: { color: '#16AAB8' } },
          { value: 3, name: '200~400次', itemStyle: { color: '#E3A205' } },
          { value: 47, name: '400次以上', itemStyle: { color: '#375697' } }
        ],
        [
          { value: 28, name: '<100次', itemStyle: { color: '#0987BA' } },
          { value: 31, name: '100~200次', itemStyle: { color: '#16AAB8' } },
          { value: 13, name: '200~400次', itemStyle: { color: '#E3A205' } },
          { value: 28, name: '400次以上', itemStyle: { color: '#375697' } }
        ],
        [
          { value: 26, name: '<100次', itemStyle: { color: '#0987BA' } },
          { value: 27, name: '100~200次', itemStyle: { color: '#16AAB8' } },
          { value: 21, name: '200~400次', itemStyle: { color: '#E3A205' } },
          { value: 24, name: '400次以上', itemStyle: { color: '#375697' } }
        ]
      ]
      let preMonthData = [
        [
          { value: 22, name: '<100次', itemStyle: { color: '#0987BA' } },
          { value: 39, name: '100~200次', itemStyle: { color: '#16AAB8' } },
          { value: 12, name: '200~400次', itemStyle: { color: '#E3A205' } },
          { value: 27, name: '400次以上', itemStyle: { color: '#375697' } }
        ],
        [
          { value: 40, name: '<100次', itemStyle: { color: '#0987BA' } },
          { value: 24, name: '100~200次', itemStyle: { color: '#16AAB8' } },
          { value: 22, name: '200~400次', itemStyle: { color: '#E3A205' } },
          { value: 14, name: '400次以上', itemStyle: { color: '#375697' } }
        ],
        [
          { value: 23, name: '<100次', itemStyle: { color: '#0987BA' } },
          { value: 40, name: '100~200次', itemStyle: { color: '#16AAB8' } },
          { value: 10, name: '200~400次', itemStyle: { color: '#E3A205' } },
          { value: 27, name: '400次以上', itemStyle: { color: '#375697' } }
        ],
        [
          { value: 41, name: '<100次', itemStyle: { color: '#0987BA' } },
          { value: 31, name: '100~200次', itemStyle: { color: '#16AAB8' } },
          { value: 8, name: '200~400次', itemStyle: { color: '#E3A205' } },
          { value: 20, name: '400次以上', itemStyle: { color: '#375697' } }
        ],
        [
          { value: 14, name: '<100次', itemStyle: { color: '#0987BA' } },
          { value: 50, name: '100~200次', itemStyle: { color: '#16AAB8' } },
          { value: 24, name: '200~400次', itemStyle: { color: '#E3A205' } },
          { value: 12, name: '400次以上', itemStyle: { color: '#375697' } }
        ],
        [
          { value: 15, name: '<100次', itemStyle: { color: '#0987BA' } },
          { value: 11, name: '100~200次', itemStyle: { color: '#16AAB8' } },
          { value: 46, name: '200~400次', itemStyle: { color: '#E3A205' } },
          { value: 28, name: '400次以上', itemStyle: { color: '#375697' } }
        ],
        [
          { value: 43, name: '<100次', itemStyle: { color: '#0987BA' } },
          { value: 16, name: '100~200次', itemStyle: { color: '#16AAB8' } },
          { value: 20, name: '200~400次', itemStyle: { color: '#E3A205' } },
          { value: 21, name: '400次以上', itemStyle: { color: '#375697' } }
        ],
        [
          { value: 17, name: '<100次', itemStyle: { color: '#0987BA' } },
          { value: 48, name: '100~200次', itemStyle: { color: '#16AAB8' } },
          { value: 25, name: '200~400次', itemStyle: { color: '#E3A205' } },
          { value: 10, name: '400次以上', itemStyle: { color: '#375697' } }
        ],
        [
          { value: 30, name: '<100次', itemStyle: { color: '#0987BA' } },
          { value: 28, name: '100~200次', itemStyle: { color: '#16AAB8' } },
          { value: 26, name: '200~400次', itemStyle: { color: '#E3A205' } },
          { value: 16, name: '400次以上', itemStyle: { color: '#375697' } }
        ],
        [
          { value: 43, name: '<100次', itemStyle: { color: '#0987BA' } },
          { value: 10, name: '100~200次', itemStyle: { color: '#16AAB8' } },
          { value: 21, name: '200~400次', itemStyle: { color: '#E3A205' } },
          { value: 26, name: '400次以上', itemStyle: { color: '#375697' } }
        ],
        [
          { value: 30, name: '<100次', itemStyle: { color: '#0987BA' } },
          { value: 42, name: '100~200次', itemStyle: { color: '#16AAB8' } },
          { value: 12, name: '200~400次', itemStyle: { color: '#E3A205' } },
          { value: 16, name: '400次以上', itemStyle: { color: '#375697' } }
        ],
        [
          { value: 10, name: '<100次', itemStyle: { color: '#0987BA' } },
          { value: 14, name: '100~200次', itemStyle: { color: '#16AAB8' } },
          { value: 24, name: '200~400次', itemStyle: { color: '#E3A205' } },
          { value: 52, name: '400次以上', itemStyle: { color: '#375697' } }
        ],
        [
          { value: 50, name: '<100次', itemStyle: { color: '#0987BA' } },
          { value: 19, name: '100~200次', itemStyle: { color: '#16AAB8' } },
          { value: 24, name: '200~400次', itemStyle: { color: '#E3A205' } },
          { value: 7, name: '400次以上', itemStyle: { color: '#375697' } }
        ],
        [
          { value: 36, name: '<100次', itemStyle: { color: '#0987BA' } },
          { value: 9, name: '100~200次', itemStyle: { color: '#16AAB8' } },
          { value: 41, name: '200~400次', itemStyle: { color: '#E3A205' } },
          { value: 14, name: '400次以上', itemStyle: { color: '#375697' } }
        ],
        [
          { value: 32, name: '<100次', itemStyle: { color: '#0987BA' } },
          { value: 50, name: '100~200次', itemStyle: { color: '#16AAB8' } },
          { value: 8, name: '200~400次', itemStyle: { color: '#E3A205' } },
          { value: 10, name: '400次以上', itemStyle: { color: '#375697' } }
        ],
        [
          { value: 4, name: '<100次', itemStyle: { color: '#0987BA' } },
          { value: 49, name: '100~200次', itemStyle: { color: '#16AAB8' } },
          { value: 17, name: '200~400次', itemStyle: { color: '#E3A205' } },
          { value: 30, name: '400次以上', itemStyle: { color: '#375697' } }
        ],
        [
          { value: 35, name: '<100次', itemStyle: { color: '#0987BA' } },
          { value: 28, name: '100~200次', itemStyle: { color: '#16AAB8' } },
          { value: 26, name: '200~400次', itemStyle: { color: '#E3A205' } },
          { value: 11, name: '400次以上', itemStyle: { color: '#375697' } }
        ],
        [
          { value: 32, name: '<100次', itemStyle: { color: '#0987BA' } },
          { value: 14, name: '100~200次', itemStyle: { color: '#16AAB8' } },
          { value: 36, name: '200~400次', itemStyle: { color: '#E3A205' } },
          { value: 18, name: '400次以上', itemStyle: { color: '#375697' } }
        ],
        [
          { value: 50, name: '<100次', itemStyle: { color: '#0987BA' } },
          { value: 11, name: '100~200次', itemStyle: { color: '#16AAB8' } },
          { value: 16, name: '200~400次', itemStyle: { color: '#E3A205' } },
          { value: 23, name: '400次以上', itemStyle: { color: '#375697' } }
        ],
        [
          { value: 15, name: '<100次', itemStyle: { color: '#0987BA' } },
          { value: 50, name: '100~200次', itemStyle: { color: '#16AAB8' } },
          { value: 27, name: '200~400次', itemStyle: { color: '#E3A205' } },
          { value: 8, name: '400次以上', itemStyle: { color: '#375697' } }
        ],
        [
          { value: 22, name: '<100次', itemStyle: { color: '#0987BA' } },
          { value: 3, name: '100~200次', itemStyle: { color: '#16AAB8' } },
          { value: 21, name: '200~400次', itemStyle: { color: '#E3A205' } },
          { value: 54, name: '400次以上', itemStyle: { color: '#375697' } }
        ],
        [
          { value: 8, name: '<100次', itemStyle: { color: '#0987BA' } },
          { value: 48, name: '100~200次', itemStyle: { color: '#16AAB8' } },
          { value: 31, name: '200~400次', itemStyle: { color: '#E3A205' } },
          { value: 13, name: '400次以上', itemStyle: { color: '#375697' } }
        ],
        [
          { value: 34, name: '<100次', itemStyle: { color: '#0987BA' } },
          { value: 24, name: '100~200次', itemStyle: { color: '#16AAB8' } },
          { value: 16, name: '200~400次', itemStyle: { color: '#E3A205' } },
          { value: 26, name: '400次以上', itemStyle: { color: '#375697' } }
        ],
        [
          { value: 42, name: '<100次', itemStyle: { color: '#0987BA' } },
          { value: 3, name: '100~200次', itemStyle: { color: '#16AAB8' } },
          { value: 17, name: '200~400次', itemStyle: { color: '#E3A205' } },
          { value: 38, name: '400次以上', itemStyle: { color: '#375697' } }
        ],
        [
          { value: 39, name: '<100次', itemStyle: { color: '#0987BA' } },
          { value: 31, name: '100~200次', itemStyle: { color: '#16AAB8' } },
          { value: 25, name: '200~400次', itemStyle: { color: '#E3A205' } },
          { value: 5, name: '400次以上', itemStyle: { color: '#375697' } }
        ],
        [
          { value: 35, name: '<100次', itemStyle: { color: '#0987BA' } },
          { value: 34, name: '100~200次', itemStyle: { color: '#16AAB8' } },
          { value: 15, name: '200~400次', itemStyle: { color: '#E3A205' } },
          { value: 16, name: '400次以上', itemStyle: { color: '#375697' } }
        ],
        [
          { value: 20, name: '<100次', itemStyle: { color: '#0987BA' } },
          { value: 16, name: '100~200次', itemStyle: { color: '#16AAB8' } },
          { value: 23, name: '200~400次', itemStyle: { color: '#E3A205' } },
          { value: 41, name: '400次以上', itemStyle: { color: '#375697' } }
        ],
        [
          { value: 21, name: '<100次', itemStyle: { color: '#0987BA' } },
          { value: 22, name: '100~200次', itemStyle: { color: '#16AAB8' } },
          { value: 20, name: '200~400次', itemStyle: { color: '#E3A205' } },
          { value: 37, name: '400次以上', itemStyle: { color: '#375697' } }
        ],
        [
          { value: 8, name: '<100次', itemStyle: { color: '#0987BA' } },
          { value: 25, name: '100~200次', itemStyle: { color: '#16AAB8' } },
          { value: 17, name: '200~400次', itemStyle: { color: '#E3A205' } },
          { value: 50, name: '400次以上', itemStyle: { color: '#375697' } }
        ],
        [
          { value: 29, name: '<100次', itemStyle: { color: '#0987BA' } },
          { value: 36, name: '100~200次', itemStyle: { color: '#16AAB8' } },
          { value: 1, name: '200~400次', itemStyle: { color: '#E3A205' } },
          { value: 34, name: '400次以上', itemStyle: { color: '#375697' } }
        ],
        [
          { value: 22, name: '<100次', itemStyle: { color: '#0987BA' } },
          { value: 11, name: '100~200次', itemStyle: { color: '#16AAB8' } },
          { value: 15, name: '200~400次', itemStyle: { color: '#E3A205' } },
          { value: 52, name: '400次以上', itemStyle: { color: '#375697' } }
        ],
        [
          { value: 29, name: '<100次', itemStyle: { color: '#0987BA' } },
          { value: 7, name: '100~200次', itemStyle: { color: '#16AAB8' } },
          { value: 39, name: '200~400次', itemStyle: { color: '#E3A205' } },
          { value: 25, name: '400次以上', itemStyle: { color: '#375697' } }
        ],
        [
          { value: 43, name: '<100次', itemStyle: { color: '#0987BA' } },
          { value: 21, name: '100~200次', itemStyle: { color: '#16AAB8' } },
          { value: 10, name: '200~400次', itemStyle: { color: '#E3A205' } },
          { value: 26, name: '400次以上', itemStyle: { color: '#375697' } }
        ],
        [
          { value: 38, name: '<100次', itemStyle: { color: '#0987BA' } },
          { value: 4, name: '100~200次', itemStyle: { color: '#16AAB8' } },
          { value: 3, name: '200~400次', itemStyle: { color: '#E3A205' } },
          { value: 55, name: '400次以上', itemStyle: { color: '#375697' } }
        ],
        [
          { value: 28, name: '<100次', itemStyle: { color: '#0987BA' } },
          { value: 25, name: '100~200次', itemStyle: { color: '#16AAB8' } },
          { value: 20, name: '200~400次', itemStyle: { color: '#E3A205' } },
          { value: 25, name: '400次以上', itemStyle: { color: '#375697' } }
        ]
      ]
      let indexPrince = provinces.indexOf(
        this.$store.state.allChartsModule.selectProvince
      )
      let currentMonthData = []
      if (this.selectMonth === 'thisMonth') {
        currentMonthData = thisMonthData[indexPrince]
      } else if (this.selectMonth === 'preMonth') {
        currentMonthData = preMonthData[indexPrince]
      }
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
            text: '违规分布',
            top: 15,
            left: 15
          },
          tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b}: {c} ({d}%)',
            backgroundColor: 'rgba(50,50,50,0.8)'
          },
          legend: {
            name: 'wangdian',
            orient: 'vertical',
            align: 'left',
            x: '65%',
            y: '50%',
            data: ['<100次', '100~200次', '200~400次', '400次以上'],
            itemWidth: 12,
            itemHeight: 12,
            itemGap: 20,
            icon: 'roundRect'
          },
          series: [
            {
              name: '违规分布',
              type: 'pie',
              radius: ['18%', '50%'],
              center: ['35%', '65%'],
              label: {
                show: true,
                position: 'inside',
                formatter: '{d}%'
              },
              emphasis: {
                label: {
                  show: true,
                  fontSize: '20',
                  fontWeight: 'bold',
                  formatter: '{d}%'
                }
              },
              labelLine: {
                show: false
              },
              data: currentMonthData.sort(function (a, b) {
                return a.value - b.value
              })
            }
          ]
        })
      }
    }
  }
}
</script>
