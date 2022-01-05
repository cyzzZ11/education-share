import Vue from 'vue'
import Vuex from 'vuex'
import { getItem, setItem } from '@/utils/storage'

Vue.use(Vuex)
const TOKEN_KEY = 'TOUTIAO_USER'
    // 初始化容器 把token储存起来
export default new Vuex.Store({
    state: {
        // 一个对象用来存储当前登录用户信息 里面包括token等数据
        // user: null  但是后面容器里也要有数据所以改为下面这个 是字符串格式要还原成对象
        // 
        user: getItem(TOKEN_KEY)
    },
    mutations: {
        setUser(state, data) {
            state.user = data
                // 为了防止刷新丢失token相关数据  我们需要把数据备份到本地存储  本地存储只能存字符串
                // window.localStorage.setItem(TOKEN_KEY, JSON.stringify(state.user))
            setItem(TOKEN_KEY, state.user)
        }
    },
    actions: {},
    modules: {}
})