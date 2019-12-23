import Axios from 'axios'
import { commonParams } from './config'

export function getLyric(mid) {
  const url = './lyric'
  const params = Object.assign({}, commonParams, {
    nobase64: 1,
    musicid: mid,
    '-': 'jsonp1',
    g_tk: 5381,
    loginUin: 0,
    hostUin: 0,
    format: 'json',
    inCharset: 'utf8',
    outCharset: 'utf-8',
    platform: 'yqq.json',
    needNewCode: 0
  })

  return Axios.get(url, { params }, (res) => {
    return Promise.resolve(res.data)
  })
}