import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './styles/index.less'

import Vant from 'vant'
import 'vant/lib/index.css'

// 加载vant组件
// 适配
import 'amfe-flexible'


// 加载datjs初始化配置
import './utils/dayjs'

Vue.use(Vant)
Vue.config.productionTip = false

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')