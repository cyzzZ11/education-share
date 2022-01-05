<template lang="">
   <van-button 
   :icon="value ? 'star' : 'star-o'"
 :class="{
 collected:value
}"
:loading='loading'
@click="onCollect"
/>
       
       
    
</template>
<script>
    import {
        addCollect,
        deleteCollect
    } from '@/api/article'
    // 加载收藏 取消组件
    export default {
        name: 'CollectArticle',
        components: {},
        props: {
            value: {
                type: Boolean,
                required: true
            },
            articleId: {
                type: [Boolean, String, Object],
                required: true
                    //这是接受父组件传过来的id声明的
            }
        },
        data() {
            return {
                loading: false //默认·1为false
            }
        },
        created() {

        },
        mounted() {

        },
        methods: {
            async onCollect() {
                this.loading = true
                try {
                    if (this.value) {
                        //   已收藏  取消收藏
                        await deleteCollect(this.articleId)

                    } else {
                        //   没有收藏 添加收藏
                        await addCollect(this.articleId)
                    }
                    //弄完了后一定不要忘了更新视图
                    this.$emit('input', !this.value)
                    this.$toast.success(this.value ? '取消收藏' : "收藏成功")
                } catch (error) {
                    this.$toast.fail('取消收藏失败,请稍后重试')
                }
                this.loading = false
            }
        },
    }
</script>
<style lang="less" scoped>
    .collected {
        color: pink
    }
</style>