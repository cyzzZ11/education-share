<template lang="">

        <van-button
        v-if="isFollowed"
          class="follow-btn"
          round
          size="small"
          @click="onFollow"
          :loading="loading"
        >已关注</van-button>
        
        <van-button
         v-else
          class="follow-btn"
          type="info"
          color="#3296fa"
          round
          size="small"
          icon="plus"
          @click="onFollow"
          :loading="loading"
        >关注</van-button>
     
</template>
<script>
    import {
        addUsers,
        removeUsers
    } from '@/api/user'
    export default {
        name: 'FollowUser',
        components: {

        },
        model: {
            prop: 'isFollowed',
            event: 'update-is_followed'
        },
        props: {
            isFollowed: {
                type: Boolean,
                required: true
            },
            userId: {
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
        methods: {
            async onFollow() {
                this.loading = true //展示关注按钮的loading状态
                try {
                    if (this.isFollowed) {
                        // 关注了点就是取消关注  控制台可以看到控制关注的是aut_id
                        await removeUsers(this.userId)
                            // console.log(data);
                            // this.article.is_followed = false
                    } else {
                        // 关注
                        await addUsers(this.userId)
                            // console.log(data);
                            // this.article.is_followed = true
                    }
                    // 更新视图状态 子组件这里就改不了了 
                    // this.isFollowed = !this.isFollowed
                    // 当然update-is_followed这里创建的这个事件 要在父组件里面去监听   事件名要在model里面改了才能用
                    this.$emit('update-is_followed', !this.isFollowed)
                } catch (error) {
                    let message = "关注失败，请重试"
                    if (error.response && error.response.status === 400) {
                        message = "无法关注自己"
                    }
                    this.$toast(message)
                }
                this.loading = false //无论成功还是失败 都要关闭这个状态
            }
        },
    }
</script>
<style lang="">

</style>