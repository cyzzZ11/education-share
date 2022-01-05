<template lang="">
    <div class="Sousuo-suggestion">
        <van-cell 
        
        icon="search"
        v-for="(text,index) in suggestions"
        :key="index"
        @click="$emit('search',text)"
        >
        <div slot="title" v-html="hightlight(text)"></div>
        </van-cell>
      
    </div>
</template>
<script>
    import {
        debounce
    } from "lodash" //按需加载进来
    import {
        getSearchSuggestion
    } from '@/api/search'
    export default {
        name: "SousuoSuggestion",
        components: {},
        props: {
            searchText: {
                type: String,
                required: true
            }
        },
        data() {
            return {
                suggestions: [], //联想相应的数据
                htmlStr: 'Hello <span style="color: pink">World</span>'
            }
        },
        watch: {
            // 监视谁写谁 当父子传的参数发送改变的时候就会调用handler函数  写完整函数是为了写一些属性
            searchText: {
                handler: debounce(function(value) {
                    // console.log(value);
                    //  feng封装一个函数这里直接调用 不然太长了反而复杂容易错
                    this.loadSearchSuggestions(value)
                }, 500),
                immediate: true
                    // 看官方文档 加个后面这个回调·将会在侦听开始之后被立即调用
            }
        },
        created() {

        },
        methods: {
            async loadSearchSuggestions(q) {
                try {
                    const {
                        data
                    } = await getSearchSuggestion(q)
                        // await getSearchSuggestion(this.searchText)里面的内容可以换成传过来的q
                        // console.log(data);
                    this.suggestions = data.data.options //看控制台数据结构赋值
                } catch (error) {
                    this.$toast('数据获取失败，请稍后重试')
                }
            },
            // 搜索文本高亮方法
            hightlight(text) {
                const hightlightStr = `<span class="hlight">${this.searchText}</span>`
                    // 如果需要根据数据变量动态de创建正则表达式，则手动new RegExp
                const reg = new RegExp(this.searchText, 'gi')
                return text.replace(reg, hightlightStr)
            }
        }

    }
</script>

<style lang="less" scoped>
    .Sousuo-suggestion {
        /deep/ span.hlight {
            color: pink
        }
    }
</style>