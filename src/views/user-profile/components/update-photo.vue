<template lang="">
<div class="update-photo">
    <img class="img" 
    :src="img" 
    ref='img'
    >
    <!-- 工具栏 -->
    <div class="toolbar">
<div 
class="cancel"
@click="$emit('close')"
>取消</div>
<div class="confirm"
@click="onConfirm"
>完成</div>
    </div>
    <!-- 工具栏 -->
</div>
</template>
<script>
    // 下载后引入裁剪插件
    import 'cropperjs/dist/cropper.css'
    import Cropper from 'cropperjs'
    import {
        updateUserImg
    } from '@/api/user'
    export default {
        name: 'UpdatePhoto',
        components: {},
        props: {
            img: {
                type: [String, Object],
                required: true
            }
        },
        data() {
            return {

            }
        },
        created() {

        },
        mounted() {
            //操作dom的插件需要 是放在mounted里面
            const image = this.$refs.img
            this.cropper = new Cropper(image, {
                viewMode: 1,
                aspectRatio: 1,
                dragMode: 'move',
                cropBoxMovable: false,
                background: false,
                // crop(event) {
                //     console.log(event.detail.x)
                //     console.log(event.detail.y)
                //     console.log(event.detail.width)
                //     console.log(event.detail.height)
                //     console.log(event.detail.rotate)
                //     console.log(event.detail.scaleX)
                //     console.log(event.detail.scaleY)
                // }
            })
        },
        methods: {
            onConfirm() {
                this.cropper.getCroppedCanvas().toBlob(async blob => {
                    this.updateUserImgmd(blob)
                })

            },
            async updateUserImgmd(blob) {
                this.$toast.loading({
                    message: '保存中...',
                    forbidClick: true, // 禁止背景点击
                    duration: 0 // 持续展示
                })
                try {
                    // 错误的用法
                    // 如果接口要求 Content-Type 是 application/json
                    // 则传递普通 JavaScript 对象
                    // updateUserPhoto({
                    //   photo: blob
                    // })

                    // 如果接口要求 Content-Type 是 multipart/form-data
                    // 则你必须传递 FormData 对象
                    const formData = new FormData()
                    formData.append('photo', blob)

                    const {
                        data
                    } = await updateUserPhoto(formData)

                    // 关闭弹出层
                    this.$emit('close')
                        // 更新视图
                    this.$emit('update-photo', data.data.photo)
                        // 提示成功
                    this.$toast.success('更新成功')
                } catch (err) {
                    this.$toast.fail('更新失败')
                }
            }
        }
    }
</script>
<style lang="less" scoped>
    .update-photo {
        .img {
            display: block;
            max-width: 100%;
        }
        .toolbar {
            position: fixed;
            left: 0;
            right: 0;
            bottom: 0;
            display: flex;
            justify-content: space-between;
            .cancel,
            .confirm {
                width: 90px;
                height: 90px;
                font-size: 30px;
                font-weight: 600;
                display: flex;
                justify-content: center;
                align-items: center;
                color: #fff
            }
        }
    }
</style>