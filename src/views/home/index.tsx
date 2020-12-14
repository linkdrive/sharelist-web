import { ref, watchEffect, defineComponent } from 'vue'
import { useStore } from 'vuex'
import { useRoute, useRouter } from 'vue-router'
export default defineComponent({
  setup() {
    const { state, commit } = useStore()
    const router = useRouter()
    const route = useRoute()
    const files = new Array(10).fill(0).map((_, idx: number) => idx + 1)
    let currentPath: string

    const handleClick = (url: string) => {
      router.push({ path: currentPath + url + '/' })
    }

    watchEffect(() => {
      currentPath = route.path
    })

    return () => (
      <div class="file">
        <ul>
          {files.map((i) => (
            <li onClick={() => handleClick(i)}>
              {currentPath}
              {i}/
            </li>
          ))}
        </ul>
      </div>
    )
  },
})
