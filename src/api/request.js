import axios from 'axios'
import {
  Message
} from 'element-ui'
// import store from '@/store'

const SERVICE = axios.create({
  timeout: 200000
})

SERVICE.interceptors.response.use(
  response => response,
  error => {
    console.log('err' + error)
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default SERVICE
