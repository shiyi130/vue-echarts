<template>
  <div id="container" style="height: 100%;">
    <!-- <div id="header">顶部（header）</div> -->
    <div id="main">
      <div class="divLeft">
        <div
          style="
            height: 40%;
            background-color: #f5f6fa;
            padding: 20px 8px 8px 20px;
          "
        >
          <ViolationsRank style="background-color: white;"></ViolationsRank>
        </div>
        <div
          style="
            height: 59%;
            background-color: #f5f6fa;
            padding: 8px 8px 20px 20px;
          "
        >
          <ViolationsDistribution style="background-color: white;"></ViolationsDistribution>
        </div>
      </div>
      <div id="divIdMiddle" class="divMiddle">
        <div
          id="divChinaMap"
          style="height: 74.5%;position: relative;background-color:#F5F6FA;padding:20px 8px 8px 8px;'z-index:1"
        >
          <div
            style="
              position: absolute;
              left: 92%;
              top: 4%;
              border: 1px solid #dcdcdc;
            "
          >
            <!-- <el-button type="primary" icon="el-icon-edit" circle style='position:relative; z-index:2;outline: none;border: none;'
                            @click="modifyDisplayMode">
            </el-button>-->
            <img
              src="../assets/echarts/expand.png"
              style="position:relative; z-index:2;outline: none;border: none;top: 10px"
              alt
              class="classExpand"
              @click="modifyDisplayMode"
            />
          </div>
          <div style="height: 98%;">
            <ChinaMap style="background-color: white;"></ChinaMap>
          </div>
        </div>
        <div
          id="divViolationsProportion"
          style="
            height: 24.5%;
            background-color: #f5f6fa;
            padding: 8px 8px 20px 8px;
          "
        >
          <ViolationsProportion style="background-color: white;"></ViolationsProportion>
        </div>
      </div>
      <div id="divIdRight" class="divRight">
        <div
          style="
            height: 30%;
            background-color: #f5f6fa;
            padding: 20px 20px 8px 8px;
          "
        >
          <ViolationsStatistics style="background-color: white;"></ViolationsStatistics>
        </div>
        <div
          style="
            height: 34.6%;
            background-color: #f5f6fa;
            padding: 8px 20px 8px 8px;
          "
        >
          <Appearance style="background-color: white;"></Appearance>
        </div>
        <div
          style="
            height: 34.6%;
            background-color: #f5f6fa;
            padding: 8px 20px 20px 8px;
          "
        >
          <Behavior style="background-color: white;"></Behavior>
        </div>
      </div>
    </div>
    <!-- <div id="footer">底部（footer）</div> -->
  </div>
</template>
<script>
import Appearance from './Appearance'
import Behavior from './Behavior'
import ChinaMap from './ChinaMap'
import ViolationsDistribution from './ViolationsDistribution'
import ViolationsProportion from './ViolationsProportion'
import ViolationsRank from './ViolationsRank'
import ViolationsStatistics from './ViolationsStatistics'
export default {
  name: 'AllCharts',
  components: {
    Appearance,
    Behavior,
    ChinaMap,
    ViolationsDistribution,
    ViolationsProportion,
    ViolationsRank,
    ViolationsStatistics
  },
  data () {
    return {
      displayMode: 'defaultMode'
    }
  },
  mounted () {
    this.modifyDisplayMode()
  },
  methods: {
    modifyDisplayMode: function (e) {
      if (this.displayMode === 'defaultMode') {
        this.$store.commit(
          'allChartsModule/updateChinaMapDisplayMode',
          'classicMode'
        )
        if (this.$store.state.allChartsModule.componetResizeCount === 6 || this.$store.state.allChartsModule.componetResizeCount === 0) {
          this.$store.commit('allChartsModule/updateComponetResizeCount', 1)
        }
        this.displayMode = 'classicMode'
        document.getElementById('divChinaMap').style.height = '100%'
        document.getElementById('divViolationsProportion').style.display =
          'none'
        document.getElementById('divIdRight').style.display = 'none'
        document.getElementById('divIdMiddle').style.width = '76.5%'
      } else if (this.displayMode === 'classicMode') {
        this.$store.commit(
          'allChartsModule/updateChinaMapDisplayMode',
          'defaultMode'
        )
        if (this.$store.state.allChartsModule.componetResizeCount === 6 || this.$store.state.allChartsModule.componetResizeCount === 0) {
          this.$store.commit('allChartsModule/updateComponetResizeCount', 1)
        }
        this.displayMode = 'defaultMode'
        document.getElementById('divChinaMap').style.height = '74.5%'
        document.getElementById('divViolationsProportion').style.display =
          'block'
        document.getElementById('divIdRight').style.display = 'block'
        document.getElementById('divIdMiddle').style.width = '53%'
      }
    }
  }
}
</script>
<style>
html,
body {
  height: 97.5%;
  background-color: #f5f6fa;
}
body {
  margin: 0px;
}
/*主面板样式*/
#container {
  width: 100%;
  margin: 0px auto; /*主面板DIV居中*/
}
/*顶部面板样式*/
#header {
  width: 100%;
  height: 150px;
  /* border:1px #F00 solid; */
}
/*中间部分面板样式*/
#main {
  width: 100%;
  height: 750px;
  border: 1px #f00 solid;
}
/*底部面板样式*/
#footer {
  width: 100%;
  height: 100px;
  /* border:1px #F00 solid; */
}
.divLeft {
  float: left;
  width: 23.5%;
  height: 100%;
  /* background-color: aqua; */
}
.divRight {
  float: left;
  width: 23.5%;
  height: 100%;
  /* background-color: aqua; */
}
.divMiddle {
  float: left;
  width: 53%;
  height: 100%;
  /* background-color:cornflowerblue; */
}
.classExpand {
  width: 35px;
  height: 35px;
}
</style>
