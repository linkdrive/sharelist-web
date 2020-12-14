import { defineComponent } from 'vue'
import { RouterView } from 'vue-router'
import bootStrap from './config/bootstrap'

export default defineComponent({
  name: 'App',
  setup() {
    bootStrap()
    return () => (
      <div class="wrapper">
        <RouterView />
      </div>
    )
  },
})
