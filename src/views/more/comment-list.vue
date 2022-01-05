<template lang="">
    <van-list
  v-model="loading"
  :finished="finished"
  finished-text="没有更多了"
  :error="error"
  error-text="加载失败，请点击重试"
  @load="onLoad"
>
  <comment-item 
  v-for="(item,index) in list" 
  :key="index" 
  :comment="item"
  />
</van-list>
</template>
<script>
    import CommentItem from './comment-item.vue'
    import {
        getComments
    } from '@/api/comment'
    export default {
        name: 'CommentList',
        components: {
            CommentItem
        },
        props: {
            source: {
                type: [Number, String, Object],
                required: true
            },
            list: {
                type: Array,
                default: () => {}
            }
        },
        data() {
            return {
                // list: [],
                loading: false,
                finished: false,
                offset: null, //获取下一页数据的标记
                limit: 15,
                error: false
            }
        },


        created() {

        },
        methods: {
            async onLoad() {
                //    1请求获取数据 
                try {
                    const {
                        data
                    } = await getComments({
                        type: 'a', //评论类型，a-对文章(article)的评论，c-对评论(comment)的回复
                        source: this.source, //源id，文章id或评论id
                        offset: this.offset, //	获取评论数据的偏移量，值为评论id，表示从此id的数据向后取，不传表示从第一页开始读取数据
                        limit: this.limit //获取的评论数据个数，不传表示采用后端服务设定的默认每页数据量
                    })
                    console.log(data);

                    // 2将数据添加到列表中
                    const {
                        results
                    } = data.data
                    this.list.push(...results)
                        // 把文章评论的总数量传递到外部
                    this.$emit('onload-success', data.data)
                        // 将loading设置为false
                    this.loading = false
                        // p判断是否还有数据
                    if (results.length) {
                        this.offset = data.data.last_id
                            // 有就更细获取下一页的数据页码

                    } else { // 没有就将finished设置结束
                        this.finished = true

                    }

                } catch (error) {
                    this.error = true
                    this.loading = false
                }
            }
        }
    }
</script>
<style lang="less" scoped>

</style>