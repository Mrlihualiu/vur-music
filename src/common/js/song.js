import { getLyric } from '@/api/song'
import { ERR_OK } from '@/api/config'
import { Base64 } from 'js-base64'

export default class Song {
  constructor({
    id,
    mid,
    singer,
    name,
    album,
    duration,
    image,
    url
  }) {
    this.id = id
    this.mid = mid
    this.singer = singer
    this.name = name
    this.album = album
    this.duration = duration
    this.image = image
    this.url = url
  }

  getLyric() {
    if (this.lyric) {
      return Promise.resolve()
    }
    return new Promise((resolve, reject) => {
      getLyric(this.mid).then((res) => {
        if (res.retcode === ERR_OK) {
          this.lyric = Base64.decode(res.lyric) // 解码 得到字符串
          resolve(this.lyric)
        } else {
          reject(new Error('no lyric'))
        }
      })
    })
  }
}

// 抽象出一个工厂方法：传入musicData对象参数，实例化一个Song
export function createSong(musicData) {
  const guid = '5857670894'
  const vkey = 'EB24E110902ECD08FBAF3EA42827E8E9F819785F16D66DF12B60BD36AFEC24D26689608E0D6528A7266E2700FEBED8352942B325D9271871'
  const uin = '3280'
  return new Song({
    id: musicData.id,
    mid: musicData.mid,
    singer: filterSinger(musicData.singer),
    name: musicData.name,
    album: musicData.album.name,
    duration: musicData.interval,
    image: `https://y.gtimg.cn/music/photo_new/T002R300x300M000${musicData.album.mid}.jpg?max_age=2592000`,
    url: `http://ws.stream.qqmusic.qq.com/C100${musicData.file.media_mid}.m4a?guid=${guid}&vkey=${vkey}&uin=${uin}&fromtag=38`
  })
}

// 格式化处理singer数据
export function filterSinger(singer) {
  let ret = []
  if (!singer) {
    return ''
  }
  singer.forEach((element) => {
    ret.push(element.name)
  })

  return ret.join('/')
}