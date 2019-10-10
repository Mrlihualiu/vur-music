<template>
  <div class="singer">
    <div class="singer-nav"></div>
    <scroll ref="scroll" class="recommend-content" :data="singers">
      <div>
        <ul class="singer-list">
          <li class="singer-item" @click="selectSinger(item)" v-for="item of singers" :key="item.singer_id">
            <img v-lazy="item.singer_pic.replace('webp','jpg')" alt="" class="singer-avatar needsclick">
            <p class="singer-name">{{item.singer_name}}</p>
          </li>
        </ul>
      </div>
    </scroll>
    <router-view></router-view>
  </div>
</template>

<script>
import { getSingerInfo } from 'api/singer'
import { ERR_OK } from 'api/config'
import Scroll from 'base/scroll/scroll'
import { mapMutations } from 'vuex'

export default {
  name: 'siger',
  data() {
    return {
      singers: []
    }
  },
  created() {
    this._getSingerInfo()
  },
  methods: {
    // 跳转歌手详情
    selectSinger(singer) {
      this.$router.push({
        path: `/singer/${singer.singer_id}`
      })
      this.setSinger(singer)
    },
    // 获取歌手信息
    _getSingerInfo() {
      getSingerInfo().then(res => {
        if (res.data.code === ERR_OK) {
          this.singers = res.data.singerList.data.singerlist
        }
      })
    },
    ...mapMutations({
      setSinger: 'SET_SINGER'
    })
  },
  components: {
    Scroll
  }
}
</script>

<style lang="stylus" scoped>
.singer
  position fixed
  top 88px
  bottom 0
  width 100%
  .recommend-content
    height 100%
    overflow hidden
    .singer-list
      padding 50px 0 0 30px
      .singer-item
        display flex
        align-items center
        margin-bottom 15px
        .singer-avatar
          width 60px
          height 60px
          border-radius 50%
          margin-right 20px
</style>