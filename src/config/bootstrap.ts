import storage from 'store'
import store from '../store'

const setup = (): void => {
  store.commit('SET_SETTING', storage.get('SETTING', { mode: 'day', theme: 'default', fontSize: 1.125 }))
}

export default setup
