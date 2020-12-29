import { ref, defineComponent } from 'vue'

export default defineComponent({
  setup() {
    return () => (
      <footer>
        <p>
          <a target="_blank" href="https://github.com/reruin/sharelist">
            GitHub
          </a>
          <a target="_blank" href="/">
            管理
          </a>
        </p>
      </footer>
    )
  },
})
