export function pluralize(time, label) {
  if (time <= 1) {
    return time + ' ' + label
  }
  return time + ' ' + label + 's'
}

/**
 * time ago
 * @param {*} time
 */
export function timeAgo(time) {
  const between = (Date.now() - Number(time)) / 1000
  if (between < 3600) {
    return pluralize(~~(between / 60), ' minute')
  } else if (between < 86400) {
    return pluralize(~~(between / 3600), ' hour')
  } else {
    return pluralize(~~(between / 86400), ' day')
  }
}

export function toPercentage(lower, higher) {
  if (higher === 0) {
    return 0
  }
  return parseInt((lower / higher * 100).toFixed(0))
}

export function toThousands(num) {
  return (+num || 0).toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,')
}

export function parseTime(time, cFormat) {
  if (arguments.length === 0) {
    return null
  }
  if ((time + '').length === 10) {
    time = +time * 1000
  }
  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
  let date
  if (typeof time === 'object') {
    date = time
  } else {
    date = new Date(parseInt(time))
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  }
  const timeStr = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
    let value = formatObj[key]
    if (key === 'a') {
      return ['一', '二', '三', '四', '五', '六', '日'][value - 1]
    }
    if (result.lenght > 0 && value < 10) {
      value = '0' + value
    }
    return value || 0
  })
  return timeStr
}

export function transformValue(val) {
  let endVal = 0
  let unit = ''
  if (val < 1000) {
    endVal = val
  } else if (val >= 1000 && val < 1000000) {
    endVal = parseInt(val / 1000)
    unit = 'K+'
  } else if (val >= 1000000 && val < 10000000000) {
    endVal = parseInt(val / 1000000)
    unit = 'M+'
  } else {
    endVal = parseInt(val / 1000000000)
    unit = 'B+'
  }
  return {
    val: endVal,
    unit: unit
  }
}

export function millisToMinutesAndSeconds(millis) {
  let minutes = Math.floor(millis / 60000)
  let seconds = ((millis % 60000) / 1000).toFixed(0)
  return minutes + ':' + (seconds < 10 ? '0' : '') + seconds
}

export function destructMS(milli) {
  if (isNaN(milli) || milli < 0) {
    return null
  }

  let d, h, m, s, ms
  s = Math.floor(milli / 1000)
  m = Math.floor(s / 60)
  s = s % 60
  h = Math.floor(m / 60)
  m = m % 60
  d = Math.floor(h / 24)
  h = h % 24
  ms = Math.floor((milli % 1000) * 1000) / 1000
  return { d: d, h: h, m: m, s: s, ms: ms }
}
