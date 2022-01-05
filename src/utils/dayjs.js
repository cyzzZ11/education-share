import Vue from 'vue'
import dayjs from 'dayjs'
//加载中午语言包
import 'dayjs/locale/zh-cn'
import relativeTime from 'dayjs/plugin/relativeTime'


// 配置使用处理相对事件的插件
dayjs.extend(relativeTime)
dayjs.locale('zh-cn') // 全局使用

// 参数一是过滤器名称 参数2是过滤器函数
// 管道符前面的表达式的结果会作为参数传递到过滤器函数中
// 过滤器的返回值会渲染到使用过滤器的模板位置
Vue.filter('relativeTime', value => {

    return dayjs().to(dayjs(value))
})