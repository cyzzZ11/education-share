<template>
    <div class="article-container">
          <!-- 导航栏 -->
          <van-nav-bar
            class="page-nav-bar"
            left-arrow
            title="蜜糖乐园"
            @click-left="$router.back()"
          ></van-nav-bar>
          <!-- /导航栏 -->
  
      <div 
     
      class="main-wrap">
        <!-- 加载中 -->
        <div 
        v-if="loading"
        
        class="loading-wrap">
          <van-loading
            color="#3296fa"
            vertical
          >加载中</van-loading>
        </div>
        <!-- /加载中 -->
  
        <!-- 加载完成-文章详情 -->
        <div 
        v-else-if="article.title"
        class="article-detail">
          <!-- 文章标题 -->
          <h1 class="article-title">{{article.title}}</h1>
          <!-- /文章标题 -->
  
          <!-- 用户信息 -->
          <van-cell class="user-info" 
          center 
          :border="false">
            <van-image
              class="avatar"
              slot="icon"
              round
              fit="cover"
              :src="article.aut_photo"
            />
            <div slot="title" class="user-name">{{article.aut_name}}</div>
            <div slot="label" class="publish-date">{{article.pubdate | relativeTime}}</div>
            
            <follow-user  
             class="follow-btn"
      v-model="article.is_followed"
             :user-id="article.aut_id"
         
             />
            <!-- 
                上面用的￥event是事件参数
                当我们传递给子组件的数据 纪要使用 还要修改
                传递 props     :is-followed="article.is_followed" 
                修改 自定义事件    @update-is_followed="article.is_followed = $event"
                简写方式  就是在组件上使用v-model
默认规则 value="article.is_followed"   @input="article.is_followed= $event"
如果需要修改 v-model 的规则名称 可以通过子组件的model属性来修改

                <van-button
            v-if="article.is_followed"
              class="follow-btn"
              round
              size="small"
              @click="onFollow"
              :loading="followLoading"
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
              :loading="followLoading"
            >关注</van-button>
            -->
          </van-cell>
          <!-- /用户信息 -->
  
          <!-- 文章内容 -->
          <div 
          class="article-content markdown-body" 
          v-html="article.content"
          ref="article-content"
          >
        </div>
          <van-divider>动态-End</van-divider>
            <!-- 文章的评论列表  监听onload-success子组件弄得这个事件 -->
            <comment-list
            :source="article.art_id"
            :list="commentList"
            @onload-success="totalCommentCount = $event.total_count"
            />
      <!-- 底部区域 -->
        <div class="article-bottom">
        <van-button
          class="comment-btn"
          type="default"
          round
          size="small"
          @click="isPostShow=true"
        >写评论</van-button>
        <van-icon
          name="comment-o"
          :info="totalCommentCount"
          color="#777"
        />
        <collect-article
        class="btn-item"
        v-model="article.is_collected"
        :article-id="article.art_id"
        />
      <like-article 
      class="btn-item"
      v-model="article.attitude"
      :article-id="article.art_id"
      />
        <van-icon name="share" color="#777777"></van-icon>
       </div>
      <!-- /底部区域 -->
      <!-- 发布评论弹出层 -->
      <van-popup
  v-model="isPostShow"
  closeable
  position="bottom"
 
>
<comment-post
:target="article.art_id"
@post-success="onPostSuccess"
/>
</van-popup>
<!-- 发布评论弹出层 -->
        </div>
        <!-- /加载完成-文章详情 -->
  
        <!-- 加载失败：404 -->
        <div 
        v-else-if="errstatus === 404"
        class="error-wrap">
          <van-icon name="failure" />
          <p class="text">该资源不存在或已删除！</p>
        </div>
        <!-- /加载失败：404 -->
  
        <!-- 加载失败：其它未知错误（例如网络原因或服务端异常） -->
        <div 
        v-else
        class="error-wrap">
          <van-icon name="failure" />
          <p class="text">内容加载失败！</p>
          <van-button class="retry-btn">点击重试</van-button>
        </div>
        <!-- /加载失败：其它未知错误（例如网络原因或服务端异常） -->
      </div>

    </div>
  </template>

