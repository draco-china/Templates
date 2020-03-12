<template>
  <div class="demo-infinite-container">
    <mu-list>
      <template v-for="item in list">
        <mu-list-item :title="item"/>
        <mu-divider/>
      </template>
    </mu-list>
    <mu-infinite-scroll :scroller="scroller" :loading="loading" @load="loadMore"/>
  </div>
</template>

<script>
    import lib from '@/assets/js/lib.js'
    export default {
        data () {
            const list = []
            for (let i = 0; i < 30; i++) {
                list.push('item' + (i + 1))
            }
            return {
                list,
                num: 30,
                loading: false,
                scroller: null
            }
        },
        mounted () {
            console.log()
            this.scroller = this.$el

        },
        methods: {
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
        }
    }
</script>

<style lang="css">
  .demo-infinite-container{
    width: 100%;
    height: 100%;
    overflow: auto;
    -webkit-overflow-scrolling: touch;
    border: 1px solid #d9d9d9;
  }
</style>

<!--
<template>
  <div id="app">
    <img src="./images/logo.png">
    <div>详情内容</div>
    <a href="index.html">首页</a>
    <i class="icon icon-camera"></i>
  </div>
</template>

<script>

    export default {
        name: 'app',
        data(){
            return {
                datas: [],
                page: 1,
                busy: false
            };
        },
        created:function(){
            lib.get("/user/alcohol/hasFillQuestionare",{sampleNumber:1},function (data) {
                if(!data.data){
                    window.location.href="/h5/slightlydrunk/information.html?sampleNumber="+sampleNumber;
                } else {
                    that.isAllShow = true;
                }
            });
        },
        methods:{

        },
        components: {
        }
    }
</script>
<style>
  #app{
    font-family:'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing:antialiased;
    -moz-osx-font-smoothing:grayscale;
    text-align:center;
    margin-top:60px;
  }
</style>-->
