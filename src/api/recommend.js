import jsonp from 'common/js/jsonp'
import { commonParams, options } from './config'
import Axios from 'axios'

// 获取首页banner
export function getRecommend() {
  const url = 'https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg'
  const data = Object.assign({}, commonParams, {
    platform: 'h5',
    uin: 0,
    needNewCode: 1
  })

  return jsonp(url, data, options)
}
export function getDiscList() {
  const url = './apiGetDiscList'
  const params = Object.assign({}, commonParams, {
    '-': 'recom5430035378256945',
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
      comm: { ct: 24 },
      recomPlaylist: {
        method: 'get_hot_recommend',
        param: { async: 1, cmd: 2 },
        module: 'playlist.HotRecommendServer'
      }
    }
  })

  return Axios.get(url, { params }, (res) => {
    return Promise.resolve(res.data)
  })
}