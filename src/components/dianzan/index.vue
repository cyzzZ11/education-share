<template lang="">
    <van-button 
    :icon="value === 1 ? 'good-job' : 'good-job-o'"
  :class="{
  liked : value === 1
 }"
 :loading='loading'
 @click="onLiked"
 />
        
        
</template>
<script>
    import {
        Liked,
        noLiked
    } from '@/api/article'
    export default {
        name: 'LikeArticle',
        components: {},
        props: {
            value: {
                type: Number,
                required: true
            },
            articleId: {
                type: [Number, String, Object],
                required: true
            }
        },
        data() {
            return {
                loading: false
            }
        },
        created() {

        },
        mounted() {

        },
        methods: {
            async onLiked() {
                this.loading = true
                try {
                    let status = -1
                    if (this.value === 1) {
                        // 已经点赞了 就取消点赞
                        await noLiked(this.articleId)
                    } else {
                        // 没有点赞  就点赞
                        await Liked(this.articleId)
                        status = 1
                    }
                    this.$emit('input', status)
                    this.$toast.success(status === 1 ? '点赞成功' : '点赞失败')
                } catch (error) {
                    this.$toast.fail('点赞失败，请稍后重试')
                }
                this.loading = false
            }
        }
    }
</script>
<style lang="less" scoped>
    .liked {
        color: orange;
    }
</style>