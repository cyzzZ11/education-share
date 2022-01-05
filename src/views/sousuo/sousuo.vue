<template lang="">
    <div class="sousuo-container">
        <!-- 搜索页面 -->
<!--搜索栏  -->

<form action="/">   
    <!-- 这是为u了移动端蹦出搜索框那些 show-action是为了显示右边取消按钮  -->
    <van-search
      v-model="sousuoText"
      show-action    
      placeholder="请输入你想搜索的动态"
      @search="onSearch"
      @cancel="onCancel"
      background="#fad8e7"
      @focus="isResultShow = false"
    />
  </form>
<!-- 搜索栏 -->
<!-- 搜索结果 -->
<history 
 v-if="isResultShow" 
 :search-text="sousuoText"
 />
<!-- 搜索结果 -->

<!-- 联想建议 永远不要忘了动态绑定v-bind的缩写 :在绑定的前面-->
<sousuo-suggestion 
v-else-if="sousuoText" 
:search-text="sousuoText"
@search="onSearch"

/>
<!-- 联想建议 -->

<!-- 搜索历史记录 -->
<sousuo-history v-else />
<!-- 搜索历史记录 -->
    </div>
</template>

<script>
    import History from './components/history.vue'
    import SousuoSuggestion from './components/sousuo-suggestion.vue'
    import SousuoHistory from './components/sousuo-history.vue'
    export default {
        name: "Sousuo",
        components: {
            History,
            SousuoSuggestion,
            SousuoHistory

        },
        props: {},
        data() {
            return {
                sousuoText: '',
                isResultShow: false //控制搜索结果的展示
            }
        },
        created() {

        },
        methods: {
            onSearch(val) {
                this.sousuoText = val
                this.isResultShow = true
            },
            onCancel() {
                this.$router.back()
            }
        }

    }
</script>

<style lang="less" scoped>
    .van-search__action {
        padding: 0 0.21333rem;
        color: #fff;
        font-size: 0.37333rem;
        font-weight: 600;
        line-height: 0.90667rem;
        cursor: pointer;
        -webkit-user-select: none;
        user-select: none;
    }
</style>