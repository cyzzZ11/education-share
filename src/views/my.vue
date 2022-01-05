<template>
    <div class="my-containeer">
     
        <!-- 登录成功的头部 -->
        <div v-if="user" class="header user-info">
            <!-- 基本资料相关 -->
            <div class="base-info">
                <!-- 左侧头像文本区域 -->
                <div class="left">
                    <van-image
                    class="avatar"
                   round
                  fit="cover"
                    :src="userInfo.photo"
                  />
                  <span class="name"> {{this.userInfo.name}}</span>

                </div>
                <!-- 右侧编辑资料等区域 用自带的to属性将页面跳转到编辑资料路由页面-->
                <div class="right">
                    <van-button 
                    type="info" 
                    size="mini" 
                    to="/user/profile"  
                    round>编辑资料</van-button>
                </div>
            </div>
            <!-- 数据相关 -->
            <div class="data-status">
                <div class="data-item">
                    <span class="text">粉丝数</span>
                    <span class="count">{{this.userInfo.fans_count}}</span>
                </div>
                <div class="data-item">
                    <span class="text">关注</span>
                    <span class="count">{{this.userInfo.follow_count}}</span>
                </div>
                <div class="data-item">
                    <span class="text">获赞</span>
                    <span class="count">{{userInfo.like_count}}</span>
                </div>
                <div class="data-item">
                    <span class="text">动态圈</span>
                    <span class="count">{{userInfo.art_count}}</span>
                </div>
            </div>
        </div>

   <!-- 未登陆的头部 -->
   <div class="header not-login" v-else>
    <div class="login-btn" @click="$router.push('/login')">
        <img src="~@/assets/爱心.png" alt="">
        <span class="text">登录/注册</span>
    </div>
</div>

        <!-- 导航 -->
        <van-grid :border="false" :column-num="2" class="grid-nav" clickable>
            <van-grid-item class="grid-item">
            <img slot="icon" src="~@/assets/收藏.png" alt="">
            <span slot="text">收藏</span>
            </van-grid-item>
            <van-grid-item class="grid-item">
                <img slot="icon"  src="~@/assets/便签.png" alt="">
                <span slot="text">浏览历史</span>
            </van-grid-item>
          </van-grid>
        <!-- 导航 -->
        <van-cell title="私信内容"  is-link class="bgtu" />
        <van-cell title="糖果客服"  class="mb-9" is-link  />
        <van-cell v-if="user" title="退出登录"  class="logout-cell" @click="onlogout" />
    </div>
</template>
<script>
    import {
        mapState
    } from 'vuex'
    // 按需加载获取用户自己的信息
    import {
        getUserInfo
    } from '../api/user.js'
    export default {
        name: 'MyIndex',
        components: {},
        props: {},
        data() {
            return {
                userInfo: {} //用户信息  在creater里面调用加载的信息
            }
        },
        computed: { //把user映射到容器里
            ...mapState(['user'])
        },
        watch: {},
        created() { //这个user是映射到容器总的user,意思是映射有了就调用下面这个加载用户信息的函数
            if (this.user) {
                this.loadUserInfo()
            }
        },
        mounted() {

        },
        methods: {
            onlogout() {
                // 给退出按钮新增的点击事件
                //  退出弹出提示确认退出与否 点确认  就清除登陆状态 就是容器中的user和本地存储的user
                this.$dialog.confirm({
                        title: '你确定要终止旅行吗？'
                    })
                    .then(() => {
                        // on confirm
                        this.$store.commit('setUser', null)
                            // setUser为空了 容器里面的值也变了
                    })
                    .catch(() => {
                        // on cancel
                        console.log('取消了终止');
                    })
            },
            async loadUserInfo() {
                try {
                    const {
                        data
                    } = await getUserInfo()

                    console.log(data); //看看返回过来的数据
                    this.userInfo = data.data
                } catch (error) {
                    this.$toast('获取数据失败，请稍后重试')
                }
            }

        },
    }
</script>
<style lang="less" scoped>
    .my-containeer {
        .header {
            height: 361px;
            background: url("~@/assets/bg4.png");
            background-size: cover;
        }
        .not-login {
            display: flex;
            justify-content: center;
            align-items: center;
            .login-btn {
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                img {
                    width: 90px;
                    height: 90px;
                }
                .text {
                    font-size: 28px;
                    color: black
                }
            }
        }
        .user-info {
            .base-info {
                height: 231px;
                box-sizing: border-box;
                padding: 76px 32px 23px;
                /* 让左右盒子两边撑开 */
                display: flex;
                justify-content: space-between;
                /* 垂直居中 */
                align-items: center;
                color: #fff;
                .left {
                    display: flex;
                    /* 垂直居中 */
                    align-items: center;
                    .avatar {
                        width: 132px;
                        height: 132px;
                        margin-right: 23px;
                        border: 4px solid #3f6b98;
                    }
                    .name {
                        font-size: 30px;
                        font-weight: 650;
                    }
                }
                .right {
                    .van-button {
                        border: none;
                        color: #fff;
                        background: linear-gradient( #ce8d8f, #cb808c, #f79f9e, #ce8d8f)
                    }
                }
            }
            .data-status {
                display: flex;
                .data-item {
                    height: 130px;
                    flex: 1;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    flex-direction: column;
                    color: #fff;
                    .text {
                        font-size: 25px;
                    }
                    .count {
                        position: relative;
                        top: -60px;
                        font-size: 26px;
                    }
                }
            }
        }
        .grid-nav {
            .grid-item {
                height: 141px;
                img {
                    width: 50px;
                    height: 50px;
                }
                span {
                    font-size: 30px;
                    font-weight: 800;
                }
            }
        }
        .logout-cell {
            text-align: center;
            font-size: 35px;
            font-weight: 650;
            color: red;
            background-image: url(../assets/bg33.png);
            background-size: cover;
            background-position: 0px 0px;
            background-clip: border-box;
        }
    }
    
    .bgtu {
        background-image: url(../assets/qiege1.png);
        background-size: cover;
        background-position: 0 -40px;
        color: azure;
        background-clip: border-box;
    }
    
    .mb-9 {
        background-image: url(../assets/qiege2.png);
        background-size: cover;
        background-position: 0 -70px;
        color: azure;
        background-clip: border-box;
    }
</style>