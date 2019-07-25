<template>
  <div class="singer">
    <div class="singer-nav"></div>
    <scroll ref="scroll" class="recommend-content" :data="singers">
      <div>
        <ul class="singer-list">
          <li class="singer-item" v-for="item of singers" :key="item.singer_id">
            <img v-lazy="item.singer_pic.replace('http', 'https')" alt="" class="singer-avatar">
            <p class="singer-name">{{item.singer_name}}</p>
          </li>
        </ul>
      </div>
    </scroll>
  </div>
</template>

<script>
import { getSingerInfo } from 'api/singer'
import { ERR_OK } from 'api/config'
import Scroll from 'base/scroll/scroll'
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
    _getSingerInfo() {
      getSingerInfo().then(res => {
        if (res.data.code === ERR_OK) {
          this.singers = res.data.singerList.data.singerlist
        }
      })
    }
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