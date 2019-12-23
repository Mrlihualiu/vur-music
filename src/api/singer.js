import { commonParams } from './config'
import Axios from 'axios'

// 獲取歌手列表
export function getSingerInfo() {
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
      comm: { ct: 24, cv: 0 },
      singerList: {
        module: 'Music.SingerListServer',
        method: 'get_singer_list',
        param: {
          area: -100,
          sex: -100,
          genre: -100,
          index: -100,
          sin: 0,
          cur_page: 1
        }
      }
    }
  })

  return Axios.get(url, { params }, (res) => {
    return Promise.resolve(res.data)
  })
}

// 獲取歌手詳細信息
export function getSingerDetail(singermid = '0025NhlN2yWrP4') {
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

export function getMusic(songmid) {
  const url = './apiGetVkey'
  const params = Object.assign({}, commonParams, {
    songmid,
    filename: 'C400' + songmid + '.m4a',
    guid: 6319873028, // 会变，以实时抓取数据为准
    platform: 'yqq',
    loginUin: 0,
    hostUin: 0,
    needNewCode: 0,
    cid: 205361747,
    uin: 0,
    format: 'json'
  })
  return Axios.get(url, { params }, (res) => {
    return Promise.resolve(res.data)
  })
}