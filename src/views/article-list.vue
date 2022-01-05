<template lang="">
    <div>
         <!--
        loading 控制上拉加载更多的 loading 状态
        finished 控制数据是否加载结束
        load 事件：当触发上拉加载更多的时候会触发调用 load 事件

        List 初始化后会触发一次 load 事件，用于加载第一屏的数据
        如果一次请求加载的数据条数较少，导致列表内容无法铺满当前屏幕，
        List 会继续触发 load 事件，直到内容铺满屏幕或数据全部加载完成
      -->
      <!-- 下拉刷新 -->
      <van-pull-refresh v-model="isLoading" @refresh="onRefresh"  success-duration="2000" :success-text="refreshSuccessText">
       
     
        <van-list
        v-model="loading"
        :finished="finished"
        finished-text="已经没有更多内容了"
        :error.sync="error"
        error-text="请求失败了，点击一下重新加载"
        @load="onLoad"
      >
      <article-item
      v-for="(article, index) in list" 
      :key="index" 
      :article="article"
      />
        <!-- <van-cell 
        v-for="(article, index) in list" 
        :key="index" 
        :title="article.title" /> -->
      </van-list>
    </van-pull-refresh>
    </div>
</template>
<script>
    import {
        getArticles
    } from '../api/article.js'
    // 把这个
    // 把文章列表组件传入进来
    import ArticleItem from '../components/article-item/article-item.vue'
    export default {
        name: 'ArticleList',
        components: {
            ArticleItem
        },
        props: {
            channel: {
                type: Object,
                required: true
            }
        },
        data() {
            return {
                list: [], //存储列表数据的数组
                loading: false, //控制加载中的loading状态
                finished: false, //控制数据加载结束的状态
                timestamp: null, //请求获取下一页的时间戳
                error: false, //控制列表加载失败的状态提示
                isLoading: false, //控制下拉刷新的事件
                refreshSuccessText: '' //下拉刷新成功提示文本
            }
        },
        computed: {},
        watch: {},
        created() {

        },
        mounted() {

        },
        methods: {
            async onLoad() {
                // 异步更新数据
                // setTimeout 仅做示例，真实场景中一般为 ajax 请求
                // 异步请求成功 把请求结果数据放到list数组中
                try {
                    const {
                        data
                    } = await getArticles({
                            // 传入接口文档的参数
                            channel_id: this.channel.id, //频道id
                            timestamp: this.timestamp || Date.now(), //简单理解就是请求数据的页码 第一页第二页这种 请求第一页数据 ：当前最新时间戳 Date.now()
                            //时间戳，请求新的推荐数据传当前的时间戳，请求历史推荐传指定的时间戳Date.now()
                            //用于请求之后数据的时间戳会在当前请求结果中返回给你

                            with_top: 1 //是否包含置顶，进入页面第一次请求时要包含置顶文章，1-包含置顶，0-不包含
                        })
                        // 将results从data返回的结果里的data里解构出来
                    const {
                        results
                    } = data.data
                        // 数组的展开操作符 把results数组的元素一个一个拿出来
                    this.list.push(...results)
                        // 本次数据加载状态结束之后，要把加载状态设置为结束
                    this.loading = false
                        // loading关闭以后才能触发下一次的加载更多
                    console.log(data);
                    // 判断数据是否全部加载完成 数据全部加载完成
                    if (results.length) {
                        // 更新获取下一页数据的时间戳
                        // 更新获取下一页数据的时间戳
                        this.timestamp = data.data.pre_timestamp
                    } else {
                        // 没有数据了把fininshed设置为true  之后不再触发加载更多
                        this.finished = true
                    }


                } catch (err) {
                    //   this.$toast('请求数据失败')失败了这个交互方式不是很好
                    // 用组件库的 更有交互  请求失败重新试


                }

            },
            async onRefresh() {
                //当下拉刷新的时候回触发调用这个函数
                try {
                    const {
                        data
                    } = await getArticles({
                            // 传入接口文档的参数
                            channel_id: this.channel.id, //频道id
                            timestamp: Date.now(), //下拉刷新每次请求获取最新数据 
                            with_top: 1 //是否包含置顶，进入页面第一次请求时要包含置顶文章，1-包含置顶，0-不包含
                        })
                        //    请求获取数据  获取的数据放在列表的顶部
                    const {
                        results
                    } = data.data
                    this.list.unshift(...data.data.results)

                    // 数据下拉刷新的loading状态
                    this.isLoading = false
                        // 更新下拉刷新成功提示的文本
                    this.refreshSuccessText = `刷新成功，更新了${results.length}条动态`

                } catch (error) {
                    this.isLoading = false
                    this.refreshSuccessText = "刷新失败"

                }

            }


        }
    }
</script>
<style lang="less" scoped>
    .van-cell {
        position: relative;
        display: -webkit-box;
        display: -webkit-flex;
        display: flex;
        box-sizing: border-box;
        width: 100%;
        padding: 0.26667rem 0.42667rem;
        overflow: hidden;
        color: #323233;
        font-size: 0.37333rem;
        line-height: 0.64rem;
        background-color: #fbcfd6;
    }
    
    .article-list {
        height: 79vh;
        overflow-y: auto;
    }
</style>