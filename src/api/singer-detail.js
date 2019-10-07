import { commonParams } from './config'
import Axios from 'axios'

export function getSingerDetailInfo(singermid = '0025NhlN2yWrP4') {
  const url = './apiGetDiscList'
  const params = Object.assign({}, commonParams, {
    '-': 'getUCGI23520411645963324',
    g_tk: 5381,
    loginUin: 0,
    hostUin: 0,
    format: 'json',
    inCharset: 'utf8',
    outCharset: 'utf-8',
    notice: 0,
    platform: 'yqq.json',
    needNewCode: 0,
    data: {
      comm: {
        ct: 24,
        cv: 0
      },
      singer: {
        method: 'get_singer_detail_info',
        param: {
          sort: 5,
          singermid,
          sin: 0,
          num: 10
        },
        module: 'music.web_singer_info_svr'
      }
    }
  })

  return Axios.get(url, { params }, (res) => {
    return Promise.resolve(res.data)
  })
}