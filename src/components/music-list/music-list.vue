<template>
  <div class="music-list">
    <div class="back" @click="goBack">
      <i class="icon-back"></i>
    </div>
    <h1 class="title" v-html="title"></h1>
    <div class="bg-image" :style="bgStyle" ref="bgImage">
      <div class="filter" ref="filter"></div>
    </div>
    <div class="bg-layer" ref="layer"></div>
    <scroll @scroll="scroll" :probe-type="probeType" :listen-scroll="listenScroll" :data="songs" class="list" ref="list">
      <div class="song-list-wrapper">
        <song-list :songs="songs" />
      </div>
    </scroll>
  </div>
</template>

<script type="text/ecmascript-6">
import Scroll from 'base/scroll/scroll'
import SongList from 'base/song-list/song-list'

export default {
  data() {
    return {
      scrollY: 0
    }
  },
  props: {
    bgImage: {
      type: String,
      default: ''
    },
    songs: {
      type: Array,
      default: () => { return [] }
    },
    title: {
      type: String,
      default: ''
    }
  },
  computed: {
    bgStyle() {
      return `background-image:url(${this.bgImage.replace('150x150', '300x300').replace('webp', 'jpg')})`
    }
  },
  created() {
    this.probeType = 3
    this.listenScroll = true
  },
  mounted() {
    this.maxScrollY = this.$refs.bgImage.clientHeight
    this.$refs.list.$el.style.top = `${this.maxScrollY}px`
  },
  methods: {
    goBack() {
      this.$router.go(-1)
    },
    scroll(pos) {
      this.scrollY = pos.y
    }
  },
  watch: {
    scrollY(newY) {
      let maxH = this.maxScrollY - 40
      let zIndex = 0
      let scale = 1
      let blur = 0
      if (-newY > maxH) {
        this.$refs.layer.style['transform'] = `translate3d(0, ${0 - maxH}px, 0)`
        this.$refs.layer.style['webkitTransform'] = `translate3d(0, ${0 - maxH}px, 0)`
        zIndex = 49
        this.$refs.bgImage.style.paddingTop = 0
        this.$refs.bgImage.style.height = `40px`
      } else {
        this.$refs.layer.style['transform'] = `translate3d(0, ${newY}px, 0)`
        this.$refs.layer.style['webkitTransform'] = `translate3d(0, ${newY}px, 0)`
        zIndex = 0
        this.$refs.bgImage.style.paddingTop = `70%`
        this.$refs.bgImage.style.height = `0`
      }
      const percent = Math.abs(newY / this.maxScrollY)
      if (newY > 0) {
        scale = 1 + percent
        zIndex = 10
        this.$refs.list.$el.style.top = `${this.maxScrollY + newY}px`
      } else {
        blur = Math.min(20 * percent, 20)
        this.$refs.list.$el.style.top = `${this.maxScrollY}px`
      }
      this.$refs.filter.style['backdrop-filter'] = `blur(${blur}px)`
      this.$refs.filter.style['webkitBackdrop-filter'] = `blur(${blur}px)`
      this.$refs.bgImage.style['transform'] = `scale(${scale})`
      this.$refs.bgImage.style['webkitTransform'] = `scale(${scale})`
      this.$refs.bgImage.style.zIndex = zIndex
    }
  },
  components: {
    Scroll,
    SongList
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"

  .music-list
    position: fixed
    z-index: 100
    top: 0
    left: 0
    bottom: 0
    right: 0
    background: $color-background
    .back
      position absolute
      top: 0
      left: 6px
      z-index: 50
      .icon-back
        display: block
        padding: 10px
        font-size: $font-size-large-x
        color: $color-theme
    .title
      position: absolute
      top: 0
      left: 10%
      z-index: 40
      width: 80%
      no-wrap()
      text-align: center
      line-height: 40px
      font-size: $font-size-large
      color: $color-text
      z-index: 50
    .bg-image
      position: relative
      width: 100%
      height: 0
      padding-top: 70%
      transform-origin: top
      background-size: cover
      // z-index: 49
      .play-wrapper
        position: absolute
        bottom: 20px
        z-index: 50
        width: 100%
        .play
          box-sizing: border-box
          width: 135px
          padding: 7px 0
          margin: 0 auto
          text-align: center
          border: 1px solid $color-theme
          color: $color-theme
          border-radius: 100px
          font-size: 0
          .icon-play
            display: inline-block
            vertical-align: middle
            margin-right: 6px
            font-size: $font-size-medium-x
          .text
            display: inline-block
            vertical-align: middle
            font-size: $font-size-small
      .filter
        position: absolute
        top: 0
        left: 0
        width: 100%
        height: 100%
        background: rgba(7, 17, 27, 0.4)
    .bg-layer
      position: relative
      height: 100%
      background: $color-background
    .list
      position: fixed
      top: 0
      bottom: 0
      width: 100%
      background: $color-background
      z-index: 40
      .song-list-wrapper
        padding: 20px 30px
      .loading-container
        position: absolute
        width: 100%
        top: 50%
        transform: translateY(-50%)
</style>