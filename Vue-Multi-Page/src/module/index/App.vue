<template>
  <div id="app">
    <mu-refresh-control :refreshing="refreshing" :trigger="trigger" @refresh="refresh"/>
    <mu-appbar title="首页">
    <mu-icon-button icon="close" slot="left"/>
    <mu-icon-menu icon="more_vert" slot="right">
      <mu-menu-item title="菜单 1"/>
      <mu-menu-item title="菜单 2"/>
      <mu-menu-item title="菜单 3"/>
      <mu-menu-item title="菜单 4"/>
      <mu-menu-item title="菜单 5"/>
    </mu-icon-menu>
  </mu-appbar>
  <div class="demo" style="margin-bottom:60px;">
    <mu-pape :zDepth="1" v-for="item in list">
      <mu-card>
        <mu-card-header :title="item" subTitle="这个人很懒什么都没留下">
          <mu-avatar src="" slot="avatar"/>
        </mu-card-header>
        <mu-card-media>
          <img height="200" src="./images/logo.png" />
        </mu-card-media>
        <mu-card-text>
          散落在指尖的阳光，我试着轻轻抓住光影的踪迹，它却在眉宇间投下一片淡淡的阴影。
          调皮的阳光掀动了四月的心帘，温暖如约的歌声渐起。
          似乎在诉说着，我也可以在漆黑的角落里，找到阴影背后的阳光，
          找到阳光与阴影奏出和谐的旋律。我要用一颗敏感赤诚的心迎接每一缕滑过指尖的阳光！
        </mu-card-text>
        <mu-card-actions>
          <mu-icon-button tooltip="点赞" tooltipPosition="top-center" touch>
            <i class="icon icon-dog-2"></i>
          </mu-icon-button>
          <mu-icon-button tooltip="点赞" tooltipPosition="top-center" touch>
            <i class="icon icon-my"></i>
          </mu-icon-button>
        </mu-card-actions>
      </mu-card>
    </mu-pape>
    <mu-infinite-scroll :scroller="scroller" :loading="loading" @load="loadMore"/>
  </div>
   <mu-paper :zDepth="5" style="position:fixed;bottom:0;left:0;width:100%">
      <mu-bottom-nav :value="bottomNav" @change="handleChange">
        <mu-bottom-nav-item value="recents" title="Recents" icon="restore"/>
        <mu-bottom-nav-item value="favorites" title="Favorites" icon="favorite"/>
        <mu-bottom-nav-item value="nearby" title="Nearby" icon="location_on"/>
      </mu-bottom-nav>
    </mu-paper>
  </div>
</template>

<script>
  import lib from '@/assets/js/lib.js'

  export default {
      data () {
          const list = []
          for (let i = 0; i < 10; i++) {
              list.push('item' + (i + 1))
          }
          return {
              bottomNav: 'recents',
              list,
              num: 10,
              refreshing: false,
              trigger: null,
              loading: false,
              scroller: null,
          }
      },

      mounted () {
          this.trigger = this.$el
          this.$el.style.height=window.screen.height+'px'
          this.scroller = this.$el
      },
      methods:{
          handleChange (val) {
              this.bottomNav = val
          },
          refresh () {
              this.refreshing = true
              setTimeout(() => {
                  const list = []
                  for (let i = this.num; i < this.num + 10; i++) {
                      list.push('item' + (i + 1))
                  }
                  this.list = list
                  this.num += 10
                  this.refreshing = false
              }, 2000)
          },
          loadMore () {
              this.loading = true
              setTimeout(() => {
                  for (let i = this.num; i < this.num + 10; i++) {
                      this.list.push('item' + (i + 1))
                  }
                  this.num += 10
                  this.loading = false
              }, 2000)
          }
      },
      components: {

      }
  }
</script>

<style lang="stylus">
  #app
    position:relative;
    height:100%;
    width:100%;
    overflow: auto;
    -webkit-overflow-scrolling: touch;
  .icon
    vertical-align:middle;
  .mu-card-actions
    text-align:right;
  .mu-infinite-scroll
    padding-top:8px;
    padding-bottom:0!important;

</style>

