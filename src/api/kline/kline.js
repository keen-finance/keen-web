import request from '../../utils/request'
import qs from 'qs'

export function list(params) {
  return request({
    url: '/api/marketKline/get'+ '?' + qs.stringify(params, { indices: false }),
    method: 'get'
  })
}

export default { list }
