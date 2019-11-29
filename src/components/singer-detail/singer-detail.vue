<template>
  <transition name="slide">
    <music-list :songs="songs" :title="title" :bg-image="bgImage"></music-list>
  </transition>
</template>

<script type="text/ecmascript-6">
import { getSingerDetail } from 'api/singer'
import { ERR_OK } from 'api/config'
import { mapGetters } from 'vuex'
import { createSong } from 'common/js/song'
import MusicList from 'components/music-list/music-list'

export default {
  data() {
    return {
      songs: []
    }
  },
  computed: {
    title() {
      return this.singer.singer_name
    },
    bgImage() {
      return this.singer.singer_pic
    },
    ...mapGetters(['singer'])
  },
  created() {
    this._getSingerDetail()
  },
  methods: {
    _getSingerDetail() {
      if (!this.singer.singer_mid) {
        this.$router.push('/singer')
        return
      }

      getSingerDetail(this.singer.singer_mid).then(res => {
        if (res.data.code === ERR_OK) {
          this.songs = this._normallizeSongs(res.data.singer.data.songlist)
        }
      })
    },
    _normallizeSongs(list) {
      let ret = []
      list.forEach((element) => {
        let musicData = element
        if (musicData.id && musicData.album && musicData.album.mid) {
          ret.push(createSong(musicData))
        }
      })
      return ret
    }
  },
  components: {
    MusicList
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import '~common/stylus/variable';

// .singer-detail
//   position: fixed
//   z-index: 100
//   top: 0
//   left: 0
//   right: 0
//   bottom: 0
//   background: $color-background
.slide-enter-active, .slide-leave-active
  transition all 0.3s
.slide-enter, .slide-leave-to
  opacity 0
  transform translateX(100%) // 100% 完全移动到屏幕右侧 动画开始向左滑入
</style>