import { state } from './state'
import { createStore } from 'vuex'
import storage from 'store'

export default createStore({
  state,
  mutations: {
    SET_SETTING: (state, data) => {
      state.setting = data
      storage.set('SETTING', state.setting)
    },
  },
  actions: {},
  modules: {},
})
