import { ref, watchEffect, defineComponent } from 'vue'
import { useStore } from 'vuex'
import { useRoute, useRouter } from 'vue-router'
import Header from '../../components/header'
import Footer from '../../components/footer'
import { byte, datetime } from '/@/utils/format'

export default defineComponent({
  setup() {
    const { state, commit } = useStore()
    const router = useRouter()
    const route = useRoute()
    const files = new Array(3).fill(0).map((_, idx: number) => {
      return {
        id: idx,
        name: '文件名',
        size: Math.pow(1024, idx + 1) * (idx + 1),
        type: (idx + 1) % 3,
        thumb: 'xxx',
        created_at: new Date().toLocaleDateString(),
        updated_at: new Date().toLocaleDateString(),
      }
    })
    let currentPath: string

    const handleClick = (url: string) => {
      router.push({ path: currentPath + url + '/' })
    }

    watchEffect(() => {
      currentPath = route.path
    })

    return () => (
      <div class="home">
        <Header />
        <div class="wrap">
          <div class="list-header">
            <div class="col-md-7 col-sm-6 col-xs-8">文件名</div>
            <div class="col-md-2 col-sm-2 col-xs-4 text-right">大小</div>
            <div class="col-md-3 col-sm-4 hidden-xs text-right">修改时间</div>
          </div>
          <ul class="list">
            {files.map((i) => (
              <li onClick={() => handleClick(i.id + '')}>
                <a class="list-item" href="javascript:void(0)" target="">
                  <div class="clearfix">
                    <span class="file-name col-md-7 col-sm-6 col-xs-8">
                      <i class={{ ic: true, 'ic-folder': true }}></i> {currentPath}
                    </span>
                    <span class="file-size col-md-2 col-sm-2 col-xs-4 text-right">{byte(i.size)}</span>
                    <span class="file-modified col-md-3 col-sm-4 hidden-xs text-right">{datetime(i.created_at)}</span>
                  </div>
                </a>
              </li>
            ))}
          </ul>
        </div>
        <Footer />
      </div>
    )
  },
})
