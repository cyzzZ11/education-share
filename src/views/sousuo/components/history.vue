<template lang="">
    <div class="history">
        <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        :error.sync="error"
        error-text="请求失败，点击重新加载"
        @load="onLoad"
      >
        <van-cell 
        v-for="(article,index) in list" 
        :key="index" 
        :title="article.title" />
      </van-list>
    </div>
</template>
<script>
    // 加载搜索结果的api
    import {
        getSearchResult
    } from '@/api/search'
    export default {
        name: "History",
        components: {},
        props: {
            searchText: {
                type: String,
                required: true
            }
        },
        data() {
            return {
                list: [],
                loading: false,
                finished: false,
                page: 1, //默认给个1
                error: false,
            }
        },
        created() {

        },
        methods: {
            async onLoad() {
                try {
                    //   1请求获取数据
                    const {
                        data
                    } = await getSearchResult({
                        page: this.page, //看接口文档传参
                        per_page: this.perPage, //每页数量
                        q: this.searchText //查询关键词
                    })
                    console.log(data);
                    // 2将数据添加到数组列表中
                    const {
                        results
                    } = data.data
                    this.list.push(...results)
                        // 将本次加载中的loadingg关闭
                    this.loading = false
                        // 判断是否还有数据
                    if (results.length) {

                        // 如果有，则更新获取下一个数据的页码
                        this.page++
                            // 如果没有 则将加载状态finished设置为结束
                    } else {
                        this.finished = true
                    }


                } catch (error) {
                    //展示加载失败的提示状态
                    this.error = true
                        // 加载失败了把loading停掉
                    this.loading = false
                    this.$toast('数据获取失败，请稍后重试')
                }
            }
        }

    }
</script>

<style lang="less" scoped>

</style>