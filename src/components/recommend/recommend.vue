<template>
  <div class="recommend">
    <scroll ref="scroll" class="recommend-content" :data="discList">
      <div>
        <div v-if="recommends.length" class="slider-wrapper">
          <slider>
            <div v-for="(item, index) of recommends" :key="index">
              <a :href="item.linkUrl">
                <img :src="item.picUrl" @load="loadImage" class="needsclick">
              </a>
            </div>
          </slider>
        </div>
        <div class="recommend-list">
          <h1 class="list-title">热门歌单推荐</h1>
          <ul class="disc-list">
            <li v-for="(item, index) of discList" :key="index" class="disc-list-item">
              <div class="icon">
                <img v-lazy="item.cover" class="needsclick" alt="">
              </div>
              <div class="text">
                <h2 class="text-title">{{item.title}}</h2>
                <p class="user-name">{{item.username}}</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div class="loading-container" v-show="!discList.length">
        <loading />
      </div>
    </scroll>
  </div>
</template>

<script>
import Slider from 'base/slider/slider'
import { getRecommend, getDiscList } from 'api/recommend'
import { ERR_OK } from 'api/config'
import Scroll from 'base/scroll/scroll'
import Loading from 'base/loading/loading'

export default {
  data() {
    return {
      recommends: [],
      discList: []
    }
  },
  created() {
    this._getRecmmend()
    this._getDiscList()
  },
  methods: {
    _getRecmmend() {
      getRecommend().then((res) => {
        if (res.code === ERR_OK) {
          this.recommends = res.data.slider
        }
      })
    },
    _getDiscList() {
      getDiscList().then((res) => {
        if (res.data.code === ERR_OK) {
          this.discList = res.data.recomPlaylist.data.v_hot
        }
      })
    },
    loadImage() {
      if (!this.checkLoaded) {
        this.$refs.scroll.refresh()
        this.checkLoaded = true
      }
    }
  },
  components: {
    Slider,
    Scroll,
    Loading
  }
}
</script>

<style lang="stylus" scoped>
@import "~common/stylus/variable"
@import "~common/stylus/mixin"
.recommend
  position: fixed
  width: 100%
  top: 88px
  bottom: 0
  .recommend-content
    height: 100%
    overflow: hidden
    .slider-wrapper
      position: relative
      width: 100%
      overflow: hidden
    .recommend-list
      .list-title
        height: 65px
        line-height: 65px
        text-align: center
        font-size: $font-size-medium
        color: $color-theme
      .item
        display: flex
        box-sizing: border-box
        align-items: center
        padding: 0 20px 20px 20px
        .icon
          flex: 0 0 60px
          width: 60px
          padding-right: 20px
          overflow: hidden
        .text
          display: flex
          flex-direction: column
          justify-content: center
          flex: 1
          line-height: 20px
          overflow: hidden
          font-size: $font-size-medium
          .name
            margin-bottom: 10px
            color: $color-text
          .desc
            color: $color-text-d
      .disc-list
        display flex
        flex-wrap wrap
        justify-content space-between
        padding 10px
        .disc-list-item
          width 49%
          margin-bottom 15px
          .icon
            img
              width 100%;
              border-radius 2px
          .text
            .text-title
              no-wrap()
              margin 5px 0
              font-size 14px
              color $color-text
            .user-name
              font-size 12px
              color $color-text-l
    .loading-container
      position: absolute
      width: 100%
      top: 50%
      transform: translateY(-50%)
</style>