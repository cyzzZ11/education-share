<template lang="">
    <div class="update-gender">
        <van-picker
  title="性别选择"
  show-toolbar
  :columns="columns"
  :default-index="value"
  @confirm="onConfirm"
  @cancel="$emit('close')"
  @change="onPickerChange"
/>
    </div>
</template>
<script>
    import {
        updateUserProfile
    } from '@/api/user'
    export default {
        name: 'UpdateGender',
        data() {
            return {
                columns: ['帅哥', '美女'],
                localGender: this.value
            }
        },
        props: {
            value: {
                type: Number,
                required: true
            }
        },
        commponents: {},
        created() {

        },
        methods: {
            async onConfirm() {
                this.$toast.loading({
                    message: '保存中...',
                    forbidClick: true, //禁止点击背景
                    duration: 1500 //持续时间
                })
                try {
                    const localGender = this.localGender
                    await updateUserProfile({
                            gender: localGender
                        })
                        // console.log(data)
                        // 更新视图
                    this.$emit('input', localGender)
                        // 关闭弹出层
                    this.$emit('close')
                        // 提示成功
                    this.$toast.success('更新成功')
                } catch (error) {
                    this.$toast.fail('更新昵称失败，请稍后重试')
                }
            },
            onPickerChange(picker, value, index) {
                this.localGender = index
            }

        }
    }
</script>
<style lang="less" scoped>

</style>