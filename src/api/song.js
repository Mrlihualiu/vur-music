import Axios from 'axios'
import { commonParams } from './config'

// export function getLyric(mid) {
//   const url = './lyric'
//   const params = Object.assign({}, commonParams, {
//     songmid: mid,
//     pcachetime: +new Date(),
//     platform: 'yqq',
//     hostUin: 0,
//     needNewCode: 0,
//     g_tk: 5381,
//     format: 'json'
//   })

//   return Axios.get(url, { params }, (res) => {
//     return Promise.resolve(res.data)
//   })
// }
export function getLyric(mid) {
  const url = './lyric'
  const params = Object.assign({}, commonParams, {
    nobase64: 1,
    musicid: 106359731,
    '-': 'jsonp1',
    g_tk: 5381,
    loginUin: 0,
    hostUin: 0,
    format: 'json',
    inCharset: 'utf8',
    outCharset: 'utf-8',
    notice: 0,
    platform: 'yqq.json',
    needNewCode: 0
  })

  return Axios.get(url, { params }, (res) => {
    return Promise.resolve(res.data)
  })
}