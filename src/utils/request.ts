import axios, { AxiosInstance, AxiosRequestConfig } from 'axios'
import apis from '../config/api'
import router from '../router'
import storage from 'store'

const methods: string[] = ['post', 'get', 'put', 'head', 'delete', 'patch']

const baseURL = '/api'

axios.defaults.timeout = 60 * 1000
axios.defaults.baseURL = baseURL

const service: AxiosInstance = axios.create()

// http response 拦截器
service.interceptors.response.use(
  (response) => {
    if (response.data.status) {
      log(`${response.data.message || response.data.msg}`)
      response.data.code = -2
      response.data.msg = response.data.message
      return response.data
    } else if (response.data.status != 0) {
      if (response.data.message) {
        response.data.msg = response.data.message
      }

      return response.data
    } else {
      return response.data
    }
  },

  (error) => {
    // 由接口返回的错误
    if (error.response) {
      switch (error.response.status) {
        case 401:
          router.push('error/401')
        case 403:
          router.push('error/403')
      }
      return { code: error.response.status, msg: error.response.data ? error.response.data.message : error.response }
    } else {
      log(`服务器错误！错误代码：${error}`)
      return { code: -2, msg: '' }
    }
  },
)

const log = (content: string, type = 'error') => {}

const urlReplace = (url: string, params: any): string =>
  url.replace(/(?:\:)(\w+)/g, ($0, $1) => {
    if ($1 in params) {
      return params[$1]
    } else {
      return $0
    }
  })

const convFormData = (data: any) => {
  const fd = new FormData()
  for (const i in data) {
    if (Array.isArray(data[i])) {
      data[i].forEach((j: any, idx: number) => {
        fd.append(`${i}[${idx}]`, j)
      })
    } else {
      fd.append(i, data[i])
    }
  }
  return fd
}

type ReqConfig = {
  url: string
  method: string
  data?: any
  params?: any
  responseType?: string
  token?: boolean
  headers?: any
}
const createReq = (opts: ReqConfig) => {
  if (opts.token !== false) {
    if (!opts.headers) {
      opts.headers = {}
    }
    const token: string = storage.get('ACCESS_TOKEN')
    if (token) {
      opts.headers['Authorization'] = `${token}`
    }
  }

  if (opts.headers['Content-Type'] == 'multipart/form-data') {
    opts.data = convFormData(opts.data)
  }

  return service(opts as AxiosRequestConfig)
}

const request: any = (name: string) => request[name]

methods.forEach((method: string) => {
  request[method] = (options: any = {}) =>
    createReq({
      method,
      headers: {
        'Content-Type': options.type == 'json' ? 'application/json' : 'multipart/form-data',
      },
      ...options,
    })
})

type ApiItem = [name: string, url: any, options: any]

apis.forEach((item: ApiItem) => {
  request[item[0]] = (...args: any[]) => {
    let url = item[1]
    if (typeof url === 'function') {
      url = url(...args)
    }
    const t = url.split(/\s/)
    const method: string = t[0] || 'GET'
    url = t.slice(1).join(' ')

    url = urlReplace(url, args[0])
    const options: any = item[2] || {}

    const params: any = {
      method,
      url,
    }

    if (params.method == 'get' && args.length) {
      params['params'] = args[0]
    } else {
      params['data'] = args[0] || options.data || {}
    }

    params.headers = params.headers || {}
    params.responseType = options.responseType

    if (options.type == 'formdata') {
      params.headers['Content-Type'] = 'multipart/form-data'
    } else {
      params.headers['Content-Type'] = 'application/json'
    }
    return createReq(params)
  }
})

export default request
