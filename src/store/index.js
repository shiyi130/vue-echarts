import Vue from 'vue'
import Vuex from 'vuex'
import allChartsModule from './allChartsModule.js'
import xxxModule from './xxxModule.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  // Add customize modules
  // strict: true,
  modules: {
    // Module1
    allChartsModule: allChartsModule,
    // Module2
    xxxModule: xxxModule
  }
})
