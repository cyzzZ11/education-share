<template>
    
        <van-cell 
        class="article-item" 
        :to="`/article/${article.art_id}`"
        >

            <div slot="title" class="title van-multi-ellipsis--l2">{{article.title}}</div>
            <div slot="label"> 
                <div class="cover-wrap" v-if="article.cover.type === 3">
                     <div class="cover-item"
                     v-for="(img, index) in article.cover.images"
                     :key="index"
                     >
                        <van-image
                        class="cover-item-img"
                     :src="img"
                        fit="cover"
                      />
                     </div>
                  
                </div>
                <!-- 最好嵌套进盒子里方便改样式 -->
                <div class="label-info-wrap">
                <span>{{article.aut_name}}</span>
                <span>{{article.comm_count}}条评论</span>
                <span>{{article.pubdate丨relativeTime}}</span>
                </div>
            </div>
            <!-- 往右边插入插槽的内容 较slot=default -->
            <van-image
            v-if="article.cover.type === 1"
            slot="default"
           class="right-cover"
            fit="cover"
            :src="article.cover.images[0]"
          />
        </van-cell>
    
</template>
<script>
    export default {
        name: 'ArticleItem',
        components: {},
        props: {
            article: {
                type: Object,
                required: true
            }
        },
        data() {
            return {

            }
        },
        created() {

        },
        methods: {

        },
    }
</script>
<style lang="less" scoped>
    /* 从当前组件根节点出发设置样式 */
    
    .article-item {
        .title {
            font-size: 40px;
            color: #3a3a3a;
        }
        /* 标题折行的处理  不能写固定宽度 根据控制台查找到相关类名改样式 */
        .van-cell__label {
            /* 图片与文字之间有距离最后给图片的容器加外边距 */
            padding-left: 25px;
            flex: unset;
            width: 246px;
            height: 146px;
            /* //把分配空间布局flex去除 */
        }
        .right-cover {
            /* 将组件给的高宽去掉写个类名改一下样式 */
            width: 232px;
            height: 146px;
        }
        .label-info-wrap span {
            /* 看设计图文字大小 */
            font-size: 22px;
            color: #b4b4bb;
            margin-right: 20px;
        }
        .cover-wrap {
            display: flex;
            padding: 30px 0;
            .cover-item {
                flex: 1;
                height: 146px;
                &:not(:last-child) {
                    padding-right: 4px;
                }
            }
            .cover-item-img {
                width: 100%;
                height: 146px;
            }
        }
    }
</style>