import Vue from 'vue'
import VueRouter from 'vue-router'


Vue.use(VueRouter)

const routes = [{
        path: '/login',
        name: 'login',
        component: () =>
            import ('@/views/login/index.vue')
    }, {
        path: '/sousuo',
        name: 'sousuo',
        component: () =>
            import ('@/views/sousuo/sousuo.vue')
    },
    {
        path: '/article/:articleId',
        name: 'artcle',
        component: () =>
            import ('@/views/more/article.vue'),
        props: true //开启props传参，说白了就说把路由参数映射到组件的props数据中
    },
    {
        path: '/user/profile',
        name: 'user-profile',
        component: () =>
            import ('@/views/user-profile'),
        // props: true //开启props传参，说白了就说把路由参数映射到组件的props数据中  但是我们不需要那么多参数所以不需要
    },
    {
        path: '/',
        // name: 'layout',父路由有子路由就没有意义弄名字
        component: () =>
            import ('../views/layout.vue'),
        children: [{
                path: '', //留空为默认子路由，动态广场为默认
                name: 'home',
                component: () =>
                    import ('../views/Home.vue')
            }, {
                path: '/qs',
                name: 'qs',
                component: () =>
                    import ('../views/qs.vue')
            }, {
                path: '/camera',
                name: 'camera',
                component: () =>
                    import ('../views/camera.vue')
            }, {
                path: '/my',
                name: 'my',
                component: () =>
                    import ('../views/my.vue')
            },

        ]
    }
]

const router = new VueRouter({

    routes
})

export default router