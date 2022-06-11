let BASE_URL = ''
const TIME_OUT = 10000

console.log(process.env.NODE_ENV)

// development 开发环境
// production 生产环境
if (process.env.NODE_ENV === 'development') {
  // BASE_URL = '/api'
  BASE_URL = 'http://152.136.185.210:5000/'
} else if (process.env.NODE_ENV === 'production') {
  BASE_URL = 'http://zero.org/prod'
} else {
  BASE_URL = 'http://zero.org/test'
}

export { BASE_URL, TIME_OUT }
