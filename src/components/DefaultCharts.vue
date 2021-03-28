<template>
  <div id="container" style="height: 100%;">
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
          <ViolationsDistribution
            style="background-color: white;"
          ></ViolationsDistribution>
        </div>
      </div>
      <div class="divMiddle">
        <div
          style="
            height: 100%;
            background-color: #f5f6fa;
            padding: 20px 20px 0px 8px;
          "
        >
          <ChinaMap style="background-color: white;"></ChinaMap>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import ChinaMap from './ChinaMap'
import ViolationsDistribution from './ViolationsDistribution'
import ViolationsRank from './ViolationsRank'
export default {
  name: 'DefaultCharts',
  components: { ChinaMap, ViolationsDistribution, ViolationsRank },
  data () {
    return {}
  },
  mounted () {},
  methods: {}
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
  height: 100%;
  /* border:1px #F00 solid; */
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
.divMiddle {
  float: left;
  width: 76.5%;
  height: 100%;
  /* background-color:cornflowerblue; */
}
</style>
