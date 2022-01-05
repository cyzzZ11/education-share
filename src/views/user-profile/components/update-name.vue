<template lang="">
    <div class="uodate-name">
           <!-- 导航栏 -->
           <van-nav-bar
           title="昵称"
           class="page-nav-bar"
           left-text="取消"
         right-text="完成"
         @click-left="$emit('close')"
         @click-right="onConfirm"
           />
           <!-- 导航栏 -->
           <!-- field输入框 -->
           <div class="field-wrap"> 
            <van-field
            v-model.trim="localName"
            rows="2"
            autosize
            type="textarea"
            maxlength="10"
            placeholder="请输入修改的昵称"
            show-word-limit
          />
           </div>
  
            <!-- field输入框 -->
    </div>
</template>
<script>
    import {
        updateUserProfile
    } from '@/api/user'
    export default {
        name: 'UpdateName',
        components: {},
        props: {
            //双向绑定的用户昵称传过来在value
            value: {
                type: String,
                required: true
            }
        },
        data() {
            return {
                localName: this.value //默认是本地value的初始值
            }
        },
        created() {

        },
        mounted() {

        },
        methods: {
            async onConfirm() {
                this.$toast.loading({
                    message: '保存中...',
                    forbidClick: true, //禁止点击背景
                    duration: 1500 //持续时间
                })
                try {
                    const localName = this.localName
                    if (!localName.length) {
                        this.$toast('昵称不能为空')
                        return
                    }
                    await updateUserProfile({
                            name: localName
                        })
                        // console.log(data)
                        // 更新视图
                    this.$emit('input', localName)
                        // 关闭弹出层
                    this.$emit('close')
                        // 提示成功
                    this.$toast.success('更新成功')

                } catch (error) {
                    this.$toast.fail('更新昵称失败，请稍后重试')
                }
            }
        }

    }
</script>
<style lang="less" scoped>
    .field-wrap {
        /* 给点边距让之间有点距离 */
        padding: 20px
    }
</style>