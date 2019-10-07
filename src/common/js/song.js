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
}

export function createSong(musicData) {
  const guid = '1057182160'
  const vkey = '1C410A3767F3242DE49D599F39323C1C23E1B7E67A36F0F4C09DDB42ABBDB67564A9D9B60D88587EF1B08193DC2031DA5BE91E4CF16A4583'
  const uin = '3280'
  return new Song({
    id: musicData.id,
    mid: musicData.mid,
    singer: filterSinger(musicData.singer),
    name: musicData.name,
    album: musicData.album.name,
    duration: musicData.interval,
    image: `https://y.gtimg.cn/music/photo_new/T002R300x300M000${musicData.album.mid}.jpg?max_age=2592000`,
    url: `http://isure.stream.qqmusic.qq.com/C400${musicData.file.media_mid}.m4a?guid=${guid}&vkey=${vkey}&uin=${uin}&fromtag=66`
  })
}

function filterSinger(singer) {
  let ret = []
  if (!singer) {
    return ''
  }
  singer.forEach((element) => {
    ret.push(element.name)
  })

  return ret.join('/')
}