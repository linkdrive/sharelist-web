import { ref, defineComponent } from 'vue'

export default defineComponent({
  setup() {
    return () => (
      <header>
        <div class="wrap">
          <a class="home" href="/">
            ShareList
          </a>
          <div class="upload-menu"></div>
        </div>
      </header>
    )
  },
})
