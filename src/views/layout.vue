<template lang="">
    <div class="layout-container">
        <!-- 子路由出口 -->
        <router-view></router-view>
        <!-- 标签导航栏 -->
        <van-tabbar v-model="active" route>
            <van-tabbar-item to="/">
<!-- <i slot="icon" class="toutiao toutiao-yinliao"></i> -->
                <img src="../views/饮料.png" alt="" class="one"> 
                <span class="text">动态广场</span>
            </van-tabbar-item>
            <van-tabbar-item to="/qs">
                <!-- <i slot="icon" class="toutiao toutiao-kefu"></i> -->
                <img src="../views/客服.png" alt="" class="two"> 
                <span class="text">私信</span>
                            </van-tabbar-item>
                            <van-tabbar-item to="/camera">
                                <!-- <i slot="icon" class="toutiao toutiao-shipin1"></i> -->
                                <img src="../views/播放.png" alt="" class="three">
                                <span class="text">朋友圈</span>
                                            </van-tabbar-item>
                                            <van-tabbar-item to="/my">
                                                <!-- <i slot="icon" class="toutiao toutiao-shuma"></i> -->
                                                <img src="../views/数码.png" alt="" class="four">
                                                <span class="text">{{$store.state.user? '我的' : '设置'}}</span>
                                                            </van-tabbar-item>
  
          </van-tabbar>
    </div>
</template>

<script>
export default {
  name: "LayoutIndex",
  components: {},
  props: {},
  data() {
    return {
      active: 0,
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {},
};
</script>

<style lang="less">
.van-tabbar-item {
  background: linear-gradient(#fed6e0, #fed0d3, pink, pink, #c98087, #c98087);
  margin-left: -50px;
  img {
    position: relative;
    width: 50px;
  }
  .one {
    top: -20px;
    left: 72.5px;
  }
  .two {
    top: -20px;
    left: 50px;
  }
  .three {
    top: -20px;
    left: 60px;
  }
  .four {
    top: -20px;
    left: 50px;
  }
}
/* 点击时候vant出现的颜色类名 */

.van-tabbar-item--active {
  color: rgb(248, 85, 112);
  background-color: #fff;
}
</style>