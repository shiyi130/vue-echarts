export default {
  namespaced: true,
  state: {
    selectProvince: '全国',
    selectMonth: 'thisMonth',
    chinaMapDisplayMode: 'defaultMode',
    componetResizeCount: 0,
    isSingleSelected: false
  },
  mutations: {
    updateSelectProvince (state, payload) {
      state.selectProvince = payload
    },
    updateSelectMonth (state, payload) {
      state.selectMonth = payload
    },
    updateChinaMapDisplayMode (state, payload) {
      state.chinaMapDisplayMode = payload
    },
    updateComponetResizeCount (state, payload) {
      state.componetResizeCount = payload
    },
    updateIsSingleSelected (state, payload) {
      state.isSingleSelected = payload
    }
  },
  actions: {},
  getters: {}
}