<script>
    import {
        getArticleById
    } from '@/api/article'
    import {
        ImagePreview
    } from 'vant'
    import FollowUser from '@/components/follow-user/index.vue'
    import CollectArticle from '@/components/collect-article/index.vue'
    import LikeArticle from '@/components/dianzan/index.vue'
    import CommentList from '../more/comment-list.vue'
    import CommentPost from '../more/comment-post.vue'
    export default {
        name: 'ArticleIndex',
        components: {
            FollowUser,
            CollectArticle,
            // 注册自己的自定义组件
            LikeArticle,
            CommentList,
            CommentPost
        },
        props: {
            articleId: {
                type: [Number, String, Object],
                required: true
            }
        },
        data() {
            return {
                article: {}, //文章详情
                loading: true,
                errstatus: 0, //失败的状态码
                followLoading: false,
                totalCommentCount: 0,
                isPostShow: false, //控制发布评论弹出层的显示与隐藏
                commentList: [] //评论列表
            }
        },
        computed: {},
        watch: {},
        created() {
            this.loadArticle()
        },
        mounted() {},
        methods: {
            async loadArticle() {
                this.loading = true
                try {
                    const {
                        data
                    } = await getArticleById(this.articleId)
                        // console.log(data);
                    this.article = data.data
                        // 初始化图片点击预览
                    setTimeout(
                        () => {
                            this.previewImage()
                        }, 0
                    )

                } catch (error) {
                    if (error.response && error.response.status === 404) {
                        this.errstatus = 404
                    }
                    console.log('数据获取失败', error);
                }
                this.loading = false
            },
            // 得到所有的img节点
            previewImage() {
                const articleContent = this.$refs['article-content']
                const imgs = articleContent.querySelectorAll('img')
                    // console.log(imgs);
                const images = []
                imgs.forEach((img, index) => {
                    images.push(img.src)
                    img.onclick = () => {
                        ImagePreview({
                            images,
                            startPosition: index,
                            closeable: true,

                        })
                    }


                })
            },
            onPostSuccess() {
                //关闭弹出层
                this.isPostShow = false
                    // 将发布内容显示到列表顶部  父组件怎么拿到子组件list的数据呢 通过props绑定一个list获取
                    // 子组件那边声明一个list接受  不是必须的 required为null不写true

                this.commentList.unshift(data.new_obj)
                    // 清空文本框
            }
        }
    }
</script>

<style scoped lang="less">
    @import "./neirong.css";
    .article-container {
        /deep/ .van-nav-bar__content {
            background-color: pink;
            .van-nav-bar__title {
                color: #fff!important;
                font-weight: 600;
            }
            .van-icon {
                color: rgb(63, 45, 45)!important;
            }
        }
        .main-wrap {
            position: fixed;
            left: 0;
            right: 0;
            top: 92px;
            bottom: 88px;
            overflow-y: scroll;
            background-color: #fff;
        }
        .article-detail {
            .article-title {
                font-size: 40px;
                padding: 50px 32px;
                margin: 0;
                color: #3a3a3a;
            }
            .user-info {
                padding: 0 32px;
                .avatar {
                    width: 70px;
                    height: 70px;
                    margin-right: 17px;
                }
                .van-cell__label {
                    margin-top: 0;
                }
                .user-name {
                    font-size: 24px;
                    color: #3a3a3a;
                }
                .publish-date {
                    font-size: 23px;
                    color: #b7b7b7;
                }
                .follow-btn {
                    width: 170px;
                    height: 58px;
                }
            }
            .article-content {
                padding: 55px 32px;
                /deep/ p {
                    text-align: justify;
                }
            }
        }
        .loading-wrap {
            padding: 200px 32px;
            display: flex;
            align-items: center;
            justify-content: center;
            background-color: #fff;
        }
        .error-wrap {
            padding: 200px 32px;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            background-color: #fff;
            .van-icon {
                font-size: 122px;
                color: #b4b4b4;
            }
            .text {
                font-size: 30px;
                color: #666666;
                margin: 33px 0 46px;
            }
            .retry-btn {
                width: 280px;
                height: 70px;
                line-height: 70px;
                border: 1px solid #c3c3c3;
                font-size: 30px;
                color: #666666;
            }
        }
        .article-bottom {
            position: fixed;
            left: 0;
            right: 0;
            bottom: 0;
            display: flex;
            justify-content: space-around;
            align-items: center;
            box-sizing: border-box;
            height: 88px;
            border-top: 1px solid #d8d8d8;
            background-color: #fff;
            .comment-btn {
                width: 282px;
                height: 46px;
                border: 2px solid #eeeeee;
                font-size: 30px;
                line-height: 46px;
                color: #a7a7a7;
            }
            /deep/ .van-icon {
                font-size: 40px;
                background-color: #fff;
                .van-info {
                    font-size: 16px;
                    background-color: #e22829;
                }
            }
        }
    }
</style>