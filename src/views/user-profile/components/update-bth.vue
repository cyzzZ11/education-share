<template lang="">
    <div class="update-bth">
        <!-- 选择日期 年月日
        currentDate 双向绑定了日期选择器
        设置日期选择器的默认值
        同步日期选择器选择的日期
        
        -->
        <van-datetime-picker
  v-model="currentDate"
  type="date"
  title="选择出生日期"
  :min-date="minDate"
  :max-date="maxDate"
  @cancel="$emit('close')"
  @confirm="onConfirm"
 
/>
        <!-- 选择日期 年月日 -->
    </div>
</template>
<script>
    import {
        updateUserProfile
    } from '@/api/user'
    import dayjs from 'dayjs'
    export default {
        name: 'UpdateBtn',
        props: {
            value: { //接受父组件  v-model="user.birthday"
                type: String,
                required: true
            }
        },
        data() {
            return {
                minDate: new Date(1910, 0, 1),
                maxDate: new Date(),
                currentDate: new Date(this.value),
            }
        },
        created() {

        },
        methods: {
            async onConfirm() {
                this.$toast.loading({
                    message: '保存中...',
                    forbidClick: true, //禁止点击背景
                    duration: 1200 //持续时间
                })
                try {
                    const currentDate = dayjs(this.currentDate).format('YYYY-MM-DD')
                    await updateUserProfile({
                            birthday: currentDate
                        })
                        // console.log(data)
                        // 更新视图
                    this.$emit('input', currentDate)
                        // 关闭弹出层
                    this.$emit('close')
                        // 提示成功
                    this.$toast.success('更新成功')
                } catch (error) {
                    this.$toast.fail('更新生日失败，请稍后重试')
                }
            }
        }
    }
</script>
<style lang="less" scoped>

</style>