const isType = (type: any) => (obj: any) => Object.prototype.toString.call(obj) === `[object ${type}]`
const isArray = isType('Array')
const isObject = isType('Object')
const isString = isType('String')
const isDate = isType('Date')

export const byte = (v: number): string => {
  if (v === undefined || v === null || isNaN(v)) {
    return '-'
  }
  let lo = 0
  while (v >= 1024) {
    v /= 1024
    lo++
  }
  return Math.floor(v * 100) / 100 + ' ' + ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB'][lo]
}
export const datetime = (date: string | Date | number, expr = 'iso'): string => {
  let a: Date
  try {
    a = new Date(date)
  } catch (e) {
    a = new Date()
  }

  const y = a.getFullYear(),
    M = a.getMonth() + 1,
    d = a.getDate(),
    D = a.getDay(),
    h = a.getHours(),
    m = a.getMinutes(),
    s = a.getSeconds()

  function zeroize(v: any) {
    v = parseInt(v)
    return v < 10 ? '0' + v : v
  }

  if (expr === 'iso') {
    return a.toISOString()
  }
  return expr.replace(/(?:s{1,2}|m{1,2}|h{1,2}|d{1,2}|M{1,4}|y{1,4})/g, function (str) {
    switch (str) {
      case 's':
        return s
      case 'ss':
        return zeroize(s)
      case 'm':
        return m
      case 'mm':
        return zeroize(m)
      case 'h':
        return h
      case 'hh':
        return zeroize(h)
      case 'd':
        return d
      case 'dd':
        return zeroize(d)
      case 'M':
        return M
      case 'MM':
        return zeroize(M)
      case 'MMMM':
        return ['十二', '一', '二', '三', '四', '五', '六', '七', '八', '九', '十', '十一'][m] + '月'
      case 'yy':
        return String(y).substr(2)
      case 'yyyy':
        return y
      default:
        return str.substr(1, str.length - 2)
    }
  })
}
