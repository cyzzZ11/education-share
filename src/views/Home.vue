<template>
    <div class="home-containeer">
      <!-- 导航栏 -->
      <van-nav-bar class="page-nav-bar" fixed>
          <van-button 
          slot="title" 
          type="info" 
          round 
          size="small" 
          class="search-btn" 
          icon="search"
          to="/sousuo"
          >搜索</van-button>
      </van-nav-bar>

      <!-- 频道列表 v-model="active"打开的是默认打开的第几个索引号内容 v-->
      <van-tabs v-model="active" swipeable animated color="#ffd6e2">
        <van-tab 
        :title="channel.name" v-for="channel in channels" :key=channel.id>
        <!-- 文章列表 -->
        <article-list :channel="channel"></article-list>
    </van-tab>
        
        <div slot="nav-right" class="placeholder"></div>
        <div slot="nav-right" class="rightbtn" @click="isChannelEditShow=true">
            <i class="toutiao toutiao-gengduo"></i>
        </div>
      </van-tabs>

      <!-- 【频道编辑弹出层】 -->
      <van-popup v-model="isChannelEditShow" 
      round 
      closeable
      position="bottom" 
      :style="{ height: '100%' }"
      close-icon-position="top-left">
    <!-- 里面内容部分直接封装成一个组件来引用 -->
    <channel-edit 
    :my-channels="channels"
    :active="active"
    @update-active="onUpdateActive"
    > </channel-edit>  
    
    </van-popup>
        <!-- 【频道编辑弹出层】 -->
    </div>
</template>
<script>
    import {
        getUserChannels
    } from '@/api/user'
    import ArticleList from './article-list.vue'
    import ChannelEdit from '../components/channel-edit.vue'
    import {
        mapState
    } from 'vuex'
    import {
        getItem
    } from '../utils/storage.js'
    export default {
        name: 'HomeIndex',
        components: {
            // 注册一下
            ArticleList,
            ChannelEdit
        },
        props: {},
        data() {
            return {
                active: 0,
                channels: [], //频道列表
                isChannelEditShow: false //控制编辑弹出层的状态
            }
        },
        computed: {
            ...mapState(['user'])
        },
        watch: {},
        created() {
            // 生命函数里先声明一个函数调用 方法事件里写出来 
            this.loadChannels()
        },
        mounted() {

        },
        methods: {
            async loadChannels() {
                try {
                    let channels = []
                    if (this.user) {
                        const {
                            data
                        } = await getUserChannels()
                        channels = data.data.channels
                    } else {
                        // 未登录判断本地是否又频道列表
                        const localChannels = getItem('TOUTIAO_CHANNELS')
                            // 有就拿来使用
                        if (localChannels) {
                            channels = localChannels
                        } else {
                            // 没有就获取默认频道列表  但不用再请求接口  就是再获取频道列表
                            const {
                                data
                            } = await getUserChannels()
                            channels = data.data.channels
                        }
                    }
                    this.channels = channels
                } catch (error) {
                    this.$toast('获取频道数据失败')

                }
            },
            //这个父子组件通信用的函数  形参可以随便写 但最好携程相关的  比如传的索引号就索引号
            onUpdateActive(index, isChannelEditShow = true) {
                console.log('home', index);
                this.active = index
                    //控制台控制  index传递过来了  那就让控制相关页面变化active与index相等就行了
                this.isChannelEditShow = isChannelEditShow //切换页面已经成功了  就让这个弹出页面关闭 就实现切换成功的效果了
            }

        },
    }
</script>
<style lang="less">
    .home-containeer {
        /* 为了审查元素显示加载要给这个盒子加个底边距这样不会被下面的导航栏挡住 */
        padding-bottom: 100px;
        /* 同样这里加上边距是因为上面两个固定定位遮了一定距离的数据 */
        /* 距离就是控制台里盒子相加的数据    数据到程序里过来要乘以2才是和控制台里一抹一眼的 */
        padding-top: 174px;
    }
    
    .page-nav-bar {
        background-color: pink;
        .van-nav-bar__title {
            max-width: none;
            /* 查看后台控制器发现搜索按钮的这个父元素 有个最多宽度限制将其清除这样搜索框就
            宽度不够 */
        }
        .search-btn {
            text-align: center;
            width: 555px;
            height: 64px;
            background-color: #efb4c6;
            border: none;
            font-size: 28px;
            .van-icon {
                font-size: 32px;
                color: #fff
            }
        }
    }
    
    .van-tabs__nav {
        background-color: #f9cadb;
    }
    
    .van-tab {
        font-size: 30px;
        color: #777;
        font-weight: 500;
    }
    
    .van-tab--active {
        color: #333
    }
    
    .van-tabs__line {
        z-index: 999;
        position: absolute;
        bottom: 0.4rem;
        left: 0;
        z-index: 1;
        width: 1.06667rem;
        height: 0.08rem;
        background-color: #f17987!important;
        border-radius: 0.08rem;
        width: 41px;
        height: 5px;
        margin-bottom: 12px;
    }
    
    .rightbtn {
        position: fixed;
        right: 0;
        margin-left: 50px;
        width: 66px;
        height: 82px;
        display: flex;
        justify-content: center;
        align-items: center;
        opacity: 0.902;
        i.toutiao {
            font-size: 33px;
        }
        &:before {
            position: absolute;
            left: 0;
            /* 显示出来要定位到最左边 */
            content: "";
            width: 2px!important;
            /* 宽度电脑上会看不清，实际上是模拟器效果不行 */
            height: 100%;
            background-image: url(../assets/gradient-gray-line.png);
            background-size: contain;
        }
    }
    
    .placeholder {
        /* 父级是flex布局  兄弟已经把flex的空间平均完了 所有设置宽度没有 设置不上 这个盒子是弄出来让右侧标签不档字 */
        width: 66px;
        height: 82px;
        flex-shrink: 0;
        /* 将这个设置为0就有宽度了  不参与剩余空间计算  这个盒子直接插入 */
    }
    
    .van-tabs__wrap {
        height: 82px;
        position: fixed;
        top: 92px;
        z-index: 99;
        left: 0;
        right: 0;
    }
</style>