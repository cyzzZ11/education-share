<template lang="">
    <div class="zhuti">
         <van-cell > 
              <div slot="title" class="title-text"> 我的动态圈</div> 
            <van-button type="danger" 
            plain
             round
             size="mini" 
             class="editbtn"
             @click="isEdit=!isEdit" >{{isEdit ? "完成" : "编辑"}}</van-button>
            </van-cell>

            <!-- 带边距的宫格表格组件 -->
            <van-grid :gutter="10" :border="false" class="my-grid">
                <van-grid-item v-for="(channel,index) in myChannels" 
                class="grid-item"
                :key="index" 
          @click="onMyChannelClick(channel,index)"
                >
<!-- 独立的标签才能做指令 下面的写法 -->
                <van-icon 
                slot="icon" 
                name="clear"
                v-show="isEdit && !fixChannels.includes(channel.id)">

                </van-icon>
                <span 
                class="text"
                :class="{active:index === active}"
                slot="text">
{{channel.name}}
                </span>
                </van-grid-item>
              </van-grid>

              <van-cell > 
                <div slot="title" class="title-text"> 热门推荐</div> 
              </van-cell>
  
              <!-- 带边距的宫格表格组件 -->
              <van-grid :gutter="10" :border="false"  class="recommend-grid">
                  <van-grid-item 
                  v-for="(channel,index) in recommendChannels" 
                  class="grid-item"
                  :key="index" 
                  :text="channel.name"
                  icon="plus" 
                  @click="onAddChannel(channel)"/>
                  <!-- 要把遍历出来的channel给点击事件传入进去 -->
                </van-grid>
    </div>
</template>
<script>
    // 加载获取全部频道数据模块
    import {
        getAllChannels,
        addUserChannels,
        removeUserChannels
    } from '@/api/channel.js'

    import {
        mapState
    } from 'vuex'
    // 还要把存储方法导入进来
    import {
        setItem
    } from '../utils/storage.js'
    //调用非组件的要加｛｝号不然没用
    export default {
        name: 'ChannelEdit',
        components: {

        },
        props: {
            myChannels: {
                type: Array,
                required: true
            },
            active: {
                type: Number,
                required: true
            }
        },
        data() {
            return {
                allChannels: [], //默认是一个空数组,所有频道
                isEdit: false, //控制编辑按钮的状态
                fixChannels: [0, 2, 11] //固定频道不允许删除的 channel.id
            }
        },
        computed: {
            ...mapState(['user']), //把user映射过来
            recommendChannels() {
                const channels = []
                this.allChannels.forEach(channel => {
                        const ret = this.myChannels.find(
                                myChannel => {
                                    return myChannel.id === channel.id
                                }
                            )
                            //如果我的频道中不包括该频道项。则手机到推荐频道中
                        if (!ret) {
                            channels.push(channel)
                        }
                    })
                    //把计算结果返回
                return channels
            }
            // 这个方法太多了容易绕 用下面的简易方法 j就是过滤那些不相等id 就是不相同的id拿出来返回
            // recommendChannels() {
            //     return this.allChannels.filter(channel => {
            //         return !this.myChannels.find(myChannel => {
            //             myChannel.id === channel.id
            //         })
            //     })
            // }


        },
        watch: {},
        created() {
            this.loadAllChannels()
        },
        mounted() {

        },
        methods: {
            async loadAllChannels() {
                try {
                    const {
                        data
                    } = await getAllChannels()
                    this.allChannels = data.data.channels
                    console.log(data);
                } catch (error) {
                    this.$toast('数据获取失败', error)

                }
            },
            // 、要把遍历出来的channel给点击事件传入进去
            async onAddChannel(channel) {
                // console.log(channel);
                this.myChannels.push(channel)
                    // 数据持久化的处理
                    //要拿到用户登录的状态
                if (this.user) {
                    try {
                        //已登录 吧数据请求接口放到线上
                        await addUserChannels({
                            id: channel.id, //频道id
                            seq: this.myChannels.length //序号
                        })
                    } catch (error) {
                        this.$toast('保存失败，请稍后重试')
                    }
                } else {
                    // 未登陆 把数据存储到本地
                    // 结合调用的存储方法
                    setItem('TOUTIAO_CHANNELS', this.myChannels)
                }

            },
            onMyChannelClick(channel, index) {
                // console.log(channel, index);
                //如果是下面这种的固定频道 则不删除
                if (this.isEdit) {
                    if (this.fixChannels.includes(channel.id)) {
                        return
                    }
                    // 删除频道项
                    this.myChannels.splice(index, 1)
                        //   // 如果是编辑状态 执行删除频道 否则相反
                        // 删除会发现如果删除选中标签的前面的  后面高亮会不在原先位置所以要做一个简单判定
                    if (index <= this.active) {
                        //
                        this.$emit('update-active', this.active - 1, true)
                    }
                    // 处理持久化
                    this.deleteChannel(channel)

                } else {
                    //看vue容器  切换首页内容关机是data里的active 所以只要点击时候改变相关的active
                    //就能切换成功但这个数据在home父组件之中   所以用父子组件通信
                    this.$emit('update-active', index, false)
                        //这样传递过去后 去父组件中监听他
                        //update-active得到父亲级去添加j
                }
            },
            async deleteChannel(channel) {

                try {
                    if (this.user) {
                        // 已经登录 则将数据更新到线上
                        await removeUserChannels(channel.id)
                    } else {
                        // 未登录  将数组更新到本地 修改本地数据就是重新给他存一下
                        setItem('TOUTIAO_CHANNELS', this.myChannels)
                    }
                } catch (error) {
                    this.$toast('操作失败，请稍后重试')
                }

            }

        },
    }
</script>
<style lang="less" scoped>
    .zhuti {
        padding: 85px 0;
    }
    
    .title-text {
        font-size: 32px;
        color: #333;
    }
    
    .editbtn {
        width: 104px;
        height: 48px;
        font-size: 25px;
        color: #f85959;
        border: 1px solid #f85959;
    }
    
    /deep/ .grid-item {
        width: 160px;
        height: 56px;
        .van-grid-item__content {
            white-space: nowrap;
            background-color: pink;
            .van-grid-item__text,
            .text {
                font-size: 28px;
                color: #222;
                margin-top: 0;
            }
            .active {
                color: red;
                font-weight: 700;
            }
            .van-grid-item__icon-wrapper {
                position: unset;
            }
        }
    }
    
    /deep/ .recommend-grid {
        .grid-item {
            .van-grid-item__content {
                /* 不要让文字多了折行 */
                z-index: 99;
                flex-direction: row;
                .van-grid-item__text,
                .text {
                    /* 查看控制台这个管文字得样式 去掉上外边距 */
                    margin-top: 0;
                }
                .van-icon-plus {
                    font-size: 28px;
                    margin-bottom: 5px;
                    margin-right: 6px;
                    /* 同样查看控制台这个管加号样式 */
                }
            }
        }
    }
    /* 修改删除图标的定位样式   */
    
    /deep/ .my-grid {
        .grid-item {
            .van-icon-clear {
                position: absolute;
                right: 0px;
                top: -15px;
                font-size: 30px;
                z-index: 999;
            }
        }
    }
    
    .van-cell {
        /* 把上面小盒子压住了一些 */
        margin-top: 10px;
    }
</style>